"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

interface SearchEntry {
  title: string;
  summary: string;
  module: string;
  href: string;
  headings: string[];
  text: string;
}

const TOPIC_IDEAS = ["closures", "promises", "middleware", "JWT", "useEffect", "Prisma"];

const subscribe = () => () => {};

function terms(query: string) {
  return query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
}

/** Wraps every query word found in `text` in a <mark>. */
function Highlight({ text, query }: { text: string; query: string }) {
  const parts = terms(query);
  if (!parts.length) return <>{text}</>;
  const pieces = text.split(new RegExp(`(${parts.join("|")})`, "ig"));
  return (
    <>
      {pieces.map((piece, i) =>
        i % 2 ? (
          <mark key={i} className="bg-accent/20 text-foreground rounded-sm px-0.5">
            {piece}
          </mark>
        ) : (
          piece
        ),
      )}
    </>
  );
}

/** A short excerpt of the lesson body around the first matching word. */
function snippet(entry: SearchEntry, query: string) {
  const first = terms(query)[0];
  const at = first ? entry.text.search(new RegExp(first, "i")) : -1;
  if (at < 0) return entry.summary;
  const start = Math.max(0, at - 50);
  const end = Math.min(entry.text.length, at + 110);
  return `${start > 0 ? "…" : ""}${entry.text.slice(start, end)}${end < entry.text.length ? "…" : ""}`;
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="border-border bg-surface text-muted rounded border px-1.5 py-0.5 font-mono text-[10px] leading-none">
      {children}
    </kbd>
  );
}

export function Search() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isMac = useSyncExternalStore(
    subscribe,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => true,
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    // The palette is a portal on <body>; lock page scroll while it is open.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open || entries || failed) return;
    fetch("/search-index.json")
      .then((r) => (r.ok ? (r.json() as Promise<SearchEntry[]>) : Promise.reject()))
      .then(setEntries)
      .catch(() => setFailed(true));
  }, [open, entries, failed]);

  const fuse = useMemo(
    () =>
      entries
        ? new Fuse(entries, {
            threshold: 0.35,
            ignoreLocation: true,
            keys: [
              { name: "title", weight: 3 },
              { name: "headings", weight: 2 },
              { name: "summary", weight: 1.5 },
              { name: "module", weight: 1 },
              { name: "text", weight: 1 },
            ],
          })
        : null,
    [entries],
  );

  const trimmed = query.trim();
  const results =
    fuse && trimmed ? fuse.search(trimmed, { limit: 8 }).map((r) => r.item) : [];
  const modules = entries ? [...new Set(entries.map((e) => e.module))] : [];
  const current = Math.min(active, Math.max(results.length - 1, 0));

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${current}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [current, results.length]);

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!results.length) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((current + step + results.length) % results.length);
    } else if (e.key === "Enter" && results[current]) {
      e.preventDefault();
      router.push(results[current].href);
      close();
    } else if (e.key === "Tab") {
      // Keep focus in the field, as a combobox should.
      e.preventDefault();
    }
  };

  const pick = (q: string) => {
    setQuery(q);
    setActive(0);
    inputRef.current?.focus();
  };

  const palette = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search lessons"
      className="palette-backdrop fixed inset-0 z-[60] flex items-start justify-center bg-black/55 p-3 pt-[8vh] backdrop-blur-sm sm:p-4 sm:pt-[12vh]"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div className="palette-panel border-border bg-background ring-accent/10 flex max-h-[75vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border shadow-2xl ring-4">
        <div className="border-border flex items-center gap-3 border-b px-4">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
            className="text-accent shrink-0"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-activedescendant={results.length ? `search-opt-${current}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            placeholder="Search lessons and topics…"
            className="placeholder:text-muted/70 h-14 w-full bg-transparent text-base outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => pick("")}
              className="text-muted hover:text-foreground hover:bg-surface-hover rounded-md px-2 py-1 text-xs transition-colors"
            >
              Clear
            </button>
          ) : (
            <button
              type="button"
              onClick={close}
              aria-label="Close search"
              className="hover:bg-surface-hover rounded-md p-1 transition-colors"
            >
              <Kbd>Esc</Kbd>
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {failed && (
            <p className="text-muted p-4 text-sm">Search is unavailable right now.</p>
          )}
          {!failed && !entries && (
            <div className="space-y-2 p-2" aria-label="Loading lessons">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-surface-hover h-12 animate-pulse rounded-lg" />
              ))}
            </div>
          )}

          {entries && !trimmed && (
            <div className="space-y-5 p-3">
              <section>
                <h3 className="text-muted mb-2 text-[11px] font-semibold tracking-wider uppercase">
                  Try searching for
                </h3>
                <div className="flex flex-wrap gap-2">
                  {TOPIC_IDEAS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => pick(t)}
                      className="border-border bg-surface hover:border-accent/60 hover:bg-surface-hover rounded-full border px-3 py-1.5 text-sm transition duration-150 active:scale-95"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-muted mb-2 text-[11px] font-semibold tracking-wider uppercase">
                  Browse by module
                </h3>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {modules.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => pick(m)}
                      className="hover:bg-surface-hover group flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors"
                    >
                      <span>{m}</span>
                      <span
                        aria-hidden
                        className="text-accent opacity-0 transition duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {entries && trimmed && results.length === 0 && (
            <div className="px-4 py-10 text-center">
              <p className="font-medium">No lessons match “{trimmed}”</p>
              <p className="text-muted mt-1 text-sm">
                Check the spelling or try a broader word like “react” or “api”.
              </p>
            </div>
          )}

          {results.length > 0 && (
            <ul id="search-results" role="listbox" aria-label="Lessons" ref={listRef}>
              {results.map((item, i) => (
                <li
                  key={item.href}
                  id={`search-opt-${i}`}
                  role="option"
                  aria-selected={i === current}
                  data-index={i}
                  onMouseMove={() => i !== current && setActive(i)}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    tabIndex={-1}
                    className={`flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                      i === current ? "bg-accent/10" : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${
                        i === current
                          ? "bg-accent text-white dark:text-zinc-950"
                          : "bg-surface-hover text-muted"
                      }`}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5zM4 21.5V5.5M8 7h8M8 11h6" />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">
                          <Highlight text={item.title} query={trimmed} />
                        </span>
                        <span className="border-border text-muted shrink-0 rounded-full border px-2 py-px text-[10px]">
                          {item.module}
                        </span>
                      </span>
                      <span className="text-muted mt-0.5 line-clamp-2 block text-xs">
                        <Highlight text={snippet(item, trimmed)} query={trimmed} />
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`text-accent self-center text-sm transition ${
                        i === current
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-1 opacity-0"
                      }`}
                    >
                      ↵
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-border bg-surface text-muted flex items-center gap-4 border-t px-4 py-2.5 text-xs">
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> navigate
          </span>
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <Kbd>↵</Kbd> open
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Kbd>Esc</Kbd> close
          </span>
          {results.length > 0 && (
            <span className="ml-auto" aria-live="polite">
              {results.length} result{results.length === 1 ? "" : "s"}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search lessons"
        aria-haspopup="dialog"
        className="border-border bg-surface/60 text-muted hover:border-accent/50 hover:bg-surface-hover hover:text-foreground focus-visible:outline-accent group inline-flex h-10 w-10 items-center justify-center gap-2 rounded-lg border text-sm transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 sm:w-60 sm:justify-start sm:px-3"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
          className="shrink-0 transition-transform duration-200 group-hover:scale-110"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="hidden sm:inline">Search lessons…</span>
        <span className="ml-auto hidden items-center gap-1 sm:inline-flex">
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      {/* Portaled to <body>: the header's backdrop-blur would otherwise trap a fixed overlay. */}
      {open && createPortal(palette, document.body)}
    </>
  );
}
