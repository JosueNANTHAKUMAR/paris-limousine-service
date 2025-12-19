"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Clock, Car, ChevronRight, CheckCircle, ArrowRight, Timer, Navigation } from "lucide-react";
import { LOCATIONS, FLEET, LocationId } from "@/lib/constants";
import { useQuote } from "@/lib/hooks/useQuote";
import { Button } from "@/components/ui/Button";
import { clsx } from "clsx";

type ServiceType = 'distance' | 'hourly';

interface QuoteCalculatorProps {
    isModal?: boolean;
}

export function QuoteCalculator({ isModal = false }: QuoteCalculatorProps) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [serviceType, setServiceType] = useState<ServiceType>('distance');

    const [formData, setFormData] = useState({
        departure: "" as LocationId | "",
        arrival: "" as LocationId | "",
        duration: "1",
        date: "",
        time: "",
        vehicleId: FLEET[0].id,
    });

    const quote = useQuote({
        departure: formData.departure,
        arrival: formData.arrival,
        vehicleId: formData.vehicleId,
    });

    const handleNext = () => {
        if (step === 1) {
            if (!formData.departure) return alert("Please select a pick-up location");
            if (serviceType === 'distance' && !formData.arrival) return alert("Please select a drop-off location");
            if (!formData.date) return alert("Please select a date");
            if (!formData.time) return alert("Please select a time");
        }

        // Haptic feedback simulation
        if (typeof window !== 'undefined' && window.navigator.vibrate) {
            window.navigator.vibrate(10);
        }

        if (step < 3) setStep((prev) => (prev + 1) as 1 | 2 | 3);
    };

    const handleBack = () => {
        // Haptic feedback simulation
        if (typeof window !== 'undefined' && window.navigator.vibrate) {
            window.navigator.vibrate(5);
        }
        if (step > 1) setStep((prev) => (prev - 1) as 1 | 2 | 3);
    };

    const router = useRouter();

    const handleBookNow = () => {
        const params = new URLSearchParams({
            service: serviceType,
            from: formData.departure,
            to: formData.arrival,
            vehicle: formData.vehicleId,
            date: formData.date,
            time: formData.time,
            duration: formData.duration,
            price: quote.price ? quote.price.toString() : ((FLEET.find(v => v.id === formData.vehicleId)?.baseRate || 0) * parseInt(formData.duration)) + "",
        });
        router.push(`/checkout?${params.toString()}`);
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
                <h3 className="text-xl sm:text-2xl font-serif text-slate-50 mb-4 sm:mb-6 text-center">Book Your Transfer</h3>

                {/* Service Type Switcher */}
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

                {/* Progress Steps */}
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
                            </div>

                            {serviceType === 'distance' ? (
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
                                </div>
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
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => (
                                                <option key={h} value={h} className="bg-slate-900 text-slate-50">{h} Hours</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
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
                        </motion.div>
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
                            className="space-y-8 text-center py-4"
                        >
                            <div className="space-y-3">
                                <h4 className="text-slate-400 text-xs uppercase tracking-[0.2em]">Estimated Price</h4>
                                <div className="relative inline-block">
                                    <div className="text-5xl sm:text-6xl font-serif text-[#D4AF37] drop-shadow-lg">
                                        {serviceType === 'distance'
                                            ? (quote.price ? `${quote.price}€` : "On Request")
                                            : `${(FLEET.find(v => v.id === formData.vehicleId)?.baseRate || 0) * parseInt(formData.duration)}€`
                                        }
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 font-medium">
                                    {serviceType === 'distance'
                                        ? (quote.isFixedRate ? "Fixed Rate • All Inclusive" : "Custom Quote Required")
                                        : `${formData.duration} Hours • Hourly Rate`
                                    }
                                </p>
                            </div>

                            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-left space-y-4 text-sm shadow-inner">
                                <div className="flex justify-between items-center border-b border-slate-800/50 pb-3">
                                    <span className="text-slate-400">Service</span>
                                    <span className="text-slate-50 font-medium capitalize">{serviceType}</span>
                                </div>
                                {serviceType === 'distance' ? (
                                    <>
                                        <div className="flex justify-between items-center border-b border-slate-800/50 pb-3">
                                            <span className="text-slate-400">Route</span>
                                            <div className="text-right">
                                                <div className="text-slate-50 font-medium">{LOCATIONS.find(l => l.id === formData.departure)?.label || "..."}</div>
                                                <div className="text-xs text-slate-500">to</div>
                                                <div className="text-slate-50 font-medium">{LOCATIONS.find(l => l.id === formData.arrival)?.label || "..."}</div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex justify-between items-center border-b border-slate-800/50 pb-3">
                                        <span className="text-slate-400">Duration</span>
                                        <span className="text-slate-50 font-medium">{formData.duration} Hours</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center pt-1">
                                    <span className="text-slate-400">Vehicle</span>
                                    <span className="text-gold font-medium">{FLEET.find(v => v.id === formData.vehicleId)?.name}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className={clsx(
                "p-4 sm:p-6 border-t border-slate-800/50 bg-slate-900/30 flex justify-between items-center",
                isModal && "shrink-0 pb-8" // Add safe area padding for mobile
            )}>
                {step > 1 ? (
                    <Button variant="ghost" onClick={handleBack} className="text-[#D4AF37] hover:text-[#E5C55D] hover:bg-slate-900/50 rounded-full font-medium transition-colors">Back</Button>
                ) : (
                    <div />
                )}

                {step < 3 ? (
                    <Button onClick={handleNext} className="w-36 !bg-[#D4AF37] hover:!bg-[#E5C55D] !text-black font-bold shadow-lg shadow-gold/20 transform hover:scale-[1.02] transition-all rounded-full">
                        Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button
                        onClick={handleBookNow}
                        className="w-full !bg-[#D4AF37] hover:!bg-[#E5C55D] !text-black font-bold shadow-xl shadow-gold/20 transform hover:scale-[1.02] transition-all rounded-full"
                    >
                        Book Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
