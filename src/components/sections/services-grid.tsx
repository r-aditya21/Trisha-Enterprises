"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Home, Building2, Wrench } from "lucide-react";
import { SERVICES } from "@/constants/data";
import { RevealText } from "@/components/animations/reveal-text";
import { HoverGlowCard } from "@/components/animations/hover-glow-card";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const ICONS = { home: Home, building: Building2, wrench: Wrench } as const;

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  // Stagger reveal for service cards
  useGsapReveal(sectionRef, ".service-card", {
    y: 40,
    stagger: 0.12,
    duration: 0.8,
    start: "top 85%",
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-section px-margin-mobile md:px-margin-desktop"
      aria-labelledby="services-heading"
    >
      <div className="text-center max-w-2xl mx-auto mb-8">
        <RevealText
          as="h2"
          id="services-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-4"
          blur
          split
        >
          Our Services
        </RevealText>
        <p className="text-body-lg text-on-surface-variant">
          Tailored solar systems designed to maximize efficiency and ROI for every application.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8 max-w-7xl mx-auto">
        {SERVICES.map((service) => {
          const Icon = ICONS[service.icon as keyof typeof ICONS] ?? Home;
          return (
            <div key={service.id} className="service-card">
              <HoverGlowCard>
                <article className="glass-card p-8 sm:p-9 md:p-10 rounded-[var(--radius-card)] flex flex-col h-full hover:shadow-2xl transition-all duration-300 group">
                  <Icon className="h-12 w-12 text-secondary mb-8 group-hover:scale-110 transition-transform" />
                  <h3 className="text-headline-md text-primary mb-4">{service.title}</h3>
                  <p className="text-body-md text-on-surface-variant mb-8 flex-grow">
                    {service.description}
                  </p>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 text-label-md text-secondary normal-case tracking-normal group/btn"
                  >
                    Talk to an Expert
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </article>
              </HoverGlowCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
