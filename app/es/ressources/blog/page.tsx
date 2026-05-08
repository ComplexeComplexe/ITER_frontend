import { Metadata } from "next";
import BlogListingPage from "@/components/pages/BlogListingPage";
import { getBlogArticles, getCmsNavigation } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Blog Finanzas | Iter Advisors",
  description: "Blog de finanzas para pymes y startups. Artículos sobre CFO externalizado, tesorería, levantamiento de capital. Consejos y tendencias 2026.",
  path: "/ressources/blog",
});

export default async function Page() {
  const [articles, cmsNavigation] = await Promise.all([
    getBlogArticles("es"),
    getCmsNavigation("es"),
  ]);
  return (
    <BlogListingPage
      locale="es"
      articles={articles}
      cmsNavigation={cmsNavigation}
    />
  );
}
