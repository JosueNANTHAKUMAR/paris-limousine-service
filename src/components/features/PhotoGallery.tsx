"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const GALLERY_ITEMS = [
    // Grande photo héro de la galerie — voiture face à la Tour Eiffel
    {
        src: "/images/photo_voiture/car-eiffel-front.jpeg",
        alt: "Mercedes S-Class Tour Eiffel Front",
        label: "Iconic Paris",
        className: "md:col-span-2 md:row-span-2",
        objectPosition: "object-center",
        priority: true,
    },
    // Intérieur panoramique vertical
    {
        src: "/images/photo_voiture/car-interior-fiji.jpeg",
        alt: "Intérieur cuir premium",
        label: "Premium Interior",
        className: "md:col-span-1 md:row-span-2",
        objectPosition: "object-center",
    },
    // Étoile mercedes + tour eiffel
    {
        src: "/images/photo_voiture/car-star-tower.jpeg",
        alt: "Mercedes Star — Tour Eiffel",
        label: "The Star",
        className: "md:col-span-1 md:row-span-1",
        objectPosition: "object-top",
    },
    // Vue intérieure large
    {
        src: "/images/photo_voiture/car-interior-all.jpeg",
        alt: "Salon intérieur S-Class",
        label: "Lounge Experience",
        className: "md:col-span-2 md:row-span-1",
        objectPosition: "object-center",
    },
    // Capot étoile
    {
        src: "/images/photo_voiture/car-hood-star.jpeg",
        alt: "Capot Mercedes S-Class",
        label: "Precision Craft",
        className: "md:col-span-1 md:row-span-1",
        objectPosition: "object-center",
    },
    // Jante
    {
        src: "/images/photo_voiture/car-wheel-tower.jpeg",
        alt: "Jante AMG — Tour Eiffel",
        label: "AMG Detail",
        className: "md:col-span-1 md:row-span-1",
        objectPosition: "object-center",
    },
    // Toit ouvrant
    {
        src: "/images/photo_voiture/car-interior-sunroof.jpeg",
        alt: "Toit panoramique cuir crème",
        label: "Panoramic Roof",
        className: "md:col-span-1 md:row-span-1",
        objectPosition: "object-top",
    },
];

export function PhotoGallery() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Ambient light accents */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-[#D4AF37]/5 blur-[100px]" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-slate-700/20 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-semibold mb-4">
                            The Collection
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-50 italic mb-5">
                            Art of the Journey
                        </h2>
                        <div className="h-px w-28 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto" />
                    </div>
                </ScrollReveal>

                {/* Bento Grid — rangées de 300px pour vraiment montrer les photos */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[240px] md:auto-rows-[300px]">
                    {GALLERY_ITEMS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.9,
                                delay: idx * 0.08,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`group relative rounded-[20px] overflow-hidden cursor-pointer ring-1 ring-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.6)] ${item.className || ""}`}
                        >
                            {/* Full-quality image */}
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                priority={item.priority}
                                quality={90}
                                className={`object-cover ${item.objectPosition} group-hover:scale-[1.08] transition-transform duration-[1400ms] ease-out`}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Permanent subtle vignette at bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                            {/* Gold border shimmer on hover */}
                            <div className="absolute inset-0 rounded-[20px] ring-1 ring-[#D4AF37]/0 group-hover:ring-[#D4AF37]/40 transition-all duration-700" />

                            {/* Label always visible at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <p className="text-[#D4AF37] text-[9px] uppercase tracking-[0.35em] font-bold mb-0.5 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                                    Mercedes-Benz
                                </p>
                                <p className="text-slate-100 font-serif text-base italic leading-tight group-hover:text-white transition-colors duration-300">
                                    {item.label}
                                </p>
                            </div>

                            {/* Top-right badge for the hero tile */}
                            {item.priority && (
                                <div className="absolute top-4 right-4 px-3 py-1 bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full">
                                    <span className="text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest">
                                        Paris
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Bottom accent */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 flex justify-center"
                >
                    <div className="flex items-center gap-6 text-slate-600">
                        <div className="h-px w-12 bg-slate-800" />
                        <span className="text-[9px] uppercase tracking-[0.6em] font-light italic text-slate-500">
                            Excellence in Motion
                        </span>
                        <div className="h-px w-12 bg-slate-800" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
