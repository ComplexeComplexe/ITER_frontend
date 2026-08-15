import { Metadata } from "next";
import DrhPage from "@/components/pages/DrhPage";
import { buildMetadata } from "@/lib/metadata";
import { getDrhExternalisePage, getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  /* Use static fallback because Strapi SEO component is shared across locales */
  return buildMetadata({
    locale: "en",
    title: "Outsourced HR Director - Shared-time HR | Iter Advisors",
    description: "Outsource your HR management with an experienced HR Director. Recruitment, social management, compliance and tailored HR strategy by Iter Advisors.",
    path: "/hr-outsourcing",
    localizedPaths: { fr: "/drh-externalise", en: "/hr-outsourcing", es: "/externalizacion-rrhh" },
  });
}

export default async function Page() {
  const [strapiData, cmsNavigation] = await Promise.all([
    getDrhExternalisePage("en"),
    getCmsNavigation("en"),
  ]);
  return (
    <DrhPage
      locale="en"
      strapiCategories={strapiData?.serviceCategories ?? null}
      cmsNavigation={cmsNavigation}
    />
  );
}
