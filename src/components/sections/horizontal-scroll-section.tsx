"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCanAnimate } from "@/hooks/use-can-animate";
import { RevealText } from "@/components/animations/reveal-text";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { step: "01", title: "Site Assessment", desc: "Free expert evaluation of your roof and energy profile." },
  { step: "02", title: "Custom Design", desc: "Engineered system sized for maximum production and aesthetics." },
  { step: "03", title: "Permits & Install", desc: "We handle paperwork; certified crews complete in days." },
  { step: "04", title: "Activation", desc: "Utility interconnection and monitoring go live — start saving." },
];

function StepCard({ item }: { item: (typeof STEPS)[number] }) {
  return (
    <article className="glass-card p-8 md:p-10 rounded-3xl border border-outline-variant/20">
      <p className="text-5xl md:text-6xl font-bold text-secondary/20 m-0" aria-hidden>
        {item.step}
      </p>
      <h3 className="text-headline-md text-primary mt-4 mb-3">{item.title}</h3>
      <p className="text-body-md text-on-surface-variant">{item.desc}</p>
    </article>
  );
}

export function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const canAnimate = useCanAnimate();

  // Mobile: stagger reveal for vertical cards
  useGsapReveal(mobileRef, ".mobile-step", {
    y: 30,
    stagger: 0.1,
    duration: 0.7,
    start: "top 90%",
  });

  useGSAP(
    () => {
      if (!canAnimate || !trackRef.current || !sectionRef.current) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current!;
        const scrollWidth = Math.max(track.scrollWidth - window.innerWidth, 0);
        if (scrollWidth <= 0) return;

        const tween = gsap.to(track, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: "transform" });
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [canAnimate] }
  );

  return (
    <section ref={sectionRef} className="relative bg-surface-container-low">
      <div className="py-12 md:py-16 px-margin-mobile md:px-margin-desktop">
        <RevealText as="h2" className="text-headline-lg text-primary" blur>
          Your Solar Journey
        </RevealText>
        <p className="text-body-lg text-on-surface-variant mt-2 max-w-xl">
          From first call to flipping the switch — a seamless four-step process.
        </p>
      </div>

      {/* Mobile & tablet: vertical stack (no ScrollTrigger pin) */}
      <div ref={mobileRef} className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 px-margin-mobile md:px-margin-desktop pb-12">
        {STEPS.map((item) => (
          <div key={item.step} className="mobile-step">
            <StepCard item={item} />
          </div>
        ))}
      </div>

      {/* Desktop: horizontal scroll track */}
      <div className="hidden lg:block overflow-hidden pb-24">
        <div
          ref={trackRef}
          className="flex gap-8 px-margin-desktop w-max will-change-transform"
        >
          {STEPS.map((item) => (
            <article
              key={item.step}
              className="w-[400px] shrink-0 glass-card p-10 rounded-3xl border border-outline-variant/20"
            >
              <p className="text-6xl font-bold text-secondary/20 m-0" aria-hidden>
                {item.step}
              </p>
              <h3 className="text-headline-md text-primary mt-4 mb-3">{item.title}</h3>
              <p className="text-body-md text-on-surface-variant">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
