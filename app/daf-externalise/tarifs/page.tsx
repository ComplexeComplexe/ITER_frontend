import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";
import { buildDafSubFaqSchema, buildDafSubBreadcrumbSchema } from "@/lib/daf-sub-schema";

const content = getDafSubContent("fr", "tarifs")!;
const PAGE_URL = "https://www.iteradvisors.com/daf-externalise/tarifs";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-tarifs-page",
    locale: "fr",
    path: "/daf-externalise/tarifs",
    localizedPaths: { fr: "/daf-externalise/tarifs", en: "/en/fractional-cfo", es: "/es/externalizacion-daf/tarifas" },
    // T#2 (2026-07-13) — fallback aligné sur content lib (fourchette
    // 2 000-8 000 €/mois dans le title pour rich snippets).
    fallbackTitle: content.meta.title,
    fallbackDescription: content.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  // T#3 (2026-07-13) — FAQPage + BreadcrumbList JSON-LD via helper.
  const faqSchema = buildDafSubFaqSchema(content);
  const breadcrumbSchema = buildDafSubBreadcrumbSchema(content, PAGE_URL);
  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DafSubPage
      locale="fr"
      content={content}
      cmsNavigation={cmsNavigation}
      heroImage={{
        src: "/images/illustrations/pricing-roi-tablet.svg",
        alt: "Analyse de retour sur investissement : un dirigeant compare les formules tarifaires DAF Iter Advisors sur sa tablette",
      }}
      />
    </>
  );
}
