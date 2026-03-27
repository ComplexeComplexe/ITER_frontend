import { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "contact-page",
    locale: "en",
    path: "/contact",
    fallbackTitle: "Contact our outsourced CFOs - Barcelona, Paris, Toulouse | Iter Advisors",
    fallbackDescription: "Contact Iter Advisors.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <ContactPage locale="en" cmsNavigation={cmsNavigation} />;
}
