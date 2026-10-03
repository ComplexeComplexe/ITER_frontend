/** Product facts come from the linked documentation, not invented deployment results. */
export const PENNYLANE_REVIEW = {
  path: "/ressources/outils/pennylane",
  reviewedAt: "2026-10-03",
  title: "Avis Pennylane : avantages, limites et choix d’un DAF",
  description:
    "Notre avis Pennylane pour dirigeants et DAF : comptabilité, analytique, tarifs par formule, limites et contrôles de migration. Sources vérifiées et critères concrets.",
  headline: "Avis Pennylane : faut-il le choisir pour votre finance ?",
  intro:
    "Un dirigeant attend plus qu’une liste de fonctionnalités : des comptes compréhensibles, des échéances fiables et des données utilisables pour décider. Voici notre analyse de Pennylane sous l’angle de la direction financière, avec les conditions qui rendent le choix pertinent et les contrôles à effectuer avant de migrer.",
  verdict:
    "Pennylane mérite d’être présélectionné pour rapprocher facturation, dépenses et comptabilité dans un environnement partagé avec le cabinet comptable. Le point décisif reste votre organisation : qui complète les pièces, contrôle les écritures et explique les écarts ? Pour une activité avec stocks, production ou consolidation complexe, partez des flux à couvrir avant de décider s’il suffit seul ou doit être connecté à un autre système.",
  strengths: [
    "Des échanges autour des mêmes documents plutôt que des fichiers dispersés.",
    "Une analyse des activités à construire à partir de catégories et de règles communes.",
    "Une API Entreprise documentée pour relier les outils conservés, selon l’abonnement.",
  ],
  cautions: [
    "La formule et les accès conditionnent les fonctions réellement disponibles.",
    "La migration d’un dossier déjà actif demande un contrôle des doublons.",
    "Le tableau de bord reste dépendant des comptes, des pièces et des écritures disponibles.",
  ],
  profiles: [
    {
      title: "Une présélection pertinente",
      text: "Votre entreprise veut regrouper les pièces, les ventes et les dépenses, et travailler avec un cabinet qui accepte cette organisation. Vous pouvez nommer un responsable des données et définir une cadence de revue. La démonstration doit couvrir une facture client, une dépense, son règlement et leur restitution dans le reporting.",
    },
    {
      title: "Un choix à approfondir",
      text: "Votre besoin principal concerne la production, les stocks, des règles de consolidation ou des flux internationaux particuliers. Ne déduisez pas de la présence d’un module comptable que tout le cycle métier est couvert. Décrivez les opérations par entité, les systèmes à conserver et les interfaces nécessaires ; faites confirmer le périmètre par écrit.",
    },
  ],
  criteria: [
    {
      title: "Comptabilité : partager ne signifie pas valider",
      fact: "La documentation distingue les fonctions de gestion, la collaboration avec le cabinet et la production comptable selon l’abonnement.",
      analysis:
        "Le critère de choix est la répartition des responsabilités. Demandez qui valide les imputations, traite les pièces absentes et arrête les périodes. Un chiffre visible rapidement peut encore changer après une facture manquante ou une écriture de régularisation. Exigez un exemple de revue de comptes et une liste des contrôles qui restent humains.",
      source: "plans",
    },
    {
      title: "Analytique : concevoir les axes avant de les créer",
      fact: "Pour un plan analytique structuré, Pennylane indique que l’ordre des axes et la longueur des codes ne sont plus modifiables après création.",
      analysis:
        "Dessinez d’abord la restitution attendue : marge par projet, activité ou équipe. Testez une dépense répartie entre plusieurs projets, un avoir et un changement de catégorie. Ce travail doit partir des décisions à prendre, plutôt que des possibilités de l’interface. Vérifiez aussi la disponibilité de cette fonction dans l’offre proposée.",
      source: "analytics",
    },
    {
      title: "Reporting : expliquer le chiffre avant de l’utiliser",
      fact: "Le tableau de bord analytique décrit par le centre d’aide est disponible en Premium. Il utilise les données présentes dans Pennylane ; un compte bancaire absent réduit le périmètre du solde affiché.",
      analysis:
        "Rapprochez les indicateurs avec les sources et précisez leur date d’arrêté. Chiffre d’affaires, factures émises et encaissements ne répondent pas à la même question. Pour un comité de direction, ajoutez le budget, les hypothèses et les commentaires nécessaires. Un outil de BI complémentaire se justifie par une restitution manquante, pas par principe.",
      source: "dashboard",
    },
    {
      title: "API : une possibilité d’intégration, pas une connexion garantie",
      fact: "L’API Entreprise est accessible à partir d’Essentiel. Pennylane distingue cette API de celles destinées aux cabinets et aux groupes de cabinets.",
      analysis:
        "Faites vérifier le flux précis dont vous avez besoin : objets disponibles, sens de synchronisation, droits et fréquence. Désignez la source de référence pour chaque donnée et le responsable des erreurs. Une démonstration doit montrer un rejet et sa correction, pas seulement un transfert réussi. Prévoyez la maintenance dans le coût total.",
      source: "api",
    },
    {
      title: "Migration : éviter de compter deux fois les mêmes opérations",
      fact: "Pennylane documente un risque de doublons lorsqu’un FEC est importé dans un dossier déjà utilisé en gestion. Une procédure spécifique traite ce cas.",
      analysis:
        "Organisez la reprise avec le responsable comptable : sauvegarde, période de bascule et rapprochement des soldes. Comparez les comptes clients et fournisseurs ainsi que les opérations de la période reprise. Ne lancez pas une suppression d’écritures sans périmètre validé. La réussite se mesure à des balances expliquées, pas au seul message de fin d’import.",
      source: "migration",
    },
    {
      title: "Réversibilité : contrôler l’export avant de signer",
      fact: "La documentation explique l’export d’un FEC et les conditions de validation des écritures pour obtenir un fichier conforme.",
      analysis:
        "Un FEC ne couvre pas à lui seul tous vos besoins de sortie. Demandez aussi comment récupérer pièces, données analytiques et historiques utiles. Testez la lecture d’un export par le cabinet ou le système destinataire. Définissez les accès conservés en fin de contrat et la personne chargée de l’archive.",
      source: "export",
    },
  ],
  pricing: [
    {
      plan: "Basique",
      price: "49 € HT / mois",
      scope: "5 utilisateurs gestion",
    },
    {
      plan: "Essentiel",
      price: "99 € HT / mois",
      scope: "5 utilisateurs gestion",
    },
    {
      plan: "Premium + module comptable",
      price: "298 € HT / mois",
      scope: "5 utilisateurs gestion",
    },
  ],
  steps: [
    {
      title: "Écrire le besoin et le périmètre",
      text: "Listez les entités, les banques, les utilisateurs et les flux à conserver. Choisissez les indicateurs attendus et leurs responsables. Le livrable est un cahier de sélection court : opérations à couvrir, contraintes, interfaces et critères d’acceptation. Le nombre de salariés ne suffit pas à définir le projet.",
    },
    {
      title: "Tester un cycle complet sur un échantillon représentatif",
      text: "Préparez un jeu de données autorisé et anonymisé : facture, avoir, dépense partagée, règlement partiel et retard de paiement. Suivez chaque opération jusqu’à la comptabilité et au reporting. Vérifiez les droits du dirigeant, du collaborateur et du cabinet. Consignez ce qui fonctionne et ce qui demande une action manuelle.",
    },
    {
      title: "Chiffrer la formule réellement nécessaire",
      text: "Demandez un devis avec modules, utilisateurs, entités et volumes. Distinguez abonnement, reprise, formation, intégrations et support. Validez la disponibilité des fonctions testées dans cette formule. Comparez avec le coût de l’organisation actuelle, y compris les contrôles et les ressaisies qui subsisteront après le changement.",
    },
    {
      title: "Préparer la bascule avec la comptabilité",
      text: "Fixez la date de reprise et les règles de saisie pendant la transition. Archivez les données sources et les soldes de référence. Prévoyez la vérification des doublons et des pièces désynchronisées avec le cabinet. Une reprise en cours d’exercice doit avoir un responsable et un calendrier de validation.",
    },
    {
      title: "Valider la première restitution et la sortie",
      text: "Rapprochez le premier reporting avec la balance et les banques. Expliquez les écarts, les pièces attendues et les limites de couverture. Testez un export exploitable et l’accès à l’historique. Mesurez ensuite le temps de traitement et les anomalies sur plusieurs périodes comparables avant d’annoncer un gain.",
    },
  ],
  alternatives: [
    {
      name: "Sage",
      href: "/ressources/outils/sage",
      text: "À examiner si une solution Sage identifiée couvre vos flux métiers existants. Comparez le produit et les modules exacts, plutôt qu’une marque entière avec Pennylane.",
    },
    {
      name: "Cegid",
      href: "/ressources/outils/cegid-loop",
      text: "À étudier avec votre cabinet si son organisation s’appuie sur une solution Cegid. Faites préciser la solution, les accès entreprise et les échanges de données avant d’arbitrer.",
    },
    {
      name: "Un ERP déjà en place",
      href: "/ressources/blog/essentiels-outils-tech-finance",
      text: "Si NetSuite, Odoo ou Dynamics structure déjà vos opérations, commencez par cartographier les flux. Conserver ou connecter l’existant peut être plus cohérent qu’une migration générale.",
    },
  ],
  faq: [
    {
      question: "Pennylane remplace-t-il un expert-comptable ?",
      answer:
        "Non. Le logiciel et la mission comptable sont deux périmètres distincts. Convenez avec votre cabinet de la tenue, des contrôles, des déclarations et de la clôture. L’accès à une plateforme ne transfère pas automatiquement ces responsabilités à l’éditeur.",
    },
    {
      question: "Pennylane suffit-il pour le reporting d’un DAF ?",
      answer:
        "Cela dépend de la restitution attendue. Testez vos indicateurs, l’écart au budget et les données de chaque entité. Si des informations restent dans des systèmes métiers, vérifiez leur reprise ou le besoin d’un reporting complémentaire. Un tableau disponible ne signifie pas que toutes les données sont complètes.",
    },
    {
      question:
        "Quel est le principal risque lors d’une migration vers Pennylane ?",
      answer:
        "Un risque documenté est l’import de doublons dans un dossier déjà actif en gestion. Faites valider la méthode de reprise par le responsable comptable, archivez les données et rapprochez les soldes après import. Notre analyse porte sur la procédure de sélection ; elle ne promet pas une durée de migration universelle.",
    },
    {
      question: "Cet avis Pennylane est-il un test client chiffré ?",
      answer:
        "Cette version est une analyse éditoriale du cabinet, fondée sur la documentation citée et des critères de direction financière. Elle ne présente ni note produit, ni gain client mesuré. Les protocoles proposés sont des tests à effectuer sur votre dossier, pas des résultats de missions publiés.",
    },
  ],
} as const;

export const PENNYLANE_SOURCES = {
  plans: {
    label: "Abonnements et périmètres",
    url: "https://help.pennylane.com/fr/articles/185068-les-abonnements-pennylane-pour-les-entreprises",
  },
  pricing: {
    label: "Tarifs TPE, configuration 5 utilisateurs",
    url: "https://www.pennylane.com/fr/tarifs/large",
  },
  analytics: {
    label: "Plan analytique structuré",
    url: "https://help.pennylane.com/fr/articles/366693-creer-et-gerer-un-plan-analytique-structure",
  },
  dashboard: {
    label: "Tableau de bord analytique",
    url: "https://help.pennylane.com/fr/articles/43690-comprendre-le-tableau-de-bord-analytique",
  },
  api: {
    label: "API publiques",
    url: "https://help.pennylane.com/fr/articles/18770-utiliser-les-api-publiques-pennylane",
  },
  migration: {
    label: "Migration d’un dossier actif",
    url: "https://help.pennylane.com/fr/articles/633755-migrer-la-comptabilite-d-un-dossier-deja-actif-sur-pennylane",
  },
  export: {
    label: "Export du FEC",
    url: "https://help.pennylane.com/fr/articles/18662-exporter-un-fec",
  },
} as const;
