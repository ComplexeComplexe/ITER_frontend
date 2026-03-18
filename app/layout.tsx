import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iter Advisors",
  description: "DAF externalisé & DAF à temps partagé",
  metadataBase: new URL("https://www.iteradvisors.com"),
  openGraph: {
    type: "website",
    siteName: "Iter Advisors",
    locale: "fr_FR",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Iter Advisors — DAF externalisé & CFO à temps partagé",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Favicons & Manifest */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6C3AED" />

        {/* Organization + WebSite schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["FinancialService", "Organization"],
                  "@id": "https://www.iteradvisors.com/#organization",
                  name: "Iter Advisors",
                  url: "https://www.iteradvisors.com/",
                  description:
                    "Cabinet de DAF externalisé et CFO à temps partagé pour PME, startups et scale-ups. Présent à Barcelone, Paris et Toulouse.",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.iteradvisors.com/images/logos/logo-hero.png",
                  },
                  address: [
                    {
                      "@type": "PostalAddress",
                      addressLocality: "Barcelone",
                      addressCountry: "ES",
                    },
                    {
                      "@type": "PostalAddress",
                      addressLocality: "Paris",
                      addressCountry: "FR",
                    },
                    {
                      "@type": "PostalAddress",
                      addressLocality: "Toulouse",
                      addressCountry: "FR",
                    },
                  ],
                  openingHours: "Mo-Fr 09:00-18:00",
                  sameAs: [
                    "https://www.linkedin.com/company/iter-advisors/",
                  ],
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "5",
                    bestRating: "5",
                    worstRating: "1",
                    ratingCount: "31",
                    reviewCount: "31",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.iteradvisors.com/#website",
                  url: "https://www.iteradvisors.com/",
                  name: "Iter Advisors",
                  publisher: {
                    "@id": "https://www.iteradvisors.com/#organization",
                  },
                  inLanguage: ["fr-FR", "en-GB", "es-ES"],
                  potentialAction: {
                    "@type": "SearchAction",
                    target:
                      "https://www.iteradvisors.com/?s={search_term_string}",
                    "query-input":
                      "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
