import { readFile, readdir, writeFile } from "node:fs/promises";
import { parseFrontmatter } from "@astrojs/markdown-remark";
import assert from "node:assert/strict";
const partial = process.argv.includes("--partial");
const plan = JSON.parse(await readFile("content-plan.json", "utf8"));
const quotas = { "aromas-casa": 30, "difusor-aromas": 25, "difusor-varetas": 25, sprays: 25, "perfume-ambiente": 20, "agua-lencois": 20, "agua-tecidos": 15, fragrancias: 20, pomar: 10, marca: 10 };
const categories = ["aromas-para-casa", "difusores", "sprays-de-ambiente", "agua-de-lencois", "fragrancias", "guias", "pomar-de-minas", "hanami"];
const fragrances = ["figo", "pitanga", "jabuticaba", "laranja-lima"];
const knownPaths = new Set(["/", "/posts/", "/sobre/", "/autores/glaeli-baldim/", ...categories.map(slug => "/" + slug + "/"), ...fragrances.map(slug => "/fragrancias/" + slug + "/"), ...plan.map(item => "/posts/" + item.slug + "/")]);
const problems = [];
function verify(condition, message) { if (!condition) problems.push(message); }
verify(plan.length === 200, "Expected exactly 200 plans.");
for (const field of ["title", "slug", "primaryKeyword", "searchIntent"]) verify(new Set(plan.map(item => item[field].toLocaleLowerCase("pt-BR"))).size === plan.length, "Duplicate plan field: " + field);
for (const [group, count] of Object.entries(quotas)) verify(plan.filter(item => item.group === group).length === count, "Invalid quota: " + group);
for (const fragrance of fragrances) verify(plan.filter(item => item.fragrance === fragrance).length === 5, "Expected five plans for " + fragrance);
for (const item of plan) {
  for (const field of ["title", "slug", "primaryKeyword", "secondaryKeywords", "category", "searchIntent", "relatedProducts", "internalLinks"]) verify(Boolean(item[field]?.length), "Missing " + field + ": " + item.slug);
  for (const link of item.internalLinks) verify(knownPaths.has(link), "Unknown planned link " + link);
}
const files = (await readdir("src/content/posts")).filter(file => file.endsWith(".md"));
if (!partial) verify(files.length === 200, "Expected 200 Markdown files, found " + files.length);
const introductions = new Map(), paragraphs = new Map(), stats = [], nearDuplicatePairs = [];
for (const file of files) {
  const raw = await readFile("src/content/posts/" + file, "utf8");
  const { frontmatter: data, content } = parseFrontmatter(raw);
  const slug = file.slice(0, -3), entry = plan.find(item => item.slug === slug);
  verify(Boolean(entry), "Article missing from plan: " + slug);
  if (!entry) continue;
  for (const field of ["title", "category", "group"]) verify(data[field] === entry[field], field + " differs from plan: " + slug);
  verify(data.author === "Glaeli Baldim" && data.authorSlug === "glaeli-baldim", "Invalid author: " + slug);
  verify(!data.draft, "Unpublished draft: " + slug);
  verify(!Number.isNaN(new Date(data.pubDatetime).getTime()), "Invalid date: " + slug);
  verify(Boolean(data.description) && data.description !== data.title, "Missing specific description: " + slug);
  verify(!/[\p{L}]\?[\p{L}]|\uFFFD|Ã[£©ª³¡­º§µ]/u.test(raw), "Possible character corruption: " + slug);
  const body = content.trim(), intro = body.split(/\n\s*\n/)[0].trim();
  verify(!introductions.has(intro), "Repeated introduction: " + slug + " / " + introductions.get(intro));
  introductions.set(intro, slug);
  for (const paragraph of body.split(/\n\s*\n/)) {
    if (paragraph.length < 160 || paragraph.startsWith("#") || paragraph.includes("](")) continue;
    const normal = paragraph.trim().toLocaleLowerCase("pt-BR");
    verify(!paragraphs.has(normal), "Repeated paragraph: " + slug + " / " + paragraphs.get(normal));
    paragraphs.set(normal, slug);
  }
  const links = [...body.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)].map(match => match[1]);
  for (const link of links.filter(link => link.startsWith("/"))) verify(knownPaths.has(link.split("#")[0]), "Broken link: " + slug + " -> " + link);
  verify(links.includes("/" + data.category + "/"), "Missing category link: " + slug);
  verify(links.filter(link => link.startsWith("/posts/")).length >= 2, "Expected two article links: " + slug);
  verify(links.some(link => link.startsWith("https://www.aromashanami.com.br")), "Missing shop link: " + slug);
  verify(links.some(link => /^https:\/\/www\.aromashanami\.com\.br\/?$/.test(link)), "Missing contextual link to shop homepage: " + slug);
  const words = body.replace(/\]\([^)]*\)/g, "]").match(/[\p{L}\p{N}]+/gu) ?? [];
  verify(words.length >= 180, "Article too thin: " + slug);
  const tokens = words.map(word => word.toLocaleLowerCase("pt-BR"));
  const shingles = new Set(tokens.slice(0, -4).map((_, index) => tokens.slice(index, index + 5).join(" ")));
  stats.push({ slug, group: data.group, words: words.length, guide: Boolean(data.guide), editorialNote: Boolean(data.editorialNotes), shingles });
}
for (let a = 0; a < stats.length; a++) for (let b = a + 1; b < stats.length; b++) {
  const first = stats[a].shingles, second = stats[b].shingles;
  let shared = 0;
  for (const phrase of first) if (second.has(phrase)) shared++;
  const similarity = shared / Math.min(first.size, second.size);
  if (similarity > .2) nearDuplicatePairs.push({ first: stats[a].slug, second: stats[b].slug, sharedFiveWordFraction: +similarity.toFixed(3) });
}
verify(!nearDuplicatePairs.length, "Potential near-duplicate bodies: " + nearDuplicatePairs.length);
const wordCounts = stats.map(item => item.words).sort((a, b) => a - b);
const report = {
  expectedArticles: 200, createdArticles: files.length,
  groups: Object.fromEntries(Object.keys(quotas).map(group => [group, stats.filter(item => item.group === group).length])),
  totalWords: wordCounts.reduce((sum, words) => sum + words, 0),
  minimumWords: wordCounts[0] ?? 0, medianWords: wordCounts[Math.floor(wordCounts.length / 2)] ?? 0, maximumWords: wordCounts.at(-1) ?? 0,
  under400Words: stats.filter(item => item.words < 400).map(({ slug, words }) => ({ slug, words })),
  broadGuidesUnder800: stats.filter(item => item.guide && item.words < 800).map(({ slug, words }) => ({ slug, words })),
  editorialReviewNotes: stats.filter(item => item.editorialNote).map(item => item.slug),
  nearDuplicatePairs, problems, articles: stats.map(({ shingles, ...item }) => item),
};
await writeFile("docs/content-validation.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ articles: files.length, words: report.totalWords, medianWords: report.medianWords, shortArticles: report.under400Words.length, problems: problems.length, nearDuplicatePairs }, null, 2));
if (problems.length) console.error(problems.join("\n"));
assert.equal(problems.length, 0, "Content verification failed.");
