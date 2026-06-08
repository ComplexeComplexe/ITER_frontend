import { Metadata } from "next";
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

  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.iteradvisors.com/daf-externalise-paris#financial-service",
    name: "DAF Externalisé Paris — Iter Advisors",
    description:
      "Direction financière externalisée pour startups et PME à Paris et en Île-de-France",
    url: "https://www.iteradvisors.com/daf-externalise-paris",
    telephone: "+33 1 76 54 28 11",
    areaServed: ["FR-75", "FR-92", "FR-93", "FR-94"],
    image: "https://www.iteradvisors.com/images/logos/logo-og-square.png",
    priceRange: "€€",
    offers: [
      {
        "@type": "Offer",
        name: "DAF Externalisé - Formule Starter",
        price: "2000",
        priceCurrency: "EUR",
        description: "À partir de 2 000 €/mois",
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
    title: "DAF externalisé Paris — CFO à temps partagé | Iter Advisors",
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
