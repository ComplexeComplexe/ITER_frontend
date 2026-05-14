import { Metadata } from "next";
import BlogListingPage from "@/components/pages/BlogListingPage";
import { getBlogArticles, getCmsNavigation } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";
import { getStaticBlogListing } from "@/lib/blog-listing";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Blog Finance & DAF externalisé — Conseils & Guides | Iter Advisors",
  description: "Blog finance et DAF externalisé : articles, guides et tendances. Stratégie financière, levée de fonds, outils. Conseils d'experts pour PME.",
  path: "/ressources/blog",
});

export default async function Page() {
  // Source of truth is the static lib/content/blog-posts.ts (26 articles).
  // Strapi was previously the primary source but only ever returned a
  // 7-article subset, so the listing was silently truncated.
  const staticArticles = getStaticBlogListing("fr");
  // Best-effort: merge Strapi-only articles (if any) on top of the
  // static list so we don't lose articles that exist only in the CMS.
  let articles = staticArticles;
  try {
    const strapiArticles = await getBlogArticles("fr");
    if (strapiArticles && strapiArticles.length > 0) {
      const knownSlugs = new Set(staticArticles.map((a) => a.slug));
      const extras = strapiArticles.filter((a) => !knownSlugs.has(a.slug));
      articles = [...staticArticles, ...extras];
    }
  } catch {
    /* Strapi disabled or unreachable — static list is fine. */
  }

  let cmsNavigation;
  try {
    cmsNavigation = await getCmsNavigation("fr");
  } catch {
    cmsNavigation = undefined;
  }

  return <BlogListingPage locale="fr" articles={articles} cmsNavigation={cmsNavigation} />;
}
