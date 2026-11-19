import { getCompanyGeography } from "@/lib/company-facts";
/** French transactional pillar. Commercial facts stay shared with the pricing page. */
import { CLIENTS_ACCOMPAGNES, DELAIS, ENGAGEMENT, FORMULES } from "@/lib/content/facts";

export const DAF_PILLAR_PATH = "/daf-externalise";
export const DAF_PILLAR_PUBLISHED = "2026-05-17";
export const DAF_PILLAR_MODIFIED = "2026-11-19";
export const DAF_PILLAR_MODIFIED_LABEL = "19 novembre 2026";
export const DAF_PILLAR_TRANSLATIONS_MODIFIED = "2026-11-09";
const fmt = (n: number) => n.toLocaleString("fr-FR").replace(/ | /g, " ");
const budget = `${fmt(FORMULES[0].prixMin)} à ${fmt(FORMULES[FORMULES.length - 1].prixMax)} € HT`;

export const dafPillar = {
  meta: {
    title: "DAF externalisé pour PME | Iter Advisors",
    description: `DAF externalisé pour PME : pilotez votre trésorerie, vos marges et votre reporting avec un DAF senior. Budget indicatif : ${budget}/mois.`,
  },
  breadcrumbLabel: "DAF externalisé",
  hero: {
    h1: "DAF externalisé pour PME",
    lead: "Anticipez votre trésorerie, comprenez vos marges et préparez vos financements avec un DAF senior, sans recruter à temps plein.",
    intro: "Votre direction financière externalisée associe prévisionnel de trésorerie, reporting mensuel et revue avec le dirigeant. Un interlocuteur dédié vous aide à relier les chiffres aux décisions de votre entreprise.",
    landmarks: [
      { label: "Budget mensuel indicatif", value: budget },
      { label: "Démarrage indicatif", value: DELAIS.missionDemarree },
      { label: "Engagement", value: `Sans durée minimale, préavis de ${ENGAGEMENT.preavisJours} jours` },
    ],
    proofs: [`${CLIENTS_ACCOMPAGNES} entreprises accompagnées`, getCompanyGeography("fr").presence],
    cta: "Échanger sur mon besoin",
  },
  nav: [
    { id: "missions", label: "Missions" },
    { id: "expert-comptable", label: "Expert-comptable" },
    { id: "preuves", label: "Cas clients" },
    { id: "methode", label: "Fonctionnement" },
    { id: "tarifs", label: "Tarifs" },
    { id: "faq", label: "Questions" },
  ],
  needs: {
    heading: "À quel moment faire appel à un DAF externalisé ?",
    intro: "Le besoin apparaît quand les décisions deviennent plus complexes que les informations disponibles. Vous pouvez être une PME rentable, une entreprise familiale ou une startup : consultez notre offre de [CFO externalisé pour startups](/fractional-cfo-startups) pour ses enjeux spécifiques. Une levée de fonds n’est pas un préalable. Trois situations permettent de reconnaître les priorités à traiter.",
    items: [
      { title: "Retrouver de la visibilité", text: "Votre carnet de commandes est rempli, mais votre trésorerie varie sans explication claire. Vous connaissez le chiffre d’affaires, moins la marge par client ou activité. La priorité est de rapprocher les chiffres, d’anticiper les encaissements et de comprendre ce qui consomme du cash avant un recrutement ou un investissement." },
      { title: "Structurer une entreprise qui grandit", text: "Après une levée ou une phase de croissance, l’équipe en place peut manquer de temps pour produire le reporting investisseurs et analyser les marges. Le DAF répartit les responsabilités avec elle, clarifie le calendrier de clôture et choisit les indicateurs à suivre." },
      { title: "Préparer un financement ou une opération", text: "Vous devez présenter un projet à une banque, préparer une levée ou étudier une acquisition. Le travail consiste à rendre les hypothèses explicites, tester les scénarios et organiser les documents demandés. Ces projets font l’objet d’un périmètre précis, distinct du suivi mensuel lorsqu’ils le nécessitent." },
    ],
    note: "Si vous cherchez uniquement une tenue comptable, ou une présence de direction à temps plein, le dispositif à temps partagé doit être comparé aux autres solutions avant de décider.",
  },
  missions: {
    overview: ["Pilotage : le DAF construit le budget, les prévisions et le plan de trésorerie avec le dirigeant.", "Contrôle de gestion : le DAF met en place les tableaux de bord et suit les marges.", "Trésorerie : le DAF suit le BFR et les encaissements, et prépare les échanges bancaires.", "Financement : le DAF prépare les données et les scénarios d’une levée, d’un dossier bancaire ou d’un recrutement.", "Décision : le DAF prépare les arbitrages ; les pouvoirs de signature et de paiement restent définis par les délégations convenues."],
    heading: "Quelles missions confier à un DAF externalisé ?",
    intro: "La mission s’organise autour de trois priorités : la trésorerie, la rentabilité et le financement. Le devis précise les livrables retenus, leur fréquence et les projets complémentaires, comme une levée de fonds ou une acquisition.",
    items: [
      { title: "Anticiper votre trésorerie", deliverable: "Un prévisionnel à 13 semaines qui distingue les flux connus des hypothèses : encaissements, paiements et échéances de dette. Son rythme d’actualisation est défini avec vous.", decision: "Repérer une tension à venir, préparer un échange bancaire ou choisir le calendrier d’une dépense.", href: "/services/previsionnel-tresorerie", linkLabel: "Prévisionnel de trésorerie" },
      { title: "Comprendre vos marges", deliverable: "Un reporting mensuel du résultat et des écarts au budget, avec une analyse par activité, canal, entité ou projet selon votre modèle. Les données provisoires sont identifiées.", decision: "Comprendre ce qui dégrade la rentabilité, discuter d’un prix ou revoir une dépense.", href: "/services/controle-de-gestion-externalise", linkLabel: "Contrôle de gestion externalisé" },
      { title: "Préparer votre budget et vos financements", deliverable: "Un budget ou un business plan avec plusieurs scénarios. Pour une mission de financement, les hypothèses et les pièces sont organisées dans un dossier destiné aux banques ou investisseurs.", decision: "Comparer vos trajectoires de croissance et leurs besoins de trésorerie avant de recruter, d’investir ou de solliciter un financement.", href: "/services/accompagnement-levee-de-fond", linkLabel: "Préparer une levée de fonds" },
    ],
    example: {
      heading: "Une revue mensuelle orientée vers l’action",
      intro: "Exemple de revue mensuelle, sans données client. Chaque constat débouche sur une question à examiner et une action à suivre lors de la revue suivante.",
      rows: [
        ["Encaissements décalés", "Quelles factures nécessitent une relance ?", "Responsable et échéance de relance"],
        ["Marge inférieure au budget", "Quel coût ou canal explique l’écart ?", "Analyse ciblée avant arbitrage"],
        ["Investissement envisagé", "Quel effet sur le solde de trésorerie ?", "Scénario à valider par le dirigeant"],
      ],
    },
  },
  accounting: {"heading": "DAF externalisé ou expert-comptable", "text": "L’expert-comptable produit les comptes et les déclarations selon sa lettre de mission. Le DAF externalisé utilise ces comptes pour prévoir, piloter et préparer les décisions du dirigeant ; il complète la mission du cabinet comptable."},
  cases: {
    heading: "Exemples de missions de direction financière externalisée",
    intro: "Deux missions, deux besoins : construire une fonction finance pour une PME et préparer les opérations d’une cleantech en croissance.",
    items: [
      { company: "Opti Digital", title: "Structurer la fonction finance dans la durée", text: "Cette PME adtech devait construire sa fonction finance, migrer son ERP et préparer un financement pour soutenir sa croissance sans ouvrir son capital.", takeaway: "L’accompagnement a associé le pilotage récurrent aux chantiers de structuration, avec les conseils externes pour les sujets fiscaux et juridiques.", href: "/ressources/cas-clients/opti-digital-structuration-financement", linkLabel: "Voir la mission Opti Digital" },
      { company: "SolarMente", title: "Préparer une levée et une acquisition", text: "Sur la période 2022 à 2024, cette cleantech devait structurer sa fonction finance pour préparer une levée internationale et une opération de croissance externe.", takeaway: "Iter a accompagné la préparation financière de ces opérations et l’intégration de l’acquisition d’Eltex en 2024, aux côtés des dirigeants et de leurs conseils.", href: "/ressources/cas-clients/solarmente-serie-b-cleantech", linkLabel: "Voir la mission SolarMente" },
    ],
    quote: {
      text: "leur capacité à nous challenger et à nous éclairer dans nos prises de décisions stratégiques.",
      author: "Magali Quentel-Reme",
      role: "CEO et co-fondatrice, Opti Digital",
      sourceUrl: "https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc",
      sourceLabel: "Extrait du témoignage publié sur Trustfolio le 12 novembre 2025",
    },
  },
  method: {
    heading: "Le premier mois avec un DAF externalisé",
    intro: "Voici le déroulé type d’une prise de relais. Le calendrier dépend des priorités convenues, des accès et de l’état de la comptabilité.",
    steps: [
      { title: "Semaine 1. Auditer les flux et organiser la passation", text: "Nous rapprochons les soldes bancaires et faisons le point sur les échéances et les responsabilités avec votre équipe. Préparez les douze derniers mois de grand livre et de balance comptable, les relevés bancaires, les balances âgées clients et fournisseurs, les stocks si vous en avez, les contrats clés, la paie et les financements en cours." },
      { title: "Semaines 2 et 3. Prévoir la trésorerie et cartographier les risques", text: "Nous construisons un prévisionnel à 13 semaines et recensons les retards d’encaissement, les paiements sensibles et les hypothèses à vérifier. Le dirigeant sait quelles échéances surveiller et qui doit confirmer les informations manquantes." },
      { title: "Semaine 4. Présenter un premier reporting", text: "La première revue rapproche le compte de résultat, la trésorerie et quelques indicateurs choisis avec le dirigeant. Elle débouche sur des décisions, des responsables et des échéances." },
    ],
    note: "Lorsque les données demandent des reprises, il faut parfois deux à trois mois pour fiabiliser le reporting. Le budget, la marge par canal, le BFR ou les dossiers de financement viennent ensuite selon les priorités. Si vous recrutez un DAF en interne, la documentation des modèles et des procédures facilite la passation.",
    cities: getCompanyGeography("fr").summary,
  },
  pricing: {
    heading: "Quel est le tarif d’un DAF externalisé ?",
    intro: `La fourchette indicative des missions récurrentes Iter va de ${budget} par mois. Le forfait porte sur un périmètre de travail et un niveau de séniorité définis au devis. Les volumes de jours présentés dans les formules sont indicatifs : ils ne constituent pas un crédit d’heures.`,
    paragraphs: [
      "Le budget dépend des livrables, du nombre d’entités, de la qualité des données et de la complexité de votre organisation.",
      "Le socle Essentiel comprend notamment un reporting mensuel, un prévisionnel de trésorerie et une revue finance. Les autres formules élargissent le périmètre selon les besoins. Les projets ponctuels et les missions de transition font l’objet d’un chiffrage distinct ; une levée de fonds ou une acquisition n’est pas incluse par défaut dans toute mission récurrente.",
      `${ENGAGEMENT.formulation} Aucun dépassement n’est facturé sans avenant signé. Le devis précise les contributions attendues de votre équipe et les conditions de révision.`,
      "Pour examiner le périmètre, la disponibilité et les frais, consultez notre [méthode pour comparer des devis de DAF externalisé](/ressources/blog/cout-daf-externalise-tarifs-prix-2026).",
    ],
    link: { href: "/daf-externalise/tarifs", label: "Consulter les formules et les tarifs détaillés" },
  },
  experts: {
    heading: "Qui assure votre direction financière chez Iter ?",
    intro: "Sébastien Doat, {{role:sebastien-doat}}, est votre interlocuteur finance. Le premier échange permet de choisir le profil adapté à votre besoin : CFO ou Finance Manager senior, avec l’appui prévu dans la formule.",
    paragraphs: [
      "Les associés supervisent les engagements et interviennent sur les sujets structurants. Le cadrage identifie qui produit le reporting, conduit la revue et relit les livrables sensibles. La connaissance partagée du dossier permet d’organiser le relais entre intervenants.",
      "L’automatisation et l’IA peuvent faciliter la collecte ou la préparation des analyses lorsqu’elles répondent à un besoin identifié. Elles ne remplacent ni le contrôle des chiffres ni la discussion avec le dirigeant. La priorité reste une information compréhensible et utilisable, avec des outils adaptés à votre équipe.",
    ],
    slugs: ["sebastien-doat", "florent-greth"],
  },
  faq: [
    {"question": "Qu’est-ce qu’un DAF externalisé ?", "answer": "Un DAF externalisé est un directeur administratif et financier qui pilote la finance d’une PME sans en être salarié. Il peut intervenir à temps partagé ou sur une mission temporaire de transition. Son rôle complète les travaux de l’expert-comptable, selon les responsabilités convenues."},
    {"question": "Quelle différence entre un DAF externalisé et un expert-comptable ?", "answer": "L’expert-comptable produit les comptes et les déclarations selon sa lettre de mission. Le DAF externalisé utilise ces comptes pour prévoir, piloter et préparer les décisions du dirigeant ; il complète la mission du cabinet comptable."},
    { question: "Combien coûte un DAF externalisé ?", answer: `Chez Iter Advisors, l’accompagnement récurrent se situe dans une fourchette indicative de ${budget} par mois selon le périmètre et le profil ; consultez les [tarifs du DAF externalisé](/daf-externalise/tarifs).` },
    {"question": "Quelle différence entre DAF externalisé, temps partagé et transition ?", "answer": "DAF externalisé décrit le recours à une direction financière extérieure à l’entreprise. Le temps partagé est un format récurrent, généralement quelques jours par mois. La transition est une mission temporaire de remplacement ou de transformation, dont la durée et la disponibilité sont convenues au cadrage."},

    { question: "Dois-je changer d’expert-comptable ?", answer: "L’intervention du DAF n’implique pas, en elle-même, de changer de cabinet. L’expert-comptable produit et sécurise l’information comptable et fiscale selon sa lettre de mission ; le DAF organise son utilisation pour piloter. Les échanges et responsabilités sont définis ensemble. [Pour aller plus loin, comparez les rôles du DAF et de l’expert-comptable](/ressources/blog/daf-externalise-vs-expert-comptable)." },
    { question: "Faut-il changer nos logiciels ?", answer: "Un changement ne doit pas être un préalable automatique. L’existant est examiné avant de proposer une évolution : données accessibles, fiabilité et temps de traitement. Une migration éventuelle doit avoir un objectif, un coût et un périmètre définis. [Notre approche de l’IA en finance détaille cette méthode](/ressources/ia-finance)." },
    { question: "Qui garde la décision et les autorisations de paiement ?", answer: "Le dirigeant conserve les décisions et les autorisations de paiement. Les analyses du DAF servent à préparer les arbitrages. Les accès aux outils doivent correspondre aux tâches confiées ; toute délégation éventuelle nécessite un cadre explicite, distinct d’un simple accès aux informations financières." },
    { question: "Comment préparer la fin d’une mission ?", answer: `Le préavis est de ${ENGAGEMENT.preavisJours} jours. Faites préciser au contrat les modalités de restitution des fichiers, la documentation et la passation à votre équipe ou au prochain intervenant. Ces points doivent être abordés dès le cadrage, avec les règles d’accès et de confidentialité applicables aux données.` },
    { question: "Et si nous avons besoin d’un DAF à temps plein ?", answer: "Une présence quotidienne durable peut justifier un recrutement. Pour un remplacement ou une transformation temporaire, le [DAF de transition](/daf-externalise/transition) est une autre réponse. Le [temps partagé](/daf-externalise/temps-partage) convient à un besoin récurrent dont le volume reste partiel : ces dispositifs se choisissent selon la charge réelle." },
    { question: "Accompagnez-vous aussi les startups ?", answer: "Oui. Les priorités peuvent inclure le suivi de trésorerie, le reporting investisseurs et la préparation d’un financement. Le niveau d’intervention dépend de l’organisation et des données disponibles, pas seulement du tour de financement. La page [CFO externalisé pour startups](/fractional-cfo-startups) détaille cet accompagnement." },
  ],
  contact: {
    heading: "Échangeons sur votre situation",
    text: "Décrivez votre priorité, votre organisation actuelle et votre échéance. Nous vous recontactons pour préciser le besoin et convenir d’un échange. Il servira à identifier un périmètre utile et les informations nécessaires à une proposition. Aucun rendez-vous n’est réservé automatiquement par le formulaire.",
    href: "/contact#daf",
  },
} as const;
type Widen<T> = T extends string ? string : T extends readonly (infer U)[] ? ReadonlyArray<Widen<U>> : T extends object ? { [K in keyof T]: Widen<T[K]> } : T;
export type DafPillarContent = Widen<typeof dafPillar>;
