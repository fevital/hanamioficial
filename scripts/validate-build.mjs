import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import assert from "node:assert/strict";
const root = "dist", origin = "https://blog.aromashanami.com.br";
const plan = JSON.parse(await readFile("content-plan.json", "utf8"));
const partial = process.argv.includes("--partial");
const problems = [], titles = new Map(), canonicals = new Set(), structuredTypes = new Set();
let articlePages = 0, htmlPages = 0, localLinks = 0;
const verify = (condition, message) => { if (!condition) problems.push(message); };
async function exists(path) { try { await stat(path); return true; } catch { return false; } }
async function walk(path) { const items = await readdir(path, { withFileTypes: true }); return (await Promise.all(items.map(item => item.isDirectory() ? walk(join(path, item.name)) : [join(path, item.name)]))).flat(); }
const allFiles = await walk(root);
const builtFiles = new Set(allFiles.map(file => file.replaceAll("\\", "/")));
const expectedPlan = partial ? plan.filter(entry => builtFiles.has("dist/posts/" + entry.slug + "/index.html")) : plan;
for (const file of allFiles.filter(file => file.endsWith(".html"))) {
  const html = await readFile(file, "utf8");
  if (file.replaceAll("\\", "/") === "dist/about/index.html") { verify(html.includes("/sobre/"), "About redirect missing"); continue; }
  htmlPages++;
  verify(/<html[^>]*lang="pt-BR"/i.test(html), "Invalid language: " + file);
  verify((html.match(/<h1\b/g) ?? []).length === 1, "Expected one H1: " + file);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  verify(Boolean(title), "Missing title: " + file);
  verify(!titles.has(title), "Duplicate title: " + title);
  titles.set(title, file);
  verify(/<meta[^>]*name="description"[^>]*content="[^"]+"/.test(html), "Missing description: " + file);
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  verify(Boolean(canonical?.startsWith(origin + "/")), "Invalid canonical: " + file);
  verify(!canonicals.has(canonical), "Duplicate canonical: " + file);
  canonicals.add(canonical);
  verify((html.match(/property="og:type"/g) ?? []).length === 1, "Expected one Open Graph type: " + file);
  verify(!/AstroPaper|Sat Naing|astro-paper.pages.dev|github.com\/satnaing/i.test(html), "Original branding: " + file);
  for (const [, value] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const parsed = JSON.parse(value);
      for (const node of parsed["@graph"] ?? [parsed]) {
        const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
        for (const type of types) structuredTypes.add(type);
        if (types.includes("Article")) {
          articlePages++;
          verify(node.author?.name === "Glaeli Baldim" && node.author?.url === origin + "/autores/glaeli-baldim/", "Invalid author: " + file);
          verify(node.mainEntityOfPage?.["@id"] === canonical, "Article canonical mismatch: " + file);
        }
      }
    } catch { verify(false, "Invalid JSON-LD: " + file); }
  }
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:mailto:|tel:|data:|javascript:|#)/.test(raw)) continue;
    const url = new URL(raw.replaceAll("&amp;", "&"), canonical);
    if (url.origin !== origin) continue;
    const pathname = decodeURIComponent(url.pathname), disk = join(root, pathname.replace(/^\//, ""));
    const found = extname(pathname) ? await exists(disk) : await exists(join(disk, "index.html"));
    localLinks++;
    verify(found, "Broken local resource: " + file + " -> " + pathname);
  }
}
verify(articlePages === expectedPlan.length, "Expected " + expectedPlan.length + " Article pages, found " + articlePages);
for (const type of ["Organization", "WebSite", "Blog", "Article", "BreadcrumbList", "Person"]) verify(structuredTypes.has(type), "Missing JSON-LD type " + type);
const sitemap = (await Promise.all(allFiles.filter(file => /sitemap.*\.xml$/.test(file)).map(file => readFile(file, "utf8")))).join("\n");
const rss = await readFile("dist/rss.xml", "utf8"), robots = await readFile("dist/robots.txt", "utf8");
verify(robots.includes(origin + "/sitemap-index.xml"), "Robots sitemap mismatch");
verify((rss.match(/<item>/g) ?? []).length === expectedPlan.length, "Unexpected RSS item count");
for (const entry of expectedPlan) {
  verify(await exists("dist/posts/" + entry.slug + "/index.html"), "Missing article: " + entry.slug);
  verify(sitemap.includes(origin + "/posts/" + entry.slug + "/"), "Missing from sitemap: " + entry.slug);
  verify(rss.includes("/posts/" + entry.slug), "Missing from RSS: " + entry.slug);
}
verify(!sitemap.includes(origin + "/search/"), "Search in sitemap");
verify(await exists("dist/pagefind/pagefind.js"), "Missing Pagefind JS");
const searchManifest = JSON.parse(await readFile("dist/pagefind/pagefind-entry.json", "utf8"));
verify(searchManifest.languages?.["pt-br"]?.page_count === expectedPlan.length, "Unexpected Portuguese page count in Pagefind");
verify(allFiles.some(file => file.includes("pagefind") && file.endsWith(".pf_index")), "Missing Pagefind index");
verify(await exists("dist/hanami-og.png"), "Missing social image");
const summary = { partial, htmlPages, articlePages, checkedLocalLinks: localLinks, structuredTypes: [...structuredTypes], problems };
await writeFile("docs/build-validation.json", JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));
assert.equal(problems.length, 0, "Generated site verification failed.");
