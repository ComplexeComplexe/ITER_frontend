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
