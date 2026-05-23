import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { getBlogArticleBySlug, getBlogArticles, getCmsNavigation, getTeamMembers, strapiMediaUrl } from "@/lib/strapi";
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
    const articles = await getBlogArticles("en");
    if (articles.length > 0) return articles.filter((a) => typeof a.slug === "string" && a.slug.length > 0).map((a) => ({ slug: a.slug }));
  } catch {
    // ignore
  }
  return Object.keys(blogPosts.en || {}).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fallback = blogPosts.en?.[slug];
  return buildStrapiCollectionMetadata({
    endpoint: "blog-articles",
    slug,
    locale: "en",
    path: getLocalePath("en", `${blogBasePath}/${slug}`),
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
  const [article, fallback, cmsNavigation] = await Promise.all([
    getBlogArticleBySlug(slug, "en"),
    Promise.resolve(blogPosts.en?.[slug]),
    getCmsNavigation("en"),
  ]);

  // Team members are needed so BlogPostPage can render the named author's
  // photo + role + LinkedIn link (E-E-A-T enrichment).
  let teamMembers;
  try {
    teamMembers = await getTeamMembers("en");
  } catch {
    teamMembers = undefined;
  }
  const teamSource =
    teamMembers && teamMembers.length > 0 ? teamMembers : getFallbackTeamMembers("en");

  if (article) {
    return (
      <BlogPostPage
        locale="en"
        title={article.title}
        breadcrumbs={breadcrumbsByLocale.en}
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
        locale="en"
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
