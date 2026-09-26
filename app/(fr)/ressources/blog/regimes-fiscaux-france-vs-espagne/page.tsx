import TaxComparisonPage, { taxComparisonMetadata } from "@/components/pages/TaxComparisonPage";

export const metadata = taxComparisonMetadata("fr");

export default function Page() {
  return <TaxComparisonPage locale="fr" />;
}
