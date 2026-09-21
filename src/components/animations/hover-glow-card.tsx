"use client";

import { cn } from "@/lib/utils";

export function HoverGlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-[var(--radius-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-glow)]",
        className
      )}
    >
      <div className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-secondary-fixed-dim/20 to-transparent" />
      {children}
    </div>
  );
}
