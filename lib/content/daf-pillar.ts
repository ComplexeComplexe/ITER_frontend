/** French transactional pillar. Commercial facts stay shared with the pricing page. */
import { CLIENTS_ACCOMPAGNES, DELAIS, ENGAGEMENT, FORMULES } from "@/lib/content/facts";

export const DAF_PILLAR_PATH = "/daf-externalise";
export const DAF_PILLAR_PUBLISHED = "2026-05-17";
export const DAF_PILLAR_MODIFIED = "2026-10-03";
export const DAF_PILLAR_MODIFIED_LABEL = "3 octobre 2026";
const fmt = (n: number) => n.toLocaleString("fr-FR").replace(/ | /g, " ");
const budget = `${fmt(FORMULES[0].prixMin)} à ${fmt(FORMULES[FORMULES.length - 1].prixMax)} € HT`;

export const dafPillar = {
  meta: {
    title: "DAF externalisé pour PME | Iter Advisors",
    description: "DAF externalisé pour PME : trésorerie, reporting et pilotage financier avec un interlocuteur dédié. Découvrez les missions, les livrables et le fonctionnement.",
  },
  breadcrumbLabel: "DAF externalisé",
  hero: {
    h1: "DAF externalisé pour PME",
    lead: "Pilotez votre trésorerie, vos marges et vos financements avec un directeur financier senior dédié, sans recruter à temps plein.",
    intro: "Un DAF externalisé prend en charge le pilotage financier de votre entreprise quelques jours par mois. Il transforme les données comptables et opérationnelles en prévisions, en décisions et en actions suivies avec vous. Le temps partagé décrit ce rythme d’intervention ; fractional CFO est l’appellation anglophone courante.",
    landmarks: [
      { label: "Budget mensuel indicatif", value: budget },
      { label: "Démarrage indicatif", value: DELAIS.missionDemarree },
      { label: "Engagement", value: `Sans durée minimale, préavis de ${ENGAGEMENT.preavisJours} jours` },
    ],
    proofs: [`${CLIENTS_ACCOMPAGNES} entreprises accompagnées`, "Équipes à Paris et Barcelone"],
    cta: "Échanger sur mon besoin",
  },
  nav: [
    { id: "missions", label: "Missions" },
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
      { title: "Structurer une entreprise qui grandit", text: "Le dirigeant centralise les tableaux, les équipes utilisent des versions différentes et le reporting arrive trop tard. Le chantier porte sur les responsabilités, le calendrier de clôture et les indicateurs utiles. Le DAF travaille avec les personnes déjà en place pour organiser une fonction finance adaptée à votre taille." },
      { title: "Préparer un financement ou une opération", text: "Vous devez présenter un projet à une banque, préparer une levée ou étudier une acquisition. Le travail consiste à rendre les hypothèses explicites, tester les scénarios et organiser les documents demandés. Ces projets font l’objet d’un périmètre précis, distinct du suivi mensuel lorsqu’ils le nécessitent." },
    ],
    note: "Si vous cherchez uniquement une tenue comptable, ou une présence de direction à temps plein, le dispositif à temps partagé doit être comparé aux autres solutions avant de décider.",
  },
  missions: {
    heading: "Ce que vous recevez et les décisions que cela prépare",
    intro: "Le périmètre est défini au départ : toutes les missions n’incluent pas tous les livrables. Le socle récurrent associe généralement prévisionnel, reporting et revue avec le dirigeant. Les travaux de financement, de transformation ou d’acquisition sont ajoutés selon votre situation.",
    items: [
      { title: "Anticiper la trésorerie", deliverable: "Un prévisionnel à 13 semaines, avec les encaissements, paiements, échéances de dette et hypothèses à surveiller. La fréquence d’actualisation est convenue selon la volatilité de votre activité et la disponibilité des données.", decision: "Identifier une tension à venir, préparer un échange bancaire ou arbitrer le calendrier d’une dépense. Le prévisionnel distingue les flux connus des hypothèses ; il ne garantit pas les encaissements.", href: "/services/previsionnel-tresorerie", linkLabel: "Prévisionnel de trésorerie" },
      { title: "Comprendre la rentabilité", deliverable: "Un reporting mensuel du résultat, de la trésorerie et des indicateurs pertinents, avec une lecture des écarts au budget. Selon votre modèle, l’analyse porte sur une activité, un canal, une entité ou un projet.", decision: "Repérer une marge qui se dégrade, discuter d’un prix ou revoir une dépense. Les données provisoires et les limites de comparaison sont signalées pour éviter de décider sur un chiffre incomplet.", href: "/services/controle-de-gestion-externalise", linkLabel: "Contrôle de gestion externalisé" },
      { title: "Construire une trajectoire finançable", deliverable: "Un budget ou un business plan avec ses scénarios et, si la mission le prévoit, un dossier de financement. Les besoins de trésorerie sont reliés aux hypothèses de vente, de recrutement et d’investissement.", decision: "Comparer plusieurs trajectoires et préparer les questions des banques ou investisseurs. L’obtention d’un financement dépend aussi du projet et de leurs décisions ; elle ne peut pas être promise par le DAF.", href: "/services/accompagnement-levee-de-fond", linkLabel: "Préparer une levée de fonds" },
    ],
    example: {
      heading: "Une revue mensuelle orientée vers l’action",
      intro: "Cette trame illustre le déroulé d’un échange, sans présenter de données client. L’objectif est de relier chaque constat à une décision, puis de vérifier son avancement lors de la revue suivante.",
      rows: [
        ["Encaissements décalés", "Quelles factures nécessitent une relance ?", "Responsable et échéance de relance"],
        ["Marge inférieure au budget", "Quel coût ou canal explique l’écart ?", "Analyse ciblée avant arbitrage"],
        ["Investissement envisagé", "Quel effet sur le solde de trésorerie ?", "Scénario à valider par le dirigeant"],
      ],
    },
  },
  cases: {
    heading: "Deux missions pour comprendre notre intervention",
    intro: "Les exemples suivants décrivent des travaux documentés. Leur périmètre illustre deux besoins différents ; il ne préjuge ni du calendrier ni des résultats d’une nouvelle mission.",
    items: [
      { company: "Opti Digital", title: "Structurer la fonction finance dans la durée", text: "Dans cette PME adtech, l’accompagnement associe reporting mensuel, procédures de clôture, migration ERP et financement non dilutif. La mission comprend aussi la coordination des sujets fiscaux et juridiques avec les conseils externes. Elle montre comment le pilotage récurrent peut s’articuler avec des chantiers de structuration.", takeaway: "Pour le dirigeant : disposer d’une fonction finance organisée et d’un interlocuteur pour relier les différents travaux. Aucun montant de financement ni gain de productivité n’est annoncé ici.", href: "/ressources/cas-clients/opti-digital-structuration-financement", linkLabel: "Voir la mission Opti Digital" },
      { company: "SolarMente", title: "Préparer une levée et une acquisition", text: "Le cas documenté sur la période 2022 à 2024 porte sur un modèle financier multi-scénarios, une data room, le reporting au conseil et des procédures de contrôle de trésorerie. Il comprend l’intégration financière de l’acquisition d’Eltex en 2024, dans un contexte de croissance d’une cleantech.", takeaway: "Pour le dirigeant : organiser les informations et les hypothèses nécessaires à une opération. Les dirigeants, investisseurs et conseils ont également contribué à ces projets ; leur réussite ne peut pas être attribuée au seul accompagnement d’Iter.", href: "/ressources/cas-clients/solarmente-serie-b-cleantech", linkLabel: "Voir la mission SolarMente" },
    ],
    quote: {
      text: "J'apprécie particulièrement leur capacité à nous challenger et à éclairer nos décisions stratégiques.",
      author: "Magali Quentel-Reme",
      role: "CEO et co-fondatrice, Opti Digital",
      sourceUrl: "https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc",
      sourceLabel: "Extrait du témoignage publié sur Trustfolio le 12 novembre 2025",
    },
  },
  method: {
    heading: "Comment se passe la collaboration ?",
    intro: `Le délai indicatif de démarrage est de ${DELAIS.missionDemarree}, à confirmer selon le profil et le périmètre. La mise en place suit ensuite vos priorités et l’état de vos données, sans imposer le même programme de 90 jours à chaque entreprise.`,
    steps: [
      { title: "Cadrer les responsabilités", text: "Nous examinons vos outils, les données disponibles et les décisions à préparer. Le cadrage écrit précise les livrables, leur fréquence, les interlocuteurs et les travaux hors périmètre. Votre équipe identifie qui transmet les informations ; le rôle de l’expert-comptable est clarifié pour éviter les doublons." },
      { title: "Organiser un mois de travail", text: "Le rythme associe collecte et rapprochement des données, préparation des analyses, puis revue avec le dirigeant. Les actions retenues ont un responsable et une échéance. Ce travail peut être réparti sur le mois : un volume indicatif de jours ne signifie pas que tout se joue lors d’une seule réunion." },
      { title: "Ajuster le dispositif", text: "Le suivi permet de revoir les hypothèses et les priorités. Une nouvelle entité, une acquisition ou un changement d’outil peut nécessiter un avenant. Les canaux de contact, le traitement des urgences et le relais en cas d’absence sont à préciser au cadrage, selon la disponibilité nécessaire à votre organisation." },
    ],
    note: "Prévoyez un interlocuteur interne, les accès adaptés et du temps pour valider les hypothèses. La charge de préparation dépend de la qualité des données : elle est à estimer ensemble, sans promettre un nombre d’heures identique à toutes les entreprises.",
    cities: "Nos équipes sont basées à Paris et Barcelone. Le rythme sur site et à distance est convenu au cadrage. À Toulouse, les interventions se font à distance et avec des déplacements selon accord.",
  },
  pricing: {
    heading: "Quel budget prévoir et que couvre le forfait ?",
    intro: `La fourchette indicative des missions récurrentes Iter va de ${budget} par mois. Le forfait porte sur un périmètre de travail et un niveau de séniorité définis au devis. Les volumes de jours présentés dans les formules sont indicatifs : ils ne constituent pas un crédit d’heures.`,
    paragraphs: [
      "Le budget varie avec les livrables attendus, le nombre d’entités, la qualité des données et la complexité de l’organisation. Une entreprise dont le reporting existe déjà n’appelle pas le même travail qu’une fonction finance à reconstruire. La production, l’analyse et la supervision doivent donc être comparées ensemble lorsque vous examinez plusieurs propositions.",
      "Le socle Essentiel comprend notamment un reporting mensuel, un prévisionnel de trésorerie et une revue finance. Les autres formules élargissent le périmètre selon les besoins. Les projets ponctuels et les missions de transition font l’objet d’un chiffrage distinct ; une levée de fonds ou une acquisition n’est pas incluse par défaut dans toute mission récurrente.",
      `${ENGAGEMENT.formulation} Aucun dépassement n’est facturé sans avenant signé. Avant de vous engager, faites préciser ce qui est inclus, les contributions attendues de votre équipe et les conditions de révision. Comparer uniquement un forfait mensuel à un salaire à temps plein ne suffit pas : la présence et les responsabilités confiées diffèrent.`,
      "Pour examiner le périmètre, la disponibilité et les frais, consultez notre [méthode pour comparer des devis de DAF externalisé](/ressources/blog/cout-daf-externalise-tarifs-prix-2026).",
    ],
    link: { href: "/daf-externalise/tarifs", label: "Consulter les formules et les tarifs détaillés" },
  },
  experts: {
    heading: "Qui pilote votre mission chez Iter ?",
    intro: "Sébastien Doat, associé fondateur et DAF externalisé, est votre interlocuteur finance. Le profil affecté à la mission dépend du besoin : CFO ou Finance Manager senior, avec l’appui prévu dans la formule. Le premier échange sert aussi à vérifier cette adéquation, plutôt qu’à vous proposer un niveau de séniorité identique pour tous les travaux.",
    paragraphs: [
      "Les associés supervisent les engagements et interviennent sur les sujets structurants. Le cadrage permet de distinguer la personne qui produit le reporting, celle qui conduit la revue et celle qui relit les livrables sensibles. La continuité repose sur la connaissance du dossier et l’organisation d’un relais, sans promettre qu’une même personne sera disponible en toutes circonstances.",
      "L’automatisation et l’IA peuvent faciliter la collecte ou la préparation des analyses lorsqu’elles répondent à un besoin identifié. Elles ne remplacent ni le contrôle des chiffres ni la discussion avec le dirigeant. La priorité reste une information compréhensible et utilisable, avec des outils adaptés à votre équipe.",
    ],
    slugs: ["sebastien-doat", "florent-greth"],
  },
  faq: [
    { question: "Dois-je changer d’expert-comptable ?", answer: "L’intervention du DAF n’implique pas, en elle-même, de changer de cabinet. L’expert-comptable produit et sécurise l’information comptable et fiscale selon sa lettre de mission ; le DAF organise son utilisation pour piloter. Les échanges et responsabilités sont définis ensemble. [Comparer les rôles](/ressources/blog/daf-externalise-vs-expert-comptable)." },
    { question: "Faut-il changer nos logiciels ?", answer: "Un changement ne doit pas être un préalable automatique. L’existant est examiné avant de proposer une évolution : données accessibles, fiabilité et temps de traitement. Une migration éventuelle doit avoir un objectif, un coût et un périmètre définis. [Notre approche IA et finance](/ressources/ia-finance)." },
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
