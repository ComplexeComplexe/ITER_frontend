import { Metadata } from "next";
import BlogListingPage from "@/components/pages/BlogListingPage";
import { getBlogArticles, getCmsNavigation } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Finance Blog | Iter Advisors",
  description: "Finance blog: articles on corporate finance, financial management, fractional CFO services, fundraising strategy. Expert tips and guides for SMEs, startups.",
  path: "/ressources/blog",
});

export default async function Page() {
  const [articles, cmsNavigation] = await Promise.all([
    getBlogArticles("en"),
    getCmsNavigation("en"),
  ]);
  return <BlogListingPage locale="en" articles={articles} cmsNavigation={cmsNavigation} />;
}
