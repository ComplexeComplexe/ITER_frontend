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

export async function generateStaticParams() {
  return getAuthorSlugs().map((slug) => ({ slug }));
}

function localizedPathsFor(slug: string) {
  return {
    fr: `/a-propos/${slug}`,
    en: `/en/a-propos/${slug}`,
    es: `/es/quienes-somos/${slug}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug, "en");
  if (!member) return { title: "Author not found | Iter Advisors" };
  const fullName = `${member.firstName} ${member.lastName}`;
  return buildMetadata({
    locale: "en",
    // SEO-REP §7 (2026-08-15) — le gabarit reprenait le rôle complet
    // (« Associé fondateur - CFO & Investisseur »), ce qui poussait tous les
    // titles de fiches équipe à 63-71 caractères. Le rôle reste dans le H1 et
    // le corps ; le title garde le nom, qui est la requête réelle.
    title: `${fullName} | Iter Advisors`,
    description: member.bio.slice(0, 160),
    path: `/en/a-propos/${slug}`,
    localizedPaths: localizedPathsFor(slug),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug, "en");
  if (!member) notFound();

  const fullName = `${member.firstName} ${member.lastName}`;
  const posts = Object.entries(blogPosts.en ?? {})
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
    cmsNavigation = await getCmsNavigation("en");
  } catch {
    cmsNavigation = undefined;
  }

  return (
    <AuthorPage
      locale="en"
      member={member}
      articles={posts}
      cmsNavigation={cmsNavigation}
    />
  );
}
