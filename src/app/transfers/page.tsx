import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Phone } from "lucide-react";
import { TRANSFER_ROUTES } from "@/lib/routes";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "All Paris Airport Transfer Routes | Fixed Prices | Paris Airports Transfers",
  description: "Browse all 15 fixed-price private transfer routes in Paris — CDG, Orly, Le Bourget, Versailles, Disneyland Paris. Book online in 2 minutes.",
  alternates: {
    canonical: "https://www.parisairportstransfers.com/transfers",
  },
  openGraph: {
    title: "All Paris Airport Transfer Routes | Fixed Prices",
    description: "All 15 fixed-price private transfer routes — CDG, Orly, Versailles, Disneyland Paris.",
    url: "https://www.parisairportstransfers.com/transfers",
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Paris Airport Transfer Routes",
  "description": "All private chauffeur transfer routes available in Paris and the Île-de-France region.",
  "numberOfItems": TRANSFER_ROUTES.length,
  "itemListElement": TRANSFER_ROUTES.map((route, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": `${route.fromFull} to ${route.toFull} Transfer`,
    "url": `https://www.parisairportstransfers.com/${route.slug}`,
    "description": route.seoDescription,
  })),
};

const FEATURED_SLUGS = [
  "cdg-paris-transfer",
  "orly-paris-transfer",
  "disneyland-paris-transfer",
  "paris-versailles-transfer",
  "cdg-versailles-transfer",
  "cdg-orly-transfer",
];

export default function TransfersPage() {
  const featured = TRANSFER_ROUTES.filter(r => FEATURED_SLUGS.includes(r.slug));
  const others = TRANSFER_ROUTES.filter(r => !FEATURED_SLUGS.includes(r.slug));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <main className="min-h-screen bg-slate-950 text-slate-50">
        {/* Header */}
        <header className="bg-slate-950/95 border-b border-slate-800/50 sticky top-0 z-50 backdrop-blur-xl">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/">
              <Image
                src="/images/logoo.png"
                alt="Paris Airports Transfers"
                width={280}
                height={95}
                className="h-[70px] w-auto object-contain"
                priority
              />
            </Link>
            <a
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4" />
              {CONTACT_INFO.phone}
            </a>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4 text-sm text-slate-400">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">All Transfers</span>
        </nav>

        {/* Hero */}
        <section className="container mx-auto px-4 pt-6 pb-16">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              15 routes · Fixed prices · Mercedes fleet
            </p>
            <h1 className="text-4xl lg:text-5xl font-serif text-slate-50 leading-tight mb-4">
              All Paris Transfer Routes
            </h1>
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              Fixed-price private chauffeur for every route in Paris and the Île-de-France.
              CDG · Orly · Le Bourget · Versailles · Disneyland Paris.
            </p>
          </div>

          {/* Featured routes */}
          <h2 className="text-xl font-serif text-slate-300 mb-6">Most popular routes</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {featured.map((route) => (
              <Link
                key={route.slug}
                href={`/${route.slug}`}
                className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-[#D4AF37]/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">From</p>
                    <p className="text-slate-200 font-medium">{route.fromLabel}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#D4AF37] mt-1 group-hover:translate-x-1 transition-transform" />
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">To</p>
                    <p className="text-slate-200 font-medium">{route.toLabel}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    ~{route.durationMin} min
                  </div>
                  <span className="text-[#D4AF37] font-bold text-lg">from €{route.prices.eClass}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* All other routes */}
          <h2 className="text-xl font-serif text-slate-300 mb-6">All routes</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((route) => (
              <Link
                key={route.slug}
                href={`/${route.slug}`}
                className="group flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-all"
              >
                <div>
                  <p className="text-sm font-medium text-slate-300 group-hover:text-[#D4AF37] transition-colors">
                    {route.fromLabel} → {route.toLabel}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">~{route.durationMin} min · from €{route.prices.eClass}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-[#D4AF37] transition-colors shrink-0 ml-4" />
              </Link>
            ))}
          </div>
        </section>

        {/* CTA strip */}
        <section className="bg-slate-900 border-y border-slate-800 py-12">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xl font-serif text-slate-50">Don't see your route?</p>
              <p className="text-slate-400 text-sm mt-1">Call us or email — we cover all destinations in the Île-de-France.</p>
            </div>
            <div className="flex gap-4">
              <a
                href={CONTACT_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] text-white font-bold text-sm rounded-full hover:bg-[#20bd5a] transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="px-6 py-3 bg-slate-800 text-slate-300 font-medium text-sm rounded-full hover:bg-slate-700 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </section>

        <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-slate-500 text-sm">
          <p>{CONTACT_INFO.copyright}</p>
        </footer>
      </main>
    </>
  );
}
