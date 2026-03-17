import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("en", "metier")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-metier-page",
    locale: "en",
    path: "/daf-outsourcing/metier",
    fallbackTitle: "CFO Job Description | Iter Advisors",
    fallbackDescription: "CFO job description and role overview.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <DafSubPage locale="en" content={content} cmsNavigation={cmsNavigation} />;
}
