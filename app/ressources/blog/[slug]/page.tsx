import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { getBlogArticleBySlug, getBlogArticles, getCmsNavigation } from "@/lib/strapi";
import { buildStrapiCollectionMetadata } from "@/lib/metadata";
import { blogPosts } from "@/lib/content/blog-posts";
import { getLocalePath } from "@/lib/i18n";

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
    if (articles.length > 0) return articles.map((a) => ({ slug: a.slug }));
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
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getBlogArticleBySlug(slug, "fr");
  const fallback = blogPosts.fr?.[slug];
  const cmsNavigation = await getCmsNavigation("fr");

  if (article) {
    return (
      <BlogPostPage
        locale="fr"
        title={article.title}
        breadcrumbs={breadcrumbsByLocale.fr}
        blocks={article.content}
        cmsNavigation={cmsNavigation}
      />
    );
  }
  if (fallback) {
    return (
      <BlogPostPage
        locale="fr"
        title={fallback.h1}
        breadcrumbs={fallback.breadcrumbs}
        content={fallback.content}
        cmsNavigation={cmsNavigation}
      />
    );
  }
  notFound();
}
