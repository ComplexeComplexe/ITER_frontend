import { Metadata } from "next";
import JobsPage from "@/components/pages/JobsPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Empleo | Iter Advisors",
  description: "Únase al equipo de Iter Advisors.",
  path: "/jobs",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <JobsPage locale="es" cmsNavigation={cmsNavigation} />;
}
