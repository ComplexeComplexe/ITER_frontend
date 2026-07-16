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
        title: "SaaS — Préparation Series A",
        sector: "Tech",
        sectorTag: "SaaS / Tech",
        teamSize: "8 → 20 personnes",
        duration: "6 mois",
        description:
          "EdTechFlow, startup EdTech B2B à 800K€ d'ARR en croissance de 150%, préparait une Series A 3-5M€. Aucun modèle financier, KPIs SaaS non trackés, data room inexistante, comptabilité en retard de 3 mois.",
        challenge:
          "Les VCs (Elaia, Breega, Kima) demandaient des projections sur 3 ans, des KPIs SaaS (CAC, LTV, churn, NRR), une data room structurée et une cap table à jour. Le DSO était à 68 jours (vs 30-45 pour le secteur) et 45K€ d'impayés dormaient. Les cofondateurs techniques ne savaient pas combien de mois de runway il leur restait.",
        solution:
          "DAF externalisé missionné 6 mois avant la cible de levée. Mise en place de Pennylane (compta) et Agicap (trésorerie), nettoyage de 3 mois de comptabilité, récupération des 45K€ d'impayés en 2 semaines. Construction d'un modèle financier 3 ans (P&L, cash-flow, balance, unit economics, 12 KPIs SaaS) avec 3 scénarios. Data room avec 15 documents structurés. Accompagnement aux 6 rendez-vous VC, préparation des Q&A, simulations de term sheet.",
        results: [
          "Series A de 3,2M€ levée en 4 mois (vs 6-8 mois attendus)",
          "Valorisation pre-money +40% vs objectif initial (8,5M€ vs 6M€)",
          "12 KPIs SaaS trackés mensuellement (CAC, LTV, churn, NRR, DSO, MRR, ARR…)",
          "DSO réduit de 68 à 34 jours (-50%)",
          "Runway connu précisément (18 mois) — prévisions à 13 semaines sur Agicap",
          "Temps fondateurs sur finance : 20% → < 5% (+2 jours/semaine sur le produit)",
          "Clôture comptable en 5 jours (vs 6 semaines précédemment)",
          "Stack déployé : Pennylane + Agicap + Qonto",
        ],
        quote:
          "Nous pensions que notre produit et notre traction suffiraient pour convaincre les investisseurs. Notre DAF nous a montré que les VCs achètent la vision financière autant que le produit. Le modèle financier qu'il a construit a été le document le plus consulté de notre data room. La valorisation +40% est en grande partie due à la qualité de la préparation financière.",
        quoteAuthor: "Thomas Mercier",
        quoteRole: "CEO & Cofondateur, EdTechFlow",
      },
      {
        slug: "tech-gestion-financiere",
        title: "Startup DeepTech — Gestion Financière",
        sector: "Tech",
        sectorTag: "DeepTech IA",
        teamSize: "12 → 25 personnes",
        duration: "8 mois",
        description:
          "NeuroLab AI, DeepTech NLP juridique à Toulouse, venait de lever 2M€ en amorçage. CEO scientifique gérant l'administratif en parallèle, comptabilité opaque produisant un bilan annuel avec 4 mois de retard, aucun contrôle de gestion, burn rate estimé entre 80K€ et 120K€.",
        challenge:
          "Croissance de 12 à 25 personnes en 12 mois sans structure financière. Le suivi des temps R&D était inexistant, rendant impossible la justification du CIR. Aucune relation bancaire structurée, pas de ligne de trésorerie. Le CEO passait 15h/semaine sur l'admin financière au lieu de la tech.",
        solution:
          "Déploiement de Pennylane, Agicap et Spendesk en 4 semaines. Construction d'un budget annuel détaillé avec hiring plan. Mise en place du suivi des temps R&D via Lucca. Reporting mensuel avec 15 KPIs. Optimisation CIR avec structuration de la documentation technique. Négociation d'une ligne de trésorerie de 300K€ avec BNP. Préparation du dossier Series A.",
        results: [
          "Burn rate connu précisément : 97K€/mois (écart de 40% réduit à 0%)",
          "Runway 14 mois précis — prévisions à 13 semaines",
          "Clôture comptable : 4 mois de retard → 5 jours",
          "CIR optimisé : 45K€ → 185K€ (+311%) via suivi des temps R&D",
          "Ligne de trésorerie de 300K€ négociée avec BNP",
          "Temps CEO sur admin : 15h/semaine → 3h/semaine (+12h sur la tech)",
          "Budget respecté avec écart < 5%",
          "Stack déployé : Pennylane + Agicap + Spendesk + Lucca",
        ],
        quote:
          "Je passais mes week-ends sur Excel à essayer de comprendre où passait l'argent. Notre DAF a transformé notre gestion en 2 mois. Le reporting mensuel est devenu mon outil de décision préféré. Et les 185K€ de CIR — je ne savais même pas qu'on pouvait autant optimiser.",
        quoteAuthor: "Dr. Amélie Rousseau",
        quoteRole: "CEO & Cofondatrice, NeuroLab AI",
      },
      {
        slug: "ecommerce-bfr",
        title: "E-commerce — Optimisation du BFR",
        sector: "ecommerce",
        sectorTag: "E-commerce D2C",
        teamSize: "25 personnes",
        duration: "4 mois",
        description:
          "GreenRoots, marque D2C de cosmétiques naturels à Toulouse, CA 3,5M€ en croissance de 80%. BFR à 800K€ qui asphyxiait la trésorerie : stocks de 90 jours, DSO de 60 jours côté clients B2B, paiement fournisseurs à 30 jours sans négociation.",
        challenge:
          "Le cycle de conversion du cash était à 97 jours (vs 50-60 pour le secteur). Chaque euro de croissance demandait 0,35€ de BFR additionnel — un modèle non soutenable sans injection de capital. Le dirigeant découvrait les tensions de trésorerie quand les virements fournisseurs étaient rejetés.",
        solution:
          "Diagnostic précis du BFR (stocks 450K€, créances 220K€, dettes -130K€). Mise en place d'Agicap pour les prévisions de ventes. Renégociation fournisseurs : commandes progressives, destockage des références en fin de vie (65K€ récupérés). Renégociation des délais clients B2B (60 → 30 jours avec escompte de 2%). Allongement des délais fournisseurs (30 → 48 jours).",
        results: [
          "BFR total : 800K€ → 520K€ (-35%, soit -280K€ de cash libéré)",
          "Cycle de conversion cash : 97 → 58 jours (-40%)",
          "Stocks : 450K€ (90 jours) → 290K€ (52 jours) (-36%)",
          "DSO clients : 60 → 28 jours (-53%)",
          "Délai fournisseurs : 30 → 48 jours (+60%)",
          "Trésorerie : négative → +150K€ positive en 3 mois",
          "Taux de service maintenu à 98,2% malgré la réduction des stocks",
          "Stack déployé : Pennylane + Agicap + Spendesk",
        ],
        quote:
          "Je pensais que la croissance à 80% signifiait que tout allait bien. Notre DAF m'a montré que je finançais mes clients et mes fournisseurs avec ma trésorerie. En 3 mois, il a libéré 280K€ de cash — l'équivalent d'une petite levée de fonds. C'était la différence entre la survie et la croissance sereine.",
        quoteAuthor: "Lucas Martin",
        quoteRole: "CEO & Fondateur, GreenRoots",
      },
      {
        slug: "marketplace-structuration-post-levee",
        title: "Marketplace — Structuration Post-Levée",
        sector: "Tech",
        sectorTag: "Marketplace B2B",
        teamSize: "15 → 40 personnes",
        duration: "6 mois",
        description:
          "BuildConnect, marketplace B2B reliant artisans du bâtiment et fournisseurs de matériaux, basée à Barcelone. Series A 5M€ levée 6 mois avant l'intervention. CEO commercial espagnol sans expertise financière, comptabilité espagnole opaque produisant des documents non compréhensibles.",
        challenge:
          "Croissance prévue de 15 à 40 personnes en 12 mois sans contrôle de gestion. Aucun budget, dépenses approuvées « à la volée », burn rate estimé entre 120 et 180K€. Reporting board inexistant, préparation manuelle de 2-3 jours par board. Ouverture d'un bureau à Paris envisagée sans plan financier.",
        solution:
          "DAF bilingue FR/ES basé à Barcelone. Déploiement de Pennylane, Agicap et Spendesk en 4 semaines. Workflow d'approbation : CEO > 5K€, CFO > 1K€, manager < 1K€. Budget annuel détaillé avec hiring plan. Reporting mensuel avec 12 KPIs (MRR, GMV, take rate, burn rate, runway, CAC, LTV). Board pack mensuel standardisé. Étude financière de l'ouverture Paris (filiale vs succursale, aides régionales).",
        results: [
          "Burn rate connu : 142K€ précis (écart de 33% → 0%)",
          "Clôture comptable : 2 mois de retard → 5 jours",
          "Préparation board : 3 jours manuels → 2 heures (board pack automatisé)",
          "Budget respecté avec écart < 8%",
          "Bureau Paris ouvert en mois 6 (étude + exécution)",
          "Runway 16 mois précis — Agicap + forecasting",
          "Temps CEO sur finance : 12h/semaine → 2h/semaine (+10h sur le business)",
          "Stack déployé : Pennylane (ES/FR) + Agicap + Spendesk + Revolut Business",
        ],
        quote:
          "Après la levée, j'ai découvert que lever des fonds et bien dépenser des fonds sont deux compétences différentes. Notre DAF nous a donné la structure que nous n'avions pas. Le board pack mensuel est devenu notre outil de pilotage — et les investisseurs apprécient la transparence.",
        quoteAuthor: "Carlos Mendez",
        quoteRole: "CEO & Cofondateur, BuildConnect",
      },
      {
        slug: "saas-reporting-mensuel-board",
        title: "SaaS — Reporting Mensuel au Board",
        sector: "Tech",
        sectorTag: "SaaS HR Tech",
        teamSize: "60 personnes",
        duration: "4 mois",
        description:
          "TeamPulse, plateforme SaaS d'engagement collaborateur, CA 5M€, ARR 4,2M€. Series B de 12M€ tout juste levée. COO gérant les opérations et la finance sans expertise approfondie. Reporting trimestriel Excel incomplet alors que les investisseurs exigeaient un reporting mensuel détaillé.",
        challenge:
          "KPIs opérationnels éparpillés : CA dans Stripe, churn dans le backend produit, coûts dans Pennylane, effectifs dans une feuille Excel. Aucune vision unifiée. Forecast inexistant alors que les investisseurs demandaient un forecast trimestriel sur 12 mois. Réunions de direction basées sur des « sentiments » plutôt que des chiffres.",
        solution:
          "Audit de toutes les sources de données. Connexion de Stripe, du backend produit, de Pennylane et de Lucca dans un data warehouse simple (Google Sheets + connecteurs). Dashboard mensuel avec 15 KPIs mis à jour automatiquement le 5ème jour ouvré. Modèle de forecast trimestriel bottom-up + top-down avec 3 scénarios. Comité de direction mensuel data-driven de 2 heures. Formation des VPs à lire et utiliser les KPIs.",
        results: [
          "Reporting mensuel disponible J+5 automatisé (inexistant auparavant)",
          "15 KPIs centralisés dans un dashboard unique (vs 0 auparavant)",
          "Forecast trimestriel sur 12 mois avec 3 scénarios",
          "Temps reporting : 3 jours manuels → 2h automatisé (-93%)",
          "NRR découvert : 108% (expansion > churn)",
          "CAC calculé précisément : 3 200 € (optimisation marketing déclenchée)",
          "Satisfaction board : médiocre → excellente — transparence data",
          "Stack déployé : Pennylane + Agicap + Lucca + Google Data Studio",
        ],
        quote:
          "Notre premier board post-Series B avec le nouveau reporting a été transformateur. Les investisseurs ont dit que c'était le meilleur reporting qu'ils avaient vu chez une startup de notre stade. Mais le vrai gain, c'est interne : mes VPs parlent enfin le même langage financier.",
        quoteAuthor: "Sophie Blanc",
        quoteRole: "COO, TeamPulse",
      },
      {
        slug: "deeptech-financement-public",
        title: "DeepTech — Financement Public",
        sector: "Tech",
        sectorTag: "DeepTech IA Industrielle",
        teamSize: "12 personnes",
        duration: "8 mois",
        description:
          "OptiFactory AI développe des algorithmes d'IA pour l'optimisation des chaînes de production industrielles. Fondée par 3 chercheurs de l'INSA Toulouse. Projet France 2030 de 1,8M€ sur 3 ans (60% subvention BPI + Région Occitanie). Suivi des consommations complexe, reporting BPI trimestriel mobilisant 2-3 jours par trimestre.",
        challenge:
          "Justificatifs éparpillés, risque de reversement BPI estimé à 80-120K€ pour des dépenses non éligibles. CIR sous-optimisé (80% de R&D mais aucune déclaration faute de suivi structuré des temps) — manque à gagner estimé à 120-150K€/an. Tensions de trésorerie récurrentes entre les décaissements BPI trimestriels.",
        solution:
          "Audit complet des subventions, identification des 45K€ de dépenses non éligibles. Suivi des temps via Lucca (saisie quotidienne par projet). Spendesk avec code projet systématique. Template de reporting BPI trimestriel standardisé avec agrégation automatique. Déclaration CIR avec process récurrent. Agicap pour anticiper les décalages de trésorerie. Ligne de trésorerie de 200K€ négociée avec la Caisse d'Épargne.",
        results: [
          "CIR obtenu : 0 → 148K€ (déclaration structurée)",
          "Dépenses non éligibles : 45K€ risquées → 0 (process de validation)",
          "Reporting BPI : 3 jours → 4 heures (-87%)",
          "Reversement BPI risqué : 80-120K€ → 0 (conformité assurée)",
          "Suivi temps R&D : 100% saisi quotidiennement",
          "Ligne de trésorerie de 200K€ négociée",
          "Décaissements BPI anticipés à J+3",
          "Budget France 2030 respecté avec écart < 3%",
          "Stack déployé : Pennylane + Lucca + Spendesk + Agicap",
        ],
        quote:
          "Les subventions publiques sont une bénédiction et un cauchemar administratif à la fois. Notre DAF a transformé le chaos en process. Le CIR de 148K€ — je ne savais même pas qu'on y avait droit à ce niveau. Et le reporting BPI qui passe de 3 jours à 4 heures, c'est 10 jours par an gagnés sur du temps de recherche.",
        quoteAuthor: "Dr. Pierre Fabre",
        quoteRole: "CEO & Cofondateur, OptiFactory AI",
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
    resourcesHref: "/es/recursos",
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
