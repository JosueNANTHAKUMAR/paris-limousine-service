import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TRANSFER_ROUTES, getRouteBySlug } from "@/lib/routes";
import { RoutePageTemplate } from "@/components/features/RoutePageTemplate";

interface Props {
  params: Promise<{ transfer: string }>;
}

export function generateStaticParams() {
  return TRANSFER_ROUTES.map((r) => ({ transfer: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { transfer } = await params;
  const route = getRouteBySlug(transfer);
  if (!route) return {};

  const canonicalUrl = `https://www.parisairportstransfers.com/${route.slug}`;

  return {
    title: route.seoTitle,
    description: route.seoDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: route.seoTitle,
      description: route.seoDescription,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function TransferPage({ params }: Props) {
  const { transfer } = await params;
  const route = getRouteBySlug(transfer);
  if (!route) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${route.fromFull} to ${route.toFull} Transfer`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Paris Airports Transfers",
      "telephone": "+33781822163",
      "url": "https://www.parisairportstransfers.com",
    },
    "description": route.seoDescription,
    "areaServed": [route.fromLabel, route.toLabel],
    "offers": {
      "@type": "Offer",
      "price": String(route.prices.eClass),
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
    },
    "serviceType": "Private Transfer",
    "url": `https://www.parisairportstransfers.com/${route.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RoutePageTemplate route={route} />
    </>
  );
}
