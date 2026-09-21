"use client";

import { useRef } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/constants/site";
import { RevealText } from "@/components/animations/reveal-text";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export function WhatsAppCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Trisha Enterprises, I'd like to discuss a solar installation.")}`;

  // Scale-up reveal for the entire card
  useGsapReveal(sectionRef, ".whatsapp-card", {
    y: 32,
    fromScale: 0.95,
    duration: 0.8,
    start: "top 88%",
  });

  return (
    <section ref={sectionRef} className="py-7 px-margin-mobile md:px-margin-desktop bg-secondary-container/10">
      <div className="whatsapp-card max-w-4xl mx-auto glass-card rounded-3xl p-4 md:p-8 border-2 border-secondary/20 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex-1">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
            <div className="relative flex h-3 w-3 shrink-0" aria-hidden>
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <div className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </div>
            <p className="text-label-md text-green-600 normal-case tracking-tight m-0">
              Typically replies in under 1 minute
            </p>
          </div>
          <RevealText as="h3" className="text-headline-md text-primary mb-2">
            WhatsApp Instant Support
          </RevealText>
          <p className="text-body-md text-on-surface-variant">
            Skip the queue and chat directly with our certified technical experts about your
            project requirements.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] text-white px-6 py-4 md:px-8 md:py-5 rounded-2xl font-semibold transition-all hover:scale-105 shadow-xl justify-center"
            aria-label="Chat with a solar expert on WhatsApp"
          >
            <MessageCircle className="h-6 w-6" aria-hidden />
            Chat with a Solar Expert
          </a>
        </div>
      </div>
    </section>
  );
}
