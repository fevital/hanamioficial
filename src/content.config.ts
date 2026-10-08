import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      authorSlug: z.literal("glaeli-baldim").default("glaeli-baldim"),
      category: z.enum([
        "aromas-para-casa",
        "difusores",
        "sprays-de-ambiente",
        "agua-de-lencois",
        "fragrancias",
        "guias",
        "pomar-de-minas",
        "hanami",
      ]),
      group: z.string().optional(),
      fragrance: z
        .enum(["figo", "pitanga", "jabuticaba", "laranja-lima"])
        .optional(),
      guide: z.boolean().default(false),
      heroImage: z
        .string()
        .regex(/^\/images\/blog\//)
        .or(image())
        .optional(),
      heroImageAlt: z.string().optional(),
      editorialNotes: z.string().optional(),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["Casa"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

export const collections = { posts, pages };
