import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.parisairportstransfers.com"),
  title: "CDG & Orly Airport Transfer Paris | Fixed Price from €90 | Paris Airports Transfers",
  description: "Private chauffeur service for CDG & Orly airport transfers to Paris. Fixed prices, no hidden fees. Mercedes fleet. Book online — CDG→Paris from €110, Orly→Paris from €90.",
  keywords: ["CDG airport transfer Paris", "Orly airport transfer Paris", "private driver paris", "paris airport transfer", "VTC Paris CDG", "navette aéroport paris", "taxi CDG Paris"],
  alternates: {
    canonical: "https://www.parisairportstransfers.com",
    languages: {
      "en": "https://www.parisairportstransfers.com",
      "en-US": "https://www.parisairportstransfers.com",
      "en-GB": "https://www.parisairportstransfers.com",
      "x-default": "https://www.parisairportstransfers.com",
    },
  },
  icons: {
    icon: "/logo_og.png",
    apple: "/logo_og.png",
  },
  openGraph: {
    title: "CDG & Orly Airport Transfer Paris | Fixed Price",
    description: "Private chauffeur service for CDG & Orly airport transfers to Paris. Fixed prices from €90.",
    url: "https://www.parisairportstransfers.com",
    siteName: "Paris Airports Transfers",
    images: [
      {
        url: "/logo_og.png",
        width: 1200,
        height: 630,
        alt: "Paris Airports Transfers",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a CDG airport transfer to Paris cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A private transfer from Charles de Gaulle Airport (CDG) to Paris city center costs from €110 for the Mercedes E-Class (up to 4 passengers). The price is fixed and all-inclusive — no meter, no hidden fees, no tolls extra."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the journey from CDG airport to Paris take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The journey from CDG Airport to central Paris typically takes 40–55 minutes by private car, depending on traffic. CDG is located approximately 35 km north-east of Paris."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer transfers from Orly Airport?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer private transfers from Orly Airport (ORY) to Paris from €90 for the Mercedes E-Class. Orly is 14 km south of Paris, making it the closest airport to the city center."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if my flight is delayed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We track all flights in real time. If your flight is delayed, your driver is notified automatically and will wait at no extra charge. You will never be left stranded."
      }
    },
    {
      "@type": "Question",
      "name": "Can I book a direct transfer from CDG airport to Disneyland Paris?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer a direct transfer from CDG Airport to Disneyland Paris from €110. The journey takes approximately 40 minutes. Child seats are available on request."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer transfers to the Palace of Versailles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer transfers from Paris to Versailles from €110, from CDG to Versailles from €140, and from Orly to Versailles from €120. All fixed prices, door-to-door service."
      }
    },
    {
      "@type": "Question",
      "name": "How do I meet my driver at CDG or Orly airport?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your driver will be waiting in the arrivals hall with a name board displaying your name. For CDG, we cover all terminals (T1, T2A–F, T3). For Orly, we cover all four terminals."
      }
    },
    {
      "@type": "Question",
      "name": "What vehicles are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer three Mercedes-Benz vehicles: the E-Class (up to 4 passengers), the V-Class (up to 7 passengers, ideal for families and groups), and the S-Class (up to 3 passengers, first-class comfort)."
      }
    }
  ]
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Paris Airports Transfers",
  "image": "https://www.parisairportstransfers.com/logo_og.png",
  "url": "https://www.parisairportstransfers.com",
  "telephone": "+33781822163",
  "email": "parislimousinetransfer@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "92 Avenue Henri Martin",
    "addressLocality": "Paris",
    "postalCode": "75016",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8566,
    "longitude": 2.3522
  },
  "priceRange": "€€",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "description": "Premium private chauffeur service in Paris. Fixed-rate airport transfers from CDG, Orly and Le Bourget. Mercedes-Benz fleet.",
  "areaServed": ["Paris", "Charles de Gaulle Airport", "Orly Airport", "Disneyland Paris", "Versailles"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Airport Transfer Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "CDG Airport Transfer to Paris",
          "url": "https://www.parisairportstransfers.com/cdg-paris-transfer"
        },
        "price": "110",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Orly Airport Transfer to Paris",
          "url": "https://www.parisairportstransfers.com/orly-paris-transfer"
        },
        "price": "90",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Disneyland Paris Transfer",
          "url": "https://www.parisairportstransfers.com/disneyland-paris-transfer"
        },
        "price": "110",
        "priceCurrency": "EUR"
      }
    ]
  }
};

import { GoogleAnalytics } from '@next/third-parties/google';
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <GoogleAnalytics gaId="AW-17979052174" />
      <head>
        <link rel="alternate" hrefLang="en" href="https://www.parisairportstransfers.com" />
        <link rel="alternate" hrefLang="en-US" href="https://www.parisairportstransfers.com" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.parisairportstransfers.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.parisairportstransfers.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={clsx(
          inter.variable,
          playfair.variable,
          "font-sans antialiased bg-slate-950 text-slate-50 min-h-screen selection:bg-gold selection:text-slate-950"
        )}
      >
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
