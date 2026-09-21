"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ensureGsapVisible, isMobileViewport } from "@/lib/motion";

// Centralized plugin registration — prevents multiple registrations across components
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  // Performance: limit callback frequency for smoother scrolling
  ScrollTrigger.config({ limitCallbacks: true });

  // Suppress harmless "target not found" warnings in dev
  gsap.config({ nullTargetWarn: false });
}

export function GsapProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const resetMobileVisibility = () => {
      if (!isMobileViewport()) return;
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.pin) t.kill(true);
      });
      ensureGsapVisible(".hero-animate, .project-card, .ai-card");
      ScrollTrigger.refresh();
    };

    resetMobileVisibility();
    const t1 = window.setTimeout(resetMobileVisibility, 300);
    window.addEventListener("resize", resetMobileVisibility, { passive: true });
    window.addEventListener("load", resetMobileVisibility);

    return () => {
      window.clearTimeout(t1);
      window.removeEventListener("resize", resetMobileVisibility);
      window.removeEventListener("load", resetMobileVisibility);
    };
  }, []);

  return <>{children}</>;
}
