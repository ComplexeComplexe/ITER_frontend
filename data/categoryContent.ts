export interface CategoryContent {
  slug: string;
  title: string;
  intro: string;
  verdict: string;
  selectedTools: Array<{
    name: string;
    forWho: string;
    pros: string[];
    cons: string[];
  }>;
  decisionCriteria: string[];
}

export const categoryContent: Record<string, CategoryContent> = {
  'logiciels-comptabilite': {
    slug: 'logiciels-comptabilite',
    title: 'Comptabilité',
    intro:
      'La comptabilité n\'est pas une contrainte légale. C\'est le système nerveux de votre entreprise. Un bon outil comptable vous donne votre résultat en temps réel, alerte sur les dérives, et alimente vos prévisions.',
    verdict:
      'Pennylane est notre standard pour toute entreprise de 10 à 80 personnes qui n\'a pas de contrainte de gestion de stocks complexe. L\'expérience utilisateur est nettement supérieure, l\'API est solide, et le rapprochement bancaire est automatisé.',
    selectedTools: [
      {
        name: 'Pennylane',
        forWho: 'Startups SaaS, PME digitales (10-80 pers.)',
        pros: [
          'UX moderne et intuitive',
          'API solide pour les intégrations',
          'Rapprochement bancaire automatisé',
          'Bon support client',
        ],
        cons: [
          'Limité pour gestion de stocks complexe',
          'Immobilisations lourdes requièrent Sage',
          'Certains experts-comptables refusent',
        ],
      },
      {
        name: 'Sage',
        forWho: 'PME industrielles, structures 50+ avec stocks',
        pros: [
          'Gestion de stocks robuste',
          'Immobilisations complexes',
          'Historique longue',
        ],
        cons: [
          'Interface moins moderne',
          'Implémentation plus longue',
          'Coûts cachés',
        ],
      },
      {
        name: 'Cegid Loop',
        forWho: 'Entreprises imposées par leur expert-comptable',
        pros: ['Comptabilité complète', 'Solutions métier intégrées'],
        cons: ['Souvent imposé plutôt que choisi', 'Interface datée'],
      },
    ],
    decisionCriteria: [
      'Taille de l\'équipe et complexité opérationnelle',
      'Gestion de stocks (oui/non)',
      'Immobilisations lourdes (oui/non)',
      'Préférence de l\'expert-comptable',
      'Budget et durée d\'implémentation',
    ],
  },
  'logiciels-tresorerie': {
    slug: 'logiciels-tresorerie',
    title: 'Trésorerie',
    intro:
      '80% des défaillances d\'entreprises rentables sont liées à un problème de trésorerie, pas de rentabilité. C\'est pourquoi nous imposons un outil de prévision de trésorerie dès la Series A.',
    verdict:
      'Agicap est le leader incontestable pour les startups et PME françaises (2-100 M€ de CA). Dès que vous avez 3 comptes bancaires, une ligne de crédit, et des prévisions à 13 semaines, Agicap devient indispensable.',
    selectedTools: [
      {
        name: 'Agicap',
        forWho: 'PME et startups Series A/B (10-100 pers.)',
        pros: [
          'Prévisions de trésorerie fluides',
          'Intégration bancaire excellente',
          'Scénarios et alertes cash',
          'Support français réactif',
        ],
        cons: [
          'Pas adapté pour treasury desk professionnel',
          'Overkill pour seed stage',
        ],
      },
      {
        name: 'Fygr',
        forWho: 'Seed/early stage avec budget serré',
        pros: ['Plus léger et moins cher', 'Simple à mettre en place'],
        cons: ['Moins de fonctionnalités', 'Moins de données prédictives'],
      },
      {
        name: 'Kyriba',
        forWho: 'Structures très grandes (100+ M€ CA)',
        pros: ['Robustesse pour gros volumes', 'Fonctionnalités avancées'],
        cons: ['Overkill pour PME', 'Coûteux à l\'implémentation'],
      },
    ],
    decisionCriteria: [
      'Nombre de comptes bancaires et de devises',
      'Besoin de prévisions (13 semaines)',
      'Complexité du groupe (intercos, lignes de crédit)',
      'Volume de transactions',
    ],
  },
  'gestion-depenses': {
    slug: 'gestion-depenses',
    title: 'Gestion des dépenses',
    intro:
      'Gérez vos dépenses opérationnelles en temps réel avec les outils modernes. Cartes virtuelles, workflows d\'approbation, et intégration comptable automatique vous permettent de reprendre le contrôle de votre cash burn.',
    verdict:
      'Spendesk pour 15+ cartes et workflows complexes. Pleo pour moins de 10 cartes et structures simples. À partir de Series A, le ROI du contrôle des dépenses est rapide.',
    selectedTools: [
      {
        name: 'Spendesk',
        forWho: 'SaaS Series A/B, PME décentralisées (15+ cartes)',
        pros: [
          'Workflows d\'approbation par montant/département',
          'Cartes virtuelles illimitées',
          'Export comptable automatique',
          'Reporting détaillé par projet',
        ],
        cons: [
          'Moins adapté pour <10 cartes (surcoûts)',
          'Interface un peu chargée',
        ],
      },
      {
        name: 'Pleo',
        forWho: 'Startups 5-50 pers., petites équipes',
        pros: [
          'Tarif imbattable pour petit nombre de cartes',
          'UX très intuitive',
          'Mise en place rapide',
        ],
        cons: [
          'Limité si plus de 10-15 cartes',
          'Workflows moins flexibles',
        ],
      },
      {
        name: 'Payhawk',
        forWho: 'Structures internationales multi-devises',
        pros: ['Multi-devises natif', 'Gestion international avancée'],
        cons: ['Moins mature sur marché français'],
      },
    ],
    decisionCriteria: [
      'Nombre de cartes nécessaires',
      'Complexité des workflows d\'approbation',
      'Internationalisation (mono vs multi-devises)',
      'Intégration compta requise',
      'Besoin de reporting par projet/centre de coûts',
    ],
  },
  'logiciels-paie': {
    slug: 'logiciels-paie',
    title: 'Paie & RH',
    intro:
      'Automatisez votre paie et vos déclarations sociales sans erreur ni surcharge administrative. De la DSN aux bulletins, tout doit être fluide et traçable.',
    verdict:
      'PayFit est le standard pour 5-150 salariés avec CCN principales. Silae pour 150+ salariés ou CCN très complexes. Lucca si vous voulez une suite RH unifiée.',
    selectedTools: [
      {
        name: 'PayFit',
        forWho: 'Startups et PME (5-150 pers.)',
        pros: [
          'DSN automatique sans erreur',
          'Interface moderne et intuitive',
          'Portail collaborateur fluide',
          'Tarif prévisible et sans surpise',
          'Support français excellent',
        ],
        cons: [
          'Limité pour CCN très spécifiques',
          'Ralentissements au-delà de 150 pers.',
        ],
      },
      {
        name: 'Silae',
        forWho: 'Structures 150+ pers., CCN complexes',
        pros: [
          'Couverture complète de toutes les CCN',
          'Paramétrages très spécifiques possibles',
          'Historique et expertise longue',
        ],
        cons: [
          'Interface moins moderne que PayFit',
          'Implémentation plus longue',
          'Expérience salarié en retrait',
        ],
      },
      {
        name: 'Lucca',
        forWho: 'PME voulant suite RH unifiée',
        pros: [
          'Suite RH complète (paie + congés + temps)',
          'Intégration fluide entre modules',
          'UX cohérente',
        ],
        cons: [
          'Paie légèrement moins puissante que PayFit seul',
          'Moins d\'expertise marché français',
        ],
      },
    ],
    decisionCriteria: [
      'Nombre de salariés',
      'Complexité des conventions collectives',
      'Besoin de suite RH intégrée (congés, temps, notes de frais)',
      'Entités à l\'étranger',
      'Besoin de paramétrages spécifiques',
    ],
  },
};

export function getCategoryContent(slug: string): CategoryContent | undefined {
  return categoryContent[slug];
}
