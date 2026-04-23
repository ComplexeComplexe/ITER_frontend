import { Metadata } from "next";
import CookiePolicyPage from "@/components/pages/CookiePolicyPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getCookiePolicyContent } from "@/lib/content/cookies";

const content = getCookiePolicyContent("en");

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: content.meta.title,
  description: content.meta.description,
  path: "/cookie-policy",
  localizedPaths: {
    fr: "/politique-cookies",
    en: "/cookie-policy",
    es: "/politica-cookies",
  },
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <CookiePolicyPage locale="en" cmsNavigation={cmsNavigation} />;
}
