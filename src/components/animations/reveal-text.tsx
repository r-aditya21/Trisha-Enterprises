"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ensureGsapVisible } from "@/lib/motion";
import { useCanAnimate, useCanAnimateMobile } from "@/hooks/use-can-animate";
import {
  EASE_PREMIUM,
  DURATION_NORMAL,
  DURATION_SLOW,
  STAGGER_TIGHT,
} from "@/lib/animation-presets";

gsap.registerPlugin(ScrollTrigger);

type RevealTextProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  id?: string;
  /** Enable blur reveal effect (filter blur 8px → 0). Default false */
  blur?: boolean;
  /** Split text into words and stagger animate each. Default false */
  split?: boolean;
};

export function RevealText({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  id,
  blur = false,
  split = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const canAnimate = useCanAnimate();
  const canAnimateMobile = useCanAnimateMobile();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Desktop: full animation
      if (canAnimate) {
        if (split) {
          // Word-split stagger animation
          const text = el.textContent || "";
          const words = text.split(/\s+/).filter(Boolean);
          el.innerHTML = words
            .map(
              (word) =>
                `<span class="inline-block overflow-hidden"><span class="reveal-word inline-block">${word}</span></span>`
            )
            .join(
              '<span class="inline-block">&nbsp;</span>'
            );

          const wordEls = el.querySelectorAll(".reveal-word");
          gsap.fromTo(
            wordEls,
            {
              y: "110%",
              opacity: 0,
              ...(blur ? { filter: "blur(4px)" } : {}),
            },
            {
              y: "0%",
              opacity: 1,
              ...(blur ? { filter: "blur(0px)" } : {}),
              duration: DURATION_SLOW,
              stagger: STAGGER_TIGHT,
              delay,
              ease: EASE_PREMIUM,
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                toggleActions: "play none none none",
              },
            }
          );

          return () => {
            // Restore original text on cleanup
            el.textContent = text;
          };
        }

        // Standard reveal (optionally with blur)
        const fromVars: gsap.TweenVars = {
          y: 48,
          opacity: 0,
        };
        const toVars: gsap.TweenVars = {
          y: 0,
          opacity: 1,
          duration: DURATION_NORMAL,
          delay,
          ease: EASE_PREMIUM,
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        };

        if (blur) {
          fromVars.filter = "blur(8px)";
          toVars.filter = "blur(0px)";
        }

        gsap.fromTo(el, fromVars, toVars);
        return () => ensureGsapVisible(el);
      }

      // Mobile: simple fade
      if (canAnimateMobile) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: delay * 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 94%",
              toggleActions: "play none none none",
            },
          }
        );
        return () => ensureGsapVisible(el);
      }

      // Reduced motion: ensure visible
      ensureGsapVisible(el);
    },
    { scope: ref, dependencies: [canAnimate, canAnimateMobile, blur, split] }
  );

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      id={id}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
