"use client";

import Link from "next/link";
import { lessonKey, useCompleted } from "@/lib/progress";
import { useResume } from "@/lib/resume";
import { ArrowRightIcon } from "@/components/course/icons";
import { buttonClass } from "@/components/ui/button";
import { ProgressRing } from "./ProgressRing";

export interface WelcomeLesson {
  module: string;
  slug: string;
  href: string;
  title: string;
  moduleTitle: string;
  track: string;
  label: string;
  minutes: number;
}

/**
 * Returning learner's side of the home hero (UI-UX.md §8.3): the next lesson by name and
 * one action back into it. Which side shows is decided before paint by `returningScript`,
 * so the page doesn't jump.
 */
export function WelcomeBack({ lessons }: { lessons: WelcomeLesson[] }) {
  const completed = useCompleted();
  const { target, allDone, doneCount } = useResume(lessons);
  const moduleLessons = target ? lessons.filter((l) => l.module === target.module) : [];
  const moduleDone = moduleLessons.filter((l) =>
    completed.has(lessonKey(l.module, l.slug)),
  ).length;

  return (
    <section aria-labelledby="welcome" data-track={target?.track} className="min-w-0">
      <h1 id="welcome" className="text-(length:--text-display) leading-[1.02]">
        Welcome back.
      </h1>
      {target && (
        <>
          <p className="lead text-ink-2 mt-6">
            {allDone ? "Every lesson is done. Start your review with " : "Next up is "}
            <strong className="text-foreground font-semibold">
              {target.title}
            </strong>, {target.label.toLowerCase()} of {target.moduleTitle}, about{" "}
            {target.minutes} minutes.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href={target.href}
              transitionTypes={["nav-forward"]}
              className={buttonClass("primary", "lg", "group")}
            >
              {allDone ? "Open lesson" : "Continue where you left off"}
              <ArrowRightIcon className="size-4 transition-transform duration-150 group-hover:translate-x-[3px]" />
            </Link>
            <a
              href="#roadmap"
              className="decoration-accent min-h-11 content-center underline underline-offset-[0.25em] hover:decoration-2"
            >
              See the roadmap
            </a>
          </div>
          <div className="border-border mt-10 flex items-center gap-4 border-t pt-5">
            <ProgressRing
              lessons={lessons}
              size={48}
              stroke={3}
              label="Overall progress"
            />
            <p className="text-muted text-sm tabular-nums">
              <span className="text-foreground font-semibold">
                {doneCount} of {lessons.length}
              </span>{" "}
              lessons done, {moduleDone} of {moduleLessons.length} in {target.moduleTitle}
              .
            </p>
          </div>
        </>
      )}
    </section>
  );
}
