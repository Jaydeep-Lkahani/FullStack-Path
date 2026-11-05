import type { Metadata } from "next";
import Link from "next/link";
import { LessonChecklist } from "@/components/home/LessonChecklist";
import { LoopTrap } from "@/components/home/LoopTrap";
import { Moments, type Moment } from "@/components/home/Moments";
import { NextLesson } from "@/components/home/NextLesson";
import { PhaseNode } from "@/components/home/PhaseNode";
import { ProgressRing } from "@/components/home/ProgressRing";
import { StartButton } from "@/components/home/StartButton";
import { WelcomeBack } from "@/components/home/WelcomeBack";
import { Morph, PageTransition } from "@/components/PageTransition";
import { ChevronDownIcon, SoonIcon } from "@/components/course/icons";
import { getAllLessons, getModules } from "@/lib/content";
import { getLoopTrap, LOOP_TRAP_LESSON } from "@/lib/loop-trap";
import { lessonKind } from "@/lib/nav";
import { roadmap, type TrackId } from "@/lib/roadmap";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const TECH: { name: string; track: TrackId }[] = [
  { name: "JavaScript", track: "js" },
  { name: "TypeScript", track: "ts" },
  { name: "React", track: "react" },
  { name: "Node.js", track: "node" },
  { name: "Express", track: "node" },
  { name: "Next.js", track: "next" },
  { name: "REST APIs", track: "node" },
  { name: "Authentication", track: "node" },
  { name: "WebSockets", track: "node" },
  { name: "Testing", track: "react" },
  { name: "PostgreSQL", track: "db" },
  { name: "Prisma", track: "db" },
  { name: "Git", track: "foundations" },
  { name: "Docker", track: "prod" },
];

/** The parts of every lesson, each shown on the real page (public/home/*.png). */
const MOMENTS: Moment[] = [
  {
    id: "read",
    label: "Read",
    title: "Explained from scratch",
    text: "Every concept follows the same rhythm: a plain-English explanation, a small example you can run, and the mistake most people make.",
    light: "/home/read-light.png",
    dark: "/home/read-dark.png",
    width: 1440,
    height: 900,
    alt: "The Closures section of the Scope, Hoisting & Closures lesson, with its code example",
  },
  {
    id: "watch",
    label: "Watch",
    title: "Curated videos",
    text: "Hand-picked, link-checked videos on most lessons, so you never hunt for a good tutorial. Pop one out and it stays with you as you read.",
    light: "/home/watch-light.png",
    dark: "/home/watch-dark.png",
    width: 1440,
    height: 900,
    alt: "A lesson video playing in the floating player while the lesson scrolls beneath it",
  },
  {
    id: "practise",
    label: "Practise",
    title: "Practice that sticks",
    text: "Exercises close each lesson, from easy to hard, each with a full solution to open once you have tried it yourself.",
    light: "/home/practise-light.png",
    dark: "/home/practise-dark.png",
    width: 1440,
    height: 900,
    alt: "The Predict the output exercise with its solution open",
  },
  {
    id: "check",
    label: "Check",
    title: "A quiz to close the module",
    text: "Multiple-choice questions on what the module taught, with the reasoning behind every answer.",
    light: "/home/check-light.png",
    dark: "/home/check-dark.png",
    width: 1440,
    height: 900,
    alt: "The JavaScript Core quiz with one question answered and its explanation shown",
  },
];

/** Hairlines between the four figures: two by two on a phone, one row from sm up. */
const SPEC_CELL = [
  "",
  "border-l pl-6",
  "border-t sm:border-t-0 sm:border-l sm:pl-6",
  "border-t border-l pl-6 sm:border-t-0",
];

function formatTime(minutes: number) {
  return minutes >= 90 ? `${Math.round(minutes / 60)} h` : `${minutes} min`;
}

export default async function Home() {
  const modules = getModules();
  const all = getAllLessons();
  const samples = await getLoopTrap();
  const links = all.map((l) => ({
    module: l.module,
    slug: l.slug,
    href: l.href,
    title: l.title,
  }));
  const welcomeLessons = all.map((l) => {
    const mod = modules.find((m) => m.slug === l.module);
    return {
      ...links.find((x) => x.href === l.href)!,
      moduleTitle: mod?.title ?? l.module,
      track: mod?.track ?? "foundations",
      label: l.quiz.length > 0 ? "Quiz" : `Lesson ${l.order}`,
      minutes: l.minutes,
    };
  });

  const liveModules = modules.filter((m) => m.lessons.length > 0);
  const firstModule = liveModules[0];
  const trapModule = modules.find((m) => m.slug === LOOP_TRAP_LESSON.module);
  const trapLesson = trapModule?.lessons.find((l) => l.slug === LOOP_TRAP_LESSON.slug);

  const spec = [
    { label: "Lessons", value: String(all.length) },
    {
      label: "Modules live",
      value: String(liveModules.length),
      note: `of ${modules.length} on the roadmap`,
    },
    {
      label: "Curated videos",
      value: String(all.reduce((n, l) => n + l.videos.length, 0)),
    },
    {
      label: "Hours of reading",
      value: String(Math.round(all.reduce((n, l) => n + l.minutes, 0) / 60)),
    },
  ];

  return (
    <PageTransition>
      {/* ---------- Hero: start or resume, beside the lesson's own code ---------- */}
      <section
        aria-label="Start here"
        className="grid content-center items-center gap-x-20 gap-y-12 lg:min-h-[calc(100svh-var(--header-h)-11rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
      >
        <div className="for-new min-w-0">
          <h1 className="max-w-[13ch] text-(length:--text-display) leading-[1.02]">
            The full stack, after HTML and CSS.
          </h1>
          <p className="lead text-ink-2 mt-6">
            A free, self-paced path from JavaScript to React, Node.js and Next.js.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <StartButton
              lessons={links}
              startLabel={`Start with ${firstModule?.title ?? "lesson one"}`}
            />
            <a
              href="#roadmap"
              className="decoration-accent min-h-11 content-center underline underline-offset-[0.25em] hover:decoration-2"
            >
              See the roadmap
            </a>
          </div>
        </div>
        <div className="for-returning min-w-0">
          <WelcomeBack lessons={welcomeLessons} />
        </div>
        {trapLesson && trapModule && (
          <LoopTrap
            samples={samples}
            lesson={{
              href: trapLesson.href,
              title: trapLesson.title,
              moduleTitle: trapModule.title,
              order: trapLesson.order,
            }}
          />
        )}
      </section>

      {/* ---------- The parts of a lesson, on the real page ---------- */}
      <section
        aria-labelledby="lesson-parts"
        className="border-foreground mt-10 border-t pt-10 lg:mt-0"
      >
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div>
            <h2 id="lesson-parts" className="section-head">
              How a lesson works
            </h2>
            <p className="lead text-ink-2 mt-4">
              Read the idea, watch it explained, write the code, then check yourself.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Moments moments={MOMENTS} />
        </div>
      </section>

      {/* ---------- What's inside: the course in figures it ships with ---------- */}
      <section
        aria-labelledby="inside"
        className="mt-(--section-gap) grid gap-x-8 gap-y-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-4">
          <h2 id="inside" className="section-head">
            What&apos;s inside
          </h2>
          <p className="lead text-ink-2 mt-4">
            Free and self-paced. No sign-up: your progress stays in this browser.
          </p>
        </div>
        <dl className="border-foreground border-t lg:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {spec.map((s, i) => (
              <div
                key={s.label}
                className={`border-border py-6 sm:py-8 ${SPEC_CELL[i] ?? ""}`}
              >
                <dt className="text-muted text-sm">{s.label}</dt>
                <dd className="ledger-num mt-3 text-[3.25rem] tabular-nums sm:text-[3.75rem]">
                  {s.value}
                </dd>
                {s.note && <dd className="text-muted mt-2 text-sm">{s.note}</dd>}
              </div>
            ))}
          </div>
          <div className="border-border grid gap-2 border-t py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
            <dt className="text-muted text-sm sm:pt-1">Covers</dt>
            <dd className="text-[1.0625rem] leading-relaxed text-pretty">
              <ul className="inline-list">
                {TECH.map((t) => (
                  <li key={t.name} data-track={t.track}>
                    {t.name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="border-border grid gap-2 border-t border-b py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
            <dt className="text-muted text-sm sm:pt-1">Along the way</dt>
            <dd className="text-[1.0625rem] leading-relaxed text-pretty">
              Takeaways and links to the official docs on every lesson. Six projects built
              in stages, and a quiz at the end of most modules.
            </dd>
          </div>
        </dl>
      </section>

      {/* ---------- The roadmap: a ledger of phases and modules ---------- */}
      <section aria-labelledby="roadmap" className="mt-(--section-gap) scroll-mt-20">
        <div className="grid gap-x-8 gap-y-4 lg:grid-cols-12">
          <h2 id="roadmap" className="section-head lg:col-span-5">
            The roadmap
          </h2>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
            <p className="lead text-ink-2">
              Work through the phases in order. Each module builds on the one before it.
            </p>
            <p className="text-muted mt-3 text-pretty">
              Tick lessons off and watch the rings fill. It is all saved in your browser,
              with no account needed.
            </p>
          </div>
        </div>

        <div className="mt-12">
          {roadmap.map((phase) => {
            const live = phase.modules.filter((m) => {
              const mod = modules.find((x) => x.slug === m.slug);
              return m.status === "available" && (mod?.lessons.length ?? 0) > 0;
            });
            const soon = phase.modules.filter((m) => !live.includes(m));
            const phaseLessons = modules
              .filter((m) => live.some((l) => l.slug === m.slug))
              .flatMap((m) => m.lessons)
              .map((l) => ({
                module: l.module,
                slug: l.slug,
                href: l.href,
                title: l.title,
              }));
            return (
              <div
                key={phase.id}
                className="ledger-phase grid gap-x-8 gap-y-6 pt-8 pb-14 lg:grid-cols-12"
              >
                <div className="lg:col-span-4">
                  <PhaseNode id={phase.id} lessons={phaseLessons} allLessons={links} />
                  <h3 className="display-sm mt-4 text-(length:--text-title) leading-tight">
                    {phase.title}
                  </h3>
                  <p className="text-muted mt-2 max-w-[36ch] text-pretty">{phase.goal}</p>
                </div>
                <div className="lg:col-span-8">
                  <ol>
                    {live.map((m) => {
                      const mod = modules.find((x) => x.slug === m.slug)!;
                      const minutes = mod.lessons.reduce((n, l) => n + l.minutes, 0);
                      return (
                        <li
                          key={m.slug}
                          data-track={m.track}
                          className="ledger-row group hover:bg-surface-hover relative px-0 py-5 transition-colors duration-150 first:border-t-0 sm:px-4"
                        >
                          <div className="flex items-start justify-between gap-6">
                            <div className="min-w-0">
                              <h4 className="text-lg font-bold">
                                <Link
                                  href={`/learn/${m.slug}`}
                                  transitionTypes={["nav-forward"]}
                                  className="decoration-accent group-hover:underline after:absolute after:inset-0"
                                >
                                  <Morph name={`module-${m.slug}`}>
                                    <span>{m.title}</span>
                                  </Morph>
                                </Link>
                              </h4>
                              <p className="text-ink-2 mt-1 max-w-[56ch] text-pretty">
                                {m.description}
                              </p>
                              <p className="text-muted mt-2 text-sm tabular-nums">
                                {mod.lessons.length} lessons, about {formatTime(minutes)}
                              </p>
                            </div>
                            <ProgressRing
                              lessons={mod.lessons}
                              label={`${m.title} progress`}
                            />
                          </div>
                          <details className="disclose relative z-10 mt-3">
                            <summary className="text-muted hover:text-foreground inline-flex min-h-9 cursor-pointer items-center gap-1.5 text-sm transition-colors select-none">
                              Show lessons
                              <ChevronDownIcon className="chev size-3.5 transition-transform duration-200" />
                            </summary>
                            <div className="mt-1 max-w-xl">
                              <LessonChecklist
                                lessons={mod.lessons.map((l) => ({
                                  module: l.module,
                                  slug: l.slug,
                                  href: l.href,
                                  title: l.title,
                                  label:
                                    lessonKind(l) === "quiz"
                                      ? l.title
                                      : `${l.order}. ${l.title}`,
                                }))}
                              />
                            </div>
                          </details>
                        </li>
                      );
                    })}
                  </ol>
                  {soon.length > 0 && (
                    <p
                      className={`text-muted flex items-start gap-2 py-5 text-sm sm:px-4 ${live.length > 0 ? "ledger-row" : ""}`}
                    >
                      <SoonIcon className="mt-0.5 size-4 shrink-0" />
                      <span>
                        {live.length > 0 ? "+" : ""}
                        {soon.length} {soon.length === 1 ? "module" : "modules"} coming
                        soon: {soon.map((m) => m.title).join(", ")}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- Close: the next lesson, on the ink band ---------- */}
      <section
        aria-labelledby="cta"
        className="bg-foreground text-background mt-(--section-gap-s) mb-6 grid gap-x-8 gap-y-10 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-12"
      >
        <div className="lg:col-span-7">
          <h2 id="cta" className="section-head">
            Ready to build real things?
          </h2>
          <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-pretty">
            Start at the beginning or jump straight to the module you need. Your progress
            is saved as you go.
          </p>
        </div>
        <div className="border-background/30 grid content-end gap-6 lg:col-span-5 lg:border-l lg:pl-8">
          <NextLesson lessons={welcomeLessons} />
          <div>
            <StartButton
              lessons={links}
              startLabel={`Start with ${firstModule?.title ?? "lesson one"}`}
              variant="light"
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
