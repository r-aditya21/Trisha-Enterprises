/**
 * Centralized GSAP animation presets and constants.
 *
 * All animation configs live here so every section shares
 * consistent timing, easing, and stagger values.
 */

/* ─── Easing ──────────────────────────────────────────── */

/** Premium ease-out for reveals — fast start, buttery decel */
export const EASE_PREMIUM = "power3.out";

/** Softer ease for subtle transitions */
export const EASE_SOFT = "power2.inOut";

/** Slight overshoot for playful entrances */
export const EASE_BOUNCE_SOFT = "back.out(1.4)";

/** Elastic snap — use sparingly for attention-grabbing */
export const EASE_ELASTIC = "elastic.out(1, 0.5)";

/** Linear — useful for continuous marquee tweaks */
export const EASE_LINEAR = "none";

/* ─── Duration (seconds) ─────────────────────────────── */

export const DURATION_FAST = 0.5;
export const DURATION_NORMAL = 0.8;
export const DURATION_SLOW = 1.1;
export const DURATION_HERO = 1.2;

/* ─── Stagger (seconds) ──────────────────────────────── */

export const STAGGER_TIGHT = 0.06;
export const STAGGER_NORMAL = 0.1;
export const STAGGER_WIDE = 0.15;

/* ─── Reveal Preset Objects ──────────────────────────── */

/** Standard fade-up reveal (default for most sections) */
export const REVEAL_UP = {
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0 },
} as const;

/** Fade from left */
export const REVEAL_LEFT = {
  from: { opacity: 0, x: -40 },
  to: { opacity: 1, x: 0 },
} as const;

/** Fade from right */
export const REVEAL_RIGHT = {
  from: { opacity: 0, x: 40 },
  to: { opacity: 1, x: 0 },
} as const;

/** Scale-up reveal (cards, CTAs) */
export const REVEAL_SCALE = {
  from: { opacity: 0, scale: 0.92 },
  to: { opacity: 1, scale: 1 },
} as const;

/** Blur + fade reveal (premium headings) */
export const REVEAL_BLUR = {
  from: { opacity: 0, y: 24, filter: "blur(8px)" },
  to: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const;

/* ─── ScrollTrigger Defaults ─────────────────────────── */

export const SCROLL_TRIGGER_DEFAULTS = {
  start: "top 88%",
  toggleActions: "play none none none" as const,
} as const;

/** For elements that should trigger earlier (headings, CTAs) */
export const SCROLL_TRIGGER_EAGER = {
  start: "top 92%",
  toggleActions: "play none none none" as const,
} as const;
