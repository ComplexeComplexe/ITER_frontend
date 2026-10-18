import { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content/legal";
import { getCmsNavigation } from "@/lib/static-content";

const content = getLegalContent("aviso-legal");

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "legal-page",
    locale: "es",
    path: "/aviso-legal",
    localizedPaths: { fr: "/mentions-legales", en: "/legal-notice", es: "/aviso-legal" },
    fallbackTitle: "Aviso legal - Condiciones generales | Iter Advisors",
    fallbackDescription: "Aviso legal de Iter Advisors S.L. (NIF B42960849): razón social, sede en Barcelona, director de la publicación y proveedor de alojamiento del sitio web.",
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
