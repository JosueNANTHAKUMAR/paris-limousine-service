"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CheckCircle2, ShieldCheck, Clock, Star } from "lucide-react";

const FEATURES = [
    {
        title: "Free Cancellation",
        description: "No penalties or hidden surcharges if you decide to cancel.",
        icon: <CheckCircle2 className="h-6 w-6" />
    },
    {
        title: "Fixed Rates",
        description: "Transparent pricing with no hidden costs or surprises.",
        icon: <Star className="h-6 w-6" />
    },
    {
        title: "Quality Vehicles",
        description: "Premium Mercedes-Benz fleet maintained to highest standards.",
        icon: <ShieldCheck className="h-6 w-6" />
    },
    {
        title: "24 hr Service",
        description: "Round-the-clock support for all your travel needs.",
        icon: <Clock className="h-6 w-6" />
    }
];

export function FeaturesStrip() {
    return (
        <section className="py-12 bg-slate-900 border-y border-slate-800 relative z-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURES.map((feature, idx) => (
                        <ScrollReveal key={idx} delay={idx * 0.1}>
                            <div className="flex items-start space-x-4 group">
                                <div className="p-2 bg-slate-950 rounded-lg text-gold border border-slate-800 group-hover:border-gold/50 transition-colors">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-slate-50 font-serif font-medium mb-1 group-hover:text-gold transition-colors">
                                        {feature.title}
                                    </h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
