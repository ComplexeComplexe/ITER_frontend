import { Metadata } from "next";
import DrhPage from "@/components/pages/DrhPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation, getDrhExternalisePage } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "drh-externalise-page",
    locale: "es",
    path: "/externalizacion-rrhh",
    fallbackTitle: "RRHH externalizado | Iter Advisors",
    fallbackDescription: "RRHH externalizado y dirección de personas a tiempo compartido para pymes y startups.",
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
