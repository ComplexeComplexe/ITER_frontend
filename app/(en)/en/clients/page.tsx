import { Metadata } from "next";
import ClientsPage from "@/components/pages/ClientsPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import { getClientsPageContent } from "@/lib/content/clients";

const content = getClientsPageContent("en");

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: content.meta.title,
  description: content.meta.description,
  path: "/clients",
  // SEO-AUD-0824 §2 — /es/clients redirige vers /es/clientes.
  localizedPaths: {
    fr: "/clients",
    en: "/clients",
    es: "/clientes",
  },
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <ClientsPage locale="en" cmsNavigation={cmsNavigation} />;
}
