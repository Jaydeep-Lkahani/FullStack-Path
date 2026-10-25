"use client";

import Link from "next/link";
import { lessonKey, useCompleted } from "@/lib/progress";

type LessonLink = { module: string; slug: string; href: string; title: string };

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="transition-transform duration-200 group-hover:translate-x-1"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Resumes at the first unfinished lesson; reads "Start learning" for a new visitor. */
export function StartButton({
  lessons,
  variant = "primary",
}: {
  lessons: LessonLink[];
  variant?: "primary" | "light";
}) {
  const completed = useCompleted();
  const next = lessons.find((l) => !completed.has(lessonKey(l.module, l.slug)));
  const started = completed.size > 0;
  const target = next ?? lessons[0];
  if (!target) return null;

  const label = !started
    ? "Start learning"
    : next
      ? "Continue learning"
      : "Review lessons";
  const styles =
    variant === "primary"
      ? "bg-accent text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 dark:text-zinc-950"
      : "bg-white text-indigo-700 shadow-lg shadow-black/20";

  return (
    <div className="flex flex-col items-start gap-1.5">
      <Link
        href={target.href}
        className={`group shine focus-visible:outline-accent inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0 active:scale-[0.98] ${styles}`}
      >
        {label}
        <Arrow />
      </Link>
      {started && next && variant === "primary" && (
        <p className="text-muted max-w-xs truncate text-xs">Next up: {next.title}</p>
      )}
    </div>
  );
}
