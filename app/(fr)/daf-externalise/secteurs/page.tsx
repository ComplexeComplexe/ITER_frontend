import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("fr", "secteurs")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-secteurs-page",
    locale: "fr",
    path: "/daf-externalise/secteurs",
    // SEO-AUD-0824 §2 — cette page n'a pas d'équivalent en EN ni en ES. Elle
    // désignait la page pilier de ces langues comme sa traduction, mais celle-ci
    // renvoie vers /daf-externalise, pas ici : le groupe hreflang ne bouclait
    // pas. Plutôt que de revendiquer une traduction qui n'existe pas, la page
    // reste seule.
    disableHreflang: ["en", "es"],
    fallbackTitle: "DAF Externalisé par Secteur d'Activité | Iter Advisors",
    fallbackDescription: "Iter Advisors propose des DAF externalisés spécialisés par secteur : SaaS, e-commerce, industrie, fintech, santé. Découvrez notre expertise sectorielle.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafSubPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
