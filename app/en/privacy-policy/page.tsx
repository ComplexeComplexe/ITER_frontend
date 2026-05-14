import { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content/legal";
import { getCmsNavigation } from "@/lib/strapi";

const content = getLegalContent("privacy-policy");

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "privacy-page",
    locale: "en",
    path: "/privacy-policy",
    localizedPaths: { fr: "/politique-de-confidentialite", en: "/privacy-policy", es: "/politica-de-privacidad" },
    fallbackTitle: "Privacy Policy | Iter Advisors",
    fallbackDescription: "Iter Advisors privacy policy: how we collect, use, store and protect your personal data. Your GDPR rights as a EU user, and how to exercise them.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <LegalPage locale="en" content={content} cmsNavigation={cmsNavigation} />;
}
