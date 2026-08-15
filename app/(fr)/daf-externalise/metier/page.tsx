import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";
import { buildDafSubFaqSchema } from "@/lib/daf-sub-schema";

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
  // T#3 (2026-07-13) — FAQPage JSON-LD via helper.
  const faqSchema = buildDafSubFaqSchema(content);
  // SEO-005 (2026-08-09) — BreadcrumbList manuel retiré. Le composant
  // <Breadcrumb> rendu par DafSubPage émet déjà le sien, construit
  // depuis le pathname réel : les deux coexistaient et la page servait
  // deux fils d'Ariane identiques à un libellé près. Même correctif que
  // sur les pages fiscalité et /ressources/outils/malibou.
  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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
