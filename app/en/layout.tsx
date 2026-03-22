export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
                    "Outsourced CFO and part-time CFO firm for SMEs, startups and scale-ups. Based in Barcelona, Paris and Toulouse.",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.iteradvisors.com/images/logos/logo-hero.png",
                  },
                  address: [
                    {
                      "@type": "PostalAddress",
                      addressLocality: "Barcelona",
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
