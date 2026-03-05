import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import Script from "next/script";

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
  metadataBase: new URL("https://parislimousinetransfer.com"), // Use prod URL or localhost for now
  title: "Paris Limousine Service | Luxury Chauffeur in Paris",
  description: "Premium chauffeur service in Paris. Airport transfers (CDG, Orly), Disneyland Paris, and hourly hire. Book your Mercedes E-Class, V-Class, or S-Class today.",
  icons: {
    icon: "/logo_og.png",
    apple: "/logo_og.png",
  },
  openGraph: {
    title: "Paris Limousine Service",
    description: "Premium chauffeur service in Paris",
    images: [
      {
        url: "/logo_og.png",
        width: 1200,
        height: 630,
        alt: "Paris Limousine Service Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Ads Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17979052174"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17979052174');
          `}
        </Script>
      </head>
      <body
        className={clsx(
          inter.variable,
          playfair.variable,
          "font-sans antialiased bg-slate-950 text-slate-50 min-h-screen selection:bg-gold selection:text-slate-950"
        )}
      >
        {children}
      </body>
    </html>
  );
}
