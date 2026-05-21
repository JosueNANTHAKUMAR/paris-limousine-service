import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

const conversionScript = `
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': 'AW-17979052174/GVN2CJ_firEcEI6hiv1C',
      'value': 110.0,
      'currency': 'EUR'
    });
  }
`;

export const metadata: Metadata = {
  title: "Booking Confirmed | Paris Airports Transfers",
  description: "Your transfer request has been received. We will contact you shortly to confirm your booking.",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <script dangerouslySetInnerHTML={{ __html: conversionScript }} />
      <header className="bg-slate-950/95 border-b border-slate-800/50">
        <div className="container mx-auto px-4 h-20 flex items-center">
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
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto border border-[#D4AF37]/30">
            <CheckCircle className="h-10 w-10 text-[#D4AF37]" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-serif text-slate-50">Booking Received</h1>
            <p className="text-slate-400 leading-relaxed">
              Thank you for your request. Our team will contact you shortly to confirm your transfer and provide a final quote.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-left space-y-3 text-sm">
            <p className="text-slate-300">
              <span className="text-[#D4AF37] font-semibold">What happens next?</span>
            </p>
            <ul className="space-y-2 text-slate-400">
              <li>✓ You will receive a confirmation email within 30 minutes</li>
              <li>✓ Our chauffeur will be assigned to your transfer</li>
              <li>✓ We will send you driver details 24h before pickup</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] text-white font-bold text-sm rounded-full hover:bg-[#20bd5a] transition-colors"
            >
              Contact via WhatsApp
            </a>
            <Link
              href="/"
              className="px-6 py-3 bg-slate-800 text-slate-300 font-medium text-sm rounded-full hover:bg-slate-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
