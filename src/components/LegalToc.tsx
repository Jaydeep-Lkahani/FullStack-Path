"use client";

import { useEffect, useState } from "react";

/** Sticky contents for legal pages, built from the article's h2 headings. */
export function LegalToc() {
  const [items, setItems] = useState<{ id: string; text: string }[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const heads = [...document.querySelectorAll<HTMLElement>(".legal-body h2")];
    heads.forEach((h, i) => {
      if (!h.id) h.id = `section-${i + 1}`;
    });
    const frame = requestAnimationFrame(() => {
      setItems(heads.map((h) => ({ id: h.id, text: h.textContent ?? "" })));
      onScroll();
    });
    const onScroll = () => {
      let current: string | null = null;
      for (const h of heads) {
        if (h.getBoundingClientRect().top <= 120) current = h.id;
        else break;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (items.length === 0) return null;
  return (
    <nav
      aria-label="On this page"
      className="sticky top-24 hidden w-56 shrink-0 self-start lg:block"
    >
      <p className="text-muted kicker mb-3">On this page</p>
      <ol className="border-border space-y-0.5 border-l text-sm">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? "location" : undefined}
              className={`toc-link block rounded-md py-1 pr-2 pl-4 leading-snug transition-colors duration-150 ${
                active === it.id
                  ? "toc-on text-accent font-medium"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
