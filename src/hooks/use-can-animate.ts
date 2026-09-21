"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Returns true only on desktop viewports (≥1024px) where full GSAP animations should run. */
export function useCanAnimate(): boolean {
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      setCanAnimate(mq.matches && !prefersReducedMotion());
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return canAnimate;
}

/**
 * Returns true on ANY viewport where lightweight animations are acceptable.
 * Desktop: full GSAP animations. Mobile: simple fade-in only.
 * Returns false only when prefers-reduced-motion is active.
 */
export function useCanAnimateMobile(): boolean {
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const update = () => {
      setCanAnimate(!prefersReducedMotion());
    };
    update();

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return canAnimate;
}
