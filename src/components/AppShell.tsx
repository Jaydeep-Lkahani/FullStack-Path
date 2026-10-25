"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "@/lib/consent";
import type { NavModule } from "@/lib/nav";
import { LEGAL_PAGES } from "@/lib/site";
import { ConsentGate } from "./ConsentGate";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Roadmap", match: (p: string) => p === "/" },
  {
    href: "/learn/web-foundations",
    label: "Start learning",
    match: (p: string) => p.startsWith("/learn"),
  },
];

export function AppShell({
  modules,
  children,
}: {
  modules: NavModule[];
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const showSidebar = pathname.startsWith("/learn");
  const consent = useConsent();
  // Lesson pages stay blurred and unclickable until the policies are accepted.
  const locked = showSidebar && consent !== "accepted";

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="focus:bg-accent sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={`bg-background/80 sticky top-0 z-40 border-b backdrop-blur-lg transition-shadow duration-300 ${
          scrolled
            ? "border-border shadow-[0_8px_24px_-16px_rgb(0_0_0/0.35)]"
            : "border-transparent"
        }`}
      >
        <div className="shell-max mx-auto flex h-14 items-center gap-3 px-4">
          {showSidebar && (
            <button
              type="button"
              aria-label="Open topics menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="border-border hover:bg-surface-hover focus-visible:outline-accent inline-flex h-10 w-10 items-center justify-center rounded-lg border transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 lg:hidden"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <Link
            href="/"
            aria-label="FullStack Path home"
            className="focus-visible:outline-accent rounded-md transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <Logo />
          </Link>
          <nav
            aria-label="Primary"
            className="ml-3 hidden items-center gap-1 text-sm sm:flex"
          >
            {NAV_LINKS.map((l) => {
              const current = l.match(pathname);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={current ? "page" : undefined}
                  className={`focus-visible:outline-accent rounded-lg px-3 py-1.5 font-medium transition-colors duration-200 focus-visible:outline-2 ${
                    current
                      ? "bg-accent/10 text-accent"
                      : "text-muted hover:bg-surface-hover hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Search />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
          <div className="border-border bg-background absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto border-r p-4">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close topics menu"
              className="border-border text-muted mb-4 rounded-md border px-2 py-1 text-sm"
            >
              Close
            </button>
            <Sidebar modules={modules} onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      {showSidebar && <ConsentGate state={consent} />}

      <div
        inert={locked}
        className={`shell-max mx-auto flex w-full flex-1 gap-8 px-4 ${showSidebar ? "consent-gate" : ""}`}
      >
        {showSidebar && (
          <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto py-6 pr-2 lg:block">
            <Sidebar modules={modules} />
          </aside>
        )}
        <main id="main" className="min-w-0 flex-1 py-8">
          {children}
        </main>
      </div>

      <footer className="border-border text-muted border-t py-6 text-center text-sm">
        <p>
          FullStack Path — React, Node.js and Next.js, from fundamentals to job-ready.
          Progress is saved in your browser.
        </p>
        <nav
          aria-label="Legal"
          className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 px-4"
        >
          {LEGAL_PAGES.map((p) => (
            <Link key={p.href} href={p.href} className="hover:text-foreground underline">
              {p.label}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}
