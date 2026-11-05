"use client";

import { lessonKey, useCompleted } from "./progress";
import { useRecent } from "./recent";

export interface ResumeLesson {
  module: string;
  slug: string;
  href: string;
  title: string;
}

/**
 * Where "Resume" / "Learn" should take the learner: the last lesson they opened if it is
 * unfinished, otherwise the next unfinished lesson after it, otherwise the first one.
 */
export function useResume<T extends ResumeLesson>(lessons: T[]) {
  const completed = useCompleted();
  const recent = useRecent();
  const isDone = (l: ResumeLesson) => completed.has(lessonKey(l.module, l.slug));
  const started = completed.size > 0 || recent.length > 0;
  const last = recent.find((r) => lessons.some((l) => l.href === r.href));
  const lastIndex = last ? lessons.findIndex((l) => l.href === last.href) : -1;

  let target: T | undefined;
  if (lastIndex >= 0 && !isDone(lessons[lastIndex])) target = lessons[lastIndex];
  else
    target =
      lessons.slice(lastIndex + 1).find((l) => !isDone(l)) ??
      lessons.find((l) => !isDone(l));

  const allDone = lessons.length > 0 && lessons.every(isDone);
  return {
    started,
    allDone,
    /** The lesson to resume, or the very first lesson for a new visitor. */
    target: target ?? lessons[0],
    /** True when the target is a lesson the learner has actually been working through. */
    resumable: started && !!target,
    doneCount: lessons.filter(isDone).length,
  };
}
