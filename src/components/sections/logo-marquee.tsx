"use client";

import { useRef } from "react";
import { LOGO_PARTNERS } from "@/constants/data";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

// Double for seamless infinite loop
const DISPLAY_ITEMS = [...LOGO_PARTNERS, ...LOGO_PARTNERS];

export function LogoMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  // Fade-in the entire section on scroll
  useGsapReveal(sectionRef, ".marquee-track", {
    y: 0,
    fromOpacity: 0,
    duration: 0.8,
    start: "top 92%",
  });

  return (
    <section
      ref={sectionRef}
      className="py-16 border-y border-outline-variant/20 overflow-hidden bg-white"
      aria-label="Our technology partners"
    >
      {/* aria-label on the visible list; duplicates are hidden from screen readers */}
      <ul
        className="marquee-track flex animate-marquee w-max gap-12 md:gap-16 px-8 list-none m-0 p-0"
        aria-label="Partner brands"
      >
        {DISPLAY_ITEMS.map((name, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= LOGO_PARTNERS.length ? "true" : undefined}
            className="text-label-md text-on-surface-variant/50 whitespace-nowrap normal-case tracking-widest font-semibold"
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
