"use client";

import { QuoteCalculator } from "@/components/features/QuoteCalculator";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
    onOpenModal: () => void;
    initialBookingState?: { serviceType: 'distance' | 'hourly', duration: string };
}

export function HeroSection({ onOpenModal, initialBookingState }: HeroSectionProps) {
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
                            onClick={onOpenModal}
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
                    <QuoteCalculator
                        initialServiceType={initialBookingState?.serviceType}
                        initialDuration={initialBookingState?.duration}
                    />
                </div>
            </div>
        </section>
    );
}
