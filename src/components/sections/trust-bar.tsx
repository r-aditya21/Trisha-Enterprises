"use client";

import { useRef } from "react";
import Image from "next/image";
import { Sun, Wrench } from "lucide-react";
import { IMAGES } from "@/constants/images";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);

  // Stagger reveal for the 3 trust items
  useGsapReveal(sectionRef, ".trust-item", {
    y: 32,
    fromScale: 0.96,
    stagger: 0.12,
    duration: 0.75,
    start: "top 90%",
  });

  return (
    <>
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop mb-8">
        <hr className="border-outline-variant/30" />
      </div>
      <section
        ref={sectionRef}
        className="bg-white py-8 md:py-12 relative z-20 mt-8 md:-mt-20 mx-margin-mobile md:mx-margin-desktop rounded-2xl shadow-xl border border-outline-variant/30"
        aria-label="Trust indicators"
      >
        <div className="px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="trust-item flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <Image
              src={IMAGES.trust}
              alt="25 year warranty and certified badges"
              width={120}
              height={48}
              className="h-12 w-auto opacity-80"
            />
            <div className="text-center md:text-left">
              <h4 className="text-headline-sm text-primary">25-Year Warranty</h4>
              <p className="text-body-md text-on-surface-variant">Performance guarantee</p>
            </div>
          </div>

          <div className="trust-item flex flex-col md:flex-row items-center gap-4 justify-center border-y md:border-y-0 md:border-x border-outline-variant/20 py-6 md:py-0">
            <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
              <Sun className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-headline-sm text-primary mb-0">100+</p>
              <p className="text-body-md text-on-surface-variant">Total Installations</p>
            </div>
          </div>

          <div className="trust-item flex flex-col md:flex-row items-center gap-4 justify-center md:justify-end">
            <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
              <Wrench className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-headline-sm text-primary">Certified Installers</h4>
              <p className="text-body-md text-on-surface-variant">Expertise you can trust</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
