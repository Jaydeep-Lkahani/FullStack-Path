import fs from "node:fs";
import path from "node:path";
import { codeToHtml, createCssVariablesTheme, type ShikiTransformer } from "shiki";

/**
 * The home page's code sample: the "classic loop trap" from the Scope, Hoisting & Closures
 * lesson, read from the lesson's own MDX at build time, so the home page always shows the
 * lesson's real code. The answer comments (`// prints …`) are left out so the reader can
 * predict the output before running it.
 */
export const LOOP_TRAP_LESSON = {
  module: "javascript-core",
  slug: "scope-hoisting-closures",
  section: "The classic loop trap",
};

export interface CodeSample {
  /** "var" or "let": the keyword that changes between the two versions */
  id: "var" | "let";
  code: string;
  html: string;
  /** The lesson's first sentence after the block, as HTML (inline code and bold only). */
  why: string;
}

const escape = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** First sentence of a markdown paragraph, with `code` and **bold** kept. */
function firstSentence(markdown: string) {
  const sentence = /^[\s\S]*?[.!?](?=\s|$)/.exec(markdown.trim())?.[0] ?? markdown.trim();
  return escape(sentence)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

const theme = createCssVariablesTheme({
  name: "fullstack-path",
  variablePrefix: "--shiki-",
  fontStyle: true,
});

/** Marks the `var` / `let` keyword on the first line so the page can point at it. */
const markKeyword = (word: string): ShikiTransformer => ({
  name: "fullstack-path:mark-keyword",
  span(node, line) {
    const text = node.children[0];
    if (line === 1 && text?.type === "text" && text.value === word) {
      node.properties["data-swap"] = "";
    }
  },
});

export async function getLoopTrap(): Promise<CodeSample[]> {
  const file = path.join(
    process.cwd(),
    "content",
    LOOP_TRAP_LESSON.module,
    `${LOOP_TRAP_LESSON.slug}.mdx`,
  );
  const source = fs.readFileSync(file, "utf8");
  const start = source.indexOf(`## ${LOOP_TRAP_LESSON.section}`);
  if (start < 0) throw new Error(`"${LOOP_TRAP_LESSON.section}" not found in ${file}`);
  const next = source.indexOf("\n## ", start + 4);
  const section = source.slice(start, next < 0 ? undefined : next);

  const blocks = [...section.matchAll(/```js\n([\s\S]*?)```\n+([^\n]+)/g)]
    .map((m) => ({ code: m[1], after: m[2] }))
    .slice(0, 2);
  if (blocks.length < 2)
    throw new Error(`Expected two js blocks in "${LOOP_TRAP_LESSON.section}"`);

  return Promise.all(
    blocks.map(async (block, i) => {
      const id = i === 0 ? "var" : "let";
      const code = block.code
        .split("\n")
        .filter((l) => !/^\s*\/\/\s*prints\b/i.test(l))
        .join("\n")
        .trim();
      const html = await codeToHtml(code, {
        lang: "js",
        theme,
        transformers: [markKeyword(id)],
      });
      return { id, code, html, why: firstSentence(block.after) } satisfies CodeSample;
    }),
  );
}
