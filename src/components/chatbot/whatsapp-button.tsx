"use client";

import { useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/constants/site";
import { gsap } from "gsap";

export function WhatsAppFloatingButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi, I'd like help with solar installation.")}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Entrance animation: scale from 0 → 1 with elastic ease, delayed
    gsap.fromTo(
      el,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: 2,
        ease: "back.out(1.7)",
      }
    );

    // Attention-grabbing pulse every 8 seconds
    const pulse = gsap.to(el, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
      delay: 6,
      repeatDelay: 0,
      paused: true,
    });

    const interval = setInterval(() => {
      pulse.restart();
    }, 8000);

    // Start first pulse after entrance
    const firstPulse = setTimeout(() => {
      pulse.restart();
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(firstPulse);
      pulse.kill();
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white min-h-12 min-w-12 px-4 py-3 rounded-full shadow-2xl touch-manipulation active:scale-95 transition-colors"
      aria-label="Chat on WhatsApp"
      style={{ opacity: 0, transform: "scale(0)" }}
    >
      <MessageCircle className="h-6 w-6 shrink-0" aria-hidden />
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp</span>
    </a>
  );
}
