import { Metadata } from "next";
import FicheMetierListingPage from "@/components/pages/FicheMetierListingPage";
import { getJobMetiers, getCmsNavigation } from "@/lib/static-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Finance Job Descriptions | Iter Advisors",
  description: "Finance job descriptions: CFO, Finance Director, Controller, Treasurer. Complete guide to roles, responsibilities, required skills, compensation insights.",
  path: "/daf-externalise/metier",
});

export default async function Page() {
  const [fiches, cmsNavigation] = await Promise.all([
    getJobMetiers("en"),
    getCmsNavigation("en"),
  ]);
  return <FicheMetierListingPage locale="en" fiches={fiches} cmsNavigation={cmsNavigation} />;
}
