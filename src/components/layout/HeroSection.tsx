import { QuoteCalculator } from "@/components/features/QuoteCalculator";
import Image from "next/image";

export function HeroSection() {
    return (
        <section id="booking" className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden snap-start">
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
                        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-serif text-slate-50 leading-[1.1] tracking-tight">
                            Experience Paris
                        </h1>
                        <div className="flex items-center justify-center lg:justify-start gap-4">
                            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-gold"></div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#D4AF37] italic">
                                in Timeless Luxury
                            </h2>
                        </div>
                    </div>
                    <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                        Premium chauffeur services for airport transfers, business travel, and exclusive tours.
                        Fixed rates, professional drivers, and the finest Mercedes-Benz fleet.
                    </p>
                </div>

                {/* Calculator */}
                <div className="flex justify-center lg:justify-end">
                    <QuoteCalculator />
                </div>
            </div>
        </section>
    );
}
