"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";
import { TESTIMONIALS } from "@/constants/data";
import { RevealText } from "@/components/animations/reveal-text";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

// Quadruple for seamless infinite loop
const MARQUEE_ITEMS = [
  ...TESTIMONIALS,
  ...TESTIMONIALS,
  ...TESTIMONIALS,
  ...TESTIMONIALS,
];

export function TestimonialCarousel() {
  const sectionRef = useRef<HTMLElement>(null);

  // Reveal the heading area
  useGsapReveal(sectionRef, ".testimonial-header", {
    y: 32,
    duration: 0.8,
    start: "top 90%",
  });

  return (
    <section ref={sectionRef} id="reviews" className="py-section bg-surface overflow-hidden">
      <div className="testimonial-header max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-16">
        <div className="max-w-2xl">
          <RevealText as="h2" className="text-headline-lg text-primary mb-4" blur>
            500+ Happy Customers
          </RevealText>
          <p className="text-body-lg text-on-surface-variant">
            Hear from homeowners and businesses already reaping the benefits of
            Trisha Enterprises installations.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        <div className="flex gap-6 md:gap-8 animate-marquee-testimonial hover:[animation-play-state:paused] w-max">
          {MARQUEE_ITEMS.map((t, i) => (
            <article
              key={`${t.id}-${i}`}
              aria-hidden={i >= TESTIMONIALS.length ? "true" : undefined}
              className="glass-card p-6 md:p-8 rounded-3xl shadow-sm border border-outline-variant/20 flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center gap-4 mb-6">
                {t.avatar ? (
                  <Image
                    src={t.avatar}
                    alt={`${t.name} profile photo`}
                    width={64}
                    height={64}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-secondary-fixed-dim"
                  />
                ) : (
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary text-lg shrink-0"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                )}
                <div>
                  <h4 className="text-headline-sm text-primary">{t.name}</h4>
                  <p className="text-label-md text-on-surface-variant normal-case tracking-normal">
                    {t.location}
                  </p>
                </div>
              </div>
              <div
                className="flex text-tertiary-fixed-dim mb-4"
                aria-label="Rating: 5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 md:h-5 md:w-5 fill-tertiary-fixed-dim" aria-hidden />
                ))}
              </div>
              <p className="text-body-md text-on-surface-variant italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2 text-secondary">
                <BadgeCheck className="h-4 w-4" aria-hidden />
                <p className="text-label-md normal-case tracking-normal m-0">
                  Verified Installation
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
