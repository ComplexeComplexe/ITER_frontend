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
  const member = getTeamMemberBySlug(slug, "es");
  if (!member) return { title: "Autor no encontrado | Iter Advisors" };
  const fullName = `${member.firstName} ${member.lastName}`;
  return buildMetadata({
    locale: "es",
    title: `${fullName} — ${member.role} | Iter Advisors`,
    description: member.bio.slice(0, 160),
    path: `/es/quienes-somos/${slug}`,
    localizedPaths: localizedPathsFor(slug),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug, "es");
  if (!member) notFound();

  const fullName = `${member.firstName} ${member.lastName}`;
  const posts = Object.entries(blogPosts.es ?? {})
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
    cmsNavigation = await getCmsNavigation("es");
  } catch {
    cmsNavigation = undefined;
  }

  return (
    <AuthorPage
      locale="es"
      member={member}
      articles={posts}
      cmsNavigation={cmsNavigation}
    />
  );
}
