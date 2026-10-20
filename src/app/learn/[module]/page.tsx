import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgressBar } from "@/components/ProgressBar";
import { QuizScore } from "@/components/QuizScore";
import { getModule, getModules } from "@/lib/content";

export function generateStaticParams() {
  return getModules()
    .filter((m) => m.status === "available")
    .map((m) => ({ module: m.slug }));
}

export async function generateMetadata(
  props: PageProps<"/learn/[module]">,
): Promise<Metadata> {
  const { module } = await props.params;
  return { title: getModule(module)?.title ?? "Module" };
}

export default async function ModulePage(props: PageProps<"/learn/[module]">) {
  const { module } = await props.params;
  const mod = getModule(module);
  if (!mod || mod.status !== "available") notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-accent text-sm font-medium">Phase {mod.phase}</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">{mod.title}</h1>
      <p className="text-muted mt-2">{mod.description}</p>
      <div className="mt-6">
        <ProgressBar lessons={mod.lessons} label="Module progress" />
      </div>
      <ol className="mt-8 space-y-3">
        {mod.lessons.map((l) => (
          <li key={l.slug}>
            <Link
              href={l.href}
              className="border-border bg-surface hover:border-accent block rounded-xl border p-4"
            >
              <span className="font-semibold">
                {l.quiz.length > 0 ? l.title : `${l.order}. ${l.title}`}
              </span>
              <span className="text-muted mt-1 block text-sm">{l.summary}</span>
              <span className="text-muted mt-2 block text-xs">
                {l.quiz.length > 0 ? (
                  <>
                    {l.quiz.length} questions ·{" "}
                    <QuizScore module={l.module} slug={l.slug} />
                  </>
                ) : (
                  <>
                    {l.minutes} min read · {l.videos.length} video
                    {l.videos.length === 1 ? "" : "s"}
                  </>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
