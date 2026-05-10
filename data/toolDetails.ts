export interface ToolDetails {
  slug: string;
  verdict30s: string;
  advantages: Array<{
    title: string;
    description: string;
  }>;
  limitations: Array<{
    title: string;
    workaround: string;
  }>;
  implementationGuide: Array<{
    step: string;
    detail: string;
  }>;
  stackCombos: Array<{
    title: string;
    description: string;
    tools: string[];
    context: string;
  }>;
  faqExpanded: Array<{
    question: string;
    answer: string;
  }>;
}

export const toolDetails: Record<string, ToolDetails> = {
  pennylane: {
    slug: 'pennylane',
    verdict30s:
      'Pennylane est notre standard pour les SaaS et PME digitales (10-80 pers.) sans gestion de stocks complexe. L\'expérience utilisateur est nettement supérieure aux alternatives, l\'API est solide, et le rapprochement bancaire automatisé économise des jours de clôture chaque mois.',
    advantages: [
      {
        title: 'UX moderne et intuitive',
        description:
          'La plateforme est conçue pour les fondateurs modernes. Navigation fluide, dashboards lisibles, pas de menu caché de 47 niveaux.',
      },
      {
        title: 'API solide pour les intégrations',
        description:
          'Pennylane expose une API complète pour connecter directement votre pile tech. Agicap, Spendesk, PayFit s\'intègrent nativement.',
      },
      {
        title: 'Rapprochement bancaire automatisé',
        description:
          'Les connexions bancaires Open Banking sont configurées en 2 minutes. Les écritures se réconclient automatiquement : vous gagnez 6-8 heures de traitement par clôture.',
      },
      {
        title: 'Bon support client en français',
        description:
          'Support réactif basé en France. Pas de bot, pas de route vers une hotline offshore. Les problèmes se résolvent en 24h.',
      },
    ],
    limitations: [
      {
        title: 'Limité pour gestion de stocks complexe',
        workaround:
          'Si vous avez 3+ SKU avec lots/traçabilité, privilégiez Sage. Pour du e-commerce simple, Pennylane + un sync Shopify suffit.',
      },
      {
        title: 'Immobilisations lourdes requièrent Sage',
        workaround:
          'Immobilisations complexes (IFRS, dépréciations) : passez sur Sage. Pennylane gère le courant, pas l\'exceptionnel.',
      },
      {
        title: 'Certains experts-comptables refusent',
        workaround:
          'Changez d\'expert-comptable ou maintenez un double Excel en version finale (rare, mais prévoir 1 jour/an).',
      },
    ],
    implementationGuide: [
      {
        step: 'Jour 1 : Paramétrage initial',
        detail:
          'Créer l\'entreprise, configurer le plan comptable (France/US/UK selon localisation), importer les écritures d\'ouverture.',
      },
      {
        step: 'Jour 1-2 : Intégrations bancaires',
        detail:
          'Connecter les comptes bancaires Open Banking. Test avec Agicap ou Spendesk si vous les utilisez. Vérifier les premiers rapprochements.',
      },
      {
        step: 'Jour 2-3 : Formation équipe',
        detail:
          'Formation sur la saisie des factures, gestion des notes de frais (si non externalisé), utilisation des rapports mensuels.',
      },
      {
        step: 'Jour 3-7 : Vérification et ajustement',
        detail:
          'Première clôture test. Vérifier les rapprochements bancaires, les écarts de TVA. Ajuster les paramétrages si nécessaire.',
      },
    ],
    stackCombos: [
      {
        title: 'La trinité SaaS Series A/B',
        description: 'Le combo gagnant pour 90% des SaaS en croissance',
        tools: ['Pennylane', 'Agicap', 'Spendesk'],
        context: 'Pour startups SaaS, 15-50 pers., CA 2-10M€. Budget: 800-1500€/mois.',
      },
      {
        title: 'Stack paie complète',
        description: 'Comptabilité + paie unifiée',
        tools: ['Pennylane', 'PayFit'],
        context: 'Pour PME 5-30 pers. avec paie externalisée. Simplification administrateur.',
      },
      {
        title: 'Infrastructure financière solide',
        description: 'Comptabilité + trésorerie + dépenses + paie',
        tools: ['Pennylane', 'Agicap', 'Spendesk', 'PayFit'],
        context: 'Pour Scale-ups 50-100 pers., CA 10-30M€. CFO interne requis.',
      },
    ],
    faqExpanded: [
      {
        question: 'Combien coûte Pennylane ?',
        answer:
          'Pennylane fonctionne sur trois plans : Start à 39 €/mois (setup + base), Pro à 99 €/mois (avec API), Scale à 199 €/mois (support prioritaire). Au-delà de 2000 écritures/mois, devis custom.',
      },
      {
        question: 'Combien de temps pour migrer vers Pennylane ?',
        answer:
          'La migration prend 1 à 3 semaines selon la propreté de la comptabilité existante. Si vous aviez un expert-comptable à jour, c\'est 1 semaine. Si vous aviez un Excel de 3 ans, c\'est 2-3 semaines.',
      },
      {
        question: 'Pennylane convient-il aux startups ?',
        answer:
          'Oui, Pennylane est idéal pour startups 5-80 salariés. Le plan Start à 39 €/mois suffit pour démarrer. La migration depuis un expert-comptable traditionnel prend 2-3 semaines.',
      },
      {
        question: 'Peut-on exporter les données de Pennylane ?',
        answer:
          'Oui, export complet possible via API ou export CSV des journaux comptables. Aucun verrouillage. Si vous partez, vous avez tout en 24h.',
      },
      {
        question: 'Pennylane fonctionne-t-il avec Stripe / Shopify ?',
        answer:
          'Oui, intégrations natives avec Stripe, Shopify, WooCommerce. Les transactions se synchro automatiquement. Pour les marchés (" marketplace "), un paramétrage custom est nécessaire.',
      },
    ],
  },
  agicap: {
    slug: 'agicap',
    verdict30s:
      'Agicap est le leader incontestable pour PME et startups françaises. Dès que vous avez 3+ comptes bancaires, une ligne de crédit, et besoin de prévisions à 13 semaines, Agicap devient indispensable. Visibilité cash en temps réel, alertes prédictives, support français.',
    advantages: [
      {
        title: 'Prévisions de trésorerie fluides',
        description:
          'Vous entrez vos prévisions de CA, elles se mettent à jour. Agicap recalcule automatiquement les scenarios de cash. DSO, DPO, burn rate visibles en temps réel.',
      },
      {
        title: 'Intégration bancaire excellente',
        description:
          'Connexion directe à vos comptes (France, Suisse, Belgique, USA). Soldes réels, pas de décalages. Récupération des transactions le jour même.',
      },
      {
        title: 'Scénarios et alertes cash',
        description:
          'Créer des scenarios "et si on ne fermait pas cette levée ?" Agicap alerte 6 semaines avant la rupture de cash. Vos dirigeants dorment mieux.',
      },
      {
        title: 'Support français réactif',
        description:
          'Équipe France basée à Paris. Support par chat/email en français. Pas de décalage horaire avec Nasdaq.',
      },
    ],
    limitations: [
      {
        title: 'Pas adapté pour treasury desk professionnel',
        workaround:
          'Si vous avez une trésorier full-time gérant 100M€+, passez sur Kyriba. Agicap c\'est pour le CFO qui fait 10 jobs à la fois.',
      },
      {
        title: 'Overkill pour seed stage (budget serré)',
        workaround:
          'En seed ultra-early, un Google Sheet + Agicap Lite suffit. Passez à la version complète dès Series A.',
      },
    ],
    implementationGuide: [
      {
        step: 'Jour 1 : Connexion bancaires',
        detail: 'Connecter tous vos comptes bancaires via Open Banking (Crédit Agricole, BNP, Société Générale, etc.).',
      },
      {
        step: 'Jour 2 : Paramétrage prévisions',
        detail:
          'Entrer votre historique de CA, ARR (si SaaS), dépenses fixes/variables, délais de paiement clients/fournisseurs.',
      },
      {
        step: 'Jour 3 : Scénarios',
        detail:
          'Créer 3 scénarios : pessimiste (-20% CA), réaliste, optimiste (+30% CA). Définir alertes cash minimum.',
      },
      {
        step: 'Jour 3-5 : Formation equipe',
        detail:
          'Montrer comment lire les dashboards, interpréter les alertes, ajuster les prévisions mensuellement.',
      },
    ],
    stackCombos: [
      {
        title: 'SaaS en growth',
        description: 'Visibilité financière complète',
        tools: ['Pennylane', 'Agicap', 'Spendesk'],
        context: 'Pour SaaS Series A/B avec trésorerie tendue. Voir le cash avant la vraie crise.',
      },
      {
        title: 'PME classique',
        description: 'Comptabilité + trésorerie',
        tools: ['Pennylane', 'Agicap'],
        context: 'Pour PME 10-50 pers. traditionnel. Évite la surprise en fin de mois.',
      },
    ],
    faqExpanded: [
      {
        question: 'Combien coûte Agicap ?',
        answer:
          'Agicap démarre à 49 €/mois (Essentials, 1 utilisateur), va à 99 €/mois (Pro, 3 utilisateurs), 199 €/mois (Business, 5 utilisateurs), 249 €/mois (Scale, collaborateurs illimités).',
      },
      {
        question: 'Qui devrait utiliser Agicap ?',
        answer:
          'PME et startups 10-100 personnes ayant besoin de visibilité trésorerie à 13 semaines. Essentiel si vous avez levé une ronde et que le cash burn matter.',
      },
      {
        question: 'Agicap fonctionne-t-il avec d\'autres outils ?',
        answer:
          'Oui, Agicap s\'intègre avec Pennylane, Spendesk, PayFit, Slack. Les données flux pour un vrai pilotage financier.',
      },
      {
        question: 'Comment importer l\'historique comptable ?',
        answer:
          'Agicap récupère automatiquement l\'historique via la connexion bancaire (6-12 mois). Pas de migration manuelle.',
      },
    ],
  },
  spendesk: {
    slug: 'spendesk',
    verdict30s:
      'Spendesk pour 15+ cartes et workflows complexes. Pleo pour moins de 10 cartes et structures simples. À partir de Series A, le ROI du contrôle des dépenses est rapide : 6-8 heures d\'admin par clôture économisées.',
    advantages: [
      {
        title: 'Workflows d\'approbation par montant/département',
        description:
          'Définir des règles : "CEO approuve > 5000€", "Manager approuve < 500€". Les demandes routent automatiquement. Pas de pile de post-its.',
      },
      {
        title: 'Cartes virtuelles illimitées',
        description:
          'Une carte par projet, par centre de coûts, par collaborateur. Les dépenses se catégorisent automatiquement. Zéro note de frais en Excel.',
      },
      {
        title: 'Export comptable automatique',
        description:
          'Les transactions Spendesk s\'exportent en journal comptable vers Pennylane, Sage, QuickBooks. Zéro saisie manuelle.',
      },
      {
        title: 'Reporting détaillé par projet',
        description:
          'Vue en temps réel : burn par projet, par département, par manager. Budget vs réel. Prévoyance de overspend.',
      },
    ],
    limitations: [
      {
        title: 'Moins adapté pour <10 cartes (surcoûts)',
        workaround:
          'Si vous avez 3-4 cartes seulement, utilisez Pleo (tarif au numéro de cartes). Spendesk pour des structures décentralisées.',
      },
      {
        title: 'Interface un peu chargée',
        workaround:
          'Prendre 1-2 heures pour configurer les workflows correctement. Après, l\'interface disparaît et tout fonctionne en auto.',
      },
    ],
    implementationGuide: [
      {
        step: 'Jour 1 : Créer structure',
        detail: 'Définir les départements, centres de coûts, hiérarchies d\'approbation.',
      },
      {
        step: 'Jour 1-2 : Créer les cartes',
        detail: 'Créer les cartes physiques et virtuelles. Les assigner aux collaborateurs ou projets.',
      },
      {
        step: 'Jour 2-3 : Paramétrer workflows',
        detail: 'Définir les règles d\'approbation. Tester avec quelques dépenses test.',
      },
      {
        step: 'Jour 3-4 : Intégration compta',
        detail:
          'Connecter à Pennylane / Sage. Vérifier que les transactions apparaissent avec les bons codes comptables.',
      },
      {
        step: 'Jour 4-7 : Formation',
        detail:
          'Formation utilisateurs sur comment demander une carte, comment faire une dépense, quels justificatifs fournir.',
      },
    ],
    stackCombos: [
      {
        title: 'Contrôle de cashflow complet',
        description: 'SaaS Series A avec dépenses maîtrisées',
        tools: ['Pennylane', 'Agicap', 'Spendesk'],
        context: 'Chaque dépense est contrôlée, approuvée, comptabilisée, suivie.',
      },
    ],
    faqExpanded: [
      {
        question: 'Combien coûte Spendesk ?',
        answer:
          'Spendesk démarre à 99 €/mois (Light, 1-5 cartes), 199 €/mois (Pro, 5-15 cartes), 299 €/mois (Business, 15+ cartes). Tarifs dégressifs selon volumes.',
      },
      {
        question: 'Spendesk vs Pleo vs Payhawk ?',
        answer:
          'Spendesk : workflows complexes, 15+ cartes, multi-devises (API avancée). Pleo : simple, rapide, <10 cartes. Payhawk : international, 50+ devises.',
      },
      {
        question: 'Les dépenses Spendesk comptabilisez automatiquement ?',
        answer:
          'Oui, avec l\'intégration Pennylane/Sage. Les écritures vont automatiquement dans le bon journal avec le bon code comptable.',
      },
    ],
  },
  payfit: {
    slug: 'payfit',
    verdict30s:
      'PayFit est le standard pour 5-150 salariés avec CCN principales. DSN automatique, pas d\'erreur, charges calculées sans risque. Portail collaborateur qui réduit les demandes RH. À 30 pers., le ROI est 3 mois.',
    advantages: [
      {
        title: 'DSN automatique sans erreur',
        description:
          'La Déclaration Sociale Nominative se génère automatiquement à partir des données PayFit. Pas d\'oubli de ligne, pas de rejet en correction.',
      },
      {
        title: 'Interface moderne et intuitive',
        description:
          'Pas de logiciel comptable des années 80. PayFit vous permet de faire des fiches paie complexes en 3 clicks.',
      },
      {
        title: 'Portail collaborateur fluide',
        description:
          'Les salariés ont accès à leurs bulletins, absences, documents. Zéro email "où est ma fiche paie ?".',
      },
      {
        title: 'Tarif prévisible et sans surprise',
        description:
          '27 €/mois par salarié en Essential, 49 €/mois en Performance. Pas de frais cachés. 30 pers = 810 €/mois (Essential).',
      },
      {
        title: 'Support français excellent',
        description:
          'Support Paris, réactif, pas de bot. Problème de calcul de cotisation ? 24h max pour réponse.',
      },
    ],
    limitations: [
      {
        title: 'Limité pour CCN très spécifiques',
        workaround:
          'CCN de secteur rares (maritime, spectacle) : passez sur Silae. PayFit couvre 90% des CCN classiques.',
      },
      {
        title: 'Ralentissements au-delà de 150 pers.',
        workaround:
          'À 150+ pers., l\'interface ralentit. Migrer sur Silae ou Lucca pour une vraie suite RH intégrée.',
      },
    ],
    implementationGuide: [
      {
        step: 'Jour 1 : Paramétrage entreprise',
        detail: 'Entrer les info légales, adresse, SIRET, convention collective.',
      },
      {
        step: 'Jour 1-2 : Import collaborateurs',
        detail:
          'Importer les fiches de paie depuis l\'ancien logiciel ou manuel. PayFit valide les données.',
      },
      {
        step: 'Jour 2-3 : Première paie',
        detail: 'Saisir les absences, heures supp, primes. Générer la 1ère fiche paie de test. Vérifier le calcul.',
      },
      {
        step: 'Jour 3-7 : DSN',
        detail:
          'Générer la DSN, la valider, l\'envoyer à l\'URSSAF. Vérifier qu\'elle passe sans rejet en correction.',
      },
      {
        step: 'Jour 7-14 : Formation collaborateurs',
        detail:
          'Former les salariés à utiliser le portail PayFit. Montrer où trouver leur fiche, comment signaler une absence.',
      },
    ],
    stackCombos: [
      {
        title: 'Suite RH légère',
        description: 'Comptabilité + paie',
        tools: ['Pennylane', 'PayFit'],
        context: 'Pour PME 5-30 pers. Pas de suite RH complète nécessaire.',
      },
      {
        title: 'Infrastructure RH complète',
        description: 'RH + paie + temps + absences',
        tools: ['Lucca'],
        context: 'Pour PME voulant intégration fluide. PayFit suffit si peu de besoin de gestion absence/temps.',
      },
    ],
    faqExpanded: [
      {
        question: 'Combien coûte PayFit ?',
        answer:
          '27 €/mois par salarié en Essential (calcul paie, DSN, portail). 49 €/mois/salarié en Performance (gestion absence, notes de frais intégrées). Pour 30 pers en Essential : 810 €/mois.',
      },
      {
        question: 'PayFit pour les startups en seed ?',
        answer:
          'Oui, dès la première embauche. 27 €/mois pour 1 salarié est raisonnable et ça évite un cabinet de paie externe.',
      },
      {
        question: 'PayFit peut-il gérer les primes et bonus ?',
        answer:
          'Oui, primes, bonus, stock options, tickets restaurant. La DSN se recalcule automatiquement avec ces éléments.',
      },
      {
        question: 'Comment migrer depuis un cabinet de paie ?',
        answer:
          'PayFit récupère l\'historique du cabinet (dernières 12 fiches). Les paramétrages (CCN, contributions) se configurent en 2 jours. Zéro interruption de service.',
      },
    ],
  },
};

export function getToolDetails(slug: string): ToolDetails | undefined {
  return toolDetails[slug];
}
