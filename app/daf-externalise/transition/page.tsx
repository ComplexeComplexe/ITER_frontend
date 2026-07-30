import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("fr", "transition")!;
const PAGE_URL = "https://www.iteradvisors.com/daf-externalise/transition";
const PUBLISHED_DATE = "2026-05-15";
const MODIFIED_DATE = "2026-06-07";

export async function generateMetadata(): Promise<Metadata> {
  // T4 (2026-06-07) — title/description optimisées par le ticket :
  // bénéfice + TJM + délai, et OG image dédiée (au lieu de og-default).
  const meta = await buildStrapiMetadata({
    endpoint: "daf-transition-page",
    locale: "fr",
    path: "/daf-externalise/transition",
    localizedPaths: { fr: "/daf-externalise/transition", en: "/en/fractional-cfo/transition", es: "/es/externalizacion-daf/transition" },
    fallbackTitle: "DAF de transition 48 h pour PME et ETI | Iter Advisors",
    fallbackDescription: "DAF de transition (TJM 800-1 500 € HT) opérationnel en 48 à 72 h pour vacance de poste, crise de trésorerie, restructuration ou levée de fonds. PME, ETI, scale-ups.",
  });

  // Override the OG image with a dedicated illustration (the same SVG used
  // as hero) — Vercel will render the SVG into the OG card; for richer
  // results swap to a 1200x630 PNG once design ships one.
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: [
        {
          url: "https://www.iteradvisors.com/images/illustrations/daf-transition.svg",
          width: 1200,
          height: 630,
          alt: "DAF de transition Iter Advisors — intervention en 48 h",
        },
      ],
    },
  };
}

/**
 * Extract FAQ items from the daf-sub content (single source of truth — same
 * array drives the visible accordion in DafSubPage). Each item is stored as
 * "**Question ?** Answer text." in plain text; we split on the first "?**"
 * to get a clean Q/A pair for the JSON-LD payload.
 */
function buildFaqSchema() {
  const faqSection = content.sections.find((s) =>
    s.heading?.toLowerCase().startsWith("faq"),
  );
  if (!faqSection?.content) return null;

  const items = faqSection.content
    .map((raw) => {
      // [\s\S] instead of `.` with `/s` flag — the dotAll flag requires
      // target ≥ ES2018 and tsconfig.json is on ES2017.
      const m = raw.match(/^\*\*(.+?\?)\*\*\s*([\s\S]+)$/);
      if (!m) return null;
      return { question: m[1].trim(), answer: m[2].trim() };
    })
    .filter((x): x is { question: string; answer: string } => x !== null);

  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  const faqSchema = buildFaqSchema();

  // T4 (2026-06-07) — Service + Article schemas en plus du FAQPage déjà
  // ajouté en PR #42. Aligne sur le pattern de
  // /services/comptabilite-externalisation pour les signaux E-E-A-T.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    serviceType: "DAF de transition",
    name: "DAF de Transition pour PME et ETI",
    description: "DAF de transition opérationnel sous 48 h pour PME, ETI et scale-ups : vacance de poste, crise de trésorerie, restructuration, levée de fonds, M&A.",
    provider: { "@id": "https://www.iteradvisors.com/#organization" },
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Espagne" },
    ],
    url: PAGE_URL,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "800",
      highPrice: "1500",
      offerCount: "1",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceType: "https://schema.org/MinimumPrice",
        price: "800",
        priceCurrency: "EUR",
        unitText: "DAY",
      },
    },
  };

  // T#12 (2026-07-18) — JobPosting schema pour signaler à Google que la page
  // est une fiche métier. Booste les rich results sur "daf de transition"
  // dans les SERP "emploi / métier" (APEC-like intent).
  // GSC-07 (2026-07-30): jobLocation/baseSalary/experienceRequirements
  // rebuilt to match the working pattern already validated on
  // /carrieres/fractional-cfo/page.tsx — full address for the Barcelona
  // HQ, city+region for the Paris/Toulouse offices, jobLocationType
  // TELECOMMUTE (the mission is hybrid/remote-friendly across all three),
  // baseSalary (not estimatedSalary, which Google doesn't recognize), and
  // qualifications instead of experienceRequirements (free text — avoids
  // the "invalid enumeration value" warning tied to that property).
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": `${PAGE_URL}#jobposting`,
    title: "DAF de transition",
    description: "Directeur Administratif et Financier de transition intervenant à temps plein pour une mission de 3 à 12 mois. Missions : pilotage de trésorerie en crise, audit éclair, restructuration, préparation levée de fonds ou cession. Démarrage en 48-72 h.",
    hiringOrganization: {
      "@type": "Organization",
      "@id": "https://www.iteradvisors.com/#organization",
      name: "Iter Advisors",
      sameAs: "https://www.iteradvisors.com",
      logo: "https://www.iteradvisors.com/images/logos/logo-og-square.png",
    },
    jobLocation: [
      {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Carrer Casp, 54, 5-1°",
          addressLocality: "Barcelona",
          postalCode: "08010",
          addressRegion: "Catalunya",
          addressCountry: "ES",
        },
      },
      {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Paris",
          addressRegion: "Île-de-France",
          addressCountry: "FR",
        },
      },
      {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Toulouse",
          addressRegion: "Occitanie",
          addressCountry: "FR",
        },
      },
    ],
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Spain" },
    ],
    employmentType: "CONTRACTOR",
    datePosted: PUBLISHED_DATE,
    validThrough: "2027-12-31",
    qualifications: "12 à 20 ans d'expérience en finance d'entreprise, dont au moins 5 ans en poste de DAF ou Directeur Financier",
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: {
        "@type": "QuantitativeValue",
        minValue: 800,
        maxValue: 1500,
        unitText: "DAY",
      },
    },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${PAGE_URL}#article`,
    headline: "DAF de transition : intervention en 48 h pour PME et ETI",
    description: "Guide complet sur le DAF de transition : missions, profil, tarifs (TJM 800-1500 € HT), délais de démarrage, comparatif avec DAF temps partagé / intérim / recrutement.",
    author: {
      "@type": "Person",
      "@id": "https://www.iteradvisors.com/#sebastien-doat",
      name: "Sébastien Doat",
      jobTitle: "Associé fondateur — DAF externalisé & CFO",
      url: "https://www.iteradvisors.com/a-propos",
    },
    datePublished: PUBLISHED_DATE,
    dateModified: MODIFIED_DATE,
    mainEntityOfPage: PAGE_URL,
    publisher: {
      "@type": "Organization",
      "@id": "https://www.iteradvisors.com/#organization",
      name: "Iter Advisors",
    },
  };

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <DafSubPage
        locale="fr"
        content={content}
        cmsNavigation={cmsNavigation}
        heroImage={{
          src: "/images/illustrations/daf-transition.svg",
          alt: "DAF de transition Iter Advisors — passage de relais entre deux directeurs financiers, continuité opérationnelle garantie",
        }}
      />
    </>
  );
}
