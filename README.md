# SolarPulse — Premium Solar Agency Website

Production-grade Next.js website for SolarPulse, transformed from the original `final.html` brand and design system.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Framer Motion
- Lenis smooth scroll
- React Hook Form + Zod
- Radix UI primitives

## Getting Started

```bash
cd solar-pulse
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint

## Project Structure

- `src/app/(marketing)/` — marketing pages
- `src/components/` — layout, sections, forms, animations, chatbot
- `src/lib/` — utilities, SEO, ROI, blog, chatbot logic
- `content/blog/` — markdown blog posts

## Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (no +) |
| `NEXT_PUBLIC_PHONE` | Click-to-call phone |


