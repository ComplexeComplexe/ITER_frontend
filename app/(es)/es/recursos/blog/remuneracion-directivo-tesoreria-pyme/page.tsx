import DirectorRemunerationGuidePage, { remunerationMetadata } from "@/components/pages/DirectorRemunerationGuidePage";

export const metadata = remunerationMetadata("es");

export default function Page() {
  return <DirectorRemunerationGuidePage locale="es" />;
}
