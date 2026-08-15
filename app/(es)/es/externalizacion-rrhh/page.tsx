import { Metadata } from "next";
import DrhPage from "@/components/pages/DrhPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation, getDrhExternalisePage } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  /* Use static fallback because Strapi SEO component is shared across locales */
  return buildMetadata({
    locale: "es",
    title: "Director de RRHH externalizado | Iter Advisors",
    description: "Externalice su direcci\u00f3n de RRHH con un Director experimentado. Reclutamiento, gesti\u00f3n social y estrategia de RRHH a medida por Iter Advisors.",
    path: "/externalizacion-rrhh",
    localizedPaths: { fr: "/drh-externalise", en: "/hr-outsourcing", es: "/externalizacion-rrhh" },
  });
}

export default async function Page() {
  const [strapiData, cmsNavigation] = await Promise.all([
    getDrhExternalisePage("es"),
    getCmsNavigation("es"),
  ]);
  return (
    <DrhPage
      locale="es"
      strapiCategories={strapiData?.serviceCategories ?? null}
      cmsNavigation={cmsNavigation}
    />
  );
}
