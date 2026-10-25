import { useId } from "react";

export function LogoMark({ size = 28 }: { size?: number }) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden
      className="shrink-0 drop-shadow-sm"
    >
      <defs>
        <linearGradient
          id={id}
          x1="6"
          y1="4"
          x2="58"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6366f1" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill={`url(#${id})`} />
      <path
        d="M32 12 52 22 32 32 12 22Z"
        fill="#fff"
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m12 31 20 10 20-10"
        fill="none"
        stroke="#fff"
        strokeOpacity=".8"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m12 40 20 10 20-10"
        fill="none"
        stroke="#fff"
        strokeOpacity=".5"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-semibold tracking-tight">
      <LogoMark />
      <span>
        <span className="text-accent">Full</span>Stack Path
      </span>
    </span>
  );
}
