import type { Metadata } from "next";
import DocumentShell, { OG_LOCALE } from "@/components/DocumentShell";

/**
 * Root layout du groupe (es) — voir components/DocumentShell.tsx pour le
 * pourquoi de cette découpe (sortir `headers()` du layout racine, qui rendait
 * 203 routes sur 209 dynamiques et le HTML non cacheable).
 *
 * Les route groups ne modifient pas les URL : /es/quienes-somos reste /es/quienes-somos.
 */

export const metadata: Metadata = {
  title: "Iter Advisors",
  description: "CFO externalizado y dirección financiera",
  metadataBase: new URL("https://www.iteradvisors.com"),
  openGraph: {
    type: "website",
    siteName: "Iter Advisors",
    locale: OG_LOCALE.es,
    images: [
      {
        url: "/images/og-default.webp",
        width: 1200,
        height: 630,
        alt: "Iter Advisors - DAF externalisé & CFO à temps partagé",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-default.webp"],
  },
};

export default function EsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DocumentShell locale="es">{children}</DocumentShell>;
}
