"use client";

import { useRef } from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { ContactForm } from "@/components/forms/contact-form";
import { RevealText } from "@/components/animations/reveal-text";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Desktop: split-card reveal — left slides from left, right slides from right
  useGsapReveal(sectionRef, ".contact-left", {
    x: -40,
    y: 0,
    duration: 0.9,
    start: "top 82%",
  });

  useGsapReveal(sectionRef, ".contact-right", {
    x: 40,
    y: 0,
    duration: 0.9,
    start: "top 82%",
    delay: 0.15,
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-section px-margin-mobile md:px-margin-desktop relative"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row rounded-[2rem] overflow-hidden shadow-2xl border border-outline-variant/20">
        <div className="contact-left lg:w-1/2 bg-white p-8 md:p-16">
          <div className="flex items-center gap-3 mb-6 text-secondary text-label-md normal-case tracking-normal">
            <div className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <div className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
            </div>
            <p className="m-0">
              INSTANT CALLBACK AVAILABLE: Response within 30 minutes
            </p>
          </div>
          <RevealText as="h2" id="contact-heading" className="text-headline-lg text-primary mb-8">
            Contact Us
          </RevealText>
          <ContactForm />
        </div>
        <div className="contact-right lg:w-1/2 relative min-h-[300px] max-h-[500px] lg:max-h-none">
          <Image
            src={IMAGES.expert}
            alt="A solar energy expert ready to assist with your installation consultation"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" aria-hidden="true" />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/50">
            <p className="text-headline-sm text-primary mb-2">Need Help Faster?</p>
            <p className="text-body-md text-on-surface-variant mb-4 md:mb-6">
              Our experts are standing by to answer any technical questions about
              the installation process.
            </p>
            <p className="text-label-md text-primary normal-case tracking-normal">
              Our Experts Are Online
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
