import { Metadata } from "next";
import FicheMetierListingPage from "@/components/pages/FicheMetierListingPage";
import { getJobMetiers, getCmsNavigation } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Perfiles Finance | Iter Advisors",
  description: "Fichas profesionales finanzas: DAF, CFO, Controller, Tesorero. Responsabilidades, skills, salarios. Guía experto gratis 2026 para gestores RH.",
  path: "/daf-externalise/metier",
});

export default async function Page() {
  const [fiches, cmsNavigation] = await Promise.all([
    getJobMetiers("es"),
    getCmsNavigation("es"),
  ]);
  return (
    <FicheMetierListingPage
      locale="es"
      fiches={fiches}
      cmsNavigation={cmsNavigation}
    />
  );
}
