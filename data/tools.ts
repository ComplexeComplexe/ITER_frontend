export interface Tool {
  slug: string;
  name: string;
  category: 'comptabilite' | 'tresorerie' | 'depenses' | 'paie';
  categorySlug: string;
  logo: string;
  website: string;
  rating: number;
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
    logo: '/images/logos/tools/pennylane.svg',
    website: 'https://www.pennylane.com',
    rating: 4.5,
    implementationTime: '1-3 semaines',
    priceRange: '39-199 €/mois',
    phase: 1,
    forWho: [
      'Startups SaaS Series A/B (15-50 pers.)',
      'PME de services (10-60 pers.)',
      'E-commerce stock light (20-50 pers.)',
    ],
    notForWho: [
      'Industrie stocks complexes 50+',
      'Immobilisations lourdes',
      'Expert-comptable refusant Pennylane',
    ],
    experts: ['sebastien'],
    hasVerbatim: true,
    shortDescription:
      'Standard pour les startups Series A. API solide, UX moderne, rapprochement bancaire automatique.',
  },
  {
    slug: 'agicap',
    name: 'Agicap',
    category: 'tresorerie',
    categorySlug: 'logiciels-tresorerie',
    logo: '/images/logos/tools/agicap.svg',
    website: 'https://agicap.com/fr/',
    rating: 4.3,
    implementationTime: '2 semaines',
    priceRange: '49-249 €/mois',
    phase: 1,
    forWho: [
      'PME de 10-100 pers.',
      'Startups Series A/B avec besoin de trésorerie prévisionnelle',
      'Groupe avec plusieurs filiales',
    ],
    notForWho: [
      'Treasury desk professionnel (banques)',
      'Très petites structures < 5 pers.',
    ],
    experts: ['benjamin'],
    hasVerbatim: true,
    shortDescription:
      'Pilotage de trésorerie prévisionnelle. Intégration bancaire fluide, scenarios budgétaires, alertes cash.',
  },
  {
    slug: 'spendesk',
    name: 'Spendesk',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: '/images/logos/tools/spendesk.svg',
    website: 'https://www.spendesk.com',
    rating: 4.2,
    implementationTime: '1-2 semaines',
    priceRange: '29-199 €/mois',
    phase: 1,
    forWho: [
      'SaaS avec forte rotation de rôles',
      'PME décentralisées (agences, filiales)',
      'Startups B2B2C',
    ],
    notForWho: [
      'Secteurs ultra-réglementés (défense)',
      'PME avec contrôle de gestion maison très établi',
    ],
    experts: ['sebastien'],
    hasVerbatim: true,
    shortDescription:
      'Gestion des dépenses et notes de frais digitales. Cartes virtuelles, workflows, intégration compta automatique.',
  },
  {
    slug: 'payfit',
    name: 'PayFit',
    category: 'paie',
    categorySlug: 'logiciels-paie',
    logo: '/images/logos/tools/payfit.svg',
    website: 'https://payfit.com/fr/',
    rating: 4.4,
    implementationTime: '1-2 semaines',
    priceRange: '19-99 €/mois + 1-2 €/salarié',
    phase: 1,
    forWho: [
      'Startups de 5-200 pers.',
      'PME digitales',
      'Entreprises avec RH à temps partiel',
    ],
    notForWho: [
      'Très grande structure (500+ pers.)',
      'Secteurs ultra-complexes (droit du travail très spécialisé)',
    ],
    experts: ['sebastien'],
    hasVerbatim: true,
    shortDescription:
      'Paie et RH digital pour startups. Déclarations DSN, URSSAF automatisées, portail collaborateur, gains de temps.',
  },
  // ─── 9 fiches outils ajoutées via TICKET 5 ───────────────────────────
  {
    slug: 'sage',
    name: 'Sage',
    category: 'comptabilite',
    categorySlug: 'logiciels-comptabilite',
    logo: '/images/logos/tools/sage.svg',
    website: 'https://www.sage.com/fr-fr/',
    rating: 3.8,
    implementationTime: '4-12 semaines',
    priceRange: '99-499 €/mois',
    phase: 2,
    forWho: [
      'Industrie et fabrication avec gestion de stocks complexe',
      'PME établies avec immobilisations lourdes',
      'Structures avec comptabilité analytique multi-axes',
      'Entreprises travaillant avec un expert-comptable réseau Sage',
    ],
    notForWho: [
      'Startups SaaS recherchant une UX moderne',
      'Structures < 5 personnes',
      'Entreprises sans stock ni immobilisation significative',
    ],
    experts: ['benjamin'],
    hasVerbatim: true,
    shortDescription:
      'Standard historique de la comptabilité française pour PME industrielles. Stocks complexes, immobilisations, multi-sociétés.',
  },
  {
    slug: 'cegid-loop',
    name: 'Cegid Loop',
    category: 'comptabilite',
    categorySlug: 'logiciels-comptabilite',
    logo: '/images/logos/tools/cegid-loop.svg',
    website: 'https://www.cegid.com/fr/produits/cegid-loop/',
    rating: 3.5,
    implementationTime: '2-6 semaines',
    priceRange: '79-299 €/mois',
    phase: 2,
    forWho: [
      'PME françaises avec expert-comptable réseau Cegid',
      'Retail et distribution multi-magasins',
      'Structures multi-établissements en France',
    ],
    notForWho: [
      'Startups internationales',
      'Structures < 10 personnes',
      'Équipes voulant un écosystème ouvert',
    ],
    experts: ['benjamin'],
    hasVerbatim: true,
    shortDescription:
      "Version cloud de l'écosystème Cegid. Synchronisation native expert-comptable Cegid, modules retail avancés, conformité fiscale française.",
  },
  {
    slug: 'fygr',
    name: 'Fygr',
    category: 'tresorerie',
    categorySlug: 'logiciels-tresorerie',
    logo: '/images/logos/tools/fygr.svg',
    website: 'https://fygr.io',
    rating: 4.0,
    implementationTime: '1-2 jours',
    priceRange: '29-99 €/mois',
    phase: 1,
    forWho: [
      'PME 10-80 pers. avec trésorerie simple',
      'Dirigeants voulant une visibilité rapide',
      'Entreprises avec 1-2 comptes bancaires',
    ],
    notForWho: [
      'Groupes multi-entités avec trésorerie complexe',
      'Structures avec 5+ comptes bancaires',
      'Trésoriers professionnels',
    ],
    experts: ['benjamin'],
    hasVerbatim: true,
    shortDescription:
      "Alternative économique à Agicap pour les PME. Visibilité claire sur le cash, prévisions 13 semaines, onboarding express, à 3x moins cher.",
  },
  {
    slug: 'pleo',
    name: 'Pleo',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: '/images/logos/tools/pleo.svg',
    website: 'https://www.pleo.io/fr',
    rating: 4.3,
    implementationTime: '1-2 jours',
    priceRange: '35-129 €/mois',
    phase: 1,
    forWho: [
      'Startups 5-50 pers. privilégiant la simplicité',
      'Équipes avec < 10 cartes de paiement',
      'Structures voulant un déploiement < 1 jour',
    ],
    notForWho: [
      'Grandes entreprises 200+ pers.',
      "Workflows d'approbation multi-niveaux",
      'Groupes multi-entités',
    ],
    experts: ['sebastien'],
    hasVerbatim: true,
    shortDescription:
      "Le Spendesk des petites structures. Onboarding 10 minutes, cartes virtuelles instantanées, intégration Pennylane native.",
  },
  {
    slug: 'silae',
    name: 'Silae',
    category: 'paie',
    categorySlug: 'logiciels-paie',
    logo: '/images/logos/tools/silae.svg',
    website: 'https://www.silae.fr',
    rating: 3.9,
    implementationTime: '2-4 semaines',
    priceRange: '49-199 €/mois',
    phase: 2,
    forWho: [
      'PME françaises avec paie complexe',
      "Multi-conventions au sein d'une même entreprise",
      'BTP, spectacle, maritime',
      'Gestion des temps et pointage intégrée',
    ],
    notForWho: [
      'Startups avec paie standard < 10 salariés',
      'Structures 100% forfait jours',
      'Entreprises cherchant une UX ultra-moderne',
    ],
    experts: ['benjamin'],
    hasVerbatim: true,
    shortDescription:
      "Solution paie pour structures complexes : 600+ CCN couvertes, gestion des temps, multi-statuts. La référence pour BTP et spectacle.",
  },
  {
    slug: 'lucca',
    name: 'Lucca',
    category: 'paie',
    categorySlug: 'logiciels-paie',
    logo: '/images/logos/tools/lucca.svg',
    website: 'https://www.lucca.fr',
    rating: 4.1,
    implementationTime: '2-4 semaines',
    priceRange: '39-149 €/mois',
    phase: 2,
    forWho: [
      'PME 20-200 pers. cherchant une suite RH complète',
      'Gestion absences, temps, notes de frais à centraliser',
      'Entreprises voulant un portail collaborateur complet',
    ],
    notForWho: [
      'Entreprises < 15 personnes (PayFit suffit)',
      'Structures sans admin RH dédié',
    ],
    experts: ['benjamin'],
    hasVerbatim: true,
    shortDescription:
      "Suite RH qui va au-delà de la paie. 8 modules intégrés : absences, temps, frais, onboarding, talents. Complément naturel de PayFit.",
  },
  {
    slug: 'qonto',
    name: 'Qonto',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: '/images/logos/tools/qonto.svg',
    website: 'https://qonto.com/fr',
    rating: 4.4,
    implementationTime: '1 jour',
    priceRange: '9-79 €/mois',
    phase: 1,
    forWho: [
      'TPE et PME françaises',
      'Startups voulant un compte pro en < 24h',
      "Entreprises privilégiant l'intégration comptable native",
      'Structures avec flux France / Europe principalement',
    ],
    notForWho: [
      'Groupes avec trésorerie complexe et crédits structurés',
      'Flux internationaux lourds hors Europe',
      'Dépôts en espèces importants',
    ],
    experts: ['sebastien'],
    hasVerbatim: true,
    shortDescription:
      "La banque des entrepreneurs français. IBAN FR, cartes virtuelles instantanées, intégration native Pennylane / Agicap / Spendesk dès 9 €/mois.",
  },
  {
    slug: 'revolut-business',
    name: 'Revolut Business',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: '/images/logos/tools/revolut-business.svg',
    website: 'https://www.revolut.com/business/',
    rating: 4.2,
    implementationTime: '1 jour',
    priceRange: '0-139 €/mois',
    phase: 1,
    forWho: [
      'Startups internationales multi-pays',
      'E-commerce cross-border avec flux en plusieurs devises',
      "Équipes distribuées à l'international",
    ],
    notForWho: [
      'PME 100% françaises sans flux internationaux',
      'Besoin de crédit bancaire structuré',
      'Préférence pour le support téléphonique humain',
    ],
    experts: ['sebastien'],
    hasVerbatim: true,
    shortDescription:
      "La banque des startups internationales. 30+ devises au taux interbancaire, IBAN GBP/EUR/USD, intégrations Stripe / PayPal / Shopify.",
  },
  {
    slug: 'payhawk',
    name: 'Payhawk',
    category: 'depenses',
    categorySlug: 'gestion-depenses',
    logo: '/images/logos/tools/payhawk.svg',
    website: 'https://payhawk.com/',
    rating: 4.1,
    implementationTime: '2-4 semaines',
    priceRange: '149-499 €/mois',
    phase: 2,
    forWho: [
      'PME / ETI 50-500 pers. avec dépenses internationales',
      'Structures utilisant 50+ devises et cartes multi-pays',
      'Reporting avancé par entité / cost center',
      "Workflows d'approbation sophistiqués",
    ],
    notForWho: [
      'TPE < 10 personnes',
      'Structures 100% locales avec peu de dépenses',
      'Startups en seed avec budget outils serré',
    ],
    experts: ['benjamin'],
    hasVerbatim: true,
    shortDescription:
      "Le Spendesk des entreprises internationales. 50+ devises, cartes multi-pays, intégrations ERP (SAP, Oracle, NetSuite), reporting consolidé.",
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: Tool['category']): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

export function getToolsByPhase(phase: 1 | 2 | 3): Tool[] {
  return tools.filter((tool) => tool.phase === phase);
}
