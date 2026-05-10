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
];

export function getVerbatimsByTool(toolSlug: string): Verbatim | undefined {
  return verbatims.find((v) => v.toolSlug === toolSlug);
}

export function getVerbatimsByExpert(expert: 'sebastien' | 'benjamin'): Verbatim[] {
  return verbatims.filter((v) => v.expert === expert);
}
