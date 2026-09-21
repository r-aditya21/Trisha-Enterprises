import { gsap } from "gsap";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 1023px)").matches;
}

export function shouldSkipScrollAnimations(): boolean {
  return prefersReducedMotion() || isMobileViewport();
}

/**
 * Returns true when lightweight animations are OK (mobile-safe fades).
 * Desktop always returns true. Mobile returns true unless reduced motion.
 */
export function canAnimateMobile(): boolean {
  if (typeof window === "undefined") return false;
  return !prefersReducedMotion();
}

/** Force elements visible and strip GSAP inline styles (fixes revert / reverse bugs). */
export function ensureGsapVisible(
  targets: gsap.TweenTarget,
  scope?: Element | null
): void {
  const list = gsap.utils.toArray<HTMLElement>(targets, scope ?? undefined);
  gsap.set(list, { opacity: 1, y: 0, x: 0, clearProps: "opacity,transform" });
}
