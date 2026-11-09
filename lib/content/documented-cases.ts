import { getCaseStudiesContent } from "./case-studies";

/** Dedicated pages are limited to the three named cases documented in the
 * editorial source. Anonymous scenarios are not promoted to client evidence. */
const caseDetails = [
  {
    slug: "solarmente-serie-b-cleantech",
    company: "SolarMente",
    metaTitle: "SolarMente : levée et structuration finance | Iter Advisors",
    title: "SolarMente : structurer la finance pour une levée et une acquisition",
    summary: "Modèle financier, data room, reporting au conseil et intégration financière : le travail d'un CFO externalisé dans une cleantech en croissance.",
    proof: "Modèle multi-scénarios, data room et reporting au conseil",
    results: ["Préparation financière de la levée de fonds internationale", "Acquisition d'Eltex en 2024 et intégration de la fonction finance", "Modèle multi-scénarios, data room et procédures de contrôle du cash mis en place"],
    deliverables: ["Modèle financier multi-scénarios et critères d'arbitrage", "Data room et suivi des questions de due diligence", "Reporting au conseil et procédures de contrôle de trésorerie", "Intégration financière de l'acquisition d'Eltex en 2024"],
    limits: "Le cas couvre la période 2022–2024. Les opérations ont mobilisé les dirigeants, les investisseurs et leurs conseils. Le rôle décrit ici est celui de la direction financière ; leur réussite ne peut pas être attribuée au seul accompagnement d'Iter.",
    offer: { href: "/services/accompagnement-levee-de-fond", label: "Accompagnement en levée de fonds" },
    source: { href: "https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc", label: "Témoignage de Victor Gardrinier, cofondateur de SolarMente, sur Trustfolio" },
  },
  {
    slug: "seasonly-marge-par-canal-bfr",
    company: "Seasonly",
    metaTitle: "Seasonly : marge par canal et BFR | Iter Advisors",
    title: "Seasonly, de la passation au suivi des marges par canal",
    summary: "Comment Iter a repris la direction financière de Seasonly et mis en place un suivi de la marge par canal, des stocks et de la trésorerie.",
    proof: "Comptes de résultat par canal et suivi hebdomadaire de trésorerie",
    deliverables: ["Audit des flux, des stocks et du reporting", "Comptes de résultat par canal pour les studios, le retail, le e-commerce et le B2B", "Tableaux de bord et prévisionnel de trésorerie hebdomadaires", "Suivi du besoin en fonds de roulement"],
    limits: "Les éléments présentés portent sur les travaux et livrables de la mission. Le témoignage public de la direction porte sur la continuité de la fonction finance.",
    offer: { href: "/daf-externalise/ecommerce", label: "DAF externalisé pour le e-commerce" },
    source: { href: "https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc", label: "Témoignage de la direction de Seasonly sur Trustfolio" },
    relatedService: { href: "/services/controle-de-gestion-externalise", label: "contrôle de gestion externalisé" },
  },
  {
    slug: "opti-digital-structuration-financement",
    company: "Opti Digital",
    metaTitle: "Opti Digital : structurer la finance | Iter Advisors",
    title: "Opti Digital : structurer la fonction finance dans la durée",
    summary: "Migration ERP, reporting, clôture et financement non dilutif : comment Iter accompagne une PME adtech dans la structuration de sa fonction finance.",
    proof: "Fonction finance structurée et financement non dilutif",
    deliverables: ["Reporting mensuel et procédures de clôture", "Migration de l'ERP et organisation des processus financiers", "Accompagnement au financement non dilutif", "Coordination des sujets fiscaux et juridiques avec les conseils externes"],
    limits: "Le témoignage de la dirigeante, publié le 12 novembre 2025, décrit cinq années de collaboration à cette date. Les résultats de cette page restent qualitatifs : aucun montant de financement ni gain de productivité chiffré n'est annoncé.",
    offer: { href: "/daf-externalise/temps-partage", label: "DAF à temps partagé pour une PME" },
    source: { href: "https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc", label: "Témoignage de Magali Quentel-Reme, CEO d'Opti Digital, sur Trustfolio" },
  },
] as const;

export const DOCUMENTED_CASES = caseDetails.map(detail => {
  const original = getCaseStudiesContent("fr").caseStudies.find(item => item.slug === detail.slug);
  if (!original) throw new Error(`Missing documented case: ${detail.slug}`);
  return {
    ...original,
    ...detail,
    href: `/ressources/cas-clients/${detail.slug}`,
    published: "2026-09-05",
    modified: detail.slug === "seasonly-marge-par-canal-bfr" ? "2026-11-09" : "2026-09-26",
  };
});

export function getDocumentedCase(slug: string) {
  return DOCUMENTED_CASES.find(item => item.slug === slug);
}
