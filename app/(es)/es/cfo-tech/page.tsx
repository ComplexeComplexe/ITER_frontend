import PresentationDownloadPage from "@/components/PresentationDownloadPage";
import { presentationMetadata } from "@/lib/presentations";

export const metadata = presentationMetadata("cfo-tech", "es");

export default function Page() {
  return <PresentationDownloadPage offer="cfo-tech" locale="es" />;
}
