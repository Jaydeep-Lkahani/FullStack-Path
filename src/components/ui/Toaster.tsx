"use client";

import { CheckIcon, InfoIcon } from "@/components/course/icons";
import { useToast } from "./toast";

/** Renders the current toast: bottom-center on phones, bottom-right on desktop. */
export function Toaster() {
  const t = useToast();
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-70 flex justify-center px-4 sm:inset-x-auto sm:right-6 sm:bottom-6"
    >
      {t && (
        <div
          key={t.id}
          data-leaving={t.leaving || undefined}
          className="toast bg-foreground text-background flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium shadow-[var(--elev-lg)]"
        >
          <span
            className={`grid size-5 place-items-center rounded-full ${
              t.tone === "success" ? "bg-success text-background" : "bg-background/15"
            }`}
          >
            {t.tone === "success" ? (
              <CheckIcon className="size-3.5" />
            ) : (
              <InfoIcon className="size-3.5" />
            )}
          </span>
          {t.message}
        </div>
      )}
    </div>
  );
}
