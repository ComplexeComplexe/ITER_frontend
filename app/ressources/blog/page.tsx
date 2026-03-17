import { Metadata } from "next";
import BlogListingPage from "@/components/pages/BlogListingPage";
import { getBlogArticles, getCmsNavigation } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Blog | Iter Advisors",
  description: "Retrouvez tous nos articles sur la finance d'entreprise, le pilotage financier, la gestion de trésorerie et les levées de fonds.",
  path: "/ressources/blog",
});

export default async function Page() {
  const articles = await getBlogArticles("fr");
  const cmsNavigation = await getCmsNavigation("fr");
  return <BlogListingPage locale="fr" articles={articles} cmsNavigation={cmsNavigation} />;
}
