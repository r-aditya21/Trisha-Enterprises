"use client";

import { useRef } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/animations/reveal-text";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { EASE_BOUNCE_SOFT } from "@/lib/animation-presets";

const PLANS = [
  {
    name: "2kW Solar System",
    price: "Starting ₹1.1 Lakhs",
    desc: "Ideal for Small Homes",
    subsidy: "Up to ₹60,000",
    features: [
      "4–5 Panels",
      "240–300 Units/Month",
      "Monthly Savings: Up to ₹2,500",
      "Installation: 2–3 Days",
    ],
    featured: false,
  },
  {
    name: "3kW Solar System",
    price: "Starting ₹1.5 Lakhs",
    desc: "Ideal for 2–3 BHK Homes",
    subsidy: "Up to ₹78,000",
    features: [
      "6–8 Panels",
      "360–450 Units/Month",
      "Monthly Savings: Up to ₹4,000",
      "Installation: 2–4 Days",
    ],
    featured: false,
  },
  {
    name: "4kW Solar System",
    price: "Starting ₹2.0 Lakhs",
    desc: "Ideal for Medium Homes",
    subsidy: "Up to ₹78,000",
    features: [
      "8–10 Panels",
      "480–600 Units/Month",
      "Monthly Savings: Up to ₹5,000",
      "Installation: 3–4 Days",
    ],
    featured: true,
  },
  {
    name: "5kW Solar System",
    price: "Starting ₹2.5 Lakhs",
    desc: "Ideal for Large Homes",
    subsidy: "Up to ₹78,000",
    features: [
      "10–13 Panels",
      "600–750 Units/Month",
      "Monthly Savings: Up to ₹7,000",
      "Installation: 3–5 Days",
    ],
    featured: false,
  },
  {
    name: "6kW Solar System",
    price: "Starting ₹3.0 Lakhs",
    desc: "Ideal for Villas & Businesses",
    subsidy: "Up to ₹78,000",
    features: [
      "12–15 Panels",
      "720–900 Units/Month",
      "Monthly Savings: Up to ₹9,000",
      "Installation: 4–6 Days",
    ],
    featured: false,
  },
  {
    name: "Custom Solar Plan",
    price: "Depends on Plan",
    desc: "Ideal for Above 6kW or Commercial Use",
    subsidy: "Up to ₹78,000",
    features: [
      "Custom Panel Count",
      "Output Based on Size",
      "Savings Calculated on Survey",
      "Timeline Varies by Project",
    ],
    featured: false,
  },
] as const;

export function PricingCards() {
  const sectionRef = useRef<HTMLElement>(null);

  // Stagger reveal pricing cards
  useGsapReveal(sectionRef, ".pricing-card", {
    y: 48,
    stagger: 0.08,
    duration: 0.75,
    start: "top 85%",
  });

  return (
    <section
      ref={sectionRef}
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-12 sm:py-16 md:py-section px-0 md:px-margin-desktop bg-surface-container-low/30"
    >
      <div className="text-center mb-10 px-margin-mobile">
        <RevealText
          as="h2"
          id="pricing-heading"
          className="text-headline-lg text-primary mb-4"
          blur
        >
          Our Pricing
        </RevealText>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Transparent pricing with government subsidy included. Choose the plan
          that fits your energy needs.
        </p>
      </div>

      <div
        className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-6 md:pb-0 px-margin-mobile md:px-0"
        role="list"
        aria-label="Pricing plans"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollPadding: "0 1.25rem" }}
      >
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            role="listitem"
            className="pricing-card w-[85vw] sm:w-[350px] md:w-auto shrink-0 snap-center"
          >
            <article
              className={`glass-card p-8 md:p-10 rounded-3xl h-full flex flex-col ${
                plan.featured ? "ring-2 ring-secondary shadow-xl scale-[1.02]" : ""
              }`}
            >
              {plan.featured && (
                <p className="text-label-md text-secondary mb-4 normal-case m-0">
                  Most Popular
                </p>
              )}
              <h3 className="text-headline-md text-primary">{plan.name}</h3>
              <p className="text-headline-sm text-secondary mt-2">{plan.price}</p>
              <p className="text-body-md text-on-surface-variant mt-1 mb-2 font-medium">
                🏛️ Govt. Subsidy: {plan.subsidy}
              </p>
              <p className="text-body-md text-on-surface-variant mt-2 mb-6">{plan.desc}</p>
              <ul className="space-y-3 mb-8 grow" aria-label={`${plan.name} features`}>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-body-md">
                    <Check className="h-4 w-4 text-secondary shrink-0" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={plan.featured ? "primary" : "outline"}
                className="w-full h-12"
              >
                <Link href="/contact">Get Quote</Link>
              </Button>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}