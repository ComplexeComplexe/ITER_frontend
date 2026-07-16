import { Metadata } from "next";
import DafLocalPage from "@/components/pages/DafLocalPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getDafLocalContent } from "@/lib/content/daf-local";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDafLocalContent("barcelone", "fr");

  // SEO-07 (2026-07-01) — LocalBusiness / ProfessionalService pour le
  // signal SEO local sur "daf externalisé barcelone" / "cfo externalizado
  // barcelona". Barcelone = siège social Iter Advisors S.L. donc adresse
  // complète disponible dans le schema (Carrer Casp, 54, 5-1°, 08010).
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.iteradvisors.com/daf-externalise-barcelone#local",
    name: "Cabinet DAF Barcelone — Iter Advisors",
    description:
      "Direction financière externalisée pour PME et startups à Barcelone et en Catalogne. Siège social Iter Advisors S.L.",
    url: "https://www.iteradvisors.com/daf-externalise-barcelone",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer Casp, 54, 5-1°",
      addressLocality: "Barcelona",
      postalCode: "08010",
      addressRegion: "Cataluña",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Carrer Casp, 54, Barcelona (Eixample).
      latitude: 41.3946,
      longitude: 2.1730,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Barcelona" },
      { "@type": "AdministrativeArea", name: "Cataluña" },
      { "@type": "AdministrativeArea", name: "España" },
    ],
    openingHours: "Mo-Fr 09:00-18:00",
    priceRange: "€€",
    image: "https://www.iteradvisors.com/images/logos/logo-og-square.png",
    parentOrganization: { "@id": "https://www.iteradvisors.com/#organization" },
  };

  return buildMetadata({
    locale: "fr",
    path: "/daf-externalise-barcelone",
    localizedPaths: { fr: "/daf-externalise-barcelone", en: "/outsourced-cfo-barcelona", es: "/cfo-externalizado-barcelona" },
    title: t.meta.title,
    description: t.meta.description,
    structuredData: localSchema,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafLocalPage locale="fr" city="barcelone" cmsNavigation={cmsNavigation} />;
}
