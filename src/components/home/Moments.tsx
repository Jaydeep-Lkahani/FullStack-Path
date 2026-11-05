"use client";

import Image from "next/image";
import { useState } from "react";

export interface Moment {
  id: string;
  /** Tab label: one verb */
  label: string;
  title: string;
  text: string;
  /** Screenshots of the real lesson pages, light and dark */
  light: string;
  dark: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * The parts of a lesson, each shown as a screenshot of the real page behind a segmented
 * control. Without script every panel shows in order; with it (html.js) only the chosen one.
 */
export function Moments({ moments }: { moments: Moment[] }) {
  const [active, setActive] = useState(0);

  function onKey(e: React.KeyboardEvent, i: number) {
    const n = moments.length;
    const next =
      e.key === "ArrowRight"
        ? (i + 1) % n
        : e.key === "ArrowLeft"
          ? (i - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`moment-tab-${moments[next].id}`)?.focus();
  }

  return (
    <div>
      <div className="seg moments-tabs" role="tablist" aria-label="Parts of a lesson">
        {moments.map((m, i) => (
          <button
            key={m.id}
            id={`moment-tab-${m.id}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`moment-${m.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {m.label}
          </button>
        ))}
      </div>
      {moments.map((m, i) => (
        <div
          key={m.id}
          id={`moment-${m.id}`}
          role="tabpanel"
          aria-labelledby={`moment-tab-${m.id}`}
          data-active={i === active || undefined}
          className="moment mt-10 grid gap-x-8 gap-y-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-4 lg:pt-2">
            <h3 className="display-sm text-(length:--text-title) leading-tight">
              {m.title}
            </h3>
            <p className="text-ink-2 mt-4 max-w-[38ch] text-pretty">{m.text}</p>
          </div>
          <figure className="capture lg:col-span-8" data-kind="product">
            <Image
              src={m.light}
              width={m.width}
              height={m.height}
              alt={m.alt}
              sizes="(min-width: 64rem) 60vw, 100vw"
              className="block dark:hidden"
            />
            <Image
              src={m.dark}
              width={m.width}
              height={m.height}
              alt={m.alt}
              sizes="(min-width: 64rem) 60vw, 100vw"
              className="hidden dark:block"
            />
          </figure>
        </div>
      ))}
    </div>
  );
}
