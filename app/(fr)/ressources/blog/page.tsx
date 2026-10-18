import { Metadata } from "next";
import BlogListingPage from "@/components/pages/BlogListingPage";
import { getBlogArticles, getCmsNavigation } from "@/lib/static-content";
import { buildMetadata } from "@/lib/metadata";
import { getStaticBlogListing } from "@/lib/blog-listing";

// SEO-14 (2026-07-13) — localizedPaths ajouté. Sans ça, hreflang par
// défaut émet /es/ressources/blog qui redirect 308 vers /es/recursos/blog
// (le blog ES utilise /recursos, pas /ressources). Google traite les
// hreflang vers URLs 3xx comme signal négatif.
export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Blog finance d'entreprise & DAF externalisé | Iter Advisors",
  description: "Blog finance et DAF externalisé : articles, guides et tendances. Stratégie financière, levée de fonds, outils. Conseils d'experts pour PME.",
  path: "/ressources/blog",
  localizedPaths: {
    fr: "/ressources/blog",
    en: "/ressources/blog",
    es: "/recursos/blog",
  },
});

// HYGIENE-2 (2026-10-18) — cette page lisait `searchParams` pour renvoyer
// une 404 sur `?page=` : c'était la seule raison pour laquelle les trois
// listings blog (FR, et EN/ES qui rendent ce même composant via
// LocalizedEditorialPage) restaient dynamiques — `private, no-cache,
// no-store`, x-vercel-cache MISS, TTFB 0,3–0,9 s contre 0,2–0,27 s sur les
// pages statiques. Le paramètre `?page=` est désormais traité par proxy.ts
// (301 vers l'URL propre) et la page est prérendue comme les autres.
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
