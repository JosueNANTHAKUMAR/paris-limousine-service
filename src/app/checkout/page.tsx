"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle, CreditCard, Lock } from "lucide-react";
import { FLEET, LOCATIONS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Extract params
    const serviceType = searchParams.get("service") || "distance";
    const departureId = searchParams.get("from") || "";
    const arrivalId = searchParams.get("to") || "";
    const vehicleId = searchParams.get("vehicle") || "";
    const date = searchParams.get("date") || "";
    const time = searchParams.get("time") || "";
    const duration = searchParams.get("duration") || "4";
    const price = searchParams.get("price") || "0";

    // Resolve labels
    const departureLabel = LOCATIONS.find(l => l.id === departureId)?.label || departureId;
    const arrivalLabel = LOCATIONS.find(l => l.id === arrivalId)?.label || arrivalId;
    const vehicle = FLEET.find(v => v.id === vehicleId);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        additionalInfo: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    bookingDetails: {
                        serviceType,
                        departure: departureLabel,
                        arrival: arrivalLabel,
                        vehicle: vehicle?.name || vehicleId,
                        date,
                        time,
                        duration,
                        price,
                    },
                }),
            });

            if (res.ok) {
                router.push(`/checkout/success?${searchParams.toString()}`);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting booking.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <Link href="/" className="inline-flex items-center text-slate-400 hover:text-gold mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Link>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                            <h2 className="text-2xl font-serif text-slate-50 mb-6">Passenger Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">First Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-slate-50 focus:ring-2 focus:ring-gold/50 outline-none"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Last Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-slate-50 focus:ring-2 focus:ring-gold/50 outline-none"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-slate-50 focus:ring-2 focus:ring-gold/50 outline-none"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Phone Number</label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-slate-50 focus:ring-2 focus:ring-gold/50 outline-none"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Address</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-slate-50 focus:ring-2 focus:ring-gold/50 outline-none"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Additional Information</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-slate-50 focus:ring-2 focus:ring-gold/50 outline-none"
                                        value={formData.additionalInfo}
                                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                                    />
                                </div>

                                <div className="pt-6">
                                    <Button
                                        type="submit"
                                        className="w-full !bg-[#D4AF37] hover:!bg-[#E5C55D] !text-black font-bold text-lg h-14 shadow-lg shadow-gold/20 transform hover:scale-[1.01] transition-all rounded-full"
                                        isLoading={isLoading}
                                    >
                                        Confirm Booking
                                    </Button>
                                    <div className="flex items-center justify-center mt-4 text-slate-500 text-sm">
                                        <Lock className="w-4 h-4 mr-2" />
                                        Secure SSL Encryption
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 sticky top-24">
                            <h3 className="text-xl font-serif text-slate-50 mb-6">Order Summary</h3>

                            {vehicle && (
                                <div className="mb-6 pb-6 border-b border-slate-800">
                                    <div className="relative h-32 w-full mb-4 rounded-lg overflow-hidden">
                                        <Image
                                            src={vehicle.image}
                                            alt={vehicle.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="text-lg font-medium text-gold">{vehicle.name}</h4>
                                    <p className="text-sm text-slate-400">{vehicle.category} • {vehicle.capacity.pax} Pax</p>
                                </div>
                            )}

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Date</span>
                                    <span className="text-slate-50 font-medium">{date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Time</span>
                                    <span className="text-slate-50 font-medium">{time}</span>
                                </div>

                                {serviceType === 'distance' ? (
                                    <>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Pickup</span>
                                            <span className="text-slate-50 font-medium text-right max-w-[60%]">{departureLabel}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Drop-off</span>
                                            <span className="text-slate-50 font-medium text-right max-w-[60%]">{arrivalLabel}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Duration</span>
                                        <span className="text-slate-50 font-medium">{duration} Hours</span>
                                    </div>
                                )}

                                <div className="pt-4 mt-4 border-t border-slate-800 flex justify-between items-end">
                                    <span className="text-slate-300 font-medium">Total</span>
                                    <span className="text-3xl font-serif text-gold">{price}€</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-gold">Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    )
}
