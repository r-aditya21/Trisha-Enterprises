"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useCanAnimate, useCanAnimateMobile } from "@/hooks/use-can-animate";
import { ensureGsapVisible } from "@/lib/motion";
import {
  EASE_PREMIUM,
  DURATION_NORMAL,
} from "@/lib/animation-presets";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const canAnimate = useCanAnimate();
  const canAnimateMobile = useCanAnimateMobile();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Desktop: full reveal
      if (canAnimate) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32, force3D: true },
          {
            opacity: 1,
            y: 0,
            duration: DURATION_NORMAL,
            delay,
            ease: EASE_PREMIUM,
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        return () => ensureGsapVisible(el);
      }

      // Mobile: simple fade
      if (canAnimateMobile) {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            delay: delay * 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 94%",
              toggleActions: "play none none none",
            },
          }
        );

        return () => ensureGsapVisible(el);
      }

      // Reduced motion: ensure visible
      ensureGsapVisible(el);
    },
    { scope: ref, dependencies: [canAnimate, canAnimateMobile, delay] }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
