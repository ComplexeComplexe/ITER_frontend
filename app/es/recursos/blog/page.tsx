import { Metadata } from "next";
import BlogListingPage from "@/components/pages/BlogListingPage";
import { getBlogArticles, getCmsNavigation } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";
import { getStaticBlogListing } from "@/lib/blog-listing";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Blog Finanzas | Iter Advisors",
  description:
    "Blog de finanzas para pymes y startups. Artículos sobre CFO externalizado, tesorería, levantamiento de capital. Consejos y tendencias 2026.",
  path: "/es/recursos/blog", // SEO-07: self-canonical
});

export default async function Page() {
  const staticArticles = getStaticBlogListing("es");
  let articles = staticArticles;
  try {
    const strapiArticles = await getBlogArticles("es");
    if (strapiArticles && strapiArticles.length > 0) {
      const known = new Set(staticArticles.map((a) => a.slug));
      articles = [...staticArticles, ...strapiArticles.filter((a) => !known.has(a.slug))];
    }
  } catch {
    /* Strapi disabled — static list is fine. */
  }

  let cmsNavigation;
  try {
    cmsNavigation = await getCmsNavigation("es");
  } catch {
    cmsNavigation = undefined;
  }

  return <BlogListingPage locale="es" articles={articles} cmsNavigation={cmsNavigation} />;
}
