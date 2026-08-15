import { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "contact-page",
    locale: "en",
    path: "/contact",
    fallbackTitle: "Free CFO Consultation | Iter Advisors",
    fallbackDescription: "Book a free 45-minute financial diagnosis with a senior Iter Advisors CFO. No commitment, clear next steps.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <ContactPage locale="en" cmsNavigation={cmsNavigation} />;
}
