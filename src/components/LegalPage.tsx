import Link from "next/link";
import { LEGAL_LAST_UPDATED, LEGAL_PAGES } from "@/lib/site";

/** Shared layout for the privacy, terms and cookie pages. */
export function LegalPage({
  title,
  summary,
  children,
}: {
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-muted text-sm">Legal · Last updated {LEGAL_LAST_UPDATED}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="text-muted mt-3 text-lg">{summary}</p>

      <nav aria-label="Legal pages" className="mt-6 flex flex-wrap gap-2 text-sm">
        {LEGAL_PAGES.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="border-border hover:bg-surface rounded-full border px-3 py-1"
          >
            {p.label}
          </Link>
        ))}
      </nav>

      <div className="lesson-prose prose mt-8 max-w-none">{children}</div>
    </article>
  );
}

/** Highlighted "short version" box at the top of a legal page. */
export function LegalSummary({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose border-border bg-surface rounded-xl border p-5 text-sm leading-relaxed">
      <p className="mb-2 font-semibold">The short version</p>
      {children}
    </div>
  );
}
