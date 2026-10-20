import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { CodePre } from "./CodePre";

function Callout({
  type = "note",
  title,
  children,
}: {
  type?: "note" | "tip" | "warning";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    note: "border-accent/40 bg-accent/5",
    tip: "border-success/40 bg-success/5",
    warning: "border-warning/50 bg-warning/10",
  }[type];
  const label = title ?? { note: "Note", tip: "Tip", warning: "Watch out" }[type];
  return (
    <aside className={`not-prose my-6 rounded-lg border-l-4 p-4 text-sm ${styles}`}>
      <p className="mb-1 font-semibold">{label}</p>
      <div className="[&_code]:bg-surface-hover space-y-2 [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5">
        {children}
      </div>
    </aside>
  );
}

function Exercise({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-border bg-surface my-6 rounded-xl border p-5">
      <h4 className="!mt-0 !mb-2 text-base font-semibold">🧩 Exercise: {title}</h4>
      {children}
    </section>
  );
}

function Solution({ children }: { children: React.ReactNode }) {
  return (
    <details className="border-border bg-background mt-3 rounded-lg border p-3">
      <summary className="text-accent cursor-pointer text-sm font-medium">
        Show solution
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

const components = { pre: CodePre, Callout, Exercise, Solution };

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
            [
              rehypePrettyCode,
              {
                theme: { light: "github-light", dark: "github-dark" },
                keepBackground: false,
              },
            ],
          ],
        },
      }}
    />
  );
}
