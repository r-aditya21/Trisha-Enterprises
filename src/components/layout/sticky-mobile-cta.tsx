"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fixed bottom CTA bar on mobile that appears after scrolling past the hero.
 * md:hidden — only visible on mobile/tablet.
 */
export function StickyMobileCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Show after scrolling past hero (roughly 80vh)
    const trigger = ScrollTrigger.create({
      start: "80vh top",
      end: "max",
      onUpdate: (self) => {
        const show = self.isActive;
        if (show !== visible) {
          setVisible(show);
          gsap.to(el, {
            y: show ? 0 : 80,
            opacity: show ? 1 : 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      },
    });

    // Initial hidden state
    gsap.set(el, { y: 80, opacity: 0 });

    return () => {
      trigger.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 right-0 z-[997] md:hidden bg-white/95 backdrop-blur-lg border-t border-outline-variant/20 px-4 py-3 shadow-2xl"
      style={{ opacity: 0 }}
      role="complementary"
      aria-label="Quick actions"
    >
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        <a
          href={`tel:${SITE.phone}`}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0 touch-manipulation active:scale-95 transition-transform"
          aria-label={`Call ${SITE.phone}`}
        >
          <Phone className="h-5 w-5" />
        </a>
        <Button asChild className="flex-1 h-12 text-sm">
          <Link href="/contact">Get Free Quote</Link>
        </Button>
      </div>
    </div>
  );
}
