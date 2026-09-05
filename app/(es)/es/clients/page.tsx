import { Metadata } from "next";
import ClientsPage from "@/components/pages/ClientsPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import { getClientsPageContent } from "@/lib/content/clients";

const content = getClientsPageContent("es");

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: content.meta.title,
  description: content.meta.description,
  path: "/clients",
  localizedPaths: {
    fr: "/clients",
    en: "/clients",
    es: "/clients",
  },
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <ClientsPage locale="es" cmsNavigation={cmsNavigation} />;
}
