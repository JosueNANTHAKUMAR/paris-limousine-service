"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Clock, MapPin, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";

const LANDMARKS = [
    { name: "Eiffel Tower", image: "/images/landmarks/eiffel.jpg" },
    { name: "The Louvre", image: "/images/landmarks/louvre.jpg" },
    { name: "Notre Dame de Paris", image: "/images/landmarks/notre-dame.jpg" },
    { name: "Arc de triomph", image: "/images/landmarks/arc-triomphe.jpg" },
    { name: "Montmartre", image: "/images/landmarks/montmartre.jpg" },
    { name: "Avenue des champs elysée", image: "/images/landmarks/champs-elysees.jpg" },
    { name: "Musée d’orsay", image: "/images/landmarks/orsay.jpg" },
    { name: "Sainte-chapelle", image: "/images/landmarks/sainte-chapelle.jpg" }
];

const PACKAGES = [
    {
        title: "Paris day trip",
        duration: "4 hours",
        type: "By The Hour",
        description: "Eiffel Tower, The Louvre, Notre Dame de Paris, Arc de triomph, Montmartre, Avenue des champs elysée, Musée d’orsay, Sainte-chapelle",
        image: "/images/paris-day.jpg"
    },
    {
        title: "Paris day trip",
        duration: "8 hours",
        type: "By The Hour",
        description: "Eiffel Tower, The Louvre, Notre Dame de Paris, Arc de triomph, Montmartre, Avenue des champs elysée, Musée d’orsay, Sainte-chapelle",
        image: "/images/paris-full-day.jpg"
    },
    {
        title: "Paris night trip",
        duration: "4 hours",
        type: "By The Hour",
        description: "Eiffel Tower, The Louvre, Notre Dame de Paris, Arc de triomph, Montmartre, Avenue des champs elysée, Musée d’orsay, Sainte-chapelle",
        image: "/images/paris-night.jpg"
    }
];

export function HourlyPackages() {
    const [selectedPackage, setSelectedPackage] = useState<typeof PACKAGES[0] | null>(null);

    const handleBookPackage = () => {
        setSelectedPackage(null);
        const element = document.getElementById('booking');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="packages" className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background Texture */}
            <BackgroundPattern opacity={0.03} />

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-serif text-slate-50">Hourly Hire Package</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            Are you looking to hire a Paris Disney Transfer car for a day out with a driver, or perhaps just a few hours? Choose your perfect plan.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-8">
                    {PACKAGES.map((pkg, idx) => (
                        <ScrollReveal key={idx} delay={idx * 0.1}>
                            <div
                                onClick={() => setSelectedPackage(pkg)}
                                className="group bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden hover:border-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5 flex flex-col h-full cursor-pointer"
                            >
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-slate-900 p-3 rounded-xl text-gold group-hover:bg-gold group-hover:text-slate-950 transition-colors duration-300">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs font-bold text-gold uppercase tracking-wider border border-gold/20 px-3 py-1 rounded-full">
                                            {pkg.type}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-serif text-slate-50 mb-2">{pkg.title}</h3>
                                    <div className="text-4xl font-serif text-gold mb-6">
                                        {pkg.duration}
                                    </div>

                                    <div className="flex-1" />

                                    <div className="mt-auto pt-6 border-t border-slate-800/50">
                                        <div className="text-gold text-sm font-bold uppercase tracking-wider flex items-center group-hover:text-gold-light transition-colors">
                                            View Destinations <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* Package Details Modal */}
            <AnimatePresence>
                {selectedPackage && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPackage(null)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 flex flex-col max-h-[90vh]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedPackage(null)}
                                className="absolute top-4 right-4 p-2 bg-slate-800/50 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors z-10"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Header Image */}
                            <div className="relative h-48 shrink-0">
                                <Image
                                    src={selectedPackage.image}
                                    alt={selectedPackage.title}
                                    fill
                                    className="object-cover opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="text-gold text-sm font-bold tracking-wider uppercase mb-2">
                                        {selectedPackage.type}
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <h3 className="text-3xl md:text-4xl font-serif text-slate-50">{selectedPackage.title}</h3>
                                        <div className="text-2xl text-gold font-serif">{selectedPackage.duration}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-slate-950">
                                <div className="text-center mb-10">
                                    <h4 className="text-3xl font-serif text-gold mb-2">
                                        Included Destinations
                                    </h4>
                                    <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                                    {LANDMARKS.map((landmark, idx) => (
                                        <div key={idx} className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-slate-800/50 hover:border-gold/50 transition-all duration-500 shadow-lg shadow-black/20">
                                            <Image
                                                src={landmark.image}
                                                alt={landmark.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-0 transition-transform duration-500">
                                                <div className="w-8 h-0.5 bg-gold mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <p className="text-lg font-serif text-slate-100 leading-tight group-hover:text-gold transition-colors duration-300">
                                                    {landmark.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-center">
                                    <Button
                                        onClick={handleBookPackage}
                                        className="w-full md:w-auto px-12 !bg-[#D4AF37] hover:!bg-[#E5C55D] !text-black font-bold rounded-full shadow-lg shadow-gold/20 transform hover:scale-[1.02] transition-all"
                                    >
                                        Book This Plan
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
