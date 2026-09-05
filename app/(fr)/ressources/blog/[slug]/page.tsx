import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { getBlogArticleBySlug, getBlogArticles, getCmsNavigation, strapiMediaUrl, getTeamMembers } from "@/lib/static-content";
import { buildStrapiCollectionMetadata } from "@/lib/metadata";
import { blogPosts } from "@/lib/content/blog-posts";
import { blogHreflangDisabled } from "@/lib/blog-hreflang";
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
  // B-01 (2026-08-02) — "loi-beckham-espagne-conditions-2026" retiré : le
  // slug n'existe plus dans blog-posts.ts et l'URL part en 301.
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
    // SEO-AUD-0824 §2 — les trois langues étaient déclarées pour tout article,
    // y compris ceux qui n'existent que dans une seule : les URL « traduites »
    // redirigeaient alors vers la version d'origine. Une redirection n'est pas
    // une traduction. La liste des langues réellement absentes se déduit du
    // contenu (voir lib/blog-hreflang.ts).
    disableHreflang: blogHreflangDisabled(slug),
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
