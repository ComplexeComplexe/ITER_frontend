import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { getBlogArticleBySlug, getBlogArticles, getCmsNavigation, getTeamMembers, strapiMediaUrl } from "@/lib/strapi";
import { buildStrapiCollectionMetadata } from "@/lib/metadata";
import { blogPosts } from "@/lib/content/blog-posts";
import { getFallbackTeamMembers } from "@/lib/content/team";

const blogBasePath = "/recursos/blog";

const breadcrumbs = {
  resourcesLabel: "Recursos",
  resourcesHref: "/es/recursos",
  blogLabel: "Blog",
  blogHref: "/es/recursos/blog",
};

export async function generateStaticParams() {
  try {
    const articles = await getBlogArticles("es");
    if (articles.length > 0) {
      return articles
        .filter((a) => typeof a.slug === "string" && a.slug.length > 0)
        .map((a) => ({ slug: a.slug }));
    }
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
    path: `${blogBasePath}/${slug}`,
    fallbackTitle: fallback?.meta.title ?? `${slug} | Iter Advisors`,
    fallbackDescription: fallback?.meta.description ?? "",
    localizedPaths: {
      fr: `/ressources/blog/${slug}`,
      en: `/ressources/blog/${slug}`,
      es: `/recursos/blog/${slug}`,
    },
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, cmsNavigation] = await Promise.all([
    getBlogArticleBySlug(slug, "es"),
    getCmsNavigation("es"),
  ]);
  const fallback = blogPosts.es?.[slug];

  // Team members for E-E-A-T author enrichment (photo + role + LinkedIn).
  let teamMembers;
  try {
    teamMembers = await getTeamMembers("es");
  } catch {
    teamMembers = undefined;
  }
  const teamSource =
    teamMembers && teamMembers.length > 0 ? teamMembers : getFallbackTeamMembers("es");

  if (article) {
    return (
      <BlogPostPage
        locale="es"
        title={article.title}
        breadcrumbs={breadcrumbs}
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
        locale="es"
        title={fallback.h1}
        breadcrumbs={{ ...fallback.breadcrumbs, resourcesHref: "/es/recursos", blogHref: "/es/recursos/blog" }}
        content={fallback.htmlContent ? [] : fallback.content}
        htmlContent={fallback.htmlContent}
        cmsNavigation={cmsNavigation}
        publishedDate={fallback.publishedDate}
        author={fallback.author}
        category={fallback.category}
        metaDescription={fallback.meta.description}
        teamMembers={teamSource}
      />
    );
  }
  notFound();
}
