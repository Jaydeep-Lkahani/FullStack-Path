"use client";

import Link from "next/link";
import { ProgressRing } from "@/components/home/ProgressRing";
import { useResume } from "@/lib/resume";
import { buttonClass } from "@/components/ui/button";
import { ArrowRightIcon, PlayIcon, RotateCcwIcon } from "./icons";

export interface CourseLessonRef {
  module: string;
  slug: string;
  href: string;
  title: string;
}

/** Module header progress: 72px ring, status line and Start / Continue / Review. */
export function CourseProgress({ lessons }: { lessons: CourseLessonRef[] }) {
  const { target, doneCount, allDone } = useResume(lessons);
  const total = lessons.length;
  const started = doneCount > 0;
  const status = allDone
    ? "Module complete. Nice work!"
    : started
      ? `${total - doneCount} left to go`
      : "Not started yet";

  return (
    <div className="border-border flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <ProgressRing lessons={lessons} size={72} stroke={6} label="Module progress" />
        <div className="min-w-0">
          <p className="font-semibold tabular-nums">
            {doneCount} of {total} complete
          </p>
          <p
            className={`text-sm ${allDone ? "text-success font-medium" : "text-muted"}`}
            aria-live="polite"
          >
            {status}
          </p>
        </div>
      </div>
      {target && (
        <Link
          href={target.href}
          transitionTypes={["nav-forward"]}
          className={buttonClass("primary", "md", "group max-w-full sm:max-w-sm")}
        >
          {allDone ? (
            <RotateCcwIcon className="size-4 shrink-0" />
          ) : (
            <PlayIcon className="size-4 shrink-0" />
          )}
          <span className="truncate">
            {allDone
              ? "Review from the start"
              : started
                ? `Continue: ${target.title}`
                : "Start module"}
          </span>
          <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-150 group-hover:translate-x-[3px]" />
        </Link>
      )}
    </div>
  );
}
