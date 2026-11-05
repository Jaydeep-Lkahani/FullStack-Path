"use client";

import { lessonKey, useCompleted } from "@/lib/progress";
import { useResume } from "@/lib/resume";
import { CheckIcon } from "@/components/course/icons";

type L = { module: string; slug: string; href: string; title: string };

/**
 * Roadmap phase marker: the phase number set large, with its state underneath.
 * States: done (all lessons complete), current (holds the lesson to resume), upcoming.
 */
export function PhaseNode({
  id,
  lessons,
  allLessons,
}: {
  id: number;
  lessons: L[];
  allLessons: L[];
}) {
  const completed = useCompleted();
  const { target, started } = useResume(allLessons);
  const done =
    lessons.length > 0 &&
    lessons.every((l) => completed.has(lessonKey(l.module, l.slug)));
  const current = !done && started && lessons.some((l) => l.href === target?.href);

  return (
    <div className="flex items-end gap-3 lg:block">
      <span
        aria-hidden
        className={`ledger-num block text-[4.5rem] sm:text-[6rem] ${
          done ? "text-success" : current ? "text-accent" : "text-foreground"
        }`}
      >
        {id}
      </span>
      {done ? (
        <p className="text-success flex items-center gap-1.5 pb-2 text-sm font-semibold lg:mt-3 lg:pb-0">
          <CheckIcon className="size-4" />
          Phase complete
        </p>
      ) : current ? (
        <p className="text-accent pb-2 text-sm font-semibold lg:mt-3 lg:pb-0">
          You are here
        </p>
      ) : null}
    </div>
  );
}
