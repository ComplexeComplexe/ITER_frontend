import { PRIORITY_FINANCE_SERVICES } from "./priority-finance-services";
import type { EditorialAuthor } from "../schemas/editorial";
import { FORMULES, MISSIONS_PONCTUELLES, VOLUME_DAF_JOURS_MOIS, ENGAGEMENT } from "./facts";

const euros = (amount: number) => new Intl.NumberFormat("fr-FR").format(amount);
const recurringRange = `${euros(Math.min(...FORMULES.map(item => item.prixMin)))} à ${euros(Math.max(...FORMULES.map(item => item.prixMax)))}`;
const transition = MISSIONS_PONCTUELLES.find(item => item.nom === "DAF de transition")!;
const transitionRange = `${euros(transition.min)} à ${euros(transition.max)}`;
const volume = `${VOLUME_DAF_JOURS_MOIS.min} à ${VOLUME_DAF_JOURS_MOIS.max}`;

export interface FinanceService {
  path: string; label: string; title: string; description: string;
  headline: string; promise: string; intro: string; context: string; category: string;
  summary: [string, string][]; signals: string[]; definition: string;
  deliverables: [string, string, string][]; exampleTitle: string; example: string;
  steps: [string, string][]; scopeTitle: string; scope: string[]; budget: string;
  case?: string; proofNote?: string; author?: EditorialAuthor; areaServed?: string; faq: [string, string][]; resources: [string, string][]; related: string[];
  headings?: { need: string; deliverables: string; method: string };
  calendar?: { heading?: string; caption: string; headers: [string, string, string]; rows: [string, string, string][]; note: string };
  budgetResource?: { href: string; label: string };
  contextLinks?: Partial<Record<"livrables" | "perimetre", [string, string][]>>;
}

export const FINANCE_REVIEW_DATE = "2026-09-30";
export const FINANCE_SERVICES: Record<string, FinanceService> = {
  ...PRIORITY_FINANCE_SERVICES,
  "temps-partage": {
    "path": "/daf-externalise/temps-partage",
    "label": "DAF à temps partagé",
    "title": "DAF à temps partagé : missions et rythme | Iter Advisors",
    "description": "Un DAF à temps partagé pour votre PME : trésorerie, marges, budget et coordination comptable. Livrables, rythme et budget adaptés à votre équipe.",
    "headline": "DAF à temps partagé",
    headings: {
      "need": "Quand choisir un DAF à temps partagé ?",
      "deliverables": "Les livrables d’un DAF à temps partagé",
      "method": "Comment intervient un directeur financier à temps partagé ?"
    },
    "promise": "Une direction financière qui suit votre entreprise dans la durée.",
    "intro": "Un DAF à temps partagé pilote la fonction finance de votre entreprise quelques jours par mois, à un rythme convenu avec vous. Il relie trésorerie, reporting et budget aux décisions du dirigeant, en travaillant avec votre équipe et votre expert-comptable.",
    "context": "temps-partage",
    "category": "Piloter dans la durée",
    "summary": [
      [
        "Pour qui",
        "PME, startups et filiales avec un besoin récurrent"
      ],
      [
        "Rythme",
        "Interventions planifiées et points de suivi"
      ],
      [
        "Budget",
        `De ${recurringRange} € HT / mois selon le périmètre`
      ]
    ],
    "signals": [
      "Le dirigeant assemble lui-même les chiffres avant chaque décision.",
      "La comptabilité est disponible, mais les prévisions et le reporting restent irréguliers.",
      "La croissance, les investisseurs ou plusieurs entités rendent le pilotage plus complexe."
    ],
    "definition": "Le temps partagé est la forme récurrente du DAF externalisé. Il associe un interlocuteur financier senior, des travaux convenus et des rendez-vous de décision. Le niveau d’intervention dépend des sujets à traiter, de la qualité des données et des compétences déjà présentes.",
    "deliverables": [
      [
        "Trésorerie et besoin en fonds de roulement",
        "Un prévisionnel glissant à 13 semaines selon le besoin, les échéances clients et fournisseurs et les hypothèses de règlement. Les retards et informations manquantes restent visibles.",
        "Prioriser les paiements et les relances avant un recrutement ou un investissement."
      ],
      [
        "Reporting et analyse des marges",
        "Un reporting mensuel : résultats et marges par activité ou canal, frais et écarts au budget. Les définitions, sources et règles de répartition sont documentées.",
        "Comprendre les écarts avec les responsables et suivre les actions convenues."
      ],
      [
        "Budget et scénarios de financement",
        "Des scénarios reliant ventes, charges, recrutements et trésorerie. Pour une startup, le suivi peut inclure le cash burn et le runway ; les hypothèses de financement restent distinctes des fonds confirmés.",
        "Comparer les options et préparer les échanges bancaires ou investisseurs."
      ]
    ],
    "exampleTitle": "Ce que peut contenir votre rendez-vous finance",
    "example": "Un point sur la trésorerie à venir, une lecture du réalisé face au budget et une liste de décisions avec leurs responsables. Le reporting prépare la discussion ; la réunion se termine par des actions suivies au rendez-vous suivant.",
    calendar: {
      caption: "Exemple de calendrier à adapter à votre mission",
      headers: ["Rendez-vous", "Travaux préparés", "Décision à éclairer"],
      rows: [
        ["Chaque semaine, si le besoin le justifie", "Encaissements, paiements et factures en retard", "Prioriser les paiements et les relances"],
        ["Après la clôture mensuelle", "Résultat, rapprochements et écarts au budget", "Comprendre les écarts et ajuster les hypothèses"],
        ["Revue avec la direction", "Scénarios de trésorerie, charges et recrutements", "Arbitrer un recrutement ou un investissement"],
        ["Échéance exceptionnelle", "Scénarios et dossier bancaire ou investisseur", "Examiner les conditions de financement"],
      ],
      note: "Ce calendrier est illustratif. Les réunions, les travaux et la disponibilité sont convenus au cadrage. Chaque point se termine par une décision, un responsable et une échéance, suivis au rendez-vous suivant.",
    },
    "steps": [
      [
        "Cadrer les priorités",
        "Identifier les décisions à venir, les interlocuteurs et les sources : balances, grands livres, relevés bancaires, factures ouvertes, contrats de financement et budget. Convenir des accès, des validations et du calendrier avec le cabinet comptable."
      ],
      [
        "Installer le pilotage",
        "Rapprocher les données et documenter les informations manquantes. Selon le besoin, préparer un prévisionnel de trésorerie à treize semaines, une lecture des résultats et un suivi des anomalies. Aucun délai de mise en place n’est garanti avant d’avoir examiné les données."
      ],
      [
        "Suivre et ajuster",
        "Analyser les écarts, préparer les arbitrages et revoir le périmètre lorsque votre situation évolue."
      ]
    ],
    "scopeTitle": "Un rôle de direction, articulé avec votre équipe",
    "scope": [
      "Le DAF travaille avec le dirigeant, les responsables opérationnels et le cabinet comptable. Il organise le pilotage ; les tâches quotidiennes et les décisions restent attribuées explicitement. Un besoin de présence permanente appelle une autre organisation.",
      "Le dirigeant fixe les priorités et valide les engagements. Le DAF construit les scénarios et analyse les écarts. Le cabinet comptable produit les comptes selon sa lettre de mission ; les responsables opérationnels expliquent les commandes, stocks et échéances. Une délégation de signature ou un accès bancaire ne découle pas automatiquement de la mission.",
      "Une levée de fonds, une acquisition ou une transformation importante peut nécessiter une mission complémentaire. Les travaux inclus, le relais en cas d’absence et le traitement des urgences sont précisés au contrat."
    ],
    "budget": `Les missions récurrentes Iter se situent entre 3 000 et 8 000 € HT par mois. Les ${volume} jours mensuels sont un volume indicatif observé, pas un forfait contractuel : le devis porte sur le périmètre et le profil mobilisé. La grille détaillée permet de situer votre besoin.`,
    "case": "opti-digital-structuration-financement",
    "faq": [
      [
        "Quelle différence avec un DAF externalisé ?",
        "DAF externalisé désigne le recours à une direction financière hors salariat. Le temps partagé en est le format récurrent, avec des interventions planifiées. La transition répond plutôt à un besoin temporaire de continuité ou de transformation."
      ],
      [
        "Combien de jours faut-il prévoir ?",
        `Le volume indicatif Iter va de ${volume} jours par mois. Il dépend des entités, des outils, des échéances et du travail assuré en interne. Le nombre de salariés ne suffit pas à le déterminer.`
      ],
      [
        "Faut-il changer d’expert-comptable ?",
        "Pas nécessairement. Le cadrage identifie les travaux du cabinet comptable, les données attendues et le rôle du DAF. Une coordination claire évite les doubles travaux."
      ],
      [
        "Peut-on ensuite recruter un DAF ?",
        "Oui. La mission peut préparer la transmission des outils, des hypothèses et du calendrier à une personne recrutée en interne. Cette passation est à prévoir dans le périmètre."
      ],
      [
        "Quel engagement est prévu ?",
        `La grille Iter prévoit un accompagnement mensuel sans durée minimale, résiliable avec un préavis de ${ENGAGEMENT.preavisJours} jours. Les prestations et toute évolution de périmètre sont formalisées dans le contrat.`
      ],
      [
        "Quels outils utilisez-vous ?",
        "Le cadrage part de vos outils existants. Pennylane, Holded ou un outil de trésorerie comme Agicap peuvent faire partie du dispositif selon le besoin. Une migration n’est pas un préalable automatique : nous examinons les accès, les exports, les contrôles et la capacité de votre équipe à maintenir les données."
      ]
    ],
    "resources": [
      [
        "Comparer les formules et tarifs",
        "/daf-externalise/tarifs"
      ],
      [
        "Comprendre les formes de DAF externalisé",
        "/daf-externalise"
      ],
      [
        "DAF externalisé ou salarié : les critères de choix",
        "/ressources/blog/daf-externalise-vs-daf-salarie"
      ]
    ],
    "related": [
      "transition",
      "controle",
      "organisation"
    ],
    "contextLinks": {
      "livrables": [
        [
          "Construire un prévisionnel de trésorerie",
          "/services/previsionnel-tresorerie"
        ],
        [
          "Approfondir le contrôle de gestion",
          "/services/controle-de-gestion-externalise"
        ]
      ],
      "perimetre": [
        [
          "Organiser les échanges avec le cabinet comptable",
          "/services/comptabilite-externalisation"
        ]
      ]
    }
  },
  "transition": {
    "path": "/daf-externalise/transition",
    "label": "DAF de transition",
    "title": "DAF de transition : continuité et passation | Iter Advisors",
    "description": "Remplacement d’un DAF, continuité financière et passation pour PME et ETI. Mandat temporaire, responsabilités et calendrier définis après cadrage.",
    "headline": "DAF de transition",
    "promise": "Assurer la continuité. Préparer la suite.",
    "intro": "Un DAF de transition assure temporairement la direction financière lors d’un départ, d’une absence ou d’une transformation. Le mandat précise les échéances à sécuriser, les responsabilités et la passation à préparer. Le pilotage récurrent relève du temps partagé.",
    "context": "transition",
    "category": "Prendre le relais",
    "summary": [
      [
        "Pour qui",
        "PME et ETI face à un besoin temporaire"
      ],
      [
        "Priorité",
        "Continuité, échéances et transmission"
      ],
      [
        "Budget",
        `De ${transitionRange} € HT / mois selon le mandat`
      ]
    ],
    "signals": [
      "Votre DAF quitte l’entreprise ou s’absente pendant une période sensible.",
      "Une clôture, un financement ou un changement d’outil nécessite un pilotage renforcé.",
      "Vous recrutez une direction financière et devez organiser le relais."
    ],
    "definition": "Le management de transition finance consiste à confier temporairement le pilotage à un directeur administratif et financier de transition. Le DAF intervient sur une période et un mandat définis. Sa mission associe la prise en charge des priorités immédiates et la préparation d’une organisation durable. Le temps partagé répond, lui, à un besoin régulier de direction financière.",
    "deliverables": [
      [
        "État des lieux priorisé",
        "Un calendrier des échéances, une liste des risques et des accès à obtenir.",
        "Savoir ce qui doit être traité en premier."
      ],
      [
        "Feuille de route",
        "Des chantiers, des responsables et des points de décision suivis avec la direction.",
        "Organiser la continuité et les changements."
      ],
      [
        "Dossier de passation",
        "Les outils, procédures, hypothèses et sujets ouverts à transmettre.",
        "Permettre au successeur de reprendre le pilotage."
      ]
    ],
    headings: { need: "Quand envisager un management de transition finance ?", deliverables: "Les livrables du directeur financier de transition", method: "Directeur administratif et financier de transition : du mandat à la passation" },
    calendar: {
      heading: "Préparer la sortie dès le début du mandat",
      caption: "Jalons à définir pour une mission temporaire",
      headers: ["Jalon", "Travail à formaliser", "Validation attendue"],
      rows: [
        ["Avant la prise de fonction", "Priorités, accès, calendrier et délégations écrites", "Mandat et responsabilités approuvés par la direction"],
        ["Pendant la mission", "Échéances tenues, risques ouverts et décisions documentées", "Revue de l’avancement et ajustement du périmètre"],
        ["Avant le départ", "Dossier de passation, procédures et personnes de relais", "Reprise des outils et sujets ouverts par le successeur"],
      ],
      note: "La durée dépend du remplacement ou du chantier. Le devis fixe les jalons et les conditions d’une éventuelle prolongation ; aucun calendrier standard ne remplace l’examen de votre situation.",
    },
    "exampleTitle": "Les premiers sujets à mettre sur la table",
    "example": "Solde de trésorerie, paie, paiements sensibles, clôture, engagements bancaires et décisions en attente : la première revue situe les échéances et les responsabilités. Elle ne remplace pas un diagnostic complet lorsque des données manquent.",
    "steps": [
      [
        "Qualifier le mandat",
        "Préciser le motif, la durée envisagée, le niveau de présence et les délégations nécessaires."
      ],
      [
        "Prendre le relais",
        "Sécuriser les accès et le calendrier, prioriser les travaux et organiser les échanges avec l’équipe."
      ],
      [
        "Organiser la transmission",
        "Préparer les procédures, documenter les décisions et transmettre les points ouverts au successeur."
      ]
    ],
    "scopeTitle": "Une présence adaptée au mandat",
    "scope": [
      "Le niveau de présence et les pouvoirs de décision sont convenus avec la direction. L’intervention ne suppose pas automatiquement une délégation de signature ou un pouvoir sur les comptes bancaires.",
      "Le DAF coordonne les équipes et conseils dans son périmètre. Le traitement d’une difficulté juridique, fiscale ou d’une procédure collective relève aussi des professionnels compétents. La préparation de la sortie commence dès le cadrage."
    ],
    "budget": `La fourchette Iter est de ${transitionRange} € HT par mois selon le mandat, la disponibilité et la complexité. Un démarrage sous 7 à 10 jours peut être envisagé après qualification, sous réserve de disponibilité et d’accès aux informations.`,
    "faq": [
      ["Combien de temps dure une mission de transition ?", "La durée est définie à partir du motif du remplacement, des échéances et de la disponibilité du successeur. Le mandat prévoit les objectifs de sortie, les modalités de prolongation et le temps nécessaire à la passation."],
      [
        "Quand choisir la transition plutôt que le temps partagé ?",
        "La transition répond à une situation temporaire : remplacement, continuité ou transformation. Le temps partagé correspond à un besoin récurrent avec des interventions planifiées dans la durée."
      ],
      [
        "Pouvez-vous intervenir en urgence ?",
        "Le besoin et les disponibilités sont examinés au premier échange. Un démarrage sous 7 à 10 jours peut être envisagé selon le contexte ; aucun délai n’est garanti avant cadrage."
      ],
      [
        "Comment préparez-vous la passation ?",
        "La mission prévoit les documents, accès, procédures, hypothèses et points ouverts à transmettre. Le calendrier de passation est convenu avec le dirigeant et le successeur."
      ],
      [
        "Que préparer pour vous contacter ?",
        "Le motif du remplacement, les échéances proches, l’organisation actuelle, les outils utilisés et le niveau de présence souhaité. Les modalités de partage des documents sont convenues ensuite."
      ]
    ],
    "resources": [
      [
        "Le rôle du directeur administratif et financier",
        "/daf-externalise/metier"
      ],
      [
        "Préparer une organisation financière durable",
        "/ressources/blog/organiser-sa-direction-financiere"
      ],
      [
        "Les tarifs des missions DAF",
        "/daf-externalise/tarifs"
      ]
    ],
    "related": [
      "temps-partage",
      "tresorerie",
      "organisation"
    ],
    "contextLinks": {
      "perimetre": [
        [
          "Préparer ou examiner une acquisition ou une cession",
          "/services/ma-due-diligence"
        ]
      ]
    }
  },
  "controle": {
    "path": "/services/controle-de-gestion-externalise",
    "label": "Contrôle de gestion externalisé",
    "title": "Contrôle de gestion externalisé pour PME : budget et marges",
    "description": "Budget, marges et reporting : un contrôle de gestion externalisé pour comprendre vos résultats. Livrables, revue mensuelle et articulation avec vos équipes.",
    "headline": "Contrôle de gestion externalisé",
    "promise": "Comprendre vos marges. Donner une suite à vos chiffres.",
    "intro": "Le contrôle de gestion externalisé confie le budget, le reporting et l’analyse des marges à un intervenant extérieur. Le contrôleur de gestion rapproche vos comptes de l’activité réelle, explique les écarts avec les responsables et prépare les décisions.",
    "context": "reporting",
    "category": "Piloter la performance",
    "headings": {
      "need": "Quand externaliser le contrôle de gestion ?",
      "deliverables": "Budget, marges et reporting : les livrables",
      "method": "Le suivi avec votre contrôleur de gestion"
    },
    "summary": [
      [
        "Votre besoin",
        "Budget, marges, coûts et indicateurs"
      ],
      [
        "Votre support",
        "Un reporting expliqué, relié aux décisions"
      ],
      [
        "Périmètre",
        "Mise en place ou suivi récurrent, sur devis"
      ]
    ],
    "signals": [
      "Vous connaissez le chiffre d’affaires, mais pas la marge par activité ou canal.",
      "Les reportings demandent beaucoup de manipulations et arrivent après les décisions.",
      "Les écarts au budget sont constatés sans explication ni responsable identifié."
    ],
    "definition": "Externaliser le contrôle de gestion consiste à confier tout ou partie du budget, du reporting et de l’analyse de performance à un intervenant dédié. Le travail part des données comptables et opérationnelles, puis les relie aux décisions de votre entreprise.",
    "deliverables": [
      [
        "Tableau de bord et indicateurs",
        "Un reporting mensuel de revenus, marges, frais et écarts au budget. Chaque indicateur précise sa définition, sa source et son responsable.",
        "Lire des chiffres comparables d’une période à l’autre."
      ],
      [
        "Analyse des marges par activité",
        "Une lecture par produit, canal ou client, avec des règles documentées de ventilation des coûts.",
        "Examiner ce qui contribue à la marge avant d’arbitrer."
      ],
      [
        "Budget, atterrissages et écarts",
        "Un budget rapproché du réalisé et des prévisions actualisées. Les écarts sont expliqués avec les opérationnels et les hypothèses restent identifiables.",
        "Ajuster les actions et suivre leur effet à la revue suivante."
      ]
    ],
    "exampleTitle": "Exemple de trame pour une revue mensuelle",
    "example": "Résultat et marge face au budget, évolution des volumes et des prix, dépenses à analyser, décisions attendues. Chaque indicateur précise sa définition, sa source et son responsable. Cette trame est illustrative : le tableau de bord doit rester adapté à votre modèle économique.",
    "steps": [
      [
        "Choisir les questions utiles",
        "Définir les décisions, les dimensions d’analyse et les indicateurs réellement nécessaires."
      ],
      [
        "Fiabiliser le reporting",
        "Rapprocher les sources, expliciter les règles de calcul et documenter les retraitements."
      ],
      [
        "Animer la revue",
        "Expliquer les écarts avec les opérationnels et suivre les décisions jusqu’au point suivant."
      ]
    ],
    "scopeTitle": "Le lien entre comptabilité, opérations et direction",
    "scope": [
      "La comptabilité produit une base indispensable. Le contrôle de gestion organise sa lecture économique, par exemple une marge par canal ou un budget par responsable. Les deux fonctions coordonnent leur calendrier et leurs règles.",
      "L’automatisation est utile lorsque les sources et les définitions sont stables. Un tableau de bord mis à jour automatiquement conserve des contrôles, un responsable et des commentaires sur les anomalies. Un outil ne remplace pas l’analyse."
    ],
    "budget": "Le devis distingue la construction initiale du reporting et son suivi. Le nombre d’entités, les sources, les axes analytiques et la fréquence des revues déterminent le périmètre. Si le besoin inclut aussi le financement et les décisions de direction, une mission de DAF à temps partagé peut être plus adaptée.",
    "case": "seasonly-marge-par-canal-bfr",
    "faq": [
      [
        "Quels indicateurs faut-il suivre ?",
        "Ceux qui répondent à vos décisions : revenus, marge, coûts, trésorerie ou indicateurs opérationnels selon l’activité. Les définitions et les sources doivent être partagées avant de construire le tableau de bord."
      ],
      [
        "Pouvez-vous travailler avec nos outils actuels ?",
        "Le cadrage examine les exports, les accès et les limites de vos outils. Une migration n’est pas systématique ; elle se justifie par les besoins, les coûts et la capacité de l’équipe à maintenir le dispositif."
      ],
      [
        "Faut-il un reporting en temps réel ?",
        "La fréquence dépend de la décision et de la disponibilité des données. Un suivi hebdomadaire du cash ou une revue mensuelle des marges peuvent être plus pertinents qu’un affichage permanent incomplet."
      ],
      [
        "Quelle différence avec un DAF à temps partagé ?",
        "Le contrôle de gestion se concentre sur le budget, les coûts, les marges et le reporting. Le DAF couvre aussi les décisions financières transversales, la trésorerie, le financement et la coordination de la fonction finance."
      ]
    ],
    "resources": [
      [
        "Choisir les indicateurs d’un tableau de bord",
        "/ressources/blog/tableau-de-bord-financier-startup-12-kpis"
      ],
      [
        "Automatiser le reporting avec des contrôles",
        "/ressources/ia-finance/automatiser-reporting-financier"
      ],
      [
        "Suivre les échéances de trésorerie",
        "/services/previsionnel-tresorerie"
      ]
    ],
    "related": [
      "temps-partage",
      "organisation",
      "tresorerie"
    ],
    "contextLinks": {
      "perimetre": [
        [
          "Anticiper les échéances de cash avec un prévisionnel",
          "/services/previsionnel-tresorerie"
        ]
      ]
    }
  },
  "comptabilite": {
    "path": "/services/comptabilite-externalisation",
    "label": "Comptabilité externalisée",
    "title": "Organisation comptable et clôture pour PME | Iter Advisors",
    "description": "Iter organise les pièces, la clôture et le reporting avec votre expert-comptable. La tenue et les déclarations restent confiées au professionnel désigné.",
    "headline": "Organisation de votre comptabilité externalisée",
    "promise": "Des comptes exploitables, une organisation claire.",
    "intro": "Iter organise le circuit des pièces, le calendrier de clôture et les échanges entre votre équipe et votre expert-comptable. Nous ne réalisons pas la tenue ni les déclarations : ces travaux restent confiés au professionnel désigné dans sa lettre de mission.",
    "context": "comptabilite",
    "category": "Organiser la production comptable",
    "summary": [
      [
        "Votre besoin",
        "Pièces, processus et calendrier de clôture"
      ],
      [
        "Interlocuteurs",
        "Votre équipe, Iter et le cabinet comptable"
      ],
      [
        "Budget",
        "Sur devis, selon les travaux confiés"
      ]
    ],
    "signals": [
      "Les pièces manquantes bloquent la clôture et mobilisent le dirigeant.",
      "Vous ne savez pas qui contrôle les données ni qui valide les échéances.",
      "Vos outils comptables et votre reporting ne partagent pas les mêmes informations."
    ],
    "definition": "Externaliser la comptabilité peut désigner la tenue des comptes ou l’organisation de leur production. Cette page porte sur le second besoin : collecte, responsabilités, calendrier et utilisation des données pour le reporting. Le devis distingue les travaux d’Iter, de votre équipe et de votre cabinet comptable.",
    "deliverables": [
      [
        "Organisation des pièces",
        "Un circuit de collecte, des accès définis et une liste de pièces manquantes.",
        "Réduire les allers-retours et suivre les points bloquants."
      ],
      [
        "Calendrier de clôture",
        "Les tâches, échéances et validations réparties entre les intervenants.",
        "Savoir quand les comptes sont disponibles et contrôlés."
      ],
      [
        "Passage au reporting",
        "Des exports rapprochés et des règles de lecture convenues avec la finance.",
        "Utiliser les comptes pour suivre l’activité."
      ]
    ],
    "exampleTitle": "Qui fait quoi dans le circuit comptable ?",
    "example": "L’équipe transmet les pièces et valide les éléments opérationnels. Le cabinet comptable réalise les travaux relevant de sa lettre de mission. Iter peut coordonner le calendrier, les contrôles de gestion et l’exploitation des chiffres. Cette répartition se précise avant le démarrage.",
    "steps": [
      [
        "Définir les responsabilités",
        "Inventorier les travaux existants, les échéances et les engagements du cabinet comptable."
      ],
      [
        "Organiser les échanges",
        "Convenir des outils, des accès, du circuit de validation et des pièces nécessaires."
      ],
      [
        "Suivre la clôture",
        "Traiter les points ouverts, vérifier la disponibilité des exports et préparer leur utilisation dans le reporting."
      ]
    ],
    "scopeTitle": "Un périmètre explicite avec votre expert-comptable",
    "scope": [
      "Les travaux de tenue, de déclaration, de révision ou d’attestation doivent être attribués au professionnel habilité dans le cadre applicable. Le devis distingue les interventions d’Iter et celles de votre cabinet comptable ou des partenaires concernés.",
      "La paie, la fiscalité particulière, les reprises historiques et la migration d’un outil ne sont pas implicitement incluses. Un changement de cabinet ou de logiciel doit prévoir la reprise des données, la continuité des obligations et les responsabilités de validation."
    ],
    "budget": "Le prix dépend des volumes, du nombre d’entités, des outils, de la qualité des pièces et des travaux confiés à chaque intervenant. Nous cadrons ces éléments avant le devis. Les honoraires du cabinet comptable et les éventuels abonnements doivent être identifiés séparément.",
    budgetResource: { href: "/ressources/blog/externalisation-comptable#grille", label: "Comparer les devis comptables" },
    "faq": [
      [
        "Dois-je changer d’expert-comptable ?",
        "Pas nécessairement. L’accompagnement peut partir de votre cabinet actuel, en clarifiant les échanges, les échéances et le rôle de chacun. Le besoin de changement s’apprécie au cadrage."
      ],
      [
        "La tenue et les déclarations sont-elles incluses ?",
        "Elles ne doivent pas être présumées incluses. La lettre de mission précise les travaux confiés au professionnel habilité et leur coût. L’organisation comptable et le pilotage financier sont des périmètres distincts."
      ],
      [
        "Pouvez-vous nous aider à changer de logiciel ?",
        "Une migration peut faire l’objet d’un chantier défini : historique à reprendre, tests, droits d’accès, validation et calendrier. Le délai dépend notamment de la qualité des données et des intervenants."
      ],
      [
        "Comment relier comptabilité et pilotage ?",
        "En convenant des dates de disponibilité, des exports, des règles analytiques et des contrôles. Le reporting peut alors utiliser une base rapprochée et expliquer les écarts utiles aux décisions."
      ],
      [
        "Comment se répartit le coût de l’accompagnement ?",
        "Les honoraires du cabinet comptable, les abonnements logiciels et l’organisation assurée par Iter sont identifiés séparément. Le devis dépend des volumes, des entités, de la qualité des pièces et des travaux confiés à chacun. Il ne faut pas comparer une mission d’organisation avec une prestation de tenue sans vérifier leur périmètre."
      ]
    ],
    "resources": [
      [
        "Organiser sa direction financière",
        "/ressources/blog/organiser-sa-direction-financiere"
      ],
      [
        "Structurer les opérations financières",
        "/services/gestion-financiere-externalisee"
      ],
      [
        "Passer des comptes au contrôle de gestion",
        "/services/controle-de-gestion-externalise"
      ],
      [
        "Lettre de mission : les repères de l’Ordre des experts-comptables",
        "https://www.experts-comptables.fr/index.php/faq"
      ]
    ],
    "related": [
      "organisation",
      "controle",
      "temps-partage"
    ],
    "contextLinks": {
      "perimetre": [
        [
          "Structurer les processus de la fonction finance",
          "/services/gestion-financiere-externalisee"
        ]
      ]
    }
  },
  "tresorerie": {
    "path": "/services/previsionnel-tresorerie",
    "label": "Prévisionnel de trésorerie",
    "title": "Prévisionnel de trésorerie à 13 semaines | Iter Advisors",
    "description": "Construisez et suivez un prévisionnel de trésorerie à 13 semaines : encaissements, échéances, hypothèses et scénarios pour préparer vos décisions.",
    "headline": "Prévisionnel de trésorerie",
    "promise": "Voir les échéances avant qu’elles deviennent urgentes.",
    "intro": "Un prévisionnel de trésorerie, aussi appelé plan de trésorerie, positionne les encaissements et les paiements attendus semaine par semaine. Il rapproche le solde bancaire des prochaines échéances pour anticiper les tensions et préparer les arbitrages avec votre équipe.",
    "context": "tresorerie",
    "category": "Anticiper le cash",
    "summary": [
      [
        "Horizon de travail",
        "13 semaines glissantes, à adapter au besoin"
      ],
      [
        "Votre support",
        "Flux attendus, hypothèses et écarts"
      ],
      [
        "Périmètre",
        "Construction et suivi définis sur devis"
      ]
    ],
    "signals": [
      "La trésorerie varie fortement entre deux points mensuels.",
      "Les dates d’encaissement restent incertaines alors que les charges sont engagées.",
      "Vous devez décider d’un recrutement, d’un achat ou d’un financement."
    ],
    "definition": "Le prévisionnel de trésorerie suit des dates et montants d’encaissement et de décaissement. Il se distingue du compte de résultat : une vente peut être comptabilisée avant son paiement. Un horizon de 13 semaines donne une lecture opérationnelle, complétée si nécessaire par des scénarios plus longs.",
    "deliverables": [
      [
        "Prévisionnel glissant",
        "Un solde de départ rapproché et les flux attendus par semaine.",
        "Identifier les périodes de tension."
      ],
      [
        "Registre des hypothèses",
        "Dates de règlement, paiements sensibles et incertitudes explicites.",
        "Voir ce qui peut modifier le scénario."
      ],
      [
        "Suivi prévu / réalisé",
        "Les écarts et leur explication, avec une actualisation régulière.",
        "Décider à partir des dernières informations."
      ]
    ],
    headings: { need: "Quand construire un prévisionnel de trésorerie ?", deliverables: "Les supports pour suivre les prochaines échéances", method: "Construire, rapprocher et actualiser le prévisionnel" },
    calendar: {
      heading: "Un solde final positif peut cacher une tension intermédiaire",
      caption: "Exemple fictif sur deux semaines, avec 20 000 € de trésorerie au départ",
      headers: ["Période", "Encaissements et décaissements supposés", "Solde de fin de semaine"],
      rows: [
        ["Semaine 1", "20 000 € encaissés − 45 000 € décaissés = −25 000 €", "−5 000 €"],
        ["Semaine 2", "50 000 € encaissés − 30 000 € décaissés = +20 000 €", "15 000 €"],
      ],
      note: "Tous ces montants sont fictifs. Le solde de la deuxième semaine est positif, mais la première révèle un besoin de 5 000 € si les hypothèses se réalisent. Identifier la tension ne garantit ni découvert autorisé ni financement : il faut examiner les options et leurs conditions avant l’échéance.",
    },
    "exampleTitle": "Exemple de lecture du prévisionnel",
    "example": "Si une recette change de date, l’équipe actualise l’hypothèse et compare les soldes de chaque semaine. Elle peut tester plusieurs calendriers, puis examiner les décisions possibles avec la direction. Le prévisionnel ne transforme pas une créance incertaine en cash disponible ; le suivi du prévu face au réalisé permet d’expliquer l’écart.",
    "steps": [
      [
        "Rapprocher le point de départ",
        "Recenser les comptes bancaires, les créances, les dettes et les engagements connus."
      ],
      [
        "Construire les scénarios",
        "Positionner les flux, documenter les hypothèses et tester les incertitudes les plus sensibles."
      ],
      [
        "Actualiser et décider",
        "Comparer au réalisé, réviser les prochaines semaines et suivre les actions convenues."
      ]
    ],
    "scopeTitle": "Une prévision entretenue par les bonnes personnes",
    "scope": [
      "Les responsables commerciaux, achats et opérations contribuent aux dates attendues. Le DAF consolide, vérifie les cohérences et prépare les arbitrages. La fréquence de mise à jour dépend de la situation.",
      "L’obtention d’un financement, les négociations avec les tiers et les décisions de paiement restent des démarches distinctes. Les options se comparent en tenant compte de leurs coûts et de leurs contraintes."
    ],
    "budget": "Le devis dépend du nombre d’entités, des banques, de la qualité des échéanciers et de la fréquence de suivi. Le prévisionnel peut être une mission dédiée ou un livrable d’un accompagnement DAF récurrent.",
    "case": "seasonly-marge-par-canal-bfr",
    "faq": [
      [
        "Pourquoi un horizon de 13 semaines ?",
        "Il permet une lecture hebdomadaire des échéances proches. L’horizon peut être complété par un budget de trésorerie plus long lorsqu’une décision d’investissement ou de financement le nécessite."
      ],
      [
        "Quels documents faut-il préparer ?",
        "Soldes bancaires, balances clients et fournisseurs, échéanciers d’emprunts, charges récurrentes, obligations connues et hypothèses commerciales. Les pièces manquantes sont identifiées."
      ],
      [
        "Quel outil faut-il utiliser ?",
        "Un fichier structuré peut suffire à certains besoins. Un outil spécialisé se justifie selon les sources, la fréquence, les contrôles et les personnes chargées de l’actualisation."
      ],
      [
        "Quelle différence entre budget et prévisionnel de trésorerie ?",
        "Le budget relie les objectifs de revenus et de charges sur une période. Le prévisionnel de trésorerie suit les dates attendues d’encaissement et de paiement. Une vente budgétée ou comptabilisée n’est pas encore du cash disponible : les deux supports se rapprochent, mais ne répondent pas à la même question."
      ]
    ],
    "resources": [
      [
        "Réduire le BFR : les leviers à examiner",
        "/ressources/blog/reduire-bfr-7-leviers-actionnables"
      ],
      [
        "Comprendre les flux de trésorerie",
        "/ressources/blog/flux-de-tresorerie"
      ]
    ],
    "related": [
      "temps-partage",
      "controle",
      "organisation"
    ]
  },
  "organisation": {
    "path": "/services/gestion-financiere-externalisee",
    "label": "Organisation financière",
    "title": "Gestion financière opérationnelle pour PME | Iter Advisors",
    "description": "Structurez les opérations financières de votre entreprise : responsabilités, données, clôture et reporting. Un périmètre adapté à votre équipe.",
    "headline": "Gestion financière opérationnelle",
    "promise": "Une fonction finance qui sait qui fait quoi.",
    "intro": "Quand les fichiers, les outils et les responsabilités s’accumulent, produire les chiffres devient un projet en soi. L’accompagnement organise les opérations financières pour que votre équipe dispose d’un fonctionnement partagé.",
    "context": "organisation",
    "category": "Structurer la fonction finance",
    "summary": [
      [
        "Votre besoin",
        "Processus, données et responsabilités"
      ],
      [
        "Votre support",
        "Un calendrier et des procédures utilisables"
      ],
      [
        "Périmètre",
        "Organisation initiale et suivi sur devis"
      ]
    ],
    "signals": [
      "Les mêmes données sont ressaisies dans plusieurs fichiers.",
      "Les validations et les relances reposent sur une seule personne.",
      "La croissance ou une nouvelle entité exige une organisation plus explicite."
    ],
    "definition": "La gestion financière opérationnelle organise la circulation des données, les responsabilités et le calendrier de production des chiffres. Pour les factures, les paiements ou les rapprochements, la mission commence par identifier qui produit, qui contrôle et qui valide. Le DAF externalisé traite le pilotage et les arbitrages de direction ; les travaux confiés à Iter et ceux conservés par votre équipe sont précisés au contrat.",
    "deliverables": [
      [
        "Répartition des rôles",
        "Une matrice des tâches, validations et responsabilités.",
        "Réduire les zones sans responsable."
      ],
      [
        "Calendrier finance",
        "Les échéances, dépendances et points de contrôle.",
        "Coordonner la production des chiffres."
      ],
      [
        "Procédures et données",
        "Des règles documentées, des accès définis et des modèles partagés.",
        "Maintenir le fonctionnement dans la durée."
      ]
    ],
    "exampleTitle": "Un processus décrit de bout en bout",
    "example": "Exemple de procédure à adapter : l’équipe transmet les pièces, la comptabilité prépare les rapprochements, le responsable finance examine les exceptions et la personne habilitée valide le reporting. Pour les paiements, les délégations et les contrôles sont documentés séparément. Cette illustration décrit une organisation, pas un cas client ni une prise en charge automatique de toutes les tâches par Iter.",
    "steps": [
      [
        "Cartographier",
        "Examiner les flux, les outils et les tâches avec les personnes qui les réalisent."
      ],
      [
        "Organiser",
        "Convenir des responsabilités, des supports et des contrôles nécessaires."
      ],
      [
        "Transmettre",
        "Tester le fonctionnement avec l’équipe, documenter et suivre les points à corriger."
      ]
    ],
    "scopeTitle": "Partir de l’équipe et des outils existants",
    "scope": [
      "Le projet ne commence pas nécessairement par un nouveau logiciel. Les irritants, la fiabilité des sources et la capacité à maintenir les processus orientent les choix.",
      "Le périmètre distingue l’organisation, la production comptable et les décisions financières. Chaque tâche externalisée doit avoir un responsable, un livrable et un mode de validation."
    ],
    "budget": "La mission est chiffrée selon les processus concernés, le nombre d’entités, les outils et le niveau d’intervention attendu. Les coûts de migration ou d’abonnement éventuels sont explicités.",
    "case": "opti-digital-structuration-financement",
    "faq": [
      [
        "Quelle différence avec le contrôle de gestion ?",
        "L’organisation financière porte sur les opérations, les données et les responsabilités. Le contrôle de gestion utilise ces données pour analyser les coûts, les marges et les écarts au budget."
      ],
      [
        "Faut-il remplacer nos outils ?",
        "Pas automatiquement. La cartographie permet de décider si les outils existants suffisent, s’ils peuvent être mieux articulés ou si un changement se justifie."
      ],
      [
        "Peut-on automatiser certains travaux ?",
        "Oui, après clarification des sources, des règles et des contrôles. Le projet doit prévoir les exceptions, la maintenance et la validation humaine des résultats."
      ]
    ],
    "resources": [
      [
        "Organiser sa direction financière",
        "/ressources/blog/organiser-sa-direction-financiere"
      ],
      [
        "Automatiser le reporting financier",
        "/ressources/ia-finance/automatiser-reporting-financier"
      ]
    ],
    "related": [
      "comptabilite",
      "controle",
      "temps-partage"
    ],
    "contextLinks": {
      "perimetre": [
        [
          "Organiser le circuit comptable et la clôture",
          "/services/comptabilite-externalisation"
        ]
      ]
    }
  },
  "levee": {
    "path": "/services/accompagnement-levee-de-fond",
    "label": "Levée de fonds",
    "title": "Levée de fonds : business plan et data room | Iter Advisors",
    "description": "Préparez les finances de votre levée : modèle financier, data room et réponses aux investisseurs. Livrables et calendrier définis selon votre projet.",
    "headline": "Accompagnement à la levée de fonds",
    "promise": "Des hypothèses expliquées. Un dossier financier cohérent.",
    "intro": "Le DAF traduit votre business plan en scénarios financiers et organise les données attendues par les investisseurs. Cette mission prépare une opération de financement ; elle se distingue du pilotage récurrent de la startup. Le dirigeant porte le projet et la recherche d’investisseurs relève d’un mandat distinct.",
    "context": "levee",
    "category": "Préparer une opération",
    "summary": [
      [
        "Votre besoin",
        "Modèle, besoin de financement et data room"
      ],
      [
        "Votre support",
        "Des chiffres rapprochés et des hypothèses documentées"
      ],
      [
        "Budget",
        "Mission ponctuelle ou complément sur devis"
      ]
    ],
    "signals": [
      "Votre projet doit être traduit en besoin de financement.",
      "Les chiffres du modèle, du reporting et du dossier investisseurs divergent.",
      "Les questions financières mobilisent l’équipe sans coordination."
    ],
    "definition": "L’accompagnement décrit ici porte sur la préparation et le suivi financiers. Le modèle, les scénarios et la data room permettent d’expliquer les chiffres et les incertitudes. La mission ne garantit ni montant levé, ni valorisation, ni date de closing.",
    "deliverables": [
      [
        "Modèle financier",
        "Revenus, charges, recrutements et trésorerie reliés aux hypothèses du projet.",
        "Situer le besoin de financement."
      ],
      [
        "Data room financière",
        "Des pièces organisées et des chiffres rapprochés avec les comptes.",
        "Faciliter la lecture et les vérifications."
      ],
      [
        "Réponses financières",
        "Un suivi des questions et des éléments préparés avec l’équipe.",
        "Garder une information cohérente pendant les échanges."
      ]
    ],
    "exampleTitle": "Rendre une hypothèse discutable",
    "example": "Une accélération commerciale implique des dépenses et des recrutements. Le modèle relie ces choix au cash et teste un décalage des revenus ou du financement, pour que le dirigeant puisse comparer les options.",
    "steps": [
      [
        "Cadrer la préparation",
        "Préciser le stade, les échéances, les données disponibles et les intervenants."
      ],
      [
        "Construire le dossier",
        "Documenter les hypothèses, rapprocher les chiffres et organiser les documents financiers."
      ],
      [
        "Accompagner les échanges",
        "Préparer les réponses et mettre à jour les scénarios ; organiser le reporting après opération si prévu."
      ]
    ],
    "scopeTitle": "DAF, dirigeant et leveur : des rôles complémentaires",
    "scope": [
      "Le dirigeant porte le projet et décide des conditions acceptables. Le DAF prépare et explique les chiffres. Un leveur mandaté peut prendre en charge la recherche et l’approche d’investisseurs selon son contrat.",
      "Les mises en relation éventuelles, les échanges et les responsabilités sont précisés au cadrage. Les aspects juridiques et fiscaux sont examinés avec les conseils compétents dans leurs propres missions."
    ],
    "budget": "Le devis dépend de la maturité du modèle, des données, du nombre d’entités et des échanges attendus. Il précise les livrables et le calendrier de travail. Le calendrier du financement dépend aussi des investisseurs et des négociations.",
    "case": "solarmente-serie-b-cleantech",
    "faq": [
      [
        "Êtes-vous leveurs de fonds ?",
        "Le service décrit ici est la préparation et le suivi financiers. La recherche d’investisseurs relève du dirigeant ou d’un leveur mandaté. Les mises en relation éventuelles sont définies au cadrage."
      ],
      [
        "Que faut-il préparer pour le premier échange ?",
        "Les comptes et reporting disponibles, la trésorerie, les échéanciers de dette et les hypothèses du projet. Les modalités sécurisées de partage sont convenues ensuite."
      ],
      [
        "L’accompagnement continue-t-il après la levée ?",
        "Si le mandat le prévoit, il peut inclure l’actualisation du budget, le suivi du cash et le reporting destiné aux investisseurs."
      ],
      [
        "Quel calendrier prévoir pour la préparation financière ?",
        "Le cadrage distingue les travaux d’Iter du calendrier de la levée. Le modèle, les rapprochements et la data room dépendent des pièces disponibles et des questions des investisseurs. Les échanges, les négociations et le closing suivent leur propre calendrier ; aucun délai de financement n’est garanti."
      ]
    ],
    "resources": [
      ["Préparer les étapes d’une levée", "/ressources/blog/levee-de-fonds-guide"],
      ["Examiner les clauses d’un term sheet", "/ressources/blog/term-sheet-negocier-clauses-cles"],
      ["Comprendre les instruments BSPCE et BSA", "/ressources/glossaire/bspce-bsa"],
      [
        "Préparer les pièces de due diligence",
        "/ressources/blog/checklist-due-diligence-levee-de-fonds"
      ],
      [
        "Suivre le cash burn et le runway",
        "/ressources/blog/cash-burn-calculer-runway-anticiper-levee"
      ]
    ],
    "related": [
      "due-diligence",
      "tresorerie",
      "temps-partage"
    ],
    "contextLinks": {
      "perimetre": [
        [
          "Piloter le runway et le reporting de votre startup dans la durée",
          "/fractional-cfo-startups"
        ],
        [
          "Préparer une acquisition ou une cession",
          "/services/ma-due-diligence"
        ]
      ]
    }
  },
  "due-diligence": {
    "path": "/services/ma-due-diligence",
    "label": "M&A et due diligence",
    "title": "M&A et due diligence financière | Iter Advisors",
    "description": "Préparation ou revue financière d’une acquisition ou cession : résultats, dette et BFR. Périmètre, destinataires et limites définis dans le mandat.",
    "headline": "M&A et due diligence financière",
    "promise": "Éclairer une opération avec des données examinées.",
    "intro": "Acquéreur, dirigeant ou cédant : nous vous aidons à organiser et analyser les informations financières utiles à votre opération. Le mandat distingue la préparation du dossier, la revue financière et les travaux des autres conseils.",
    "context": "due-diligence",
    "category": "Préparer une opération",
    "summary": [
      [
        "Votre besoin",
        "Acquisition, cession ou préparation de dossier"
      ],
      [
        "Votre support",
        "Analyses, questions et points ouverts"
      ],
      [
        "Budget",
        "Selon les travaux et destinataires, sur devis"
      ]
    ],
    "signals": [
      "Vous devez comprendre les résultats et les engagements d’une cible.",
      "Vous préparez une data room et les réponses aux demandes financières.",
      "Une acquisition exige d’organiser le reporting et les responsabilités après l’opération."
    ],
    "definition": "Côté vendeur, la préparation organise les pièces et explique les comptes. Côté acquéreur, la revue financière examine les résultats, la dette et le besoin en fonds de roulement. Ces travaux concernent une acquisition ou une cession ; la data room d’une levée de fonds relève d’une mission distincte. Préparer un dossier ne remplace pas une revue indépendante.",
    "deliverables": [
      [
        "Analyse des résultats",
        "Rapprochements, éléments récurrents ou ponctuels et retraitements documentés.",
        "Comprendre les chiffres présentés."
      ],
      [
        "Cash, dette et BFR",
        "Échéanciers, saisonnalité et engagements identifiés.",
        "Examiner les besoins et questions à approfondir."
      ],
      [
        "Synthèse de revue",
        "Questions, hypothèses, données manquantes et points à traiter avec les conseils.",
        "Préparer les arbitrages et la suite des travaux."
      ]
    ],
    "exampleTitle": "Un point ouvert reste visible",
    "example": "Un chiffre non rapproché, une créance ancienne ou une hypothèse non justifiée n’est pas transformé en certitude. La synthèse indique la question, les pièces attendues et l’interlocuteur qui doit la traiter.",
    "steps": [
      [
        "Définir le mandat",
        "Préciser l’opération, les destinataires, les données accessibles et les analyses attendues."
      ],
      [
        "Examiner et documenter",
        "Rapprocher les informations, analyser les points convenus et organiser les questions."
      ],
      [
        "Restituer et transmettre",
        "Présenter les constats et leurs limites, puis organiser les travaux complémentaires ou l’intégration."
      ]
    ],
    "scopeTitle": "Une analyse financière avec des limites explicites",
    "scope": [
      "Les domaines juridiques, fiscaux et sociaux sont traités avec les conseils compétents. Les destinataires, responsabilités et conditions d’usage des livrables sont définis dans le mandat.",
      "Une valorisation repose sur des méthodes et des hypothèses à expliciter. Le prix, la négociation et le succès de l’opération ne sont pas garantis par la revue."
    ],
    "budget": "Les honoraires et le calendrier dépendent du périmètre, des entités, des documents disponibles et des échanges attendus. Une préparation de data room, une revue acquéreur et une intégration sont des travaux distincts à chiffrer.",
    "case": "solarmente-serie-b-cleantech",
    "faq": [
      [
        "Préparation et due diligence sont-elles la même mission ?",
        "Non. Préparer le dossier consiste à organiser et expliquer les informations. Une revue indépendante examine ces informations pour ses destinataires selon un mandat propre."
      ],
      [
        "Pouvez-vous intervenir côté acquéreur ?",
        "Le périmètre peut couvrir la revue financière des données disponibles de la cible, les points de vigilance et les analyses utiles aux négociations. Les conditions d’intervention sont définies au cadrage."
      ],
      [
        "Quels documents sont nécessaires ?",
        "Comptes, reporting, échéanciers, données clients et fournisseurs, prévisions et pièces justifiant les principaux postes. La liste est adaptée à l’opération et au mandat."
      ],
      [
        "Comment fixer le calendrier de la revue ?",
        "Le mandat précise les analyses, les destinataires et les jalons, selon la disponibilité des pièces et les échanges nécessaires. La durée d’une revue financière doit être distinguée de celle de l’opération entière et des travaux d’intégration. Les informations manquantes et leurs conséquences sur les conclusions restent explicites."
      ]
    ],
    "resources": [
      [
        "La checklist de due diligence",
        "/ressources/blog/checklist-due-diligence-levee-de-fonds"
      ],
      [
        "Préparer la finance d’une levée de fonds",
        "/services/accompagnement-levee-de-fond"
      ]
    ],
    "related": [
      "levee",
      "organisation",
      "transition"
    ],
    "contextLinks": {
      "perimetre": [
        [
          "Préparer le dossier financier d’une levée de fonds",
          "/services/accompagnement-levee-de-fond"
        ]
      ]
    },
    "proofNote": "Le cas SolarMente illustre la préparation financière et l’intégration d’Eltex. Il ne démontre pas la réalisation d’une due diligence indépendante par Iter et ne préjuge pas du résultat d’une autre opération."
  }
};

export function getFinanceServiceByPath(path: string) {
  return Object.values(FINANCE_SERVICES).find(service => service.path === path);
}
