import { Metadata } from "next";
import { notFound } from "next/navigation";
import AuthorPage from "@/components/pages/AuthorPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import {
  getAuthorSlugs,
  getTeamMemberBySlug,
} from "@/lib/content/team";
import { blogPosts } from "@/lib/content/blog-posts";

/* ─── Author page route — FR canonical ───────────────────────────────
 *
 * SEO contract:
 *  - Each slug emits one canonical URL with its locale variant declared
 *    via hreflang (buildMetadata handles this via localizedPaths).
 *  - Pages are statically generated from the bio-having slug list
 *    (`getAuthorSlugs`), so unknown slugs return 404 — no soft-404 risk.
 *  - The Person JSON-LD is emitted inside <AuthorPage>; this route just
 *    wires the data.
 */
export async function generateStaticParams() {
  return getAuthorSlugs().map((slug) => ({ slug }));
}

function localizedPathsFor(slug: string) {
  return {
    fr: `/a-propos/${slug}`,
    // A1 (W31c 2026-08-02) — /en/a-propos/* 301 vers /en/about/* depuis
    // l'audit multilingue ; app/sitemap.ts émettait déjà /about, le
    // hreflang de cette page était resté sur l'ancienne cible.
    en: `/en/about/${slug}`,
    es: `/es/quienes-somos/${slug}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug, "fr");
  if (!member) return { title: "Auteur introuvable | Iter Advisors" };
  const fullName = `${member.firstName} ${member.lastName}`;
  return buildMetadata({
    locale: "fr",
    title: `${fullName} — ${member.role} | Iter Advisors`,
    description: member.bio.slice(0, 160),
    path: `/a-propos/${slug}`,
    localizedPaths: localizedPathsFor(slug),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug, "fr");
  if (!member) notFound();

  // Articles authored by this member, in the current locale.
  const fullName = `${member.firstName} ${member.lastName}`;
  const posts = Object.entries(blogPosts.fr ?? {})
    .filter(([, post]) => (post.author ?? "").toLowerCase() === fullName.toLowerCase())
    .map(([articleSlug, post]) => ({
      title: post.h1 ?? articleSlug,
      slug: articleSlug,
      publishedDate: post.publishedDate,
      excerpt: post.meta?.description,
      category: post.category ?? null,
    }))
    .sort((a, b) => {
      if (!a.publishedDate && !b.publishedDate) return 0;
      if (!a.publishedDate) return 1;
      if (!b.publishedDate) return -1;
      return b.publishedDate.localeCompare(a.publishedDate);
    });

  let cmsNavigation;
  try {
    cmsNavigation = await getCmsNavigation("fr");
  } catch {
    cmsNavigation = undefined;
  }

  return (
    <AuthorPage
      locale="fr"
      member={member}
      articles={posts}
      cmsNavigation={cmsNavigation}
    />
  );
}
