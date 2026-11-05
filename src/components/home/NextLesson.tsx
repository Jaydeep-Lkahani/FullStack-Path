"use client";

import { useResume } from "@/lib/resume";
import type { WelcomeLesson } from "./WelcomeBack";

/** The lesson the start button opens: its title, where it sits and how long it takes. */
export function NextLesson({ lessons }: { lessons: WelcomeLesson[] }) {
  const { target } = useResume(lessons);
  if (!target) return null;
  return (
    <dl className="grid gap-1">
      <dt className="sr-only">Lesson</dt>
      <dd className="display-sm text-(length:--text-title) leading-tight">
        {target.title}
      </dd>
      <dt className="sr-only">Where</dt>
      <dd className="text-sm">
        {target.label} of {target.moduleTitle}, about {target.minutes} minutes
      </dd>
    </dl>
  );
}
