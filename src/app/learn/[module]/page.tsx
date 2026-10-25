import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseProgress } from "@/components/course/CourseProgress";
import {
  LectureList,
  type Lecture,
  type LectureKind,
} from "@/components/course/LectureList";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  ClockIcon,
  LayersIcon,
  ListChecksIcon,
  PlayCircleIcon,
} from "@/components/course/icons";
import { getModule, getModules, type Lesson } from "@/lib/content";

export function generateStaticParams() {
  return getModules()
    .filter((m) => m.status === "available")
    .map((m) => ({ module: m.slug }));
}

export async function generateMetadata(
  props: PageProps<"/learn/[module]">,
): Promise<Metadata> {
  const { module } = await props.params;
  const mod = getModule(module);
  return {
    title: mod?.title ?? "Module",
    description: mod?.description,
    alternates: { canonical: `/learn/${module}` },
  };
}

function lectureKind(l: Lesson): LectureKind {
  if (l.quiz.length > 0) return "quiz";
  if (l.slug.startsWith("project")) return "project";
  if (l.slug.startsWith("stretch")) return "stretch";
  return "lesson";
}

function toLecture(l: Lesson): Lecture {
  return {
    module: l.module,
    slug: l.slug,
    href: l.href,
    title: l.title,
    summary: l.summary,
    order: l.order,
    minutes: l.minutes,
    videoCount: l.videos.length,
    quizCount: l.quiz.length,
    kind: lectureKind(l),
    sections: l.headings
      .filter((h) => h.depth === 2)
      .map((h) => ({ id: h.id, text: h.text })),
  };
}

function Stat({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="border-border bg-background/60 text-muted inline-flex items-center gap-2 rounded-full border py-1 pr-3 pl-2.5 text-xs font-medium backdrop-blur">
      <span className="text-accent">{icon}</span>
      {children}
    </li>
  );
}

export default async function ModulePage(props: PageProps<"/learn/[module]">) {
  const { module } = await props.params;
  const mod = getModule(module);
  if (!mod || mod.status !== "available") notFound();

  const lectures = mod.lessons.map(toLecture);
  const readMinutes = mod.lessons.reduce(
    (sum, l) => sum + (l.quiz.length ? 0 : l.minutes),
    0,
  );
  const videos = mod.lessons.reduce((sum, l) => sum + l.videos.length, 0);
  const quizzes = mod.lessons.filter((l) => l.quiz.length > 0).length;
  const hours =
    readMinutes >= 90 ? `${(readMinutes / 60).toFixed(1)} hrs` : `${readMinutes} min`;

  return (
    <div className="mx-auto max-w-3xl">
      <header className="rise border-border bg-surface/70 relative isolate overflow-hidden rounded-3xl border p-5 sm:p-8">
        <div className="course-glow" aria-hidden />

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Link
            href="/#roadmap"
            className="text-muted hover:text-foreground focus-visible:outline-accent group -ml-1 inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-2"
          >
            <ArrowLeftIcon className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Roadmap
          </Link>
          <p className="bg-accent/10 text-accent inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase">
            Phase {mod.phase}
          </p>
        </div>
        <h1 className="mt-3 text-3xl leading-[1.1] font-bold tracking-tight text-balance sm:text-4xl">
          {mod.title}
        </h1>
        <p className="text-muted mt-3 max-w-xl text-base text-pretty sm:text-lg">
          {mod.description}
        </p>

        <ul className="mt-5 mb-6 flex flex-wrap gap-2" aria-label="Course overview">
          <Stat icon={<LayersIcon className="size-3.5" />}>
            {mod.lessons.length} lecture{mod.lessons.length === 1 ? "" : "s"}
          </Stat>
          {readMinutes > 0 && (
            <Stat icon={<ClockIcon className="size-3.5" />}>{hours} of reading</Stat>
          )}
          {videos > 0 && (
            <Stat icon={<PlayCircleIcon className="size-3.5" />}>
              {videos} video{videos === 1 ? "" : "s"}
            </Stat>
          )}
          {quizzes > 0 && (
            <Stat icon={<ListChecksIcon className="size-3.5" />}>
              {quizzes} quiz{quizzes === 1 ? "" : "zes"}
            </Stat>
          )}
        </ul>

        <CourseProgress
          lessons={mod.lessons.map((l) => ({
            module: l.module,
            slug: l.slug,
            href: l.href,
            title: l.title,
          }))}
        />
      </header>

      <section aria-labelledby="curriculum" className="mt-10">
        <h2
          id="curriculum"
          className="text-muted mb-5 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase"
        >
          <BookOpenIcon className="size-4" />
          Curriculum
        </h2>
        <LectureList lectures={lectures} />
      </section>
    </div>
  );
}
