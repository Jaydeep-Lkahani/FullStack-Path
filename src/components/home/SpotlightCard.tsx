"use client";

import type { PointerEvent, ReactNode } from "react";

/** Card whose glow follows the pointer. The glow itself is CSS (`.spot` in globals.css). */
export function SpotlightCard({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div onPointerMove={onPointerMove} className={`spot ${className}`}>
      {children}
    </div>
  );
}
