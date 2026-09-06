import { buildDafSubFaqSchema } from "@/lib/daf-sub-schema";
import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/static-content";

const content = getDafSubContent("fr", "temps-partage")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-temps-partage-page",
    locale: "fr",
    path: "/daf-externalise/temps-partage",
    localizedPaths: { fr: "/daf-externalise/temps-partage", en: "/en/fractional-cfo/shared-time", es: "/externalizacion-daf/tiempo-compartido" },
    // T#2 (2026-07-13) — fallback aligné sur content lib (title T#2 :
    // "DAF à temps partagé : directeur financier 1-8 j/mois").
    fallbackTitle: content.meta.title,
    fallbackDescription: content.meta.description,
  });
}

const faqSchema = buildDafSubFaqSchema(content);

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  // SEO-005 (2026-08-09) — BreadcrumbList manuel retiré. Le composant
  // <Breadcrumb> rendu par DafSubPage émet déjà le sien, construit
  // depuis le pathname réel : les deux coexistaient et la page servait
  // deux fils d'Ariane identiques à un libellé près. Même correctif que
  // sur les pages fiscalité et /ressources/outils/malibou.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DafSubPage
        locale="fr"
        content={content}
        cmsNavigation={cmsNavigation}
        heroImage={{
          src: "/images/illustrations/team-video-call.svg",
          alt: "Réunion d'équipe en visioconférence : un DAF à temps partagé pilote la finance d'Iter Advisors à distance",
        }}
      />
    </>
  );
}
