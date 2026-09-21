"use client";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll-provider";
import { GsapProvider } from "@/components/animations/gsap-provider";
import { FloatingActions } from "@/components/chatbot/floating-actions";
import { StickyMobileCTA } from "./sticky-mobile-cta";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScrollProvider>
        <GsapProvider>
          <Navbar />
          <main
            id="main-content"
            className="relative overflow-visible pb-32 md:pb-0"
          >
            {children}
          </main>
          <Footer />
        </GsapProvider>
      </SmoothScrollProvider>

      {/* FloatingActions + StickyMobileCTA are OUTSIDE providers so
          `position: fixed` works against the real viewport — transforms/
          will-change from GSAP or Lenis cannot break fixed positioning here. */}
      <FloatingActions />
      <StickyMobileCTA />
    </>
  );
}