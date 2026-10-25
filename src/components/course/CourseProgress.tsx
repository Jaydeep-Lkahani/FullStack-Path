"use client";

import Link from "next/link";
import { ProgressRing, useLessonProgress } from "@/components/home/ProgressRing";
import { lessonKey, useCompleted } from "@/lib/progress";
import { ArrowRightIcon, PlayIcon, RotateCcwIcon } from "./icons";

export interface CourseLessonRef {
  module: string;
  slug: string;
  href: string;
  title: string;
}

/** Progress ring, a status line and a Start / Continue / Review button for a course. */
export function CourseProgress({ lessons }: { lessons: CourseLessonRef[] }) {
  const completed = useCompleted();
  const { done, total, pct } = useLessonProgress(lessons);
  const next = lessons.find((l) => !completed.has(lessonKey(l.module, l.slug)));
  const first = lessons[0];
  const target = next ?? first;

  const finished = total > 0 && done === total;
  const started = done > 0;
  const status = finished
    ? "Course complete. Nice work!"
    : started
      ? `${total - done} left to go`
      : "Not started yet";

  return (
    <div className="border-border flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <ProgressRing lessons={lessons} size={64} stroke={6} label="Course progress" />
        <div className="min-w-0">
          <p className="font-semibold tabular-nums">
            {done} of {total} lessons complete
          </p>
          <p
            className={`text-sm ${finished ? "text-success font-medium" : "text-muted"}`}
            aria-live="polite"
          >
            {status}
          </p>
          <div className="sr-only">{pct}% complete</div>
        </div>
      </div>
      {target && (
        <Link
          href={target.href}
          className="group shine bg-accent text-background focus-visible:outline-accent inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0 sm:max-w-xs"
        >
          {finished ? (
            <RotateCcwIcon className="size-4 shrink-0" />
          ) : (
            <PlayIcon className="size-4 shrink-0" />
          )}
          <span className="truncate">
            {finished
              ? "Review from the start"
              : started
                ? "Continue learning"
                : "Start learning"}
          </span>
          <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
