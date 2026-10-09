import { getToolSummary } from "./toolSummaries";
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
  /** Plain accessible brand name, without keyword stuffing. */
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
    logo: "/images/logos/tools/pennylane-official.svg",
    logoAlt: "Logo Pennylane",
    website: 'https://www.pennylane.com',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["pennylane"].label,
    phase: 1,
    forWho: ["Factures et pièces dans un environnement partagé", "Échanges entre entreprise et cabinet comptable", "Suivi analytique à tester sur vos activités"],
    notForWho: ["Reprise des soldes et des justificatifs à organiser", "Stocks et flux métiers à examiner séparément"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription: getToolSummary("pennylane"),
  },
  {
    slug: 'agicap',
    name: 'Agicap',
    category: 'tresorerie',
    categorySlug: 'logiciels-tresorerie',
    logo: "/images/logos/tools/agicap-official.png",
    logoAlt: "Logo Agicap",
    website: 'https://agicap.com/fr/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["agicap"].label,
    phase: 1,
    forWho: ["Suivi des comptes et des flux de trésorerie", "Prévision à confronter aux échéances réelles", "Lecture des postes clients et fournisseurs"],
    notForWho: ["Connexions de chaque banque à confirmer", "Hypothèses de paiement à maintenir"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription: getToolSummary("agicap"),
  },
  {
    slug: 'spendesk',
    name: 'Spendesk',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: "/images/logos/tools/spendesk-official.svg",
    logoAlt: "Logo Spendesk",
    website: 'https://www.spendesk.com',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["spendesk"].label,
    phase: 1,
    forWho: ["Circuit de demandes et d’approbations", "Collecte des dépenses et des justificatifs", "Connexion des dépenses au suivi budgétaire"],
    notForWho: ["Délégations et exceptions à définir", "Export vers le logiciel comptable à tester"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription: getToolSummary("spendesk"),
  },
  {
    slug: 'payfit',
    name: 'PayFit',
    category: 'paie',
    categorySlug: 'logiciels-paie',
    logo: "/images/logos/tools/payfit-official.svg",
    logoAlt: "Logo PayFit",
    website: 'https://payfit.com/fr/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["payfit"].label,
    phase: 1,
    forWho: ["Paie et données collaborateurs", "Collecte des variables et documents RH", "Accompagnement à préciser selon l’offre"],
    notForWho: ["Convention collective à confirmer", "Responsabilité de production et de contrôle à écrire"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription: getToolSummary("payfit"),
  },
  // ─── 9 fiches outils ajoutées via TICKET 5 ───────────────────────────
  {
    slug: 'sage',
    name: 'Sage',
    category: 'comptabilite',
    categorySlug: 'logiciels-comptabilite',
    logo: '/images/logos/tools/sage.png',
    logoAlt: "Logo Sage",
    website: 'https://www.sage.com/fr-fr/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["sage"].label,
    phase: 2,
    forWho: ["Édition et hébergement à identifier"],
    notForWho: ["Migration et modules à chiffrer"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription: getToolSummary("sage"),
  },
  {
    slug: 'cegid-loop',
    name: 'Cegid Loop',
    category: 'comptabilite',
    categorySlug: 'logiciels-comptabilite',
    logo: "/images/logos/tools/cegid-loop-official.svg",
    logoAlt: "Logo Cegid Loop",
    website: 'https://www.cegid.com/fr/solutions/expertise-comptable/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["cegid-loop"].label,
    phase: 2,
    forWho: ["Production comptable avec le cabinet"],
    notForWho: ["Accès entreprise et cabinet à définir"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription: getToolSummary("cegid-loop"),
  },
  {
    slug: 'okimia',
    name: 'Okimia',
    category: 'tresorerie',
    categorySlug: 'logiciels-tresorerie',
    logo: "/images/logos/tools/fygr-official.svg",
    logoAlt: "Logo Okimia",
    website: 'https://www.okimia.com/fr',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["okimia"].label,
    phase: 1,
    forWho: ["Suivi de trésorerie et prévision"],
    notForWho: ["Connexions et entités à confirmer"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription: getToolSummary("okimia"),
  },
  {
    slug: 'pleo',
    name: 'Pleo',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: "/images/logos/tools/pleo-official.svg",
    logoAlt: "Logo Pleo",
    website: 'https://www.pleo.io/fr',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["pleo"].label,
    phase: 1,
    forWho: ["Dépenses et justificatifs collaborateurs"],
    notForWho: ["Droits, entités et plafonds à tester"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription: getToolSummary("pleo"),
  },
  {
    slug: 'silae',
    name: 'Silae',
    category: 'paie',
    categorySlug: 'logiciels-paie',
    logo: "/images/logos/tools/silae-official.svg",
    logoAlt: "Logo Silae",
    website: 'https://www.silae.fr',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["silae"].label,
    phase: 2,
    forWho: ["Production de paie et données RH"],
    notForWho: ["Convention et prestataire à confirmer"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription: getToolSummary("silae"),
  },
  {
    slug: 'lucca',
    name: 'Lucca',
    category: 'paie',
    categorySlug: 'logiciels-paie',
    logo: "/images/logos/tools/lucca-official.svg",
    logoAlt: "Logo Lucca",
    website: 'https://www.lucca.fr',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["lucca"].label,
    phase: 2,
    forWho: ["Données RH, temps et absences"],
    notForWho: ["Modules et interfaces paie à identifier"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription: getToolSummary("lucca"),
  },
  {
    slug: 'qonto',
    name: 'Qonto',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: "/images/logos/tools/qonto-official.svg",
    logoAlt: "Logo Qonto",
    website: 'https://qonto.com/fr',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["qonto"].label,
    phase: 1,
    forWho: ["Compte professionnel et paiements"],
    notForWho: ["Quotas, pouvoirs et financement à examiner"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription: getToolSummary("qonto"),
  },
  {
    slug: 'revolut-business',
    name: 'Revolut Business',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: "/images/logos/tools/revolut-business-official.svg",
    logoAlt: "Logo Revolut Business",
    website: 'https://www.revolut.com/business/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["revolut-business"].label,
    phase: 1,
    forWho: ["Paiements professionnels en devises"],
    notForWho: ["Pays, coordonnées de compte et frais à confirmer"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription: getToolSummary("revolut-business"),
  },
  {
    slug: 'payhawk',
    name: 'Payhawk',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: "/images/logos/tools/payhawk-official.svg",
    logoAlt: "Logo Payhawk",
    website: 'https://payhawk.com/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["payhawk"].label,
    phase: 2,
    forWho: ["Dépenses et contrôles par entité"],
    notForWho: ["Pays, devises et connecteurs à tester"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription: getToolSummary("payhawk"),
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
    logo: "/images/logos/tools/kyriba-official.svg",
    logoAlt: "Logo Kyriba",
    website: 'https://www.kyriba.com/fr/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["kyriba"].label,
    phase: 3,
    forWho: ["Liquidité et trésorerie groupe"],
    notForWho: ["Connectivité bancaire et gouvernance à cadrer"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription: getToolSummary("kyriba"),
  },

  {
    slug: 'power-bi',
    name: 'Power BI',
    category: 'reporting',
    categorySlug: 'reporting-dataviz',
    logo: "/images/logos/tools/power-bi-official.svg",
    logoAlt: "Logo Power BI",
    website: 'https://powerbi.microsoft.com/fr-fr/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["power-bi"].label,
    phase: 1,
    forWho: ["Modélisation et reporting financier"],
    notForWho: ["Qualité des données et droits de partage à cadrer"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription: getToolSummary("power-bi"),
  },

  {
    slug: 'upflow',
    name: 'Upflow',
    category: 'recouvrement',
    categorySlug: 'recouvrement-cash-collection',
    logo: "/images/logos/tools/upflow-official.png",
    logoAlt: "Logo Upflow",
    website: 'https://upflow.io/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["upflow"].label,
    phase: 2,
    forWho: ["Poste clients et relances"],
    notForWho: ["Factures, paiements et litiges à synchroniser"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription: getToolSummary("upflow"),
  },

  {
    slug: 'leanpay',
    name: 'LeanPay',
    category: 'recouvrement',
    categorySlug: 'recouvrement-cash-collection',
    logo: "/images/logos/tools/leanpay-official.svg",
    logoAlt: "Logo LeanPay",
    website: 'https://www.leanpay.io/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["leanpay"].label,
    phase: 2,
    forWho: ["Relances et suivi des créances"],
    notForWho: ["Qualité de la balance et traitement des litiges à vérifier"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription: getToolSummary("leanpay"),
  },

  {
    slug: 'factorial',
    name: 'Factorial',
    category: 'sirh',
    categorySlug: 'sirh-rh',
    logo: "/images/logos/tools/factorial-official.svg",
    logoAlt: "Logo Factorial",
    website: 'https://factorial.fr/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["factorial"].label,
    phase: 2,
    forWho: ["Données collaborateurs et processus RH"],
    notForWho: ["Modules, paie et droits à préciser"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription: getToolSummary("factorial"),
  },

  {
    slug: 'carta',
    name: 'Carta',
    category: 'equity',
    categorySlug: 'equity-cap-table',
    logo: "/images/logos/tools/carta-official.svg",
    logoAlt: "Logo Carta",
    website: 'https://carta.com/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["carta"].label,
    phase: 3,
    forWho: ["Table de capitalisation et actionnariat"],
    notForWho: ["Pays et instruments juridiques à confirmer"],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription: getToolSummary("carta"),
  },

  {
    slug: 'equify',
    name: 'Equify',
    category: 'equity',
    categorySlug: 'equity-cap-table',
    logo: "/images/logos/tools/equify-official.svg",
    logoAlt: "Logo Equify",
    website: 'https://www.equify.eu/',
    implementationTime: 'À cadrer après reprise et tests',
    priceRange: TOOL_PRICING["equify"].label,
    phase: 2,
    forWho: ["Capitalisation et suivi des instruments"],
    notForWho: ["Historique juridique et habilitations à rapprocher"],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription: getToolSummary("equify"),
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
