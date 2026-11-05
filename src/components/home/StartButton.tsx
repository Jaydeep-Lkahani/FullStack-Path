"use client";

import Link from "next/link";
import { useResume } from "@/lib/resume";
import { ArrowRightIcon } from "@/components/course/icons";
import { buttonClass } from "@/components/ui/button";

type LessonLink = { module: string; slug: string; href: string; title: string };

/**
 * Starts a new visitor at the first lesson ("Start with Web Foundations") and takes a
 * returning learner back to where they left off. `light` is the paper-filled version for
 * the ink band.
 */
export function StartButton({
  lessons,
  startLabel = "Start learning",
  variant = "primary",
}: {
  lessons: LessonLink[];
  startLabel?: string;
  variant?: "primary" | "light";
}) {
  const { target, started, allDone } = useResume(lessons);
  if (!target) return null;
  const label = !started
    ? startLabel
    : allDone
      ? "Review lessons"
      : "Continue where you left off";

  return (
    <Link
      href={target.href}
      transitionTypes={["nav-forward"]}
      className={
        variant === "primary"
          ? buttonClass("primary", "lg", "group")
          : buttonClass("paper", "lg", "group")
      }
    >
      {label}
      <ArrowRightIcon className="size-4 transition-transform duration-150 group-hover:translate-x-[3px]" />
    </Link>
  );
}
