import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("fr", "transition")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-transition-page",
    locale: "fr",
    path: "/daf-externalise/transition",
    fallbackTitle: "DAF de transition | Iter Advisors",
    fallbackDescription: "DAF de transition pour accompagner vos changements stratégiques : restructuration, levée de fonds, M&A ou remplacement temporaire. Intervention rapide et expertise immédiate avec Iter Advisors.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafSubPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
