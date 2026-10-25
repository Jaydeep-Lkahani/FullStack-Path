"use client";

import Link from "next/link";
import { QuizScore } from "@/components/QuizScore";
import { SpotlightCard } from "@/components/home/SpotlightCard";
import { lessonKey, useCompleted } from "@/lib/progress";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  CodeIcon,
  ListChecksIcon,
  PlayCircleIcon,
  SparklesIcon,
} from "./icons";

export type LectureKind = "lesson" | "quiz" | "project" | "stretch";

export interface Lecture {
  module: string;
  slug: string;
  href: string;
  title: string;
  summary: string;
  order: number;
  minutes: number;
  videoCount: number;
  quizCount: number;
  kind: LectureKind;
  sections: { id: string; text: string }[];
}

const KIND: Record<LectureKind, { label: string; Icon: typeof BookOpenIcon }> = {
  lesson: { label: "Lesson", Icon: BookOpenIcon },
  quiz: { label: "Quiz", Icon: ListChecksIcon },
  project: { label: "Project", Icon: CodeIcon },
  stretch: { label: "Stretch", Icon: SparklesIcon },
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-muted inline-flex items-center gap-1.5 text-xs">
      {children}
    </span>
  );
}

function LectureCard({ lecture, index }: { lecture: Lecture; index: number }) {
  const completed = useCompleted();
  const done = completed.has(lessonKey(lecture.module, lecture.slug));
  const { label, Icon } = KIND[lecture.kind];
  const isQuiz = lecture.kind === "quiz";
  const showDone = done;

  return (
    <li className="reveal relative pl-14 before:absolute before:top-12 before:bottom-[-0.75rem] before:left-5 before:w-px before:bg-[linear-gradient(to_bottom,var(--border),transparent)] last:before:hidden sm:pl-16 sm:before:left-6">
      <span
        aria-hidden
        className={`absolute top-4 left-0 grid size-10 place-items-center rounded-full border text-sm font-semibold tabular-nums transition-colors duration-300 sm:size-12 ${
          showDone
            ? "border-success bg-success text-background"
            : "border-border bg-surface text-muted"
        }`}
      >
        {showDone ? (
          <CheckIcon className="check-pop size-5" />
        ) : lecture.kind === "lesson" ? (
          lecture.order || index + 1
        ) : (
          <Icon className="size-5" />
        )}
      </span>

      <SpotlightCard
        className={`group/card border-border bg-surface rounded-2xl border ${
          showDone ? "border-success/40" : ""
        }`}
      >
        <Link
          href={lecture.href}
          className="focus-visible:outline-accent block rounded-2xl p-4 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:p-5"
        >
          <span className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${
                lecture.kind === "lesson"
                  ? "bg-surface-hover text-muted"
                  : "bg-accent/10 text-accent"
              }`}
            >
              <Icon className="size-3" />
              {label}
            </span>
            {showDone && (
              <span className="text-success text-xs font-medium">Completed</span>
            )}
          </span>

          <span className="mt-2 flex items-start justify-between gap-3">
            <span className="group-hover/card:text-accent text-base font-semibold text-balance transition-colors duration-200 sm:text-lg">
              {lecture.title}
            </span>
            <ArrowRightIcon className="text-muted group-hover/card:text-accent mt-1 size-5 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-focus-within/card:translate-x-0 group-focus-within/card:opacity-100 group-hover/card:translate-x-0 group-hover/card:opacity-100" />
          </span>

          {lecture.summary && (
            <span className="text-muted mt-1 line-clamp-2 block text-sm text-pretty">
              {lecture.summary}
            </span>
          )}

          <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {isQuiz ? (
              <>
                <Chip>
                  <ListChecksIcon className="size-3.5" />
                  {lecture.quizCount} questions
                </Chip>
                <Chip>
                  <QuizScore module={lecture.module} slug={lecture.slug} />
                </Chip>
              </>
            ) : (
              <>
                <Chip>
                  <ClockIcon className="size-3.5" />
                  {lecture.minutes} min read
                </Chip>
                {lecture.videoCount > 0 && (
                  <Chip>
                    <PlayCircleIcon className="size-3.5" />
                    {lecture.videoCount} video{lecture.videoCount === 1 ? "" : "s"}
                  </Chip>
                )}
              </>
            )}
          </span>
        </Link>

        {!isQuiz && lecture.sections.length > 0 && (
          <details className="sections border-border border-t">
            <summary className="text-muted hover:text-foreground focus-visible:outline-accent flex min-h-11 cursor-pointer items-center justify-between rounded-b-2xl px-4 py-2 text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:px-5">
              <span>
                What&apos;s inside · {lecture.sections.length} section
                {lecture.sections.length === 1 ? "" : "s"}
              </span>
              <ChevronDownIcon className="chev size-4 transition-transform duration-300" />
            </summary>
            <ol className="space-y-0.5 px-2 pb-3 sm:px-3">
              {lecture.sections.map((s, i) => (
                <li key={s.id}>
                  <Link
                    href={`${lecture.href}#${s.id}`}
                    className="text-muted hover:bg-surface-hover hover:text-foreground focus-visible:outline-accent flex items-baseline gap-3 rounded-lg px-2.5 py-1.5 text-sm transition-colors duration-150 focus-visible:outline-2"
                  >
                    <span className="text-muted/70 w-5 shrink-0 text-xs tabular-nums">
                      {i + 1}
                    </span>
                    <span>{s.text}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </details>
        )}
      </SpotlightCard>
    </li>
  );
}

/** Timeline of lectures. Each card shows its kind, meta, completion and an expandable outline. */
export function LectureList({ lectures }: { lectures: Lecture[] }) {
  return (
    <ol className="space-y-3" aria-label="Lectures">
      {lectures.map((l, i) => (
        <LectureCard key={l.slug} lecture={l} index={i} />
      ))}
    </ol>
  );
}
