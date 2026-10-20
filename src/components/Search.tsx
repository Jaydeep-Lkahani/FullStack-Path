"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface SearchEntry {
  title: string;
  summary: string;
  module: string;
  href: string;
  headings: string[];
  text: string;
}

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    if (entries || failed) return;
    fetch("/search-index.json")
      .then((r) => (r.ok ? (r.json() as Promise<SearchEntry[]>) : Promise.reject()))
      .then(setEntries)
      .catch(() => setFailed(true));
  }, [open, entries, failed]);

  const fuse = useMemo(
    () =>
      entries
        ? new Fuse(entries, {
            includeScore: true,
            threshold: 0.35,
            ignoreLocation: true,
            keys: [
              { name: "title", weight: 3 },
              { name: "headings", weight: 2 },
              { name: "summary", weight: 1.5 },
              { name: "text", weight: 1 },
            ],
          })
        : null,
    [entries],
  );

  const results = useMemo(
    () => (fuse && query.trim() ? fuse.search(query.trim(), { limit: 8 }) : []),
    [fuse, query],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search lessons"
        className="border-border text-muted hover:bg-surface-hover hover:text-foreground inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm"
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
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="border-border hidden rounded border px-1.5 text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search lessons"
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[10vh]"
          onClick={close}
        >
          <div
            className="border-border bg-background w-full max-w-xl overflow-hidden rounded-xl border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lessons, e.g. closures, fetch, generics…"
              className="border-border w-full border-b bg-transparent px-4 py-3 text-base outline-none"
            />
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {failed && <p className="text-muted p-3 text-sm">Search is unavailable.</p>}
              {!failed && !entries && <p className="text-muted p-3 text-sm">Loading…</p>}
              {entries && query.trim() && results.length === 0 && (
                <p className="text-muted p-3 text-sm">No lessons match “{query}”.</p>
              )}
              {entries && !query.trim() && (
                <p className="text-muted p-3 text-sm">
                  Type to search across all lessons.
                </p>
              )}
              <ul>
                {results.map(({ item }) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="hover:bg-surface-hover block rounded-md px-3 py-2"
                    >
                      <span className="block text-sm font-medium">{item.title}</span>
                      <span className="text-muted block text-xs">
                        {item.module} — {item.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
