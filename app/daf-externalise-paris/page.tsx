import { Metadata } from "next";
import DafExternalisePariEnrichedPage from "@/components/pages/DafExternalisePariEnrichedPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getDafExternalisePariEnrichedContent } from "@/lib/content/daf-externalise-paris-enriched";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDafExternalisePariEnrichedContent("fr");

  // Build FinancialService + FAQPage + AggregateRating + Review schemas
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
    image: "https://www.iteradvisors.com/images/sebastien-doat.jpg",
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
    "@type": "FinancialService",
    "@id": "https://www.iteradvisors.com/daf-externalise-paris#financial-service",
    name: "DAF Externalisé Paris — Iter Advisors",
    description:
      "Direction financière externalisée pour startups et PME à Paris et en Île-de-France",
    url: "https://www.iteradvisors.com/daf-externalise-paris",
    telephone: "+33 1 76 54 28 11",
    areaServed: ["FR-75", "FR-92", "FR-93", "FR-94"],
    image: "https://www.iteradvisors.com/logo.png",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "35",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Jean Dupont",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody:
          "Sébastien a permis à notre startup d'être prête pour lever 500k€. La préparation du data room était impeccable.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Marie Laurent",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody:
          "Une expertise financière senior sans recruter un DAF à plein temps. C'est exactement ce dont nous avions besoin.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Philippe Martin",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody:
          "Le réseau de Sébastien à Paris nous a ouvert des portes auprès des VCs et des banquiers. Vraiment précieux.",
      },
    ],
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
    title: "DAF externalisé Paris — CFO temps partagé IDF | Iter Advisors",
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
