import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/static-content";

const content = getDafSubContent("en", "metier")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-metier-page",
    locale: "en",
    path: "/fractional-cfo/metier",
    localizedPaths: {
      fr: "/daf-externalise/metier",
      en: "/fractional-cfo/metier",
      es: "/externalizacion-daf/metier",
    },
    fallbackTitle: "CFO Role, Responsibilities and Salary 2026",
    fallbackDescription: "Complete CFO (Chief Financial Officer) job description: role, missions, key skills, salary and career path in 2026. Written by senior finance leaders.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <DafSubPage locale="en" content={content} cmsNavigation={cmsNavigation} />;
}
