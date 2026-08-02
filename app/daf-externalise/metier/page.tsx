import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";
import { buildDafSubFaqSchema, buildDafSubBreadcrumbSchema } from "@/lib/daf-sub-schema";

const content = getDafSubContent("fr", "metier")!;
const PAGE_URL = "https://www.iteradvisors.com/daf-externalise/metier";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-metier-page",
    locale: "fr",
    path: "/daf-externalise/metier",
    // A1/SEO-23 (W31c 2026-08-02) — les cibles EN/ES pointaient vers
    // /metier, renommé en /role (EN) et /funciones (ES) par l'audit
    // multilingue : le hreflang désignait donc des URLs qui 301.
    localizedPaths: { fr: "/daf-externalise/metier", en: "/en/fractional-cfo/role", es: "/es/externalizacion-daf/funciones" },
    fallbackTitle: "Fiche métier DAF | Iter Advisors",
    fallbackDescription: "Fiche métier du DAF (Directeur Administratif et Financier) : rôle, missions, compétences clés, salaire et évolution du poste en 2026.",
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
          src: "/images/stock/metier-daf.png",
          alt: "Fiche métier DAF — directeur administratif et financier consultant ses tableaux de bord sur tablette",
        }}
      />
    </>
  );
}
