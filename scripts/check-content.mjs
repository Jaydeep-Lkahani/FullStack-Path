// Validates lesson frontmatter: required fields, string takeaways, unique order per module.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "content");
let errors = 0;
const fail = (file, msg) => {
  console.error(`✗ ${file}: ${msg}`);
  errors++;
};

for (const mod of fs.readdirSync(root)) {
  const dir = path.join(root, mod);
  if (!fs.statSync(dir).isDirectory()) continue;
  const orders = new Set();
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
    const id = `${mod}/${f}`;
    const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
    if (typeof data.title !== "string") fail(id, "title must be a string");
    if (typeof data.summary !== "string")
      fail(id, "summary must be a string (quote it if it contains a colon)");
    if (typeof data.order !== "number") fail(id, "order must be a number");
    if (orders.has(data.order)) fail(id, `duplicate order ${data.order}`);
    orders.add(data.order);
    for (const t of data.takeaways ?? [])
      if (typeof t !== "string")
        fail(id, `takeaway is not a string: ${JSON.stringify(t)}`);
    for (const v of data.videos ?? [])
      for (const k of ["title", "channel", "duration", "url"])
        if (!v[k]) fail(id, `video missing ${k}`);
    (data.quiz ?? []).forEach((q, i) => {
      const at = `quiz[${i}]`;
      if (typeof q?.question !== "string" || !q.question)
        fail(id, `${at} needs a string question`);
      if (
        !Array.isArray(q?.options) ||
        q.options.length < 2 ||
        !q.options.every((o) => typeof o === "string")
      )
        fail(
          id,
          `${at} needs at least 2 string options (quote options containing colons)`,
        );
      else if (
        !Number.isInteger(q.answer) ||
        q.answer < 0 ||
        q.answer >= q.options.length
      )
        fail(id, `${at} answer must be an index between 0 and ${q.options.length - 1}`);
      if (typeof q?.explanation !== "string" || !q.explanation)
        fail(id, `${at} needs a string explanation`);
    });
    for (const d of data.docs ?? []) {
      if (typeof d?.title !== "string" || !d.title)
        fail(id, "docs entry needs a string title");
      if (typeof d?.url !== "string" || !/^https?:\/\//.test(d.url))
        fail(id, `docs entry needs an http(s) url: ${JSON.stringify(d)}`);
    }
  }
}
if (errors) process.exit(1);
console.log("content OK");
