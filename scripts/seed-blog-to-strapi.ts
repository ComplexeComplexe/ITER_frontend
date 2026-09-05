/**
 * Seed blog articles from frontend content (lib/content/blog-posts) into Strapi.
 * Creates articles in FR, EN and ES (one POST per locale per article).
 * Run: npm run seed:blog
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFiles() {
  const root = resolve(process.cwd());
  for (const name of [".env.local", ".env"]) {
    const path = resolve(root, name);
    if (existsSync(path)) {
      const content = readFileSync(path, "utf8");
      for (const line of content.split("\n")) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
        if (m && process.env[m[1]] === undefined) {
          process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
        }
      }
    }
  }
}
loadEnvFiles();

import { blogPosts } from "../lib/content/blog-posts";
import type { Locale } from "../lib/i18n";
import type { StrapiParagraphBlock, StrapiTextNode } from "../lib/static-content";

const rawStrapiUrl = process.env.STRAPI_API_URL || "http://localhost:1337";
const STRAPI_URL = rawStrapiUrl.replace(/\/admin\/?$/, "") || rawStrapiUrl;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

const LOCALES: Locale[] = ["fr", "en", "es"];
const STRAPI_LOCALE_MAP: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en",
  es: "es-ES",
};

function contentToBlocks(paragraphs: string[]): StrapiParagraphBlock[] {
  return paragraphs.map((text) => ({
    type: "paragraph" as const,
    children: [{ type: "text" as const, text }] as StrapiTextNode[],
  }));
}

async function createBlogArticle(
  locale: Locale,
  slug: string,
  data: { title: string; description: string; h1: string; content: string[] }
): Promise<void> {
  const strapiLocale = STRAPI_LOCALE_MAP[locale];
  const body = {
    data: {
      title: data.h1,
      slug,
      excerpt: data.content[0]?.slice(0, 160) || data.description,
      content: contentToBlocks(data.content),
      publishedDate: new Date().toISOString(),
      tableOfContents: false,
      category: "blog",
      seo: {
        metaTitle: data.title,
        metaDescription: data.description,
      },
    },
  };

  const url = `${STRAPI_URL.replace(/\/$/, "")}/api/blog-articles?locale=${encodeURIComponent(strapiLocale)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    const hint =
      res.status === 405
        ? " → Vérifiez dans Strapi : Settings → API Tokens → [votre token] → Permissions → Blog Article → cochez « create »."
        : "";
    throw new Error(`Strapi POST failed ${res.status}: ${text.slice(0, 200)}${hint}`);
  }

  const json = await res.json();
  console.log(`  ✅ [${locale}] ${slug} → documentId ${json.data?.documentId ?? json.data?.id ?? "ok"}`);
}

async function main() {
  if (!STRAPI_TOKEN) {
    console.error("Missing STRAPI_API_TOKEN. Set it in the environment.");
    process.exit(1);
  }
  console.log("Seeding blog articles (FR, EN, ES) to Strapi at", STRAPI_URL);

  for (const locale of LOCALES) {
    const posts = blogPosts[locale];
    if (!posts) {
      console.log(`\n[${locale}] (no posts in blog-posts.ts, skipping)`);
      continue;
    }
    const slugs = Object.keys(posts);
    console.log(`\n[${locale}] ${slugs.length} article(s)`);
    for (const slug of slugs) {
      const post = posts[slug];
      if (!post) continue;
      try {
        await createBlogArticle(locale, slug, {
          title: post.meta.title,
          description: post.meta.description,
          h1: post.h1,
          content: post.content,
        });
      } catch (e) {
        console.error(`  ❌ ${slug}:`, e);
      }
    }
  }
  console.log("\nDone.");
}

main();
