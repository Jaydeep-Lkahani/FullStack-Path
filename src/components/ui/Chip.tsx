/** Small non-interactive label (UI-UX.md §7.2). Never wraps. */
export type ChipTone = "neutral" | "accent" | "track" | "success" | "warning" | "danger";

const TONES: Record<ChipTone, string> = {
  neutral: "border border-border bg-surface text-muted",
  accent: "bg-accent/10 text-accent",
  track: "bg-track/12 text-track",
  success: "bg-success/12 text-success",
  warning: "bg-warning/12 text-warning",
  danger: "bg-danger/12 text-danger",
};

export function Chip({
  tone = "neutral",
  size = "sm",
  className = "",
  children,
}: {
  tone?: ChipTone;
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap ${
        size === "sm" ? "h-6 px-2 text-xs" : "h-7 px-2.5 text-[0.8125rem]"
      } ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
