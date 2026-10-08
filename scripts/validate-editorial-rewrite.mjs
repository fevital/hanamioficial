import { readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { parseFrontmatter } from "@astrojs/markdown-remark";

const baseline = JSON.parse(await readFile("docs/editorial/baseline.json", "utf8"));
const plan = JSON.parse(await readFile("content-plan.json", "utf8"));
const sourceCatalog = JSON.parse(await readFile("docs/editorial/sources.json", "utf8"));
const files = (await readdir("src/content/posts")).filter(file => file.endsWith(".md"));
const hash = text => createHash("sha256").update(text.replace(/\s+/g, " ").trim()).digest("hex");
const problems = [];
const articles = [];
for (const before of baseline) {
  const file = before.slug + ".md";
  if (!files.includes(file)) { problems.push("Missing original URL: " + before.slug); continue; }
  const { frontmatter, content } = parseFrontmatter(await readFile("src/content/posts/" + file, "utf8"));
  const entry = plan.find(item => item.slug === before.slug);
  const bodyHash = hash(content);
  if (!before.bodySha256) problems.push("Missing original body digest: " + before.slug);
  if (bodyHash === before.bodySha256) problems.push("Unchanged body: " + before.slug);
  if (frontmatter.title !== before.title) problems.push("Changed original title: " + before.slug);
  if (frontmatter.group !== before.group) problems.push("Changed original group: " + before.slug);
  if (!entry || entry.description !== frontmatter.description) problems.push("Description differs from plan: " + before.slug);
  const rootBacklink = /\]\(https:\/\/www\.aromashanami\.com\.br\/?\)/.test(content);
  if (!rootBacklink) problems.push("Missing main shop backlink: " + before.slug);
  if (frontmatter.editorialNotes) problems.push("Unresolved public editorial note: " + before.slug);
  const sources = Object.entries(sourceCatalog).filter(([, source]) => content.includes(source.url)).map(([key]) => key);
  articles.push({ slug: before.slug, originalTitlePreserved: frontmatter.title === before.title, bodyChanged: bodyHash !== before.bodySha256, rootBacklink, sources });
}
if (files.length !== plan.length || baseline.length !== 200 || plan.length < baseline.length) problems.push("Expected 200 original baseline entries and matching current files and plans");
const report = {
  reviewedOn: "2026-10-08",
  articles: articles.length,
  rewrittenBodies: articles.filter(item => item.bodyChanged).length,
  preservedTitles: articles.filter(item => item.originalTitlePreserved).length,
  shopBacklinks: articles.filter(item => item.rootBacklink).length,
  sourceCatalogEntries: Object.keys(sourceCatalog).length,
  articlesWithReferences: articles.filter(item => item.sources.length).length,
  problems,
  details: articles,
};
await writeFile("docs/editorial/rewrite-validation.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ ...report, details: undefined }, null, 2));
assert.equal(problems.length, 0, "Editorial rewrite verification failed");
