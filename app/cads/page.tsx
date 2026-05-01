import { Metadata } from "next";
import CadsPage from "@/components/pages/CadsPage";

export const metadata: Metadata = {
  title: "DAF externalisé pour PME et startups | Iter Advisors",
  description:
    "DAF externalisé / CFO part-time : pilotage financier, trésorerie, structuration de la croissance. Échangez avec un CFO expérimenté en 30 minutes. Sans engagement.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.iteradvisors.com/cads",
  },
};

export default function Page() {
  return <CadsPage />;
}
