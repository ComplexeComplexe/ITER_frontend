import { Metadata } from "next";
import DafLocalPage from "@/components/pages/DafLocalPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getDafLocalContent } from "@/lib/content/daf-local";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDafLocalContent("paris", "es");
  return buildMetadata({
    locale: "es",
    path: "/cfo-externalizado-paris",
    localizedPaths: { fr: "/daf-externalise-paris", en: "/outsourced-cfo-paris", es: "/cfo-externalizado-paris" },
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <DafLocalPage locale="es" city="paris" cmsNavigation={cmsNavigation} />;
}
