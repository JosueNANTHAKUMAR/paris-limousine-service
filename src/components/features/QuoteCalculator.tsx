"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Clock, Car, ChevronRight, CheckCircle, ArrowRight, Timer, Navigation, Plane } from "lucide-react";
import { LOCATIONS, FLEET, LocationId } from "@/lib/constants";
import { useQuote } from "@/lib/hooks/useQuote";
import { Button } from "@/components/ui/Button";
import { clsx } from "clsx";
import { AddressAutocomplete } from "@/components/ui/AddressAutocomplete";
import { sendGAEvent } from '@next/third-parties/google';

type ServiceType = 'distance' | 'hourly';

interface QuoteCalculatorProps {
    isModal?: boolean;
    initialServiceType?: ServiceType;
    initialDuration?: string;
}

export function QuoteCalculator({ isModal = false, initialServiceType = 'distance', initialDuration = "3" }: QuoteCalculatorProps) {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [serviceType, setServiceType] = useState<ServiceType>(initialServiceType);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        departure: "" as LocationId | "",
        arrival: "" as LocationId | "",
        pickupAddress: "",
        flightNumber: "",
        dropoffAddress: "",
        duration: initialDuration || "3",
        date: "",
        time: "",
        vehicleId: FLEET[0].id,
        passengers: 1,
        email: "",
    });

    // Update state when props change (e.g. when clicking "Book Plan" from parent)
    useEffect(() => {
        setServiceType(initialServiceType);
        setFormData(prev => ({
            ...prev,
            duration: initialDuration,
            pickupAddress: "",
            flightNumber: "",
            dropoffAddress: "",
            passengers: 1
        }));
    }, [initialServiceType, initialDuration]);

    const quote = useQuote({
        departure: formData.departure,
        arrival: formData.arrival,
        vehicleId: formData.vehicleId,
    });

    // Get currently selected vehicle to determine capacity
    const selectedVehicle = FLEET.find(v => v.id === formData.vehicleId) || FLEET[0];
    const maxPassengers = selectedVehicle.capacity.pax;

    // Clamp passenger count when vehicle changes
    useEffect(() => {
        if (formData.passengers > maxPassengers) {
            setFormData(prev => ({ ...prev, passengers: maxPassengers }));
        }
    }, [formData.vehicleId, maxPassengers]);

    const handleNext = () => {
        if (step === 1) {
            if (!formData.departure) return alert("Please select a pick-up location");
            if (serviceType === 'distance' && !formData.arrival) return alert("Please select a drop-off location");
            if (!formData.date) return alert("Please select a date");
            if (!formData.time) return alert("Please select a time");
        }

        if (step === 3) {
            if (!formData.email || !formData.email.includes('@')) return alert("Please enter a valid email address");
            handleBookNow();
            return;
        }

        // Haptic feedback simulation
        if (typeof window !== 'undefined' && window.navigator.vibrate) {
            window.navigator.vibrate(10);
        }

        if (step < 4) setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    };

    const handleBack = () => {
        // Haptic feedback simulation
        if (typeof window !== 'undefined' && window.navigator.vibrate) {
            window.navigator.vibrate(5);
        }
        if (step > 1) setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    };

    const router = useRouter();

    const handleBookNow = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: "Lead",
                    lastName: "Inquiry",
                    email: formData.email,
                    phone: "N/A",
                    address: formData.pickupAddress || formData.departure,
                    additionalInfo: `Flight: ${formData.flightNumber || 'N/A'}`,
                    bookingDetails: {
                        serviceType,
                        date: formData.date,
                        time: formData.time,
                        passengers: formData.passengers,
                        departure: LOCATIONS.find(l => l.id === formData.departure)?.label || formData.departure,
                        arrival: LOCATIONS.find(l => l.id === formData.arrival)?.label || formData.arrival,
                        duration: formData.duration,
                        vehicle: FLEET.find(v => v.id === formData.vehicleId)?.name,
                        price: quote.price || ((FLEET.find(v => v.id === formData.vehicleId)?.baseRate || 0) * parseInt(formData.duration)),
                    }
                }),
            });

            if (response.ok) {
                // Trigger Google Ads Conversion
                sendGAEvent('event', 'conversion', {
                    'send_to': 'AW-17979052174',
                    'value': quote.price || 0,
                    'currency': 'EUR'
                });

                setIsSuccess(true);
                setStep(4);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Error sending request.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    return (
        <div className={clsx(
            "w-full max-w-full sm:max-w-md mx-auto",
            isModal
                ? "h-full flex flex-col"
                : "overflow-hidden bg-slate-950/80 backdrop-blur-2xl border border-slate-800/50 rounded-3xl shadow-2xl ring-1 ring-white/10"
        )}>
            {/* Header & Tabs */}
            <div className={clsx(
                "bg-slate-900/50 p-4 sm:p-6 border-b border-slate-800/50",
                isModal && "shrink-0"
            )}>
                <h3 className="text-xl sm:text-2xl font-serif text-slate-50 mb-4 sm:mb-6 text-center">
                    {isSuccess ? "Booking Confirmed" : "Book Your Transfer"}
                </h3>

                {/* Service Type Switcher - Hidden on success */}
                {!isSuccess && (
                    <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-800 relative mb-4 sm:mb-6">
                        <div className="absolute inset-y-1 left-1 w-[calc(50%-4px)] !bg-[#D4AF37] rounded-lg transition-all duration-300 ease-out shadow-lg shadow-gold/20"
                            style={{ transform: serviceType === 'hourly' ? 'translateX(100%)' : 'translateX(0%)' }} />

                        <button
                            onClick={() => {
                                setServiceType('distance');
                                if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(5);
                            }}
                            className={clsx(
                                "flex-1 flex items-center justify-center py-2 sm:py-2.5 text-sm font-bold rounded-lg relative z-10 transition-colors",
                                serviceType === 'distance' ? "text-slate-950" : "text-slate-400 hover:text-slate-200"
                            )}
                        >
                            <Navigation className="w-4 h-4 mr-2" />
                            Distance
                        </button>
                        <button
                            onClick={() => {
                                setServiceType('hourly');
                                if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(5);
                            }}
                            className={clsx(
                                "flex-1 flex items-center justify-center py-2 sm:py-2.5 text-sm font-bold rounded-lg relative z-10 transition-colors",
                                serviceType === 'hourly' ? "text-slate-950" : "text-slate-400 hover:text-slate-200"
                            )}
                        >
                            <Timer className="w-4 h-4 mr-2" />
                            Hourly
                        </button>
                    </div>
                )}

                {/* Progress Steps */}
                {!isSuccess && (
                    <div className="flex items-center space-x-2 px-2">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={clsx(
                                    "h-1 flex-1 rounded-full transition-all duration-500",
                                    step >= i ? "bg-gradient-to-r from-gold to-gold-light shadow-[0_0_10px_rgba(212,175,55,0.3)]" : "bg-slate-800"
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className={clsx(
                "relative",
                isModal
                    ? "flex-1 overflow-y-auto custom-scrollbar p-4"
                    : "p-4 sm:p-6 min-h-[380px] sm:min-h-[420px]"
            )}>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-5"
                        >
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gold uppercase tracking-wider ml-1">Pick Up</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-3 h-5 w-5 text-slate-500 group-focus-within:text-gold transition-colors" />
                                    <select
                                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-50 focus:ring-2 focus:ring-gold/50 focus:border-gold/50 outline-none appearance-none transition-all hover:bg-slate-900 text-sm sm:text-base"
                                        value={formData.departure}
                                        onChange={(e) => setFormData({ ...formData, departure: e.target.value as LocationId })}
                                    >
                                        <option value="" className="bg-slate-900 text-slate-50">Select Pick Up Location</option>
                                        {LOCATIONS.map((loc) => (
                                            <option key={loc.id} value={loc.id} className="bg-slate-900 text-slate-50">{loc.label}</option>
                                        ))}
                                    </select>
                                </div>
                                {!['cdg', 'orly', 'le_bourget'].includes(formData.departure) && (
                                    <div className="mt-2">
                                        <AddressAutocomplete
                                            icon={<MapPin className="h-5 w-5 text-slate-500 transition-colors" />}
                                            placeholder="Address or Hotel Name"
                                            value={formData.pickupAddress}
                                            onChange={(value) => setFormData({ ...formData, pickupAddress: value })}
                                        />
                                    </div>
                                )}
                            </div>

                            {
                                serviceType === 'distance' ? (
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gold uppercase tracking-wider ml-1">Drop Off</label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-4 top-3 h-5 w-5 text-slate-500 group-focus-within:text-gold transition-colors" />
                                            <select
                                                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-50 focus:ring-2 focus:ring-gold/50 focus:border-gold/50 outline-none appearance-none transition-all hover:bg-slate-900 text-sm sm:text-base"
                                                value={formData.arrival}
                                                onChange={(e) => setFormData({ ...formData, arrival: e.target.value as LocationId })}
                                            >
                                                <option value="" className="bg-slate-900 text-slate-50">Select Drop Off Location</option>
                                                {LOCATIONS.map((loc) => (
                                                    <option key={loc.id} value={loc.id} className="bg-slate-900 text-slate-50">{loc.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {!['cdg', 'orly', 'le_bourget'].includes(formData.arrival) && (
                                            <div className="mt-2">
                                                <AddressAutocomplete
                                                    icon={<MapPin className="h-5 w-5 text-slate-500 transition-colors" />}
                                                    placeholder="Address or Hotel Name"
                                                    value={formData.dropoffAddress}
                                                    onChange={(value) => setFormData({ ...formData, dropoffAddress: value })}
                                                />
                                            </div>
                                        )}
                                    </div >
                                ) : (
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gold uppercase tracking-wider ml-1">Duration</label>
                                        <div className="relative group">
                                            <Timer className="absolute left-4 top-3 h-5 w-5 text-slate-500 group-focus-within:text-gold transition-colors" />
                                            <select
                                                required
                                                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-50 focus:ring-2 focus:ring-gold/50 focus:border-gold/50 outline-none appearance-none transition-all hover:bg-slate-900 text-sm sm:text-base"
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            >
                                                {[3, 4, 5, 6, 7, 8].map((h) => (
                                                    <option key={h} value={h} className="bg-slate-900 text-slate-50">{h} Hours</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )
                            }

                            {/* Flight Number Field (Condition: Airport Pickup OR Dropoff) */}
                            {(['cdg', 'orly', 'le_bourget'].includes(formData.departure) || ['cdg', 'orly', 'le_bourget'].includes(formData.arrival)) && (
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gold uppercase tracking-wider ml-1">Flight Number</label>
                                    <div className="relative group">
                                        <Plane className="absolute left-4 top-3 h-5 w-5 text-slate-500 group-focus-within:text-gold transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Flight Number"
                                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-50 focus:ring-2 focus:ring-gold/50 focus:border-gold/50 outline-none transition-all hover:bg-slate-900 text-sm sm:text-base"
                                            value={formData.flightNumber}
                                            onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gold uppercase tracking-wider ml-1">Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-3 h-5 w-5 text-slate-500 group-focus-within:text-gold transition-colors" />
                                        <input
                                            required
                                            type="date"
                                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-50 focus:ring-2 focus:ring-gold/50 focus:border-gold/50 outline-none transition-all hover:bg-slate-900 text-sm sm:text-base"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gold uppercase tracking-wider ml-1">Time</label>
                                    <div className="relative group">
                                        <Clock className="absolute left-4 top-3 h-5 w-5 text-slate-500 group-focus-within:text-gold transition-colors" />
                                        <input
                                            required
                                            type="time"
                                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-50 focus:ring-2 focus:ring-gold/50 focus:border-gold/50 outline-none transition-all hover:bg-slate-900 text-sm sm:text-base"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div >
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gold uppercase tracking-wider ml-1">Passengers</label>
                                <div className="flex items-center space-x-4 bg-slate-900/50 border border-slate-800 rounded-xl p-2">
                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))}
                                        className={clsx(
                                            "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
                                            formData.passengers <= 1
                                                ? "bg-slate-800/50 text-slate-600 cursor-not-allowed"
                                                : "bg-slate-800 text-slate-50 hover:bg-slate-700"
                                        )}
                                        disabled={formData.passengers <= 1}
                                    >
                                        -
                                    </button>
                                    <div className="flex-1 text-center font-serif text-xl text-slate-50">
                                        {formData.passengers} <span className="text-sm text-slate-400 font-sans">Pax</span>
                                    </div>
                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, passengers: Math.min(maxPassengers, prev.passengers + 1) }))}
                                        className={clsx(
                                            "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
                                            formData.passengers >= maxPassengers
                                                ? "bg-slate-800/50 text-slate-600 cursor-not-allowed"
                                                : "bg-slate-800 text-slate-50 hover:bg-slate-700"
                                        )}
                                        disabled={formData.passengers >= maxPassengers}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gold uppercase tracking-wider ml-1">Select Vehicle</label>
                                <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                                    {FLEET.map((vehicle) => (
                                        <div
                                            key={vehicle.id}
                                            onClick={() => {
                                                setFormData({ ...formData, vehicleId: vehicle.id });
                                                if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(10);
                                            }}
                                            className={clsx(
                                                "p-3 sm:p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between group relative overflow-hidden",
                                                formData.vehicleId === vehicle.id
                                                    ? "bg-gold/10 border-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                                                    : "bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-900"
                                            )}
                                        >
                                            <div className="flex items-center space-x-4 relative z-10">
                                                <div className={clsx(
                                                    "p-3 rounded-lg transition-colors",
                                                    formData.vehicleId === vehicle.id ? "bg-gold text-slate-950" : "bg-slate-950 text-slate-400"
                                                )}>
                                                    <Car className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h4 className={clsx("font-serif font-medium text-lg", formData.vehicleId === vehicle.id ? "text-gold" : "text-slate-50")}>
                                                        {vehicle.name}
                                                    </h4>
                                                    <p className="text-xs text-slate-400 mt-0.5">{vehicle.category} • {vehicle.capacity.pax} Pax</p>
                                                </div>
                                            </div>
                                            {formData.vehicleId === vehicle.id && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="relative z-10"
                                                >
                                                    <CheckCircle className="h-6 w-6 text-gold" />
                                                </motion.div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-6 py-4"
                        >
                            <div className="text-center space-y-4">
                                <div className="space-y-1">
                                    <h4 className="text-slate-400 text-xs uppercase tracking-[0.2em]">Estimated Price</h4>
                                    <div className="text-5xl font-serif text-[#D4AF37] drop-shadow-sm">
                                        {serviceType === 'distance'
                                            ? (quote.price ? `${quote.price}€` : "On Request")
                                            : `${(FLEET.find(v => v.id === formData.vehicleId)?.baseRate || 0) * parseInt(formData.duration)}€`
                                        }
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-1">
                                        {serviceType === 'distance'
                                            ? (quote.isFixedRate ? "Fixed Rate • All Inclusive" : "Custom Quote Required")
                                            : `${formData.duration} Hours • Hourly Rate`
                                        }
                                    </p>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <h4 className="text-xl font-serif text-slate-50">Confirm Details</h4>
                                    <p className="text-sm text-slate-400">Enter your email and our team will contact you shortly to finalize your booking and confirm the details.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gold uppercase tracking-wider ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-4 px-6 text-slate-50 focus:ring-2 focus:ring-gold/50 focus:border-gold/50 outline-none transition-all hover:bg-slate-900 text-lg"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-6 text-center py-4"
                        >
                            <div className="space-y-3">
                                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto border border-[#D4AF37]/30 mb-2">
                                    <CheckCircle className="h-8 w-8 text-[#D4AF37]" />
                                </div>
                                <h4 className="text-2xl font-serif text-slate-50">Request Received</h4>
                                <p className="text-sm text-slate-400">
                                    Our team has received your inquiry. We will contact you at <span className="text-gold font-medium">{formData.email}</span> shortly with a formal quote.
                                </p>
                            </div>

                            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-left space-y-4 text-sm shadow-inner relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 blur-2xl -mr-12 -mt-12 rounded-full" />

                                <div className="flex justify-between items-center border-b border-slate-800/50 pb-3">
                                    <span className="text-slate-400">Date & Time</span>
                                    <span className="text-slate-50 font-medium">{formData.date} at {formData.time}</span>
                                </div>

                                {serviceType === 'distance' ? (
                                    <div className="flex justify-between items-start border-b border-slate-800/50 pb-3">
                                        <span className="text-slate-400">Route</span>
                                        <div className="text-right">
                                            <div className="text-slate-50 font-medium">{LOCATIONS.find(l => l.id === formData.departure)?.label || formData.departure}</div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-tighter">to</div>
                                            <div className="text-slate-50 font-medium">{LOCATIONS.find(l => l.id === formData.arrival)?.label || formData.arrival}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center border-b border-slate-800/50 pb-3">
                                        <span className="text-slate-400">Duration</span>
                                        <span className="text-slate-50 font-medium">{formData.duration} Hours</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center pt-1">
                                    <span className="text-slate-400">Vehicle</span>
                                    <div className="text-right">
                                        <div className="text-gold font-medium">{FLEET.find(v => v.id === formData.vehicleId)?.name}</div>
                                        <div className="text-xs text-slate-500">{formData.passengers} Passengers</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setIsSuccess(false);
                                    setStep(1);
                                    setFormData(prev => ({ ...prev, email: "" }));
                                }}
                                className="text-slate-500 hover:text-gold text-xs uppercase tracking-widest transition-colors"
                            >
                                Send another request
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence >
            </div >

            {/* Footer */}
            {!isSuccess && (
                < div className={
                    clsx(
                        "p-4 sm:p-6 border-t border-slate-800/50 bg-slate-900/30 flex justify-between items-center",
                        isModal && "shrink-0 pb-8" // Add safe area padding for mobile
                    )}>
                    {step > 1 ? (
                        <Button variant="ghost" onClick={handleBack} className="text-[#D4AF37] hover:text-[#E5C55D] hover:bg-slate-900/50 rounded-full font-medium transition-colors">Back</Button>
                    ) : (
                        <div />
                    )}

                    <Button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="px-10 py-4 !bg-[#D4AF37] hover:!bg-[#E5C55D] !text-black font-extrabold shadow-2xl shadow-gold/30 hover:shadow-gold/50 transform hover:scale-105 transition-all rounded-full uppercase tracking-tight text-sm flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                Processing...
                            </span>
                        ) : (
                            <>
                                {step === 3 ? "Book Your Chauffeur" : "Next Step"}
                                <ArrowRight className="h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div >
            )}
        </div >
    );
}
