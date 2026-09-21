"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { PROJECTS } from "@/constants/data";
import { RevealText } from "@/components/animations/reveal-text";
import { Button } from "@/components/ui/button";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

// Double the items for seamless infinite loop
const MARQUEE_ITEMS = [...PROJECTS, ...PROJECTS, ...PROJECTS, ...PROJECTS];

export function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);

  // Reveal the CTA button
  useGsapReveal(sectionRef, ".case-cta", {
    y: 24,
    duration: 0.7,
    start: "top 92%",
  });

  return (
    <section ref={sectionRef} id="projects" className="bg-white overflow-hidden">
      <div className="py-10 text-center max-w-3xl mx-auto mb-10 px-margin-mobile md:px-margin-desktop">
        <RevealText
          as="h2"
          className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4"
          blur
        >
          Recent Installations
        </RevealText>
        <p className="text-body-lg text-on-surface-variant">
          Exceptional quality and precision across residential and commercial landscapes.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        <div className="flex gap-8 animate-marquee-slow hover:[animation-play-state:paused] w-max">
          {MARQUEE_ITEMS.map((project, i) => (
            <article
              key={`${project.id}-${i}`}
              aria-hidden={i >= PROJECTS.length ? "true" : undefined}
              className="group relative overflow-hidden rounded-[2rem] shadow-lg flex-shrink-0 w-[300px] sm:w-[340px] md:w-[420px]"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                loading={i === 0 ? "eager" : "lazy"}
                className="w-full h-[260px] sm:h-[320px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-20" />
              <div className="absolute bottom-0 left-0 p-5 md:p-8 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-secondary-fixed-dim" aria-hidden />
                  <p className="text-white/80 text-label-md normal-case tracking-normal m-0">
                    {project.location}
                  </p>
                </div>
                <h4 className="text-white text-headline-md mb-4">{project.title}</h4>
                <div className="flex gap-3 flex-wrap">
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/20 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10"
                    >
                      <p className="text-white/60 text-[10px] uppercase">{stat.label}</p>
                      <p
                        className={
                          stat.label.includes("Saving") ||
                          stat.label.includes("ROI") ||
                          stat.label.includes("Independence")
                            ? "text-secondary-fixed-dim font-bold text-sm"
                            : "text-white font-bold text-sm"
                        }
                      >
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="case-cta mt-12 text-center px-margin-mobile md:px-margin-desktop pb-12">
        <Button variant="outline" asChild>
          <Link href="/projects">View All Case Studies</Link>
        </Button>
      </div>
    </section>
  );
}
