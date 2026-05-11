export interface Verbatim {
  toolSlug: string;
  expert: 'sebastien' | 'benjamin';
  quote: string;
  context?: string;
}

export const verbatims: Verbatim[] = [
  {
    toolSlug: 'pennylane',
    expert: 'sebastien',
    quote:
      "Pennylane, c'est devenu notre standard pour les startups Series A. L'API est solide, le partenariat avec les experts-comptables est fluide, et le rapprochement bancaire automatique nous économise des jours de clôture chaque mois.",
    context: 'Fintech Series A - Barcelone',
  },
  {
    toolSlug: 'agicap',
    expert: 'benjamin',
    quote:
      'Agicap a changé notre vision de la trésorerie. Avant, on attendait la clôture comptable pour savoir si on avait du cash. Maintenant, les DSO, DPO et burn rate sont visibles en temps réel. Nos dirigeants dorment mieux.',
    context: 'SaaS B2B Series B - Paris',
  },
  {
    toolSlug: 'spendesk',
    expert: 'sebastien',
    quote:
      "Spendesk vs les cartes de crédit classiques, c'est la différence entre administrer des dépenses et les piloter. Les workflows d'approbation, les limites par rôle, et l'export comptable automatique font gagner 6-8 heures de traitement par clôture.",
    context: 'E-commerce Series A - Amsterdam',
  },
  {
    toolSlug: 'payfit',
    expert: 'sebastien',
    quote:
      'PayFit pour les 30-200 salariés, c\'est LE standard. DSN automatique, charges calculées sans erreur, portail collaborateur qui réduit les demandes RH... et un prix qui ne devient pas fou à 150 pers.',
    context: 'SaaS B2B2C Series B - Paris',
  },
  // ─── 9 fiches outils ajoutées via TICKET 5 ───────────────────────────
  {
    toolSlug: 'sage',
    expert: 'benjamin',
    quote:
      "Sage reste incontournable pour nos clients industriels. Dès que vous avez des stocks avec lots ou des immobilisations complexes, Pennylane ne suffit plus. La consolidation multi-sociétés est aussi un vrai plus pour les groupes en croissance externe.",
    context: 'PME industrielle 45 pers. - Toulouse',
  },
  {
    toolSlug: 'cegid-loop',
    expert: 'benjamin',
    quote:
      "Cegid Loop brille quand l'expert-comptable est déjà dans l'écosystème Cegid. La synchronisation comptable est quasi instantanée. Pour le retail, les modules caisse et gestion de magasin sont particulièrement pertinents.",
    context: 'Retail multi-magasin 12 PDV - France',
  },
  {
    toolSlug: 'fygr',
    expert: 'benjamin',
    quote:
      "Fygr est notre recommandation pour les PME qui trouvent Agicap trop cher. À 49 €/mois, vous avez déjà la visibilité essentielle sur votre trésorerie. Parfait pour les structures 10-50 personnes en croissance contrôlée. L'onboarding se fait en une demi-journée.",
    context: 'PME services 25 pers. - Lyon',
  },
  {
    toolSlug: 'pleo',
    expert: 'benjamin',
    quote:
      "Pleo vs Spendesk ? Pleo gagne en simplicité, Spendesk en puissance. Pour nos clients < 15 pers., Pleo est souvent suffisant. Le setup se fait en une demi-journée et les utilisateurs sont autonomes immédiatement.",
    context: 'Startup seed 12 pers. - Paris',
  },
  {
    toolSlug: 'silae',
    expert: 'benjamin',
    quote:
      "Dès qu'un client a une CCN non standard ou gère des temps de travail complexes, on passe sur Silae. La couverture conventionnelle est tout simplement incomparable. Pour le BTP et le spectacle, c'est quasi systématique.",
    context: 'BTP 35 pers. - Île-de-France',
  },
  {
    toolSlug: 'lucca',
    expert: 'benjamin',
    quote:
      "Lucca + PayFit = notre stack RH complet. Lucca gère le RH (absences, temps, frais), PayFit la paie. La combinaison couvre 95% des besoins RH d'une PME 20-150 personnes.",
    context: 'PME services 80 pers. - Paris',
  },
  {
    toolSlug: 'qonto',
    expert: 'benjamin',
    quote:
      "Qonto est notre recommandation systématique pour les startups françaises. L'intégration avec Pennylane est transparente — plus besoin de télécharger les relevés. À 9 €/mois, le ROI est immédiat. Nos clients gagnent 2-3 heures par mois sur le rapprochement bancaire.",
    context: 'Startup SaaS 25 pers. - Paris',
  },
  {
    toolSlug: 'revolut-business',
    expert: 'benjamin',
    quote:
      "Pour nos clients avec du business UK ou US, Revolut est indispensable. Le gain sur le change seul finance l'abonnement. L'IBAN GBP est particulièrement utile pour les SaaS avec des clients anglo-saxons — ils paient en GBP comme s'ils payaient un fournisseur local.",
    context: 'SaaS B2B Series B - Barcelone / Londres',
  },
  {
    toolSlug: 'payhawk',
    expert: 'benjamin',
    quote:
      "Payhawk entre en jeu dès que nos clients dépassent 50 pers. avec des équipes à l'international. La gestion multi-devises et le reporting par entité sont des fonctionnalités que Spendesk n'a pas encore. Le ROI se mesure en heures de consolidation comptable économisées chaque mois.",
    context: 'ETI 180 pers., 3 pays - Europe',
  },
];

export function getVerbatimsByTool(toolSlug: string): Verbatim | undefined {
  return verbatims.find((v) => v.toolSlug === toolSlug);
}

export function getVerbatimsByExpert(expert: 'sebastien' | 'benjamin'): Verbatim[] {
  return verbatims.filter((v) => v.expert === expert);
}
