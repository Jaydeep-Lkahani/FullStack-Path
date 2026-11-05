/**
 * One button style for the whole site (DESIGN.md § Controls, UI-UX.md §7.1). Use on <button>
 * and on <Link>. Specimen pair: an ink-filled primary and an ink-outlined secondary, both
 * square. Add `group` plus `group-hover:translate-x-[3px]` on a trailing arrow for the nudge.
 */
export type ButtonVariant =
  "primary" | "secondary" | "ghost" | "success" | "gradient" | "paper";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 font-semibold whitespace-nowrap select-none transition-[background-color,border-color,color,transform] duration-150 ease-out active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "border border-foreground bg-foreground text-background hover:bg-ink-2",
  secondary:
    "border border-foreground bg-transparent text-foreground hover:bg-surface-hover",
  ghost: "text-muted hover:bg-surface-hover hover:text-foreground",
  success: "border border-success bg-transparent text-success hover:bg-success/10",
  gradient: "btn-gradient",
  /** On the ink band: paper fill, ink text. */
  paper: "border border-background bg-background text-foreground hover:bg-surface",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[0.875rem] pointer-coarse:min-h-11",
  md: "h-10 px-4 text-[0.9375rem] pointer-coarse:min-h-11",
  lg: "h-12 px-6 text-base",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = "",
) {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${extra}`.trim();
}

/** Square icon-only button (always pair with aria-label). */
export function iconButtonClass(extra = "") {
  return `inline-flex size-10 shrink-0 cursor-pointer items-center justify-center border border-border bg-transparent text-muted transition-[background-color,border-color,color] duration-150 ease-out hover:border-foreground hover:text-foreground active:translate-y-px pointer-coarse:size-11 ${extra}`.trim();
}
