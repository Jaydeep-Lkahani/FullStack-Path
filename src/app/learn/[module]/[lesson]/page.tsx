import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompleteButton } from "@/components/CompleteButton";
import { Mdx } from "@/components/mdx";
import { Quiz } from "@/components/Quiz";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  ExternalLinkIcon,
  LayersIcon,
  PlayCircleIcon,
  SparklesIcon,
  BookOpenIcon,
} from "@/components/course/icons";
import { LessonToc, LessonTocSheet } from "@/components/lesson/LessonToc";
import { VideoShowcase } from "@/components/lesson/VideoShowcase";
import { ReadingProgress } from "@/components/lesson/ReadingProgress";
import { getAdjacentLessons, getAllLessons, getLesson, getModule } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return getAllLessons().map((l) => ({ module: l.module, lesson: l.slug }));
}

export async function generateMetadata(
  props: PageProps<"/learn/[module]/[lesson]">,
): Promise<Metadata> {
  const { module, lesson } = await props.params;
  const l = getLesson(module, lesson);
  const canonical = `/learn/${module}/${lesson}`;
  return {
    title: l?.title ?? "Lesson",
    description: l?.summary,
    alternates: { canonical },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: l?.title,
      description: l?.summary,
      url: canonical,
    },
  };
}

export default async function LessonPage(props: PageProps<"/learn/[module]/[lesson]">) {
  const { module, lesson: slug } = await props.params;
  const lesson = getLesson(module, slug);
  const mod = getModule(module);
  if (!lesson || !mod) notFound();
  const { prev, next } = getAdjacentLessons(module, slug);
  const isQuiz = lesson.quiz.length > 0;
  const lessonCount = mod.lessons.filter((l) => l.quiz.length === 0).length;

  return (
    <div className="lesson-max mx-auto flex gap-10">
      <ReadingProgress />
      <article className="min-w-0 flex-1">
        <header className="lesson-hero relative isolate">
          <div className="course-glow" aria-hidden />
          <Link
            href={`/learn/${mod.slug}`}
            className="rise border-border bg-surface/70 text-muted hover:border-accent/50 hover:text-accent focus-visible:outline-accent group inline-flex items-center gap-1.5 rounded-full border py-1 pr-3 pl-2 text-xs font-medium backdrop-blur transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ArrowLeftIcon className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            {mod.title}
          </Link>

          <h1
            className="rise mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            <span className="text-gradient">{lesson.title}</span>
          </h1>
          <p
            className="rise text-muted mt-4 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl"
            style={{ "--d": "160ms" } as React.CSSProperties}
          >
            {lesson.summary}
          </p>

          <ul
            className="rise mt-6 flex flex-wrap gap-2 text-xs font-medium"
            style={{ "--d": "240ms" } as React.CSSProperties}
          >
            <li className="meta-chip">
              <LayersIcon className="text-accent size-3.5" />
              {isQuiz ? "Module quiz" : `Lesson ${lesson.order} of ${lessonCount}`}
            </li>
            <li className="meta-chip">
              <ClockIcon className="text-accent size-3.5" />
              {lesson.minutes} min read
            </li>
            {lesson.videos.length > 0 && (
              <li className="meta-chip">
                <PlayCircleIcon className="text-accent size-3.5" />
                {lesson.videos.length} {lesson.videos.length === 1 ? "video" : "videos"}
              </li>
            )}
            {lesson.takeaways.length > 0 && (
              <li className="meta-chip">
                <SparklesIcon className="text-accent size-3.5" />
                {lesson.takeaways.length} key takeaways
              </li>
            )}
          </ul>
        </header>

        {lesson.videos.length > 0 && (
          <section aria-labelledby="videos" className="mt-10">
            <h2 id="videos" className="section-kicker">
              <PlayCircleIcon className="size-4" />
              Watch first
            </h2>
            <div className="mt-4">
              <VideoShowcase videos={lesson.videos} />
            </div>
          </section>
        )}

        {lesson.docs.length > 0 && (
          <section aria-labelledby="docs" className="mt-8">
            <h2 id="docs" className="section-kicker">
              <BookOpenIcon className="size-4" />
              Go deeper — official docs
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {lesson.docs.map((d) => (
                <li key={d.url}>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-chip focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {d.title}
                    <ExternalLinkIcon className="size-3.5" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="lesson-divider" aria-hidden />

        <div className="lesson-prose prose max-w-none">
          <Mdx source={lesson.body} />
        </div>

        {isQuiz && (
          <Quiz module={lesson.module} slug={lesson.slug} questions={lesson.quiz} />
        )}

        {lesson.takeaways.length > 0 && (
          <section aria-labelledby="takeaways" className="takeaways reveal mt-14">
            <div className="takeaways-inner">
              <h2 id="takeaways" className="flex items-center gap-2.5 text-xl font-bold">
                <span className="takeaways-badge" aria-hidden>
                  <SparklesIcon className="size-4" />
                </span>
                Key takeaways
              </h2>
              <ul className="mt-5 space-y-3">
                {lesson.takeaways.map((t, i) => (
                  <li
                    key={t}
                    className="takeaway flex gap-3 leading-relaxed"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <span className="takeaway-check" aria-hidden>
                      <CheckIcon className="size-3.5" />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <div className="complete-card reveal mt-8">
          <div>
            <p className="text-base font-semibold">Finished this lesson?</p>
            <p className="text-muted text-sm">
              Mark it complete to track your progress across the course.
            </p>
          </div>
          <CompleteButton module={lesson.module} slug={lesson.slug} />
        </div>

        <nav aria-label="Lesson navigation" className="mt-6 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link href={prev.href} className="pager-card group">
              <span className="text-muted flex items-center gap-1.5 text-xs font-medium">
                <ArrowLeftIcon className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                Previous
              </span>
              <span className="mt-1 block font-semibold">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={next.href} className="pager-card group text-right">
              <span className="text-muted flex items-center justify-end gap-1.5 text-xs font-medium">
                Next
                <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
              <span className="mt-1 block font-semibold">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>

      {lesson.headings.length > 0 && (
        <>
          <LessonToc headings={lesson.headings} />
          <LessonTocSheet headings={lesson.headings} />
        </>
      )}
    </div>
  );
}
