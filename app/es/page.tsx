import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "es",
    path: "/",
    fallbackTitle: "Director Financiero Externo | Iter Advisors",
    fallbackDescription: "Iter Advisors: CFO externo para pymes y startups.",
  });
}

export default async function Page() {
  const teamMembers = await getTeamMembers("es");
  return <HomePage locale="es" teamMembers={teamMembers} />;
}
