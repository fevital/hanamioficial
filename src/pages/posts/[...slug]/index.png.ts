import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import sharp from "sharp";
import { getPostSlug } from "@/utils/getPostPaths";
import { getSortedPosts } from "@/utils/getSortedPosts";
import config from "@/config";

// Disabled for the Hostinger build. If enabled later, uses local fonts only.
export async function getStaticPaths() {
  if (!config.features.dynamicOgImage) return [];
  return getSortedPosts(await getCollection("posts"))
    .filter(post => !post.data.ogImage)
    .map(post => ({
      params: { slug: getPostSlug(post.id, post.filePath) },
      props: { title: post.data.title },
    }));
}
const escapeXml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    character =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!
  );
export const GET: APIRoute = async ({ props }) => {
  if (!config.features.dynamicOgImage)
    return new Response(null, { status: 404 });
  const words = String(props.title).split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).length > 34 && line) {
      lines.push(line);
      line = word;
    } else line = line ? line + " " + word : word;
  }
  if (line) lines.push(line);
  const text = lines
    .slice(0, 5)
    .map(
      (value, index) =>
        '<text x="85" y="' +
        (280 + index * 57) +
        '" font-family="Georgia,serif" font-size="46" fill="#342F2A">' +
        escapeXml(value) +
        "</text>"
    )
    .join("");
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#FAF8F4"/><rect x="30" y="30" width="1140" height="570" fill="none" stroke="#E5DED3"/><text x="85" y="130" font-family="Georgia,serif" font-size="44" letter-spacing="10" fill="#817464">HANAMI JOURNAL</text>' +
    text +
    "</svg>";
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
