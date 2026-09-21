"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Leaf, BadgeCheck, CreditCard } from "lucide-react";
import { IMAGES } from "@/constants/images";
import { Button } from "@/components/ui/button";
import { FloatingSolarElements } from "./floating-solar-elements";
import { ensureGsapVisible } from "@/lib/motion";
import { HeroCertificate } from "./hero-certificate";

const HERO_EASE = "power3.out";
const HERO_EASE_SOFT = "power2.inOut";

const HERO_IMAGES = [
  {
    src: IMAGES.hero,
    alt: "Modern sustainable home with sleek black solar panels on the roof",
  },
  {
    src: IMAGES.hero_2,
    alt: "The Miller Residence solar installation in Palo Alto",
  },
  {
    src: IMAGES.hero_3,
    alt: "Nexus Commercial Plaza solar panel array",
  },
  {
    src: IMAGES.hero_4,
    alt: "Seaside Sustainable Villa with solar panels in Malibu",
  },
];

const SLIDE_DURATION = 5000; // ms between transitions

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_DURATION);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const animated = gsap.utils.toArray<HTMLElement>(".hero-animate", root);
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        ensureGsapVisible(animated, root);
        gsap.set(root.querySelectorAll(".float-sun, .float-ring"), {
          opacity: 1,
          scale: 1,
          clearProps: "transform,opacity",
        });
      });

      mm.add("(min-width: 1024px)", () => {
        const badge = root.querySelector(".hero-badge");
        const title = root.querySelector(".hero-title");
        const desc = root.querySelector(".hero-desc");
        const cta = root.querySelector(".hero-cta-row");
        const trust = gsap.utils.toArray<HTMLElement>(".hero-trust", root);
        const floatSun = root.querySelector(".float-sun");
        const floatRing = root.querySelector(".float-ring");

        gsap.set([badge, title, desc, cta], {
          opacity: 0,
          y: 36,
          force3D: true,
        });
        gsap.set(trust, { opacity: 0, y: 22, force3D: true });
        if (floatSun) gsap.set(floatSun, { opacity: 0, scale: 0.85, force3D: true });
        if (floatRing) gsap.set(floatRing, { opacity: 0, scale: 0.9 });

        const tl = gsap.timeline({
          delay: 0.15,
          defaults: { ease: HERO_EASE, force3D: true },
        });

        tl.to(
            badge,
            { opacity: 1, y: 0, duration: 0.8 },
            "0.4"
          )
          .to(
            title,
            { opacity: 1, y: 0, duration: 1.15, ease: "power4.out" },
            "-=0.55"
          )
          .to(
            desc,
            { opacity: 1, y: 0, duration: 0.95, ease: HERO_EASE_SOFT },
            "-=0.7"
          )
          .to(
            cta,
            { opacity: 1, y: 0, duration: 0.85 },
            "-=0.75"
          )
          .to(
            trust,
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.14,
              ease: HERO_EASE_SOFT,
            },
            "-=0.55"
          );

        if (floatSun && floatRing) {
          tl.to(
            floatSun,
            { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" },
            "-=0.5"
          ).to(
            floatRing,
            { opacity: 0.55, scale: 1, duration: 0.9, ease: HERO_EASE_SOFT },
            "-=0.85"
          );
        }

        tl.eventCallback("onComplete", () => {
          gsap.set(animated, { clearProps: "transform,opacity" });
        });

        return () => {
          tl.kill();
          ensureGsapVisible([...animated, floatSun, floatRing].filter(Boolean), root);
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );


  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center pt-24 md:pt-20 overflow-x-clip overflow-y-visible noise-overlay mt-0 md:-mt-[100px]"
      aria-labelledby="hero-heading"
    >
      {/* Auto-cycling background images */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/20 to-transparent" />
        <div className="absolute inset-0 energy-glow" />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 md:bottom-20 left-1/2 -translate-x-1/2 z-[20] flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setActiveIndex(i);
              startTimer();
            }}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === activeIndex
                ? "w-8 bg-secondary"
                : "w-2 bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <FloatingSolarElements />
      <HeroCertificate/>

      <div className="container mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="max-w-3xl">
          <div className="hero-animate hero-badge inline-flex items-center gap-2 bg-secondary-container/30 px-4 py-2 rounded-full mb-6 border border-secondary/20">
            <Leaf className="h-4 w-4 text-secondary" aria-hidden />
            <p className="text-label-md text-secondary m-0">Sustainable Energy Future</p>
          </div>

          <h1
            id="hero-heading"
            className="hero-animate hero-title text-headline-xl text-primary mb-6 leading-tight"
          >
            Reduce Your Electricity Bill By Up To 80% With Solar Energy
          </h1>

          <p className="hero-animate hero-desc text-body-lg text-on-surface-variant mb-10 max-w-xl">
  Professional solar panel installation and maintenance services for homes and
  businesses. Start your journey to energy independence today with{" "}
  
  <span className="relative inline-block font-semibold text-black after:content-[''] after:absolute after:left-0 after:bottom-[2px] after:w-full after:h-2 after:bg-yellow-400/30 after:rounded-full after:-z-10">
    Trisha Enterprises
  </span>
</p>

          <div className="hero-animate hero-cta-row flex flex-col sm:flex-row gap-4 mb-12">
            <Button asChild className="w-full sm:w-auto bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20 h-12">
              <Link href="/contact">Get Free Quote</Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto border-primary/20 text-primary hover:bg-primary/5 transition-all h-12">
              <Link href="/services">Our Services</Link>
            </Button>
          </div>

          {/* Render certificate inline on mobile only for guaranteed visibility */}
          <div className="block md:hidden mb-12 relative z-10 flex justify-center w-full">
            <HeroCertificate inline />
          </div>

          <div className="flex flex-wrap gap-8">
            <div className="hero-animate hero-trust flex items-center gap-3">
              <BadgeCheck
                className="h-5 w-5 text-secondary-fixed-dim fill-secondary-fixed-dim/30"
                aria-hidden
              />
              <p className="text-label-md text-primary normal-case tracking-normal m-0">
                Free Consultation
              </p>
            </div>
            <div className="hero-animate hero-trust flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-secondary-fixed-dim" aria-hidden />
              <p className="text-label-md text-primary normal-case tracking-normal m-0">
                Government Subsidy Available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
