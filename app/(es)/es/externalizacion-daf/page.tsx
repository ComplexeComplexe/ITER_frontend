import { Metadata } from "next";
import DafPage from "@/components/pages/DafPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "es",
    path: "/externalizacion-daf",
    // SEO-AUD-0824 §2 — le slug anglais du cluster DAF est `fractional-cfo`
    // depuis HARMO-01 ; `daf-outsourcing` ne subsiste que comme redirection.
    // Les chemins sont désormais déduits par getLocalizedPath.
    fallbackTitle: "Externalización DAF | Iter Advisors",
    fallbackDescription: "Iter Advisors, gabinete de CFO externalizado para pymes y startups en España y Francia. 85 empresas acompañadas, 100 M€ de fundraising, 5/5 en Trustfolio.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <DafPage locale="es" cmsNavigation={cmsNavigation} />;
}
