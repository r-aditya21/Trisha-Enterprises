"use client";

import { useRef } from "react";
import { FAQ_ITEMS } from "@/constants/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RevealText } from "@/components/animations/reveal-text";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Stagger reveal for FAQ items
  useGsapReveal(sectionRef, ".faq-item", {
    y: 24,
    stagger: 0.08,
    duration: 0.6,
    start: "top 88%",
  });

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-section px-margin-mobile md:px-margin-desktop"
      aria-labelledby="faq-heading"
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <RevealText
          as="h2"
          id="faq-heading"
          className="text-headline-lg text-primary mb-4"
          blur
        >
          Frequently Asked Questions
        </RevealText>
        <p className="text-body-lg text-on-surface-variant">
          Everything you need to know about going solar with Trisha Enterprises.
        </p>
      </div>

      <Accordion type="single" collapsible className="max-w-3xl mx-auto w-full">
        {FAQ_ITEMS.map((item, i) => (
          <div key={item.question} className="faq-item">
            <AccordionItem value={`item-${i}`} id={`faq-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </section>
  );
}
