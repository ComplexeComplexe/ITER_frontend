import { Metadata } from "next";
import CookiePolicyPage from "@/components/pages/CookiePolicyPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getCookiePolicyContent } from "@/lib/content/cookies";

const content = getCookiePolicyContent("fr");

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: content.meta.title,
  description: content.meta.description,
  path: "/politique-cookies",
  localizedPaths: {
    fr: "/politique-cookies",
    en: "/cookie-policy",
    es: "/politica-cookies",
  },
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <CookiePolicyPage locale="fr" cmsNavigation={cmsNavigation} />;
}
