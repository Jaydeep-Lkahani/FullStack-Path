"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavModule } from "@/lib/nav";
import { useResume } from "@/lib/resume";
import { LEGAL_PAGES } from "@/lib/site";
import { ConsentBanner } from "./ConsentBanner";
import { CloseIcon, ExternalLinkIcon, MenuIcon, ResumeIcon } from "./course/icons";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { Shortcuts } from "./Shortcuts";
import { Sidebar } from "./Sidebar";
import { ThemeMenu } from "./ThemeMenu";
import { buttonClass, iconButtonClass } from "./ui/button";
import { Toaster } from "./ui/Toaster";

const RESOURCES = [
  { href: "https://react.dev", label: "React docs" },
  { href: "https://nodejs.org/docs/latest/api/", label: "Node.js docs" },
  { href: "https://nextjs.org/docs", label: "Next.js docs" },
  { href: "https://developer.mozilla.org", label: "MDN Web Docs" },
];

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), summary, input, [tabindex]:not([tabindex="-1"])';

export function AppShell({
  modules,
  children,
}: {
  modules: NavModule[];
  children: React.ReactNode;
}) {
  const [menu, setMenu] = useState<"closed" | "open" | "closing">("closed");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const hamburger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const lessons = modules.flatMap((m) => m.lessons);
  const resume = useResume(lessons);

  const showSidebar = pathname.startsWith("/learn");
  const learnHref = resume.target?.href ?? "/learn/web-foundations";
  const showResume = resume.resumable && resume.target && pathname !== resume.target.href;

  const navLinks = [
    { href: "/", label: "Roadmap", current: pathname === "/" },
    { href: learnHref, label: "Learn", current: pathname.startsWith("/learn") },
  ];

  function closeMenu() {
    setMenu((m) => (m === "open" ? "closing" : m));
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menu !== "closing") return;
    const t = setTimeout(() => setMenu("closed"), 200);
    return () => clearTimeout(t);
  }, [menu]);

  // Drawer: lock scroll, trap focus, Escape closes, focus returns to the menu button.
  useEffect(() => {
    if (menu !== "open") return;
    const opener = hamburger.current;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu("closing");
      if (e.key !== "Tab" || !panel.current) return;
      const items = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      opener?.focus({ preventScroll: true });
    };
  }, [menu]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="focus:bg-foreground focus:text-background sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-70 focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`bg-background sticky top-0 z-40 border-b transition-[border-color] duration-200 ${
          scrolled ? "border-border-strong" : "border-border"
        }`}
      >
        <div className="shell-max mx-auto flex h-15 items-center gap-2 px-4 sm:gap-4 sm:px-6">
          <button
            ref={hamburger}
            type="button"
            aria-label="Open menu"
            aria-expanded={menu === "open"}
            onClick={() => setMenu("open")}
            className={iconButtonClass(showSidebar ? "lg:hidden" : "sm:hidden")}
          >
            <MenuIcon className="size-[18px]" />
          </button>
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            aria-label="FullStack Path home"
            className="text-foreground shrink-0 transition-opacity duration-150 hover:opacity-80"
          >
            <Logo />
          </Link>
          <nav
            aria-label="Primary"
            className="ml-4 hidden items-center gap-5 text-[0.9375rem] sm:flex"
          >
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                aria-current={l.current ? "page" : undefined}
                className={`decoration-accent flex min-h-10 items-center underline-offset-[0.4em] transition-colors duration-150 ${
                  l.current
                    ? "text-foreground underline decoration-2"
                    : "text-muted hover:text-foreground hover:underline hover:decoration-1"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {showResume && resume.target && (
              <span className="hidden md:block">
                <Link
                  href={resume.target.href}
                  transitionTypes={["nav-forward"]}
                  className={buttonClass("ghost", "sm", "max-w-xs")}
                  title={resume.target.title}
                >
                  <ResumeIcon className="size-4 shrink-0" />
                  <span className="truncate">
                    Resume: {truncate(resume.target.title, 24)}
                  </span>
                </Link>
              </span>
            )}
            <Search />
            <ThemeMenu />
          </div>
        </div>
      </header>

      {menu !== "closed" && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div
            className="drawer-backdrop bg-scrim absolute inset-0"
            data-closing={menu === "closing" || undefined}
            onClick={closeMenu}
          />
          <div
            ref={panel}
            data-closing={menu === "closing" || undefined}
            className="drawer-panel border-foreground bg-background absolute inset-y-0 left-0 flex w-80 max-w-[88vw] flex-col border-r"
          >
            <div className="border-border flex h-15 shrink-0 items-center justify-between border-b px-4">
              <Logo />
              <button
                type="button"
                data-autofocus
                onClick={closeMenu}
                aria-label="Close menu"
                className="text-muted hover:bg-surface-hover hover:text-foreground grid size-11 cursor-pointer place-items-center"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <nav aria-label="Primary" className="mb-4 grid gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={closeMenu}
                    aria-current={l.current ? "page" : undefined}
                    className={`decoration-accent flex min-h-11 items-center px-3 underline-offset-[0.4em] ${
                      l.current ? "underline decoration-2" : "hover:bg-surface-hover"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
                {showResume && resume.target && (
                  <Link
                    href={resume.target.href}
                    onClick={closeMenu}
                    className="text-muted hover:bg-surface-hover flex min-h-11 items-center gap-2 px-3 text-sm"
                  >
                    <ResumeIcon className="size-4 shrink-0" />
                    <span className="truncate">Resume: {resume.target.title}</span>
                  </Link>
                )}
              </nav>
              <Sidebar modules={modules} onNavigate={closeMenu} touch />
            </div>
          </div>
        </div>
      )}

      <div className="shell-max mx-auto flex w-full flex-1 gap-8 px-4 sm:px-6">
        {showSidebar && (
          <aside
            style={{ viewTransitionName: "site-sidebar" }}
            className="border-border sticky top-15 hidden h-[calc(100dvh-3.75rem)] w-66 shrink-0 overflow-y-auto overscroll-contain border-r py-6 pr-4 lg:block"
          >
            <Sidebar modules={modules} />
          </aside>
        )}
        <main id="main" className="min-w-0 flex-1 py-8 sm:py-10">
          {children}
        </main>
      </div>

      <footer className="border-foreground mt-16 border-t">
        <div className="shell-max mx-auto grid gap-x-8 gap-y-10 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Logo />
            <p className="text-ink-2 mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-pretty">
              React, Node.js and Next.js, from fundamentals to job-ready. Progress is
              saved in your browser. No account, no tracking.
            </p>
            <p className="text-muted mt-4 max-w-[46ch] text-sm leading-relaxed">
              Titles set in Bodoni Moda, text and code in Atkinson Hyperlegible.
            </p>
          </div>
          <div className="grid content-start gap-5 text-[0.9375rem] lg:col-span-6 lg:col-start-7">
            <nav aria-label="Course" className="colophon-line">
              <p className="font-semibold">Course</p>
              <ul>
                <li>
                  <Link href="/#roadmap">Roadmap</Link>
                </li>
                <li>
                  <Link href={learnHref}>
                    {resume.started ? "Continue learning" : "Start learning"}
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event("fs:shortcuts"))}
                  >
                    Keyboard shortcuts
                  </button>
                </li>
              </ul>
            </nav>
            <nav aria-label="Resources" className="colophon-line">
              <p className="font-semibold">Resources</p>
              <ul>
                {RESOURCES.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} target="_blank" rel="noopener noreferrer">
                      {r.label}
                      <ExternalLinkIcon className="text-subtle ml-1 inline size-3.5 align-[-0.1em]" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Legal" className="colophon-line">
              <p className="font-semibold">Legal</p>
              <ul>
                {LEGAL_PAGES.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href}>{p.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </footer>

      <ConsentBanner />
      <Shortcuts />
      <Toaster />
    </div>
  );
}
