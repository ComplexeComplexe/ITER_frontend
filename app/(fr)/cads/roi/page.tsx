import { Metadata } from "next";
import CadsRoiPage from "@/components/pages/CadsRoiPage";

export const metadata: Metadata = {
  title: "DAF ROI | Iter Advisors",
  description:
    "DAF externalisé : précisez vos besoins de trésorerie, de reporting et de pilotage financier. Périmètre, livrables et calendrier à définir ensemble.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.iteradvisors.com/cads/roi",
  },
};

export default function Page() {
  return <CadsRoiPage />;
}
