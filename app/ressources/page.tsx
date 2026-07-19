import { Metadata } from "next";
import ResourcesPage from "@/components/pages/ResourcesPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Ressources DAF externalisé | Iter Advisors",
  description:
    "Ressources DAF : blog finance, glossaire, fiches métiers, témoignages, fiscalité France-Espagne. Conseils experts en DAF externalisé et levée de fonds.",
  path: "/ressources",
});

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.iteradvisors.com/ressources#webpage",
  name: "Ressources DAF externalisé | Iter Advisors",
  description:
    "Ressources DAF : blog finance, glossaire, fiches métiers, témoignages et articles fiscalité France-Espagne.",
  url: "https://www.iteradvisors.com/ressources",
  inLanguage: "fr-FR",
  isPartOf: { "@id": "https://www.iteradvisors.com/#website" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.iteradvisors.com" },
      { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.iteradvisors.com/ressources" },
    ],
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Ressources financières — Iter Advisors",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: "https://www.iteradvisors.com/ressources/fiscalite/loi-beckham",
        name: "Loi Beckham Espagne 2026 : guide complet",
      },
      {
        "@type": "ListItem",
        position: 2,
        url: "https://www.iteradvisors.com/ressources/blog/regimes-fiscaux-france-vs-espagne",
        name: "Régimes fiscaux : France vs Espagne",
      },
      {
        "@type": "ListItem",
        position: 3,
        url: "https://www.iteradvisors.com/ressources/blog/checklist-due-diligence-levee-de-fonds",
        name: "Checklist due diligence — levée de fonds",
      },
      {
        "@type": "ListItem",
        position: 4,
        url: "https://www.iteradvisors.com/ressources/glossaire",
        name: "Glossaire financier",
      },
      {
        "@type": "ListItem",
        position: 5,
        url: "https://www.iteradvisors.com/ressources/blog/les-10-outils-pour-les-cfos-en-start-up",
        name: "Les 10 outils indispensables des CFOs",
      },
      {
        "@type": "ListItem",
        position: 6,
        url: "https://www.iteradvisors.com/ressources/testimonials",
        name: "Cas clients — témoignages",
      },
    ],
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <ResourcesPage locale="fr" cmsNavigation={cmsNavigation} />
    </>
  );
}
