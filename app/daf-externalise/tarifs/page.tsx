import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("fr", "tarifs")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-tarifs-page",
    locale: "fr",
    path: "/daf-externalise/tarifs",
    localizedPaths: { fr: "/daf-externalise/tarifs", en: "/en/fractional-cfo", es: "/externalizacion-daf" },
    fallbackTitle: "Tarifs DAF Externalisé 2026 - Grille de Prix | Iter Advisors",
    fallbackDescription: "Combien coûte un DAF externalisé ? Grille de tarifs 2026 : de 2 000 à 8 000 € HT/mois selon la formule. Transparence totale, sans surprise.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return (
    <DafSubPage
      locale="fr"
      content={content}
      cmsNavigation={cmsNavigation}
      heroImage={{
        src: "/images/illustrations/pricing-roi-tablet.svg",
        alt: "Analyse de retour sur investissement : un dirigeant compare les formules tarifaires DAF Iter Advisors sur sa tablette",
      }}
    />
  );
}
