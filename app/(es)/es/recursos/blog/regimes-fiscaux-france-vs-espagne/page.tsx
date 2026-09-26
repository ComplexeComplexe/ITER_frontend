import TaxComparisonPage, { taxComparisonMetadata } from "@/components/pages/TaxComparisonPage";

export const metadata = taxComparisonMetadata("es");

export default function Page() {
  return <TaxComparisonPage locale="es" />;
}
