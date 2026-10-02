import ResourcesDecisionHub from "@/components/pages/ResourcesDecisionHub";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import { resourceText } from "@/lib/content/resources-hub-locales";
import { parityHref } from "@/lib/locale-route-map";
import { alignedPaths } from "@/lib/content/locale-publication";

const locale = "es";
const title = resourceText(locale, "Ressources Finance & DAF : blog et outils | Iter Advisors");
const description = resourceText(locale, "Blog finance, glossaire, outils CFO, fiches métiers, cas clients et témoignages : toutes les ressources Iter Advisors pour piloter votre croissance financière.");
const paths = alignedPaths("/ressources")!;
export const metadata = buildMetadata({ locale, path: paths[locale], title, description, localizedPaths: paths });
const schema = {
  "@context": "https://schema.org", "@type": "CollectionPage",
  "@id": `https://www.iteradvisors.com${paths[locale]}#webpage`,
  name: title, description, url: `https://www.iteradvisors.com${paths[locale]}`,
  inLanguage: { fr: "fr-FR", en: "en-GB", es: "es-ES" }[locale],
  isPartOf: { "@id": "https://www.iteradvisors.com/#website" },
  mainEntity: { "@type": "ItemList", itemListElement: [
    ["Tableau de bord : les 12 KPIs financiers", "/ressources/blog/tableau-de-bord-financier-startup-12-kpis"],
    ["Comprendre le coût d’un DAF externalisé", "/ressources/blog/cout-daf-externalise-tarifs-prix-2026"],
    ["Checklist de due diligence financière", "/ressources/blog/checklist-due-diligence-levee-de-fonds"],
    ["Explorer les guides IA et finance", "/ressources/ia-finance"],
    ["Tous les cas clients", "/ressources/cas-clients"],
    ["Tout le glossaire financier", "/ressources/glossaire"],
  ].map(([source, path], index) => ({ "@type": "ListItem", position: index + 1,
    name: resourceText(locale, source), url: `https://www.iteradvisors.com${parityHref(path, locale)}` })), },
};
export default async function Page() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <ResourcesDecisionHub locale={locale} cmsNavigation={await getCmsNavigation(locale)} />
  </>;
}
