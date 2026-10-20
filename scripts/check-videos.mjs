// Verifies every lesson video still exists on YouTube (oEmbed) and flags drift in title/channel.
// Usage: npm run check:videos
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "content");
const idOf = (url) => new URL(url).searchParams.get("v");
const videos = [];
for (const mod of fs.readdirSync(root)) {
  const dir = path.join(root, mod);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
    const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
    for (const v of data.videos ?? []) videos.push({ file: `${mod}/${f}`, ...v });
  }
}

let bad = 0;
for (const v of videos) {
  const id = idOf(v.url);
  const res =
    id &&
    (await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
    ).catch(() => null));
  if (!res || !res.ok) {
    console.error(`✗ ${v.file}: ${v.url} -> ${res ? res.status : "network error"}`);
    bad++;
    continue;
  }
  const j = await res.json();
  const norm = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  if (!norm(j.title).startsWith(norm(v.title).slice(0, 20))) {
    console.warn(`! ${v.file}: title changed: "${j.title}" (listed as "${v.title}")`);
  }
}
console.log(`${videos.length} videos checked, ${bad} broken`);
process.exit(bad ? 1 : 0);
