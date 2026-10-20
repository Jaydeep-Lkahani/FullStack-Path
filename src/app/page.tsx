import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar";
import { getAllLessons, getModules } from "@/lib/content";
import { roadmap } from "@/lib/roadmap";

export default function Home() {
  const modules = getModules();
  const all = getAllLessons();
  const first = all[0];

  return (
    <div className="mx-auto max-w-4xl">
      <section className="py-8 sm:py-12">
        <p className="text-accent mb-3 text-sm font-medium">React · Node.js · Next.js</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          From fundamentals to job-ready, full stack.
        </h1>
        <p className="text-muted mt-4 max-w-2xl text-lg">
          A structured path with detailed lessons, curated videos, exercises and interview
          prep. Pick up where you left off — your progress is saved in this browser.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {first && (
            <Link
              href={first.href}
              className="bg-accent rounded-lg px-5 py-2.5 font-medium text-white hover:opacity-90"
            >
              Start learning
            </Link>
          )}
        </div>
        <div className="mt-8 max-w-md">
          <ProgressBar lessons={all} label="Overall progress (Phase 1)" />
        </div>
      </section>

      <section aria-labelledby="roadmap" className="space-y-10 pb-12">
        <h2 id="roadmap" className="text-2xl font-bold tracking-tight">
          The roadmap
        </h2>
        {roadmap.map((phase) => (
          <div key={phase.id}>
            <h3 className="text-lg font-semibold">
              Phase {phase.id} — {phase.title}
            </h3>
            <p className="text-muted mb-4 text-sm">{phase.goal}</p>
            <ol className="grid gap-4 sm:grid-cols-2">
              {phase.modules.map((m) => {
                const mod = modules.find((x) => x.slug === m.slug)!;
                const available = m.status === "available";
                return (
                  <li
                    key={m.slug}
                    className={`border-border rounded-xl border p-4 ${available ? "bg-surface" : "opacity-60"}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold">
                        {available ? (
                          <Link href={`/learn/${m.slug}`} className="hover:text-accent">
                            {m.title}
                          </Link>
                        ) : (
                          m.title
                        )}
                      </h4>
                      {!available && (
                        <span className="bg-surface-hover rounded px-1.5 py-0.5 text-[10px] uppercase">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <p className="text-muted mt-1 text-sm">{m.description}</p>
                    {available && (
                      <>
                        <ul className="mt-3 space-y-1 text-sm">
                          {mod.lessons.map((l) => (
                            <li key={l.slug}>
                              <Link
                                href={l.href}
                                className="text-muted hover:text-accent"
                              >
                                {l.quiz.length > 0 ? l.title : `${l.order}. ${l.title}`}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4">
                          <ProgressBar lessons={mod.lessons} label="Module progress" />
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
}
