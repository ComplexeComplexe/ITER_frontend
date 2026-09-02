import type { Metadata } from "next";
import DocumentShell, { OG_LOCALE } from "@/components/DocumentShell";

/**
 * Root layout du groupe (fr) — voir components/DocumentShell.tsx pour le
 * pourquoi de cette découpe (sortir `headers()` du layout racine, qui rendait
 * 203 routes sur 209 dynamiques et le HTML non cacheable).
 *
 * Les route groups ne modifient pas les URL : les pages de ce groupe restent à la racine, /daf-externalise reste /daf-externalise.
 */

export const metadata: Metadata = {
  title: "Iter Advisors",
  description: "DAF externalisé & DAF à temps partagé",
  metadataBase: new URL("https://www.iteradvisors.com"),
  openGraph: {
    type: "website",
    siteName: "Iter Advisors",
    locale: OG_LOCALE.fr,
    images: [
      {
        url: "/images/og-logo.png",
        width: 1200,
        height: 630,
        alt: "Iter Advisors - DAF externalisé & CFO à temps partagé",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-logo.png"],
  },
};

export default function FrLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DocumentShell locale="fr">{children}</DocumentShell>;
}
