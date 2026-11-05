"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpIcon,
  ChevronDownIcon,
  CloseIcon,
  ExternalLinkIcon,
  ListIcon,
} from "@/components/course/icons";
import type { DocLink, Heading } from "@/lib/content";

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
              className={`toc-link block rounded-md py-1 pr-2 leading-snug transition-colors duration-200 pointer-coarse:py-2.5 ${
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
export function LessonToc({
  headings,
  docs = [],
}: {
  headings: Heading[];
  docs?: DocLink[];
}) {
  const active = useActiveHeading(headings);
  const index = headings.findIndex((h) => h.id === active);
  const progress = headings.length > 1 ? Math.max(0, index) / (headings.length - 1) : 1;
  return (
    <aside
      data-shortcut="toc"
      className="sticky top-24 hidden max-h-[calc(100vh-7rem)] w-56 shrink-0 overflow-y-auto pb-6 xl:block 2xl:w-64"
    >
      <p className="text-muted kicker mb-3 flex items-center gap-2">
        <ListIcon className="size-3.5" />
        On this page
      </p>
      <div className="border-border relative border-l">
        <span
          aria-hidden
          className="toc-track transition-transform duration-300 ease-out"
          style={{ "--p": index < 0 ? 0 : progress } as React.CSSProperties}
        />
        <TocList headings={headings} active={active} />
      </div>
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="text-muted hover:text-foreground mt-4 inline-flex items-center gap-1.5 rounded-md px-1 text-xs font-medium transition-colors"
      >
        <ArrowUpIcon className="size-3.5" />
        Back to top
      </a>
      {docs.length > 0 && (
        <div className="border-border mt-6 border-t pt-5">
          <p className="text-muted kicker mb-2">Go deeper</p>
          <ul className="space-y-1 text-sm">
            {docs.map((d) => (
              <li key={d.url}>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent group flex items-start gap-1.5 rounded-md py-1 leading-snug transition-colors"
                >
                  <span>{d.title}</span>
                  <ExternalLinkIcon className="mt-0.5 size-3.5 shrink-0 opacity-60 transition-transform duration-150 group-hover:translate-x-px group-hover:-translate-y-px" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
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
        data-shortcut="toc"
        tabIndex={visible ? 0 : -1}
        className={`toc-fab fixed right-4 bottom-5 z-30 inline-flex min-h-11 max-w-[calc(100vw-2rem)] cursor-pointer items-center gap-2 rounded-full py-2 pr-4 pl-3.5 text-sm font-semibold active:scale-95 ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ListIcon className="text-accent size-4 shrink-0" />
        <span className="truncate">{current ? current.text : "On this page"}</span>
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
            className="sheet-panel border-border bg-background absolute inset-x-0 bottom-0 flex max-h-[78vh] flex-col rounded-t-3xl border-t shadow-[var(--elev-lg)]"
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
                aria-label="Close contents"
                className="text-muted hover:bg-surface-hover hover:text-foreground grid size-11 cursor-pointer place-items-center rounded-lg"
              >
                <CloseIcon className="size-5" />
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
