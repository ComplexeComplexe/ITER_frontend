import { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "contact-page",
    locale: "en",
    path: "/contact",
    fallbackTitle: "Contact our finance & HR team | Iter Advisors",
    fallbackDescription: "Discuss your finance or HR needs with Iter Advisors. Free initial conversation, with a presence in Paris, Barcelona and Toulouse.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <ContactPage locale="en" cmsNavigation={cmsNavigation} />;
}
