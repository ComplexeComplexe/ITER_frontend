import { Metadata } from "next";
import { FORMULES } from "@/lib/content/facts";
import DafExternalisePariEnrichedPage from "@/components/pages/DafExternalisePariEnrichedPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getDafExternalisePariEnrichedContent } from "@/lib/content/daf-externalise-paris-enriched";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDafExternalisePariEnrichedContent("fr");

  // Build ProfessionalService + FAQPage + AggregateRating + Review schemas
  // (T4 / 2026-06-07: comment sync — actual @type emitted is
  // ProfessionalService, see DafLocalPage component output.)
  const faqSection = t.sections.find((s: any) => s.faqs);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity:
      faqSection?.faqs?.map((faq: any) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: `.faq-answer-${faq.question.toLowerCase().replace(/\s+/g, "-")}`,
          },
        },
      })) || [],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.iteradvisors.com#sebastien-doat",
    name: "Sébastien Doat",
    jobTitle: "Co-fondateur & CFO Advisor",
    url: "https://www.linkedin.com/in/sebastiendoat",
    sameAs: "https://www.linkedin.com/in/sebastiendoat",
    // Ahrefs T-404 (2026-06-08): was /images/sebastien-doat.jpg → 400/404.
    image: "https://www.iteradvisors.com/images/team/sebastien-doat.webp",
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://www.iteradvisors.com/daf-externalise-paris#article",
    headline: "DAF externalisé Paris : CFO à temps partagé en Ile-de-France",
    description: t.meta.description,
    author: {
      "@type": "Person",
      "@id": "https://www.iteradvisors.com#sebastien-doat",
      name: "Sébastien Doat",
    },
    dateModified: new Date().toISOString().split("T")[0],
    articleBody: t.intro.join(" "),
  };

  // SEO-07 (2026-07-01) — Enrichi en LocalBusiness (via ProfessionalService)
  // avec PostalAddress + geo + openingHours + areaServed granulaire. Nourrit
  // le SEO local "daf externalisé paris" et les panneaux locaux Google.
  // Cf. reco-seo-iteradvisors.md §1 "ProfessionalService / LocalBusiness par bureau".
  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.iteradvisors.com/daf-externalise-paris#financial-service",
    name: "Cabinet DAF Paris — Iter Advisors",
    description:
      "Direction financière externalisée pour startups et PME à Paris et en Île-de-France. Cabinet DAF Paris et CFO à temps partagé.",
    url: "https://www.iteradvisors.com/daf-externalise-paris",
    telephone: "+33 1 76 54 28 11",
    // Adresse Paris — bureau opérationnel (à confirmer par le user pour
    // publication en clair dans le footer ; utilisée ici uniquement dans
    // le schema JSON-LD pour le signal SEO local).
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Centre de Paris (2ème arr.) — approximation pour le signal SEO local.
      // À affiner avec l'adresse réelle du bureau si connue.
      latitude: 48.8666,
      longitude: 2.3352,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Paris (75)" },
      { "@type": "AdministrativeArea", name: "Hauts-de-Seine (92)" },
      { "@type": "AdministrativeArea", name: "Seine-Saint-Denis (93)" },
      { "@type": "AdministrativeArea", name: "Val-de-Marne (94)" },
    ],
    openingHours: "Mo-Fr 09:00-18:00",
    image: "https://www.iteradvisors.com/images/logos/logo-og-square.png",
    priceRange: "€€",
    parentOrganization: { "@id": "https://www.iteradvisors.com/#organization" },
    // CONTENUS-T10 (2026-08-31) — le nœud se contredisait lui-même :
    // price "2000" et description « À partir de 3 000 € ». La valeur vient
    // désormais de la grille arbitrée.
    offers: [
      {
        "@type": "Offer",
        name: "DAF Externalisé - Formule Essentiel",
        price: String(FORMULES[0].prixMin),
        priceCurrency: "EUR",
        description: `À partir de ${FORMULES[0].prixMin.toLocaleString("fr-FR")} € HT/mois`,
      },
    ],
    // Review-snippet fix (2026-05-29): removed the self-serving aggregateRating
    // and the placeholder Review nodes (generic names, invented quotes). Fake or
    // self-serving reviews violate Google's review-snippet policy. Reintroduce
    // star markup only with genuine, verifiable third-party reviews.
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      financialServiceSchema,
      faqSchema,
      articleSchema,
      personSchema,
    ],
  };

  return buildMetadata({
    locale: "fr",
    path: "/daf-externalise-paris",
    // T2 / PR #50 (2026-06-30) — Title lu depuis t.meta.title (recentrage
    // "Cabinet DAF Paris" pour éliminer la cannibalisation avec le pilier
    // national). L'ancien hardcode "DAF externalisé Paris — CFO à temps
    // partagé" ré-introduisait la cannibalisation.
    title: t.meta.title,
    description: t.meta.description,
    structuredData,
    localizedPaths: {
      fr: "/daf-externalise-paris",
      en: "/outsourced-cfo-paris",
      es: "/cfo-externalizado-paris",
    },
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  const content = getDafExternalisePariEnrichedContent("fr");
  return (
    <DafExternalisePariEnrichedPage
      locale="fr"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
