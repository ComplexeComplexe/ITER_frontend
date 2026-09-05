/** Pricing review: official publisher sources checked 2026-09-05. No unsourced market ranges. */
export interface ToolPricing { label: string; url: string; note: string; checkedAt: string; }
export const TOOL_PRICING: Record<string, ToolPricing> = {
  "pennylane": {
    "label": "Selon formule et utilisateurs",
    "url": "https://www.pennylane.com/fr/tarifs",
    "note": "Le prix dépend de la formule et des utilisateurs. Vérifier les modules, chaque entité et la facturation mensuelle ou annuelle.",
    "checkedAt": "2026-09-05"
  },
  "agicap": {
    "label": "Sur devis",
    "url": "https://agicap.com/fr/tarifs/",
    "note": "Agicap propose une tarification sur mesure. Faire préciser les modules, les entités, les connexions et les frais de déploiement.",
    "checkedAt": "2026-09-05"
  },
  "spendesk": {
    "label": "Selon périmètre, sur devis",
    "url": "https://www.spendesk.com/fr/",
    "note": "Les tarifs sont adaptés aux besoins, au périmètre déployé et au niveau de service. Demander un devis détaillé.",
    "checkedAt": "2026-09-05"
  },
  "payfit": {
    "label": "Forfait + collaborateurs + options",
    "url": "https://payfit.com/fr/offres/",
    "note": "Le coût inclut un forfait qui varie avec l’effectif, le prix par collaborateur selon l’offre et les éventuels établissements et services supplémentaires. Comparer hors promotion.",
    "checkedAt": "2026-09-05"
  },
  "sage": {
    "label": "Selon produit, modules et déploiement",
    "url": "https://www.sage.com/fr-fr/",
    "note": "Sage désigne plusieurs produits. Identifier la solution, les modules, les licences et les prestations de mise en place avant de comparer les coûts.",
    "checkedAt": "2026-09-05"
  },
  "cegid-loop": {
    "label": "À confirmer auprès de Cegid",
    "url": "https://www.cegid.com/fr/solutions/expertise-comptable/",
    "note": "La page éditeur présente ses solutions pour cabinets. Confirmer la disponibilité, le périmètre et le tarif de la solution retenue avant souscription.",
    "checkedAt": "2026-09-05"
  },
  "fygr": {
    "label": "Selon formule et engagement",
    "url": "https://www.okimia.com/fr/tarifs",
    "note": "Fygr est devenu Okimia. Comparer la formule, le nombre d’entités et de banques, les options et la durée de facturation ; ne pas confondre prix annualisé et mensuel.",
    "checkedAt": "2026-09-05"
  },
  "pleo": {
    "label": "Forfait + utilisateurs supplémentaires",
    "url": "https://www.pleo.io/fr/pricing",
    "note": "Comparer la formule, les utilisateurs inclus et supplémentaires, les options et la facturation annuelle ou mensuelle.",
    "checkedAt": "2026-09-05"
  },
  "silae": {
    "label": "Devis éditeur ou partenaire",
    "url": "https://www.silae.fr/",
    "note": "Demander au prestataire de distinguer la licence, la production de paie, les modules RH et l’accompagnement : ces périmètres ne sont pas équivalents.",
    "checkedAt": "2026-09-05"
  },
  "lucca": {
    "label": "Selon modules et collaborateurs",
    "url": "https://www.lucca.fr/tarifs/",
    "note": "La tarification varie selon les solutions et les collaborateurs. Additionner les modules nécessaires et faire préciser la mise en place.",
    "checkedAt": "2026-09-05"
  },
  "qonto": {
    "label": "Selon forfait et opérations",
    "url": "https://qonto.com/fr/pricing",
    "note": "Comparer le forfait, les cartes, les opérations incluses et les frais supplémentaires, hors promotion et selon la durée de facturation.",
    "checkedAt": "2026-09-05"
  },
  "revolut-business": {
    "label": "Selon forfait et usage",
    "url": "https://www.revolut.com/fr-FR/business/business-account-plans/",
    "note": "Comparer Basic, Grow, Scale et Enterprise, les quotas de change et virements et les frais au-delà des limites. Ne pas présenter un compte professionnel gratuit comme offre générale.",
    "checkedAt": "2026-09-05"
  },
  "payhawk": {
    "label": "Selon modules et périmètre",
    "url": "https://payhawk.com/fr/tarification-et-abonnements",
    "note": "Les plans couvrent différents modules. Demander un chiffrage comparable des cartes, factures, utilisateurs et entités.",
    "checkedAt": "2026-09-05"
  },
  "kyriba": {
    "label": "Devis à demander",
    "url": "https://www.kyriba.com/fr/",
    "note": "Aucune fourchette générale n’est retenue ici. Cadrer les modules de trésorerie, les connexions, les entités et les services de déploiement avec l’éditeur.",
    "checkedAt": "2026-09-05"
  },
  "power-bi": {
    "label": "Selon licences et capacité",
    "url": "https://www.microsoft.com/fr-fr/power-platform/products/power-bi/pricing",
    "note": "Distinguer la création gratuite, les licences Pro ou Premium par utilisateur et la capacité Fabric. Les droits de partage et la facturation dépendent du plan.",
    "checkedAt": "2026-09-05"
  },
  "upflow": {
    "label": "Selon offre et périmètre",
    "url": "https://upflow.io/pricing",
    "note": "Consulter les offres éditeur et chiffrer le périmètre de recouvrement, les intégrations et l’accompagnement requis.",
    "checkedAt": "2026-09-05"
  },
  "leanpay": {
    "label": "Devis à demander",
    "url": "https://www.leanpay.io/en",
    "note": "Cadrer le volume de créances, les entités, les intégrations et les services. Aucun prix minimum non confirmé n’est repris.",
    "checkedAt": "2026-09-05"
  },
  "factorial": {
    "label": "Selon modules et utilisateurs",
    "url": "https://factorial.fr/tarifs",
    "note": "Le prix varie selon le plan et les utilisateurs. Faire préciser les modules, les minima et les frais de mise en place sur le devis.",
    "checkedAt": "2026-09-05"
  },
  "carta": {
    "label": "Selon offre et actionnaires",
    "url": "https://carta.com/plans/equity-management/",
    "note": "Le tarif dépend du nombre de détenteurs, de la formule et des options, avec un minimum annuel pour les offres payantes. L’offre Launch gratuite est soumise à éligibilité.",
    "checkedAt": "2026-09-05"
  },
  "equify": {
    "label": "Selon titulaires et formule",
    "url": "https://www.equify.eu/fr/tarifs",
    "note": "Comparer les formules annuelles selon les titulaires actifs, les opérations, les signatures et le reporting inclus.",
    "checkedAt": "2026-09-05"
  },
  "dext": {
    "label": "Selon utilisateurs et documents",
    "url": "https://dext.com/fr/tarifs/entreprise-tpe-pme",
    "note": "Le prix varie avec les utilisateurs, le volume de documents et l’engagement. Distinguer les fonctionnalités gratuites de l’automatisation payante.",
    "checkedAt": "2026-09-05"
  },
  "xero": {
    "label": "Selon pays et formule",
    "url": "https://www.xero.com/uk/pricing-plans/",
    "note": "Les prix varient selon le pays et les plans. La grille britannique est en livres sterling ; elle ne constitue pas un tarif français en euros.",
    "checkedAt": "2026-09-05"
  },
  "finthesis": {
    "label": "Selon formule",
    "url": "https://finthesis.io/tarifs",
    "note": "Comparer les fonctionnalités et limites de chaque formule, puis confirmer la facturation applicable.",
    "checkedAt": "2026-09-05"
  },
  "looker-studio": {
    "label": "Version gratuite et offre Pro",
    "url": "https://cloud.google.com/data-studio",
    "note": "Consulter les offres Google Data Studio, anciennement Looker Studio. Distinguer la version gratuite, Pro et les coûts des connecteurs ou sources de données.",
    "checkedAt": "2026-09-05"
  },
  "dealroom": {
    "label": "Selon transaction et périmètre",
    "url": "https://dealroom.net/products/pricing",
    "note": "Faire préciser le volume de transactions, les fonctionnalités et la durée contractuelle.",
    "checkedAt": "2026-09-05"
  },
  "intralinks": {
    "label": "Sur devis par projet",
    "url": "https://www.intralinks.com/guides/how-much-does-intralinks-cost-0",
    "note": "Intralinks chiffre selon les données, utilisateurs, durée et fonctionnalités du projet.",
    "checkedAt": "2026-09-05"
  },
  "pulley": {
    "label": "Selon offre et périmètre",
    "url": "https://pulley.com/pricing",
    "note": "Vérifier le plan, les détenteurs de titres, les services complémentaires et la durée contractuelle.",
    "checkedAt": "2026-09-05"
  }
};
