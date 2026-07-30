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
  /**
   * "Retour terrain" — anonymized client story with quantified outcomes
   * and a recommended stack. Added via TICKET 20 (mai 2026) on the 4
   * existing fiches; optional on others.
   */
  retourTerrain?: {
    clientStory: string;
    recommendedStack: {
      tools: string[];
      budget: string;
      roi: string;
    };
    relatedCategoryHref?: string;
    relatedCategoryLabel?: string;
  };
  /**
   * Contextual editorial mention linking to a related tool fiche —
   * distinct from the automated "Alternatives" list (same category,
   * no editorial framing). Added for the malibou integration (2026-07-30).
   */
  relatedMention?: {
    before: string;
    linkText: string;
    linkHref: string;
    after?: string;
  };
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
    retourTerrain: {
      clientStory:
        "Chez une SaaS B2B de 35 personnes (CA 4M€), nous avons déployé Pennylane en 2 semaines. Le temps de clôture est passé de 8 jours à 3 jours. Le rapprochement bancaire automatique économise 6 heures de traitement par mois. L'intégration native avec Agicap et Spendesk a éliminé les doubles saisies — gain de 8 heures supplémentaires par mois pour l'équipe finance.",
      recommendedStack: {
        tools: ['Pennylane', 'Agicap', 'Spendesk'],
        budget: '800-1 500 €/mois',
        roi: '3-6 mois',
      },
      relatedCategoryHref: '/ressources/outils/logiciels-comptabilite',
      relatedCategoryLabel: 'Voir le comparatif complet des logiciels de comptabilité',
    },
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
    retourTerrain: {
      clientStory:
        "Chez une scale-up SaaS de 60 personnes avec 4 comptes bancaires et une ligne de crédit, nous avons déployé Agicap en 2 semaines. Avant : le CFO consultait les comptes manuellement chaque lundi. Après : 3 scénarios à 13 semaines (pessimiste -20% CA, base, optimiste +30% CA) avec alertes cash automatiques 6 semaines avant rupture. La levée Series B a été anticipée et lancée 4 mois plus tôt — décote zéro.",
      recommendedStack: {
        tools: ['Pennylane', 'Agicap', 'Spendesk'],
        budget: '800-1 500 €/mois',
        roi: '3-6 mois',
      },
      relatedCategoryHref: '/ressources/outils/logiciels-tresorerie',
      relatedCategoryLabel: 'Voir le comparatif complet des logiciels de trésorerie',
    },
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
    retourTerrain: {
      clientStory:
        "Chez un e-commerce D2C de 28 personnes, nous avons déployé Spendesk en 10 jours. Avant : 14 cartes Mastercard partagées entre 8 personnes, justificatifs perdus, 8 heures d'admin par clôture. Après : 28 cartes virtuelles dédiées (une par service SaaS), workflows d'approbation (CEO > 1K€, manager < 500€), export comptable automatique vers Pennylane. Gain : 6-8 heures par clôture mensuelle, zéro justificatif perdu.",
      recommendedStack: {
        tools: ['Pennylane', 'Spendesk', 'Agicap'],
        budget: '800-1 500 €/mois',
        roi: '3-6 mois',
      },
      relatedCategoryHref: '/ressources/outils/gestion-depenses',
      relatedCategoryLabel: 'Voir le comparatif complet des outils de gestion des dépenses',
    },
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
    retourTerrain: {
      clientStory:
        "Chez une SaaS B2B de 45 personnes (CCN SYNTEC, forfait jours), nous avons migré la paie depuis un cabinet traditionnel vers PayFit en 5 jours. Avant : 3 erreurs de paie sur 18 mois, DSN envoyée en retard 2 fois, satisfaction salariés sur la paie à 3,1/5. Après : zéro erreur en 18 mois, DSN automatique, portail collaborateur ayant réduit de 40% les questions RH, satisfaction salariés à 4,3/5.",
      recommendedStack: {
        tools: ['Pennylane', 'PayFit', 'Lucca'],
        budget: '40-60 €/salarié/mois',
        roi: '2-3 mois',
      },
      relatedCategoryHref: '/ressources/outils/logiciels-paie',
      relatedCategoryLabel: 'Voir le comparatif complet des logiciels de paie',
    },
    relatedMention: {
      before: 'Vous recherchez une solution incluant la production des bulletins par un gestionnaire dédié ? Consultez également notre',
      linkText: 'avis sur malibou',
      linkHref: '/ressources/outils/malibou',
      after: '.',
    },
  },
  // ─── 9 fiches outils ajoutées via TICKET 5 ───────────────────────────
  sage: {
    slug: 'sage',
    verdict30s:
      "Sage est le standard historique de la comptabilité française pour les PME industrielles et les structures avec gestion de stocks complexe. Si vous gérez des lots, de la traçabilité ou des immobilisations lourdes, Sage reste incontournable malgré une UX moins moderne. L'écosystème expert-comptable autour de Sage est le plus dense en France — 99% des cabinets sont familiers avec l'outil. Pour les besoins de comptabilité analytique multi-axes ou de consolidation multi-sociétés, Sage conserve un avantage fonctionnel significatif.",
    advantages: [
      { title: 'Gestion stocks avancée', description: 'Lots, traçabilité, numéros de série, gestion des coûts de production — Sage couvre des besoins que Pennylane ne gère pas encore nativement.' },
      { title: 'Module immobilisations complet', description: 'Amortissements linéaires et dégressifs, dépréciations IFRS, suivis des cessions et plus-values — essentiel pour les entreprises avec un parc d\'équipements significatif.' },
      { title: 'Compatibilité expert-comptable', description: 'La quasi-totalité des cabinets comptables français maîtrisent Sage. La synchronisation comptable est fluide et éprouvée.' },
      { title: 'Multi-sociétés et consolidation', description: 'Pour les groupes avec plusieurs entités, Sage permet la consolidation automatique des comptes — indispensable à ce stade.' },
    ],
    limitations: [
      { title: 'UX datée', workaround: 'Courbe d\'apprentissage plus longue que les outils modernes. Prévoyez un accompagnement formation pour les non-comptables.' },
      { title: 'Implémentation lourde', workaround: 'Comptez 4 à 12 semaines selon la complexité (contre 1 à 3 pour Pennylane). Le paramétrage initial est plus exigeant.' },
      { title: 'API moins ouverte', workaround: 'Les intégrations tierces sont plus limitées. Vérifiez la compatibilité avec Agicap, Spendesk avant de migrer.' },
      { title: 'Support parfois lent', workaround: 'Le support Sage peut être moins réactif que celui des solutions cloud natives. Privilégiez les partenaires intégrateurs.' },
    ],
    implementationGuide: [
      { step: 'Jour 1-7 : Audit & paramétrage', detail: 'Audit de la comptabilité existante, paramétrage du plan comptable, configuration des axes analytiques, import des immobilisations.' },
      { step: 'Jour 7-14 : Import & tests', detail: 'Import des balances, paramétrage stocks/immobilisations, tests de saisie, formation des utilisateurs.' },
      { step: 'Jour 14-30 : Première clôture', detail: 'Première clôture test en parallèle de l\'ancien système, ajustements, validation par l\'expert-comptable.' },
      { step: 'Jour 30-90 : Stabilisation', detail: 'Ajustements finaux, documentation des process, autonomie progressive de l\'équipe.' },
    ],
    stackCombos: [
      { title: 'Stack industrie', description: 'PME industrielles avec stocks complexes et immobilisations.', tools: ['Sage', 'Silae', 'Agicap'], context: 'Industrie 30-150 pers. avec gestion de production.' },
      { title: 'Stack PME établie', description: 'PME services matures avec besoins RH étendus.', tools: ['Sage', 'Lucca', 'Fygr'], context: 'PME 50-150 pers., paie standardisée, budget trésorerie maîtrisé.' },
      { title: 'Stack groupe en croissance', description: 'Groupes multi-sociétés avec besoins de consolidation.', tools: ['Sage', 'PayFit', 'Agicap'], context: 'Groupes 100+ pers., 2-5 entités à consolider.' },
    ],
    faqExpanded: [
      { question: 'Combien coûte Sage ?', answer: 'Sage 100cloud démarre à 99 €/mois, Sage Intacct à 499 €/mois. L\'implémentation coûte entre 3 000 € et 15 000 € selon la complexité.' },
      { question: 'Sage vs Pennylane ?', answer: 'Sage = stocks complexes, immobilisations, industrie, multi-sociétés. Pennylane = SaaS, services, UX moderne, API ouverte. Choisissez selon votre secteur et vos besoins analytiques.' },
      { question: 'Peut-on migrer de Sage à Pennylane ?', answer: 'Oui, mais complexe si vous avez des stocks. La migration des balances prend 2-4 semaines. Les stocks doivent être reconstitués manuellement.' },
      { question: 'Quel délai d\'implémentation ?', answer: '4 à 12 semaines selon la complexité. Une PME simple compte 4-6 semaines, un groupe multi-sites peut monter à 12.' },
    ],
  },
  'cegid-loop': {
    slug: 'cegid-loop',
    verdict30s:
      "Cegid Loop — anciennement Cegid Quadra en ligne — est la version cloud de l'écosystème Cegid. Il brille quand votre expert-comptable est déjà dans cet écosystème : la synchronisation comptable est quasi instantanée. Pour le retail et la distribution, les modules spécifiques (caisse, gestion de magasin, stocks multi-dépôts) sont solides. L'interface s'est modernisée mais reste moins intuitive que Pennylane pour les non-initiés. L'écosystème est relativement fermé mais la couverture fonctionnelle est complète pour les PME françaises.",
    advantages: [
      { title: 'Synchronisation native expert-comptable Cegid', description: 'Si votre cabinet utilise Cegid, la reprise comptable est automatisée. Gain de temps : 2-3 heures par clôture.' },
      { title: 'Modules retail avancés', description: 'Caisse enregistreuse, gestion de magasin, stocks multi-dépôts, promotions — pensés pour le commerce.' },
      { title: 'Gestion multi-établissements', description: 'Centralisation des comptes, reporting consolidé par point de vente.' },
      { title: 'Conformité fiscale française', description: 'Mises à jour réglementaires automatiques, conformité TVA, liasses fiscales.' },
    ],
    limitations: [
      { title: 'Écosystème fermé', workaround: 'Moins d\'intégrations tierces que Pennylane. La connexion avec Agicap ou Spendesk nécessite des développements spécifiques.' },
      { title: "Courbe d'apprentissage", workaround: 'L\'interface s\'est améliorée mais reste moins intuitive pour les utilisateurs non-comptables.' },
      { title: 'Support dépendant du réseau', workaround: 'La qualité du support varie selon votre canal de distribution Cegid. Privilégiez les partenaires premium.' },
    ],
    implementationGuide: [
      { step: 'Semaine 1 : Paramétrage', detail: 'Configuration du plan comptable, axes analytiques, établissements. Coordination avec l\'expert-comptable.' },
      { step: 'Semaine 2 : Import & formation', detail: 'Import balances, formation utilisateurs, tests de saisie.' },
      { step: 'Semaine 3-4 : Clôture test', detail: 'Première clôture en parallèle, ajustements, validation.' },
      { step: 'Semaine 5-6 : Stabilisation', detail: 'Documentation, autonomie, suivi post-implémentation.' },
    ],
    stackCombos: [
      { title: 'Stack retail', description: 'Multi-magasin avec besoins caisse et stocks.', tools: ['Cegid Loop', 'PayFit', 'Qonto'], context: 'Retail 5-30 points de vente, gestion stocks multi-dépôts.' },
      { title: 'Stack distribution', description: 'Distribution avec logistique et paie complexe.', tools: ['Cegid Loop', 'Silae', 'Agicap'], context: 'Distribution multi-sites, salariés multi-conventions.' },
    ],
    faqExpanded: [
      { question: 'Cegid Loop vs Pennylane ?', answer: 'Cegid Loop = retail, expert-comptable Cegid, multi-établissements. Pennylane = SaaS, UX moderne, écosystème ouvert.' },
      { question: 'Quel délai d\'implémentation ?', answer: '2 à 6 semaines selon la complexité. Retail multi-magasin = 6 semaines.' },
      { question: 'Quel prix ?', answer: '79-299 €/mois selon les modules. Implémentation : 2 000 € à 8 000 €.' },
    ],
  },
  fygr: {
    slug: 'fygr',
    verdict30s:
      "Fygr est l'alternative économique à Agicap pour les PME avec des besoins de trésorerie simples. À moins de 100 €/mois, il offre une visibilité claire sur votre cash position, des prévisions à court terme et un module budget vs réalité. L'onboarding se fait en une demi-journée. L'interface est épurée. Si vous avez 1-2 comptes bancaires et que vous cherchez un outil de trésorerie sans fioritures, Fygr fait le job à 3 fois moins cher qu'Agicap. Dès que vous avez des besoins multi-banques avancés, des scénarios complexes ou une trésorerie internationale, il faut passer à Agicap.",
    advantages: [
      { title: 'Prix attractif', description: '3 fois moins cher qu\'Agicap. À 49 €/mois en moyenne, le ROI est immédiat pour une PME.' },
      { title: 'Interface simple et rapide', description: 'Pas de courbe d\'apprentissage. Un dirigeant non-financier est autonome en 1 heure.' },
      { title: 'Budget vs réalité intégré', description: 'Suivi mensuel des écarts entre budget et réalisations — essentiel pour le contrôle de gestion des PME.' },
      { title: 'Onboarding express', description: 'En 1-2 jours, votre trésorerie est connectée et vos prévisions sont visibles.' },
    ],
    limitations: [
      { title: 'Moins de banques connectées', workaround: '15 banques contre 120+ pour Agicap. Vérifiez la compatibilité avant.' },
      { title: 'Pas de scénarios multiples avancés', workaround: 'Deux scénarios (optimiste/pessimiste) contre une infinité chez Agicap.' },
      { title: 'Support par email uniquement', workaround: 'Pas de support téléphonique — réponse sous 24-48 h.' },
    ],
    implementationGuide: [
      { step: 'Jour 1 : Connexion bancaire', detail: 'Connexion des comptes bancaires (15 min), synchronisation des transactions historiques.' },
      { step: 'Jour 1-2 : Paramétrage', detail: 'Définition des catégories de flux, création du budget initial, paramétrage des alertes.' },
      { step: 'Jour 2 : Première prévision', detail: 'Génération de la première prévision de trésorerie à 13 semaines, revue avec le DAF.' },
      { step: 'Semaine 2 : Ajustements', detail: 'Ajustement des catégories, affinement du budget, activation des alertes.' },
    ],
    stackCombos: [
      { title: 'PME économique', description: 'PME avec besoins trésorerie simples et budget serré.', tools: ['Pennylane', 'Fygr', 'PayFit'], context: 'PME 10-50 pers., 1-2 banques, paie standard.' },
      { title: 'Startup budget', description: 'Startup seed avec optimisation des coûts outils.', tools: ['Qonto', 'Fygr', 'Spendesk'], context: 'Startup < 20 pers., trésorerie simple, ROI immédiat.' },
    ],
    faqExpanded: [
      { question: 'Fygr vs Agicap ?', answer: 'Fygr = simple, économique, PME 10-80 pers. Agicap = puissant, multi-banques, scénarios complexes. Budget < 80 pers. = Fygr. Budget > 80 pers. ou multi-banques = Agicap.' },
      { question: 'Quel prix ?', answer: '29-99 €/mois selon le nombre de comptes connectés.' },
      { question: 'Quelles banques ?', answer: '15 banques principales (BNP, Société Générale, Crédit Mutuel, Qonto, Revolut, etc.).' },
    ],
  },
  pleo: {
    slug: 'pleo',
    verdict30s:
      "Pleo est le Spendesk des petites structures. Si vous avez moins de 10 cartes et que vous privilégiez la simplicité d'utilisation, Pleo est plus rapide à déployer et plus intuitif au quotidien. L'onboarding se fait en 10 minutes : chaque collaborateur télécharge l'app, reçoit sa carte virtuelle instantanément et peut dépenser. L'intégration avec Pennylane est native. Le rapport qualité/prix est excellent pour les startups en seed et Series A early. Dès 15 cartes et des workflows d'approbation complexes, Spendesk devient plus adapté.",
    advantages: [
      { title: 'Onboarding en 10 minutes', description: 'Pas de formation nécessaire. Chaque collaborateur est autonome dès la réception de la carte.' },
      { title: 'Cartes virtuelles instantanées', description: 'Parfait pour les abonnements SaaS (Stripe, AWS, Google Ads) — une carte virtuelle par service.' },
      { title: 'Intégration Pennylane native', description: 'Les écritures comptables (TVA, compte de charges, justificatifs) sont synchronisées automatiquement.' },
      { title: 'App mobile fluide', description: 'Scan de justificatifs en temps réel, catégorisation automatique, suivi des budgets.' },
    ],
    limitations: [
      { title: "Workflows d'approbation basiques", workaround: 'Un seul niveau d\'approbation. Pas de règles conditionnelles par montant/département.' },
      { title: 'Pas de gestion multi-entités', workaround: 'Une seule entité par compte — impossible pour les groupes.' },
      { title: 'Reporting moins poussé', workaround: 'Pas de tableaux de bord avancés ni d\'analyse par cost center.' },
    ],
    implementationGuide: [
      { step: 'Jour 1 matin : Inscription', detail: 'Création du compte, vérification KYC (30 min), commande des cartes physiques.' },
      { step: 'Jour 1 après-midi : Déploiement', detail: 'Création des cartes virtuelles, invitation des collaborateurs, paramétrage des limites.' },
      { step: 'Jour 2 : Connexion comptable', detail: 'Connexion à Pennylane (5 min), test de synchronisation comptable.' },
      { step: 'Semaine 1 : Stabilisation', detail: 'Ajustement des limites, activation des règles de catégorisation, premier export comptable.' },
    ],
    stackCombos: [
      { title: 'Startup seed', description: 'Startup en démarrage avec besoins basiques.', tools: ['Qonto', 'Pleo', 'Pennylane'], context: 'Seed < 15 pers., simplicité avant tout.' },
      { title: 'SaaS early', description: 'SaaS en Series A early avec besoin de trésorerie.', tools: ['Pennylane', 'Pleo', 'Agicap Lite'], context: 'SaaS 10-30 pers., budget outils maîtrisé.' },
    ],
    faqExpanded: [
      { question: 'Pleo vs Spendesk ?', answer: 'Pleo < 15 pers., simplicité, onboarding rapide. Spendesk > 15 pers., workflows complexes, reporting avancé. Budget : Pleo 35-79 €/mois, Spendesk 99-299 €/mois.' },
      { question: 'Quel prix ?', answer: 'Essential 35 €/mois, Advanced 79 €/mois. Cartes illimitées incluses.' },
      { question: 'Intégration comptable ?', answer: 'Pennylane (native), Sage, Cegid via export.' },
    ],
  },
  silae: {
    slug: 'silae',
    verdict30s:
      "Silae est la solution paie pour les structures complexes. Dès que vous avez une convention collective rare (BTP, spectacle, maritime, hôtellerie de luxe), des règles de gestion des temps sophistiquées ou des salariés multi-statuts (CDI, CDD, intermittent, apprenti), Silae gère ce que PayFit ne peut pas traiter nativement. La couverture conventionnelle est la plus exhaustive du marché : plus de 600 conventions collectives. Le module Silae Expert synchronise directement avec la comptabilité.",
    advantages: [
      { title: 'CCN rares couvertes', description: 'Plus de 600 conventions collectives — du BTP au spectacle vivant. PayFit en couvre environ 40 principales.' },
      { title: 'Gestion des temps intégrée', description: 'Heures réelles, forfaits jours, modulation, compteurs multiples — centralisés dans un seul outil.' },
      { title: 'Silae Expert', description: 'Synchronisation comptable automatique avec votre logiciel de compta. Les écritures de paie sont générées sans intervention manuelle.' },
      { title: "Module DUE intégré", description: 'Déclaration unique d\'embauche aux organismes sociaux automatisée.' },
    ],
    limitations: [
      { title: 'Interface moins moderne', workaround: 'L\'UX est fonctionnelle mais datée comparée à PayFit. Les salariés préfèrent généralement le portail PayFit.' },
      { title: "Courbe d'apprentissage", workaround: 'Le paramétrage initial demande une expertise — comptez 2-4 semaines avec accompagnement.' },
      { title: 'Prix plus élevé', workaround: '60-90 €/salarié/mois contre 27-49 € pour PayFit. Justifié par la complexité gérée.' },
    ],
    implementationGuide: [
      { step: 'Semaine 1 : Audit & paramétrage', detail: 'Analyse des conventions collectives, statuts salariés, règles de gestion des temps. Paramétrage Silae.' },
      { step: 'Semaine 2 : Migration', detail: 'Import des données paie historiques, soldes de congés, paramètres individuels. Test de la première paie.' },
      { step: 'Semaine 3-4 : Stabilisation', detail: 'Ajustements des calculs, validation avec l\'expert-comptable, formation des utilisateurs RH.' },
      { step: 'Mois 2+ : Suivi', detail: 'Points mensuels d\'ajustement, veille conventionnelle, mises à jour réglementaires.' },
    ],
    stackCombos: [
      { title: 'BTP / Spectacle', description: 'Secteurs à CCN rares et gestion des temps complexe.', tools: ['Silae', 'Sage', 'Agicap'], context: 'BTP / spectacle 20-100 pers., heures réelles.' },
      { title: 'PME complexe', description: 'PME avec besoins RH approfondis.', tools: ['Silae', 'Pennylane', 'Lucca'], context: 'PME 50-200 pers., multi-conventions, suite RH étendue.' },
    ],
    faqExpanded: [
      { question: 'Silae vs PayFit ?', answer: 'Silae = CCN rares, multi-conventions, gestion temps complexe. PayFit = CCN standard, UX moderne, < 150 salariés. Budget : Silae 60-90 €/salarié/mois, PayFit 27-49 €.' },
      { question: 'Quel délai d\'implémentation ?', answer: '2 à 4 semaines selon la complexité. BTP multi-chantiers = 4 semaines.' },
      { question: 'Combien de CCN couvertes ?', answer: 'Plus de 600 conventions collectives — la couverture la plus exhaustive du marché.' },
    ],
    relatedMention: {
      before: 'Certaines plateformes, comme',
      linkText: 'malibou',
      linkHref: '/ressources/outils/malibou',
      after: ', utilisent la technologie Silae tout en proposant une interface RH et un accompagnement paie intégré.',
    },
  },
  lucca: {
    slug: 'lucca',
    verdict30s:
      "Lucca est la suite RH qui va au-delà de la paie. Gestion des absences, temps de travail, notes de frais, onboarding, gestion des talents — tout est intégré dans un seul écosystème modulaire. Notre recommandation quand PayFit devient insuffisant côté RH pur. Lucca + PayFit = stack RH complet : Lucca gère le RH (absences, temps, frais, onboarding), PayFit la paie. La combinaison couvre 95% des besoins RH d'une PME 20-150 personnes. L'implémentation demande un admin RH dédié et un budget qui grimpe vite avec les modules — mais le gain en productivité administrative est considérable.",
    advantages: [
      { title: 'Suite RH complète', description: '8 modules : absences, temps, notes de frais, onboarding, gestion des talents, annuaire, règlement intérieur, entretiens annuels.' },
      { title: 'Intégration PayFit', description: 'La synchronisation paie/RH est fluide. Les absences Lucca alimentent automatiquement les variables de paie PayFit.' },
      { title: 'Workflows RH personnalisables', description: 'Règles de validation par département, par montant, par type de demande — très flexibles.' },
      { title: 'Portail collaborateur complet', description: 'Chaque salarié accède à son espace personnel : solde de congés, fiches de paie, notes de frais, annuaire — sur mobile.' },
    ],
    limitations: [
      { title: 'Nécessite un admin RH dédié', workaround: 'Lucca est puissant mais demande un administrateur pour le paramétrer et le maintenir. Budgetez 0,5 ETP RH.' },
      { title: 'Prix qui grimpe vite', workaround: '39 €/mois pour le module de base, mais chaque module additionnel augmente le coût. PME avec 5 modules = 8 000-12 000 €/an.' },
      { title: 'Implémentation plus longue', workaround: '2-4 semaines selon les modules activés — contre 1-2 jours pour PayFit.' },
    ],
    implementationGuide: [
      { step: 'Semaine 1 : Cadrage & choix modules', detail: 'Sélection des modules pertinents, cadrage des workflows, paramétrage initial.' },
      { step: 'Semaine 2 : Déploiement', detail: 'Configuration des workflows, import des données, formation admin RH.' },
      { step: 'Semaine 3 : Déploiement collaborateurs', detail: 'Invitation des salariés, formation, activation module par module.' },
      { step: 'Semaine 4 : Connexion PayFit', detail: 'Synchronisation absences/paie, test du flux complet.' },
    ],
    stackCombos: [
      { title: 'Suite RH complète', description: 'PME avec besoins RH étendus et paie standard.', tools: ['Lucca', 'PayFit', 'Pennylane'], context: 'PME 30-150 pers., CCN SYNTEC, RH structurée.' },
      { title: 'PME 50+ pers.', description: 'PME mature avec admin RH dédié.', tools: ['Lucca', 'PayFit', 'Agicap'], context: 'PME 50-200 pers., 8 modules Lucca, trésorerie pilotée.' },
    ],
    faqExpanded: [
      { question: 'Lucca remplace-t-il PayFit ?', answer: 'Non. Lucca gère le RH (absences, temps, frais). PayFit gère la paie. Ils se complètent — la synchronisation est native.' },
      { question: 'Quel prix ?', answer: '39-149 €/mois selon les modules. Budget annuel moyen pour une PME 50 pers. : 6 000-10 000 €.' },
      { question: 'Quel délai ?', answer: '2-4 semaines selon le nombre de modules.' },
    ],
  },
  qonto: {
    slug: 'qonto',
    verdict30s:
      "Qonto est la banque des entrepreneurs français. Un IBAN FR, des cartes physiques et virtuelles instantanées, une intégration native avec Pennylane, Agicap et Spendesk — le tout à 9 €/mois pour démarrer. L'ouverture de compte se fait en 10 minutes depuis votre téléphone. Les virements SEPA sont instantanés, les cartes virtuelles permettent de gérer les abonnements SaaS sans risque, et le rapprochement bancaire dans Pennylane est transparent. Ses limites : IBAN FR uniquement, change limité, plafonds de dépôt en espèces. Mais à 9 €/mois, le ROI est immédiat.",
    advantages: [
      { title: 'Compte pro en 10 minutes', description: 'Pas de rendez-vous, pas de paperasse. KYC en ligne, IBAN FR immédiat.' },
      { title: 'Cartes physiques et virtuelles instantanées', description: 'Une carte physique par dirigeant, des cartes virtuelles illimitées pour les abonnements — sécurisées par blocage instantané.' },
      { title: 'Intégration comptable native', description: 'Pennylane, Agicap, Spendesk, Dext — toutes les connexions sont fluides. Le rapprochement bancaire est automatique.' },
      { title: 'Virements SEPA instantanés', description: 'Gratuits et instantanés — essentiel pour la trésorerie quotidienne.' },
    ],
    limitations: [
      { title: 'IBAN FR uniquement', workaround: 'Pas d\'IBAN GBP ou USD natif. Pour du business UK/US, Revolut Business est mieux adapté.' },
      { title: 'Change limité', workaround: 'Pas de multi-devises avancé. Le change est possible mais avec des taux moins compétitifs que Revolut.' },
      { title: 'Plafonds de dépôt en espèces', workaround: '3 000 €/mois maximum — insuffisant pour les entreprises cash-heavy.' },
    ],
    implementationGuide: [
      { step: 'Jour 1 (10 min) : Inscription', detail: 'Création du compte en ligne, vérification KYC, réception de l\'IBAN.' },
      { step: 'Jour 1 (30 min) : Configuration', detail: 'Commande des cartes, création des cartes virtuelles, paramétrage des plafonds.' },
      { step: 'Jour 2 : Connexion comptable', detail: 'Connexion à Pennylane et Agicap (5 min chacune), activation du rapprochement automatique.' },
      { step: 'Semaine 1 : Migration', detail: 'Transfert des flux récurrents (abonnements, prélèvements) sur le nouveau compte.' },
    ],
    stackCombos: [
      { title: 'Startup française', description: 'Startup FR avec stack moderne et budget maîtrisé.', tools: ['Qonto', 'Pennylane', 'Pleo'], context: 'Startup 5-30 pers., 100% France, ROI immédiat.' },
      { title: 'PME digitale', description: 'PME digitale en croissance.', tools: ['Qonto', 'Pennylane', 'Agicap', 'PayFit'], context: 'PME 20-100 pers., stack financier complet.' },
    ],
    faqExpanded: [
      { question: 'Qonto vs Revolut Business ?', answer: 'Qonto = France, UX pro, intégration comptable. Revolut = international, 30+ devises, change interbancaire. France uniquement = Qonto. Business UK/US = Revolut.' },
      { question: 'Quel prix ?', answer: 'Basic 9 €/mois, Smart 29 €/mois, Multi 79 €/mois.' },
      { question: 'Protection des fonds ?', answer: 'Oui, Qonto est un établissement de paiement agréé par l\'ACPR. Fonds protégés par le mécanisme de ségrégation.' },
    ],
  },
  'revolut-business': {
    slug: 'revolut-business',
    verdict30s:
      "Revolut Business est la banque des startups internationales. 30+ devises avec change au taux interbancaire, des IBAN GBP, EUR et USD dans un seul compte, et des intégrations avec Stripe, PayPal et Shopify. Si vous avez des clients ou des fournisseurs à l'étranger, Revolut économise 2 à 3% sur chaque change par rapport aux banques traditionnelles. À 500K€ de flux internationaux annuels, cela représente 10 000-15 000€ d'économie. Le compte Standard est gratuit et suffisant pour démarrer.",
    advantages: [
      { title: '30+ devises, change interbancaire', description: 'Le taux de change est celui du marché — sans marge de la banque. Économie de 2-3% par transaction.' },
      { title: 'IBAN multi-pays', description: 'GBP (UK), EUR (Europe), USD (États-Unis) — dans un seul compte. Vos clients anglais paient en GBP, vos clients américains en USD.' },
      { title: 'Intégration e-commerce', description: 'Connexion native Stripe, PayPal, Shopify. Les encaissements sont centralisés et convertis automatiquement.' },
      { title: 'Compte gratuit (Standard)', description: 'Suffisant pour démarrer. Les fonctionnalités avancées sont dans les plans payants (Growth 99 €/mois, Scale 139 €/mois).' },
    ],
    limitations: [
      { title: 'Support par chat uniquement', workaround: 'Pas de téléphone, pas de conseiller dédié en Standard. Réponse sous 24h en moyenne.' },
      { title: 'Compte non rémunéré', workaround: 'Les dépôts ne génèrent pas d\'intérêts — contrairement à certaines banques traditionnelles.' },
      { title: 'Frais de retrait en espèces', workaround: '2% au-delà de 1 000 €/mois.' },
      { title: 'Pas de crédit structuré', workaround: 'Pas de ligne de crédit, pas de caution bancaire — il faut compléter avec une banque traditionnelle.' },
    ],
    implementationGuide: [
      { step: 'Jour 1 (15 min) : Inscription', detail: 'Création du compte, vérification KYC, accès immédiat.' },
      { step: 'Jour 1 (30 min) : Configuration', detail: 'Activation des IBAN GBP/EUR/USD, création des cartes, paramétrage des utilisateurs.' },
      { step: 'Jour 2 : Connexion', detail: 'Lien avec Stripe/PayPal/Shopify, test d\'un encaissement.' },
      { step: 'Semaine 1 : Migration', detail: 'Transfert des flux internationaux, notification des clients/fournisseurs des nouveaux IBAN.' },
    ],
    stackCombos: [
      { title: 'Startup internationale', description: 'Startup avec activité multi-pays.', tools: ['Revolut Business', 'Qonto', 'Pennylane'], context: 'Startup 10-50 pers., FR + UK/US, double banque.' },
      { title: 'E-commerce cross-border', description: 'E-commerce avec encaissements multi-devises.', tools: ['Revolut Business', 'Stripe', 'Pennylane'], context: 'E-commerce 20-100 pers., flux Europe + UK/US.' },
    ],
    faqExpanded: [
      { question: 'Revolut vs Qonto ?', answer: 'Revolut = international, 30+ devises, change interbancaire. Qonto = France, UX pro, intégration comptable. Beaucoup de clients utilisent les deux : Qonto pour la France, Revolut pour l\'international.' },
      { question: 'Le compte gratuit suffit-il ?', answer: 'Le Standard (gratuit) suffit pour les flux < 50K€/mois. Au-delà, le Growth (99 €/mois) avec API et multi-utilisateurs est recommandé.' },
      { question: 'Mes fonds sont-ils sécurisés ?', answer: 'Oui, Revolut est agréé par la FCA (UK) et la BCE. Les fonds sont ségrégués chez des banques tierces de rang A.' },
    ],
  },
  payhawk: {
    slug: 'payhawk',
    verdict30s:
      "Payhawk est le Spendesk des entreprises internationales. 50+ devises avec cartes multi-pays, des workflows d'approbation sophistiqués, un reporting avancé par entité et cost center, et des intégrations ERP (SAP, Oracle, NetSuite) que Spendesk n'a pas encore. Si vous avez des équipes dans 3+ pays, que vous dépensez en 5+ devises, et que vous avez besoin de consolider les dépenses de plusieurs entités légales, Payhawk remplace Spendesk sans hésitation. Le prix est 3 fois plus élevé et l'implémentation demande 2-4 semaines — mais pour une ETI de 200 personnes avec une organisation internationale, c'est un investissement rentabilisé en quelques mois.",
    advantages: [
      { title: '50+ devises, cartes multi-pays', description: 'Des cartes en EUR, GBP, USD et plus — avec des plafonds personnalisés par pays et par département.' },
      { title: 'Reporting avancé par entité', description: 'Consolidation des dépenses par société, cost center, projet — avec des tableaux de bord en temps réel.' },
      { title: 'Intégration ERP', description: 'SAP, Oracle, NetSuite, Microsoft Dynamics — les écritures comptables sont synchronisées directement dans votre ERP.' },
      { title: "Workflows d'approbation sophistiqués", description: 'Règles conditionnelles par montant, devise, catégorie, département — avec délégations d\'approbation configurables.' },
    ],
    limitations: [
      { title: 'Prix élevé', workaround: '149-499 €/mois — 3 fois plus cher que Spendesk. Budget à prévoir en conséquence.' },
      { title: 'Implémentation longue', workaround: '2-4 semaines avec un project manager dédié. Pas de setup en 1 jour comme Pleo.' },
      { title: 'Overkill pour les petites structures', workaround: '< 50 pers. avec dépenses locales = Spendesk suffit.' },
    ],
    implementationGuide: [
      { step: 'Semaine 1 : Cadrage', detail: 'Analyse de l\'organisation (entités, cost centers, workflows actuels), configuration initiale.' },
      { step: 'Semaine 2 : Paramétrage', detail: 'Création des entités, workflows d\'approbation, catégories de dépenses, émission des cartes.' },
      { step: 'Semaine 3 : Tests', detail: 'Tests de bout en bout par pays, validation des flux comptables, formation des admin locaux.' },
      { step: 'Semaine 4 : Déploiement', detail: 'Rollout pays par pays, support hypercare, documentation.' },
    ],
    stackCombos: [
      { title: 'ETI internationale', description: 'ETI multi-pays avec ERP en place.', tools: ['Payhawk', 'SAP / NetSuite', 'Revolut Business'], context: 'ETI 100-500 pers., 3+ pays, ERP déployé.' },
      { title: 'Scale-up multi-pays', description: 'Scale-up en hyper-croissance internationale.', tools: ['Payhawk', 'Pennylane', 'Agicap', 'Revolut Business'], context: 'Scale-up 50-200 pers., 3+ entités, expansion européenne.' },
    ],
    faqExpanded: [
      { question: 'Payhawk vs Spendesk ?', answer: 'Payhawk = 50+ devises, ERP, multi-entités, 50-500 pers. Spendesk = workflows, < 50 devises, 15-200 pers. Budget : Payhawk 149-499 €/mois, Spendesk 99-299 €/mois.' },
      { question: 'Quel délai d\'implémentation ?', answer: '2-4 semaines selon le nombre de pays et d\'entités.' },
      { question: 'Intégration ERP ?', answer: 'SAP, Oracle, NetSuite, Microsoft Dynamics, Datev — synchronisation native.' },
    ],
  },
};

export function getToolDetails(slug: string): ToolDetails | undefined {
  return toolDetails[slug];
}
