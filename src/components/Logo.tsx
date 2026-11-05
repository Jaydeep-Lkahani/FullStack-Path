/**
 * Brand mark (DESIGN.md § Logo): a square of ink holding three paper layers that step up
 * to the right. The layers are the full stack (front end, back end, database) and the
 * steps are the path up through the course's three phases. Hairline gaps between the
 * layers echo Bodoni's thick and thin strokes. One colour pair, readable at 16px.
 * Keep src/app/icon.svg, src/app/apple-icon.png and src/lib/og.tsx in sync.
 */
export const MARK_LAYERS = [
  { x: 6, y: 20, w: 20, h: 6 },
  { x: 12.67, y: 13, w: 13.33, h: 6 },
  { x: 19.33, y: 6, w: 6.67, h: 6 },
] as const;

export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className="shrink-0">
      <rect width="32" height="32" fill="var(--foreground)" />
      {MARK_LAYERS.map((l) => (
        <rect
          key={l.y}
          x={l.x}
          y={l.y}
          width={l.w}
          height={l.h}
          fill="var(--background)"
        />
      ))}
    </svg>
  );
}

/** The wordmark: the mark beside the name set in Bodoni Moda. */
export function Logo() {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark />
      <span className="display-sm text-[1.4375rem] leading-none tracking-[-0.015em]">
        FullStack Path
      </span>
    </span>
  );
}
