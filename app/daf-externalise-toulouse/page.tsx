import { Metadata } from "next";
import DafLocalPage from "@/components/pages/DafLocalPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getDafLocalContent } from "@/lib/content/daf-local";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDafLocalContent("toulouse", "fr");

  // SEO-07 (2026-07-01) — LocalBusiness / ProfessionalService pour le
  // signal SEO local sur "daf externalisé toulouse".
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.iteradvisors.com/daf-externalise-toulouse#local",
    name: "Cabinet DAF Toulouse — Iter Advisors",
    description:
      "Direction financière externalisée pour PME et startups à Toulouse et en Occitanie.",
    url: "https://www.iteradvisors.com/daf-externalise-toulouse",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toulouse",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Toulouse centre — approximation. À affiner avec l'adresse du bureau.
      latitude: 43.6047,
      longitude: 1.4442,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Toulouse (31)" },
      { "@type": "AdministrativeArea", name: "Haute-Garonne (31)" },
      { "@type": "AdministrativeArea", name: "Occitanie" },
    ],
    openingHours: "Mo-Fr 09:00-18:00",
    priceRange: "€€",
    image: "https://www.iteradvisors.com/images/logos/logo-og-square.png",
    parentOrganization: { "@id": "https://www.iteradvisors.com/#organization" },
  };

  return buildMetadata({
    locale: "fr",
    path: "/daf-externalise-toulouse",
    localizedPaths: { fr: "/daf-externalise-toulouse", en: "/outsourced-cfo-toulouse", es: "/cfo-externalizado-toulouse" },
    title: t.meta.title,
    description: t.meta.description,
    structuredData: localSchema,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafLocalPage locale="fr" city="toulouse" cmsNavigation={cmsNavigation} />;
}
