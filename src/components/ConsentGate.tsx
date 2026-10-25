"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { acceptPolicies, type ConsentState } from "@/lib/consent";

const policyLink = "text-accent font-medium underline";

/**
 * Popup that blocks lesson pages until the visitor agrees to the Terms, Privacy Policy
 * and Cookie Policy. The lesson content behind it is blurred by CSS (see globals.css).
 */
export function ConsentGate({ state }: { state: ConsentState }) {
  const [agreed, setAgreed] = useState(false);

  // Keep the <html data-consent> flag (set before paint by consentScript) in sync.
  useEffect(() => {
    if (state === "accepted") document.documentElement.dataset.consent = "1";
    else if (state === "pending") delete document.documentElement.dataset.consent;
  }, [state]);

  if (state !== "pending") return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-title"
        aria-describedby="consent-body"
        className="border-border bg-background max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border p-6 shadow-2xl"
      >
        <h2 id="consent-title" className="text-xl font-bold tracking-tight">
          Before you start learning
        </h2>
        <div
          id="consent-body"
          className="text-muted mt-3 space-y-3 text-sm leading-relaxed"
        >
          <p>
            The lessons are free. To open them, please read and accept our policies. In
            short:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>The content is for education only and is provided “as is”.</li>
            <li>You run any code from the lessons at your own risk.</li>
            <li>
              We don’t collect your name or email. Your progress is saved only in this
              browser.
            </li>
          </ul>
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            autoFocus
            className="accent-accent mt-0.5 h-4 w-4 shrink-0"
          />
          <span>
            I am at least 13 years old (or have a parent’s or guardian’s consent) and I
            have read and agree to the{" "}
            <Link href="/terms" target="_blank" className={policyLink}>
              Terms and Conditions
            </Link>
            ,{" "}
            <Link href="/privacy" target="_blank" className={policyLink}>
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/cookies" target="_blank" className={policyLink}>
              Cookie Policy
            </Link>
            .
          </span>
        </label>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Link
            href="/"
            className="border-border hover:bg-surface rounded-lg border px-4 py-2 text-center text-sm font-medium"
          >
            Not now
          </Link>
          <button
            type="button"
            disabled={!agreed}
            onClick={acceptPolicies}
            className="bg-accent rounded-lg px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Accept and continue
          </button>
        </div>
      </div>
    </div>
  );
}
