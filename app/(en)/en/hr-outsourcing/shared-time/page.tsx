import { Metadata } from "next";
import DrhSubPage from "@/components/pages/DrhSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDrhSubContent } from "@/lib/content/drh-sub";
import { getCmsNavigation } from "@/lib/static-content";

const content = getDrhSubContent("en", "shared-time")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "drh-temps-partage-page",
    locale: "en",
    path: "/hr-outsourcing/shared-time",
    localizedPaths: { fr: "/drh-externalise/temps-partage", en: "/hr-outsourcing/shared-time", es: "/externalizacion-rrhh/tiempo-compartido" },
    fallbackTitle: "Fractional HR Director: 2-8 days/month | Iter Advisors",
    fallbackDescription: "Fractional HR Director for SMEs & startups: senior people leader 2 to 8 days a month. Recruitment, compliance, employee relations. Free 24h quote.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <DrhSubPage locale="en" content={content} cmsNavigation={cmsNavigation} />;
}
