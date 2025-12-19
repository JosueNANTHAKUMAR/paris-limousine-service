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
            <h2 className={clsx(
                "text-3xl md:text-5xl font-serif mb-6 relative inline-block",
                light ? "text-slate-50" : "text-slate-900"
            )}>
                {title}
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></span>
            </h2>
            {subtitle && (
                <p className={clsx(
                    "text-lg font-light leading-relaxed max-w-2xl mx-auto mt-4",
                    light ? "text-slate-400" : "text-slate-600"
                )}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
