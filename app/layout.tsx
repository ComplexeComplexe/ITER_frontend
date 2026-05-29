import type { Metadata } from "next";
import { headers } from "next/headers";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CookieConsent from "../components/CookieConsent";
// INDEX-01: HrefLangInjector removed. Hreflang is now emitted only
// server-side via buildStrapiMetadata / buildStrapiCollectionMetadata
// in lib/metadata.ts. Having both produced 8 conflicting hreflang
// tags per page (4 SSR + 4 CSR), so Google ignored the entire set
// and treated the FR/EN/ES variants as duplicate content.

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SEO-03: derive locale from the x-pathname header injected by middleware.
  // This ensures the <html lang> attribute is correct for every locale on SSR,
  // fixing the Screaming Frog / GSC signal that all EN and ES pages sent lang="fr".
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/";
  const lang =
    pathname.startsWith("/en") ? "en" :
    pathname.startsWith("/es") ? "es" : "fr";
  const locale = lang as "fr" | "en" | "es";

  return (
    <html lang={lang} className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* DNS prefetch & preconnect for 3rd-party origins */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://share.trustfolio.co" />
        <link rel="dns-prefetch" href="https://ztynwacifpvzaemkqifh.storage.eu-central-1.nhost.run" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://share.trustfolio.co" crossOrigin="anonymous" />

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

        {/* Google Tag Manager - deferred to after user interaction / idle */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var loaded=false;
  function loadGTM(){
    if(loaded)return;loaded=true;
    var w=window,d=document,s='script',l='dataLayer',i='GTM-KZZ9L5VZ';
    w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  }
  if('requestIdleCallback' in window){requestIdleCallback(loadGTM,{timeout:3500});}
  else{setTimeout(loadGTM,3500);}
  ['scroll','click','touchstart','mouseover','keydown'].forEach(function(e){
    window.addEventListener(e,loadGTM,{once:true,passive:true});
  });
})();`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google Ads Conversion Tracking — deferred for LCP (TICKET 14) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var loaded=false;
  function loadGAds(){
    if(loaded)return;loaded=true;
    window.dataLayer=window.dataLayer||[];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-18030187059');
    var s=document.createElement('script');
    s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id=AW-18030187059';
    document.head.appendChild(s);
  }
  if('requestIdleCallback' in window){requestIdleCallback(loadGAds,{timeout:3500});}
  else{setTimeout(loadGAds,3500);}
  ['scroll','click','touchstart','mouseover','keydown'].forEach(function(e){
    window.addEventListener(e,loadGAds,{once:true,passive:true});
  });
})();`,
          }}
        />
        {/* End Google Ads Conversion Tracking */}

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
                  // Spanish SL (sociedad limitada), NIF B42960849.
                  legalName: "Iter Advisors S.L.",
                  taxID: "B42960849",
                  vatID: "ESB42960849",
                  url: "https://www.iteradvisors.com/",
                  description:
                    "Cabinet de DAF externalisé et CFO à temps partagé pour PME, startups et scale-ups. Présent à Barcelone, Paris et Toulouse.",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.iteradvisors.com/images/logos/logo-og-square.png",
                    width: 512,
                    height: 512,
                  },
                  address: [
                    {
                      "@type": "PostalAddress",
                      streetAddress: "Carrer Casp, 54, 5-1°",
                      addressLocality: "Barcelona",
                      postalCode: "08010",
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
                  // Review-snippet fix (2026-05-29): no aggregateRating on the
                  // Organization. The 5/5 Trustfolio score is a third-party,
                  // self-serving rating that Google does not accept for review
                  // rich results — and declaring it here (site-wide) AND again on
                  // /daf-externalise produced a "multiple aggregate ratings" error
                  // in Search Console (two aggregateRatings on one #organization).
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
        <CookieConsent locale={locale} />
      </body>
    </html>
  );
}
