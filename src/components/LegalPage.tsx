import Link from "next/link";
import { LEGAL_LAST_UPDATED, LEGAL_PAGES } from "@/lib/site";
import { Chip } from "./ui/Chip";
import { LegalToc } from "./LegalToc";

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
    <div className="mx-auto flex max-w-5xl gap-12">
      <article className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-muted kicker">Legal</p>
          <Chip>Last updated {LEGAL_LAST_UPDATED}</Chip>
        </div>
        <h1 className="mt-3 text-[2rem] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[2.5rem]">
          {title}
        </h1>
        <p className="text-muted mt-3 max-w-[60ch] text-lg">{summary}</p>

        <nav aria-label="Legal pages" className="mt-6 flex flex-wrap gap-2 text-sm">
          {LEGAL_PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="border-border hover:bg-surface-hover hover:border-border-strong inline-flex min-h-9 items-center rounded-full border px-3.5 transition-colors"
            >
              {p.label}
            </Link>
          ))}
        </nav>

        <div className="legal-body lesson-prose prose mt-8 max-w-none">{children}</div>
      </article>
      <LegalToc />
    </div>
  );
}

/** Highlighted "short version" box at the top of a legal page. */
export function LegalSummary({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose card max-w-[var(--prose-measure)] p-5 text-sm leading-relaxed">
      <p className="mb-2 font-semibold">The short version</p>
      {children}
    </div>
  );
}
