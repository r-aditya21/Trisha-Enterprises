"use client";

import { useRef, useEffect } from "react";
import { AIChatbot } from "./ai-chatbot";
import { WhatsAppFloatingButton } from "./whatsapp-button";
import { gsap } from "gsap";

/**
 * Renders floating action buttons (AI chatbot + WhatsApp).
 *
 * Rendered OUTSIDE SmoothScrollProvider/GsapProvider in PageShell
 * so `position: fixed` works against the real viewport.
 *
 * Each button manages its own fixed positioning to avoid the
 * pointer-events-none/auto pattern that can fail on mobile.
 */
export function FloatingActions() {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Staggered entrance: chatbot enters after WhatsApp (which has 2s delay)
    gsap.fromTo(
      el,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: 2.5,
        ease: "back.out(1.5)",
      }
    );
  }, []);

  return (
    <>
      {/* Each FAB is independently positioned — no wrapper container
          that could swallow touch events on mobile */}
      <div
        ref={chatRef}
        className="fixed z-[9999] bottom-20 right-4"
        style={{ touchAction: "manipulation", opacity: 0, transform: "scale(0)" }}
      >
        <AIChatbot />
      </div>
      <div className="fixed z-[9999] bottom-4 right-4" style={{ touchAction: "manipulation" }}>
        <WhatsAppFloatingButton />
      </div>
    </>
  );
}
