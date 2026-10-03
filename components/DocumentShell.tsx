import { CLIENTS_ACCOMPAGNES, CONSULTANTS } from "@/lib/content/facts";
import { CABINET_EXPERTISES } from "@/lib/content/cabinet-expertise";
import { FINANCE_EXPERT, editorialPersonId } from "@/lib/content/finance-expert";
import { getPartnerProfile } from "@/lib/content/partner-profiles";
import { parityHref } from "@/lib/locale-route-map";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import { TRACKING_BOOTSTRAP, CONSENT_DISPLAY_BOOTSTRAP } from "@/lib/analytics/consent";
import CookieConsent from "@/components/CookieConsent";
import type { Locale } from "@/lib/i18n";

/**
 * Coquille HTML du site — `<html>`, `<head>`, `<body>`.
 *
 * SEO-REP §3.2 (2026-08-15) — extraite de l'ancien `app/layout.tsx`.
 *
 * Ce layout unique dérivait la locale d'un appel à `headers()`, pour poser le
 * bon `lang` sur les pages EN et ES. Or `headers()` bascule la route en rendu
 * dynamique, et comme il s'agissait du layout racine, TOUTES les routes du site
 * l'étaient : 203 sur 209 au dernier build. Next.js sert alors ses réponses en
 * `private, no-cache, no-store` et le CDN Vercel ne peut rien mettre en cache —
 * chaque visite, chaque passage de crawler repartait à l'origine.
 *
 * La locale est désormais connue statiquement : il y a un root layout par
 * groupe de routes — `app/(fr)`, `app/(en)`, `app/(es)` — et chacun passe sa
 * locale en prop. Plus d'appel à `headers()`, donc plus de rendu dynamique
 * imposé, donc un HTML réellement cacheable.
 *
 * Pourquoi trois root layouts et pas un layout imbriqué : seul un root layout
 * peut rendre `<html>`. Un `app/en/layout.tsx` imbriqué sous un layout racine
 * ne peut pas changer `lang` — une tentative précédente avait produit des
 * documents imbriqués sur les 69 pages EN. Les route groups (parenthèses) ne
 * modifient pas les URL : `/en/about` reste `/en/about`.
 */

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

export default function DocumentShell({
  locale,
  children,
}: Readonly<{ locale: Locale; children: React.ReactNode }>) {
  const organizationCopy = {
    fr: {
      description: `Cabinet de DAF externalisé et CFO à temps partagé pour PME, startups et scale-ups. ${CONSULTANTS} consultants, ${CLIENTS_ACCOMPAGNES} entreprises accompagnées. Équipes à Barcelone et Paris ; accompagnement à distance ou sur accord à Toulouse.`,
      slogan: "La meilleure version de votre direction financière",
      expertise: [...CABINET_EXPERTISES.map(({ label }) => label), "Directeur financier externalisé", "CFO à temps partagé", "Fractional CFO", "Direction financière externalisée", "Gestion de trésorerie", "M&A et due diligence financière", "Pilotage financier startup"],
      france: "France", spain: "Espagne", barcelona: "Barcelone",
    },
    en: {
      description: `Fractional CFO firm for SMEs, startups and scale-ups. ${CONSULTANTS} consultants and ${CLIENTS_ACCOMPAGNES} companies supported. Teams in Barcelona and Paris; remote support or an agreed arrangement in Toulouse.`,
      slogan: "A stronger finance function for your business",
      expertise: ["Fractional CFO", "External HR director", "Management accounting", "Fundraising preparation", "France-Spain taxation", "Cash flow management", "M&A and financial due diligence", "Startup financial management"],
      france: "France", spain: "Spain", barcelona: "Barcelona",
    },
    es: {
      description: `Firma de CFO externo para pymes, startups y scale-ups. ${CONSULTANTS} consultores y ${CLIENTS_ACCOMPAGNES} empresas acompañadas. Equipos en Barcelona y París; apoyo a distancia o según acuerdo en Toulouse.`,
      slogan: "Una función financiera más sólida para tu empresa",
      expertise: ["CFO externo", "Director de RR. HH. externo", "Control de gestión", "Preparación de rondas de financiación", "Fiscalidad Francia-España", "Gestión de tesorería", "M&A y due diligence financiera", "Gestión financiera para startups"],
      france: "Francia", spain: "España", barcelona: "Barcelona",
    },
  }[locale];
  return (
    <html
      lang={locale}
      // The pre-paint consent script adds one display-only class on this node.
      suppressHydrationWarning
      className={`${dmSans.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* DNS prefetch & preconnect for 3rd-party origins */}
        <link rel="dns-prefetch" href="https://share.trustfolio.co" />
        <link rel="dns-prefetch" href="https://ztynwacifpvzaemkqifh.storage.eu-central-1.nhost.run" />
        <link rel="preconnect" href="https://share.trustfolio.co" crossOrigin="anonymous" />

        <script dangerouslySetInnerHTML={{ __html: CONSENT_DISPLAY_BOOTSTRAP }} />
        <script dangerouslySetInnerHTML={{ __html: TRACKING_BOOTSTRAP }} />

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
                  "@type": ["ProfessionalService", "Organization"],
                  "@id": "https://www.iteradvisors.com/#organization",
                  name: "Iter Advisors",
                  // Spanish SL (sociedad limitada), NIF B42960849.
                  legalName: "Iter Advisors S.L.",
                  taxID: "B42960849",
                  vatID: "ESB42960849",
                  url: "https://www.iteradvisors.com/",
                  description: organizationCopy.description,
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.iteradvisors.com/images/logos/iter-advisors-brand-square.png",
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
                  ],
                  openingHours: "Mo-Fr 09:00-18:00",
                  // SEO-FIN §7.4 (2026-08-15) — enrichissement remonté depuis
                  // /daf-externalise, qui redéfinissait un second nœud avec le
                  // même @id=#organization. Deux définitions concurrentes de la
                  // même entité, dont une seule portait ces propriétés. Elles
                  // décrivent le cabinet, pas la page : leur place est ici, où
                  // l'entité est déclarée une fois pour tout le site.
                  alternateName: ["Iter Advisors S.L.", "Iter Advisors Cabinet DAF"],
                  slogan: organizationCopy.slogan,
                  foundingDate: "2021",
                  areaServed: [
                    { "@type": "Country", name: organizationCopy.france },
                    { "@type": "Country", name: organizationCopy.spain },
                    { "@type": "City", name: "Paris" },
                    { "@type": "City", name: "Toulouse" },
                    { "@type": "City", name: organizationCopy.barcelona },
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "contact@iteradvisors.com",
                    contactType: "customer service",
                    areaServed: ["FR", "ES"],
                    availableLanguage: ["French", "English", "Spanish"],
                  },
                  knowsAbout: organizationCopy.expertise,
                  founder: [
                    {
                      "@type": "Person",
                      "@id": FINANCE_EXPERT.id,
                      url: `https://www.iteradvisors.com${parityHref(FINANCE_EXPERT.href, locale)}`,
                      name: FINANCE_EXPERT.name,
                      jobTitle: getPartnerProfile("sebastien-doat", locale)?.teamRole,
                      sameAs: "https://www.linkedin.com/in/sebastien-doat-fractional-cfo/",
                    },
                    {
                      "@type": "Person",
                      name: "Benjamin Ziza",
                      "@id": editorialPersonId("/a-propos/benjamin-ziza"),
                      url: `https://www.iteradvisors.com${parityHref("/a-propos/benjamin-ziza", locale)}`,
                      jobTitle: getPartnerProfile("benjamin-ziza", locale)?.teamRole,
                      sameAs: "https://www.linkedin.com/in/benjaminziza/",
                    },
                    {
                      "@type": "Person",
                      name: "Guillaume Rostand",
                      "@id": editorialPersonId("/a-propos/guillaume-rostand"),
                      url: `https://www.iteradvisors.com${parityHref("/a-propos/guillaume-rostand", locale)}`,
                      jobTitle: getPartnerProfile("guillaume-rostand", locale)?.teamRole,
                      sameAs: "https://www.linkedin.com/in/rostand/",
                    },
                  ],
                  // SEO-09 (2026-07-01) — sameAs consolidé pour renforcer
                  // l'entité "Iter Advisors" dans le Knowledge Graph. Le
                  // profil Trustfolio est ajouté comme signal third-party
                  // vérifiable qui légitime l'aggregateRating porté par
                  // le Service /daf-externalise (voir DafPage.tsx).
                  sameAs: [
                    "https://www.linkedin.com/company/iter-advisors/",
                    "https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc/reviews",
                    "https://www.youtube.com/@IterAdvisors1",
                  ],
                  // SEO-05 (2026-08-31) — aggregateRating volontairement
                  // absent, ici comme partout : les avis qu'un site porte sur
                  // sa propre organisation sont « self-serving » au sens des
                  // guidelines review-snippet de Google (politique de
                  // septembre 2019) et ne déclenchent aucune étoile en SERP.
                  // L'historique du repo le confirme deux fois : rejets GSC
                  // sur @type Service (2026-07-19), retrait du balisage
                  // self-serving sur les pages villes (2026-05-29).
                  //
                  // Ce commentaire disait auparavant que les Review vivaient
                  // sur /daf-externalise ; le bloc de /daf-externalise disait
                  // l'inverse. Chacun renvoyait à l'autre, personne ne les
                  // portait — et c'était très bien ainsi : la seule voie
                  // restante vers des étoiles est le profil Google Business,
                  // dont les avis alimentent le local pack. Hors code.
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
                  // GEO-P0 (2026-08-02) — SearchAction retiré : le site n'a
                  // aucune route de recherche, /?s={terme} renvoyait
                  // simplement la home (H1 et contenu identiques). Déclarer
                  // une action inexistante est une donnée structurée fausse,
                  // et l'URL avait fini par être indexée. À rétablir le jour
                  // où une vraie recherche interne existe.
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <CookieConsent locale={locale} />
      </body>
    </html>
  );
}

/**
 * Métadonnées communes aux trois root layouts.
 *
 * `openGraph.locale` était figé à `fr_FR` pour tout le site, y compris les 69
 * pages EN et les pages ES. Chaque groupe passe désormais la sienne.
 */
export const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_GB",
  es: "es_ES",
};
