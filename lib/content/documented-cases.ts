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
    title: "Seasonly : piloter la marge par canal et financer le BFR",
    summary: "P&L par canal, pilotage des stocks et reporting hebdomadaire : une mission de DAF externalisé pour une marque de beauté multi-canal.",
    proof: "P&L par canal et plan de financement du BFR",
    deliverables: ["P&L distincts pour la vente directe, le retail et les marketplaces", "Suivi des stocks et des besoins de financement", "Plan de financement du besoin en fonds de roulement", "Tableau de bord hebdomadaire pour les dirigeants et actionnaires"],
    limits: "L'évolution de marge publiée est mesurée en points de pourcentage, sur la marge brute consolidée de tous les canaux. La comparaison porte sur deux périodes de douze mois équivalentes, avant et après la mise en place du P&L par canal. Les dates calendaires de ces périodes ne sont pas publiées. Ce résultat est propre à cette mission et ne constitue pas une prévision pour une autre entreprise.",
    offer: { href: "/daf-externalise/ecommerce", label: "DAF externalisé pour le e-commerce" },
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
    modified: "2026-09-05",
  };
});

export function getDocumentedCase(slug: string) {
  return DOCUMENTED_CASES.find(item => item.slug === slug);
}
