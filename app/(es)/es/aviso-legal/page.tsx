import { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content/legal";
import { getCmsNavigation } from "@/lib/strapi";

const content = getLegalContent("aviso-legal");

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "legal-page",
    locale: "es",
    path: "/aviso-legal",
    localizedPaths: { fr: "/mentions-legales", en: "/legal-notice", es: "/aviso-legal" },
    fallbackTitle: "Aviso legal - Condiciones generales | Iter Advisors",
    fallbackDescription: "Consulte el aviso legal, las condiciones generales y la informacion del editor del sitio web de Iter Advisors. Servicios de DAF externalizado en Francia y Espana.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return (
    <LegalPage
      locale="es"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
