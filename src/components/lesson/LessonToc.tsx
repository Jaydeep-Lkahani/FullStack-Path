"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ListIcon } from "@/components/course/icons";
import type { Heading } from "@/lib/content";

/** Id of the section being read: the last heading that has scrolled past the header. */
function useActiveHeading(headings: Heading[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= 140) current = el.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [headings]);

  return active;
}

function TocList({
  headings,
  active,
  onNavigate,
}: {
  headings: Heading[];
  active: string | null;
  onNavigate?: () => void;
}) {
  return (
    <ol className="toc-list relative space-y-0.5 text-sm">
      {headings.map((h) => {
        const on = h.id === active;
        return (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={onNavigate}
              aria-current={on ? "location" : undefined}
              className={`toc-link block rounded-md py-1 pr-2 leading-snug transition-colors duration-200 ${
                h.depth === 3 ? "pl-7 text-[0.8rem]" : "pl-4"
              } ${on ? "toc-on text-accent font-medium" : "text-muted hover:text-foreground"}`}
            >
              {h.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/** Desktop: sticky "On this page" column that highlights the section being read. */
export function LessonToc({ headings }: { headings: Heading[] }) {
  const active = useActiveHeading(headings);
  return (
    <aside className="sticky top-24 hidden h-fit w-56 shrink-0 xl:block 2xl:w-64">
      <p className="text-muted mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
        <ListIcon className="size-3.5" />
        On this page
      </p>
      <div className="border-border border-l">
        <TocList headings={headings} active={active} />
      </div>
    </aside>
  );
}

/** Phone/tablet: floating contents button that opens a bottom sheet, reachable from anywhere. */
export function LessonTocSheet({ headings }: { headings: Heading[] }) {
  const active = useActiveHeading(headings);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const opener = trigger.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    panel.current
      ?.querySelector('[aria-current="location"]')
      ?.scrollIntoView({ block: "center" });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  const current = headings.find((h) => h.id === active);

  return (
    <div className="contents xl:hidden">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        tabIndex={visible ? 0 : -1}
        className={`toc-fab focus-visible:outline-accent fixed right-4 bottom-5 z-30 inline-flex max-w-[calc(100vw-2rem)] cursor-pointer items-center gap-2 rounded-full py-2.5 pr-4 pl-3.5 text-sm font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ListIcon className="size-4 shrink-0" />
        <span className="truncate">{current ? current.text : "Contents"}</span>
        <ChevronDownIcon className="size-4 shrink-0 rotate-180 opacity-70" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Lesson contents"
        >
          <div
            className="palette-backdrop absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panel}
            className="sheet-panel border-border bg-background absolute inset-x-0 bottom-0 flex max-h-[78vh] flex-col rounded-t-3xl border-t shadow-2xl"
          >
            <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-[var(--border)]" />
            <div className="flex items-center justify-between px-5 pt-3 pb-2">
              <p className="flex items-center gap-2 text-sm font-bold">
                <ListIcon className="text-accent size-4" />
                In this lesson
              </p>
              <button
                ref={closeBtn}
                type="button"
                onClick={() => setOpen(false)}
                className="border-border text-muted hover:text-foreground focus-visible:outline-accent cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium focus-visible:outline-2"
              >
                Close
              </button>
            </div>
            <div className="overflow-y-auto px-3 pt-1 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <TocList
                headings={headings}
                active={active}
                onNavigate={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
