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
    resourcesHref: "/es/ressources",
    blogLabel: "Blog",
    blogHref: "/es/ressources/blog",
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
