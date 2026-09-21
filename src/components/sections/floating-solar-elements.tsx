"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Sun } from "lucide-react";
import { useCanAnimate } from "@/hooks/use-can-animate";

export function FloatingSolarElements() {
  const ref = useRef<HTMLDivElement>(null);
  const canAnimate = useCanAnimate();

  useGSAP(
    () => {
      if (!canAnimate || !ref.current) return;

      const sun = ref.current.querySelector(".float-sun");
      const ring = ref.current.querySelector(".float-ring");
      if (!sun) return;

      gsap.to(sun, {
        y: -14,
        rotation: 8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      if (ring) {
        gsap.to(ring, {
          scale: 1.08,
          opacity: 0.5,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2.3,
        });
      }
    },
    { scope: ref, dependencies: [canAnimate] }
  );

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute right-[10%] top-1/3 z-[5] hidden lg:block"
      aria-hidden
    >
      <div className="float-ring absolute -inset-8 rounded-full border border-secondary-fixed-dim/30" />
      <div className="float-sun relative flex h-24 w-24 items-center justify-center rounded-full bg-secondary-container/20 backdrop-blur-sm">
        <Sun className="h-12 w-12 text-secondary" />
      </div>
    </div>
  );
}
