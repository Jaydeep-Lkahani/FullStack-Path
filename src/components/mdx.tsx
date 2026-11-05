import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { createCssVariablesTheme, type ShikiTransformer } from "shiki";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import { CodePre } from "./CodePre";
import {
  AlertTriangleIcon,
  ChevronDownIcon,
  EyeIcon,
  InfoIcon,
  LightbulbIcon,
  PuzzleIcon,
} from "./course/icons";
import { Chip, type ChipTone } from "./ui/Chip";

/** Code colours come from CSS variables, so the theme follows the site tokens in both modes. */
const siteTheme = createCssVariablesTheme({
  name: "fullstack-path",
  variablePrefix: "--shiki-",
  fontStyle: true,
});

const PLAIN = new Set(["text", "txt", "plaintext", "plain", "output"]);
const SHELL = new Set(["bash", "sh", "zsh", "shell", "console", "powershell"]);
const FILE_COMMENT =
  /^\s*(?:\/\/|#|--|\/\*|<!--)\s*([\w@./\-[\]()+]+\.[A-Za-z0-9]{1,6})\s*(?:\*\/|-->)?\s*$/;

/**
 * Moves a first-line file-name comment (`// server.js`) into the code bar, numbers longer
 * blocks, and marks plain-text blocks as output. CodePre reads the data-* attributes.
 */
interface CodeMeta {
  filename?: string;
  lineCount?: number;
  output?: boolean;
  shell?: boolean;
}
const metaOf = (ctx: { meta: object }) => ctx.meta as CodeMeta;

const codeMeta: ShikiTransformer = {
  name: "fullstack-path:code-meta",
  preprocess(code, options) {
    const lang = String(options.lang ?? "");
    const raw = String(this.options.meta?.__raw ?? "");
    const title = /title="([^"]+)"/.exec(raw)?.[1];
    const lines = code.replace(/\n$/, "").split("\n");
    let filename = title;
    let body = code;
    const fileComments = lines.filter((l) => FILE_COMMENT.test(l)).length;
    const first = FILE_COMMENT.exec(lines[0] ?? "");
    if (!filename && first && fileComments === 1 && lines.length > 1) {
      filename = first[1];
      body = lines.slice(1).join("\n");
    }
    const meta = metaOf(this);
    meta.filename = filename;
    meta.lineCount = body.replace(/\n$/, "").split("\n").length;
    meta.output = PLAIN.has(lang) || /^(output|console|terminal)$/i.test(title ?? "");
    meta.shell = SHELL.has(lang);
    return body;
  },
  pre(node) {
    const meta = metaOf(this);
    if (meta.filename) node.properties["data-filename"] = meta.filename;
    if (meta.output) node.properties["data-kind"] = "output";
    else if (meta.shell) node.properties["data-kind"] = "shell";
    if (!meta.output && !meta.shell && (meta.lineCount ?? 0) > 8)
      node.properties["data-numbers"] = "";
  },
};

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
    note: { box: "callout-note", Icon: InfoIcon, label: "Note" },
    tip: { box: "callout-tip", Icon: LightbulbIcon, label: "Tip" },
    warning: { box: "callout-warning", Icon: AlertTriangleIcon, label: "Watch out" },
  }[type];
  return (
    <aside className={`callout not-prose ${config.box}`}>
      <span className="callout-icon" aria-hidden>
        <config.Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="callout-title">{title ?? config.label}</p>
        <div className="callout-body">{children}</div>
      </div>
    </aside>
  );
}

const LEVELS: Record<string, { label: string; tone: ChipTone }> = {
  easy: { label: "Easy", tone: "success" },
  medium: { label: "Medium", tone: "warning" },
  hard: { label: "Hard", tone: "danger" },
};

function Exercise({
  title,
  level,
  children,
}: {
  title: string;
  /** Optional difficulty: "easy", "medium" or "hard". */
  level?: string;
  children: React.ReactNode;
}) {
  const lvl = level ? LEVELS[level.toLowerCase()] : undefined;
  return (
    <section className="exercise not-prose">
      <header className="exercise-head">
        <span className="exercise-badge" aria-hidden>
          <PuzzleIcon className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="exercise-kicker kicker">Exercise</p>
          <h3 className="exercise-title">{title}</h3>
        </div>
        {lvl && (
          <span className="exercise-level">
            <Chip tone={lvl.tone}>{lvl.label}</Chip>
          </span>
        )}
      </header>
      <div className="exercise-body prose max-w-none">{children}</div>
    </section>
  );
}

function Solution({ children }: { children: React.ReactNode }) {
  return (
    <>
      <p className="solution-hint">Try it yourself first, then compare.</p>
      <details className="solution">
        <summary>
          <span className="solution-label when-closed">
            <LightbulbIcon className="size-4" />
            Show solution
          </span>
          <span className="solution-label when-open">
            <EyeIcon className="size-4" />
            Hide solution
          </span>
          <ChevronDownIcon className="chev size-4" />
        </summary>
        <div className="solution-body">{children}</div>
      </details>
    </>
  );
}

// remark-gfm renders task-list checkboxes as `disabled`; the "Ready to move on?"
// checklists are meant to be ticked (and are saved by ChecklistSync), so render them
// as plain uncontrolled inputs.
function TaskCheckbox({
  checked,
  disabled: _disabled,
  ...props
}: React.ComponentProps<"input">) {
  if (props.type !== "checkbox")
    return <input {...props} checked={checked} disabled={_disabled} />;
  return <input {...props} defaultChecked={checked} aria-label="Mark as understood" />;
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
                theme: siteTheme,
                keepBackground: false,
                transformers: [
                  codeMeta,
                  transformerNotationHighlight({ matchAlgorithm: "v3" }),
                  transformerNotationDiff({ matchAlgorithm: "v3" }),
                  transformerNotationFocus({ matchAlgorithm: "v3" }),
                  transformerNotationErrorLevel({ matchAlgorithm: "v3" }),
                ],
              },
            ],
          ],
        },
      }}
    />
  );
}
