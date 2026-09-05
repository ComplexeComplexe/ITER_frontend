import { Metadata } from "next";
import TestimonialsListingPage from "@/components/pages/TestimonialsListingPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Outsourced CFO case studies - Client results | Iter Advisors",
  description: "Outsourced CFO case studies: SMEs, startups, scale-ups. Real results from Iter Advisors' fractional CFO services. Verified client testimonials, 5/5 rated.",
  path: "/ressources/testimonials",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <TestimonialsListingPage locale="en" cmsNavigation={cmsNavigation} />;
}
