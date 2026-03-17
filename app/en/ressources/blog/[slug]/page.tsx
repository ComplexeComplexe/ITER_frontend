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
    const articles = await getBlogArticles("en");
    if (articles.length > 0) return articles.map((a) => ({ slug: a.slug }));
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
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, fallback, cmsNavigation] = await Promise.all([
    getBlogArticleBySlug(slug, "en"),
    Promise.resolve(blogPosts.en?.[slug]),
    getCmsNavigation("en"),
  ]);

  if (article) {
    return (
      <BlogPostPage
        locale="en"
        title={article.title}
        breadcrumbs={breadcrumbsByLocale.en}
        blocks={article.content}
        cmsNavigation={cmsNavigation}
      />
    );
  }
  if (fallback) {
    return (
      <BlogPostPage
        locale="en"
        title={fallback.h1}
        breadcrumbs={fallback.breadcrumbs}
        content={fallback.content}
        cmsNavigation={cmsNavigation}
      />
    );
  }
  notFound();
}
