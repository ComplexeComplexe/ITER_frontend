import { Metadata } from "next";
import CadsRoiPage from "@/components/pages/CadsRoiPage";

export const metadata: Metadata = {
  title: "DAF ROI | Iter Advisors",
  description:
    "DAF externalisé / CFO part-time : +3 pts de marge, cash maîtrisé, levées débloquées. Audit financier livré en 2 semaines. ROI 5x sur 12 mois.",
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
