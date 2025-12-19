"use client";

import { useState } from "react";
import { QuoteCalculator } from "@/components/features/QuoteCalculator";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(10);
    };

    return (
        <section id="booking" className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="Luxury Limousine in Paris"
                    fill
                    className="object-cover"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" // Simple dark placeholder
                />
                <div className="absolute inset-0 bg-black/60 z-10" />
            </div>

            <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-center lg:text-left">
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-serif text-slate-50 leading-[1.1] tracking-tight">
                            Experience Paris
                        </h1>
                        <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
                            <div className="h-[1px] sm:h-[2px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-gold"></div>
                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#D4AF37] italic">
                                in Timeless Luxury
                            </h2>
                        </div>
                    </div>
                    <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                        Premium chauffeur services for airport transfers, business travel, and exclusive tours.
                        Fixed rates, professional drivers, and the finest Mercedes-Benz fleet.
                    </p>

                    {/* Mobile Booking Trigger */}
                    <div className="lg:hidden flex flex-col items-center gap-4 pt-4">
                        <Button
                            onClick={openModal}
                            className="w-full max-w-sm py-7 text-lg !bg-[#D4AF37] hover:!bg-[#E5C55D] !text-black font-extrabold rounded-full shadow-2xl shadow-gold/30 transform active:scale-95 transition-all flex items-center justify-center"
                        >
                            Book Your Chauffeur <ArrowRight className="ml-2 h-6 w-6" />
                        </Button>
                        <div className="flex items-center gap-6 text-slate-400 text-xs uppercase tracking-widest font-medium">
                            <span className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gold" />
                                Fixed Rates
                            </span>
                            <span className="w-1 h-1 bg-slate-700 rounded-full" />
                            <span>All-Inclusive</span>
                        </div>
                    </div>
                </div>

                {/* Desktop Calculator (Hidden on Mobile) */}
                <div className="hidden lg:flex justify-center lg:justify-end">
                    <QuoteCalculator />
                </div>
            </div>

            {/* Mobile Booking Modal (Bottom Sheet Style) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] lg:hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute inset-x-0 bottom-0 top-16 bg-slate-900 rounded-t-[2.5rem] border-t border-slate-800 shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Handle Bar */}
                            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mt-4 mb-2 shrink-0" />

                            <div className="p-6 flex items-center justify-between border-b border-slate-800/50 shrink-0">
                                <h3 className="text-2xl font-serif text-slate-50">Book Your Transfer</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-hidden relative bg-slate-900">
                                <div className="h-full max-w-md mx-auto">
                                    <QuoteCalculator isModal={true} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
