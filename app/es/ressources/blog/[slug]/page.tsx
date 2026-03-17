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
    const articles = await getBlogArticles("es");
    if (articles.length > 0) return articles.map((a) => ({ slug: a.slug }));
  } catch {
    // ignore
  }
  return Object.keys(blogPosts.es || {}).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fallback = blogPosts.es?.[slug];
  return buildStrapiCollectionMetadata({
    endpoint: "blog-articles",
    slug,
    locale: "es",
    path: getLocalePath("es", `${blogBasePath}/${slug}`),
    fallbackTitle: fallback?.meta.title ?? `${slug} | Iter Advisors`,
    fallbackDescription: fallback?.meta.description ?? "",
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, cmsNavigation] = await Promise.all([
    getBlogArticleBySlug(slug, "es"),
    getCmsNavigation("es"),
  ]);
  const fallback = blogPosts.es?.[slug];

  if (article) {
    return (
      <BlogPostPage
        locale="es"
        title={article.title}
        breadcrumbs={breadcrumbsByLocale.es}
        blocks={article.content}
        cmsNavigation={cmsNavigation}
      />
    );
  }
  if (fallback) {
    return (
      <BlogPostPage
        locale="es"
        title={fallback.h1}
        breadcrumbs={fallback.breadcrumbs}
        content={fallback.content}
        cmsNavigation={cmsNavigation}
      />
    );
  }
  notFound();
}
