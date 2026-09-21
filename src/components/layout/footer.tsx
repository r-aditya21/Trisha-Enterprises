"use client";

import { useRef } from "react";
import Link from "next/link";
import { Globe, Mail } from "lucide-react";
import { SITE, FOOTER_LINKS } from "@/constants/site";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCanAnimate } from "@/hooks/use-can-animate";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const canAnimate = useCanAnimate();

  // Stagger reveal for footer columns
  useGsapReveal(footerRef, ".footer-col", {
    y: 32,
    stagger: 0.1,
    duration: 0.7,
    start: "top 92%",
  });

  // Border line animation (width 0% → 100%)
  useGSAP(
    () => {
      if (!canAnimate || !footerRef.current) return;

      const border = footerRef.current.querySelector(".footer-border");
      if (!border) return;

      gsap.fromTo(
        border,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: border,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: footerRef, dependencies: [canAnimate] }
  );

  return (
    <footer
      ref={footerRef}
      className="w-full py-section px-margin-mobile md:px-margin-desktop bg-on-background text-surface-container-high"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
        <div className="footer-col col-span-1 md:col-span-2">
          <p className="text-headline-sm font-bold text-secondary-fixed-dim mb-6">
            {SITE.name}
          </p>
          <p className="text-body-md max-w-sm mb-8 text-on-surface-variant/80">
            Empowering a sustainable future through innovative solar technology and
            professional installation services. Trusted by 500+ homeowners and businesses.
          </p>
          <NewsletterForm />
          <div className="flex gap-4 mt-8">
            <a
              href={SITE.url}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-fixed-dim transition-colors group"
              aria-label="Website"
            >
              <Globe className="h-5 w-5 text-white group-hover:text-primary" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary-fixed-dim transition-colors group"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 text-white group-hover:text-primary" />
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4 className="text-label-md text-white mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {FOOTER_LINKS.quick.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body-md hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="text-label-md text-white mb-6">Legal</h4>
          <ul className="space-y-4">
            {FOOTER_LINKS.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body-md hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-border max-w-7xl mx-auto pt-12 border-t border-outline-variant/10 text-center">
        <p className="text-body-md">
          © {new Date().getFullYear()} {SITE.name} Energy Solutions. All rights reserved.
          Licensed & Insured.
        </p>
      </div>
    </footer>
  );
}
