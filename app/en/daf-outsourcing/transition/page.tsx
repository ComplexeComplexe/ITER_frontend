import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("en", "transition")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-transition-page",
    locale: "en",
    path: "/daf-outsourcing/transition",
    localizedPaths: { fr: "/daf-externalise/transition", en: "/daf-outsourcing/transition", es: "/externalizacion-daf/transition" },
    fallbackTitle: "Transition CFO | Iter Advisors",
    fallbackDescription: "Transition CFO to support your changes.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <DafSubPage locale="en" content={content} cmsNavigation={cmsNavigation} />;
}
