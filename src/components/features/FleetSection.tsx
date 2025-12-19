"use client";

import { useState } from "react";
import { FLEET, Vehicle } from "@/lib/constants";
import { Users, Briefcase, X, Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function FleetSection() {
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

    return (
        <section id="fleet" className="py-24 bg-slate-950">
            <div className="container mx-auto px-4">
                <SectionTitle
                    title="Our Premium Fleet"
                    subtitle="Choose from our exclusive collection of Mercedes-Benz vehicles, designed for ultimate comfort and style."
                    light={true}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {FLEET.map((vehicle) => (
                        <div
                            key={vehicle.id}
                            onClick={() => setSelectedVehicle(vehicle)}
                            className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-gold/50 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-gold/5"
                        >
                            {/* Image Area */}
                            <div className="relative h-48 sm:h-64 w-full bg-slate-950/50 overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                                <div className="relative w-full h-full">
                                    <Image
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 z-0"
                                    />
                                </div>
                                <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="bg-gold text-slate-950 text-xs font-bold px-3 py-1.5 rounded-full">View Prices</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-6 relative z-20">
                                <div>
                                    <div className="text-gold text-sm font-medium tracking-wider uppercase mb-2">
                                        {vehicle.category}
                                    </div>
                                    <h3 className="text-2xl font-serif text-slate-50">{vehicle.name}</h3>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                                    {vehicle.description}
                                </p>

                                <div className="flex items-center space-x-6 border-t border-slate-800 pt-6">
                                    <div className="flex items-center text-slate-300">
                                        <Users className="h-5 w-5 text-gold mr-2" />
                                        <span className="text-sm">{vehicle.capacity.pax} Pax</span>
                                    </div>
                                    <div className="flex items-center text-slate-300">
                                        <Briefcase className="h-5 w-5 text-gold mr-2" />
                                        <span className="text-sm">{vehicle.capacity.bags} Bags</span>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <div className="text-xs text-gold/80 uppercase tracking-wider font-medium mt-2 flex items-center group-hover:text-gold transition-colors">
                                        Click to view full rates <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pricing Modal */}
            <AnimatePresence>
                {selectedVehicle && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedVehicle(null)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => {
                                    setSelectedVehicle(null);
                                    if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(5);
                                }}
                                className="absolute top-4 right-4 p-2 bg-slate-800/50 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors z-10"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="grid md:grid-cols-2">
                                {/* Left: Image & Info */}
                                <div className="relative h-48 md:h-auto bg-slate-950">
                                    <Image
                                        src={selectedVehicle.image}
                                        alt={selectedVehicle.name}
                                        fill
                                        className="object-contain md:object-cover opacity-60 p-4 md:p-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                        <div className="text-gold text-sm font-bold tracking-wider uppercase mb-2">
                                            {selectedVehicle.category}
                                        </div>
                                        <h3 className="text-3xl font-serif text-slate-50 mb-2">{selectedVehicle.name}</h3>
                                        <div className="flex items-center space-x-4 text-slate-300 text-sm">
                                            <span className="flex items-center"><Users className="h-4 w-4 mr-1.5 text-gold" /> 1-{selectedVehicle.capacity.pax} Pax</span>
                                            <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1.5 text-gold" /> {selectedVehicle.capacity.bags} Bags</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Pricing */}
                                <div className="p-6 md:p-8 bg-slate-900">
                                    <h4 className="text-lg font-serif text-slate-50 mb-4 md:mb-6 flex items-center">
                                        Fixed Rates <span className="ml-auto text-xs font-sans text-slate-500 uppercase tracking-wider">One Way</span>
                                    </h4>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                            <span className="text-slate-400">Paris <ArrowRight className="inline h-3 w-3 mx-1 text-slate-600" /> CDG Airport</span>
                                            <span className="text-gold font-bold">{selectedVehicle.fixedRates.cdg}€</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                            <span className="text-slate-400">Paris <ArrowRight className="inline h-3 w-3 mx-1 text-slate-600" /> Orly Airport</span>
                                            <span className="text-gold font-bold">{selectedVehicle.fixedRates.orly}€</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                            <span className="text-slate-400">Paris <ArrowRight className="inline h-3 w-3 mx-1 text-slate-600" /> Disneyland</span>
                                            <span className="text-gold font-bold">{selectedVehicle.fixedRates.disney}€</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                            <span className="text-slate-400">Paris <ArrowRight className="inline h-3 w-3 mx-1 text-slate-600" /> Versailles</span>
                                            <span className="text-gold font-bold">{selectedVehicle.fixedRates.versailles}€</span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-800/50 rounded-xl p-4 flex justify-between items-center mb-6">
                                        <div>
                                            <div className="text-slate-50 font-medium">Hourly Hire</div>
                                            <div className="text-xs text-slate-500">As directed (Min 1h)</div>
                                        </div>
                                        <div className="text-xl font-serif text-gold">{selectedVehicle.baseRate}€<span className="text-sm font-sans text-slate-500">/h</span></div>
                                    </div>

                                    <Button
                                        onClick={() => {
                                            setSelectedVehicle(null);
                                            if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(15);
                                            document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="w-full !bg-[#D4AF37] hover:!bg-[#E5C55D] !text-black font-bold rounded-full shadow-lg shadow-gold/20 transform hover:scale-[1.02] transition-all"
                                    >
                                        Book This Vehicle
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
