"use client";

import Link from "next/link";
import { acceptPolicies, useConsent } from "@/lib/consent";
import { buttonClass } from "./ui/button";

/**
 * One-time, non-blocking policy notice (UI-UX.md §8.10, option 1). Lessons are readable
 * straight away; "OK" records which policy version the visitor saw.
 */
export function ConsentBanner() {
  const state = useConsent();
  if (state !== "pending") return null;
  return (
    <div
      role="region"
      aria-label="Policy notice"
      className="slide-in fixed inset-x-3 bottom-3 z-60 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-md"
    >
      <div className="card flex flex-col gap-3 p-4 shadow-[var(--elev-lg)] sm:flex-row sm:items-center">
        <p className="text-muted text-sm leading-relaxed">
          By using this site you agree to the{" "}
          <Link href="/terms" className="text-foreground font-medium underline">
            Terms
          </Link>
          ,{" "}
          <Link href="/privacy" className="text-foreground font-medium underline">
            Privacy
          </Link>{" "}
          and{" "}
          <Link href="/cookies" className="text-foreground font-medium underline">
            Cookie
          </Link>{" "}
          policies. Progress is saved only in your browser.
        </p>
        <button
          type="button"
          onClick={acceptPolicies}
          className={buttonClass("primary", "sm", "shrink-0 self-end sm:self-auto")}
        >
          OK
        </button>
      </div>
    </div>
  );
}
