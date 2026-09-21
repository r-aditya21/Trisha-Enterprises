"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Better mobile/touch detection
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    // Disable Lenis on mobile/touch devices
    if (
      prefersReducedMotion() ||
      isTouchDevice ||
      window.innerWidth < 768
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    const refresh = () => ScrollTrigger.refresh();

    const timeout = window.setTimeout(refresh, 400);

    window.addEventListener("resize", refresh, {
      passive: true,
    });

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("resize", refresh);

      cancelAnimationFrame(rafId);

      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}