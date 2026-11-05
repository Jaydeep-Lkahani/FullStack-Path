import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompleteButton } from "@/components/CompleteButton";
import { Mdx } from "@/components/mdx";
import { Morph, PageTransition } from "@/components/PageTransition";
import { Quiz } from "@/components/Quiz";
import {
  CheckIcon,
  ExternalLinkIcon,
  PlayCircleIcon,
  SparklesIcon,
} from "@/components/course/icons";
import { LessonToc, LessonTocSheet } from "@/components/lesson/LessonToc";
import { VideoShowcase } from "@/components/lesson/VideoShowcase";
import { ReadingProgress } from "@/components/lesson/ReadingProgress";
import { LessonEffects } from "@/components/lesson/LessonEffects";
import {
  LessonBottomBar,
  LessonPager,
  ModuleCompleteBanner,
} from "@/components/lesson/LessonEnd";
import {
  getAdjacentLessons,
  getAllLessons,
  getLesson,
  getModule,
  getModules,
} from "@/lib/content";
import { SITE_NAME } from "@/lib/site";
import { totalDuration } from "@/lib/youtube";

export function generateStaticParams() {
  return getAllLessons().map((l) => ({ module: l.module, lesson: l.slug }));
}

export async function generateMetadata(
  props: PageProps<"/learn/[module]/[lesson]">,
): Promise<Metadata> {
  const { module, lesson } = await props.params;
  const l = getLesson(module, lesson);
  if (!l) return { title: "Not found" };
  const canonical = `/learn/${module}/${lesson}`;
  return {
    title: l.title,
    description: l.summary,
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
  const moduleKeys = mod.lessons.map((l) => `${l.module}/${l.slug}`);
  const modules = getModules();
  const nextMod = modules
    .slice(modules.findIndex((m) => m.slug === mod.slug) + 1)
    .find((m) => m.status === "available" && m.lessons.length > 0);
  const nextModule = nextMod
    ? { title: nextMod.title, href: nextMod.lessons[0].href }
    : null;
  const pagerPrev = prev ? { href: prev.href, title: prev.title } : null;
  const pagerNext = next ? { href: next.href, title: next.title } : null;

  const meta = [
    isQuiz ? "Module quiz" : null,
    `${lesson.minutes} min read`,
    lesson.videos.length > 0
      ? `${lesson.videos.length} ${lesson.videos.length === 1 ? "video" : "videos"}`
      : null,
    lesson.takeaways.length > 0 ? `${lesson.takeaways.length} takeaways` : null,
  ].filter(Boolean);

  return (
    <PageTransition>
      <div className="lesson-max mx-auto flex gap-12" data-track={mod.track}>
        <ReadingProgress />
        <LessonEffects
          lesson={{
            module: lesson.module,
            slug: lesson.slug,
            href: lesson.href,
            title: lesson.title,
            moduleTitle: mod.title,
          }}
        />
        <article className="min-w-0 flex-1">
          <header className="rise">
            <nav
              aria-label="Breadcrumb"
              className="text-muted kicker flex flex-wrap items-center gap-x-2 gap-y-1"
            >
              <span className="track-dot" aria-hidden />
              <Link
                href={`/learn/${mod.slug}`}
                transitionTypes={["nav-back"]}
                className="hover:text-foreground rounded-sm transition-colors"
              >
                Phase {mod.phase} · {mod.title}
              </Link>
              <span aria-hidden className="text-subtle">
                ›
              </span>
              <span aria-current="page">
                {isQuiz ? "Quiz" : `Lesson ${lesson.order} of ${lessonCount}`}
              </span>
            </nav>

            <div className="mt-3 flex items-start justify-between gap-6">
              <Morph name={`lesson-${lesson.module}-${lesson.slug}`}>
                <h1 className="text-[2rem] leading-[1.12] font-bold tracking-[-0.025em] text-balance sm:text-[2.5rem] sm:leading-[1.1] sm:tracking-[-0.03em]">
                  {lesson.title}
                </h1>
              </Morph>
              <div className="mt-1.5 hidden shrink-0 sm:block">
                <CompleteButton
                  module={lesson.module}
                  slug={lesson.slug}
                  moduleLessons={moduleKeys}
                  variant="compact"
                />
              </div>
            </div>
            {lesson.summary && (
              <p className="text-muted mt-3 max-w-[60ch] text-[1.1875rem] leading-[1.6] tracking-[-0.005em] text-pretty">
                {lesson.summary}
              </p>
            )}
            <p className="text-muted mt-3 text-[0.8125rem] font-medium">
              {meta.map((m, i) => (
                <span key={m}>
                  {i > 0 && (
                    <span aria-hidden className="text-subtle mx-2">
                      ·
                    </span>
                  )}
                  {m}
                </span>
              ))}
            </p>
          </header>

          {lesson.videos.length > 0 && (
            <section aria-labelledby="videos" className="mt-7">
              <h2
                id="videos"
                className="text-muted kicker mb-2.5 flex items-center gap-2"
              >
                <PlayCircleIcon className="size-3.5" />
                Watch (optional) · {lesson.videos.length}{" "}
                {lesson.videos.length === 1 ? "video" : "videos"} ·{" "}
                {totalDuration(lesson.videos)}
              </h2>
              <VideoShowcase videos={lesson.videos} />
            </section>
          )}

          {lesson.docs.length > 0 && (
            <section
              aria-labelledby="docs"
              className={`mt-6 ${lesson.headings.length > 0 ? "xl:hidden" : ""}`}
            >
              <h2 id="docs" className="text-muted kicker mb-2.5">
                Official docs
              </h2>
              <ul className="flex flex-wrap gap-2">
                {lesson.docs.map((d) => (
                  <li key={d.url}>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="doc-chip"
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

          <hr className="border-border mt-8 mb-2" />

          <div className="lesson-prose prose max-w-none">
            <Mdx source={lesson.body} />
          </div>

          {isQuiz && (
            <Quiz
              module={lesson.module}
              slug={lesson.slug}
              questions={lesson.quiz}
              nextModule={nextModule}
            />
          )}

          <div id="lesson-end">
            {lesson.takeaways.length > 0 && (
              <section aria-labelledby="takeaways" className="card mt-14 p-6 sm:p-7">
                <h2 id="takeaways" className="flex items-center gap-3 text-xl font-bold">
                  <span className="icon-tile" aria-hidden>
                    <SparklesIcon className="size-5" />
                  </span>
                  Key takeaways
                </h2>
                <ul className="mt-5 space-y-3">
                  {lesson.takeaways.map((t) => (
                    <li
                      key={t}
                      className="takeaway flex max-w-[68ch] gap-3 leading-relaxed"
                    >
                      <span className="takeaway-check" aria-hidden>
                        <CheckIcon className="size-3.5" />
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="card mt-6 flex flex-wrap items-center justify-between gap-4 px-6 py-5">
              <div>
                <p className="font-semibold">Finished?</p>
                <p className="text-muted text-sm">Mark it done to keep your place.</p>
              </div>
              <CompleteButton
                module={lesson.module}
                slug={lesson.slug}
                moduleLessons={moduleKeys}
              />
            </div>

            <ModuleCompleteBanner
              keys={moduleKeys}
              moduleTitle={mod.title}
              nextModule={nextModule}
            />

            <LessonPager
              module={lesson.module}
              slug={lesson.slug}
              prev={pagerPrev}
              next={pagerNext}
            />
          </div>
        </article>

        {lesson.headings.length > 0 && (
          <>
            <LessonToc headings={lesson.headings} docs={lesson.docs} />
            <LessonTocSheet headings={lesson.headings} />
          </>
        )}
        <LessonBottomBar
          module={lesson.module}
          slug={lesson.slug}
          prev={pagerPrev}
          next={pagerNext}
        />
      </div>
    </PageTransition>
  );
}
