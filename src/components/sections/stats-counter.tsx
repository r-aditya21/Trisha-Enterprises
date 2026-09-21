"use client";

import { useRef } from "react";
import { STATS } from "@/constants/data";
import { useCountUp } from "@/hooks/use-count-up";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

function AnimatedStat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const display = useCountUp(ref, { end: value, suffix });

  return (
    <div ref={ref} className="stat-item min-w-0 px-1">
      <span
        className="text-3xl md:text-4xl font-bold tabular-nums block text-white"
        aria-label={`${value}${suffix}`}
      >
        {display}
      </span>
      <p className="text-sm md:text-base text-primary-fixed-dim mt-2 leading-snug">
        {label}
      </p>
    </div>
  );
}

export function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);

  // Stagger reveal the stat items
  useGsapReveal(sectionRef, ".stat-item", {
    y: 30,
    stagger: 0.12,
    duration: 0.7,
    start: "top 85%",
  });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 px-margin-mobile md:px-margin-desktop bg-primary text-white"
      aria-label="Company statistics"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
        {STATS.map((stat) => (
          <AnimatedStat
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}
