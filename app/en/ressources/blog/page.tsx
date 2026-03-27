import { Metadata } from "next";
import BlogListingPage from "@/components/pages/BlogListingPage";
import { getBlogArticles, getCmsNavigation } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Finance and outsourced CFO blog - Tips and insights | Iter Advisors",
  description: "Browse all our articles on corporate finance, financial management, cash management and fundraising.",
  path: "/ressources/blog",
});

export default async function Page() {
  const [articles, cmsNavigation] = await Promise.all([
    getBlogArticles("en"),
    getCmsNavigation("en"),
  ]);
  return <BlogListingPage locale="en" articles={articles} cmsNavigation={cmsNavigation} />;
}
