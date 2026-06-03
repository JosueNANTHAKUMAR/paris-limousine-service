"use client";

import { HeroSection } from "@/components/layout/HeroSection";
import { FleetSection } from "@/components/features/FleetSection";
import { HourlyPackages } from "@/components/features/HourlyPackages";
import { DestinationsSection } from "@/components/features/DestinationsSection";
import { FeaturesStrip } from "@/components/features/FeaturesStrip";
import { NAV_LINKS, CONTACT_INFO } from "@/lib/constants";
import { useState } from "react";
import { Shield, Clock, Award, CreditCard, Globe, Heart, Phone, Mail, MapPin, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { SectionTitle } from "@/components/ui/SectionTitle";

import { QuoteCalculator } from "@/components/features/QuoteCalculator";
import { PricingSection } from "@/components/features/PricingSection";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingInitialState, setBookingInitialState] = useState<{ serviceType: 'distance' | 'hourly', duration: string } | undefined>(undefined);
  const activeSection = useActiveSection(["booking", "destinations", "services", "fleet", "packages", "about", "contact"]);

  const openModal = () => {
    setBookingInitialState(undefined);
    setIsModalOpen(true);
    if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(10);
  };

  const handlePackageBooking = (duration: string) => {
    setBookingInitialState({ serviceType: 'hourly', duration });

    // Check if we are on mobile (less than 1024px)
    if (window.innerWidth < 1024) {
      setIsModalOpen(true);
    } else {
      // On desktop, scroll to the booking section at the top
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }

    if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(10);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-gold/30 selection:text-gold">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50 transition-all duration-300"
      >
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/images/logoo.png"
              alt="Paris Limousine Service"
              width={350}
              height={120}
              className="h-[120px] w-auto object-contain"
              priority
            />
          </div>
          {/* Desktop links (visible on lg and up) */}
          <div className="hidden lg:flex items-center space-x-10">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs font-bold transition-colors uppercase tracking-[0.15em] relative group py-2 transform hover:scale-105 ${isActive ? 'text-gold' : 'text-slate-300 hover:text-gold'
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ease-out shadow-[0_0_10px_rgba(212,175,55,0.5)] ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </Link>
              );
            })}
          </div>
          {/* Mobile hamburger button */}
          <button
            className="lg:hidden p-2 text-slate-300 hover:text-gold transition-colors"
            onClick={() => {
              setNavOpen(true);
              if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(10);
            }}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden lg:block">
            <a href="#booking" className="px-8 py-4 bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-widest rounded-full hover:bg-[#E5C55D] shadow-xl shadow-gold/20 transform hover:scale-110 transition-all duration-300 border-2 border-white/10 active:scale-95">
              Book Now
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {navOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNavOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-slate-950 border-l border-slate-800/50 z-[70] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
                <div className="text-xl font-serif font-bold text-slate-50">
                  Menu
                </div>
                <button
                  className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-gold hover:bg-slate-800 transition-colors"
                  onClick={() => {
                    setNavOpen(false);
                    if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(5);
                  }}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-8 px-6">
                <div className="space-y-2">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="block py-3 px-4 text-base font-medium text-slate-300 hover:text-gold hover:bg-slate-900/50 rounded-lg transition-all duration-200 group"
                        onClick={() => {
                          setNavOpen(false);
                          if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(10);
                        }}
                      >
                        <span className="flex items-center justify-between">
                          {link.label}
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Footer CTA */}
              <div className="p-6 border-t border-slate-800/50">
                <a
                  href="#booking"
                  onClick={() => setNavOpen(false)}
                  className="block w-full py-4 px-6 bg-[#D4AF37] text-black font-extrabold text-sm uppercase tracking-widest rounded-full text-center hover:bg-[#E5C55D] shadow-xl shadow-gold/20 transform active:scale-95 transition-all duration-300"
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <HeroSection onOpenModal={openModal} initialBookingState={bookingInitialState} />

      <FeaturesStrip />

      <PricingSection />

      <DestinationsSection />

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-900 relative z-10 overflow-hidden">
        <BackgroundPattern opacity={0.02} />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <SectionTitle
              title="Our Services"
              subtitle="Tailor made travel just for you"
              light={true}
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Clock className="h-6 w-6" />, title: "By The Hour", subtitle: "As Directed Hire", desc: "Transparent hourly pricing with no hidden extras keeps you in control." },
              { icon: <Globe className="h-6 w-6" />, title: "Airport", subtitle: "Meet and Greet", desc: "Expect high-flying service and style with our all-inclusive airport meet." },
              { icon: <BriefcaseIcon className="h-6 w-6" />, title: "City to City", subtitle: "Business Travel", desc: "Luxury transport solutions for seamless city-to-city journeys." }
            ].map((service, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.2}>
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-gold/50 transition-all duration-500 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/5">
                  <div className="h-14 w-14 bg-slate-900 rounded-2xl flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-slate-950 transition-colors duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-serif text-slate-50 mb-2">{service.title}</h3>
                  <p className="text-gold text-xs uppercase tracking-[0.2em] mb-4 font-medium">{service.subtitle}</p>
                  <p className="text-slate-400 leading-relaxed mb-6 font-light">
                    {service.desc}
                  </p>
                  {/* Read More removed */}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FleetSection />

      <HourlyPackages onBookPackage={handlePackageBooking} />

      {/* Why Choose Us */}
      <section id="about" className="py-24 bg-slate-900 relative overflow-hidden z-10">
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <SectionTitle
              title="Why Choose Us?"
              subtitle="Empowering Your Business Vision, Transforming The Challenges Into Opportunities."
              light={true}
            />
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
            {[
              { icon: <Shield className="h-6 w-6" />, title: "Private Service", desc: "The service is tailor-made for you. Enjoy your unique ride!" },
              { icon: <CreditCard className="h-6 w-6" />, title: "Trusted", desc: "We offer a guaranteed secure payment infrastructure. Stripe, PayPal, and more.." },
              { icon: <Award className="h-6 w-6" />, title: "Satisfied Customers", desc: "We have one of the best reputations in the airport transfer market." },
              { icon: <Heart className="h-6 w-6" />, title: "100% Refund", desc: "Extra assurance, always take advantage of our money-back guaranteed service." },
              { icon: <Globe className="h-6 w-6" />, title: "Globally Engaged", desc: "Compare prices with a wide range of fleets that meet your requirements." },
              { icon: <Phone className="h-6 w-6" />, title: "24/7 Customer Help", desc: "We are always with you to give you the most special service." }
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <FeatureItem
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-950 relative z-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <SectionTitle
              title="Frequently Asked Questions"
              subtitle="Everything you need to know before booking your Paris transfer"
              light
            />
          </ScrollReveal>
          <div className="space-y-4">
            {[
              {
                q: "How much does a CDG airport transfer to Paris cost?",
                a: "From €110 for the Mercedes E-Class (up to 4 passengers). The price is fixed and all-inclusive — no meter, no hidden fees, no toll surcharges."
              },
              {
                q: "How long does the journey from CDG to Paris take?",
                a: "Approximately 40–55 minutes by private car. CDG is 35 km north-east of Paris. Traffic can vary; we always account for it in our scheduling."
              },
              {
                q: "Do you cover Orly Airport?",
                a: "Yes. Orly to Paris starts from €90. All four Orly terminals covered (Orly 1, 2, 3, 4). Orly is only 14 km from central Paris."
              },
              {
                q: "What happens if my flight is delayed?",
                a: "We track all flights in real time. Your driver is notified automatically and waits at no extra charge. You will never be left stranded."
              },
              {
                q: "Can I go directly from the airport to Disneyland Paris?",
                a: "Yes. CDG → Disneyland Paris from €110, Orly → Disneyland from €120. Direct route, no Paris transit, child seats available."
              },
              {
                q: "Do you offer transfers to Versailles?",
                a: "Yes. Paris → Versailles from €110, CDG → Versailles from €140, Orly → Versailles from €120. All fixed prices, door to Palace entrance."
              },
              {
                q: "How do I meet my driver at the airport?",
                a: "Your driver waits in the arrivals hall with a name board. All CDG terminals (T1, T2A–F, T3) and all Orly terminals are covered."
              },
              {
                q: "What vehicles are available?",
                a: "Mercedes E-Class (up to 4 pax), V-Class (up to 7 pax — ideal for families), and S-Class (up to 3 pax — first-class comfort)."
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <details className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-gold/30 transition-colors">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none gap-4">
                    <h3 className="text-slate-200 font-medium text-base pr-4">{item.q}</h3>
                    <span className="text-gold text-xl shrink-0 group-open:rotate-45 transition-transform duration-300">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-400 font-light leading-relaxed border-t border-slate-800/50 pt-4">
                    {item.a}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-950 pt-24 pb-12 border-t border-slate-900 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="text-2xl font-serif font-bold text-slate-50 mb-4 tracking-tight">
                Paris<span className="text-gold">AirportsTransfers</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-light text-sm">
                Premium private chauffeur service in Paris.
                Fixed-rate airport transfers 24/7 — CDG, Orly, Le Bourget, Versailles, Disneyland.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-serif text-slate-50 mb-8 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold"></span>
              </h4>
              <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-slate-400 hover:text-gold transition-colors flex items-center group text-sm">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-serif text-slate-50 mb-8 relative inline-block">
                Popular Transfers
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold"></span>
              </h4>
              <ul className="space-y-4">
                {[
                  { label: "CDG → Paris", href: "/cdg-paris-transfer" },
                  { label: "Orly → Paris", href: "/orly-paris-transfer" },
                  { label: "CDG → Disneyland", href: "/disneyland-paris-transfer" },
                  { label: "Paris → Versailles", href: "/paris-versailles-transfer" },
                  { label: "CDG → Versailles", href: "/cdg-versailles-transfer" },
                  { label: "All routes →", href: "/transfers" },
                ].map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-400 hover:text-gold transition-colors flex items-center group text-sm">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-serif text-slate-50 mb-8 relative inline-block">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold"></span>
              </h4>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4 text-slate-400 group">
                  <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-gold group-hover:text-slate-950 transition-colors">
                    <MapPin className="h-5 w-5 shrink-0" />
                  </div>
                  <span className="mt-1 font-light text-sm">{CONTACT_INFO.address}</span>
                </li>
                <li className="flex items-center space-x-4 text-slate-400 group">
                  <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-gold group-hover:text-slate-950 transition-colors">
                    <Mail className="h-5 w-5 shrink-0" />
                  </div>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="font-light hover:text-gold transition-colors text-sm">{CONTACT_INFO.email}</a>
                </li>
                <li className="flex items-center space-x-4 text-slate-400 group">
                  <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-gold group-hover:text-slate-950 transition-colors">
                    <Phone className="h-5 w-5 shrink-0" />
                  </div>
                  <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="font-light hover:text-gold transition-colors text-sm flex items-center gap-2">
                    {CONTACT_INFO.phone}
                    <span className="text-[10px] bg-[#25D366] text-white px-1.5 py-0.5 rounded font-bold">WhatsApp</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 text-center text-slate-500 text-sm font-light">
            <p>{CONTACT_INFO.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Global Mobile Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-x-0 bottom-0 top-16 bg-slate-900 rounded-t-[2.5rem] border-t border-slate-800 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Handle Bar */}
              <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mt-4 mb-2 shrink-0" />

              <div className="p-6 flex items-center justify-between border-b border-slate-800/50 shrink-0">
                <h3 className="text-2xl font-serif text-slate-50">Book Your Transfer</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-hidden relative bg-slate-900">
                <div className="h-full max-w-md mx-auto">
                  <QuoteCalculator
                    isModal={true}
                    initialServiceType={bookingInitialState?.serviceType}
                    initialDuration={bookingInitialState?.duration}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Book Now Bar (Mobile) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: activeSection !== "booking" ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 inset-x-0 z-[40] lg:hidden pointer-events-none"
      >
        <div className="pointer-events-auto bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 px-4 py-3 flex items-center gap-3">
          <button
            onClick={openModal}
            className="flex-1 py-3.5 bg-[#D4AF37] text-slate-950 font-bold text-base rounded-2xl shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            Book Now <ArrowRight className="h-5 w-5" />
          </button>
          <a
            href="https://wa.me/33781822163?text=Hello%2C%20I%27d%20like%20to%20book%20a%20Paris%20transfer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-2xl shadow-lg active:scale-95 transition-all shrink-0"
          >
            <svg className="h-7 w-7 fill-white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </motion.div>

      {/* Back to Top Button (Mobile Optimized) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(10);
        }}
        className="fixed bottom-24 right-6 z-[40] p-3 bg-slate-800 text-gold rounded-full shadow-xl border border-slate-700 lg:hidden"
        aria-label="Back to top"
      >
        <ArrowRight className="h-5 w-5 -rotate-90" />
      </motion.button>
    </main>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start space-x-5 group">
      <div className="h-12 w-12 bg-slate-800/50 rounded-xl flex items-center justify-center text-gold shrink-0 group-hover:bg-gold group-hover:text-slate-950 transition-colors duration-500 shadow-lg shadow-black/20">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-serif text-slate-50 mb-3 group-hover:text-gold transition-colors">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  )
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}
