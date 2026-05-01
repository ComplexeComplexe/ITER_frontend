import { Locale } from "../i18n";

export interface FaqRichBullet {
  label: string;
  text: string;
}

export interface FaqRichAnswer {
  intro?: string;
  bullets?: FaqRichBullet[];
  outro?: string;
}

export interface FaqItem {
  question: string;
  /** Plain-text answer — used by JSON-LD FAQPage schema. Always required. */
  answer: string;
  /** Optional structured answer rendered when present (intro + bullets + outro). */
  answerRich?: FaqRichAnswer;
}

export interface DafSection {
  heading: string;
  content: string[];
}

export interface DafSubSection {
  heading: string;
  content: string[];
  subsections?: { heading: string; content: string[] }[];
}

export interface ComparisonTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface FeaturedQuote {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface DafContent {
  meta: {
    title: string;
    description: string;
  };
  breadcrumbLabel: string;
  h1: string;
  intro: string[];
  partnerSection: DafSection;
  whatIs: DafSubSection;
  comparisonTable?: ComparisonTable;
  tempsPartage?: DafSection;
  vsExpertComptable?: DafSection;
  advantages: DafSubSection;
  missions: DafSection;
  pricing: DafSection;
  featuredQuote?: FeaturedQuote;
  whenToHire: DafSection;
  profiles: DafSection;
  tools: DafSection;
  whyChoose: DafSection;
  faq: FaqItem[];
  ctaButton: string;
}

export const dafContent: Record<Locale, DafContent> = {
  fr: {
    meta: {
      title: "DAF Externalisé & Temps Partagé | Guide et Tarifs 2026",
      description:
        "Accélérez votre croissance avec un DAF externalisé à temps partagé. Trésorerie, reporting, levée de fonds. Découvrez le rôle du DAF et nos tarifs 2026.",
    },
    breadcrumbLabel: "DAF Externalisé",
    h1: "DAF Externalisé & à Temps Partagé : le bras droit financier de votre croissance",
    intro: [
      "Ne pilotez plus à vue. Accédez à l'expertise d'un Directeur Financier de haut niveau pour structurer votre croissance, gérer votre trésorerie et rassurer vos investisseurs, sans le coût d'un temps plein.",
      "Un DAF externalisé — aussi appelé DAF à temps partagé ou CFO part-time — est un professionnel senior de la finance qui intervient dans votre entreprise sans en être salarié à temps plein. Il devient le co-pilote du dirigeant sur les sujets financiers : pilotage, trésorerie, reporting, relations investisseurs, sur un mode flexible (temps partagé, mission ponctuelle ou abonnement mensuel).",
    ],
    partnerSection: {
      heading: "Iter Advisors, votre partenaire stratégique",
      content: [
        "Iter Advisors est un cabinet de DAF externalisé présent à Barcelone, Paris et Toulouse. Nous mettons à disposition de nos clients des directeurs financiers expérimentés (10+ ans d'expérience), capables d'intervenir sur l'ensemble des problématiques financières d'une entreprise en croissance.",
        "Notre approche repose sur trois piliers fondamentaux : l'expertise technique, la vision stratégique et la flexibilité d'intervention. Chaque mission est conçue sur mesure pour répondre aux enjeux spécifiques de votre entreprise.",
        "Avec plus de 85 entreprises accompagnées et plus de 100 millions d'euros de levées de fonds réalisées par nos clients, Iter Advisors s'est imposé comme un acteur de référence dans le domaine du DAF externalisé en France et en Espagne.",
      ],
    },
    whatIs: {
      heading: "Qu'est-ce qu'un DAF externalisé ?",
      content: [
        "Un DAF externalisé, ou directeur administratif et financier externalisé, est un professionnel de la finance qui intervient au sein de votre entreprise sans en être salarié à temps plein. Il assume les mêmes responsabilités qu'un DAF interne : pilotage financier, gestion de trésorerie, reporting, accompagnement stratégique et relations avec les investisseurs.",
      ],
      subsections: [
        {
          heading: "Définition et rôle principal",
          content: [
            "Le DAF externalisé assure la direction financière de votre entreprise à temps partagé ou en mission ponctuelle. Son rôle est de structurer, piloter et optimiser la fonction finance pour soutenir la croissance de l'entreprise.",
            "Il intervient sur les sujets clés : élaboration du business plan, construction du prévisionnel de trésorerie, mise en place d'outils de pilotage, préparation des levées de fonds, optimisation des process comptables et financiers.",
          ],
        },
        {
          heading: "Différence entre DAF, RAF et CFO",
          content: [
            "Le DAF (Directeur Administratif et Financier) est un terme français qui englobe à la fois les responsabilités administratives et financières. Le RAF (Responsable Administratif et Financier) occupe généralement un poste plus opérationnel, centré sur la comptabilité et l'administratif.",
            "Le CFO (Chief Financial Officer) est l'équivalent anglo-saxon du DAF, avec une dimension plus stratégique et orientée vers les marchés financiers. Chez Iter Advisors, nos professionnels combinent ces différentes compétences pour offrir un accompagnement complet.",
          ],
        },
        {
          heading: "DAF externalisé vs DAF interne : le comparatif",
          content: [
            "Un DAF interne coûte entre 80 000 et 150 000 EUR brut annuel (hors charges patronales de 25-42 %), soit un coût total employeur de 100 000 à 213 000 EUR par an. Un DAF externalisé représente un budget de 2 000 à 8 000 EUR par mois selon le volume d'intervention, soit 24 000 à 96 000 EUR par an.",
            "Le DAF interne offre une présence quotidienne et une connaissance approfondie de l'entreprise, mais implique un engagement long terme et des coûts fixes élevés. Le DAF externalisé apporte flexibilité, regard extérieur multi-sectoriel et un réseau étendu de partenaires, sans engagement de durée.",
            "Pour les entreprises de 1 à 50 M EUR de chiffre d'affaires, le DAF externalisé est souvent la solution la plus pertinente : il offre une expertise de haut niveau à un coût maîtrisé, avec la possibilité de moduler l'intervention selon les phases de croissance.",
          ],
        },
      ],
    },
    comparisonTable: {
      caption: "DAF externalisé vs DAF interne — comparatif synthétique",
      headers: ["Critère", "DAF externalisé", "DAF interne"],
      rows: [
        ["Coût annuel", "24 000 – 96 000 EUR", "100 000 – 213 000 EUR (charges incluses)"],
        ["Engagement", "Sans durée minimum, modulable au mois", "CDI, préavis 3 mois"],
        ["Délai de mise en place", "Opérationnel sous 1 à 2 semaines", "3 à 6 mois (recrutement + onboarding)"],
        ["Expertise sectorielle", "Multi-sectorielle, regard extérieur", "Mono-entreprise"],
        ["Réseau (VC, banques, avocats)", "Étendu, mutualisé", "Limité au parcours individuel"],
        ["Présence", "1 à 8+ jours / mois, hybride", "5 jours / semaine, présentiel"],
        ["Idéal pour", "PME et startups 1 – 50 M EUR de CA", "ETI et groupes > 50 M EUR de CA"],
      ],
    },
    tempsPartage: {
      heading: "DAF externalisé ou DAF à temps partagé : est-ce la même chose ?",
      content: [
        "Oui — les deux expressions désignent la même réalité : un directeur financier senior qui partage son temps entre plusieurs entreprises au lieu d'être salarié à temps plein chez un seul employeur. « DAF externalisé » est le terme générique, « DAF à temps partagé » insiste sur le mode d'organisation (quelques jours par mois ou par semaine de manière récurrente).",
        "Vous croiserez aussi les termes CFO part-time, CFO fractional, DAF en temps partagé, DAF mutualisé ou directeur financier à temps partiel : ce sont des synonymes du même service. La nuance vient surtout de la durée d'engagement : un DAF à temps partagé s'inscrit dans la durée (12 à 36 mois en moyenne), alors qu'un DAF externalisé peut aussi intervenir en mission ponctuelle (levée de fonds, M&A, transition).",
        "Chez Iter Advisors, nous proposons les deux modes : un accompagnement à temps partagé pour structurer la finance d'une PME en croissance, et des missions courtes pour des opérations stratégiques. La frontière est volontairement floue : c'est votre besoin qui dicte le format, pas l'inverse.",
      ],
    },
    vsExpertComptable: {
      heading: "DAF externalisé ou expert-comptable : quelle différence ?",
      content: [
        "L'expert-comptable et le DAF externalisé sont complémentaires — pas concurrents. L'expert-comptable certifie la conformité légale et fiscale (bilan annuel, liasse fiscale, déclarations TVA, paie). Il regarde le passé et garantit la régularité des comptes vis-à-vis de l'administration.",
        "Le DAF externalisé pilote la performance financière au quotidien : prévisionnel de trésorerie, reporting de gestion, analyse de marges, préparation de levée de fonds, négociation bancaire, choix d'outils, accompagnement stratégique du dirigeant. Il anticipe l'avenir et aide à prendre des décisions opérationnelles.",
        "Concrètement : votre expert-comptable produit le grand livre, le DAF externalisé en tire un tableau de bord pour votre CODIR. L'un boucle la photo annuelle, l'autre filme le trimestre en cours et projette les 12 prochains mois. Une PME structurée a typiquement les deux : un expert-comptable pour la conformité, un DAF externalisé pour le pilotage.",
      ],
    },
    advantages: {
      heading: "Les 5 avantages clés du DAF externalisé",
      content: [
        "Faire appel à un DAF externalisé présente de nombreux avantages pour les entreprises en croissance :",
      ],
      subsections: [
        {
          heading: "Réduction significative des coûts (jusqu'à -60 %)",
          content: [
            "Le coût d'un DAF externalisé est nettement inférieur à celui d'un DAF en interne. Vous ne payez que pour le temps effectivement consacré à votre entreprise, sans charges sociales ni avantages salariaux. Un DAF externalisé à 3 jours par mois coûte environ 3 000 EUR, contre 8 000 à 17 000 EUR par mois pour un DAF salarié (charges comprises).",
          ],
        },
        {
          heading: "Flexibilité et adaptabilité",
          content: [
            "Le DAF externalisé s'adapte à vos besoins réels. Que vous ayez besoin d'une intervention ponctuelle pour une levée de fonds ou d'un accompagnement régulier à temps partagé, le volume d'intervention est ajustable en fonction de l'évolution de votre activité. Pas d'engagement long terme, pas de préavis.",
          ],
        },
        {
          heading: "Expertise multi-sectorielle et regard extérieur",
          content: [
            "Nos DAFs externalisés interviennent dans de nombreuses entreprises et secteurs d'activité (SaaS, e-commerce, industrie, services). Cette diversité d'expériences leur confère un regard extérieur précieux et une capacité à identifier rapidement les leviers d'amélioration de votre performance financière.",
          ],
        },
        {
          heading: "Accès à un réseau d'experts",
          content: [
            "En faisant appel à Iter Advisors, vous accédez à un vaste réseau de partenaires : investisseurs (VCs, business angels), banquiers, avocats d'affaires, experts-comptables et consultants spécialisés. Ce réseau constitue un atout majeur pour accélérer votre développement.",
          ],
        },
        {
          heading: "Opérationnel dès le premier jour",
          content: [
            "Contrairement à un recrutement interne qui nécessite 3 à 6 mois d'onboarding, le DAF externalisé est opérationnel immédiatement. Nos CFOs connaissent les outils, les process et les problématiques des entreprises en croissance. Ils apportent des résultats concrets dès les premières semaines.",
          ],
        },
      ],
    },
    missions: {
      heading: "Les missions principales d'un DAF externalisé",
      content: [
        "Le DAF externalisé intervient sur un large spectre de missions financières et stratégiques :",
        "Pilotage financier et reporting : mise en place de tableaux de bord, suivi des KPIs financiers, reporting mensuel aux dirigeants et investisseurs, construction du budget prévisionnel.",
        "Gestion de trésorerie : élaboration du prévisionnel de trésorerie à 12 mois glissants, optimisation du BFR (besoin en fonds de roulement), gestion des relations bancaires, mise en place de financements court terme.",
        "Levée de fonds : préparation du dossier d'investissement (pitch deck financier, data room), modélisation financière, accompagnement dans les négociations avec les investisseurs, due diligence financière.",
        "Structuration des process : mise en place de la comptabilité analytique, automatisation des process financiers, sélection et déploiement d'outils adaptés (ERP, BI, trésorerie).",
        "Accompagnement stratégique : conseil en matière de pricing, analyse de rentabilité par produit/client, aide à la prise de décision stratégique, préparation aux opérations de M&A.",
      ],
    },
    pricing: {
      heading: "Combien coûte un DAF externalisé ? Grille tarifaire 2026",
      content: [
        "Le tarif journalier moyen (TJM) d'un DAF externalisé se situe entre 750 et 1 250 EUR HT selon le niveau de séniorité et la complexité des missions. Chez Iter Advisors, nous proposons trois formules adaptées aux besoins des PME et startups.",
        "Formule Essentiel (2-3 jours/mois) : à partir de 2 000 EUR HT/mois. Idéale pour les startups early-stage qui ont besoin d'un suivi de trésorerie, d'un reporting mensuel et d'un interlocuteur financier pour les investisseurs.",
        "Formule Croissance (4-6 jours/mois) : à partir de 4 000 EUR HT/mois. Pour les PME en structuration qui nécessitent un pilotage financier complet, la mise en place d'outils et un accompagnement stratégique régulier.",
        "Formule Premium (8+ jours/mois) : à partir de 7 000 EUR HT/mois. Pour les scale-ups et entreprises en phase de levée de fonds ou de M&A, avec un DAF quasi-intégré à l'équipe dirigeante.",
        "À titre de comparaison, un DAF salarié à temps plein coûte entre 100 000 et 213 000 EUR par an (salaire + charges), soit 8 300 à 17 750 EUR par mois. Le DAF externalisé permet une économie de 50 à 70 % selon la formule choisie.",
      ],
    },
    // PLACEHOLDER — à remplacer par un vrai témoignage extrait de Trustfolio.
    // Affiché en bandeau sous la grille tarifaire pour soutenir la conversion (audit SEO D.3).
    featuredQuote: {
      quote:
        "Iter Advisors nous a apporté en quelques semaines la lecture financière qu'on cherchait depuis deux ans. Aujourd'hui je décide en m'appuyant sur des chiffres, pas sur mon intuition.",
      author: "Témoignage client",
      role: "CEO & co-fondateur·rice",
      company: "Scale-up SaaS B2B",
    },
    whenToHire: {
      heading: "Quand faire appel à un DAF externalisé ?",
      content: [
        "Plusieurs situations justifient le recours à un DAF externalisé. Voici les signaux les plus fréquents :",
        "Vous préparez une levée de fonds : vous avez besoin d'un business plan solide, d'une modélisation financière rigoureuse et d'un interlocuteur crédible face aux investisseurs.",
        "Votre croissance s'accélère : le chiffre d'affaires dépasse 500 K EUR et la gestion financière artisanale ne suffit plus. Il faut structurer le reporting, optimiser la trésorerie et piloter la rentabilité.",
        "Vous recrutez massivement : les charges de personnel explosent et vous devez anticiper financièrement chaque recrutement pour éviter les tensions de trésorerie.",
        "Votre DAF interne est parti : plutôt que de recruter dans l'urgence (6 mois de process), un DAF externalisé assure la continuité immédiate.",
        "Vous préparez une opération de M&A : cession, acquisition ou rapprochement, vous avez besoin d'un expert pour la due diligence, la valorisation et les négociations.",
        "Vous vous internationalisez : implantation en Espagne, en France ou dans un nouveau marché, vous avez besoin d'un CFO qui connaît les deux environnements fiscaux et réglementaires.",
      ],
    },
    profiles: {
      heading: "Quels profils de DAF externalisé pour quels besoins ?",
      content: [
        "Le DAF externalisé n'est pas un profil unique. Selon votre stade de développement et vos enjeux, le profil idéal varie :",
        "DAF opérationnel : pour les entreprises qui ont besoin de structurer leur comptabilité, mettre en place un ERP et fiabiliser le reporting. Profil typique : 8-12 ans d'expérience, expertise en process et outils.",
        "DAF stratégique : pour les entreprises en phase de croissance qui ont besoin de piloter la rentabilité, préparer des levées de fonds et accompagner les décisions du COMEX. Profil typique : 15+ ans d'expérience, passage en direction financière de scale-up ou ETI.",
        "DAF de transition : pour les situations d'urgence (départ du DAF, crise de trésorerie, restructuration). Intervention intensive sur 3-6 mois pour stabiliser la situation. Profil typique : 20+ ans d'expérience, habitué aux environnements complexes.",
        "Chez Iter Advisors, tous nos DAFs ont un minimum de 10 ans d'expérience en direction financière et sont sélectionnés pour leur capacité à s'intégrer rapidement dans des environnements exigeants.",
      ],
    },
    tools: {
      heading: "Les outils du DAF externalisé moderne",
      content: [
        "Un DAF externalisé performant s'appuie sur une stack d'outils modernes pour automatiser les tâches répétitives et se concentrer sur l'analyse et la stratégie :",
        "Comptabilité et facturation : Pennylane, Sage, QuickBooks, Xero. Ces outils permettent une comptabilité en temps réel et une collaboration fluide avec l'expert-comptable.",
        "Trésorerie et prévisionnel : Agicap, Fygr, Cashflow. Pour un suivi quotidien de la trésorerie et des prévisionnels à 12 mois glissants.",
        "Reporting et BI : Power BI, Looker, Metabase, Google Sheets avancé. Pour construire des tableaux de bord automatisés et des analyses de rentabilité.",
        "ERP et gestion : Odoo, NetSuite, SAP Business One. Pour les entreprises qui ont besoin d'intégrer la finance avec les opérations (achats, stocks, production).",
        "Chez Iter Advisors, nous travaillons avec plus de 30 partenaires technologiques et nous aidons nos clients à choisir et déployer les outils les plus adaptés à leur taille et leur secteur.",
      ],
    },
    whyChoose: {
      heading: "Pourquoi choisir Iter Advisors comme cabinet de DAF externalisé ?",
      content: [
        "Iter Advisors se distingue par la qualité de ses équipes et la profondeur de son accompagnement. Nos 15 collaborateurs, tous experts de la fonction finance, interviennent avec rigueur et engagement auprès de chaque client.",
        "Notre présence à Barcelone, Paris et Toulouse nous permet d'accompagner des entreprises internationales et de comprendre les spécificités de chaque marché. Nous travaillons avec plus de 30 partenaires technologiques pour garantir une gestion financière moderne et efficace.",
        "La satisfaction de nos clients est notre priorité : nous affichons une note de 5/5 sur Trustfolio, avec 31 avis vérifiés. Cette excellence se traduit par des relations durables et des résultats concrets pour les entreprises que nous accompagnons.",
      ],
    },
    faq: [
      {
        question: "Combien coûte un DAF externalisé ?",
        answer:
          "Le TJM d'un DAF externalisé se situe entre 750 et 1 250 EUR HT. Chez Iter Advisors, nos formules vont de 2 000 EUR/mois (2-3 jours) à 7 000+ EUR/mois (8+ jours). À titre de comparaison, un DAF salarié coûte 8 300 à 17 750 EUR/mois charges comprises.",
      },
      {
        question: "Quelle est la différence entre un DAF externalisé et un DAF à temps partagé ?",
        answer:
          "Le DAF externalisé est un terme générique qui englobe toutes les formes d'intervention externe en direction financière. Le DAF à temps partagé est une forme spécifique : il intervient de manière récurrente dans l'entreprise, généralement quelques jours par semaine ou par mois, sur une durée longue.",
      },
      {
        question: "Quand une entreprise doit-elle faire appel à un DAF externalisé ?",
        answer:
          "L'intervention d'un Directeur Administratif et Financier (DAF) à temps partagé est particulièrement recommandée lors des phases de transition critiques : hypercroissance (quand la gestion financière devient trop complexe pour le seul dirigeant), levée de fonds (Seed, Série A, Série B — pour préparer le business plan, le pitch deck et rassurer les investisseurs avec un reporting carré), tension de trésorerie (pour restructurer la dette, optimiser le BFR et mettre en place un prévisionnel strict), et départ ou absence d'un profil clé (en management de transition).",
        answerRich: {
          intro:
            "L'intervention d'un Directeur Administratif et Financier (DAF) à temps partagé est particulièrement recommandée lors des phases de transition critiques :",
          bullets: [
            {
              label: "Hypercroissance",
              text: "quand la gestion financière devient trop complexe pour le seul dirigeant.",
            },
            {
              label: "Levée de fonds",
              text: "pour préparer le business plan, le pitch deck et rassurer les investisseurs avec un reporting carré (Seed, Série A, Série B).",
            },
            {
              label: "Tension de trésorerie",
              text: "pour restructurer la dette, optimiser le BFR (Besoin en Fonds de Roulement) et mettre en place un prévisionnel strict.",
            },
            {
              label: "Départ ou absence",
              text: "en management de transition pour pallier l'absence temporaire d'un profil clé en interne.",
            },
          ],
        },
      },
      {
        question: "Comment se déroule la mise en place de la mission (Onboarding) ?",
        answer:
          "Nous commençons toujours par un audit flash de votre fonction financière actuelle (processus, outils, équipes en place). À l'issue de cet état des lieux, nous définissons ensemble une feuille de route claire avec des objectifs chiffrés. La mission commence ensuite avec un rythme défini (par exemple, 1 jour par semaine) qui peut être réévalué de manière totalement flexible selon l'évolution de vos besoins.",
      },
      {
        question: "Un DAF externalisé peut-il gérer une levée de fonds ?",
        answer:
          "Oui, c'est l'une des missions les plus fréquentes. Le DAF externalisé prépare le business plan, la modélisation financière, le pitch deck financier et la data room. Il accompagne les négociations avec les investisseurs et pilote la due diligence. Chez Iter Advisors, nos clients ont levé plus de 100 M EUR.",
      },
      {
        question: "Quels logiciels et outils de gestion financière utilisez-vous ?",
        answer:
          "Nos DAF externalisés s'adaptent à votre écosystème technologique. Nous maîtrisons les meilleurs outils SaaS du marché pour moderniser votre fonction finance : logiciels de gestion de trésorerie (Agicap, Kyriba), outils de pré-comptabilité et facturation (Pennylane, Qonto, Spendesk), ainsi que des ERP ou solutions de Business Intelligence (PowerBI) pour l'automatisation de vos reportings.",
      },
      {
        question: "Quelle est la différence entre un DAF externalisé et un expert-comptable ?",
        answer:
          "Leurs rôles sont complémentaires mais fondamentalement différents. L'expert-comptable est tourné vers le passé et la conformité : il saisit vos factures, produit votre bilan annuel et gère vos obligations fiscales ou sociales. Le DAF externalisé est tourné vers l'avenir et la stratégie : il analyse les données, construit des prévisionnels de trésorerie, crée des tableaux de bord (KPIs) et vous conseille sur vos choix d'investissement. Le DAF est votre co-pilote, qui fait le pont entre vos ambitions stratégiques et la réalité de vos chiffres.",
      },
      {
        question: "Combien de temps dure une mission de DAF externalisé ?",
        answer:
          "La durée varie selon les besoins : de 3 mois pour une mission ponctuelle (levée de fonds, restructuration) à plusieurs années pour un accompagnement à temps partagé. Chez Iter Advisors, la durée moyenne de collaboration est de 18 mois, sans engagement de durée minimum.",
      },
      {
        question: "Le DAF externalisé est-il adapté aux startups early-stage ?",
        answer:
          "Oui, c'est même l'un des cas d'usage les plus pertinents. Une startup pre-seed ou seed n'a pas les moyens de recruter un DAF à 120 K EUR/an, mais elle a besoin d'un prévisionnel solide, d'un suivi de trésorerie et d'un interlocuteur crédible pour les investisseurs. Le DAF externalisé à 2-3 jours/mois est la solution idéale.",
      },
      {
        question: "Quelle est la différence entre un DAF externalisé et un manager de transition ?",
        answer:
          "Le manager de transition intervient à temps plein sur une durée limitée (3-12 mois) pour gérer une situation exceptionnelle (vacance de poste, crise, restructuration). Le DAF externalisé intervient à temps partagé sur une durée plus longue. Le premier remplace, le second complète.",
      },
      {
        question: "Comment choisir son cabinet de DAF externalisé ?",
        answer:
          "Vérifiez l'expérience sectorielle, la séniorité des profils (10+ ans minimum), les résultats chiffrés chez d'autres clients, les outils maîtrisés, et la structure du cabinet (un indépendant seul est un risque de continuité). Demandez des références vérifiables.",
      },
      {
        question: "Où vos directeurs financiers interviennent-ils ?",
        answer:
          "Les experts d'Iter Advisors accompagnent des startups et PME partout en France. Nous pouvons intervenir physiquement dans vos locaux (notamment à Paris et en Île-de-France, ainsi qu'à Barcelone et Toulouse depuis nos autres bureaux) pour des réunions de pilotage avec les dirigeants, ou travailler 100 % à distance (en remote), en nous intégrant à vos canaux de communication internes (Slack, Teams, Google Workspace).",
      },
    ],
    ctaButton: "Échanger avec un DAF (appel offert)",
  },
  en: {
    meta: {
      title: "Fractional CFO: Missions, Pricing & Benefits for SMEs & Startups | Iter Advisors",
      description:
        "Everything about Fractional CFO services: missions, pricing (daily rate EUR 750-1,250), benefits and case studies. Iter Advisors, your outsourced CFO firm in Barcelona, Paris and Toulouse.",
    },
    breadcrumbLabel: "Fractional CFO",
    h1: "Fractional CFO: the complete guide for SMEs and startups",
    intro: [
      "A Fractional CFO - or outsourced Chief Financial Officer - is a senior finance professional who works within your company without being a full-time employee. They assume the same responsibilities as an in-house CFO (financial management, cash flow, reporting, investor relations) but on a flexible basis: part-time, project-based or monthly retainer.",
      "At Iter Advisors, we support SMEs, startups and scale-ups in structuring and managing their finance function. Our CFOs work on a part-time or project basis to help you make the best strategic decisions.",
    ],
    partnerSection: {
      heading: "Iter Advisors, your strategic partner",
      content: [
        "Iter Advisors is a Fractional CFO firm based in Barcelona, Paris and Toulouse. We provide our clients with experienced finance directors (10+ years of experience) capable of addressing all the financial challenges of a growing company.",
        "Our approach is built on three fundamental pillars: technical expertise, strategic vision and flexibility. Each engagement is tailored to meet the specific challenges of your business.",
        "With over 85 companies supported and more than EUR 100 million in fundraising completed by our clients, Iter Advisors has established itself as a leading player in outsourced CFO services in France and Spain.",
      ],
    },
    whatIs: {
      heading: "What is a Fractional CFO?",
      content: [
        "A Fractional CFO, or outsourced Chief Financial Officer, is a finance professional who works within your company without being a full-time employee. They assume the same responsibilities as an in-house CFO: financial management, cash flow, reporting, strategic support and investor relations.",
      ],
      subsections: [
        {
          heading: "Definition and key role",
          content: [
            "The Fractional CFO manages your company's finance department on a part-time or project basis. Their role is to structure, manage and optimize the finance function to support business growth.",
            "They address key areas: business plan development, cash flow forecasting, implementation of management tools, fundraising preparation, and optimization of accounting and financial processes.",
          ],
        },
        {
          heading: "Difference between CFO, Finance Director and Controller",
          content: [
            "The CFO (Chief Financial Officer) carries both strategic and operational financial responsibilities. A Finance Director typically focuses on day-to-day financial operations, while a Financial Controller concentrates on accounting accuracy and compliance.",
            "At Iter Advisors, our professionals combine these different skills to provide comprehensive support adapted to the specific needs of your organization.",
          ],
        },
        {
          heading: "Fractional CFO vs in-house CFO: the comparison",
          content: [
            "An in-house CFO costs between EUR 80,000 and 150,000 gross per year (plus 25-42% employer charges), totaling EUR 100,000 to 213,000 per year. A Fractional CFO costs EUR 2,000 to 8,000 per month depending on the scope, or EUR 24,000 to 96,000 per year.",
            "An in-house CFO offers daily presence and deep company knowledge, but involves long-term commitment and high fixed costs. A Fractional CFO brings flexibility, multi-sector perspective and an extensive partner network, with no long-term commitment.",
            "For companies with EUR 1-50M in revenue, a Fractional CFO is often the most relevant solution: high-level expertise at a controlled cost, with the ability to scale up or down according to growth phases.",
          ],
        },
      ],
    },
    advantages: {
      heading: "The 5 key advantages of a Fractional CFO",
      content: [
        "Hiring a Fractional CFO offers many advantages for growing companies:",
      ],
      subsections: [
        {
          heading: "Significant cost reduction (up to -60%)",
          content: [
            "The cost of a Fractional CFO is significantly lower than an in-house CFO. You only pay for time actually spent on your company, without social charges or benefits. A Fractional CFO at 3 days/month costs around EUR 3,000, compared to EUR 8,000-17,000/month for a salaried CFO (including charges).",
          ],
        },
        {
          heading: "Flexibility and adaptability",
          content: [
            "The Fractional CFO adapts to your real needs. Whether you need a one-off intervention for fundraising or regular part-time support, the scope is adjustable. No long-term commitment, no notice period.",
          ],
        },
        {
          heading: "Multi-sector expertise and external perspective",
          content: [
            "Our Fractional CFOs work across many companies and sectors (SaaS, e-commerce, manufacturing, services). This diversity gives them a valuable external perspective and the ability to quickly identify levers for improving your financial performance.",
          ],
        },
        {
          heading: "Access to a network of experts",
          content: [
            "By working with Iter Advisors, you gain access to a vast network of partners: investors (VCs, business angels), bankers, business lawyers, accountants and specialized consultants. This network is a major asset for accelerating your development.",
          ],
        },
        {
          heading: "Operational from day one",
          content: [
            "Unlike an internal hire that requires 3-6 months of onboarding, a Fractional CFO is operational immediately. Our CFOs know the tools, processes and challenges of growing companies. They deliver tangible results from the first weeks.",
          ],
        },
      ],
    },
    missions: {
      heading: "Key missions of a Fractional CFO",
      content: [
        "The Fractional CFO covers a wide range of financial and strategic missions:",
        "Financial management and reporting: dashboards, financial KPI monitoring, monthly reporting to executives and investors, budget forecasting.",
        "Cash management: 12-month rolling cash flow forecasting, working capital optimization, banking relationship management, short-term financing.",
        "Fundraising: investment dossier preparation (financial pitch deck, data room), financial modeling, negotiation support with investors, financial due diligence.",
        "Process structuring: analytical accounting, financial process automation, selection and deployment of appropriate tools (ERP, BI, treasury).",
        "Strategic support: pricing advice, profitability analysis by product/client, strategic decision-making support, M&A preparation.",
      ],
    },
    pricing: {
      heading: "How much does a Fractional CFO cost? 2026 pricing guide",
      content: [
        "The average daily rate for a Fractional CFO ranges from EUR 750 to 1,250 excl. VAT, depending on seniority and mission complexity. At Iter Advisors, we offer three packages tailored to SME and startup needs.",
        "Essential package (2-3 days/month): from EUR 2,000 excl. VAT/month. Ideal for early-stage startups needing cash flow monitoring, monthly reporting and a financial point of contact for investors.",
        "Growth package (4-6 days/month): from EUR 4,000 excl. VAT/month. For structuring SMEs requiring comprehensive financial management, tool implementation and regular strategic support.",
        "Premium package (8+ days/month): from EUR 7,000 excl. VAT/month. For scale-ups and companies in fundraising or M&A phase, with a CFO quasi-integrated into the leadership team.",
        "For comparison, a full-time salaried CFO costs EUR 100,000-213,000 per year (salary + charges), or EUR 8,300-17,750/month. A Fractional CFO saves 50-70% depending on the package.",
      ],
    },
    whenToHire: {
      heading: "When should you hire a Fractional CFO?",
      content: [
        "Several situations justify hiring a Fractional CFO. Here are the most common triggers:",
        "You are preparing a fundraise: you need a solid business plan, rigorous financial modeling and a credible financial spokesperson for investors.",
        "Your growth is accelerating: revenue exceeds EUR 500K and DIY financial management is no longer sufficient. You need structured reporting, optimized cash flow and profitability monitoring.",
        "You are hiring rapidly: payroll costs are surging and you need to financially plan each hire to avoid cash flow tensions.",
        "Your in-house CFO has left: rather than rushing a recruitment (6-month process), a Fractional CFO ensures immediate continuity.",
        "You are preparing an M&A transaction: sale, acquisition or merger, you need an expert for due diligence, valuation and negotiations.",
        "You are expanding internationally: setting up in Spain, France or a new market, you need a CFO who understands both tax and regulatory environments.",
      ],
    },
    profiles: {
      heading: "Which Fractional CFO profile for which needs?",
      content: [
        "The Fractional CFO is not a one-size-fits-all profile. Depending on your stage and challenges, the ideal profile varies:",
        "Operational CFO: for companies that need to structure their accounting, implement an ERP and improve reporting reliability. Typical profile: 8-12 years of experience, expertise in processes and tools.",
        "Strategic CFO: for growth-stage companies that need profitability management, fundraising preparation and COMEX support. Typical profile: 15+ years of experience, previous finance leadership in scale-ups or mid-caps.",
        "Transition CFO: for urgent situations (CFO departure, cash crisis, restructuring). Intensive intervention over 3-6 months to stabilize the situation. Typical profile: 20+ years of experience, comfortable in complex environments.",
        "At Iter Advisors, all our CFOs have a minimum of 10 years of finance leadership experience and are selected for their ability to integrate quickly into demanding environments.",
      ],
    },
    tools: {
      heading: "The modern Fractional CFO's toolkit",
      content: [
        "A high-performing Fractional CFO relies on a modern tool stack to automate repetitive tasks and focus on analysis and strategy:",
        "Accounting and invoicing: Pennylane, Sage, QuickBooks, Xero. These tools enable real-time accounting and seamless collaboration with the accountant.",
        "Cash flow and forecasting: Agicap, Fygr, Cashflow. For daily cash monitoring and 12-month rolling forecasts.",
        "Reporting and BI: Power BI, Looker, Metabase, advanced Google Sheets. For automated dashboards and profitability analysis.",
        "ERP and management: Odoo, NetSuite, SAP Business One. For companies that need to integrate finance with operations (purchasing, inventory, production).",
        "At Iter Advisors, we work with over 30 technology partners and help our clients choose and deploy the tools best suited to their size and sector.",
      ],
    },
    whyChoose: {
      heading: "Why choose Iter Advisors as your Fractional CFO firm?",
      content: [
        "Iter Advisors stands out for the quality of its teams and the depth of its support. Our 15 employees, all experts in the finance function, work with rigor and commitment for each client.",
        "Our presence in Barcelona, Paris and Toulouse allows us to support international companies and understand the specificities of each market. We work with over 30 technology partners to guarantee modern and efficient financial management.",
        "Client satisfaction is our priority: we have a 5/5 rating on Trustfolio with 31 verified reviews. This excellence translates into lasting relationships and tangible results for the companies we support.",
      ],
    },
    faq: [
      {
        question: "How much does a Fractional CFO cost?",
        answer:
          "The daily rate for a Fractional CFO ranges from EUR 750 to 1,250 excl. VAT. At Iter Advisors, our packages range from EUR 2,000/month (2-3 days) to EUR 7,000+/month (8+ days). For comparison, a salaried CFO costs EUR 8,300-17,750/month including charges.",
      },
      {
        question: "What is the difference between a Fractional CFO and a part-time CFO?",
        answer:
          "A Fractional CFO is a broad term covering all forms of external financial leadership. A part-time CFO is a specific form: they work on a recurring basis, usually a few days per week or month, over a longer period.",
      },
      {
        question: "When does a company need a Fractional CFO?",
        answer:
          "Key triggers include: rapid growth requiring financial structuring, fundraising preparation, need for rigorous investor reporting, departure of the in-house CFO, or the desire to optimize financial management without hiring full-time.",
      },
      {
        question: "How does the collaboration with an Iter Advisors CFO work?",
        answer:
          "It starts with an in-depth diagnosis of your financial situation (1-2 weeks). We define the scope, frequency and objectives together. Our CFO then integrates into your team and works closely with your internal teams, accountant and investors.",
      },
      {
        question: "Can a Fractional CFO manage a fundraise?",
        answer:
          "Yes, it is one of the most common missions. The Fractional CFO prepares the business plan, financial model, pitch deck and data room. They support investor negotiations and manage financial due diligence. At Iter Advisors, our clients have raised over EUR 100M.",
      },
      {
        question: "What tools does a Fractional CFO use?",
        answer:
          "Key tools include: Pennylane or Sage for accounting, Agicap or Fygr for cash flow, Power BI or Looker for reporting, and Odoo or NetSuite for ERP. At Iter Advisors, we work with over 30 technology partners.",
      },
      {
        question: "Fractional CFO vs accountant: what is the difference?",
        answer:
          "The accountant ensures legal compliance (balance sheet, tax returns, filings). The Fractional CFO drives financial performance: forecasting, management reporting, fundraising, strategy. They are complementary: the accountant looks at the past, the CFO anticipates the future.",
      },
      {
        question: "How long does a Fractional CFO engagement last?",
        answer:
          "Duration varies: from 3 months for a one-off mission (fundraising, restructuring) to several years for part-time support. At Iter Advisors, the average collaboration lasts 18 months, with no minimum commitment.",
      },
      {
        question: "Is a Fractional CFO suitable for early-stage startups?",
        answer:
          "Yes, it is one of the most relevant use cases. A pre-seed or seed startup cannot afford a EUR 120K/year CFO, but needs solid forecasting, cash flow monitoring and a credible financial spokesperson for investors. A Fractional CFO at 2-3 days/month is the ideal solution.",
      },
      {
        question: "What is the difference between a Fractional CFO and an interim manager?",
        answer:
          "An interim manager works full-time for a limited period (3-12 months) to handle an exceptional situation (vacancy, crisis, restructuring). A Fractional CFO works part-time over a longer period. The former replaces, the latter complements.",
      },
      {
        question: "How to choose a Fractional CFO firm?",
        answer:
          "Check sector experience, profile seniority (10+ years minimum), documented results with other clients, tools expertise, and firm structure (a solo freelancer is a continuity risk). Ask for verifiable references.",
      },
      {
        question: "Can a Fractional CFO work remotely?",
        answer:
          "Yes, most engagements are hybrid: on-site 1-2 days per month and remote the rest of the time. Collaboration tools (Slack, Notion, Google Workspace) enable real-time monitoring. At Iter Advisors, we operate in Barcelona, Paris, Toulouse and fully remote.",
      },
    ],
    ctaButton: "Book a call",
  },
  es: {
    meta: {
      title: "CFO externalizado: misiones, tarifas y ventajas para pymes y startups | Iter Advisors",
      description:
        "Todo sobre el CFO externalizado: misiones, tarifas (TJM 750-1.250 EUR), ventajas y casos concretos. Iter Advisors, su gabinete de CFO a tiempo compartido en Barcelona, Paris y Toulouse.",
    },
    breadcrumbLabel: "CFO Externalizado",
    h1: "CFO externalizado: la guia completa para pymes y startups",
    intro: [
      "Un CFO externalizado - o Director Financiero externalizado - es un profesional senior de las finanzas que interviene en su empresa sin ser empleado a tiempo completo. Asume las mismas responsabilidades que un CFO interno (gestion financiera, tesoreria, reporting, relaciones con inversores) pero de forma flexible: tiempo compartido, mision puntual o suscripcion mensual.",
      "En Iter Advisors, acompanamos a pymes, startups y scale-ups en la estructuracion y gestion de su funcion financiera. Nuestros CFOs intervienen a tiempo compartido o en mision puntual para ayudarle a tomar las mejores decisiones estrategicas.",
    ],
    partnerSection: {
      heading: "Iter Advisors, su socio estrategico",
      content: [
        "Iter Advisors es un gabinete de CFO externalizado con presencia en Barcelona, Paris y Toulouse. Ponemos a disposicion de nuestros clientes directores financieros experimentados (10+ anos de experiencia), capaces de intervenir en todas las problematicas financieras de una empresa en crecimiento.",
        "Nuestro enfoque se basa en tres pilares fundamentales: la experiencia tecnica, la vision estrategica y la flexibilidad de intervencion. Cada mision esta disenada a medida para responder a los retos especificos de su empresa.",
        "Con mas de 85 empresas acompanadas y mas de 100 millones de euros en rondas de financiacion realizadas por nuestros clientes, Iter Advisors se ha posicionado como un actor de referencia en el ambito del CFO externalizado en Francia y Espana.",
      ],
    },
    whatIs: {
      heading: "Que es un CFO externalizado?",
      content: [
        "Un CFO externalizado, o Director Financiero externalizado, es un profesional de las finanzas que interviene en su empresa sin ser empleado a tiempo completo. Asume las mismas responsabilidades que un CFO interno: gestion financiera, tesoreria, reporting, acompanamiento estrategico y relaciones con los inversores.",
      ],
      subsections: [
        {
          heading: "Definicion y rol principal",
          content: [
            "El CFO externalizado asegura la direccion financiera de su empresa a tiempo compartido o en mision puntual. Su rol es estructurar, gestionar y optimizar la funcion financiera para apoyar el crecimiento de la empresa.",
            "Interviene en los temas clave: elaboracion del plan de negocio, construccion del presupuesto de tesoreria, implantacion de herramientas de gestion, preparacion de rondas de financiacion, optimizacion de los procesos contables y financieros.",
          ],
        },
        {
          heading: "Diferencia entre CFO, Director Financiero y Controller",
          content: [
            "El CFO (Chief Financial Officer) es un termino anglosajon que conlleva responsabilidades estrategicas y operativas. El Director Financiero se centra generalmente en las operaciones financieras del dia a dia, mientras que el Controller Financiero se concentra en la exactitud contable y el cumplimiento normativo.",
            "En Iter Advisors, nuestros profesionales combinan estas diferentes competencias para ofrecer un acompanamiento completo adaptado a las necesidades especificas de su organizacion.",
          ],
        },
        {
          heading: "CFO externalizado vs CFO interno: la comparativa",
          content: [
            "Un CFO interno cuesta entre 80.000 y 150.000 EUR brutos anuales (mas cargas patronales del 25-42%), lo que supone un coste total de 100.000 a 213.000 EUR al ano. Un CFO externalizado representa un presupuesto de 2.000 a 8.000 EUR al mes segun el volumen, es decir, 24.000 a 96.000 EUR al ano.",
            "El CFO interno ofrece presencia diaria y conocimiento profundo de la empresa, pero implica compromiso a largo plazo y costes fijos elevados. El CFO externalizado aporta flexibilidad, vision multi-sectorial y una red amplia de socios, sin compromiso de duracion.",
            "Para empresas de 1 a 50 M EUR de facturacion, el CFO externalizado es a menudo la solucion mas pertinente: experiencia de alto nivel a un coste controlado, con la posibilidad de modular la intervencion segun las fases de crecimiento.",
          ],
        },
      ],
    },
    advantages: {
      heading: "Las 5 ventajas clave del CFO externalizado",
      content: [
        "Recurrir a un CFO externalizado presenta numerosas ventajas para las empresas en crecimiento:",
      ],
      subsections: [
        {
          heading: "Reduccion significativa de costes (hasta -60%)",
          content: [
            "El coste de un CFO externalizado es significativamente inferior al de un CFO interno. Solo paga por el tiempo efectivamente dedicado a su empresa, sin cargas sociales ni beneficios salariales. Un CFO externalizado a 3 dias/mes cuesta aproximadamente 3.000 EUR, frente a 8.000-17.000 EUR/mes de un CFO asalariado (cargas incluidas).",
          ],
        },
        {
          heading: "Flexibilidad y adaptabilidad",
          content: [
            "El CFO externalizado se adapta a sus necesidades reales. Ya sea una intervencion puntual para una ronda de financiacion o un acompanamiento regular a tiempo compartido, el volumen es ajustable. Sin compromiso a largo plazo, sin preaviso.",
          ],
        },
        {
          heading: "Experiencia multi-sectorial y vision externa",
          content: [
            "Nuestros CFOs externalizados intervienen en numerosas empresas y sectores (SaaS, e-commerce, industria, servicios). Esta diversidad les confiere una vision externa valiosa y la capacidad de identificar rapidamente las palancas de mejora de su rendimiento financiero.",
          ],
        },
        {
          heading: "Acceso a una red de expertos",
          content: [
            "Al recurrir a Iter Advisors, accede a una amplia red de socios: inversores (VCs, business angels), banqueros, abogados de negocios, contables y consultores especializados. Esta red constituye un activo fundamental para acelerar su desarrollo.",
          ],
        },
        {
          heading: "Operativo desde el primer dia",
          content: [
            "A diferencia de una contratacion interna que requiere 3-6 meses de onboarding, el CFO externalizado es operativo inmediatamente. Nuestros CFOs conocen las herramientas, los procesos y las problematicas de las empresas en crecimiento. Aportan resultados concretos desde las primeras semanas.",
          ],
        },
      ],
    },
    missions: {
      heading: "Las misiones principales de un CFO externalizado",
      content: [
        "El CFO externalizado interviene en un amplio espectro de misiones financieras y estrategicas:",
        "Gestion financiera y reporting: implantacion de cuadros de mando, seguimiento de KPIs financieros, reporting mensual a directivos e inversores, presupuesto previsional.",
        "Gestion de tesoreria: elaboracion del presupuesto de tesoreria a 12 meses, optimizacion del fondo de maniobra, gestion de las relaciones bancarias, financiacion a corto plazo.",
        "Rondas de financiacion: preparacion del dossier de inversion (pitch deck financiero, data room), modelizacion financiera, acompanamiento en las negociaciones con los inversores, due diligence financiera.",
        "Estructuracion de procesos: implantacion de la contabilidad analitica, automatizacion de procesos financieros, seleccion y despliegue de herramientas adaptadas (ERP, BI, tesoreria).",
        "Acompanamiento estrategico: asesoramiento en pricing, analisis de rentabilidad por producto/cliente, apoyo a la toma de decisiones estrategicas, preparacion de operaciones de M&A.",
      ],
    },
    pricing: {
      heading: "Cuanto cuesta un CFO externalizado? Guia de tarifas 2026",
      content: [
        "La tarifa diaria media de un CFO externalizado se situa entre 750 y 1.250 EUR sin IVA, segun el nivel de senioridad y la complejidad de las misiones. En Iter Advisors, ofrecemos tres formulas adaptadas a las necesidades de pymes y startups.",
        "Formula Esencial (2-3 dias/mes): desde 2.000 EUR sin IVA/mes. Ideal para startups early-stage que necesitan seguimiento de tesoreria, reporting mensual y un interlocutor financiero para los inversores.",
        "Formula Crecimiento (4-6 dias/mes): desde 4.000 EUR sin IVA/mes. Para pymes en estructuracion que necesitan gestion financiera completa, implantacion de herramientas y acompanamiento estrategico regular.",
        "Formula Premium (8+ dias/mes): desde 7.000 EUR sin IVA/mes. Para scale-ups y empresas en fase de ronda de financiacion o M&A, con un CFO casi integrado en el equipo directivo.",
        "A modo de comparacion, un CFO asalariado a tiempo completo cuesta entre 100.000 y 213.000 EUR al ano (salario + cargas), es decir, 8.300 a 17.750 EUR al mes. El CFO externalizado permite un ahorro del 50 al 70% segun la formula elegida.",
      ],
    },
    whenToHire: {
      heading: "Cuando recurrir a un CFO externalizado?",
      content: [
        "Varias situaciones justifican recurrir a un CFO externalizado. Estas son las senales mas frecuentes:",
        "Esta preparando una ronda de financiacion: necesita un plan de negocio solido, una modelizacion financiera rigurosa y un interlocutor credible ante los inversores.",
        "Su crecimiento se acelera: la facturacion supera los 500 K EUR y la gestion financiera artesanal ya no es suficiente. Hay que estructurar el reporting, optimizar la tesoreria y pilotar la rentabilidad.",
        "Esta contratando masivamente: los costes de personal se disparan y debe anticipar financieramente cada contratacion para evitar tensiones de tesoreria.",
        "Su CFO interno se ha ido: en lugar de reclutar con urgencia (proceso de 6 meses), un CFO externalizado asegura la continuidad inmediata.",
        "Esta preparando una operacion de M&A: venta, adquisicion o fusion, necesita un experto para la due diligence, la valoracion y las negociaciones.",
        "Se esta internacionalizando: implantacion en Espana, Francia o un nuevo mercado, necesita un CFO que conozca ambos entornos fiscales y regulatorios.",
      ],
    },
    profiles: {
      heading: "Que perfiles de CFO externalizado para que necesidades?",
      content: [
        "El CFO externalizado no es un perfil unico. Segun su etapa de desarrollo y sus retos, el perfil ideal varia:",
        "CFO operativo: para empresas que necesitan estructurar su contabilidad, implantar un ERP y fiabilizar el reporting. Perfil tipico: 8-12 anos de experiencia, expertise en procesos y herramientas.",
        "CFO estrategico: para empresas en fase de crecimiento que necesitan pilotar la rentabilidad, preparar rondas de financiacion y acompanar las decisiones del COMEX. Perfil tipico: 15+ anos de experiencia, paso por direccion financiera de scale-up o ETI.",
        "CFO de transicion: para situaciones de urgencia (salida del CFO, crisis de tesoreria, reestructuracion). Intervencion intensiva durante 3-6 meses para estabilizar la situacion. Perfil tipico: 20+ anos de experiencia, acostumbrado a entornos complejos.",
        "En Iter Advisors, todos nuestros CFOs tienen un minimo de 10 anos de experiencia en direccion financiera y son seleccionados por su capacidad de integrarse rapidamente en entornos exigentes.",
      ],
    },
    tools: {
      heading: "Las herramientas del CFO externalizado moderno",
      content: [
        "Un CFO externalizado de alto rendimiento se apoya en una stack de herramientas modernas para automatizar las tareas repetitivas y concentrarse en el analisis y la estrategia:",
        "Contabilidad y facturacion: Pennylane, Sage, QuickBooks, Xero. Estas herramientas permiten una contabilidad en tiempo real y una colaboracion fluida con el contable.",
        "Tesoreria y previsional: Agicap, Fygr, Cashflow. Para un seguimiento diario de la tesoreria y previsionales a 12 meses.",
        "Reporting y BI: Power BI, Looker, Metabase, Google Sheets avanzado. Para construir cuadros de mando automatizados y analisis de rentabilidad.",
        "ERP y gestion: Odoo, NetSuite, SAP Business One. Para empresas que necesitan integrar las finanzas con las operaciones (compras, inventario, produccion).",
        "En Iter Advisors, trabajamos con mas de 30 socios tecnologicos y ayudamos a nuestros clientes a elegir y desplegar las herramientas mas adaptadas a su tamano y sector.",
      ],
    },
    whyChoose: {
      heading: "Por que elegir Iter Advisors como su gabinete de CFO externalizado?",
      content: [
        "Iter Advisors se distingue por la calidad de sus equipos y la profundidad de su acompanamiento. Nuestros 15 colaboradores, todos expertos en la funcion financiera, intervienen con rigor y compromiso junto a cada cliente.",
        "Nuestra presencia en Barcelona, Paris y Toulouse nos permite acompanar a empresas internacionales y comprender las especificidades de cada mercado. Trabajamos con mas de 30 socios tecnologicos para garantizar una gestion financiera moderna y eficiente.",
        "La satisfaccion de nuestros clientes es nuestra prioridad: contamos con una nota de 5/5 en Trustfolio, con 31 opiniones verificadas. Esta excelencia se traduce en relaciones duraderas y resultados concretos para las empresas que acompanamos.",
      ],
    },
    faq: [
      {
        question: "Cuanto cuesta un CFO externalizado?",
        answer:
          "La tarifa diaria de un CFO externalizado se situa entre 750 y 1.250 EUR sin IVA. En Iter Advisors, nuestras formulas van de 2.000 EUR/mes (2-3 dias) a 7.000+ EUR/mes (8+ dias). A modo de comparacion, un CFO asalariado cuesta 8.300-17.750 EUR/mes cargas incluidas.",
      },
      {
        question: "Cual es la diferencia entre un CFO externalizado y un CFO a tiempo compartido?",
        answer:
          "El CFO externalizado es un termino generico que engloba todas las formas de intervencion externa en direccion financiera. El CFO a tiempo compartido es una forma especifica: interviene de manera recurrente, generalmente algunos dias a la semana o al mes, durante un periodo mas largo.",
      },
      {
        question: "En que momento una empresa necesita un CFO externalizado?",
        answer:
          "Varias senales lo indican: crecimiento rapido que requiere estructuracion financiera, ronda de financiacion por preparar, necesidad de reporting riguroso para los inversores, salida del CFO interno, o simplemente el deseo de optimizar la gestion financiera sin contratar a tiempo completo.",
      },
      {
        question: "Como funciona la colaboracion con un CFO de Iter Advisors?",
        answer:
          "La colaboracion comienza con un diagnostico profundo de su situacion financiera (1-2 semanas). Definimos juntos el perimetro, la frecuencia y los objetivos. Nuestro CFO se integra entonces en su equipo y trabaja en estrecha colaboracion con sus equipos internos, su contable y sus inversores.",
      },
      {
        question: "Un CFO externalizado puede gestionar una ronda de financiacion?",
        answer:
          "Si, es una de las misiones mas frecuentes. El CFO externalizado prepara el plan de negocio, la modelizacion financiera, el pitch deck y la data room. Acompana las negociaciones con los inversores y pilota la due diligence. En Iter Advisors, nuestros clientes han levantado mas de 100 M EUR.",
      },
      {
        question: "Que herramientas utiliza un CFO externalizado?",
        answer:
          "Las principales herramientas son: Pennylane o Sage para la contabilidad, Agicap o Fygr para la tesoreria, Power BI o Looker para el reporting, y Odoo o NetSuite para el ERP. En Iter Advisors, trabajamos con mas de 30 socios tecnologicos.",
      },
      {
        question: "CFO externalizado o contable: cual es la diferencia?",
        answer:
          "El contable asegura el cumplimiento legal (balance, declaraciones fiscales). El CFO externalizado pilota el rendimiento financiero: previsional, reporting de gestion, rondas de financiacion, estrategia. Son complementarios: el contable mira el pasado, el CFO anticipa el futuro.",
      },
      {
        question: "Cuanto dura una mision de CFO externalizado?",
        answer:
          "La duracion varia segun las necesidades: de 3 meses para una mision puntual (ronda de financiacion, reestructuracion) a varios anos para un acompanamiento a tiempo compartido. En Iter Advisors, la duracion media de colaboracion es de 18 meses, sin compromiso de duracion minima.",
      },
      {
        question: "El CFO externalizado es adecuado para startups early-stage?",
        answer:
          "Si, es uno de los casos de uso mas pertinentes. Una startup pre-seed o seed no puede permitirse un CFO a 120 K EUR/ano, pero necesita un previsional solido, seguimiento de tesoreria y un interlocutor credible para los inversores. El CFO externalizado a 2-3 dias/mes es la solucion ideal.",
      },
      {
        question: "Cual es la diferencia entre un CFO externalizado y un manager de transicion?",
        answer:
          "El manager de transicion interviene a tiempo completo durante un periodo limitado (3-12 meses) para gestionar una situacion excepcional (vacante, crisis, reestructuracion). El CFO externalizado interviene a tiempo compartido durante un periodo mas largo. El primero reemplaza, el segundo complementa.",
      },
      {
        question: "Como elegir su gabinete de CFO externalizado?",
        answer:
          "Verifique la experiencia sectorial, la senioridad de los perfiles (10+ anos minimo), los resultados documentados con otros clientes, las herramientas dominadas y la estructura del gabinete (un freelance solo es un riesgo de continuidad). Pida referencias verificables.",
      },
      {
        question: "El CFO externalizado puede intervenir a distancia?",
        answer:
          "Si, la mayoria de las misiones se desarrollan en modo hibrido: presencia en sitio 1-2 dias al mes y trabajo remoto el resto del tiempo. Las herramientas colaborativas (Slack, Notion, Google Workspace) permiten un seguimiento en tiempo real. En Iter Advisors, intervenimos en Barcelona, Paris, Toulouse y en full remote.",
      },
    ],
    ctaButton: "Concierte una cita",
  },
};

export function getDafContent(locale: Locale) {
  return dafContent[locale];
}
