import type { FinanceService } from "./finance-services";
import { FORMULES, ENGAGEMENT } from "./facts";
import { FINANCE_EXPERT } from "./finance-expert";

const recurringRange = `${Math.min(...FORMULES.map(item => item.prixMin)).toLocaleString("fr-FR")} à ${Math.max(...FORMULES.map(item => item.prixMax)).toLocaleString("fr-FR")}`;

/** Distinct commercial intents. Client locations and results require separate evidence. */
export const PRIORITY_FINANCE_SERVICES: Record<string, FinanceService> = {
  fractional: {
    path: "/fractional-cfo-startups", label: "Fractional CFO pour startups",
    title: "CFO externalisé pour startups et SaaS | Iter Advisors",
    description: "Un CFO externalisé à temps partagé pour votre startup : trésorerie, runway, revenus SaaS et reporting investisseurs. Livrables, périmètre et budget sur devis.",
    headline: "CFO externalisé pour startups et SaaS",
    promise: "Relier vos hypothèses de croissance aux décisions de financement.",
    intro: "Votre startup doit décider quand recruter, combien investir et comment financer les prochains mois. Le fractional CFO, ou DAF externalisé pour startup, construit avec vos équipes une lecture cohérente de la trésorerie, des revenus et du budget. Il prépare les arbitrages du dirigeant et les échanges avec les investisseurs.",
    context: "daf", category: "Pilotage des startups et SaaS",
    summary: [["Votre besoin", "Runway, budget et reporting investisseurs"], ["Votre organisation", "Un CFO à temps partagé, avec votre équipe"], ["Budget Iter", `De ${recurringRange} € HT / mois selon le périmètre`]],
    headings: { need: "À quel moment votre startup a-t-elle besoin d’un CFO ?", deliverables: "Trésorerie, revenus et reporting : les livrables", method: "Construire un modèle que votre équipe peut utiliser" },
    signals: [
      "Avant une levée : les hypothèses commerciales, le budget de recrutement et le besoin de financement ne sont pas encore rapprochés.",
      "Après une levée : le dirigeant doit traduire les engagements du plan en dépenses, jalons et reporting au conseil.",
      "Pour un SaaS : revenus récurrents, churn, encaissements et marge sont suivis dans des outils différents, avec des définitions parfois incompatibles.",
      "Pour une croissance multi-entités : l’équipe doit expliquer les écarts entre pays, activités ou canaux avant de décider où investir.",
    ],
    definition: "Fractional CFO décrit une direction financière exercée à temps partagé. Cette page traite des besoins propres aux startups et SaaS ; l’offre générale de DAF externalisé explique les autres formats. Le besoin dépend des décisions à prendre, de la qualité des données et des compétences internes. Un montant de chiffre d’affaires ou un niveau de burn ne suffit pas à justifier une mission. Si vous avez besoin d’une présence permanente, un recrutement peut être plus adapté.",
    deliverables: [
      ["Prévisionnel de trésorerie et runway", "Un rapprochement du cash disponible, des encaissements attendus et des échéances. Les hypothèses de financement sont distinguées des fonds confirmés.", "Tester un retard de levée, de paiement client ou de recrutement avant d’engager une dépense."],
      ["Budget et modèle multi-scénarios", "Un modèle reliant ventes, coûts, effectifs et trésorerie. Le scénario central et les variantes identifient leurs hypothèses et leurs sources.", "Comparer la croissance attendue au coût des moyens nécessaires et au financement disponible."],
      ["Reporting SaaS et investisseurs", "Des définitions partagées du MRR ou de l’ARR, du churn, de la marge et des écarts au budget. Les données et commentaires utiles au conseil sont préparés ensemble.", "Expliquer la performance sans confondre revenu contractuel, facturation et encaissement."],
    ],
    exampleTitle: "Un arbitrage de recrutement, sans résultat inventé",
    example: "Avant de lancer deux recrutements, le dirigeant peut comparer un démarrage immédiat, un décalage et un scénario de ventes plus prudent. Chaque option intègre le coût complet fourni par les équipes, la date de prise de poste et les encaissements attendus. Le CFO expose l’effet sur la trésorerie et les hypothèses à surveiller ; le dirigeant valide l’engagement. Il s’agit d’un exemple de travail, pas d’un résultat client ni d’une recommandation de financement.",
    calendar: {
      heading: "Des indicateurs reliés à votre activité",
      caption: "Exemples de données à rapprocher pour un SaaS",
      headers: ["Sujet", "Données à examiner", "Point de vigilance"],
      rows: [
        ["Revenus récurrents", "Contrats, nouveaux clients, extensions et résiliations", "Définir MRR et ARR sans inclure les prestations ponctuelles"],
        ["Trésorerie", "Solde bancaire, échéances, impayés et dépenses engagées", "Ne pas confondre cash disponible et financement sollicité"],
        ["Acquisition et marge", "Dépenses commerciales, cohortes et coûts de service", "Documenter la période, l’attribution et les coûts inclus"],
        ["Conseil et investisseurs", "Réalisé, budget, écarts et décisions à venir", "Employer les mêmes définitions d’un reporting au suivant"],
      ],
      note: "Les indicateurs et la fréquence sont choisis selon votre modèle. Aucun seuil universel de runway, de CAC ou de croissance ne remplace l’analyse de votre situation. Un modèle conserve ses limites : un historique court ou des données incomplètes réduisent la fiabilité des scénarios.",
    },
    steps: [
      ["Qualifier les décisions", "Partager les échéances, l’organisation finance, les attentes du conseil et les documents déjà disponibles. Identifier ce que l’équipe et le cabinet comptable produisent, puis convenir des accès et des responsabilités."],
      ["Rapprocher les données", "Examiner la comptabilité, les banques, la facturation, les abonnements et les hypothèses commerciales. Documenter les écarts, les informations manquantes et les définitions des indicateurs avant de bâtir le reporting."],
      ["Installer la revue de décision", "Présenter les scénarios et leurs limites, suivre les décisions avec un responsable et une échéance, puis actualiser les hypothèses. Les premiers livrables et le calendrier sont convenus au cadrage, sans promesse de mise en place identique pour toutes les startups."],
    ],
    scopeTitle: "Un CFO avec vos équipes, pas une promesse de levée",
    scope: [
      "Le dirigeant fixe les priorités et décide. Le CFO prépare le modèle, challenge les hypothèses et organise le suivi. Le cabinet comptable reste responsable des travaux prévus dans sa lettre de mission ; les équipes commerciales et opérationnelles expliquent les données d’activité.",
      "La préparation d’une levée peut inclure le modèle financier, la data room et le suivi des questions de due diligence. Les échanges se font avec les dirigeants, les investisseurs et les conseils concernés. Une levée, sa valorisation ou un accès privilégié à des fonds ne sont pas garantis.",
      "Si un CFO interne rejoint la startup, le transfert porte sur les sources, les hypothèses, les accès autorisés et le calendrier. Une mission de direction financière ne donne pas automatiquement délégation de signature ni pouvoir sur les comptes bancaires.",
    ],
    budget: `Les accompagnements récurrents Iter vont de ${recurringRange} € HT par mois. Le devis dépend des entités, des données, du reporting attendu et du profil mobilisé. Les projets exceptionnels, déplacements et travaux des autres conseils sont distingués. La comparaison avec un recrutement doit aussi tenir compte de la disponibilité et des responsabilités : ce ne sont pas deux prestations équivalentes.`,
    case: "solarmente-serie-b-cleantech",
    proofNote: "Ce cas cleantech couvre 2022–2024 et illustre la préparation financière d’opérations. Il ne constitue pas un cas SaaS ni une prévision de résultat ; les dirigeants, investisseurs et conseils ont contribué aux opérations.",
    faq: [
      ["Quelle différence entre fractional CFO et DAF externalisé pour startup ?", "Les deux expressions désignent ici une direction financière à temps partagé. La spécificité startup concerne les hypothèses de croissance, la consommation de cash, le financement et les attentes des investisseurs. Pour un SaaS, elle comprend aussi la cohérence des données de revenus récurrents."],
      ["Peut-on conserver notre expert-comptable ?", "Oui. Le cadrage distingue la production comptable, le rapprochement des données et le pilotage. Le CFO travaille avec votre cabinet et vos équipes ; les travaux inclus et les interlocuteurs sont précisés au contrat."],
      ["Accompagnez-vous une startup avant sa première levée ?", "Le besoin est étudié selon les décisions à préparer et les données disponibles. Une mission ciblée de modélisation peut être plus appropriée qu’un suivi récurrent. Aucun stade de financement ne rend automatiquement nécessaire un CFO externalisé."],
      ["Quels documents préparer pour le premier échange ?", "Votre organisation, vos échéances, les derniers comptes disponibles, le budget et les principaux indicateurs. Pour un SaaS, précisez les outils de facturation et d’abonnement. Les modalités sécurisées de partage des pièces détaillées sont convenues ensuite."],
      ["Quels délais et quelle disponibilité prévoir ?", "Le démarrage dépend du profil disponible, du périmètre et des accès. La grille Iter présente un volume indicatif de 1 à 8 jours par mois, sans forfait de jours garanti. Le rythme des revues, les urgences et les premiers livrables sont définis ensemble."],
      ["Quel engagement pour un accompagnement récurrent ?", `La grille Iter prévoit un accompagnement mensuel sans durée minimale, avec un préavis de ${ENGAGEMENT.preavisJours} jours. Le contrat précise le périmètre et les projets complémentaires. Une mission ponctuelle est définie séparément.`],
    ],
    resources: [["Calculer le cash burn et examiner le runway", "/ressources/glossaire/cash-burn-runway"], ["Comprendre les revenus récurrents MRR et ARR", "/ressources/glossaire/arr-mrr"], ["Préparer financièrement une levée", "/services/accompagnement-levee-de-fond"], ["Structurer les outils du CFO", "/ressources/outils"], ["Vous cherchez un poste chez Iter ?", "/jobs"]],
    related: ["temps-partage", "tresorerie", "controle"],
  },
  paris: {
    path: "/daf-externalise-paris", label: "DAF externalisé à Paris",
    title: "DAF externalisé à Paris et Île-de-France | Iter Advisors",
    description: "DAF externalisé à Paris et en Île-de-France : trésorerie, reporting et budget pour PME et startups. Présence sur site, responsabilités et périmètre à convenir.",
    headline: "DAF externalisé à Paris et en Île-de-France",
    promise: "Organiser le pilotage financier de votre entreprise francilienne.",
    intro: "Votre PME, startup ou filiale est implantée à Paris ou en Île-de-France. Vous cherchez un interlocuteur pour relier la trésorerie, les résultats et les décisions de la direction. Iter Advisors étudie un accompagnement adapté à votre équipe, avec des modalités de présence sur site et de travail à distance convenues au cadrage.",
    context: "daf", category: "Paris et Île-de-France", areaServed: "Paris et Île-de-France",
    author: { name: FINANCE_EXPERT.name, slug: FINANCE_EXPERT.slug },
    summary: [["Votre entreprise", "PME, startup ou filiale en Île-de-France"], ["La collaboration", "Sur site et à distance selon le besoin convenu"], ["Budget Iter", `De ${recurringRange} € HT / mois selon le périmètre`]],
    headings: { need: "Quel sujet finance devez-vous traiter à Paris ?", deliverables: "Des livrables pour vos décisions de direction", method: "Convenir du rythme et des interlocuteurs" },
    signals: [
      "Le dirigeant prépare seul les chiffres pour un comité de direction ou un rendez-vous bancaire.",
      "Votre équipe et votre cabinet comptable disposent des données, mais le budget et les prévisions restent difficiles à rapprocher.",
      "Un recrutement, une nouvelle implantation ou plusieurs entités imposent de comparer les scénarios avant d’engager des dépenses.",
    ],
    definition: "Le besoin local porte sur l’organisation de la collaboration : lieux d’intervention, disponibilités, accès aux données et coordination avec les équipes. La mission peut être récurrente ou temporaire selon votre situation. La page nationale présente les formats de DAF externalisé ; cette page précise comment préparer une intervention auprès d’une entreprise francilienne.",
    deliverables: [
      ["Prévisionnel de trésorerie", "Les encaissements, paiements et hypothèses à examiner avec la direction. Les informations manquantes et les échéances sensibles sont identifiées.", "Anticiper un décalage de paiement et examiner les besoins de financement."],
      ["Reporting et budget", "Une lecture du résultat, des marges et des écarts. Pour une filiale, les rubriques et échéances sont alignées sur les attentes du groupe.", "Comprendre les écarts et arbitrer les moyens avec les responsables opérationnels."],
      ["Dossier de décision", "Des scénarios documentés pour un recrutement, un investissement ou un financement, avec les hypothèses et les travaux restant à réaliser.", "Préparer une discussion avec les banques, les actionnaires ou le conseil."],
    ],
    exampleTitle: "Préparer un rendez-vous sur site utile",
    example: "Avant une revue avec la direction, l’équipe partage les comptes disponibles, les échéances de cash et les décisions à venir. Le CFO prépare les questions et scénarios. Le rendez-vous peut alors porter sur les arbitrages et les responsabilités, plutôt que sur la collecte de fichiers. La fréquence et le lieu des rencontres sont convenus ; une présence quotidienne ou une disponibilité permanente ne sont pas implicites.",
    steps: [
      ["Situer votre entreprise", "Préciser votre lieu d’activité en Île-de-France, les entités concernées, les interlocuteurs et les échéances. Examiner les outils et les documents déjà produits, ainsi que les travaux attendus de vos autres conseils."],
      ["Organiser la collaboration", "Convenir du profil mobilisé, des rendez-vous sur site, des travaux à distance et des règles de partage des documents. Le devis précise les éventuels déplacements et la prise en charge des sujets urgents."],
      ["Tenir la revue financière", "Rapprocher les données et documenter les hypothèses. Suivre les écarts au budget, les décisions et les échéances. Revoir le périmètre quand les besoins de l’équipe ou la disponibilité des données évoluent."],
    ],
    scopeTitle: "Une coordination avec vos équipes et vos conseils",
    scope: [
      "Le cabinet comptable produit les comptes selon sa lettre de mission ; le CFO organise leur lecture, les prévisions et les décisions avec la direction. Les conseils fiscaux, juridiques ou sociaux interviennent dans leur propre périmètre. Iter n’est pas un cabinet d’expertise comptable.",
      "Pour une entreprise francilienne disposant aussi d’une activité en Espagne, le cadrage identifie les responsables locaux, les flux à suivre et le reporting groupe. Il ne suppose ni avantage fiscal automatique ni accès privilégié à un investisseur ou à un dispositif public.",
      "Le profil intervenant, les disponibilités et les conditions de présence sont confirmés avant engagement. Un projet de financement ou une situation nécessitant un relais quotidien peut appeler un mandat spécifique, distinct du suivi récurrent.",
    ],
    budget: `Les missions récurrentes Iter se situent entre ${recurringRange} € HT par mois. Ce sont les fourchettes du cabinet, pas une moyenne du marché parisien. Le devis dépend du périmètre, du profil et de l’organisation retenue ; il distingue les déplacements et projets complémentaires. Les modalités de démarrage sont confirmées après qualification du besoin.`,
    case: "opti-digital-structuration-financement",
    proofNote: "Cette référence décrit une mission du cabinet et des résultats qualitatifs. Elle n’est pas présentée comme une référence parisienne : la localisation de la mission n’est pas établie dans la source publiée. Aucun gain chiffré n’est promis pour votre entreprise.",
    faq: [
      ["Intervenez-vous sur site en Île-de-France ?", "Des rendez-vous sur site peuvent être convenus selon le besoin, le lieu et les disponibilités. Le profil, la fréquence, les déplacements et les travaux à distance sont précisés avant engagement. La mission ne prévoit pas automatiquement une présence quotidienne."],
      ["Paris est-il le siège d’Iter Advisors ?", "Non. Le siège d’Iter Advisors est à Barcelone. Paris est une zone d’intervention du cabinet ; cette page ne présente pas d’adresse de bureau ouverte au public ni d’horaires d’accueil parisiens."],
      ["À qui présenter notre besoin ?", "Sébastien Doat est l’interlocuteur finance présenté sur cette page. Le premier échange sert à identifier les compétences, le profil et les modalités adaptés à votre situation. Le membre de l’équipe qui intervient est précisé au cadrage."],
      ["Quel format choisir pour notre entreprise ?", "Le temps partagé répond à un besoin récurrent ; la transition organise un relais temporaire. Une mission de trésorerie ou de reporting peut aussi traiter un sujet ciblé. Le choix dépend de l’organisation et des décisions à préparer, pas de la seule localisation."],
      ["Quelles informations préparer pour nous contacter ?", "Votre lieu d’activité, les entités, les équipes finance, les outils, les principales échéances et le besoin de présence souhaité. Les comptes et documents sensibles sont partagés ensuite selon les modalités convenues."],
    ],
    resources: [["Le périmètre de la direction financière externalisée", "/daf-externalise"], ["Organiser le suivi à temps partagé", "/daf-externalise/temps-partage"], ["Un relais temporaire de direction financière", "/daf-externalise/transition"], ["Pilotage des startups et SaaS", "/fractional-cfo-startups"], ["Accompagner une activité en Espagne", "/daf-externalise-barcelone"]],
    related: ["temps-partage", "transition", "tresorerie"],
  },
};
