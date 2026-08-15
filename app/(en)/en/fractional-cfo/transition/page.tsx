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
    path: "/fractional-cfo/transition",
    localizedPaths: {
      fr: "/daf-externalise/transition",
      en: "/fractional-cfo/transition",
      // A1 (W31c 2026-08-02) — cible ES renommée transition → transicion.
      es: "/externalizacion-daf/transicion",
    },
    fallbackTitle: "Interim CFO for PE-Backed SMEs in 10 Days",
    fallbackDescription: "Interim CFO ready within 7 to 10 days for SME/mid-cap CFO gaps, cash crises, restructurings, fundraises or M&A. €8,000-12,000/month. 85+ clients, 5/5 Trustfolio.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <DafSubPage locale="en" content={content} cmsNavigation={cmsNavigation} />;
}
