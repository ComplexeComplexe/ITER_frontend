import { Locale } from "../i18n";

export type DafSubPageSlug = "metier" | "temps-partage" | "transition" | "tarifs";

export interface DafSubContent {
  meta: {
    title: string;
    description: string;
  };
  parentLabel: string;
  parentHref: string;
  breadcrumbLabel: string;
  h1: string;
  sections: {
    heading?: string;
    content: string[];
  }[];
  ctaButton: string;
}

export const dafSubContent: Record<Locale, Record<DafSubPageSlug, DafSubContent>> = {
  fr: {
    metier: {
      meta: {
        title: "Qu'est-ce qu'un DAF ? Rôle, missions et compétences | Iter Advisors",
        description:
          "Découvrez le métier de DAF (Directeur Administratif et Financier) : rôle, missions, compétences clés et évolution du poste dans les entreprises modernes.",
      },
      parentLabel: "DAF Externalisé",
      parentHref: "/daf-externalise",
      breadcrumbLabel: "Le métier de DAF",
      h1: "Qu'est-ce qu'un DAF ?",
      sections: [
        {
          content: [
            "Le DAF, ou Directeur Administratif et Financier, est un acteur central dans la gouvernance d'une entreprise. Véritable bras droit du dirigeant, il supervise l'ensemble des fonctions financières et administratives, de la comptabilité au pilotage stratégique.",
            "Dans un contexte économique de plus en plus complexe, le rôle du DAF a considérablement évolué. Au-delà de la gestion comptable traditionnelle, il est aujourd'hui un véritable partenaire stratégique qui participe activement aux décisions clés de l'entreprise.",
          ],
        },
        {
          heading: "Les missions principales du DAF",
          content: [
            "Le DAF assume un large éventail de responsabilités au sein de l'entreprise. Ses missions principales incluent la supervision de la comptabilité et du reporting financier, la gestion de la trésorerie et des financements, l'élaboration des budgets et des prévisionnels, ainsi que le pilotage de la performance via des tableaux de bord.",
            "Il est également responsable de la conformité réglementaire, des relations avec les banques et les investisseurs, et de la mise en place des systèmes d'information financiers. Dans les entreprises en croissance, il joue un rôle clé dans les levées de fonds et les opérations de M&A.",
          ],
        },
        {
          heading: "Les compétences clés d'un DAF",
          content: [
            "Un DAF performant combine des compétences techniques solides avec des qualités de leadership et de communication. Il maîtrise la comptabilité, la fiscalité, le droit des affaires et les outils de gestion financière. Ses capacités d'analyse et de synthèse lui permettent de transformer des données complexes en recommandations stratégiques claires.",
            "La maîtrise des outils technologiques est devenue incontournable : ERP, outils de BI (Business Intelligence), logiciels de consolidation et de reporting automatisé font partie de son quotidien.",
          ],
        },
        {
          heading: "L'évolution du métier de DAF",
          content: [
            "Le métier de DAF connaît une transformation profonde. La digitalisation, l'automatisation des tâches répétitives et l'essor de l'intelligence artificielle libèrent du temps pour les missions à forte valeur ajoutée : stratégie, accompagnement du business, gestion des risques.",
            "Le DAF moderne est un véritable business partner qui parle le langage des opérationnels, comprend les enjeux commerciaux et contribue à la création de valeur. Il est au coeur de la transformation digitale de la fonction finance.",
          ],
        },
        {
          heading: "DAF externalisé : une alternative pertinente",
          content: [
            "Pour les PME, startups et scale-ups qui ne peuvent pas ou ne souhaitent pas recruter un DAF à temps plein, le DAF externalisé offre une solution flexible et efficace. Il apporte la même expertise qu'un DAF interne, avec l'avantage de la flexibilité et d'un coût maîtrisé.",
            "Chez Iter Advisors, nos DAFs externalisés accompagnent les entreprises en croissance avec rigueur et engagement. Contactez-nous pour découvrir comment nous pouvons soutenir votre développement.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    "temps-partage": {
      meta: {
        title: "DAF à temps partagé : Solution flexible pour PME et startups | Iter Advisors",
        description:
          "Le DAF à temps partagé : une solution flexible et économique pour les entreprises en croissance. Découvrez les avantages du temps partagé avec Iter Advisors.",
      },
      parentLabel: "DAF Externalisé",
      parentHref: "/daf-externalise",
      breadcrumbLabel: "DAF à temps partagé",
      h1: "Le DAF à temps partagé : Solution flexible et efficace",
      sections: [
        {
          content: [
            "Le DAF à temps partagé est un directeur administratif et financier qui intervient de manière régulière au sein de votre entreprise, généralement quelques jours par semaine ou par mois. Cette formule offre un accès permanent à une expertise financière de haut niveau, tout en optimisant les coûts.",
            "Cette solution s'adresse particulièrement aux PME, startups et scale-ups qui ont besoin d'une direction financière structurée mais dont l'activité ne justifie pas encore un recrutement à temps plein.",
          ],
        },
        {
          heading: "Comment fonctionne le DAF à temps partagé ?",
          content: [
            "Le DAF à temps partagé s'intègre dans votre organisation comme un membre à part entière de votre équipe de direction. Il participe aux comités stratégiques, travaille en étroite collaboration avec vos équipes opérationnelles et assure un suivi régulier de votre performance financière.",
            "La fréquence d'intervention est définie selon vos besoins : de 1 à 3 jours par semaine en général. Elle peut être ajustée à la hausse lors de périodes intenses (levée de fonds, clôture annuelle, opérations stratégiques) ou à la baisse en phase de croisière.",
          ],
        },
        {
          heading: "Les avantages du temps partagé",
          content: [
            "Le premier avantage est économique : le coût d'un DAF à temps partagé représente une fraction du coût d'un DAF en CDI, tout en apportant le même niveau d'expertise. Vous bénéficiez d'un regard externe et d'une expérience multisectorielle enrichissante.",
            "La continuité est un autre atout majeur. Contrairement à un consultant ponctuel, le DAF à temps partagé suit votre entreprise dans la durée, ce qui lui permet de développer une connaissance approfondie de vos enjeux et de votre environnement.",
            "Enfin, la flexibilité du dispositif vous permet de faire évoluer le volume d'intervention en fonction de la croissance de votre activité, sans engagement rigide.",
          ],
        },
        {
          heading: "Pour quelles entreprises ?",
          content: [
            "Le DAF à temps partagé est particulièrement adapté aux entreprises en phase de structuration (post-seed, Série A), aux PME en croissance qui souhaitent professionnaliser leur gestion financière, aux filiales de groupes qui ont besoin d'un relais financier local, et aux entreprises en préparation d'opérations stratégiques (levée de fonds, M&A).",
          ],
        },
        {
          heading: "L'approche Iter Advisors",
          content: [
            "Chez Iter Advisors, nous avons développé une méthodologie éprouvée pour le DAF à temps partagé. Chaque mission débute par un diagnostic complet de votre situation financière, suivi d'un plan d'action priorisé. Notre CFO s'appuie sur un réseau de 30 partenaires technologiques pour mettre en place les meilleurs outils.",
            "Notre présence à Barcelone, Paris et Toulouse nous permet d'intervenir auprès d'entreprises françaises et internationales. Contactez-nous pour discuter de vos besoins.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    transition: {
      meta: {
        title: "DAF de transition : Expert pour vos périodes clés | Iter Advisors",
        description:
          "Le DAF de transition intervient lors de périodes critiques : restructuration, levée de fonds, remplacement temporaire. Découvrez cette solution avec Iter Advisors.",
      },
      parentLabel: "DAF Externalisé",
      parentHref: "/daf-externalise",
      breadcrumbLabel: "DAF de transition",
      h1: "Qu'est-ce qu'un DAF de transition ?",
      sections: [
        {
          content: [
            "Le DAF de transition est un directeur financier expérimenté qui intervient dans votre entreprise pour une période définie, lors d'un moment clé de votre développement. Contrairement au DAF à temps partagé, sa mission est intensive et limitée dans le temps : de quelques semaines à quelques mois.",
            "Il apporte une expertise immédiatement opérationnelle pour traverser des phases critiques : restructuration financière, remplacement temporaire d'un DAF, préparation d'une levée de fonds, mise en place de nouveaux process ou accompagnement d'une opération de M&A.",
          ],
        },
        {
          heading: "Quand faire appel à un DAF de transition ?",
          content: [
            "Plusieurs situations justifient le recours à un DAF de transition. Le départ soudain de votre directeur financier, une période de restructuration nécessitant une expertise pointue, une levée de fonds imminente requérant une préparation intensive, ou encore l'intégration post-acquisition d'une nouvelle entité.",
            "Le DAF de transition intervient également lorsque l'entreprise traverse une phase de forte croissance nécessitant une montée en compétences rapide de la fonction finance, ou quand il faut mettre en place un nouvel ERP ou refondre les process financiers.",
          ],
        },
        {
          heading: "Les spécificités du management de transition",
          content: [
            "Le DAF de transition se caractérise par sa capacité à être opérationnel immédiatement. Son expérience lui permet de comprendre rapidement les enjeux de l'entreprise, d'établir un diagnostic précis et de mettre en oeuvre un plan d'action efficace.",
            "Il sait gérer la pression et les situations d'urgence, tout en maintenant une vision stratégique. Sa neutralité et son objectivité sont des atouts précieux pour conduire le changement au sein de l'organisation.",
          ],
        },
        {
          heading: "La mission type d'un DAF de transition",
          content: [
            "Une mission de DAF de transition se déroule généralement en trois phases. La première semaine est consacrée au diagnostic : analyse de la situation financière, identification des priorités, rencontre des équipes clés.",
            "Vient ensuite la phase d'exécution, qui constitue le coeur de la mission : mise en place des actions correctives, structuration des process, préparation des dossiers stratégiques et pilotage opérationnel quotidien.",
            "Enfin, la phase de passation assure la pérennité des améliorations mises en place : documentation des process, formation des équipes et transmission au DAF permanent ou au DAF à temps partagé qui prendra le relais.",
          ],
        },
        {
          heading: "L'offre Iter Advisors en management de transition",
          content: [
            "Iter Advisors dispose d'une équipe de DAFs de transition expérimentés, immédiatement mobilisables. Nos professionnels ont accompagné avec succès des entreprises dans des secteurs variés : tech, e-commerce, industrie, services B2B.",
            "Nous garantissons une prise de poste rapide (sous 48 à 72 heures en cas d'urgence) et un accompagnement de qualité tout au long de la mission. Contactez-nous pour évaluer ensemble vos besoins.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    tarifs: {
      meta: {
        title: "Tarifs DAF Externalisé 2026 - Grille de Prix | Iter Advisors",
        description: "Combien coûte un DAF externalisé ? Grille de tarifs 2026 : de 2 000 à 8 000 € HT/mois selon la formule. Transparence totale, sans surprise.",
      },
      parentLabel: "DAF Externalisé",
      parentHref: "/daf-externalise",
      breadcrumbLabel: "Tarifs",
      h1: "Tarifs DAF Externalisé 2026 : grille de prix et comparatif",
      sections: [
        {
          content: [
            "Combien coûte un DAF externalisé ? C'est souvent la première question que se posent les dirigeants de PME et de startups avant de franchir le pas. La réponse dépend de plusieurs facteurs : la formule choisie (temps partagé, transition ou mission ponctuelle), le nombre de jours d'intervention par mois, et la complexité de la situation financière de l'entreprise.",
            "Chez Iter Advisors, nous avons fait le choix de la transparence totale sur nos tarifs. Cette page présente notre grille de prix 2026, les facteurs qui influencent le coût, et une comparaison avec les alternatives (recrutement d'un DAF salarié, consultant financier, expert-comptable).",
          ],
        },
        {
          heading: "Grille de Tarifs 2026",
          content: [
            "Les tarifs d'un DAF externalisé s'expriment généralement en forfait mensuel, calculé sur la base d'un nombre de jours d'intervention défini à l'avance.",
            "Formule DAF à Temps Partagé : la plus courante et adaptée aux PME et startups. 1 jour/mois : 1 500-2 500€ HT pour les entreprises de moins de 10 salariés. 2 jours/mois : 2 500-4 500€ HT (la formule la plus demandée, couvrant reporting complet, suivi de trésorerie et supervision comptable). 3-4 jours/mois : 4 500-8 000€ HT pour les entreprises de plus de 30 salariés ou structures multi-entités.",
            "Formule DAF de Transition : intervention à temps plein ou quasi-plein sur 3 à 12 mois en cas de crise ou transformation majeure. Tarif : 800-1 500€ HT par jour, soit 16 000-30 000€ HT par mois. Significativement plus élevé que le temps partagé car mobilisation intégrale.",
            "Mission Ponctuelle : pour besoins spécifiques et limités (due diligence, modèle financier, audit de trésorerie). TJM : 800-1 200€ HT par jour selon le profil et la complexité.",
          ],
        },
        {
          heading: "Qu'est-ce qui Fait Varier le Prix ?",
          content: [
            "Plusieurs facteurs influencent le coût final d'un DAF externalisé. L'expérience du DAF : un DAF avec 5 ans d'expérience ne coûte pas le même prix qu'un DAF avec 20 ans d'expérience. Chez Iter Advisors, tous nos associés ont plus de 10 ans d'expérience en finance d'entreprise.",
            "La complexité de la situation : une comptabilité simple avec une seule entité juridique nécessite moins de temps qu'une structure multi-pays avec opérations en devises, filiales et obligations de consolidation.",
            "Le secteur d'activité : certains secteurs comme les SaaS, e-commerce ou biotechs nécessitent une expertise spécifique qui peut justifier un tarif légèrement supérieur.",
            "La localisation : les tarifs à Paris sont généralement 10-20% supérieurs à ceux pratiqués en province ou à Barcelone, en raison du coût de la vie plus élevé.",
          ],
        },
        {
          heading: "Comparaison avec les Alternatives",
          content: [
            "DAF externalisé vs DAF salarié : un DAF salarié en CDI coûte 80 000-150 000€ brut/an, soit 116 000-217 000€/an charges comprises (45% de charges patronales). Un DAF externalisé à 2 jours/mois coûte 2 500-4 500€ HT/mois, soit 3 à 7 fois moins cher. De plus, si vos besoins évoluent, vous ajustez simplement le nombre de jours sans contrainte administrative.",
            "DAF externalisé vs Expert-Comptable : l'expert-comptable certifie la conformité légale et fiscale. Le DAF externalisé pilote la performance financière au quotidien. Ce sont des rôles complémentaires. Une PME structurée a typiquement les deux : l'expert-comptable pour la conformité, le DAF pour le pilotage.",
            "DAF externalisé vs Consultant Financier : un consultant intervient sur une mission précise et repart une fois terminée. Le DAF externalisé construit une relation continue et connaît votre historique. Pour des besoins récurrents, le DAF externalisé est toujours plus adapté.",
          ],
        },
        {
          heading: "Comment se Passe la Facturation ?",
          content: [
            "Chez Iter Advisors, la facturation est simple et transparente. Nous établissons un contrat de prestation de services qui précise le nombre de jours d'intervention par mois, le tarif mensuel, et les modalités de résiliation (préavis d'un mois).",
            "La facturation est mensuelle, avec paiement à 30 jours. Il n'y a pas de frais cachés, pas de facturation supplémentaire pour les échanges par email ou téléphone entre les jours d'intervention formels, et pas d'engagement minimum au-delà du premier mois.",
          ],
        },
        {
          heading: "Comment Obtenir un Devis ?",
          content: [
            "Pour obtenir un devis personnalisé, le plus simple est de nous contacter pour un premier échange de 30 minutes. Lors de cet appel, nous évaluons ensemble vos besoins, votre situation financière actuelle, et le nombre de jours d'intervention adapté.",
            "Nous vous envoyons ensuite une proposition commerciale détaillée sous 48 heures.",
          ],
        },
        {
          heading: "FAQ - Tarifs du DAF Externalisé",
          content: [
            "Le tarif est-il déductible fiscalement ? Oui. Les honoraires d'un DAF externalisé sont des charges d'exploitation déductibles du résultat imposable de l'entreprise, au même titre que les honoraires d'un expert-comptable ou d'un avocat.",
            "Peut-on négocier le tarif ? Nos tarifs sont transparents et basés sur le marché. Nous pouvons adapter le nombre de jours d'intervention à votre budget, mais nous ne pratiquons pas de négociation sur le tarif journalier. La qualité de nos DAF justifie nos prix.",
            "Y a-t-il un engagement de durée minimum ? Non. Nos contrats sont résiliables avec un préavis d'un mois. Nous préférons gagner votre confiance par la qualité de notre travail plutôt que par des clauses contractuelles contraignantes.",
            "Le tarif inclut-il les déplacements ? Pour les interventions en présentiel, les frais de déplacement (transport, hébergement si nécessaire) sont facturés en sus au coût réel. Les interventions en distanciel ne génèrent pas de frais supplémentaires.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
  },
  en: {
    metier: {
      meta: {
        title: "What is a CFO? Role, missions and skills | Iter Advisors",
        description:
          "Discover the CFO role: responsibilities, key skills and how the position has evolved in modern companies.",
      },
      parentLabel: "CFO Outsourced",
      parentHref: "/en/fractional-cfo",
      breadcrumbLabel: "The CFO role",
      h1: "What is a CFO?",
      sections: [
        {
          content: [
            "The CFO, or Chief Financial Officer, is a central figure in corporate governance. As the CEO's right hand, they oversee all financial and administrative functions, from accounting to strategic management.",
            "In an increasingly complex economic context, the CFO role has evolved considerably. Beyond traditional accounting management, today's CFO is a true strategic partner who actively participates in key business decisions.",
          ],
        },
        {
          heading: "Key responsibilities of a CFO",
          content: [
            "The CFO assumes a wide range of responsibilities within the company. Their main missions include supervising accounting and financial reporting, managing cash flow and financing, preparing budgets and forecasts, and steering performance through dashboards.",
            "They are also responsible for regulatory compliance, relationships with banks and investors, and implementing financial information systems. In growing companies, they play a key role in fundraising and M&A operations.",
          ],
        },
        {
          heading: "Essential skills for a CFO",
          content: [
            "A high-performing CFO combines solid technical skills with leadership and communication abilities. They master accounting, taxation, business law and financial management tools. Their analytical and synthesis capabilities allow them to transform complex data into clear strategic recommendations.",
            "Mastery of technological tools has become essential: ERP, BI (Business Intelligence) tools, consolidation software and automated reporting are part of their daily work.",
          ],
        },
        {
          heading: "The evolving CFO role",
          content: [
            "The CFO profession is undergoing a profound transformation. Digitalization, automation of repetitive tasks and the rise of artificial intelligence free up time for high-value missions: strategy, business support, risk management.",
            "The modern CFO is a true business partner who speaks the language of operations, understands commercial challenges and contributes to value creation. They are at the heart of the digital transformation of the finance function.",
          ],
        },
        {
          heading: "Fractional CFO: a relevant alternative",
          content: [
            "For SMEs, startups and scale-ups that cannot or do not wish to recruit a full-time CFO, the Fractional CFO offers a flexible and effective solution. It provides the same expertise as an internal CFO, with the advantage of flexibility and controlled costs.",
            "At Iter Advisors, our Fractional CFOs support growing companies with rigor and commitment. Contact us to discover how we can support your development.",
          ],
        },
      ],
      ctaButton: "Make an appointment",
    },
    "temps-partage": {
      meta: {
        title: "Part-time CFO: Flexible solution for SMEs and startups | Iter Advisors",
        description:
          "The part-time CFO: a flexible and cost-effective solution for growing companies. Discover the benefits of timeshare CFO services with Iter Advisors.",
      },
      parentLabel: "CFO Outsourced",
      parentHref: "/en/fractional-cfo",
      breadcrumbLabel: "Shared-time CFO",
      h1: "The timeshare CFO: A flexible, efficient solution",
      sections: [
        {
          content: [
            "The timeshare CFO is a finance director who works regularly within your company, typically a few days per week or month. This arrangement provides permanent access to high-level financial expertise while optimizing costs.",
            "This solution is particularly suited to SMEs, startups and scale-ups that need structured financial management but whose business does not yet justify a full-time hire.",
          ],
        },
        {
          heading: "How does the timeshare CFO work?",
          content: [
            "The timeshare CFO integrates into your organization as a full member of your management team. They participate in strategic committees, work closely with your operational teams and provide regular monitoring of your financial performance.",
            "The frequency of intervention is defined according to your needs: generally 1 to 3 days per week. It can be increased during intense periods (fundraising, annual closing, strategic operations) or reduced during cruise phases.",
          ],
        },
        {
          heading: "Advantages of the timeshare model",
          content: [
            "The first advantage is economic: the cost of a timeshare CFO represents a fraction of the cost of a permanent CFO, while providing the same level of expertise. You benefit from an external perspective and enriching multi-sector experience.",
            "Continuity is another major asset. Unlike a one-off consultant, the timeshare CFO follows your company over time, allowing them to develop an in-depth understanding of your challenges and environment.",
            "Finally, the flexibility of the arrangement allows you to adjust the volume of intervention according to your business growth, without rigid commitments.",
          ],
        },
        {
          heading: "Which companies benefit most?",
          content: [
            "The timeshare CFO is particularly well-suited to companies in their structuring phase (post-seed, Series A), growing SMEs looking to professionalize their financial management, group subsidiaries needing a local financial relay, and companies preparing for strategic operations (fundraising, M&A).",
          ],
        },
        {
          heading: "The Iter Advisors approach",
          content: [
            "At Iter Advisors, we have developed a proven methodology for timeshare CFO services. Each engagement begins with a comprehensive diagnosis of your financial situation, followed by a prioritized action plan. Our CFO leverages a network of 30 technology partners to implement the best tools.",
            "Our presence in Barcelona, Paris and Toulouse allows us to work with French and international companies. Contact us to discuss your needs.",
          ],
        },
      ],
      ctaButton: "Make an appointment",
    },
    transition: {
      meta: {
        title: "Transitional CFO: Expert for your key periods | Iter Advisors",
        description:
          "The transitional CFO intervenes during critical periods: restructuring, fundraising, temporary replacement. Discover this solution with Iter Advisors.",
      },
      parentLabel: "CFO Outsourced",
      parentHref: "/en/fractional-cfo",
      breadcrumbLabel: "Transitional CFO",
      h1: "What is a transitional CFO?",
      sections: [
        {
          content: [
            "A transitional CFO is an experienced finance director who joins your company for a defined period during a key moment in your development. Unlike a timeshare CFO, their mission is intensive and time-limited: from a few weeks to a few months.",
            "They bring immediately operational expertise to navigate critical phases: financial restructuring, temporary CFO replacement, fundraising preparation, implementation of new processes or support for M&A operations.",
          ],
        },
        {
          heading: "When to call on a transitional CFO?",
          content: [
            "Several situations justify calling on a transitional CFO. The sudden departure of your finance director, a restructuring period requiring specialized expertise, an imminent fundraising round requiring intensive preparation, or post-acquisition integration of a new entity.",
            "The transitional CFO also intervenes when the company is going through a phase of strong growth requiring a rapid upskilling of the finance function, or when a new ERP needs to be implemented or financial processes redesigned.",
          ],
        },
        {
          heading: "The specifics of transition management",
          content: [
            "The transitional CFO is characterized by their ability to be operational immediately. Their experience allows them to quickly understand the company's challenges, establish a precise diagnosis and implement an effective action plan.",
            "They can handle pressure and emergency situations while maintaining a strategic vision. Their neutrality and objectivity are valuable assets for driving change within the organization.",
          ],
        },
        {
          heading: "A typical transitional CFO mission",
          content: [
            "A transitional CFO mission generally unfolds in three phases. The first week is devoted to diagnosis: analysis of the financial situation, identification of priorities, meeting key teams.",
            "Then comes the execution phase, which constitutes the core of the mission: implementing corrective actions, structuring processes, preparing strategic dossiers and daily operational management.",
            "Finally, the handover phase ensures the sustainability of improvements: process documentation, team training and transfer to the permanent CFO or timeshare CFO who will take over.",
          ],
        },
        {
          heading: "Iter Advisors transition management offering",
          content: [
            "Iter Advisors has a team of experienced transitional CFOs, immediately available. Our professionals have successfully supported companies in various sectors: tech, e-commerce, industry, B2B services.",
            "We guarantee a rapid start (within 48 to 72 hours in case of emergency) and quality support throughout the mission. Contact us to assess your needs together.",
          ],
        },
      ],
      ctaButton: "Make an appointment",
    },
    tarifs: {
      meta: {
        title: "Outsourced CFO Pricing 2026 - Rates | Iter Advisors",
        description: "How much does an outsourced CFO cost? Pricing from €2,000 to €8,000 per month depending on the formula. Complete transparency, no surprises.",
      },
      parentLabel: "CFO Outsourced",
      parentHref: "/en/fractional-cfo",
      breadcrumbLabel: "Pricing",
      h1: "Outsourced CFO Pricing 2026: rates and comparison",
      sections: [
        {
          content: [
            "How much does an outsourced CFO cost? This is often the first question asked by SME and startup leaders. The answer depends on several factors: the formula chosen (part-time, transitional, or specific mission), the number of intervention days per month, and the complexity of your company's financial situation.",
            "At Iter Advisors, we have chosen complete transparency on our rates. This page presents our 2026 pricing grid, the factors that influence the cost, and a comparison with alternatives (hiring a full-time CFO, financial consultant, or accounting firm).",
          ],
        },
        {
          heading: "2026 Pricing Grid",
          content: [
            "Outsourced CFO rates are generally expressed as a monthly fee, calculated on the basis of a predetermined number of intervention days.",
            "Part-time CFO Formula: the most common and suitable for SMEs and startups. 1 day/month: €1,500-2,500 for companies with fewer than 10 employees. 2 days/month: €2,500-4,500 (the most requested formula, covering full reporting, cash management, and accounting supervision). 3-4 days/month: €4,500-8,000 for companies with more than 30 employees or multi-entity structures.",
          ],
        },
      ],
      ctaButton: "Make an appointment",
    },
  },
  es: {
    metier: {
      meta: {
        title: "¿Qué es un Director Financiero? Rol, misiones y competencias | Iter Advisors",
        description:
          "Descubra el rol del Director Financiero (CFO): responsabilidades, competencias clave y evolución del puesto en las empresas modernas.",
      },
      parentLabel: "CFO Externo",
      parentHref: "/es/externalizacion-daf",
      breadcrumbLabel: "El rol del CFO",
      h1: "¿Qué es un Director Financiero?",
      sections: [
        {
          content: [
            "El Director Financiero, o CFO (Chief Financial Officer), es un actor central en la gobernanza de una empresa. Verdadero brazo derecho del CEO, supervisa todas las funciones financieras y administrativas, desde la contabilidad hasta la gestión estratégica.",
            "En un contexto económico cada vez más complejo, el rol del Director Financiero ha evolucionado considerablemente. Más allá de la gestión contable tradicional, hoy es un verdadero socio estratégico que participa activamente en las decisiones clave de la empresa.",
          ],
        },
        {
          heading: "Las misiones principales del Director Financiero",
          content: [
            "El Director Financiero asume un amplio abanico de responsabilidades dentro de la empresa. Sus misiones principales incluyen la supervisión de la contabilidad y el reporting financiero, la gestión de la tesorería y los financiamientos, la elaboración de presupuestos y previsiones, así como el seguimiento del rendimiento mediante cuadros de mando.",
            "También es responsable del cumplimiento normativo, las relaciones con bancos e inversores, y la implantación de sistemas de información financiera. En empresas en crecimiento, juega un papel clave en las rondas de financiación y las operaciones de M&A.",
          ],
        },
        {
          heading: "Las competencias clave de un Director Financiero",
          content: [
            "Un Director Financiero de alto rendimiento combina competencias técnicas sólidas con cualidades de liderazgo y comunicación. Domina la contabilidad, la fiscalidad, el derecho mercantil y las herramientas de gestión financiera. Sus capacidades de análisis y síntesis le permiten transformar datos complejos en recomendaciones estratégicas claras.",
            "El dominio de las herramientas tecnológicas se ha vuelto imprescindible: ERP, herramientas de BI (Business Intelligence), software de consolidación y reporting automatizado forman parte de su día a día.",
          ],
        },
        {
          heading: "La evolución del rol de Director Financiero",
          content: [
            "El rol del Director Financiero está experimentando una transformación profunda. La digitalización, la automatización de tareas repetitivas y el auge de la inteligencia artificial liberan tiempo para misiones de alto valor añadido: estrategia, acompañamiento al negocio, gestión de riesgos.",
            "El Director Financiero moderno es un verdadero business partner que habla el lenguaje de los operativos, comprende los retos comerciales y contribuye a la creación de valor.",
          ],
        },
        {
          heading: "CFO externalizado: una alternativa pertinente",
          content: [
            "Para las pymes, startups y scale-ups que no pueden o no desean contratar un Director Financiero a tiempo completo, el CFO externalizado ofrece una solución flexible y eficaz. Aporta la misma experiencia que un CFO interno, con la ventaja de la flexibilidad y un coste controlado.",
            "En Iter Advisors, nuestros CFOs externalizados acompañan a las empresas en crecimiento con rigor y compromiso. Contáctenos para descubrir cómo podemos apoyar su desarrollo.",
          ],
        },
      ],
      ctaButton: "Concierte una cita",
    },
    "temps-partage": {
      meta: {
        title: "CFO a tiempo compartido: Solución flexible para pymes y startups | Iter Advisors",
        description:
          "El CFO a tiempo compartido: una solución flexible y económica para empresas en crecimiento. Descubra las ventajas del tiempo compartido con Iter Advisors.",
      },
      parentLabel: "CFO Externo",
      parentHref: "/es/externalizacion-daf",
      breadcrumbLabel: "CFO a tiempo compartido",
      h1: "El director financiero de tiempo compartido",
      sections: [
        {
          content: [
            "El CFO a tiempo compartido es un director financiero que interviene de manera regular en su empresa, generalmente algunos días a la semana o al mes. Esta fórmula ofrece un acceso permanente a una experiencia financiera de alto nivel, optimizando al mismo tiempo los costes.",
            "Esta solución se dirige particularmente a las pymes, startups y scale-ups que necesitan una dirección financiera estructurada pero cuya actividad no justifica todavía una contratación a tiempo completo.",
          ],
        },
        {
          heading: "¿Cómo funciona el CFO a tiempo compartido?",
          content: [
            "El CFO a tiempo compartido se integra en su organización como un miembro de pleno derecho de su equipo directivo. Participa en los comités estratégicos, trabaja en estrecha colaboración con sus equipos operativos y asegura un seguimiento regular de su rendimiento financiero.",
            "La frecuencia de intervención se define según sus necesidades: de 1 a 3 días por semana en general. Puede ajustarse al alza durante periodos intensos (ronda de financiación, cierre anual, operaciones estratégicas) o a la baja en fase de crucero.",
          ],
        },
        {
          heading: "Las ventajas del tiempo compartido",
          content: [
            "La primera ventaja es económica: el coste de un CFO a tiempo compartido representa una fracción del coste de un CFO en plantilla, aportando el mismo nivel de experiencia. Se beneficia de una mirada externa y una experiencia multisectorial enriquecedora.",
            "La continuidad es otro activo importante. A diferencia de un consultor puntual, el CFO a tiempo compartido acompaña a su empresa a lo largo del tiempo, lo que le permite desarrollar un conocimiento profundo de sus retos y su entorno.",
            "Finalmente, la flexibilidad del dispositivo le permite hacer evolucionar el volumen de intervención en función del crecimiento de su actividad, sin compromisos rígidos.",
          ],
        },
        {
          heading: "¿Para qué empresas?",
          content: [
            "El CFO a tiempo compartido es especialmente adecuado para empresas en fase de estructuración (post-seed, Serie A), pymes en crecimiento que desean profesionalizar su gestión financiera, filiales de grupos que necesitan un relevo financiero local, y empresas preparando operaciones estratégicas (rondas de financiación, M&A).",
          ],
        },
        {
          heading: "El enfoque de Iter Advisors",
          content: [
            "En Iter Advisors, hemos desarrollado una metodología probada para el CFO a tiempo compartido. Cada misión comienza con un diagnóstico completo de su situación financiera, seguido de un plan de acción priorizado. Nuestro CFO se apoya en una red de 30 socios tecnológicos para implantar las mejores herramientas.",
            "Nuestra presencia en Barcelona, París y Toulouse nos permite intervenir junto a empresas francesas e internacionales. Contáctenos para hablar de sus necesidades.",
          ],
        },
      ],
      ctaButton: "Concierte una cita",
    },
    transition: {
      meta: {
        title: "CFO de transición: Experto para sus periodos clave | Iter Advisors",
        description:
          "El CFO de transición interviene durante periodos críticos: reestructuración, rondas de financiación, reemplazo temporal. Descubra esta solución con Iter Advisors.",
      },
      parentLabel: "CFO Externo",
      parentHref: "/es/externalizacion-daf",
      breadcrumbLabel: "CFO de transición",
      h1: "¿Qué es un Director Financiero de transición?",
      sections: [
        {
          content: [
            "El CFO de transición es un director financiero experimentado que interviene en su empresa durante un periodo definido, en un momento clave de su desarrollo. A diferencia del CFO a tiempo compartido, su misión es intensiva y limitada en el tiempo: de algunas semanas a algunos meses.",
            "Aporta una experiencia inmediatamente operativa para atravesar fases críticas: reestructuración financiera, reemplazo temporal de un CFO, preparación de una ronda de financiación, implantación de nuevos procesos o acompañamiento de una operación de M&A.",
          ],
        },
        {
          heading: "¿Cuándo recurrir a un CFO de transición?",
          content: [
            "Varias situaciones justifican recurrir a un CFO de transición. La salida repentina de su director financiero, un periodo de reestructuración que requiere una experiencia especializada, una ronda de financiación inminente que necesita preparación intensiva, o la integración post-adquisición de una nueva entidad.",
            "El CFO de transición interviene también cuando la empresa atraviesa una fase de fuerte crecimiento que requiere una evolución rápida de la función financiera, o cuando hay que implantar un nuevo ERP o rediseñar los procesos financieros.",
          ],
        },
        {
          heading: "Las especificidades de la gestión de transición",
          content: [
            "El CFO de transición se caracteriza por su capacidad de ser operativo inmediatamente. Su experiencia le permite comprender rápidamente los retos de la empresa, establecer un diagnóstico preciso y poner en marcha un plan de acción eficaz.",
            "Sabe gestionar la presión y las situaciones de urgencia, manteniendo al mismo tiempo una visión estratégica. Su neutralidad y objetividad son activos valiosos para conducir el cambio en la organización.",
          ],
        },
        {
          heading: "La misión tipo de un CFO de transición",
          content: [
            "Una misión de CFO de transición se desarrolla generalmente en tres fases. La primera semana se dedica al diagnóstico: análisis de la situación financiera, identificación de prioridades, encuentro con los equipos clave.",
            "Viene después la fase de ejecución, que constituye el corazón de la misión: puesta en marcha de acciones correctivas, estructuración de procesos, preparación de expedientes estratégicos y gestión operativa diaria.",
            "Finalmente, la fase de traspaso asegura la sostenibilidad de las mejoras: documentación de procesos, formación de equipos y transmisión al CFO permanente o al CFO a tiempo compartido que tomará el relevo.",
          ],
        },
        {
          heading: "La oferta de Iter Advisors en gestión de transición",
          content: [
            "Iter Advisors dispone de un equipo de CFOs de transición experimentados, inmediatamente disponibles. Nuestros profesionales han acompañado con éxito a empresas de diversos sectores: tech, e-commerce, industria, servicios B2B.",
            "Garantizamos una incorporación rápida (en 48 a 72 horas en caso de urgencia) y un acompañamiento de calidad a lo largo de toda la misión. Contáctenos para evaluar juntos sus necesidades.",
          ],
        },
      ],
      ctaButton: "Concierte una cita",
    },
    tarifs: {
      meta: {
        title: "Tarifas DAF Externalizado 2026 - Precios | Iter Advisors",
        description: "¿Cuánto cuesta un DAF externalizado? Tarifas desde 2.000 a 8.000€ mensuales según la fórmula. Transparencia total, sin sorpresas.",
      },
      parentLabel: "CFO Externalizado",
      parentHref: "/es/externalizacion-daf",
      breadcrumbLabel: "Tarifas",
      h1: "Tarifas DAF Externalizado 2026: cuadrilla de precios y comparativa",
      sections: [
        {
          content: [
            "¿Cuánto cuesta un DAF externalizado? Esta es a menudo la primera pregunta que se hacen los dirigentes de PYMEs y startups antes de dar el paso. La respuesta depende de varios factores: la fórmula elegida (tiempo compartido, transición o misión puntual), el número de días de intervención al mes, y la complejidad de la situación financiera de la empresa.",
            "En Iter Advisors, hemos optado por una transparencia total en nuestras tarifas. Esta página presenta nuestra cuadrilla de precios 2026, los factores que influyen en el coste, y una comparativa con las alternativas (contratación de un DAF a tiempo completo, consultor financiero, o despacho contable).",
          ],
        },
        {
          heading: "Cuadrilla de Tarifas 2026",
          content: [
            "Las tarifas de un DAF externalizado se expresan generalmente como una cuota mensual, calculada sobre la base de un número de días de intervención predeterminado.",
            "Fórmula DAF a Tiempo Compartido: la más frecuente y adaptada a PYMEs y startups. 1 día/mes: €1.500-2.500 para empresas con menos de 10 empleados. 2 días/mes: €2.500-4.500 (la fórmula más solicitada, cubriendo reporting completo, seguimiento de tesorería y supervisión contable). 3-4 días/mes: €4.500-8.000 para empresas con más de 30 empleados o estructuras multi-entidades.",
          ],
        },
      ],
      ctaButton: "Concierte una cita",
    },
  },
};

// Mapping from URL slug to internal content key
const slugMapping: Record<Locale, Record<string, DafSubPageSlug>> = {
  fr: {
    metier: "metier",
    "temps-partage": "temps-partage",
    transition: "transition",
  },
  en: {
    metier: "metier",
    "shared-time": "temps-partage",
    transition: "transition",
  },
  es: {
    metier: "metier",
    // Audit V2 R-4: ES URL renamed multipropiedad → tiempo-compartido.
    // Legacy "multipropiedad" key retained as fallback for any direct hits
    // until the 301 in vercel.json fully takes over.
    "tiempo-compartido": "temps-partage",
    multipropiedad: "temps-partage",
    transition: "transition",
  },
};

export function getDafSubContent(locale: Locale, urlSlug: string): DafSubContent | undefined {
  const key = slugMapping[locale]?.[urlSlug];
  if (!key) return undefined;
  return dafSubContent[locale][key];
}
