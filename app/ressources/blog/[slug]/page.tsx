import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { getBlogArticleBySlug, getBlogArticles, getCmsNavigation, strapiMediaUrl, getTeamMembers } from "@/lib/strapi";
import { buildStrapiCollectionMetadata } from "@/lib/metadata";
import { blogPosts } from "@/lib/content/blog-posts";
import { BLOG_ILLUSTRATIONS } from "@/lib/blog-illustrations";
import { getLocalePath } from "@/lib/i18n";
import { getFallbackTeamMembers } from "@/lib/content/team";

const blogBasePath = "/ressources/blog";

// Ahrefs T-404 (2026-06-08) — these 4 fiscalité blog articles are FR-only
// (the EN/ES variants don't exist in lib/content/blog-posts.ts). Without
// `disableHreflang`, buildStrapiCollectionMetadata emits hreflang URLs that
// 404 (e.g. /en/ressources/blog/bareme-irpf-espagne-2026). We also rely on
// middleware FR_ONLY_BLOG_SLUGS to 301 any direct EN/ES hits.
const FR_ONLY_FISCALITE_BLOG_SLUGS = new Set([
  "bareme-irpf-espagne-2026",
  "modelo-720-declaration-biens-etranger",
  "double-imposition-france-espagne-convention",
  "loi-beckham-espagne-conditions-2026",
]);

const breadcrumbsByLocale = {
  fr: {
    resourcesLabel: "Ressources",
    resourcesHref: "/ressources",
    blogLabel: "Blog",
    blogHref: "/ressources/blog",
  },
  en: {
    resourcesLabel: "Resources",
    resourcesHref: "/en/ressources",
    blogLabel: "Blog",
    blogHref: "/en/ressources/blog",
  },
  es: {
    resourcesLabel: "Recursos",
    resourcesHref: "/es/recursos",
    blogLabel: "Blog",
    blogHref: "/es/recursos/blog",
  },
} as const;

export async function generateStaticParams() {
  try {
    const articles = await getBlogArticles("fr");
    if (articles.length > 0) {
      const strapiSlugs = articles.filter((a) => typeof a.slug === "string" && a.slug.length > 0).map((a) => ({ slug: a.slug }));
      const staticSlugs = Object.keys(blogPosts.fr || {}).map((slug) => ({ slug }));
      const allSlugs = new Map<string, { slug: string }>();
      for (const s of [...strapiSlugs, ...staticSlugs]) allSlugs.set(s.slug, s);
      return Array.from(allSlugs.values());
    }
  } catch {
    // ignore
  }
  return Object.keys(blogPosts.fr || {}).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug, "fr");
  const fallback = blogPosts.fr?.[slug];
  return buildStrapiCollectionMetadata({
    endpoint: "blog-articles",
    slug,
    locale: "fr",
    path: getLocalePath("fr", `${blogBasePath}/${slug}`),
    fallbackTitle: fallback?.meta.title ?? `${slug} | Iter Advisors`,
    fallbackDescription: fallback?.meta.description ?? "",
    // SEO-02: ES blog lives at /recursos/blog (different base from FR/EN)
    localizedPaths: {
      fr: `${blogBasePath}/${slug}`,
      en: `${blogBasePath}/${slug}`,
      es: `/recursos/blog/${slug}`,
    },
    // Ahrefs T-404: drop EN/ES hreflang on the 4 fiscalité FR-only articles
    // so Google stops requesting (and reporting) /en/* and /es/* URLs that 404.
    disableHreflang: FR_ONLY_FISCALITE_BLOG_SLUGS.has(slug) ? ["en", "es"] : undefined,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug, "fr");
  const fallback = blogPosts.fr?.[slug];
  const cmsNavigation = await getCmsNavigation("fr");

  // Fetch team members for author bio display (DEV-02)
  let teamMembers;
  try {
    teamMembers = await getTeamMembers("fr");
  } catch {
    teamMembers = undefined;
  }
  const teamSource = teamMembers && teamMembers.length > 0 ? teamMembers : getFallbackTeamMembers("fr");

  if (article) {
    return (
      <BlogPostPage
        locale="fr"
        title={article.title}
        breadcrumbs={breadcrumbsByLocale.fr}
        blocks={article.content}
        cmsNavigation={cmsNavigation}
        slug={article.slug}
        publishedDate={article.publishedDate}
        metaDescription={article.excerpt}
        featuredImageUrl={article.featuredImage ? strapiMediaUrl(article.featuredImage) : undefined}
        teamMembers={teamSource}
      />
    );
  }
  if (fallback) {
    return (
      <BlogPostPage
        locale="fr"
        title={fallback.h1}
        breadcrumbs={fallback.breadcrumbs}
        content={fallback.htmlContent ? [] : fallback.content}
        htmlContent={fallback.htmlContent}
        cmsNavigation={cmsNavigation}
        publishedDate={fallback.publishedDate}
        updatedDate={fallback.updatedDate}
        author={fallback.author}
        category={fallback.category}
        metaDescription={fallback.meta.description}
        slug={slug}
        teamMembers={teamSource}
        bodyImage={BLOG_ILLUSTRATIONS[slug]}
      />
    );
  }
  notFound();
}
