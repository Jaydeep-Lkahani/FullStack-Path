"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { lessonKey, setLessonComplete, useCompleted } from "@/lib/progress";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  NotStartedIcon,
  TrophyIcon,
} from "@/components/course/icons";
import { buttonClass } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

interface PagerLink {
  href: string;
  title: string;
}

/** Previous / next cards. After the lesson is completed, "Next" turns into "Up next". */
export function LessonPager({
  module,
  slug,
  prev,
  next,
}: {
  module: string;
  slug: string;
  prev: PagerLink | null;
  next: PagerLink | null;
}) {
  const done = useCompleted().has(lessonKey(module, slug));
  return (
    <nav aria-label="Lesson navigation" className="mt-6 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          transitionTypes={["nav-back"]}
          data-shortcut="prev"
          className="pager-card group"
        >
          <span className="text-muted flex items-center gap-1.5 text-xs font-medium">
            <ArrowLeftIcon className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            Previous
          </span>
          <span className="mt-1 block font-semibold">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={next.href}
          transitionTypes={["nav-forward"]}
          data-shortcut="next"
          data-upnext={done}
          className="pager-card group text-right"
        >
          <span
            className={`flex items-center justify-end gap-1.5 text-xs font-medium ${done ? "text-accent" : "text-muted"}`}
          >
            {done ? "Up next" : "Next"}
            <ArrowRightIcon className="upnext-arrow size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
          <span className="mt-1 block font-semibold">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}

/** Shown once every lecture in the module is complete. */
export function ModuleCompleteBanner({
  keys,
  moduleTitle,
  nextModule,
}: {
  keys: string[];
  moduleTitle: string;
  nextModule: PagerLink | null;
}) {
  const completed = useCompleted();
  const all = keys.length > 0 && keys.every((k) => completed.has(k));
  if (!all) return null;
  return (
    <section
      aria-label="Module complete"
      className="slide-in border-success/40 bg-success/8 mt-6 flex flex-wrap items-center gap-4 rounded-2xl border p-5"
    >
      <span className="bg-success text-background check-pop grid size-12 place-items-center rounded-full">
        <TrophyIcon className="size-6" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-success kicker">Module complete</p>
        <p className="mt-1 font-semibold">You finished {moduleTitle}. Nice work.</p>
      </div>
      {nextModule && (
        <Link
          href={nextModule.href}
          transitionTypes={["nav-forward"]}
          className={buttonClass("primary", "md", "group")}
        >
          Next module: {nextModule.title}
          <ArrowRightIcon className="size-4 transition-transform duration-150 group-hover:translate-x-[3px]" />
        </Link>
      )}
    </section>
  );
}

/**
 * Phone-only bar (UI-UX.md §8.6): Prev · Mark done · Next, shown once the end of the
 * lesson is on screen.
 */
export function LessonBottomBar({
  module,
  slug,
  prev,
  next,
}: {
  module: string;
  slug: string;
  prev: PagerLink | null;
  next: PagerLink | null;
}) {
  const key = lessonKey(module, slug);
  const done = useCompleted().has(key);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("lesson-end");
    if (!target) return;
    const io = new IntersectionObserver(([e]) =>
      setVisible(e.isIntersecting || e.boundingClientRect.top < 0),
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const narrow = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      if (visible && narrow.matches) root.dataset.bottombar = "";
      else delete root.dataset.bottombar;
    };
    apply();
    narrow.addEventListener("change", apply);
    return () => {
      narrow.removeEventListener("change", apply);
      delete root.dataset.bottombar;
    };
  }, [visible]);

  const link =
    "text-muted hover:text-foreground flex min-h-11 min-w-0 flex-1 items-center gap-1.5 rounded-lg px-2 text-sm font-medium";

  return (
    <div
      className={`border-border bg-background/90 fixed inset-x-0 bottom-0 z-40 border-t px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-lg transition-transform duration-300 ease-out md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="flex items-center gap-2">
        {prev ? (
          <Link href={prev.href} transitionTypes={["nav-back"]} className={link}>
            <ArrowLeftIcon className="size-4 shrink-0" />
            <span className="truncate">Prev</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        <button
          type="button"
          aria-pressed={done}
          onClick={() => {
            setLessonComplete(key, !done);
            if (!done) toast("Saved", "success");
          }}
          className={buttonClass(done ? "success" : "primary", "sm", "shrink-0")}
        >
          {done ? (
            <CheckIcon className="size-4" />
          ) : (
            <NotStartedIcon className="size-4" />
          )}
          {done ? "Done" : "Mark done"}
        </button>
        {next ? (
          <Link
            href={next.href}
            transitionTypes={["nav-forward"]}
            className={`${link} justify-end text-right`}
          >
            <span className="truncate">Next</span>
            <ArrowRightIcon className="size-4 shrink-0" />
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </div>
    </div>
  );
}
