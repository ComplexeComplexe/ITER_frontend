export interface Tool {
  slug: string;
  name: string;
  // Refonte outils (2026-07-17) — 4 nouvelles catégories ajoutées :
  // 'recouvrement' (Upflow, LeanPay), 'sirh' (Factorial en plus de Lucca),
  // 'equity' (Carta, Equify), 'reporting' (Power BI).
  category: 'comptabilite' | 'tresorerie' | 'depenses' | 'paie' | 'recouvrement' | 'sirh' | 'equity' | 'reporting';
  categorySlug: string;
  logo: string;
  /**
   * SEO-optimized alt text rendered on the `<Image>` of the logo wherever
   * the tool appears (card, hero, stack combo, comparison table). Includes
   * the brand name + a short positioning keyword so it contributes to the
   * page's semantic context rather than the generic "Logo {name}" placeholder.
   */
  logoAlt: string;
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
    logoAlt: 'Logo Pennylane — logiciel de comptabilité en ligne pour startups et PME',
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
    logoAlt: 'Logo Agicap — logiciel de prévision de trésorerie pour PME',
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
    logoAlt: 'Logo Spendesk — logiciel de gestion des dépenses et notes de frais pour scale-ups',
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
    logoAlt: 'Logo PayFit — logiciel de paie et DSN automatisé pour startups et PME',
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
    logo: '/images/logos/tools/sage.png',
    logoAlt: 'Logo Sage — logiciel comptable historique pour PME industrielles et multi-sociétés',
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
    logo: '/images/logos/tools/cegid-loop.png',
    logoAlt: 'Logo Cegid Loop — logiciel comptable cloud pour PME et retail multi-établissements',
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
    logo: '/images/logos/tools/fygr.png',
    logoAlt: 'Logo Fygr — outil de trésorerie économique pour PME 10-80 salariés',
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
    logo: '/images/logos/tools/pleo.png',
    logoAlt: 'Logo Pleo — cartes de paiement et gestion des dépenses pour startups en seed',
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
    logo: '/images/logos/tools/silae.png',
    logoAlt: 'Logo Silae — logiciel de paie multi-conventions pour PME (BTP, spectacle, maritime)',
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
    logo: '/images/logos/tools/lucca.png',
    logoAlt: 'Logo Lucca — suite RH complète (absences, temps, notes de frais) pour PME 20-200 salariés',
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
    logo: '/images/logos/tools/qonto.png',
    logoAlt: 'Logo Qonto — banque en ligne pro pour startups et PME françaises',
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
    logo: '/images/logos/tools/revolut-business.png',
    logoAlt: 'Logo Revolut Business — banque multi-devises pour startups internationales',
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
    logo: '/images/logos/tools/payhawk.png',
    logoAlt: 'Logo Payhawk — gestion des dépenses multi-devises et ERP pour ETI internationales',
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
    logo: '/images/logos/tools/kyriba.svg',
    logoAlt: 'Logo Kyriba — plateforme de trésorerie groupe pour ETI multi-devises',
    website: 'https://www.kyriba.com/fr/',
    rating: 4.2,
    implementationTime: '3-6 mois',
    priceRange: 'Sur devis (5 000-15 000 €/mois)',
    phase: 3,
    forWho: [
      'ETI et groupes 200+ salariés multi-entités',
      'Trésorerie multi-devises avec hedging',
      'Cash pooling multi-pays',
    ],
    notForWho: [
      'PME < 20 M€ de CA (Agicap suffit)',
      'Équipe finance < 2 FTE dédiés',
      'Structures purement locales sans change',
    ],
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
    logo: '/images/logos/tools/power-bi.svg',
    logoAlt: 'Logo Microsoft Power BI — outil de reporting financier et dashboards pour CFO',
    website: 'https://powerbi.microsoft.com/fr-fr/',
    rating: 4.4,
    implementationTime: '2-3 jours',
    priceRange: '10-20 €/utilisateur/mois',
    phase: 1,
    forWho: [
      'PME et scale-ups 20+ salariés avec CFO ou DAF externalisé',
      'Board reporting mensuel',
      'Dashboards investisseurs et direction',
    ],
    notForWho: [
      'Startups sans ressource dédiée au reporting',
      "Structures cherchant du 100% gratuit (voir Metabase)",
      'Équipes non-Microsoft (Google Workspace pur)',
    ],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription:
      "Le reporting financier pour les board meetings. Connexion native Pennylane / Sage, 100+ sources de données, dashboards en 2-3 jours.",
  },

  {
    slug: 'upflow',
    name: 'Upflow',
    category: 'recouvrement',
    categorySlug: 'recouvrement-cash-collection',
    logo: '/images/logos/tools/upflow.svg',
    logoAlt: 'Logo Upflow — automatisation du recouvrement client B2B pour PME',
    website: 'https://upflow.io/',
    rating: 4.5,
    implementationTime: '1-2 semaines',
    priceRange: 'Sur devis (à partir de 200 €/mois)',
    phase: 2,
    forWho: [
      'PME B2B 20-200 salariés avec DSO > 45 jours',
      "Structures avec 20+ factures/mois nécessitant relances",
      "Équipes cherchant à réduire le temps de recouvrement",
    ],
    notForWho: [
      'B2C ou petits volumes (< 20 factures/mois)',
      "Structures sans facturation électronique établie",
      "TPE < 10 personnes",
    ],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription:
      "L'automatisation du recouvrement client B2B. DSO réduit de 15-30 % en moyenne. Intégration Pennylane + Stripe native.",
  },

  {
    slug: 'leanpay',
    name: 'LeanPay',
    category: 'recouvrement',
    categorySlug: 'recouvrement-cash-collection',
    logo: '/images/logos/tools/leanpay.svg',
    logoAlt: 'Logo LeanPay — recouvrement digital français pour PME',
    website: 'https://www.leanpay.fr/',
    rating: 4.1,
    implementationTime: '1 semaine',
    priceRange: 'Sur devis (à partir de 150 €/mois)',
    phase: 2,
    forWho: [
      'PME françaises 10-100 salariés',
      "Structures cherchant un support en français",
      "Petits volumes ne justifiant pas Upflow",
    ],
    notForWho: [
      "Clients internationaux (préférer Upflow pour le cross-border)",
      "Besoin d'intégration Stripe temps réel",
      "TPE avec relances manuelles OK",
    ],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription:
      "Le recouvrement digital français. Scénarios de relance paramétrables, support FR, 30-40 % moins cher qu'Upflow pour petits volumes.",
  },

  {
    slug: 'factorial',
    name: 'Factorial',
    category: 'sirh',
    categorySlug: 'sirh-rh',
    logo: '/images/logos/tools/factorial.svg',
    logoAlt: 'Logo Factorial — SIRH complet France + Espagne pour PME',
    website: 'https://factorialhr.fr/',
    rating: 4.3,
    implementationTime: '1-2 semaines',
    priceRange: '5-10 €/employé/mois',
    phase: 2,
    forWho: [
      'PME 20-200 salariés France et/ou Espagne',
      "Équipes transfrontalières FR-ES",
      "Structures cherchant un SIRH centralisé (congés, notes de frais, onboarding)",
    ],
    notForWho: [
      "Besoins de paie multi-convention complexes (BTP, HCR)",
      "Structures > 200 salariés (préférer Lucca)",
      "PME cherchant une gestion RH avancée (GPEC, plan formation)",
    ],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription:
      "Le SIRH pour équipes France-Espagne. Couverture conforme FR + ES, module performance et onboarding intégrés. 5 €/employé/mois.",
  },

  {
    slug: 'carta',
    name: 'Carta',
    category: 'equity',
    categorySlug: 'equity-cap-table',
    logo: '/images/logos/tools/carta.svg',
    logoAlt: 'Logo Carta — gestion cap table et BSPCE pour startups levant des fonds',
    website: 'https://carta.com/',
    rating: 4.4,
    implementationTime: '2-4 semaines',
    priceRange: 'Sur devis (à partir de 2 000 €/an)',
    phase: 3,
    forWho: [
      'Startups avec investisseurs US ou envisageant une cotation',
      'Cap table complexe avec 5+ actionnaires',
      "Plans d'actionnariat salarié avec valorisation 409A",
    ],
    notForWho: [
      "Entreprises purement européennes (préférer Equify)",
      "Startups sans levée de fonds réalisée",
      "Cap tables simples < 5 actionnaires (Excel suffit)",
    ],
    experts: ['benjamin'],
    hasVerbatim: false,
    shortDescription:
      "Le leader mondial de la gestion d'actionnariat. Cap table temps réel, BSPCE, data room investisseurs. Standard pour startups US-backed.",
  },

  {
    slug: 'equify',
    name: 'Equify',
    category: 'equity',
    categorySlug: 'equity-cap-table',
    logo: '/images/logos/tools/equify.svg',
    logoAlt: 'Logo Equify — alternative française à Carta pour cap table BSPCE',
    website: 'https://www.equify.io/',
    rating: 4.2,
    implementationTime: '1-3 semaines',
    priceRange: 'Sur devis (à partir de 1 500 €/an)',
    phase: 2,
    forWho: [
      'Startups françaises ayant levé des fonds',
      'Plans BSPCE et stock-options FR',
      'PME avec 3+ actionnaires et pactes d\'actionnaires',
    ],
    notForWho: [
      "Startups avec investisseurs américains (préférer Carta)",
      "Structures sans plan d'actionnariat salarié",
      "TPE / fondateurs unipersonnels",
    ],
    experts: ['sebastien'],
    hasVerbatim: false,
    shortDescription:
      "L'alternative française à Carta. Conformité 100 % droit français (BSPCE, AG, pactes), support FR, 30 % moins cher que Carta.",
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
