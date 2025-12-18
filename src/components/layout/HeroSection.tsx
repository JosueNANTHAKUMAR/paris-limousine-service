import { QuoteCalculator } from "@/components/features/QuoteCalculator";
import Image from "next/image";

export function HeroSection() {
    return (
        <section id="booking" className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden">
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
                {/* Text Content */}
                <div className="space-y-8 text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-slate-50 leading-tight">
                        Experience Paris in <br />
                        <span className="text-[#D4AF37]">
                            Timeless Luxury
                        </span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-light">
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
