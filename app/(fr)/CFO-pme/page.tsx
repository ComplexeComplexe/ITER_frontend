import PresentationDownloadPage from "@/components/PresentationDownloadPage";
import { presentationMetadata } from "@/lib/presentations";

export const metadata = presentationMetadata("cfo-pme", "fr");

export default function Page() {
  return <PresentationDownloadPage offer="cfo-pme" locale="fr" />;
}
