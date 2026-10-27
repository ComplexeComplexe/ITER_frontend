import PresentationDownloadPage from "@/components/PresentationDownloadPage";
import { presentationMetadata } from "@/lib/presentations";

export const metadata = presentationMetadata("cfo-tech", "fr");

export default function Page() {
  return <PresentationDownloadPage offer="cfo-tech" locale="fr" />;
}
