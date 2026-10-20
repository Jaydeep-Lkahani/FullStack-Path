"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavModule } from "@/lib/nav";
import { Search } from "./Search";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";

export function AppShell({
  modules,
  children,
}: {
  modules: NavModule[];
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="focus:bg-accent sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header className="border-border bg-background/90 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
          {showSidebar && (
            <button
              type="button"
              aria-label="Open topics menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="border-border inline-flex h-9 w-9 items-center justify-center rounded-md border lg:hidden"
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
          <Link href="/" className="font-semibold tracking-tight">
            <span className="text-accent">Full</span>Stack Path
          </Link>
          <nav className="text-muted ml-4 hidden gap-4 text-sm sm:flex">
            <Link href="/" className="hover:text-foreground">
              Roadmap
            </Link>
            <Link href="/learn/web-foundations" className="hover:text-foreground">
              Start learning
            </Link>
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

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4">
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
      </footer>
    </div>
  );
}
