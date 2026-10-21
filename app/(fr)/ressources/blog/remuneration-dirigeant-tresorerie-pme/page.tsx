import DirectorRemunerationGuidePage, { remunerationMetadata } from "@/components/pages/DirectorRemunerationGuidePage";

export const metadata = remunerationMetadata("fr");

export default function Page() {
  return <DirectorRemunerationGuidePage locale="fr" />;
}
