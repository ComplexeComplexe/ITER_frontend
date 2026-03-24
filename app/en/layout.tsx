import CookieConsent from "../../components/CookieConsent";

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 - Default denied BEFORE GTM loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  'analytics_storage':'denied',
  'ad_storage':'denied',
  'ad_user_data':'denied',
  'ad_personalization':'denied',
  'functionality_storage':'granted',
  'security_storage':'granted',
  'wait_for_update':500
});`,
          }}
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KZZ9L5VZ');`,
          }}
        />
        {/* End Google Tag Manager */}

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
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KZZ9L5VZ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <CookieConsent locale="en" />
      </body>
    </html>
  );
}
