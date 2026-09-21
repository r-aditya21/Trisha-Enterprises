"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsapVisible } from "@/lib/motion";
import { useCanAnimate, useCanAnimateMobile } from "./use-can-animate";
import {
  EASE_PREMIUM,
  DURATION_NORMAL,
  STAGGER_NORMAL,
  SCROLL_TRIGGER_DEFAULTS,
} from "@/lib/animation-presets";

gsap.registerPlugin(ScrollTrigger);

export type GsapRevealOptions = {
  /** Starting y offset (px). Default 40 */
  y?: number;
  /** Starting x offset (px). Default 0 */
  x?: number;
  /** Starting opacity. Default 0 */
  fromOpacity?: number;
  /** Starting scale. Default 1 (no scale animation) */
  fromScale?: number;
  /** Starting filter string (e.g. "blur(8px)"). Default none */
  fromFilter?: string;
  /** Animation duration in seconds. Default DURATION_NORMAL (0.8) */
  duration?: number;
  /** Stagger between child elements in seconds. Default STAGGER_NORMAL (0.1) */
  stagger?: number;
  /** GSAP ease string. Default EASE_PREMIUM */
  ease?: string;
  /** ScrollTrigger start position. Default "top 88%" */
  start?: string;
  /** Delay before animation starts (seconds). Default 0 */
  delay?: number;
  /**
   * On mobile (< 1024px):
   * - true  → simple fade-in only (no transform, no stagger)
   * - false → no animation at all (elements stay visible)
   * Default: true
   */
  mobileSimple?: boolean;
  /** Additional GSAP "to" vars to merge */
  toVars?: gsap.TweenVars;
};

/**
 * Reusable GSAP ScrollTrigger reveal hook.
 *
 * Animates child elements matching `selector` within `containerRef`.
 * Automatically handles:
 * - Desktop: full transform + opacity + stagger animation
 * - Mobile: simple opacity fade (configurable)
 * - Reduced motion: skip entirely, ensure visible
 * - Cleanup: kills tweens, resets styles
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLElement>(null);
 * useGsapReveal(ref, '.card', { y: 40, stagger: 0.1 });
 * ```
 */
export function useGsapReveal(
  containerRef: RefObject<HTMLElement | null>,
  selector: string,
  options: GsapRevealOptions = {}
): void {
  const {
    y = 40,
    x = 0,
    fromOpacity = 0,
    fromScale = 1,
    fromFilter,
    duration = DURATION_NORMAL,
    stagger = STAGGER_NORMAL,
    ease = EASE_PREMIUM,
    start = SCROLL_TRIGGER_DEFAULTS.start,
    delay = 0,
    mobileSimple = true,
    toVars = {},
  } = options;

  const canAnimate = useCanAnimate();
  const canAnimateMobile = useCanAnimateMobile();

  // Keep latest options in a ref to avoid re-triggering useGSAP
  const optsRef = useRef(options);
  optsRef.current = options;

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const elements = gsap.utils.toArray<HTMLElement>(selector, container);
      if (elements.length === 0) return;

      // Desktop: full animation
      if (canAnimate) {
        const fromVars: gsap.TweenVars = {
          opacity: fromOpacity,
          y,
          x,
          force3D: true,
        };
        if (fromScale !== 1) fromVars.scale = fromScale;
        if (fromFilter) fromVars.filter = fromFilter;

        const toVarsMerged: gsap.TweenVars = {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          stagger,
          ease,
          delay,
          force3D: true,
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: "play none none none",
          },
          ...toVars,
        };
        if (fromScale !== 1) toVarsMerged.scale = 1;
        if (fromFilter) toVarsMerged.filter = "blur(0px)";

        gsap.fromTo(elements, fromVars, toVarsMerged);

        return () => {
          ensureGsapVisible(elements, container);
        };
      }

      // Mobile: simple fade only
      if (canAnimateMobile && mobileSimple) {
        gsap.fromTo(
          elements,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );

        return () => {
          ensureGsapVisible(elements, container);
        };
      }

      // Reduced motion or animation disabled: ensure visible
      ensureGsapVisible(elements, container);
    },
    {
      scope: containerRef,
      dependencies: [canAnimate, canAnimateMobile, selector],
    }
  );
}
