import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/static-content";

const content = getDafSubContent("en", "shared-time")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-temps-partage-page",
    locale: "en",
    path: "/fractional-cfo/shared-time",
    localizedPaths: {
      fr: "/daf-externalise/temps-partage",
      en: "/fractional-cfo/shared-time",
      es: "/externalizacion-daf/tiempo-compartido",
    },
    fallbackTitle: "Fractional CFO: shared-time finance | Iter Advisors",
    fallbackDescription: "Fractional CFO for startups and SMEs: indicative involvement of 1 to 8 days a month, agreed scope and monthly fees. Expected start in 8 to 15 days.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <DafSubPage locale="en" content={content} cmsNavigation={cmsNavigation} />;
}
