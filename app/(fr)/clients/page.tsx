import { Metadata } from "next";
import ClientsPage from "@/components/pages/ClientsPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import { getClientsPageContent } from "@/lib/content/clients";

const content = getClientsPageContent("fr");

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: content.meta.title,
  description: content.meta.description,
  path: "/clients",
  // SEO-AUD-0824 §2 — l'espagnol déclarait /es/clients, qui redirige vers
  // /es/clientes.
  localizedPaths: {
    fr: "/clients",
    en: "/clients",
    es: "/clientes",
  },
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <ClientsPage locale="fr" cmsNavigation={cmsNavigation} />;
}
