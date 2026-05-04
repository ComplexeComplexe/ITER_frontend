import { Locale } from "../i18n";

export interface CaseStudy {
  slug: string;
  title: string;
  sector: string;
  sectorTag: string;
  teamSize: string;
  duration: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
}

export interface CaseStudiesContent {
  meta: {
    title: string;
    description: string;
  };
  h1: string;
  intro: string;
  resourcesLabel: string;
  resourcesHref: string;
  breadcrumbLabel: string;
  challengeLabel: string;
  solutionLabel: string;
  resultsLabel: string;
  filterAll: string;
  filterConseil: string;
  filterEcommerce: string;
  caseStudies: CaseStudy[];
}

const content: Record<Locale, CaseStudiesContent> = {
  fr: {
    meta: {
      title: "Cas Pratiques - Iter Advisors",
      description:
        "Découvrez comment nos clients ont structuré et optimisé leurs finances. Cas pratiques SaaS, e-commerce, consulting et fintech.",
    },
    h1: "Cas Pratiques",
    intro:
      "Découvrez comment nos clients ont transformé leur gestion financière. Des startups SaaS aux e-commerce, voici leurs histoires de succès.",
    resourcesLabel: "Ressources",
    resourcesHref: "/ressources",
    breadcrumbLabel: "Cas pratiques",
    challengeLabel: "Défi",
    solutionLabel: "Solution",
    resultsLabel: "Résultats",
    filterAll: "Tous",
    filterConseil: "Consulting",
    filterEcommerce: "E-commerce",
    caseStudies: [
      {
        slug: "saas-series-a",
        title: "SaaS - Préparation Series A",
        sector: "Tech",
        sectorTag: "SaaS / Tech",
        teamSize: "5-10 people",
        duration: "6 mois",
        description:
          "Une startup SaaS à 1,2M€ ARR prépare sa levée Series A.",
        challenge:
          "Fondateurs techniquement forts mais sans expertise financière. Besoin urgent d'un modèle financier validé par les investisseurs et d'une data room organisée.",
        solution:
          "Nous avons construit un modèle financier 3-5 ans basé sur des hypothèses réalistes, créé des dashboards d'investisseur, et organisé une data room complète avec tous les documents requis.",
        results: [
          "Modèle financier validé par les investisseurs",
          "KPI dashboards en temps réel (MRR, CAC, LTV, Burn)",
          "Data room organisée et conforme",
          "Négociation réussie de la valorisation",
        ],
        quote:
          "Iter Advisors a transformé notre jungle d'Excel en un story financier cohérent. Les investisseurs ont eu confiance dès la première réunion.",
        quoteAuthor: "Marie Dupont",
        quoteRole: "CEO, SaaS FinTech",
      },
      {
        slug: "tech-gestion-financiere",
        title: "Startup Tech - Gestion Financière",
        sector: "Tech",
        sectorTag: "Tech / Deeptech",
        teamSize: "8-15 people",
        duration: "12 mois",
        description:
          "Fondateurs sans background finance. Nous avons structuré depuis zéro leur reporting et contrôles.",
        challenge:
          "Croissance rapide (3x ARR en 1 an) mais aucune visibilité financière. Équipe focus sur le produit, aucun pilotage des coûts ni budgeting.",
        solution:
          "Audit initial complet, mise en place d'un reporting mensuel, création de dashboards KPI par produit, budgeting trimestriel avec forecasting.",
        results: [
          "Reporting financier mensuel fiable et auditable",
          "Budgeting et forecasting en place",
          "Analyses unit economics par produit/client",
          "Visibility accrue pour l'équipe et les investisseurs",
        ],
        quote:
          "Maintenant je sais où va chaque euro. Les décisions sont data-driven, pas basées sur des intuitions.",
        quoteAuthor: "Thomas Leclerc",
        quoteRole: "CTO & Founder, DeepTech AI",
      },
      {
        slug: "ecommerce-cashflow",
        title: "E-commerce - Optimisation de Trésorerie",
        sector: "ecommerce",
        sectorTag: "E-commerce",
        teamSize: "20-50 people",
        duration: "10 mois",
        description:
          "Croissance rapide mais cash flow imprévisible. Optimisation urgente requise.",
        challenge:
          "Revenue croissance de 100% YoY mais trésorerie bloquée. Stock accumulation, délais de paiement fournisseurs vs clients problématiques. Risk de cash-out dans 4 mois.",
        solution:
          "Diagnostic du BFR, optimisation des délais de paiement (négociation fournisseurs), réduction du stock, prévisionnel de trésorerie 13 semaines.",
        results: [
          "Prévisionnel de trésorerie 13 semaines mis en place",
          "Délais fournisseurs réduits de 60 à 45 jours",
          "Stock optimisé, rotation améliorée de 20%",
          "Cash runway allongé de 5 mois sans financement additionnel",
        ],
        quote:
          "On aurait pu manquer de cash à cause de la croissance. Maintenant on gère proactivement.",
        quoteAuthor: "Sophie Martin",
        quoteRole: "Founder, E-commerce Fashion",
      },
    ],
  },
  en: {
    meta: {
      title: "Case Studies - Iter Advisors",
      description:
        "See how our clients structured and optimized their finances. Case studies in SaaS, e-commerce, consulting, and fintech.",
    },
    h1: "Case Studies",
    intro:
      "Discover how our clients transformed their financial management. From SaaS startups to e-commerce platforms, here are their success stories.",
    resourcesLabel: "Resources",
    resourcesHref: "/en/ressources",
    breadcrumbLabel: "Case studies",
    challengeLabel: "Challenge",
    solutionLabel: "Solution",
    resultsLabel: "Results",
    filterAll: "All",
    filterConseil: "Consulting",
    filterEcommerce: "E-commerce",
    caseStudies: [
      {
        slug: "saas-series-a",
        title: "SaaS - Series A Fundraising",
        sector: "Tech",
        sectorTag: "SaaS / Tech",
        teamSize: "5-10 people",
        duration: "6 months",
        description:
          "A SaaS startup at €1.2M ARR preparing for Series A.",
        challenge:
          "Technically strong founders but no financial expertise. Urgent need for investor-grade financial model and organized data room.",
        solution:
          "Built a 3-5 year financial model with realistic assumptions, created investor dashboards, organized complete data room with all required documents.",
        results: [
          "Financial model validated by investors",
          "Real-time investor KPI dashboards (MRR, CAC, LTV, Burn)",
          "Organized and compliant data room",
          "Successful valuation negotiation",
        ],
        quote:
          "Iter Advisors turned our Excel jungle into a coherent financial story. Investors were confident from the first meeting.",
        quoteAuthor: "Marie Dupont",
        quoteRole: "CEO, SaaS FinTech",
      },
      {
        slug: "tech-gestion-financiere",
        title: "Fintech - Financial Metrics & Reporting",
        sector: "Tech",
        sectorTag: "Fintech",
        teamSize: "8-15 people",
        duration: "12 months",
        description:
          "Founders with no financial background. We structured reporting from scratch.",
        challenge:
          "Fast growth (3x ARR in 1 year) but zero financial visibility. Team focused on product, no cost management or budgeting.",
        solution:
          "Complete initial audit, monthly reporting setup, product-level KPI dashboards, quarterly budgeting with forecasting.",
        results: [
          "Reliable monthly financial reporting",
          "Budgeting and forecasting framework",
          "Unit economics analysis by product",
          "Improved visibility for leadership and investors",
        ],
        quote:
          "Now I know where every euro goes. Decisions are data-driven, not gut-based.",
        quoteAuthor: "Thomas Leclerc",
        quoteRole: "CTO & Founder, DeepTech AI",
      },
      {
        slug: "ecommerce-cashflow",
        title: "E-commerce - Cash Flow Optimization",
        sector: "ecommerce",
        sectorTag: "E-commerce",
        teamSize: "20-50 people",
        duration: "10 months",
        description:
          "Rapid growth but unpredictable cash flow requiring urgent optimization.",
        challenge:
          "100% YoY revenue growth but cash blocked. Stock accumulation, supplier vs customer payment timing problems. Risk of cash-out in 4 months.",
        solution:
          "Working capital diagnosis, payment cycle optimization (supplier negotiations), stock reduction, 13-week rolling cash forecast.",
        results: [
          "13-week rolling cash forecast implemented",
          "Supplier payment terms reduced from 60 to 45 days",
          "Stock optimized, inventory rotation improved 20%",
          "5+ month additional runway without external funding",
        ],
        quote:
          "We could have run out of cash due to growth. Now we manage proactively.",
        quoteAuthor: "Sophie Martin",
        quoteRole: "Founder, E-commerce Fashion",
      },
    ],
  },
  es: {
    meta: {
      title: "Casos Prácticos - Iter Advisors",
      description:
        "Descubre cómo nuestros clientes estructuraron y optimizaron sus finanzas. Casos prácticos en SaaS, e-commerce, consulting y fintech.",
    },
    h1: "Casos Prácticos",
    intro:
      "Descubre cómo nuestros clientes transformaron su gestión financiera. Desde startups SaaS hasta plataformas de e-commerce, aquí están sus historias de éxito.",
    resourcesLabel: "Recursos",
    resourcesHref: "/es/ressources",
    breadcrumbLabel: "Casos prácticos",
    challengeLabel: "Desafío",
    solutionLabel: "Solución",
    resultsLabel: "Resultados",
    filterAll: "Todos",
    filterConseil: "Consulting",
    filterEcommerce: "E-commerce",
    caseStudies: [
      {
        slug: "saas-series-a",
        title: "SaaS - Recaudación Series A",
        sector: "Tech",
        sectorTag: "SaaS / Tech",
        teamSize: "5-10 personas",
        duration: "6 meses",
        description:
          "Startup SaaS con €1.2M ARR preparándose para Series A.",
        challenge:
          "Fundadores técnicamente fuertes pero sin expertise financiera. Necesidad urgente de modelo financiero validado por inversores y data room organizada.",
        solution:
          "Construimos modelo financiero 3-5 años con supuestos realistas, creamos dashboards de inversores, organizamos data room completa con documentos requeridos.",
        results: [
          "Modelo financiero validado por inversores",
          "Dashboards KPI en tiempo real",
          "Data room organizada y conforme",
          "Negociación exitosa de valoración",
        ],
        quote:
          "Iter Advisors convirtió nuestro caos de Excel en una historia financiera coherente. Los inversores confiaron desde la primera reunión.",
        quoteAuthor: "Marie Dupont",
        quoteRole: "CEO, SaaS FinTech",
      },
      {
        slug: "tech-gestion-financiera",
        title: "Startup Tech - Gestión Financiera",
        sector: "Tech",
        sectorTag: "Tech / Deeptech",
        teamSize: "8-15 personas",
        duration: "12 meses",
        description:
          "Fundadores sin experiencia financiera. Estructuramos reporting desde cero.",
        challenge:
          "Crecimiento rápido (3x ARR en 1 año) pero cero visibilidad financiera. Equipo enfocado en producto, sin gestión de costos ni budgeting.",
        solution:
          "Auditoría inicial completa, reporting mensual, dashboards KPI por producto, budgeting trimestral con forecasting.",
        results: [
          "Reporting financiero mensual confiable",
          "Framework de budgeting y forecasting",
          "Análisis de unit economics por producto",
          "Visibilidad mejorada para liderazgo",
        ],
        quote:
          "Ahora sé dónde va cada euro. Las decisiones son data-driven, no basadas en intuición.",
        quoteAuthor: "Thomas Leclerc",
        quoteRole: "CTO & Founder, DeepTech AI",
      },
      {
        slug: "ecommerce-cashflow",
        title: "E-commerce - Optimización de Flujo de Caja",
        sector: "ecommerce",
        sectorTag: "E-commerce",
        teamSize: "20-50 personas",
        duration: "10 meses",
        description:
          "Crecimiento rápido pero flujo de caja impredecible requiriendo optimización urgente.",
        challenge:
          "Crecimiento YoY 100% pero efectivo bloqueado. Acumulación de stock, problemas de timing de pagos. Riesgo de insolvencia en 4 meses.",
        solution:
          "Diagnóstico de capital de trabajo, optimización de ciclos de pago (negociaciones), reducción de stock, pronóstico rodante 13 semanas.",
        results: [
          "Pronóstico rodante 13 semanas implementado",
          "Términos de proveedores reducidos de 60 a 45 días",
          "Stock optimizado, rotación mejorada 20%",
          "5+ meses de runway adicional sin financiamiento",
        ],
        quote:
          "Habríamos podido quedarnos sin efectivo por el crecimiento. Ahora lo gestionamos proactivamente.",
        quoteAuthor: "Sophie Martin",
        quoteRole: "Founder, E-commerce Fashion",
      },
    ],
  },
};

export function getCaseStudiesContent(locale: Locale): CaseStudiesContent {
  return content[locale];
}
