import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { CodePre } from "./CodePre";
import {
  AlertTriangleIcon,
  ChevronDownIcon,
  InfoIcon,
  LightbulbIcon,
  PuzzleIcon,
} from "./course/icons";

function Callout({
  type = "note",
  title,
  children,
}: {
  type?: "note" | "tip" | "warning";
  title?: string;
  children: React.ReactNode;
}) {
  const config = {
    note: { tone: "text-accent", box: "callout-note", Icon: InfoIcon, label: "Note" },
    tip: { tone: "text-success", box: "callout-tip", Icon: LightbulbIcon, label: "Tip" },
    warning: {
      tone: "text-warning",
      box: "callout-warning",
      Icon: AlertTriangleIcon,
      label: "Watch out",
    },
  }[type];
  return (
    <aside className={`callout not-prose ${config.box}`}>
      <span className={`callout-icon ${config.tone}`} aria-hidden>
        <config.Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className={`callout-title ${config.tone}`}>{title ?? config.label}</p>
        <div className="callout-body">{children}</div>
      </div>
    </aside>
  );
}

function Exercise({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="exercise not-prose">
      <header className="exercise-head">
        <span className="exercise-badge" aria-hidden>
          <PuzzleIcon className="size-4" />
        </span>
        <div>
          <p className="exercise-kicker">Exercise</p>
          <h4 className="exercise-title">{title}</h4>
        </div>
      </header>
      <div className="exercise-body prose max-w-none">{children}</div>
    </section>
  );
}

function Solution({ children }: { children: React.ReactNode }) {
  return (
    <details className="solution">
      <summary>
        <span className="solution-label">
          <LightbulbIcon className="size-4" />
          Show solution
        </span>
        <ChevronDownIcon className="chev size-4" />
      </summary>
      <div className="solution-body">{children}</div>
    </details>
  );
}

// remark-gfm renders task-list checkboxes as `disabled`; the "Ready to move on?"
// checklists are meant to be ticked, so render them as plain uncontrolled inputs.
function TaskCheckbox({
  checked,
  disabled: _disabled,
  ...props
}: React.ComponentProps<"input">) {
  if (props.type !== "checkbox")
    return <input {...props} checked={checked} disabled={_disabled} />;
  return <input {...props} defaultChecked={checked} />;
}

const components = { pre: CodePre, Callout, Exercise, Solution, input: TaskCheckbox };

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
