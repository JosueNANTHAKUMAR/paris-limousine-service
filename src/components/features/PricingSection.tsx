import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { ArrowRight, Plane, MapPin } from "lucide-react";

interface PriceRoute {
  from: string;
  to: string;
  fromIcon?: "plane" | "pin";
  toIcon?: "plane" | "pin";
  priceFrom: number;
  popular?: boolean;
}

const PRICE_ROUTES: PriceRoute[] = [
  { from: "CDG Airport", to: "Paris City", fromIcon: "plane", toIcon: "pin", priceFrom: 110, popular: true },
  { from: "Orly Airport", to: "Paris City", fromIcon: "plane", toIcon: "pin", priceFrom: 90 },
  { from: "CDG Airport", to: "Disneyland Paris", fromIcon: "plane", toIcon: "pin", priceFrom: 110 },
  { from: "CDG Airport", to: "Versailles", fromIcon: "plane", toIcon: "pin", priceFrom: 140 },
  { from: "Orly Airport", to: "Disneyland Paris", fromIcon: "plane", toIcon: "pin", priceFrom: 120 },
  { from: "Paris City", to: "Versailles", fromIcon: "pin", toIcon: "pin", priceFrom: 110 },
];

function RouteIcon({ type }: { type?: "plane" | "pin" }) {
  if (type === "plane") return <Plane className="h-3.5 w-3.5 text-gold shrink-0" />;
  return <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />;
}

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-slate-950 relative z-10 overflow-hidden">
      <BackgroundPattern opacity={0.02} />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <SectionTitle
            title="Fixed Rates — No Surprises"
            subtitle="All-inclusive prices. No meters, no surge pricing, no hidden fees."
            light
          />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {PRICE_ROUTES.map((route, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <div className={`relative bg-slate-900 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/5 ${route.popular ? "border-gold/40 hover:border-gold/70" : "border-slate-800 hover:border-gold/40"}`}>
                {route.popular && (
                  <div className="absolute -top-3 left-5">
                    <span className="bg-white text-slate-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-6">
                  {/* Route */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2">
                      <RouteIcon type={route.fromIcon} />
                      <span className="text-slate-300 text-sm font-medium">{route.from}</span>
                    </div>
                    <div className="flex items-center gap-2 pl-1.5">
                      <div className="w-0.5 h-4 bg-slate-700 ml-1" />
                    </div>
                    <div className="flex items-center gap-2">
                      <RouteIcon type={route.toIcon} />
                      <span className="text-slate-300 text-sm font-medium">{route.to}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">From</p>
                      <p className="text-4xl font-serif text-gold leading-none">
                        {route.priceFrom}<span className="text-2xl">€</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">Mercedes E-Class · 1–4 pax</p>
                    </div>
                    <a
                      href="#booking"
                      className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 px-4 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/40 border border-white/80"
                    >
                      Book <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust note */}
        <ScrollReveal>
          <p className="text-center text-slate-500 text-sm">
            Prices include all tolls, parking, and meet &amp; greet. Van (up to 7 pax) and S-Class available at higher rates.{" "}
            <a href="#fleet" className="text-gold underline underline-offset-4 hover:text-white transition-colors">View all vehicles →</a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
