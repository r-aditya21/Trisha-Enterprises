"use client";

import { useRef, useState, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCanAnimateMobile } from "./use-can-animate";
import { EASE_PREMIUM, DURATION_SLOW } from "@/lib/animation-presets";

gsap.registerPlugin(ScrollTrigger);

export type CountUpOptions = {
  /** End value to count to */
  end: number;
  /** Duration of the count animation in seconds. Default 2 */
  duration?: number;
  /** Ease string. Default EASE_PREMIUM */
  ease?: string;
  /** Suffix to append (e.g. "+", "%"). Default "" */
  suffix?: string;
  /** ScrollTrigger start position. Default "top 85%" */
  start?: string;
};

/**
 * GSAP-powered number counting hook.
 *
 * Returns the current display value as a formatted string.
 * Uses ScrollTrigger to start counting when the element enters the viewport.
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLElement>(null);
 * const display = useCountUp(ref, { end: 500, suffix: "+" });
 * // display = "0" initially, then counts to "500+"
 * ```
 */
export function useCountUp(
  triggerRef: RefObject<HTMLElement | null>,
  options: CountUpOptions
): string {
  const {
    end,
    duration = DURATION_SLOW * 2,
    ease = EASE_PREMIUM,
    suffix = "",
    start = "top 85%",
  } = options;

  const [display, setDisplay] = useState(0);
  const proxyRef = useRef({ value: 0 });
  const canAnimate = useCanAnimateMobile();

  useGSAP(
    () => {
      if (!triggerRef.current || !canAnimate) {
        // Reduced motion: show final value immediately
        setDisplay(end);
        return;
      }

      // Reset
      proxyRef.current.value = 0;
      setDisplay(0);

      gsap.to(proxyRef.current, {
        value: end,
        duration,
        ease,
        snap: { value: 1 },
        scrollTrigger: {
          trigger: triggerRef.current,
          start,
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          setDisplay(Math.round(proxyRef.current.value));
        },
      });
    },
    { scope: triggerRef, dependencies: [canAnimate, end] }
  );

  return `${display.toLocaleString()}${suffix}`;
}
