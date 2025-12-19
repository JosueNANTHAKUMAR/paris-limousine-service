"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight, Plane, Castle, Map } from "lucide-react";
import Image from "next/image";

const DESTINATIONS = [
    {
        title: "Paris Airport Transfer",
        description: "You can pre-order inexpensive private transfer to CDG Airport",
        icon: <Plane className="h-8 w-8" />,
        image: "/images/airport-transfer.jpg", // Placeholder
        link: "#booking"
    },
    {
        title: "Disneyland Paris Transfer",
        description: "Disneyland Paris private transfers from CDG Airport, Orly Airport",
        icon: <Castle className="h-8 w-8" />,
        image: "/images/disney-transfer.jpg", // Placeholder
        link: "#booking"
    },
    {
        title: "Paris City Transfer",
        description: "Explore Paris with private transfers from CDG and Orly Airport",
        icon: <Map className="h-8 w-8" />,
        image: "/images/city-transfer.jpg", // Placeholder
        link: "#booking"
    }
];

import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function DestinationsSection() {
    return (
        <section id="destinations" className="py-24 bg-slate-950 relative">
            <BackgroundPattern opacity={0.02} />
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <SectionTitle
                        title="Popular Destinations"
                        subtitle="Discover our most requested transfer services"
                        light={true}
                    />
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-8">
                    {DESTINATIONS.map((dest, idx) => (
                        <ScrollReveal key={idx} delay={idx * 0.1}>
                            <div className="group relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer">
                                {/* Background Image */}
                                <div className="absolute inset-0 bg-slate-900">
                                    {/* Placeholder for image */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 z-10" />
                                    <Image
                                        src={dest.image}
                                        alt={dest.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-40"
                                    />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                                    <div className="mb-auto transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="bg-gold/20 p-3 rounded-xl inline-block backdrop-blur-sm">
                                            <div className="text-gold">{dest.icon}</div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-serif text-slate-50 mb-3 group-hover:text-gold transition-colors duration-300">
                                        {dest.title}
                                    </h3>
                                    <p className="text-slate-300 font-light mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {dest.description}
                                    </p>

                                    {/* View Details removed */}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
