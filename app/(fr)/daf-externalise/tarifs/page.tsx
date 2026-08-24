import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";
import { buildDafSubFaqSchema } from "@/lib/daf-sub-schema";

const content = getDafSubContent("fr", "tarifs")!;
const PAGE_URL = "https://www.iteradvisors.com/daf-externalise/tarifs";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-tarifs-page",
    locale: "fr",
    path: "/daf-externalise/tarifs",
    // SEO-AUD-0824 §2 — cette page n'a pas d'équivalent en EN ni en ES. Elle
    // désignait la page pilier de ces langues comme sa traduction, mais celle-ci
    // renvoie vers /daf-externalise, pas ici : le groupe hreflang ne bouclait
    // pas. Plutôt que de revendiquer une traduction qui n'existe pas, la page
    // reste seule.
    disableHreflang: ["en", "es"],
    // T#2 (2026-07-13) — fallback aligné sur content lib (fourchette
    // 2 000-8 000 €/mois dans le title pour rich snippets).
    fallbackTitle: content.meta.title,
    fallbackDescription: content.meta.description,
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
        src: "/images/illustrations/pricing-roi-tablet.svg",
        alt: "Analyse de retour sur investissement : un dirigeant compare les formules tarifaires DAF Iter Advisors sur sa tablette",
      }}
      />
    </>
  );
}
