import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("es", "metier")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-metier-page",
    locale: "es",
    path: "/externalizacion-daf/funciones",
    localizedPaths: {
      fr: "/daf-externalise/metier",
      en: "/fractional-cfo/role",
      es: "/externalizacion-daf/funciones",
    },
    fallbackTitle: "Director Financiero: funciones, misiones y perfil 2026 | Iter Advisors",
    fallbackDescription: "Ficha de puesto del Director Administrativo y Financiero (DAF): funciones, misiones, competencias clave, salario y trayectoria profesional 2026.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <DafSubPage locale="es" content={content} cmsNavigation={cmsNavigation} />;
}
