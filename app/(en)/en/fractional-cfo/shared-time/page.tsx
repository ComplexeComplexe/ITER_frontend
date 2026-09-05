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
    fallbackTitle: "Fractional CFO, 2 to 8 days per month | Iter Advisors",
    fallbackDescription: "Fractional CFO for startups and SMEs: senior finance leader 2 to 8 days a month. 85+ companies served, €100M+ raised, 5/5 Trustfolio. Free 24h quote.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <DafSubPage locale="en" content={content} cmsNavigation={cmsNavigation} />;
}
