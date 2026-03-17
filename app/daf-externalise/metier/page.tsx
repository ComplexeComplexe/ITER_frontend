import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("fr", "metier")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-metier-page",
    locale: "fr",
    path: "/daf-externalise/metier",
    fallbackTitle: "Fiche métier DAF | Iter Advisors",
    fallbackDescription: "Fiche métier du Directeur Administratif et Financier.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafSubPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
