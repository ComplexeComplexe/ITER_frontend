export interface DetailedComparisonCriterion {
  /** Criterion label, e.g. "UX", "Stocks", "Immobilisations", "API". */
  label: string;
  /** Per-tool score (free-form string : "5/5", "39-199€", "1-3 sem.", "Pennylane", etc.). */
  scores: Record<string, string>;
}

export interface VerdictByStageEntry {
  /** Profile or stage tag, e.g. "Seed", "Series A/B", "Industrie", "Retail". */
  stage: string;
  /** Recommended tool name. */
  tool: string;
  /** One-line rationale. */
  reason: string;
}

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
  /**
   * Detailed comparison matrix (TICKET 18). Lists each criterion with a
   * per-tool score so the page can render a dense comparison table.
   */
  detailedComparison?: {
    tools: string[]; // column order
    criteria: DetailedComparisonCriterion[];
  };
  /**
   * Recommendation by profile/stage (TICKET 18). 4-6 entries that tell
   * the reader which tool fits which use case at a glance.
   */
  verdictByStage?: VerdictByStageEntry[];
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
    detailedComparison: {
      tools: ['Pennylane', 'Sage', 'Cegid Loop'],
      criteria: [
        { label: 'UX / facilité', scores: { Pennylane: '5/5', Sage: '2/5', 'Cegid Loop': '3/5' } },
        { label: 'Gestion stocks', scores: { Pennylane: '2/5', Sage: '5/5', 'Cegid Loop': '4/5' } },
        { label: 'Immobilisations', scores: { Pennylane: '2/5', Sage: '5/5', 'Cegid Loop': '3/5' } },
        { label: 'API / intégrations', scores: { Pennylane: '5/5', Sage: '3/5', 'Cegid Loop': '2/5' } },
        { label: 'Compta analytique', scores: { Pennylane: '4/5', Sage: '5/5', 'Cegid Loop': '4/5' } },
        { label: 'Multi-sociétés', scores: { Pennylane: '3/5', Sage: '5/5', 'Cegid Loop': '4/5' } },
        { label: 'Base de tarification', scores: { Pennylane: "Selon formule et utilisateurs", Sage: "Selon produit, modules et déploiement", 'Cegid Loop': "À confirmer auprès de Cegid" } },
        { label: 'Implémentation', scores: { Pennylane: '1-3 sem.', Sage: '4-12 sem.', 'Cegid Loop': '2-6 sem.' } },
      ],
    },
    verdictByStage: [
      { stage: 'Seed', tool: 'Pennylane', reason: 'UX moderne, déploiement en 1 semaine, prix faible — parfait pour démarrer.' },
      { stage: 'Series A/B', tool: 'Pennylane (Sage si stocks)', reason: "Comparer les intégrations et les fonctions de stocks ou d’immobilisations nécessaires." },
      { stage: 'Industrie', tool: 'Sage', reason: 'Lots, traçabilité, immobilisations IFRS — Sage est indispensable.' },
      { stage: 'Retail multi-magasin', tool: 'Cegid Loop', reason: 'Modules caisse, gestion magasin et stocks multi-dépôts intégrés.' },
      { stage: 'Groupe multi-sociétés', tool: 'Sage', reason: 'Consolidation native, multi-axes analytiques, écosystème expert-comptable mature.' },
    ],
  },
  'logiciels-tresorerie': {
    slug: 'logiciels-tresorerie',
    title: 'Trésorerie',
    intro:
      "Une entreprise rentable peut rencontrer une tension de trésorerie. Le choix d’un outil de prévision doit partir des échéances, comptes et scénarios à suivre.",
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
        name: 'Okimia (ex-Fygr)',
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
    detailedComparison: {
      tools: ['Agicap', 'Okimia (ex-Fygr)', 'Kyriba'],
      criteria: [
        { label: 'Banques connectées', scores: { Agicap: 'À vérifier', 'Okimia (ex-Fygr)': 'Selon formule', Kyriba: 'À vérifier' } },
        { label: 'Horizon prévision', scores: { Agicap: '12-52 sem.', 'Okimia (ex-Fygr)': '13 sem.', Kyriba: '52+ sem.' } },
        { label: 'Scénarios', scores: { Agicap: 'Illimités', 'Okimia (ex-Fygr)': 'Selon formule', Kyriba: 'Illimités' } },
        { label: 'Budget vs réalité', scores: { Agicap: '✓', 'Okimia (ex-Fygr)': '✓', Kyriba: '✓' } },
        { label: 'Multi-devises', scores: { Agicap: '✓', 'Okimia (ex-Fygr)': 'Selon formule', Kyriba: '✓ avancé' } },
        { label: 'API', scores: { Agicap: '✓', 'Okimia (ex-Fygr)': 'Selon formule', Kyriba: '✓' } },
        { label: 'Support', scores: { Agicap: 'Téléphone + chat', 'Okimia (ex-Fygr)': 'Selon formule', Kyriba: 'Account manager' } },
        { label: 'Base de tarification', scores: { Agicap: "Sur devis", 'Okimia (ex-Fygr)': "Selon formule et engagement", Kyriba: "Devis à demander" } },
        { label: 'Implémentation', scores: { Agicap: '2 sem.', 'Okimia (ex-Fygr)': '1-2 jours', Kyriba: '8-16 sem.' } },
      ],
    },
    verdictByStage: [
      { stage: 'Seed (<20 pers., 1-2 banques)', tool: 'Okimia (ex-Fygr)', reason: "Tester les connexions bancaires et le prévisionnel sur vos données ; comparer les formules Okimia (ex-Fygr)." },
      { stage: 'Series A/B (20-100 pers.)', tool: 'Agicap', reason: 'Multi-banques, scénarios complexes, alertes prédictives — indispensable pour anticiper la levée.' },
      { stage: 'Internationale multi-devises', tool: 'Agicap Pro', reason: 'Multi-devises avancé + intercos + filiales — couverture européenne.' },
      { stage: 'ETI / Grand groupe (>100M€ CA)', tool: 'Kyriba', reason: 'Treasury desk professionnel, FX hedging, intégration ERP — overkill pour PME.' },
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
    detailedComparison: {
      tools: ['Pleo', 'Spendesk', 'Payhawk'],
      criteria: [
        { label: 'Cartes virtuelles', scores: { Pleo: '✓ illimitées', Spendesk: '✓ illimitées', Payhawk: '✓ multi-pays' } },
        { label: 'Workflows approbation', scores: { Pleo: '1 niveau', Spendesk: 'Conditionnels', Payhawk: 'Sophistiqués multi-entités' } },
        { label: 'Devises supportées', scores: { Pleo: '~10', Spendesk: '~30', Payhawk: '50+' } },
        { label: 'Intégration ERP', scores: { Pleo: '✗', Spendesk: 'Partielle', Payhawk: '✓ SAP/Oracle/NetSuite' } },
        { label: 'Multi-entités', scores: { Pleo: '✗', Spendesk: 'Limité', Payhawk: '✓' } },
        { label: 'Reporting par cost center', scores: { Pleo: 'Basique', Spendesk: '✓', Payhawk: '✓ avancé' } },
        { label: 'Base de tarification', scores: { Pleo: "Forfait + utilisateurs supplémentaires", Spendesk: "Selon périmètre, sur devis", Payhawk: "Selon modules et périmètre" } },
        { label: 'Implémentation', scores: { Pleo: '1-2 jours', Spendesk: '1-2 sem.', Payhawk: '2-4 sem.' } },
      ],
    },
    verdictByStage: [
      { stage: 'Seed (<15 cartes)', tool: 'Pleo', reason: 'Onboarding en 10 minutes, prix imbattable, intégration Pennylane native.' },
      { stage: 'Series A/B (15-50 cartes)', tool: 'Spendesk', reason: 'Workflows d\'approbation conditionnels, reporting détaillé, plafonds par rôle.' },
      { stage: 'Scale-up internationale', tool: 'Payhawk', reason: '50+ devises, multi-entités, intégration ERP — pour 3+ pays.' },
      { stage: 'Très petite équipe (<10 cartes)', tool: 'Pleo', reason: 'Simplicité avant tout — pas de workflow lourd à paramétrer.' },
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
    detailedComparison: {
      tools: ['PayFit', 'Silae', 'Lucca'],
      criteria: [
        { label: 'CCN couvertes', scores: { PayFit: '~40 principales', Silae: '600+', Lucca: 'Via PayFit/Silae' } },
        { label: 'UX / portail collaborateur', scores: { PayFit: '5/5', Silae: '3/5', Lucca: '4/5' } },
        { label: 'Gestion des temps', scores: { PayFit: '2/5', Silae: '5/5', Lucca: '5/5' } },
        { label: 'Notes de frais intégrées', scores: { PayFit: 'Module +', Silae: 'Partiel', Lucca: '✓ natif' } },
        { label: 'Onboarding salariés', scores: { PayFit: '✓', Silae: 'Limité', Lucca: '✓ avancé' } },
        { label: 'Intégration compta', scores: { PayFit: 'Pennylane native', Silae: 'Silae Expert', Lucca: 'Via PayFit' } },
        { label: 'Base de tarification', scores: { PayFit: "Forfait + collaborateurs + options", Silae: "Devis éditeur ou partenaire", Lucca: "Selon modules et collaborateurs" } },
        { label: 'Implémentation', scores: { PayFit: '1-2 sem.', Silae: '2-4 sem.', Lucca: '2-4 sem.' } },
      ],
    },
    verdictByStage: [
      { stage: 'Startup SaaS <50 pers., CCN SYNTEC', tool: 'PayFit', reason: 'DSN auto, portail moderne, zéro erreur — le standard pour les startups.' },
      { stage: 'PME services 50-150 pers.', tool: 'PayFit + Lucca', reason: 'Stack RH complet : PayFit pour la paie, Lucca pour absences, temps et notes de frais.' },
      { stage: 'Industrie / BTP / Spectacle', tool: 'Silae', reason: '600+ CCN, gestion des temps complexe, multi-conventions — indispensable.' },
      { stage: '>150 salariés', tool: 'Silae', reason: 'Couverture conventionnelle exhaustive et paramétrages spécifiques. PayFit ralentit à cette taille.' },
      { stage: 'ETI multi-entités', tool: 'Silae + Lucca', reason: 'Silae gère la paie complexe ; Lucca unifie le RH (absences, temps, talent).' },
    ],
  },
};

export function getCategoryContent(slug: string): CategoryContent | undefined {
  return categoryContent[slug];
}
