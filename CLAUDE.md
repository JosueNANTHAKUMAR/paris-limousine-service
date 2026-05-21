# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

No test suite configured.

## Architecture

Single-page Next.js 15 app (App Router) with a booking form that sends lead capture emails via nodemailer.

**Entry points:**
- `src/app/layout.tsx` — root layout with Google Analytics tag (`AW-17979052174`), Inter + Playfair Display fonts
- `src/app/page.tsx` — single large page component containing nav, all sections, and mobile modal logic

**Page sections order:** HeroSection (with embedded QuoteCalculator desktop) → FeaturesStrip → PricingSection → DestinationsSection → Services → FleetSection → HourlyPackages → About → Footer

**Booking flow (lead capture, not payment):**
1. `QuoteCalculator` (4-step wizard) handles both `distance` and `hourly` service types
2. Step 1: origin/destination + date/time; Step 2: vehicle + passengers; Step 3: client info (email required); Step 4: confirmation
3. On submit, `POST /api/booking` sends an HTML email via Gmail SMTP using `EMAIL_USER` / `EMAIL_PASS` env vars
4. Google Ads conversion events fired via `sendGAEvent` on booking completion

**Mobile vs desktop:**
- Desktop: `QuoteCalculator` is embedded in `HeroSection` (left/right grid layout)
- Mobile: `QuoteCalculator` lives in a bottom-sheet modal triggered by a sticky "Book Now" button; `HeroSection` shows a button instead of the form
- Modal state managed in `page.tsx` via `isModalOpen` + `bookingInitialState`

**Pricing logic (`src/lib/hooks/useQuote.ts`):**
- Fixed rates for predefined routes (Paris ↔ CDG/Orly/Disney/Versailles/Le Bourget and inter-airport routes)
- All rates defined in `src/lib/constants.ts` in the `FLEET` array's `fixedRates` field
- Bidirectional routes handled explicitly; unknown routes return `null` (shown as "Sur devis")

**Key data in `src/lib/constants.ts`:** `FLEET` (3 vehicles: E-Class, V-Class, S-Class with rates), `LOCATIONS`, `NAV_LINKS`, `CONTACT_INFO`

**Styling:** Tailwind CSS v4, dark theme (`slate-950` base), gold accent (`#D4AF37` / `text-gold`), Framer Motion for animations, `font-serif` = Playfair Display

**Environment variables required:**
```
EMAIL_USER=   # Gmail address used as sender
EMAIL_PASS=   # Gmail app password
```
