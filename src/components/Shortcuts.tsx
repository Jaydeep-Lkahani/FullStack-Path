"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, KeyboardIcon } from "./course/icons";
import { Kbd } from "./ui/Kbd";

const LIST: { keys: string[]; label: string }[] = [
  { keys: ["⌘", "K"], label: "Search" },
  { keys: ["/"], label: "Search" },
  { keys: ["J"], label: "Next lesson (also →)" },
  { keys: ["K"], label: "Previous lesson (also ←)" },
  { keys: ["M"], label: "Mark lesson complete / undo" },
  { keys: ["T"], label: "On this page" },
  { keys: ["?"], label: "Show these shortcuts" },
];

/** Clicks the first visible element tagged with data-shortcut="name". */
function trigger(name: string) {
  const el = [
    ...document.querySelectorAll<HTMLElement>(`[data-shortcut="${name}"]`),
  ].find((e) => e.checkVisibility?.() ?? e.offsetParent !== null);
  if (!el) return false;
  if (el instanceof HTMLButtonElement || el instanceof HTMLAnchorElement) el.click();
  else el.querySelector<HTMLElement>("a, button")?.focus();
  return true;
}

/** Global single-key shortcuts (UI-UX.md §10) and the "?" help sheet. */
export function Shortcuts() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t?.closest(
          "input, textarea, select, [contenteditable='true'], [role=radiogroup], [role=menu], [role=group], [role=listbox], [role=tablist]",
        )
      )
        return;
      if (e.key === "?") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (document.querySelector("[aria-modal='true']")) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const map: Record<string, string> = {
        j: "next",
        ArrowRight: "next",
        k: "prev",
        ArrowLeft: "prev",
        m: "complete",
        t: "toc",
      };
      if (key === "/") {
        e.preventDefault();
        window.dispatchEvent(new Event("fs:open-search"));
      } else if (map[key] && trigger(map[key])) {
        e.preventDefault();
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("fs:shortcuts", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("fs:shortcuts", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="palette-backdrop fixed inset-0 z-60 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
        className="palette-panel card w-full max-w-sm p-5 shadow-[var(--elev-lg)]"
      >
        <div className="flex items-center justify-between">
          <h2 id="shortcuts-title" className="flex items-center gap-2.5 font-semibold">
            <span className="icon-tile size-8" aria-hidden>
              <KeyboardIcon className="size-4" />
            </span>
            Keyboard shortcuts
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close shortcuts"
            className="text-muted hover:bg-surface-hover hover:text-foreground grid size-10 cursor-pointer place-items-center rounded-lg"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>
        <ul className="mt-4 space-y-2.5 text-sm">
          {LIST.map((s) => (
            <li
              key={s.label + s.keys.join()}
              className="flex items-center justify-between gap-4"
            >
              <span className="text-muted">{s.label}</span>
              <span className="flex gap-1">
                {s.keys.map((k) => (
                  <Kbd key={k}>{k}</Kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-subtle mt-4 text-xs">Lesson shortcuts work on lesson pages.</p>
      </div>
    </div>
  );
}
