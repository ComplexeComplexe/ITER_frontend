import { Metadata } from "next";
import ComptabiliteExternalisationPage from "@/components/pages/ComptabiliteExternalisationPage";
import { buildMetadata } from "@/lib/metadata";
import { getComptabiliteExternalisationContent } from "@/lib/content/comptabilite-externalisation";
import { getCmsNavigation } from "@/lib/static-content";

/**
 * SEO-REP §4.2 (2026-08-15) — page reconstruite.
 *
 * Elle rendait `<ServicesPage>`, exactement le même composant que le hub
 * /es/services, avec pour seule différence un H1 surchargé. La similarité
 * Jaccard mesurée entre les deux corps était de 0,96 : ce n'était pas deux
 * pages proches, c'était la même page servie sous deux URL.
 *
 * Elle rend désormais le vrai contenu du service, traduit depuis le français
 * (voir lib/content/comptabilite-externalisation.ts) : neuf sections, deux
 * tableaux, six questions fréquentes, les avis clients et les sources.
 */

export async function generateMetadata(): Promise<Metadata> {
  const t = getComptabiliteExternalisationContent("es");

  const faqSection = t.sections.find((s) => "faqs" in s && s.faqs);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity:
      (faqSection && "faqs" in faqSection ? faqSection.faqs : [])?.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })) ?? [],
  };

  return buildMetadata({
    locale: "es",
    path: "/services/externalizar-contabilidad",
    title: t.meta.title,
    description: t.meta.description,
    structuredData: faqSchema,
    localizedPaths: {
      fr: "/services/comptabilite-externalisation",
      en: "/services/outsource-your-accounting",
      es: "/services/externalizar-contabilidad",
    },
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  const content = getComptabiliteExternalisationContent("es");
  return (
    <ComptabiliteExternalisationPage
      locale="es"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
