import { ImageResponse } from "next/og";
import type { TrackId } from "./roadmap";
import { SITE_NAME } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };

// Hex copies of the light-mode tokens in src/app/tokens.css (the image renderer has no OKLCH).
const PAPER = "#f9f3e8";
const INK = "#18130e";
const MUTED = "#5b544d";
const RULE = "#cec6bb";

const TRACK_HEX: Record<TrackId, string> = {
  foundations: "#5f564c",
  js: "#886100",
  ts: "#2c6194",
  react: "#0c6a76",
  node: "#356c38",
  db: "#994920",
  next: "#2d2824",
  prod: "#774272",
  capstone: "#144bb7",
  interview: "#8e3649",
};

/** The brand mark (keep in sync with MARK_LAYERS in components/Logo.tsx). */
const LAYERS = [
  { x: 6, y: 20, w: 20, h: 6 },
  { x: 12.67, y: 13, w: 13.33, h: 6 },
  { x: 19.33, y: 6, w: 6.67, h: 6 },
];

/** Shared social card: oat paper, ink type, the mark, a track-coloured rule, big title. */
export function ogCard({
  kicker,
  title,
  subtitle,
  track = "capstone",
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  track?: TrackId;
}) {
  const color = TRACK_HEX[track];
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: PAPER,
        color: INK,
        borderTop: `12px solid ${INK}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="56" height="56" viewBox="0 0 32 32">
          <rect width="32" height="32" fill={INK} />
          {LAYERS.map((l) => (
            <rect key={l.y} x={l.x} y={l.y} width={l.w} height={l.h} fill={PAPER} />
          ))}
        </svg>
        <span style={{ fontSize: 34, letterSpacing: -0.5 }}>{SITE_NAME}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            paddingTop: 20,
            borderTop: `4px solid ${color}`,
            fontSize: 28,
            color: MUTED,
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: title.length > 40 ? 64 : 76,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              marginTop: 24,
              paddingTop: 24,
              borderTop: `1px solid ${RULE}`,
              fontSize: 30,
              color: MUTED,
              lineHeight: 1.4,
            }}
          >
            {subtitle.length > 140 ? `${subtitle.slice(0, 137)}…` : subtitle}
          </div>
        )}
      </div>
    </div>,
    OG_SIZE,
  );
}
