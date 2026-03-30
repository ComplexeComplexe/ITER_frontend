import { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content/legal";
import { getCmsNavigation } from "@/lib/strapi";

const content = getLegalContent("legal-notice");

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "legal-page",
    locale: "en",
    path: "/legal-notice",
    localizedPaths: { fr: "/mentions-legales", en: "/legal-notice", es: "/aviso-legal" },
    fallbackTitle: "Legal Notice | Iter Advisors",
    fallbackDescription: "Legal notice for the Iter Advisors website.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <LegalPage locale="en" content={content} cmsNavigation={cmsNavigation} />;
}
