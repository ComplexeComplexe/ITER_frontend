import type { Metadata } from "next";
import DocumentShell, { OG_LOCALE } from "@/components/DocumentShell";

/**
 * Root layout du groupe (en) — voir components/DocumentShell.tsx pour le
 * pourquoi de cette découpe (sortir `headers()` du layout racine, qui rendait
 * 203 routes sur 209 dynamiques et le HTML non cacheable).
 *
 * Les route groups ne modifient pas les URL : /en/about reste /en/about.
 */

export const metadata: Metadata = {
  title: "Iter Advisors",
  description: "Fractional CFO &amp; outsourced finance",
  metadataBase: new URL("https://www.iteradvisors.com"),
  openGraph: {
    type: "website",
    siteName: "Iter Advisors",
    locale: OG_LOCALE.en,
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

export default function EnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DocumentShell locale="en">{children}</DocumentShell>;
}
