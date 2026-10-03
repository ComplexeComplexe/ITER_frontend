import { TOOL_PRICING } from "./toolPricing";
export interface Tool {
  slug: string;
  name: string;
  // Refonte outils (2026-07-17) — 4 nouvelles catégories ajoutées :
  // 'recouvrement' (Upflow, LeanPay), 'sirh' (Factorial en plus de Lucca),
  // 'equity' (Carta, Equify), 'reporting' (Power BI).
  category: 'comptabilite' | 'tresorerie' | 'depenses' | 'paie' | 'recouvrement' | 'sirh' | 'equity' | 'reporting';
  categorySlug: string;
  logo: string;
  /** Accessible brand label, without promotional keywords. */
  logoAlt: string;
  website: string;
  implementationTime: string;
  priceRange: string;
  phase: 1 | 2 | 3;
  forWho: string[];
  notForWho: string[];
  experts: ('sebastien' | 'benjamin')[];
  hasVerbatim: boolean;
  shortDescription: string;
}

export const tools: Tool[] = [
  {
    slug: 'pennylane',
    name: 'Pennylane',
    category: 'comptabilite',
    categorySlug: 'logiciels-comptabilite',
    logo: '/images/logos/tools/pennylane-official.png',
    logoAlt: 'Logo Pennylane',
    website: 'https://www.pennylane.com',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["pennylane"].label,
    phase: 1,
    forWho: ["Factures et pièces dans un environnement partagé", "Échanges entre entreprise et cabinet comptable", "Suivi analytique à tester sur vos activités"],
    notForWho: ["Reprise des soldes et des justificatifs à organiser", "Stocks et flux métiers à examiner séparément"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription: "Factures et pièces dans un environnement partagé. Reprise des soldes et des justificatifs à organiser.",
  },
  {
    slug: 'agicap',
    name: 'Agicap',
    category: 'tresorerie',
    categorySlug: 'logiciels-tresorerie',
    logo: '/images/logos/tools/agicap.svg',
    logoAlt: 'Logo Agicap',
    website: 'https://agicap.com/fr/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["agicap"].label,
    phase: 1,
    forWho: ["Suivi des comptes et des flux de trésorerie", "Prévision à confronter aux échéances réelles", "Lecture des postes clients et fournisseurs"],
    notForWho: ["Connexions de chaque banque à confirmer", "Hypothèses de paiement à maintenir"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription: "Suivi des comptes et des flux de trésorerie. Connexions de chaque banque à confirmer.",
  },
  {
    slug: 'spendesk',
    name: 'Spendesk',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: '/images/logos/tools/spendesk.svg',
    logoAlt: 'Logo Spendesk',
    website: 'https://www.spendesk.com',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["spendesk"].label,
    phase: 1,
    forWho: ["Circuit de demandes et d’approbations", "Collecte des dépenses et des justificatifs", "Connexion des dépenses au suivi budgétaire"],
    notForWho: ["Délégations et exceptions à définir", "Export vers le logiciel comptable à tester"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription: "Circuit de demandes et d’approbations. Délégations et exceptions à définir.",
  },
  {
    slug: 'payfit',
    name: 'PayFit',
    category: 'paie',
    categorySlug: 'logiciels-paie',
    logo: '/images/logos/tools/payfit.svg',
    logoAlt: 'Logo PayFit',
    website: 'https://payfit.com/fr/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["payfit"].label,
    phase: 1,
    forWho: ["Paie et données collaborateurs", "Collecte des variables et documents RH", "Accompagnement à préciser selon l’offre"],
    notForWho: ["Convention collective à confirmer", "Responsabilité de production et de contrôle à écrire"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription: "Paie et données collaborateurs. Convention collective à confirmer.",
  },
  // ─── 9 fiches outils ajoutées via TICKET 5 ───────────────────────────
  {
    slug: 'sage',
    name: 'Sage',
    category: 'comptabilite',
    categorySlug: 'logiciels-comptabilite',
    logo: '/images/logos/tools/sage.png',
    logoAlt: 'Logo Sage',
    website: 'https://www.sage.com/fr-fr/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["sage"].label,
    phase: 2,
    forWho: ["Édition et hébergement à identifier"],
    notForWho: ["Migration et modules à chiffrer"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription: "Édition et hébergement à identifier. Migration et modules à chiffrer.",
  },
  {
    slug: 'cegid-loop',
    name: 'Cegid Loop',
    category: 'comptabilite',
    categorySlug: 'logiciels-comptabilite',
    logo: '/images/logos/tools/cegid-loop.png',
    logoAlt: 'Logo Cegid Loop',
    website: 'https://www.cegid.com/fr/solutions/expertise-comptable/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["cegid-loop"].label,
    phase: 2,
    forWho: ["Production comptable avec le cabinet"],
    notForWho: ["Accès entreprise et cabinet à définir"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription:
      "Solution de production comptable et de collaboration entre le cabinet et ses clients. Périmètre et intégrations à confirmer avec le cabinet.",
  },
  {
    slug: 'fygr',
    name: 'Okimia (ex-Fygr)',
    category: 'tresorerie',
    categorySlug: 'logiciels-tresorerie',
    logo: '/images/logos/tools/fygr.png',
    logoAlt: 'Logo Okimia (ex-Fygr)',
    website: 'https://www.okimia.com/fr',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["fygr"].label,
    phase: 1,
    forWho: ["Suivi de trésorerie et prévision"],
    notForWho: ["Connexions et entités à confirmer"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription:
      "Alternative économique à Agicap pour les PME. Visibilité claire sur le cash, prévisions 13 semaines, onboarding express, à 3x moins cher.",
  },
  {
    slug: 'pleo',
    name: 'Pleo',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: '/images/logos/tools/pleo.png',
    logoAlt: 'Logo Pleo',
    website: 'https://www.pleo.io/fr',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["pleo"].label,
    phase: 1,
    forWho: ["Dépenses et justificatifs collaborateurs"],
    notForWho: ["Droits, entités et plafonds à tester"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription:
      "Le Spendesk des petites structures. Onboarding 10 minutes, cartes virtuelles instantanées, intégration Pennylane native.",
  },
  {
    slug: 'silae',
    name: 'Silae',
    category: 'paie',
    categorySlug: 'logiciels-paie',
    logo: '/images/logos/tools/silae.png',
    logoAlt: 'Logo Silae',
    website: 'https://www.silae.fr',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["silae"].label,
    phase: 2,
    forWho: ["Production de paie et données RH"],
    notForWho: ["Convention et prestataire à confirmer"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription:
      "Solution paie pour structures complexes : 600+ CCN couvertes, gestion des temps, multi-statuts. La référence pour BTP et spectacle.",
  },
  {
    slug: 'lucca',
    name: 'Lucca',
    category: 'paie',
    categorySlug: 'logiciels-paie',
    logo: '/images/logos/tools/lucca.png',
    logoAlt: 'Logo Lucca',
    website: 'https://www.lucca.fr',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["lucca"].label,
    phase: 2,
    forWho: ["Données RH, temps et absences"],
    notForWho: ["Modules et interfaces paie à identifier"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription:
      "Suite RH qui va au-delà de la paie. 8 modules intégrés : absences, temps, frais, onboarding, talents. Complément naturel de PayFit.",
  },
  {
    slug: 'qonto',
    name: 'Qonto',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: '/images/logos/tools/qonto.png',
    logoAlt: 'Logo Qonto',
    website: 'https://qonto.com/fr',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["qonto"].label,
    phase: 1,
    forWho: ["Compte professionnel et paiements"],
    notForWho: ["Quotas, pouvoirs et financement à examiner"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription:
      "La banque des entrepreneurs français. IBAN FR, cartes virtuelles instantanées, intégration native Pennylane / Agicap / Spendesk selon le forfait choisi.",
  },
  {
    slug: 'revolut-business',
    name: 'Revolut Business',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: '/images/logos/tools/revolut-business.png',
    logoAlt: 'Logo Revolut Business',
    website: 'https://www.revolut.com/business/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["revolut-business"].label,
    phase: 1,
    forWho: ["Paiements professionnels en devises"],
    notForWho: ["Pays, coordonnées de compte et frais à confirmer"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription:
      "La banque des startups internationales. 30+ devises au taux interbancaire, IBAN GBP/EUR/USD, intégrations Stripe / PayPal / Shopify.",
  },
  {
    slug: 'payhawk',
    name: 'Payhawk',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: '/images/logos/tools/payhawk.png',
    logoAlt: 'Logo Payhawk',
    website: 'https://payhawk.com/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["payhawk"].label,
    phase: 2,
    forWho: ["Dépenses et contrôles par entité"],
    notForWho: ["Pays, devises et connecteurs à tester"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription:
      "Le Spendesk des entreprises internationales. 50+ devises, cartes multi-pays, intégrations ERP (SAP, Oracle, NetSuite), reporting consolidé.",
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Refonte outils (2026-07-17) — 7 outils ajoutés pour combler les gaps
  // du ticket TICKETS-outils-iteradvisors-refonte.md :
  //   - Kyriba (tresorerie groupe ETI)
  //   - Power BI (reporting / dataviz)
  //   - Upflow, LeanPay (recouvrement client B2B)
  //   - Factorial (SIRH France + Espagne)
  //   - Carta, Equify (equity / cap table management)
  // ═══════════════════════════════════════════════════════════════════════

  {
    slug: 'kyriba',
    name: 'Kyriba',
    category: 'tresorerie',
    categorySlug: 'logiciels-tresorerie',
    logo: '',
    logoAlt: 'Logo Kyriba',
    website: 'https://www.kyriba.com/fr/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["kyriba"].label,
    phase: 3,
    forWho: ["Liquidité et trésorerie groupe"],
    notForWho: ["Connectivité bancaire et gouvernance à cadrer"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription:
      "La trésorerie de groupe pour les ETI. Cash pooling multi-devises, hedging intégré, connexion 2 000+ banques via SWIFT. Notre choix ETI 50 M€+.",
  },

  {
    slug: 'power-bi',
    name: 'Power BI',
    category: 'reporting',
    categorySlug: 'reporting-dataviz',
    logo: '',
    logoAlt: 'Logo Power BI',
    website: 'https://powerbi.microsoft.com/fr-fr/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["power-bi"].label,
    phase: 1,
    forWho: ["Modélisation et reporting financier"],
    notForWho: ["Qualité des données et droits de partage à cadrer"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription:
      "Tableaux de bord financiers à partir de sources préparées et rapprochées. Connexions, modèle de données et droits de partage à définir selon vos outils.",
  },

  {
    slug: 'upflow',
    name: 'Upflow',
    category: 'recouvrement',
    categorySlug: 'recouvrement-cash-collection',
    logo: '',
    logoAlt: 'Logo Upflow',
    website: 'https://upflow.io/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["upflow"].label,
    phase: 2,
    forWho: ["Poste clients et relances"],
    notForWho: ["Factures, paiements et litiges à synchroniser"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription:
      "Un outil de suivi du recouvrement client B2B à évaluer selon vos flux de facturation et vos besoins de relance.",
  },

  {
    slug: 'leanpay',
    name: 'LeanPay',
    category: 'recouvrement',
    categorySlug: 'recouvrement-cash-collection',
    logo: '',
    logoAlt: 'Logo LeanPay',
    website: 'https://www.leanpay.io/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["leanpay"].label,
    phase: 2,
    forWho: ["Relances et suivi des créances"],
    notForWho: ["Qualité de la balance et traitement des litiges à vérifier"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription:
      "Une solution de recouvrement à comparer selon les scénarios de relance, les intégrations et le volume de factures.",
  },

  {
    slug: 'factorial',
    name: 'Factorial',
    category: 'sirh',
    categorySlug: 'sirh-rh',
    logo: '',
    logoAlt: 'Logo Factorial',
    website: 'https://factorial.fr/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["factorial"].label,
    phase: 2,
    forWho: ["Données collaborateurs et processus RH"],
    notForWho: ["Modules, paie et droits à préciser"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription:
      "Un SIRH à évaluer pour centraliser les processus RH de vos équipes, en vérifiant les modules et les pays couverts.",
  },

  {
    slug: 'carta',
    name: 'Carta',
    category: 'equity',
    categorySlug: 'equity-cap-table',
    logo: '',
    logoAlt: 'Logo Carta',
    website: 'https://carta.com/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["carta"].label,
    phase: 3,
    forWho: ["Table de capitalisation et actionnariat"],
    notForWho: ["Pays et instruments juridiques à confirmer"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription:
      "Une plateforme de gestion de l’actionnariat à étudier selon la structure du capital et les besoins des investisseurs.",
  },

  {
    slug: 'equify',
    name: 'Equify',
    category: 'equity',
    categorySlug: 'equity-cap-table',
    logo: '',
    logoAlt: 'Logo Equify',
    website: 'https://www.equify.eu/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["equify"].label,
    phase: 2,
    forWho: ["Capitalisation et suivi des instruments"],
    notForWho: ["Historique juridique et habilitations à rapprocher"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription:
      "Une solution de gestion de l’actionnariat à comparer selon les opérations sur le capital et les plans d’intéressement envisagés.",
  },
];

/**
 * Catégories qui ont une page à elles.
 *
 * SEO-ULT §4b (2026-08-15) — les quatre catégories ajoutées en juillet 2026
 * (recouvrement, SIRH, equity, reporting) n'ont pas de page : leur URL
 * redirige vers le hub outils. Les composants qui affichent une catégorie
 * consultent cette liste avant d'en faire un lien.
 *
 * À garder alignée sur `categoryMeta` dans
 * app/(fr)/ressources/outils/[slug]/page.tsx.
 */
export const CATEGORIES_WITH_PAGE = new Set([
  'logiciels-comptabilite',
  'logiciels-tresorerie',
  'gestion-depenses',
  'logiciels-paie',
]);

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: Tool['category']): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

export function getToolsByPhase(phase: 1 | 2 | 3): Tool[] {
  return tools.filter((tool) => tool.phase === phase);
}
