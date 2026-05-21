import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Clock, ArrowRight, Phone } from "lucide-react";
import { QuoteCalculator } from "@/components/features/QuoteCalculator";
import { CONTACT_INFO, FLEET } from "@/lib/constants";
import { TransferRoute, TRANSFER_ROUTES } from "@/lib/routes";

interface RoutePageTemplateProps {
  route: TransferRoute;
}

export function RoutePageTemplate({ route }: RoutePageTemplateProps) {
  const relatedRoutes = route.relatedSlugs
    .map(slug => TRANSFER_ROUTES.find(r => r.slug === slug))
    .filter(Boolean) as TransferRoute[];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.parisairportstransfers.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `${route.fromLabel} to ${route.toLabel} Transfer`,
        "item": `https://www.parisairportstransfers.com/${route.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {CONTACT_INFO.phone}
          </a>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4 text-sm text-slate-400">
        <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">{route.fromLabel} → {route.toLabel}</span>
      </nav>

      {/* Hero grid */}
      <section className="container mx-auto px-4 pt-6 pb-16 grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: info */}
        <div>
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-6">
            Fixed Price Transfer
          </div>

          <h1 className="text-4xl lg:text-5xl font-serif text-slate-50 leading-tight mb-2">
            {route.h1}
          </h1>
          <h2 className="text-3xl lg:text-4xl font-serif text-[#D4AF37] italic mb-6">
            {route.h1Highlight}
          </h2>

          <p className="text-lg text-slate-300 font-light leading-relaxed mb-8">
            {route.intro}
          </p>

          {/* Route info pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-sm text-slate-300">
              <Clock className="h-4 w-4 text-[#D4AF37]" />
              ~{route.durationMin} min
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-sm text-slate-300">
              {route.distanceKm} km
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-sm font-bold text-[#D4AF37]">
              From €{route.prices.eClass}
            </span>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-10">
            {route.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-slate-300">{f}</span>
              </li>
            ))}
          </ul>

          {/* Price table */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-lg font-serif text-slate-50 mb-4">
              {route.fromLabel} → {route.toLabel} — Fixed Prices
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800">
                  <th className="text-left pb-2 font-normal">Vehicle</th>
                  <th className="text-left pb-2 font-normal">Capacity</th>
                  <th className="text-right pb-2 font-normal">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {FLEET.map((vehicle) => {
                  const price = vehicle.id === 'e-class'
                    ? route.prices.eClass
                    : vehicle.id === 'v-class'
                    ? route.prices.vClass
                    : route.prices.sClass;
                  return (
                    <tr key={vehicle.id}>
                      <td className="py-3 text-slate-300">{vehicle.name}</td>
                      <td className="py-3 text-slate-400">1–{vehicle.capacity.pax} pax</td>
                      <td className="py-3 text-right font-bold text-[#D4AF37]">€{price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-xs text-slate-500 mt-4">All-inclusive price. No tolls, no parking, no hidden fees.</p>
          </div>
        </div>

        {/* Right: booking form */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden" id="book">
          <div className="p-5 border-b border-slate-800">
            <h2 className="text-xl font-serif text-slate-50">Book Your Transfer</h2>
            <p className="text-slate-400 text-sm mt-1">
              {route.fromLabel} → {route.toLabel} pre-selected
            </p>
          </div>
          <QuoteCalculator
            initialDeparture={route.fromId}
            initialArrival={route.toId}
          />
        </div>
      </section>

      {/* SEO content */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-serif text-slate-50 mb-8">
            About this transfer: {route.fromFull} → {route.toFull}
          </h2>
          <div className="space-y-5 text-slate-300 font-light leading-relaxed">
            {route.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Related routes */}
      {relatedRoutes.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-xl font-serif text-slate-400 mb-6">Related transfers</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedRoutes.map((r) => (
              <Link
                key={r.slug}
                href={`/${r.slug}`}
                className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all group"
              >
                <div>
                  <div className="text-sm font-medium text-slate-300 group-hover:text-[#D4AF37] transition-colors">
                    {r.fromLabel} → {r.toLabel}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">from €{r.prices.eClass}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-[#D4AF37] transition-colors shrink-0" />
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/" className="text-sm text-slate-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              ← View all services
            </Link>
          </div>
        </section>
      )}

      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-slate-500 text-sm">
        <p>{CONTACT_INFO.copyright}</p>
      </footer>
    </main>
    </>
  );
}
