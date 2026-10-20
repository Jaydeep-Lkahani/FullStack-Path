import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompleteButton } from "@/components/CompleteButton";
import { Mdx } from "@/components/mdx";
import { Quiz } from "@/components/Quiz";
import { VideoEmbed } from "@/components/VideoEmbed";
import { getAdjacentLessons, getAllLessons, getLesson, getModule } from "@/lib/content";

export function generateStaticParams() {
  return getAllLessons().map((l) => ({ module: l.module, lesson: l.slug }));
}

export async function generateMetadata(
  props: PageProps<"/learn/[module]/[lesson]">,
): Promise<Metadata> {
  const { module, lesson } = await props.params;
  const l = getLesson(module, lesson);
  return { title: l?.title ?? "Lesson", description: l?.summary };
}

export default async function LessonPage(props: PageProps<"/learn/[module]/[lesson]">) {
  const { module, lesson: slug } = await props.params;
  const lesson = getLesson(module, slug);
  const mod = getModule(module);
  if (!lesson || !mod) notFound();
  const { prev, next } = getAdjacentLessons(module, slug);

  return (
    <div className="mx-auto flex max-w-5xl gap-10">
      <article className="min-w-0 flex-1">
        <p className="text-muted text-sm">
          <Link href={`/learn/${mod.slug}`} className="text-accent hover:underline">
            {mod.title}
          </Link>{" "}
          ·{" "}
          {lesson.quiz.length > 0
            ? "Module quiz"
            : `Lesson ${lesson.order} · ${lesson.minutes} min read`}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {lesson.title}
        </h1>
        <p className="text-muted mt-3 text-lg">{lesson.summary}</p>

        {lesson.videos.length > 0 && (
          <section aria-labelledby="videos" className="mt-8 space-y-4">
            <h2
              id="videos"
              className="text-muted text-sm font-semibold tracking-wider uppercase"
            >
              Watch
            </h2>
            {lesson.videos.map((v) => (
              <VideoEmbed key={v.url} video={v} />
            ))}
          </section>
        )}

        {lesson.docs.length > 0 && (
          <section aria-labelledby="docs" className="mt-8">
            <h2
              id="docs"
              className="text-muted text-sm font-semibold tracking-wider uppercase"
            >
              Official docs
            </h2>
            <ul className="mt-3 space-y-1.5">
              {lesson.docs.map((d) => (
                <li key={d.url}>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {d.title} <span aria-hidden>↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="lesson-prose prose mt-8 max-w-none">
          <Mdx source={lesson.body} />
        </div>

        {lesson.quiz.length > 0 && (
          <Quiz module={lesson.module} slug={lesson.slug} questions={lesson.quiz} />
        )}

        {lesson.takeaways.length > 0 && (
          <section className="border-accent/40 bg-accent/5 mt-10 rounded-xl border p-5">
            <h2 className="text-lg font-semibold">Key takeaways</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              {lesson.takeaways.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        )}

        <div className="border-border mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <CompleteButton module={lesson.module} slug={lesson.slug} />
        </div>

        <nav aria-label="Lesson navigation" className="mt-6 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              href={prev.href}
              className="border-border hover:border-accent rounded-xl border p-4"
            >
              <span className="text-muted text-xs">← Previous</span>
              <span className="block font-medium">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={next.href}
              className="border-border hover:border-accent rounded-xl border p-4 text-right"
            >
              <span className="text-muted text-xs">Next →</span>
              <span className="block font-medium">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>

      {lesson.headings.length > 0 && (
        <aside className="sticky top-20 hidden h-fit w-52 shrink-0 text-sm xl:block">
          <p className="mb-2 font-semibold">On this page</p>
          <ul className="border-border space-y-1.5 border-l">
            {lesson.headings.map((h) => (
              <li key={h.id} className={h.depth === 3 ? "pl-6" : "pl-3"}>
                <a href={`#${h.id}`} className="text-muted hover:text-foreground">
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
