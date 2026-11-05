"use client";

import Link from "next/link";
import { QuizScore } from "@/components/QuizScore";
import { Morph } from "@/components/PageTransition";
import { lessonKey, useCompleted } from "@/lib/progress";
import { useResume } from "@/lib/resume";
import { Chip } from "@/components/ui/Chip";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ClockIcon,
  CurrentIcon,
  DoneIcon,
  ListChecksIcon,
  NotStartedIcon,
  PlayCircleIcon,
  ProjectIcon,
  StretchIcon,
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

const KIND = {
  quiz: { label: "Quiz", Icon: ListChecksIcon, tone: "accent" },
  project: { label: "Project", Icon: ProjectIcon, tone: "track" },
  stretch: { label: "Stretch", Icon: StretchIcon, tone: "warning" },
} as const;

function LectureRow({
  lecture,
  index,
  current,
}: {
  lecture: Lecture;
  index: number;
  current: boolean;
}) {
  const done = useCompleted().has(lessonKey(lecture.module, lecture.slug));
  const kind = lecture.kind === "lesson" ? null : KIND[lecture.kind];
  const isProject = lecture.kind === "project";
  const Status = done ? DoneIcon : current ? CurrentIcon : NotStartedIcon;

  return (
    <li
      className={`group card card-link relative overflow-hidden ${isProject ? "track-rule" : ""} ${done ? "border-success/35" : ""}`}
    >
      <div className="flex items-start gap-4 p-4 sm:p-5">
        <span
          aria-hidden
          className={`mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl font-mono text-sm font-semibold tabular-nums ${
            isProject
              ? "bg-track/12 text-track"
              : "border-border bg-surface text-muted border"
          }`}
        >
          {isProject ? (
            <ProjectIcon className="size-5" />
          ) : lecture.kind === "quiz" ? (
            <ListChecksIcon className="size-5" />
          ) : (
            String(index + 1).padStart(2, "0")
          )}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {kind && (
              <Chip tone={kind.tone}>
                <kind.Icon className="size-3.5" />
                {kind.label}
              </Chip>
            )}
            {current && !done && <Chip tone="accent">Up next</Chip>}
          </div>
          <h3 className="mt-1 text-base font-semibold text-balance sm:text-lg">
            <Link
              href={lecture.href}
              transitionTypes={["nav-forward"]}
              className="group-hover:text-accent transition-colors duration-150 after:absolute after:inset-0"
            >
              <Morph name={`lesson-${lecture.module}-${lecture.slug}`}>
                <span>{lecture.title}</span>
              </Morph>
            </Link>
          </h3>
          {lecture.summary && (
            <p className="text-muted mt-1 line-clamp-2 text-sm text-pretty">
              {lecture.summary}
            </p>
          )}
          <p className="text-muted mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            {lecture.kind === "quiz" ? (
              <>
                <span className="inline-flex items-center gap-1.5">
                  <ListChecksIcon className="size-3.5" />
                  {lecture.quizCount} questions
                </span>
                <QuizScore module={lecture.module} slug={lecture.slug} />
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5">
                  <ClockIcon className="size-3.5" />
                  {lecture.minutes} min read
                </span>
                {lecture.videoCount > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <PlayCircleIcon className="size-3.5" />
                    {lecture.videoCount} video{lecture.videoCount === 1 ? "" : "s"}
                  </span>
                )}
              </>
            )}
          </p>
        </div>
        <span className="flex shrink-0 flex-col items-end gap-3">
          <span
            className={done ? "text-success" : current ? "text-accent" : "text-subtle"}
          >
            <Status className={`size-5 ${done ? "check-pop" : ""}`} />
            <span className="sr-only">
              {done ? "Completed" : current ? "Up next" : ""}
            </span>
          </span>
          <ArrowRightIcon className="text-accent size-4 -translate-x-1 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
      </div>

      {lecture.kind !== "quiz" && lecture.sections.length > 0 && (
        <details className="sections border-border relative z-10 border-t">
          <summary className="text-muted hover:text-foreground flex min-h-11 cursor-pointer items-center justify-between px-4 py-2 text-xs font-medium transition-colors duration-150 sm:px-5">
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
                  className="text-muted hover:bg-surface-hover hover:text-foreground flex min-h-9 items-baseline gap-3 rounded-lg px-2.5 py-1.5 text-sm transition-colors duration-150"
                >
                  <span className="text-subtle w-5 shrink-0 font-mono text-xs tabular-nums">
                    {i + 1}
                  </span>
                  <span>{s.text}</span>
                </Link>
              </li>
            ))}
          </ol>
        </details>
      )}
    </li>
  );
}

/** Numbered curriculum with status icons (UI-UX.md §8.5). */
export function LectureList({ lectures }: { lectures: Lecture[] }) {
  const { target, started } = useResume(lectures);
  return (
    <ol className="space-y-3" aria-label="Lectures">
      {lectures.map((l, i) => (
        <LectureRow
          key={l.slug}
          lecture={l}
          index={i}
          current={started && target?.href === l.href}
        />
      ))}
    </ol>
  );
}
