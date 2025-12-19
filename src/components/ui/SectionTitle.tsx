import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
    light?: boolean;
}

export function SectionTitle({ title, subtitle, className, light = false }: SectionTitleProps) {
    // Split title to highlight the last word or specific parts if needed
    // For now, we'll keep it simple and allow the caller to pass rich text if needed, 
    // but for this component, we'll assume simple strings or handle highlighting internally if we want a specific pattern.
    // Given the user request "soulignées en gold", we'll focus on the underline.

    return (
        <div className={clsx("text-center mb-16", className)}>
            <div className="inline-block relative">
                <h2 className={clsx(
                    "text-3xl md:text-5xl font-serif mb-4",
                    light ? "text-slate-50" : "text-slate-900"
                )}>
                    {title}
                </h2>
                <div className="flex items-center justify-center gap-3">
                    <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                    <div className="w-2 h-2 rotate-45 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                    <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                </div>
            </div>
            {subtitle && (
                <p className={clsx(
                    "text-lg font-light leading-relaxed max-w-2xl mx-auto mt-8",
                    light ? "text-slate-400" : "text-slate-600"
                )}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
