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
    path: "/externalizacion-daf/metier",
    localizedPaths: { fr: "/daf-externalise/metier", en: "/daf-outsourcing/metier", es: "/externalizacion-daf/metier" },
    fallbackTitle: "Ficha de puesto CFO | Iter Advisors",
    fallbackDescription: "Ficha de puesto del Director Administrativo y Financiero.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return (
    <DafSubPage
      locale="es"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
