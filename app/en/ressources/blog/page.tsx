import { Metadata } from "next";
import BlogListingPage from "@/components/pages/BlogListingPage";
import { getBlogArticles, getCmsNavigation } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";
import { getStaticBlogListing } from "@/lib/blog-listing";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Finance Blog | Iter Advisors",
  description: "Finance blog: articles on corporate finance, financial management, fractional CFO services, fundraising strategy. Expert tips and guides for SMEs, startups.",
  path: "/ressources/blog",
});

export default async function Page() {
  const staticArticles = getStaticBlogListing("en");
  let articles = staticArticles;
  try {
    const strapiArticles = await getBlogArticles("en");
    if (strapiArticles && strapiArticles.length > 0) {
      const known = new Set(staticArticles.map((a) => a.slug));
      articles = [...staticArticles, ...strapiArticles.filter((a) => !known.has(a.slug))];
    }
  } catch {
    /* Strapi disabled — static list is fine. */
  }

  let cmsNavigation;
  try {
    cmsNavigation = await getCmsNavigation("en");
  } catch {
    cmsNavigation = undefined;
  }

  return <BlogListingPage locale="en" articles={articles} cmsNavigation={cmsNavigation} />;
}
