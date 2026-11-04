import DirectorRemunerationGuidePage, { remunerationMetadata } from "@/components/pages/DirectorRemunerationGuidePage";

export const metadata = remunerationMetadata("en");

export default function Page() {
  return <DirectorRemunerationGuidePage locale="en" />;
}
