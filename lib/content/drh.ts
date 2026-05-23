import { Locale } from "../i18n";

export interface DrhFaqItem {
  question: string;
  answer: string;
}

export interface DrhSection {
  heading: string;
  content: string[];
}

export interface DrhAdvantage {
  title: string;
  text: string;
}

export interface DrhTableData {
  headers: string[];
  rows: string[][];
}

export interface DrhTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  city: string;
  formula?: string;
}

export interface DrhContent {
  meta: {
    title: string;
    description: string;
  };
  breadcrumbLabel: string;
  h1: string;
  intro: string[];
  partnerSection: DrhSection;
  whatIs: DrhSection;
  advantages: {
    heading: string;
    items: DrhAdvantage[];
  };
  forWho: {
    heading: string;
    table: DrhTableData;
  };
  servicesGridHeading: string;
  tierLabels: [string, string, string, string];
  addOnLabel: string;
  pricing: {
    heading: string;
    table: DrhTableData;
    footnote: string;
    comparison: string;
    engagement: string;
    closingText?: string;
  };
  vsInternal: {
    heading: string;
    table: DrhTableData;
    closingText?: string;
  };
  testimonials: {
    heading: string;
    items: DrhTestimonial[];
    ctaText?: string;
    ctaHref?: string;
  };
  faq: DrhFaqItem[];
  ctaButton: string;
}

export const drhContent: Record<Locale, DrhContent> = {
  fr: {
    meta: {
      // R4 (2026-05-17) — 70c, keyword principal + variante "direction RH à temps partagé", cibles PME & Startup, brand
      title: "DRH externalisé — Direction RH temps partagé | Iter Advisors",
      description:
        "Cabinet de conseil en ressources humaines : DRH externalisé, DRH à temps partagé. Structuration, recrutement, paie, conformité et culture. Iter Advisors.",
    },
    breadcrumbLabel: "DRH Externalisé",
    h1: "DRH externalisé : une direction RH flexible et experte",
    intro: [
      "Pour les PME et startups en croissance, la fonction RH est un levier stratégique. Le DRH externalisé vous apporte l'expertise et la structuration nécessaires sans le coût d'un poste à temps plein.",
      "Iter Advisors accompagne vos enjeux RH : audit et diagnostic, recrutement, onboarding, rémunération, développement des talents, relations sociales et digitalisation de la fonction RH.",
    ],
    partnerSection: {
      heading: "Votre partenaire RH stratégique",
      content: [
        "Notre offre DRH externalisé couvre l'ensemble des besoins d'une direction des ressources humaines : de l'audit initial à la gestion des relations sociales, en passant par le recrutement, la paie, la formation et la culture d'entreprise.",
        // R5-link-1: [[DRH à temps partagé|/drh-externalise/temps-partage]]
        "Nous nous adaptons à votre maturité RH et à votre budget, avec des formules modulables ([[DRH à temps partagé|/drh-externalise/temps-partage]], missions ponctuelles, add-ons) et une grille de services claire pour composer l'accompagnement dont vous avez besoin.",
      ],
    },
    whatIs: {
      heading: "Qu'est-ce qu'un DRH externalisé ?",
      content: [
        "Le DRH externalisé (ou directeur des ressources humaines externalisé) intervient au sein de votre entreprise sans en être salarié. Il assume les mêmes responsabilités qu'un DRH interne : stratégie RH, recrutement, gestion des talents, conformité sociale, relations avec les instances représentatives et pilotage de la fonction RH.",
        // R5-link-2: [[accompagnement levée de fonds|/services/accompagnement-levee-de-fond]]
        "Cette solution s'adresse aux entreprises qui ont besoin d'une expertise RH de haut niveau sans recruter à temps plein. Le DRH externalisé peut intervenir à temps partagé (quelques jours par semaine ou par mois) ou sur des missions ponctuelles (audit, due diligence RH, [[accompagnement levée de fonds|/services/accompagnement-levee-de-fond]], etc.).",
      ],
    },
    // R1.1 — Section "5 avantages clés du DRH externalisé"
    advantages: {
      heading: "Les 5 avantages clés du DRH externalisé",
      items: [
        {
          title: "Réduction des coûts (jusqu'à -60 %)",
          text: "Un DRH salarié à plein temps coûte entre 65 000 et 120 000 € brut annuel, soit 80 000 à 150 000 € chargé. Un DRH externalisé Iter Advisors démarre à 2 500 €/mois pour 2 jours — une réduction de 50 à 70 %.",
        },
        {
          title: "Flexibilité sans engagement",
          text: "Le volume d'intervention s'ajuste chaque mois : 2 jours pour un audit, 8 jours pour un recrutement de masse, 4 jours en régime de croisière. Pas de CDI, pas de préavis, pas de charges sociales.",
        },
        {
          // R5-link-3: [[85 entreprises accompagnées|/ressources/cas-clients]]
          title: "Expertise multi-sectorielle",
          text: "Forts de [[85 entreprises accompagnées|/ressources/cas-clients]], nos DRH externalisés interviennent dans 5 secteurs (SaaS, Deep-Tech, e-Commerce, Industrie, Services) et appliquent les meilleures pratiques cross-sectorielles à votre organisation.",
        },
        {
          // R5-link-4: [[processus de recrutement structurés|/ressources/blog]]
          title: "Opérationnel dès le premier jour",
          text: "Contrairement à un recrutement interne (3 à 6 mois d'onboarding), le DRH externalisé est productif sous 1 à 2 semaines grâce à des [[processus de recrutement structurés|/ressources/blog]] et des playbooks éprouvés.",
        },
        {
          // R5-link-5: [[outils SIRH|/ressources/outils]]
          title: "Réseau et outils mutualisés",
          text: "Accès à notre écosystème : cabinets de recrutement partenaires, [[outils SIRH|/ressources/outils]] négociés en volume, bases de CV pré-qualifiées, et benchmarks de rémunération par secteur.",
        },
      ],
    },
    // R1.2 — Section "Pour qui et à quel stade ?"
    forWho: {
      heading: "DRH externalisé : pour qui et à quel stade ?",
      table: {
        headers: ["Profil", "Effectif", "Situation", "Besoin RH"],
        rows: [
          [
            "Startup early-stage",
            "5–20",
            "1ère levée de fonds, premiers recrutements",
            "Structurer le processus de recrutement et l'onboarding",
          ],
          [
            "PME en croissance",
            "20–80",
            "Croissance rapide, charges de personnel qui explosent",
            "Pilotage RH mensuel, conformité sociale, grille de rémunération",
          ],
          [
            "Scale-up",
            "80–200",
            "Internationalisation, équipe multi-sites",
            "Harmonisation des pratiques RH, SIRH, culture d'entreprise",
          ],
          [
            "Entreprise en transition",
            "20–200",
            "Départ du DRH interne, fusion, acquisition",
            "Management de transition RH, stabilisation en J+5",
          ],
          [
            "Structure légère",
            "10–50",
            "Pas de DRH interne, gestion RH par le CEO",
            "Toute la fonction RH externalisée, du recrutement à la paie",
          ],
        ],
      },
    },
    servicesGridHeading: "Nos services RH",
    tierLabels: ["Offre 1", "Offre 2", "Offre 3", "Offre 4"],
    addOnLabel: "Add-on",
    // R1.3 — Section "Grille tarifaire"
    pricing: {
      heading: "Quel est le tarif d'un DRH externalisé ? Grille tarifaire 2026",
      table: {
        headers: ["Formule", "Jours/mois", "Périmètre", "Tarif mensuel"],
        rows: [
          [
            "Essentiel",
            "2 jours",
            "Audit RH, recrutement (1–2 postes/mois), conformité sociale de base",
            "2 500 €",
          ],
          [
            "Croissance",
            "4 jours",
            "+ Onboarding structuré, gestion des talents, rémunération & avantages, relations sociales",
            "4 500 €",
          ],
          [
            "Premium",
            "8 jours",
            "+ SIRH & digitalisation, culture d'entreprise, formation, due diligence RH",
            "8 000 €",
          ],
          [
            "Projet",
            "Sur mesure",
            "Audit flash RH, due diligence, accompagnement levée de fonds",
            "3 000–6 000 €",
          ],
        ],
      },
      footnote:
        "Toutes nos formules incluent : accès aux benchmarks de rémunération, outils SIRH, réseau de cabinets de recrutement partenaires, et un senior avec 8+ ans d'expérience RH.",
      comparison:
        "Comparaison : un DRH salarié à plein temps coûte 80 000 à 150 000 € chargé par an, soit 3 à 5 fois plus qu'un DRH externalisé selon la formule.",
      engagement: "Engagement de 6 mois minimum, résiliable avec 2 mois de préavis.",
      // R5-link-6: [[DAF externalisé|/daf-externalise]]
      closingText:
        "Comparez avec le coût d'un [[DAF externalisé|/daf-externalise]] — nos offres finance et RH sont conçues pour se compléter et mutualiser les coûts d'accompagnement.",
    },
    // R1.4 — Section "DRH externalisé vs DRH interne"
    vsInternal: {
      heading: "DRH externalisé vs DRH interne : le comparatif",
      table: {
        headers: ["Critère", "DRH externalisé", "DRH interne"],
        rows: [
          ["Coût annuel", "30 000–96 000 €", "80 000–150 000 € (charges incluses)"],
          ["Engagement", "Sans durée minimum, modulable au mois", "CDI, préavis 3 mois"],
          [
            "Délai de mise en place",
            "Opérationnel sous 1 à 2 semaines",
            "3 à 6 mois (recrutement + onboarding)",
          ],
          ["Expertise sectorielle", "Multi-sectorielle, benchmarks croisés", "Mono-entreprise"],
          [
            "Réseau (recrutement, formation)",
            "Étendu, mutualisé",
            "Limité au parcours individuel",
          ],
          ["Présence", "2 à 8+ jours/mois, hybride", "5 jours/semaine, présentiel"],
        ],
      },
      // R5-link-7: [[expert-comptable|/services/comptabilite-externalisation]]
      closingText:
        "Notre DRH externalisé travaille main dans la main avec votre [[expert-comptable|/services/comptabilite-externalisation]] pour garantir la conformité sociale et fiscale de votre entreprise.",
    },
    // R1.5 — Section "Témoignages RH"
    testimonials: {
      heading: "Ce que nos clients disent de leur DRH externalisé",
      items: [
        {
          quote:
            "Nous passions de 15 à 45 personnes en 8 mois. Notre DRH externalisé Iter Advisors a structuré tout notre processus de recrutement, mis en place un onboarding de qualité, et négocié nos contrats de mutuelle en volume. Sans elle, j'aurais passé 30 % de mon temps sur des sujets RH au lieu de piloter la croissance.",
          author: "Marc D.",
          role: "CEO",
          company: "EdTech",
          city: "Paris",
          formula: "DRH externalisé Croissance, 18 mois",
        },
        {
          quote:
            "Nous avons intégré 3 équipes après une acquisition. Le DRH externalisé a harmonisé les grilles de rémunération, aligné les cultures, et géré toutes les négociations avec les IRP en 6 mois. Un travail remarquable dans un contexte très tendu.",
          author: "Sophie L.",
          role: "DG",
          company: "Industrie",
          city: "Toulouse",
        },
        {
          quote:
            "En préparation de notre Series B, notre DRH externalisé a construit tout le data room RH (organigramme, masse salariale, plan de recrutement) et rassuré nos investisseurs sur la conformité sociale. C'était un point clé de la due diligence.",
          author: "Karim B.",
          role: "CEO",
          company: "HealthTech",
          city: "Barcelone",
        },
      ],
      // R5-link-8: [[nos cas clients détaillés|/ressources/cas-clients]]
      ctaText:
        "Consultez [[nos cas clients détaillés|/ressources/cas-clients]] pour découvrir comment nos DRH ont accompagné des PME et startups en croissance.",
      ctaHref: "/ressources/cas-clients",
    },
    // R2 — FAQ enrichie : 3 → 10 questions
    faq: [
      {
        question:
          "Quelle est la différence entre un DRH externalisé et un DRH à temps partagé ?",
        answer:
          "Le DRH externalisé est un terme générique qui englobe toute intervention externe en direction RH. Le DRH à temps partagé est une formule où le professionnel intervient de manière récurrente dans l'entreprise (par exemple 1 à 3 jours par semaine), sur la durée, pour assurer une continuité et une connaissance approfondie de l'organisation.",
      },
      {
        question: "Quels types de missions peut couvrir un DRH externalisé ?",
        answer:
          "L'offre couvre l'audit RH, le recrutement et le sourcing, l'onboarding et l'offboarding, la rémunération et les avantages sociaux, le développement des talents, les relations sociales, la digitalisation RH (SIRH) et des missions ponctuelles (audit flash, due diligence RH, accompagnement levée de fonds, etc.).",
      },
      {
        question: "Comment est structurée votre grille de services ?",
        answer:
          "Nos services sont organisés en catégories (Audit RH, Recrutement, Onboarding/Offboarding, Rémunération, Développement RH, Organisation & culture, Relations sociales, SIRH, Missions ponctuelles). Chaque service peut être inclus dans l'une de nos offres ou proposé en add-on pour les missions ponctuelles.",
      },
      {
        question:
          "Quelle est la différence entre un DRH externalisé et un expert-comptable en paie ?",
        answer:
          "L'expert-comptable gère la paie, les déclarations sociales et la conformité fiscale. Le DRH externalisé va bien au-delà : il définit la stratégie RH, pilote le recrutement, gère les talents, négocie avec les partenaires sociaux, et accompagne le dirigeant dans les décisions organisationnelles. Les deux sont complémentaires — chez Iter Advisors, nos DRH travaillent main dans la main avec votre cabinet comptable.",
      },
      {
        question: "Combien coûte un DRH externalisé ?",
        answer:
          "Les formules Iter Advisors démarrent à 2 500 €/mois pour 2 jours (Essentiel) et montent à 8 000 €/mois pour 8 jours (Premium). Un DRH salarié à plein temps coûte 80 000 à 150 000 € chargé par an, soit 3 à 5 fois plus cher. Chaque formule inclut l'accès aux benchmarks de rémunération et aux outils SIRH.",
      },
      {
        question: "Quand faut-il faire appel à un DRH externalisé ?",
        answer:
          "Les 5 signaux les plus fréquents : (1) vous recrutez plus de 2 personnes par mois sans process structuré, (2) votre masse salariale dépasse 500 K€ sans DRH interne, (3) vous préparez une levée de fonds (due diligence RH), (4) votre DRH interne est parti et vous ne pouvez pas attendre 6 mois de recrutement, (5) vous vous internationalisez et devez harmoniser les pratiques RH.",
      },
      {
        question: "Le DRH externalisé gère-t-il la paie ?",
        // R5-link-9: [[expert-comptable ou notre partenaire paie|/services/comptabilite-externalisation]]
        answer:
          "Le DRH externalisé supervise et coordonne la paie (vérification des bulletins, contrôle des charges, arbitrage sur les cas complexes) mais ne la traite pas directement. Il travaille avec votre [[expert-comptable ou notre partenaire paie|/services/comptabilite-externalisation]] pour garantir la conformité. Cette séparation des rôles garantit un contrôle qualité sans conflit d'intérêt.",
      },
      {
        question:
          "Quelle est la différence entre un DRH externalisé et un freelance RH ?",
        answer:
          "Un freelance apporte une expertise individuelle. Un cabinet comme Iter Advisors apporte : (1) une équipe de plusieurs experts RH, (2) des playbooks éprouvés par 85+ entreprises, (3) une continuité de service si votre interlocuteur est indisponible, (4) des outils et benchmarks mutualisés, (5) un réseau de partenaires (recrutement, formation, juridique).",
      },
      {
        question: "Comment mesurer le ROI d'un DRH externalisé ?",
        // R5-link-10: [[nos cas clients|/ressources/cas-clients]]
        answer:
          "Nos clients mesurent le ROI sur 4 axes : réduction du time-to-hire (de 45 à 25 jours en moyenne), baisse du turnover (de 15 à 8 % dans les 12 mois), conformité sociale garantie (zéro audit URSSAF négatif), et productivité du fondateur (2 à 5 heures/semaine récupérées sur les sujets RH). Consultez [[nos cas clients|/ressources/cas-clients]] pour des exemples concrets.",
      },
      {
        question: "Où interviennent vos DRH externalisés ?",
        answer:
          "Nos bureaux sont à Barcelone, Paris et Toulouse. Nos DRH interviennent sur site et en distanciel selon vos besoins. Nous avons une expertise particulière sur les sujets transfrontaliers France–Espagne (convention collective, droit local, impatriation).",
      },
    ],
    ctaButton: "Prendre rendez-vous",
  },

  en: {
    meta: {
      title: "Outsourced HR | Fractional HR Director | SME & Startup | Iter Advisors",
      description:
        "HR consulting: outsourced HR, fractional HR director. Structure, recruitment, payroll, compliance and culture. Iter Advisors.",
    },
    breadcrumbLabel: "HR Outsourced",
    h1: "Outsourced HR: flexible, expert people leadership",
    intro: [
      "For growing SMEs and startups, the HR function is a strategic lever. An outsourced HR director brings the expertise and structure you need without the cost of a full-time hire.",
      "Iter Advisors supports your HR needs: audit and diagnosis, recruitment, onboarding, compensation, talent development, employee relations and HR digitalization.",
    ],
    partnerSection: {
      heading: "Your strategic HR partner",
      content: [
        "Our outsourced HR offering covers the full scope of an HR department: from initial audit to employee relations, including recruitment, payroll, training and company culture.",
        "We adapt to your HR maturity and budget, with flexible formats ([[fractional HR|/drh-externalise/temps-partage]], one-off missions, add-ons) and a clear service grid so you can build the support you need.",
      ],
    },
    whatIs: {
      heading: "What is an outsourced HR director?",
      content: [
        "An outsourced HR director (or fractional Chief People Officer) works within your company without being an employee. They assume the same responsibilities as an internal HR director: HR strategy, recruitment, talent management, social compliance, relations with employee representatives and HR function leadership.",
        "This solution is for companies that need high-level HR expertise without a full-time hire. The outsourced HR director can work on a shared-time basis (e.g. a few days per week or month) or on one-off missions (audit, HR due diligence, [[fundraising support|/services/accompagnement-levee-de-fond]], etc.).",
      ],
    },
    advantages: {
      heading: "5 key benefits of outsourcing your HR",
      items: [
        {
          title: "Cost reduction (up to -60%)",
          text: "A full-time HR director costs between €80,000 and €150,000 including charges per year. Iter Advisors' outsourced HR starts at €2,500/month for 2 days — a 50 to 70% reduction.",
        },
        {
          title: "Flexibility with no commitment",
          text: "The volume of work adjusts every month: 2 days for an audit, 8 days for mass recruitment, 4 days in cruising mode. No permanent contract, no notice period, no employer charges.",
        },
        {
          title: "Multi-sector expertise",
          text: "With [[85+ companies supported|/ressources/cas-clients]], our HR directors work across 5 sectors (SaaS, Deep-Tech, e-Commerce, Industry, Services) and bring cross-sector best practices to your organisation.",
        },
        {
          title: "Operational from day one",
          text: "Unlike an internal hire (3 to 6 months of onboarding), the outsourced HR director is productive within 1 to 2 weeks thanks to [[structured recruitment processes|/ressources/blog]] and proven playbooks.",
        },
        {
          title: "Shared network and tools",
          text: "Access to our ecosystem: partner recruitment firms, [[HRIS tools|/ressources/outils]] negotiated in volume, pre-qualified CV pools, and sector-specific compensation benchmarks.",
        },
      ],
    },
    forWho: {
      heading: "Who is an outsourced HR director for?",
      table: {
        headers: ["Profile", "Headcount", "Situation", "HR need"],
        rows: [
          ["Early-stage startup", "5–20", "First fundraise, first hires", "Structure recruitment process and onboarding"],
          ["Growing SME", "20–80", "Fast growth, payroll costs exploding", "Monthly HR management, social compliance, pay grid"],
          ["Scale-up", "80–200", "Internationalisation, multi-site team", "Harmonise HR practices, HRIS, company culture"],
          ["Company in transition", "20–200", "HR director departure, merger, acquisition", "HR transition management, stabilisation from day 1"],
          ["Lean structure", "10–50", "No HR director, CEO handles HR", "Fully outsourced HR function, from recruitment to payroll"],
        ],
      },
    },
    servicesGridHeading: "Our HR services",
    tierLabels: ["Tier 1", "Tier 2", "Tier 3", "Tier 4"],
    addOnLabel: "Add-on",
    pricing: {
      heading: "How much does an outsourced HR director cost? 2026 pricing",
      table: {
        headers: ["Package", "Days/month", "Scope", "Monthly fee"],
        rows: [
          ["Essential", "2 days", "HR audit, recruitment (1–2 roles/month), basic social compliance", "€2,500"],
          ["Growth", "4 days", "+ Structured onboarding, talent management, compensation & benefits, employee relations", "€4,500"],
          ["Premium", "8 days", "+ HRIS & digitalization, company culture, training, HR due diligence", "€8,000"],
          ["Project", "Bespoke", "Flash HR audit, due diligence, fundraising support", "€3,000–6,000"],
        ],
      },
      footnote:
        "All packages include: access to compensation benchmarks, HRIS tools, network of partner recruitment firms, and a senior with 8+ years of HR experience.",
      comparison:
        "Comparison: a full-time in-house HR director costs €80,000 to €150,000 including charges per year — 3 to 5 times more.",
      engagement: "6-month minimum commitment, cancellable with 2 months' notice.",
      closingText:
        "Compare with the cost of an [[outsourced CFO|/daf-externalise]] — our finance and HR packages are designed to complement each other.",
    },
    vsInternal: {
      heading: "Outsourced HR vs in-house HR: the comparison",
      table: {
        headers: ["Criteria", "Outsourced HR", "In-house HR"],
        rows: [
          ["Annual cost", "€30,000–96,000", "€80,000–150,000 (including charges)"],
          ["Commitment", "No minimum term, adjustable monthly", "Permanent contract, 3-month notice"],
          ["Time to operational", "Ready within 1 to 2 weeks", "3 to 6 months (recruitment + onboarding)"],
          ["Sector expertise", "Multi-sector, cross benchmarks", "Single company"],
          ["Network (recruitment, training)", "Extensive, shared", "Limited to individual track record"],
          ["Presence", "2 to 8+ days/month, hybrid", "5 days/week, on-site"],
        ],
      },
      closingText:
        "Our outsourced HR director works hand in hand with your [[accountant|/services/comptabilite-externalisation]] to ensure social and fiscal compliance.",
    },
    testimonials: {
      heading: "What our clients say about their outsourced HR director",
      items: [
        {
          quote:
            "We went from 15 to 45 people in 8 months. Our Iter Advisors HR director structured our entire recruitment process, set up quality onboarding, and negotiated our group insurance contracts in volume. Without her, I would have spent 30% of my time on HR instead of driving growth.",
          author: "Marc D.",
          role: "CEO",
          company: "EdTech",
          city: "Paris",
          formula: "Growth package, 18 months",
        },
        {
          quote:
            "We integrated 3 teams after an acquisition. The HR director harmonised pay grids, aligned cultures, and handled all IRP negotiations in 6 months. Remarkable work in a very tense context.",
          author: "Sophie L.",
          role: "MD",
          company: "Industry",
          city: "Toulouse",
        },
        {
          quote:
            "In preparation for our Series B, our HR director built the entire HR data room (org chart, payroll, recruitment plan) and reassured our investors on social compliance. It was a key point in the due diligence.",
          author: "Karim B.",
          role: "CEO",
          company: "HealthTech",
          city: "Barcelona",
        },
      ],
      ctaText:
        "Discover [[our detailed case studies|/ressources/cas-clients]] to see how our HR directors have supported growing SMEs and startups.",
      ctaHref: "/ressources/cas-clients",
    },
    faq: [
      {
        question: "What is the difference between outsourced HR and shared-time HR?",
        answer:
          "Outsourced HR is the general term for external HR leadership. Shared-time HR is a format where the professional works regularly in the company (e.g. 1 to 3 days per week) over time, providing continuity and deep knowledge of the organization.",
      },
      {
        question: "What kind of missions can an outsourced HR director cover?",
        answer:
          "The offering covers HR audit and diagnosis, recruitment and sourcing, onboarding and offboarding, compensation and benefits, talent development, employee relations, HR digitalization (HRIS) and one-off missions (flash audit, HR due diligence, fundraising support, etc.).",
      },
      {
        question: "How is your service grid structured?",
        answer:
          "Services are organized in categories (HR Audit, Recruitment, Onboarding/Offboarding, Compensation, HR Development, Organization & Culture, Employee Relations, HRIS, One-off missions). Each service can be included in one of our tiers or offered as an add-on for one-off missions.",
      },
      {
        question: "What is the difference between an outsourced HR director and an accountant handling payroll?",
        answer:
          "The accountant handles payroll, social declarations and fiscal compliance. The outsourced HR director goes much further: they define HR strategy, lead recruitment, manage talent, negotiate with social partners, and advise leadership on organisational decisions. Both are complementary — our HR directors work hand in hand with your accounting firm.",
      },
      {
        question: "How much does an outsourced HR director cost?",
        answer:
          "Iter Advisors packages start at €2,500/month for 2 days (Essential) and go up to €8,000/month for 8 days (Premium). A full-time in-house HR director costs €80,000 to €150,000 including charges per year — 3 to 5 times more. Each package includes access to compensation benchmarks and HRIS tools.",
      },
      {
        question: "When should you bring in an outsourced HR director?",
        answer:
          "The 5 most common signals: (1) you are recruiting more than 2 people per month without a structured process, (2) your payroll exceeds €500K without an internal HR director, (3) you are preparing a fundraise (HR due diligence), (4) your internal HR director has left and you cannot wait 6 months to recruit, (5) you are expanding internationally and need to harmonise HR practices.",
      },
      {
        question: "Does the outsourced HR director handle payroll?",
        answer:
          "The outsourced HR director oversees and coordinates payroll (checking payslips, monitoring charges, arbitrating complex cases) but does not process it directly. They work with your [[accountant or our payroll partner|/services/comptabilite-externalisation]] to ensure compliance. This separation of roles ensures quality control without conflict of interest.",
      },
      {
        question: "What is the difference between an outsourced HR director and a freelance HR consultant?",
        answer:
          "A freelancer brings individual expertise. A firm like Iter Advisors brings: (1) a team of several HR experts, (2) playbooks proven across 85+ companies, (3) continuity of service if your contact is unavailable, (4) shared tools and benchmarks, (5) a network of partners (recruitment, training, legal).",
      },
      {
        question: "How do you measure the ROI of an outsourced HR director?",
        answer:
          "Our clients measure ROI on 4 axes: reduced time-to-hire (from 45 to 25 days on average), lower turnover (from 15 to 8% in 12 months), guaranteed social compliance (zero negative URSSAF audit), and founder productivity (2 to 5 hours/week recovered from HR topics). See [[our case studies|/ressources/cas-clients]] for concrete examples.",
      },
      {
        question: "Where do your outsourced HR directors work?",
        answer:
          "Our offices are in Barcelona, Paris and Toulouse. Our HR directors work on-site and remotely depending on your needs. We have particular expertise in cross-border France–Spain matters (collective agreement, local law, inpatriation).",
      },
    ],
    ctaButton: "Make an appointment",
  },

  es: {
    meta: {
      title: "RRHH externalizado | Dirección de personas | PME & Startup | Iter Advisors",
      description:
        "Consultoría en recursos humanos: RRHH externalizado, director de RRHH a tiempo compartido. Estructura, reclutamiento, nómina, cumplimiento y cultura. Iter Advisors.",
    },
    breadcrumbLabel: "RRHH externalizado",
    h1: "RRHH externalizado: dirección de personas flexible y experta",
    intro: [
      "Para pymes y startups en crecimiento, la función de RRHH es un eje estratégico. El director de RRHH externalizado aporta la experiencia y la estructura necesarias sin el coste de una contratación a tiempo completo.",
      "Iter Advisors acompaña sus retos de RRHH: auditoría y diagnóstico, reclutamiento, onboarding, retribución, desarrollo del talento, relaciones laborales y digitalización de la función RRHH.",
    ],
    partnerSection: {
      heading: "Su socio estratégico en RRHH",
      content: [
        "Nuestra oferta de RRHH externalizado cubre el conjunto de necesidades de una dirección de recursos humanos: desde la auditoría inicial hasta las relaciones con los representantes del personal, pasando por reclutamiento, nómina, formación y cultura de empresa.",
        "Nos adaptamos a su madurez en RRHH y a su presupuesto, con fórmulas modulables ([[RRHH a tiempo compartido|/drh-externalise/temps-partage]], misiones puntuales, add-ons) y una cuadrícula de servicios clara para diseñar el acompañamiento que necesita.",
      ],
    },
    whatIs: {
      heading: "¿Qué es un director de RRHH externalizado?",
      content: [
        "El director de RRHH externalizado interviene en su empresa sin ser empleado. Asume las mismas responsabilidades que un director de RRHH interno: estrategia de personas, reclutamiento, gestión del talento, cumplimiento normativo laboral, relaciones con la representación del personal y pilotaje de la función RRHH.",
        "Esta solución está dirigida a empresas que necesitan una experiencia RRHH de alto nivel sin contratar a tiempo completo. El director de RRHH externalizado puede intervenir a tiempo compartido (por ejemplo, unos días por semana o al mes) o en misiones puntuales (auditoría, due diligence RRHH, [[acompañamiento en financiación|/services/accompagnement-levee-de-fond]], etc.).",
      ],
    },
    advantages: {
      heading: "5 ventajas clave del RRHH externalizado",
      items: [
        {
          title: "Reducción de costes (hasta -60 %)",
          text: "Un director de RRHH a tiempo completo cuesta entre 80 000 y 150 000 € con cargas por año. El RRHH externalizado de Iter Advisors comienza en 2 500 €/mes por 2 días — una reducción del 50 al 70 %.",
        },
        {
          title: "Flexibilidad sin compromiso",
          text: "El volumen de intervención se ajusta cada mes: 2 días para una auditoría, 8 días para una contratación masiva, 4 días en régimen de crucero. Sin contrato indefinido, sin preaviso, sin cargas sociales.",
        },
        {
          title: "Experiencia multisectorial",
          text: "Con [[85+ empresas acompañadas|/ressources/cas-clients]], nuestros directores de RRHH trabajan en 5 sectores (SaaS, Deep-Tech, e-Commerce, Industria, Servicios) y aplican las mejores prácticas intersectoriales.",
        },
        {
          title: "Operativo desde el primer día",
          text: "A diferencia de una contratación interna (3 a 6 meses de incorporación), el director de RRHH externalizado es productivo en 1 a 2 semanas gracias a [[procesos de contratación estructurados|/ressources/blog]] y playbooks probados.",
        },
        {
          title: "Red y herramientas compartidas",
          text: "Acceso a nuestro ecosistema: empresas de selección asociadas, [[herramientas SIRH|/ressources/outils]] negociadas en volumen, bases de CV precalificados y benchmarks de remuneración por sector.",
        },
      ],
    },
    forWho: {
      heading: "¿Para quién es el RRHH externalizado?",
      table: {
        headers: ["Perfil", "Plantilla", "Situación", "Necesidad RRHH"],
        rows: [
          ["Startup early-stage", "5–20", "Primera ronda de financiación, primeras contrataciones", "Estructurar el proceso de contratación y el onboarding"],
          ["Pyme en crecimiento", "20–80", "Crecimiento rápido, costes de personal que explotan", "Gestión mensual de RRHH, cumplimiento social, escala salarial"],
          ["Scale-up", "80–200", "Internacionalización, equipo multi-sede", "Armonización de prácticas RRHH, SIRH, cultura de empresa"],
          ["Empresa en transición", "20–200", "Salida del director de RRHH, fusión, adquisición", "Gestión de transición RRHH, estabilización en J+5"],
          ["Estructura ligera", "10–50", "Sin director de RRHH, RRHH gestionado por el CEO", "Toda la función RRHH externalizada, del reclutamiento a la nómina"],
        ],
      },
    },
    servicesGridHeading: "Nuestros servicios de RRHH",
    tierLabels: ["Oferta 1", "Oferta 2", "Oferta 3", "Oferta 4"],
    addOnLabel: "Add-on",
    pricing: {
      heading: "¿Cuánto cuesta un director de RRHH externalizado? Tarifas 2026",
      table: {
        headers: ["Fórmula", "Días/mes", "Alcance", "Tarifa mensual"],
        rows: [
          ["Esencial", "2 días", "Auditoría RRHH, contratación (1–2 puestos/mes), cumplimiento social básico", "2 500 €"],
          ["Crecimiento", "4 días", "+ Onboarding estructurado, gestión del talento, retribución & beneficios, relaciones laborales", "4 500 €"],
          ["Premium", "8 días", "+ SIRH & digitalización, cultura de empresa, formación, due diligence RRHH", "8 000 €"],
          ["Proyecto", "A medida", "Auditoría flash RRHH, due diligence, acompañamiento en financiación", "3 000–6 000 €"],
        ],
      },
      footnote:
        "Todas nuestras fórmulas incluyen: acceso a benchmarks de remuneración, herramientas SIRH, red de empresas de selección asociadas y un senior con 8+ años de experiencia en RRHH.",
      comparison:
        "Comparativa: un director de RRHH a tiempo completo cuesta de 80 000 a 150 000 € con cargas por año, entre 3 y 5 veces más que un RRHH externalizado.",
      engagement: "Compromiso mínimo de 6 meses, rescindible con 2 meses de preaviso.",
      closingText:
        "Compare con el coste de un [[DAF externalizado|/daf-externalise]] — nuestras ofertas de finanzas y RRHH están diseñadas para complementarse.",
    },
    vsInternal: {
      heading: "RRHH externalizado vs director de RRHH interno: la comparativa",
      table: {
        headers: ["Criterio", "RRHH externalizado", "Director de RRHH interno"],
        rows: [
          ["Coste anual", "30 000–96 000 €", "80 000–150 000 € (cargas incluidas)"],
          ["Compromiso", "Sin duración mínima, modulable al mes", "Contrato indefinido, preaviso 3 meses"],
          ["Tiempo hasta ser operativo", "Operativo en 1 a 2 semanas", "3 a 6 meses (contratación + onboarding)"],
          ["Experiencia sectorial", "Multisectorial, benchmarks cruzados", "Monoempresa"],
          ["Red (contratación, formación)", "Extensa, compartida", "Limitada al historial individual"],
          ["Presencia", "2 a 8+ días/mes, híbrido", "5 días/semana, presencial"],
        ],
      },
      closingText:
        "Nuestro director de RRHH externalizado trabaja mano a mano con su [[asesor fiscal|/services/comptabilite-externalisation]] para garantizar el cumplimiento social y fiscal.",
    },
    testimonials: {
      heading: "Lo que nuestros clientes dicen de su director de RRHH externalizado",
      items: [
        {
          quote:
            "Pasamos de 15 a 45 personas en 8 meses. Nuestra directora de RRHH externalizada de Iter Advisors estructuró todo nuestro proceso de contratación, implantó un onboarding de calidad y negoció nuestros contratos de seguro médico en volumen. Sin ella, habría dedicado el 30 % de mi tiempo a temas de RRHH en lugar de impulsar el crecimiento.",
          author: "Marc D.",
          role: "CEO",
          company: "EdTech",
          city: "París",
          formula: "RRHH externalizado Crecimiento, 18 meses",
        },
        {
          quote:
            "Integramos 3 equipos tras una adquisición. La directora de RRHH armonizó las escalas salariales, alineó las culturas y gestionó todas las negociaciones con los representantes de los trabajadores en 6 meses. Un trabajo sobresaliente en un contexto muy tenso.",
          author: "Sophie L.",
          role: "DG",
          company: "Industria",
          city: "Toulouse",
        },
        {
          quote:
            "En preparación de nuestra Serie B, nuestra directora de RRHH construyó todo el data room de RRHH (organigrama, masa salarial, plan de contratación) y tranquilizó a nuestros inversores sobre el cumplimiento social. Fue un punto clave en la due diligence.",
          author: "Karim B.",
          role: "CEO",
          company: "HealthTech",
          city: "Barcelona",
        },
      ],
      ctaText:
        "Descubra [[nuestros casos de clientes detallados|/ressources/cas-clients]] para ver cómo nuestros directores de RRHH han apoyado a pymes y startups en crecimiento.",
      ctaHref: "/ressources/cas-clients",
    },
    faq: [
      {
        question: "¿Cuál es la diferencia entre RRHH externalizado y RRHH a tiempo compartido?",
        answer:
          "RRHH externalizado es el término genérico que engloba cualquier intervención externa en dirección de personas. RRHH a tiempo compartido es una fórmula en la que el profesional interviene de forma recurrente en la empresa (por ejemplo, 1 a 3 días por semana), en el tiempo, para asegurar continuidad y un conocimiento profundo de la organización.",
      },
      {
        question: "¿Qué tipos de misiones puede cubrir un director de RRHH externalizado?",
        answer:
          "La oferta cubre auditoría y diagnóstico RRHH, reclutamiento y sourcing, onboarding y offboarding, retribución y beneficios sociales, desarrollo del talento, relaciones laborales, digitalización RRHH (SIRH) y misiones puntuales (auditoría flash, due diligence RRHH, acompañamiento en financiación, etc.).",
      },
      {
        question: "¿Cómo está estructurada su cuadrícula de servicios?",
        answer:
          "Los servicios están organizados en categorías (Auditoría RRHH, Reclutamiento, Onboarding/Offboarding, Retribución, Desarrollo RRHH, Organización y cultura, Relaciones laborales, SIRH, Misiones puntuales). Cada servicio puede incluirse en una de nuestras ofertas o proponerse como add-on.",
      },
      {
        question: "¿Cuál es la diferencia entre un director de RRHH externalizado y un asesor fiscal en nóminas?",
        answer:
          "El asesor fiscal gestiona las nóminas, las declaraciones sociales y el cumplimiento fiscal. El director de RRHH externalizado va mucho más allá: define la estrategia de RRHH, lidera el reclutamiento, gestiona el talento, negocia con los representantes sociales y asesora a la dirección en decisiones organizacionales. Ambos son complementarios.",
      },
      {
        question: "¿Cuánto cuesta un director de RRHH externalizado?",
        answer:
          "Las fórmulas de Iter Advisors comienzan en 2 500 €/mes por 2 días (Esencial) y llegan a 8 000 €/mes por 8 días (Premium). Un director de RRHH a tiempo completo cuesta de 80 000 a 150 000 € con cargas por año, entre 3 y 5 veces más. Cada fórmula incluye acceso a benchmarks de remuneración y herramientas SIRH.",
      },
      {
        question: "¿Cuándo se debe recurrir a un director de RRHH externalizado?",
        answer:
          "Las 5 señales más frecuentes: (1) contrata más de 2 personas al mes sin proceso estructurado, (2) su masa salarial supera los 500 K€ sin director de RRHH interno, (3) prepara una ronda de financiación (due diligence de RRHH), (4) su director de RRHH interno se ha ido y no puede esperar 6 meses para contratar uno nuevo, (5) se internacionaliza y debe armonizar las prácticas de RRHH.",
      },
      {
        question: "¿El director de RRHH externalizado gestiona las nóminas?",
        answer:
          "El director de RRHH externalizado supervisa y coordina las nóminas (verificación de recibos de salario, control de cargas, arbitraje en casos complejos) pero no las procesa directamente. Trabaja con su [[asesor fiscal o nuestro socio de nóminas|/services/comptabilite-externalisation]] para garantizar el cumplimiento. Esta separación de funciones garantiza un control de calidad sin conflicto de intereses.",
      },
      {
        question: "¿Cuál es la diferencia entre un director de RRHH externalizado y un consultor freelance de RRHH?",
        answer:
          "Un freelance aporta experiencia individual. Un gabinete como Iter Advisors aporta: (1) un equipo de varios expertos en RRHH, (2) playbooks probados en 85+ empresas, (3) continuidad del servicio si su interlocutor no está disponible, (4) herramientas y benchmarks compartidos, (5) una red de socios (selección, formación, jurídico).",
      },
      {
        question: "¿Cómo medir el ROI de un director de RRHH externalizado?",
        answer:
          "Nuestros clientes miden el ROI en 4 ejes: reducción del time-to-hire (de 45 a 25 días de media), reducción del turnover (del 15 al 8 % en 12 meses), cumplimiento social garantizado (cero auditoría de Seguridad Social negativa) y productividad del fundador (2 a 5 horas/semana recuperadas en temas de RRHH). Consulte [[nuestros casos de clientes|/ressources/cas-clients]].",
      },
      {
        question: "¿Dónde intervienen sus directores de RRHH externalizados?",
        answer:
          "Nuestras oficinas están en Barcelona, París y Toulouse. Nuestros directores de RRHH intervienen in situ y en remoto según sus necesidades. Tenemos una experiencia particular en temas transfronterizos Francia–España (convenio colectivo, derecho local, impatriación).",
      },
    ],
    ctaButton: "Concertar una cita",
  },
};

export function getDrhContent(locale: Locale): DrhContent {
  return drhContent[locale];
}
