import type { Metadata } from "next";
import NotFoundPage from "@/components/pages/NotFoundPage";

// Les métadonnées d'une page qui lève notFound() ne sont pas rendues : Next.js
// résout celles du fichier not-found du segment le plus proche. Le titre et le
// noindex se déclarent donc ici.
export const metadata: Metadata = {
  title: "Page introuvable | Iter Advisors",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundPage locale="fr" />;
}
