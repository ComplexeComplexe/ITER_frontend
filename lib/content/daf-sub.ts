import { Locale } from "../i18n";

export type DafSubPageSlug = "metier" | "temps-partage" | "transition" | "tarifs" | "secteurs" | "ecommerce" | "industrie" | "deep-tech";

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
        title: "Métier de DAF : Rôle et Missions | Iter Advisors",
        description:
          "Découvrez le métier de DAF : rôle complet, missions clés, compétences requises et évolution du poste dans les entreprises modernes.",
      },
      parentLabel: "DAF Externalisé",
      parentHref: "/daf-externalise",
      breadcrumbLabel: "Le métier de DAF",
      // T#1 + T#10 (2026-07-13) — H1 recentré sur intent informationnel
      // pur "fiche métier DAF". Retiré tout ciblage "externalisé" pour
      // éviter la cannibalisation avec le pilier /daf-externalise.
      // Cible : "métier de daf", "fiche métier daf", "que fait un daf".
      h1: "Fiche métier DAF : rôle, missions et compétences du Directeur Administratif et Financier",
      sections: [
        {
          content: [
            // Maillage (2026-08-02) — /ressources/glossaire/daf était
            // orpheline (3 liens entrants) : la fiche métier, sa page la
            // plus proche sémantiquement, ne la citait pas.
            "Le **DAF**, ou Directeur Administratif et Financier, est l'officier financier senior de l'entreprise. Véritable bras droit du PDG ou du Directeur Général, il supervise l'intégralité de la fonction finance : comptabilité, trésorerie, reporting, fiscalité, et pilotage de la performance. Le DAF n'est pas qu'un expert technique ; c'est un partenaire stratégique qui participe aux décisions clés et contribue à la création de valeur. Pour la définition courte du terme, voir notre entrée de glossaire [DAF](/ressources/glossaire/daf).",
            "En 2026, le métier de DAF traverse une transformation profonde. Les tâches administratives et répétitives sont progressivement automatisées, libérant du temps pour les missions à haute valeur ajoutée : stratégie financière, accompagnement du business, gestion des risques et transformation digitale.",
          ],
        },
        {
          heading: "Les missions principales d'un DAF",
          content: [
            "**Pilotage de la comptabilité et reporting financier :** Le DAF supervise la tenue de la comptabilité générale et la production des états financiers (bilan, compte de résultat, tableau de flux de trésorerie). Il s'assure que les comptes sont réguliers, sincères et reflètent fidèlement la situation financière de l'entreprise. Il est responsable de la conformité légale et fiscale.",
            "**Gestion de la trésorerie :** C'est l'une des missions critiques du DAF. Il prévoit les besoins de trésorerie, négocie les conditions bancaires, gère les risques de change et de taux, et s'assure que l'entreprise dispose toujours des ressources nécessaires pour financer son activité.",
            "**Élaboration de la stratégie financière :** Le DAF élabore les budgets, les prévisions financières (5 ans) et les plans de trésorerie. Il participe à la définition de la stratégie de financement (dette, fonds propres, leasing), et pilote les grands projets d'investissement.",
            "**Reporting et tableau de bord :** Le DAF met en place les outils de pilotage qui permettent au management de monitorer la performance financière en temps réel : tableaux de bord KPI, analyses de variance, reporting mensuel et trimestral.",
            "**Gestion des relations bancaires et investisseurs :** Le DAF représente l'entreprise auprès des banquiers, des investisseurs et des fonds de private equity. Il prépare les présentations financières, négocie les contrats de financement et gère les relations à long terme.",
            "**Fiscalité et conformité :** Le DAF travaille en étroite collaboration avec l'expert-comptable et les conseillers fiscaux pour optimiser la fiscalité de l'entreprise (impôt sur les sociétés, TVA, impôt sur la fortune immobilière). Il s'assure de la conformité avec toutes les obligations légales (paye, normes comptables, etc.).",
            "**Gestion des risques financiers :** Le DAF identifie les risques financiers (crédit, trésorerie, change, taux), évalue leur impact potentiel, et met en place les mesures d'atténuation appropriées.",
          ],
        },
        {
          heading: "Les compétences clés d'un DAF performant",
          content: [
            "**Compétences techniques :** Maîtrise approfondie de la comptabilité générale et analytique, de la fiscalité d'entreprise, du droit des affaires, et des normes comptables (IFRS, normes françaises). Connaissance des principaux outils du DAF : ERP (SAP, NetSuite, Sage), logiciels de BI (Tableau, Power BI), outils de planning financier (Adaptive Insights, Anaplan), et logiciels de consolidation (HFM, Essbase).",
            "**Compétences analytiques et stratégiques :** Capacité à analyser des données financières complexes, identifier les tendances, et proposer des recommandations stratégiques. Le DAF doit être en mesure de synthétiser l'information pour la rendre accessible au management non-financier.",
            "**Compétences en leadership :** Autonome et proactif, le DAF dirige une équipe finance parfois dispersée géographiquement. Il doit inspirer confiance, communiquer clairement et créer une culture de performance au sein de la fonction finance.",
            "**Compétences commerciales :** Le DAF n'est plus enfermé dans son bureau. Il doit comprendre l'activité de l'entreprise, parler le langage des opérationnels et des vendeurs, et aider le management à prendre les meilleures décisions commerciales.",
            "**Agilité technologique :** À l'ère de l'IA et de la cloud, le DAF doit être à l'aise avec les technologies émergentes (automatisation RPA, machine learning, blockchain). Il doit piloter la transformation digitale de la fonction finance.",
            "**Compétences interpersonnelles :** Capacité à travailler avec différents stakeholders (banquiers, investisseurs, experts-comptables, auditeurs, dirigeants d'autres divisions). Écoute active, diplomatie et capacité à construire des consensus.",
          ],
        },
        {
          heading: "Le profil type d'un DAF : expérience et parcours",
          content: [
            "Un DAF senior a généralement 12 à 15 ans d'expérience en finance d'entreprise. Son parcours type débute dans un cabinet d'audit (Deloitte, EY, KPMG, Grant Thornton) où il acquiert une expertise comptable et d'audit solide. Il passe ensuite 8 à 10 ans en tant que contrôleur de gestion ou responsable finance dans 2 ou 3 entreprises de secteurs différents, ce qui lui permet de comprendre différents métiers et de développer une vision stratégique.",
            "Certains DAF ont complété leur formation par un MBA ou un master spécialisé (TFAI, MSF, DFCG). Beaucoup détiennent des certifications comme l'expertise comptable ou le DSCG.",
          ],
        },
        {
          heading: "L'évolution du métier : du contrôleur à l'activateur de croissance",
          content: [
            "Historiquement, le DAF était d'abord un contrôleur : vérifier la conformité, s'assurer que les règles étaient respectées, sécuriser les chiffres. Aujourd'hui, le DAF est un véritable **activateur de croissance**. Il aide le dirigeant à financer la croissance, à optimiser les investissements, à acquérir des concurrents, et à piloter la transformation numérique.",
            "La transformation digitale accélère cette évolution. L'automatisation RPA prend en charge les tâches répétitives (rapprochements bancaires, arrêtés de fin de mois, facturation). Le machine learning aide à prédire les besoins de trésorerie et les risques d'impayés. L'IA générative accélère la production des rapports et des analyses.",
            "Libéré des tâches administratives, le DAF peut se concentrer sur ce qui crée vraiment de la valeur : la stratégie financière, l'accompagnement du business, et la transformation de la fonction finance.",
          ],
        },
        {
          heading: "DAF interne vs DAF externalisé",
          content: [
            "Un DAF interne en CDI coûte entre 80 000 et 150 000€ brut par an, soit environ 116 000 à 217 000€ charges patronales comprises. Recruter un DAF prend 3 à 6 mois. De plus, si le profil ne convient pas, il peut être difficile de changer rapidement.",
            "Chez Iter Advisors, nos DAFs externalisés apportent la même expertise qu'un DAF interne, avec plusieurs avantages : flexibilité (ajuster les jours d'intervention selon vos besoins), coût maîtrisé (2 500 à 4 500€/mois pour un temps partagé), disponibilité immédiate, et expérience multisectorielle.",
            "Pour en savoir plus sur nos formules de DAF externalisé (temps partagé, transition, ou mission ponctuelle), consultez la page **[DAF à temps partagé](/daf-externalise/temps-partage)** ou nos **[tarifs](/daf-externalise/tarifs)**.",
          ],
        },
        {
          heading: "FAQ - Métier de DAF",
          content: [
            "**Quelle est la différence entre un DAF et un Directeur Financier ?** Les deux termes désignent la même fonction en France. Le titre officiel est DAF (Directeur Administratif et Financier), mais certaines entreprises utilisent Directeur Financier ou CFO (Chief Financial Officer).",
            "**Un DAF doit-il impérativement avoir l'expertise comptable ?** Non. Bien que l'expertise comptable soit un avantage, ce n'est pas une obligation. De nombreux DAFs ont un bac+5 (master finance, diplôme d'école de commerce) et acquièrent l'expérience pratique en cabinet d'audit ou en contrôle de gestion.",
            "**Quel est le salaire d'un DAF en 2026 ?** Le salaire brut d'un DAF junior (3-5 ans d'expérience) varie de 50 000 à 70 000€. Un DAF confirmé (10-15 ans) gagne entre 80 000 et 120 000€. Un DAF senior de grand groupe peut atteindre 150 000€+, avec participation aux résultats et stock-options.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    "temps-partage": {
      meta: {
        // T#2 (2026-07-13) — Title recentré sur l'intent exclusif "DAF à
        // temps partagé" (retrait "Tarifs" qui cannibalise /tarifs) +
        // fourchette jours pour signal transactionnel dès le SERP.
        title: "DAF à temps partagé : missions et tarifs 2026",
        description:
          "Un directeur financier à temps partagé, de 2 jours/mois à 3 jours/semaine. Missions, prix réels, démarrage en 2 semaines.",
      },
      parentLabel: "DAF Externalisé",
      parentHref: "/daf-externalise",
      breadcrumbLabel: "DAF à temps partagé",
      // T#1 + T#10 (2026-07-13) — H1 recentré sur intent exclusif "DAF à
      // temps partagé" avec fourchette jours pour aligner avec le title
      // (2-8 j/mois). Retire "votre directeur financier flexible" trop
      // marketing/générique qui cannibalisait avec le pilier.
      h1: "DAF à temps partagé : votre directeur financier senior 2 à 8 jours par mois",
      sections: [
        {
          content: [
            "Le **DAF à temps partagé** est un Directeur Administratif et Financier senior qui intervient régulièrement au sein de votre entreprise, généralement 2 à 3 jours par semaine ou par mois. Contrairement au **[DAF de transition](/daf-externalise/transition)** qui mobilise l'intégralité de sa disponibilité pour une durée limitée, le DAF à temps partagé s'inscrit dans la durée : il suit votre entreprise, apprend vos enjeux, et ajuste progressivement sa contribution.",
            "Cette formule offre un accès permanent à une expertise financière de haut niveau, tout en optimisant les coûts. Elle s'adresse particulièrement aux **PME, startups et scale-ups** qui ont besoin d'une direction financière structurée mais dont l'activité ne justifie pas encore un recrutement à temps plein.",
          ],
        },
        {
          heading: "Comment Fonctionne le DAF à Temps Partagé ?",
          content: [
            "Le DAF à temps partagé s'intègre dans votre organisation comme un membre à part entière de votre équipe de direction. Il participe aux réunions stratégiques, travaille en étroite collaboration avec vos équipes opérationnelles et assure un suivi régulier de votre performance financière.",
            "La fréquence d'intervention est définie selon vos besoins : de 1 à 3 jours par semaine ou par mois. Elle peut être ajustée à la hausse lors de périodes intenses (levée de fonds, clôture annuelle, opérations stratégiques, changement d'ERP) ou à la baisse en phase de croisière.",
            "Concrètement, le DAF à temps partagé met en place une organisation régulière : réunion hebdomadaire ou bimensuelle d'une demi-journée pour faire le point sur la trésorerie, les KPIs financiers et les priorités ; jours de travail autonome sur les chantiers identifiés (budgets, analyses de variance, optimisation des processus, etc.) ; disponibilité pour les échanges urgents par email ou téléphone entre les jours formels.",
          ],
        },
        {
          heading: "Pour Quelles Entreprises ?",
          content: [
            "Le DAF à temps partagé est particulièrement adapté aux **startups post-seed et Série A** qui structurent leur fonction finance pour la première fois et doivent mettre en place des budgets, des tableaux de bord et une conformité fiscale. Aux **PME en croissance** (CA de 5 à 50 millions) qui professionnalisent leur gestion financière sans justifier un DAF à temps plein. Aux **filiales de groupes** qui ont besoin d'un relais financier local pour suivre la performance et consolider les résultats. Aux **entreprises en préparation d'opérations stratégiques** : levée de fonds, M&A, IPO, où la structuration de la finance est clé.",
          ],
        },
        {
          heading: "Les Missions Principales",
          content: [
            "**Pilotage financier et tableaux de bord :** Le DAF à temps partagé met en place les outils de pilotage qui permettent au dirigeant de monitorer sa performance en temps réel : tableau de bord KPI mensuel, analyse de variance (réel vs budget), reporting P&L par produit ou par ligne de business.",
            "**Gestion de la trésorerie :** Prévisions de trésorerie à 3-6 mois, négociation des conditions bancaires, mise en place d'un système de cash management efficace, suivi quotidien des besoins de trésorerie.",
            "**Élaboration des budgets et des prévisions :** Mise en place du processus budgétaire, construction des prévisionnels financiers à 3-5 ans pour la levée de fonds ou la prise de décision stratégique.",
            "**Structure financière et comptabilité :** Mise en place de la comptabilité analytique, refonte des plans comptables si nécessaire, organisation de la clôture mensuelle et annuelle, et conformité fiscale.",
            "**Optimisation des coûts :** Analyse des dépenses, identification des leviers de réduction de coûts (renégociation de contrats, réorganisation de la structure) sans pénaliser la croissance.",
            "**Relations bancaires et financement :** Présentation de la situation financière aux banques, négociation des lignes de crédit, préparation des demandes de financement (crédit d'impôt, subventions).",
          ],
        },
        {
          heading: "Les Avantages du DAF à Temps Partagé",
          content: [
            "**Économie significative :** Le coût d'un DAF à temps partagé représente 20-40% du coût d'un DAF en CDI. Pour 2 jours par mois, comptez 2 500-4 500€ HT/mois au lieu de 80 000-150 000€ brut/an pour un DAF salarié.",
            "**Continuité et connaissance approfondie :** Contrairement à un consultant ponctuel qui intervient une fois et disparaît, le DAF à temps partagé suit votre entreprise dans la durée. Il devient progressivement expert de votre secteur, de vos clients, de vos opérations, de vos défis spécifiques.",
            "**Regard externe et expérience multisectorielle :** Votre DAF travaille avec d'autres entreprises. Il apporte les meilleures pratiques, les benchmarks du secteur, et des idées novatrices issues de ses autres engagements.",
            "**Flexibilité totale :** Vous pouvez ajuster le nombre de jours en fonction de votre croissance. Pas d'engagement sur plusieurs années, résiliation possible avec préavis d'un mois chez Iter Advisors.",
            "**Crédibilité auprès des banques et investisseurs :** Pour une levée de fonds, avoir un DAF structuré (même à temps partagé) renforce votre crédibilité. Les investisseurs savent que vous pilotez vos finances sérieusement.",
          ],
        },
        {
          heading: "DAF à Temps Partagé : la Phase 1",
          content: [
            "Les trois premiers mois d'une mission de DAF à temps partagé sont cruciaux. Le DAF réalise un diagnostic complet de votre situation financière : analyse de la comptabilité existante, constitution du dossier fiscal, identification des risques et des points d'amélioration.",
            "A l'issue de ce diagnostic, vous recevez un rapport détaillé avec les recommandations prioritaires et un plan d'action pour les 12 prochains mois.",
          ],
        },
        {
          heading: "DAF à temps partagé vs CFO Fractional : même métier ?",
          content: [
            "Dans la pratique, le **DAF à temps partagé** est l'équivalent français du **[Fractional CFO](/ressources/glossaire/cfo)** anglo-saxon. Les deux désignent un Directeur Financier senior qui partage son temps entre plusieurs entreprises. La différence est culturelle : on parle plutôt de DAF dans les PME et ETI françaises, et de CFO/Fractional CFO dans les startups et scale-ups internationales.",
            "Que vous cherchiez un **DAF à temps partagé** ou un **CFO Fractional**, la mission est la même : structurer la fonction finance, piloter la trésorerie, accompagner la croissance et préparer les opérations stratégiques (levée de fonds, M&A, IPO). Pour comprendre la nuance, consultez notre [glossaire CFO](/ressources/glossaire/cfo) ou notre comparaison [DAF externalisé vs salarié](/ressources/blog/daf-externalise-vs-daf-salarie).",
          ],
        },
        {
          heading: "Cas concrets : DAF à temps partagé chez Iter Advisors",
          content: [
            "**Startup SaaS Series A (Happy Scribe)** : 4 jours/mois pour structurer le reporting, préparer la Series B et accompagner la consolidation comptable. Économie estimée : 80 000 €/an vs un DAF en CDI.",
            "**PME e-commerce (35 personnes)** : 6 jours/mois pour piloter la trésorerie, optimiser le BFR et négocier les lignes bancaires. Résultat : -25% de BFR en 9 mois, soit 150 000 € de cash libéré.",
            "**Scale-up FinTech** : 8 jours/mois en phase de levée Series B (5 M€ levés). Le **DAF à temps partagé** a construit le modèle financier, animé la data room et négocié le term sheet aux côtés du CEO.",
            "Découvrez d'autres exemples sur notre [page cas clients](/ressources/cas-clients) ou parlez directement à un DAF lors d'un [diagnostic financier gratuit](/contact).",
          ],
        },
        {
          heading: "FAQ - DAF à Temps Partagé",
          content: [
            "**Peut-on passer d'un DAF à temps partagé à un DAF interne ?** Oui, c'est un scénario fréquent. Une fois la structure mise en place, vous pouvez recruter un DAF junior à temps plein et garder le DAF à temps partagé en mode conseil pour quelques jours par trimestre.",
            "**Un DAF à temps partagé peut-il également être DAF de transition sur une autre mission ?** Oui. Chez Iter Advisors, nos DAFs à temps partagé peuvent être mobilisés en mode transition intense pendant 2-3 mois si un besoin urgent surgit chez l'un de leurs clients.",
            "**Quels sont les délais de mise en place ?** Nous pouvons démarrer une mission en 48-72 heures après signature du contrat. Le premier diagnostic prend généralement 4-6 semaines.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    transition: {
      meta: {
        // T#11 (2026-07-13) — Title enrichi avec "management de transition"
        // (intent GSC distinct de "DAF de transition"). La page est déjà
        // en pos 18 sur 3 441 impressions sur "daf de transition" (0
        // conversion). Ajout de la variante lexicale pour capter aussi
        // "management de transition finance" recherchée par les DRH/CEO.
        title: "DAF de transition : un CFO opérationnel sous 15 jours | Iter Advisors",
        description:
          "Remplacement, crise, restructuration : un DAF de transition senior prend le poste en 15 jours. Missions de 3 à 12 mois.",
      },
      parentLabel: "DAF Externalisé",
      parentHref: "/daf-externalise",
      breadcrumbLabel: "DAF de transition",
      // T#12 (2026-07-18) — H1 recentré sur l'intent fiche-métier SERP :
      // "salaire", "missions", "devenir" captent les PAA dominants sur
      // "daf de transition" tout en évitant la cannibalisation pilier.
      h1: "DAF de transition : fiche métier, missions, salaire et devenir",
      sections: [
        {
          // T4 (2026-06-07) — bloc "L'essentiel en 30 secondes" en tête de
          // page (template /daf-externalise). Donne au visiteur les
          // éléments-clés avant qu'il ne décide de continuer à lire.
          heading: "L'essentiel en 30 secondes",
          content: [
            "**Définition.** Un DAF de transition est un Directeur Administratif et Financier senior (12 à 20 ans d'expérience) qui intervient à temps plein dans votre entreprise pour une mission limitée, généralement de 3 à 12 mois.",
            "**Quand faire appel.** Vacance brutale du poste de DAF, crise de trésorerie, restructuration, levée de fonds, M&A, ou transformation digitale de la fonction finance.",
            "**Tarif.** TJM (Taux Journalier Moyen) entre 800 et 1 500 € HT par jour selon la séniorité et la complexité de la mission. À temps plein (20 jours / mois) : 16 000 à 30 000 € HT / mois.",
            "**Délai de démarrage.** 48 à 72 heures après signature du contrat chez Iter Advisors, contre 3 à 6 mois en moyenne pour un recrutement classique.",
            "**Pour qui.** PME en difficulté, ETI en transformation, scale-ups en hyper-croissance, fonds d'investissement (LBO, exit), entreprises familiales en cession.",
          ],
        },
        {
          content: [
            "Le **DAF de transition** est un Directeur Administratif et Financier senior qui intervient à temps plein ou quasi-plein dans une entreprise pour une durée limitée, généralement de 3 à 12 mois. Contrairement au **[DAF à temps partagé](/daf-externalise/temps-partage)** qui s'inscrit dans la durée avec une présence partielle, le DAF de transition mobilise l'intégralité de sa disponibilité pour répondre à une situation d'urgence ou de transformation.",
            "Le **[DAF externalisé](/daf-externalise)** en mode transition est sollicité dans des circonstances précises : départ soudain du DAF en poste, crise de trésorerie, restructuration financière, préparation à une cession ou une acquisition, ou encore accompagnement d'une forte croissance qui dépasse les capacités de l'équipe finance en place.",
          ],
        },
        {
          // T#12 (2026-07-18) — Fiche métier restructurée comme une vraie
          // fiche APEC / Michael Page pour coller à l'intent SERP dominant.
          // Heading "fiche métier complète" pour capter la variante longue.
          heading: "DAF de transition : fiche métier complète",
          content: [
            "Le DAF de transition (Directeur Administratif et Financier de transition) est un cadre dirigeant senior qui intervient à temps plein dans une entreprise pour une mission limitée, généralement de 3 à 12 mois. Son rôle : assurer la continuité de la direction financière dans des situations critiques — départ brutal du DAF, crise de trésorerie, restructuration, préparation à une cession ou à une levée de fonds. Contrairement au DAF à temps partagé qui s'inscrit dans la durée, le DAF de transition mobilise l'intégralité de sa disponibilité pour répondre à une urgence ou à une transformation majeure.",
            "**Fiche de poste — données clés :**",
            "**Intitulé du poste :** DAF de transition — aussi appelé Interim CFO, Manager de transition finance, DAF intérimaire. Cadre dirigeant senior, statut indépendant ou salarié porté.",
            "**Niveau d'expérience :** 12 à 20 ans d'expérience en finance d'entreprise, dont au moins 5 ans en poste de DAF ou Directeur Financier de groupe.",
            "**Durée de mission :** 3 à 12 mois (extensible à 18 mois selon la complexité).",
            "**Temps de travail :** temps plein ou quasi-plein (4 à 5 jours/semaine), contrairement au DAF à temps partagé.",
            "**Rémunération :** TJM 800–1 500 € HT/jour selon la séniorité. À temps plein (20 jours/mois) : 16 000 à 30 000 € HT/mois, soit l'équivalent brut annuel de 180 000 à 350 000 €.",
            "**Délai de mise en place :** 48 à 72 heures chez Iter Advisors — contre 3 à 6 mois pour un recrutement classique.",
            "**Secteurs concernés :** tous secteurs — PME en difficulté, ETI en transformation, scale-ups en hyper-croissance, fonds d'investissement (LBO), entreprises familiales en cession.",
            "**6 missions principales :** (1) audit éclair de la situation financière dès la 1ère semaine ; (2) pilotage de la trésorerie en situation critique (cash-flow, BFR, négociation bancaire) ; (3) sécurisation des reportings financiers et fiscaux (déclarations, clôture) ; (4) préparation d'une levée de fonds ou d'une cession (data room, projections, due diligence) ; (5) accompagnement d'une restructuration ou d'une intégration post-acquisition (plans sociaux, fusion de SI) ; (6) recrutement et passation au DAF successeur.",
            "**Profil recherché :** ex-DAF ou CFO de PME/ETI, souvent ancien associé Big Four, ayant géré 3 à 5 situations de crise. Maîtrise des normes comptables (PCG, IFRS), des ERP (SAP, Cegid, NetSuite) et des outils BI (Power BI, MyReport). Anglais courant requis pour les groupes internationaux.",
            "**Devenir DAF de transition :** la voie classique passe par 10 à 15 ans de direction financière salariée (DAF interne, Head of Finance de scale-up), puis un passage en freelance ou en cabinet de management de transition. Chez Iter Advisors, rejoindre notre vivier de DAFs de transition vous garantit un flux de missions structuré et un accompagnement de vos premières interventions.",
          ],
        },
        {
          heading: "Dans Quels Cas Faire Appel à un DAF de Transition ?",
          content: [
            "**Vacance de Poste :** C'est la situation la plus fréquente. Le DAF en poste démissionne, est en arrêt maladie prolongé, ou part en retraite. Le recrutement d'un successeur prend en moyenne 3 à 6 mois. Pendant cette période, la direction financière ne peut pas rester sans pilote. Le DAF de transition prend le relais immédiatement, assure la continuité des opérations, et peut même participer au recrutement de son successeur.",
            "**Crise de Trésorerie :** Quand une entreprise fait face à une tension de trésorerie sévère - retard de paiement clients, rupture de ligne de crédit, BFR mal maîtrisé - elle a besoin d'un expert financier disponible à temps plein pour gérer la crise. Le DAF de transition analyse la situation, met en place un plan de trésorerie d'urgence, négocie avec les banques et les créanciers, et pilote le retour à l'équilibre.",
            "**Transformation et Restructuration :** Une fusion-acquisition, une restructuration du groupe, ou une transformation digitale de la fonction finance nécessite une expertise et une disponibilité que l'équipe en place n'a pas toujours. Le DAF de transition apporte l'expertise et la bande passante nécessaires pour mener ces projets à bien sans perturber les opérations courantes.",
            "**Préparation à une Levée de Fonds ou une Cession :** La préparation d'une levée de fonds ou d'une cession d'entreprise est un processus intensif. Construire la data room, préparer les projections financières, répondre aux questions des investisseurs ou des acquéreurs - tout cela demande une disponibilité que le DAF à temps partagé ne peut pas toujours offrir. Le DAF de transition prend en charge cette phase critique de bout en bout.",
          ],
        },
        {
          heading: "Les Missions d'un DAF de Transition",
          content: [
            "**Audit et Diagnostic Initial :** La première semaine d'une mission de transition est toujours consacrée à un audit complet de la situation financière. Le DAF de transition analyse les états financiers, évalue la qualité de la comptabilité, identifie les risques immédiats (tensions de trésorerie, litiges fiscaux, engagements hors bilan), et rencontre les parties prenantes clés (banquier, expert-comptable, équipe finance).",
            "À l'issue de cette première semaine, il remet un rapport de diagnostic avec ses recommandations prioritaires et un plan d'action pour les 30 premiers jours.",
            "**Stabilisation des Opérations :** La priorité absolue est de stabiliser les opérations financières : s'assurer que les paiements fournisseurs sont honorés, que les encaissements clients sont suivis, que les déclarations fiscales sont à jour, et que la trésorerie est sous contrôle. Cette phase de stabilisation dure généralement 4 à 8 semaines.",
            "**Transformation et Amélioration :** Une fois les opérations stabilisées, le DAF de transition peut s'attaquer aux chantiers de transformation : mise en place d'outils de pilotage modernes, restructuration des processus financiers, formation de l'équipe en place, ou préparation du dossier pour la levée de fonds.",
            "**Passation et Recrutement :** La mission de transition se termine toujours par une passation soignée. Le DAF de transition documente les processus, forme son successeur, et s'assure que rien n'est perdu dans la transition.",
          ],
        },
        {
          heading: "Durée d'une Mission de DAF de Transition",
          content: [
            "**3 mois** est la durée minimale pour une mission de transition. En dessous, le DAF n'a pas le temps de comprendre l'entreprise, de stabiliser la situation, et de préparer une passation correcte.",
            "**6 mois** est la durée la plus fréquente. Elle permet de couvrir un cycle complet, de mener les principaux chantiers de transformation, et de recruter et former le successeur.",
            "**12 mois** est recommandé pour les situations complexes : restructuration lourde, préparation à une cession, ou transformation digitale de la fonction finance.",
            "Pour en savoir plus sur **[quand recruter un DAF de transition](/ressources/blog/daf-transition-quand)** et les situations qui le justifient, consultez notre guide pratique.",
          ],
        },
        {
          // T4 (2026-06-07) — nouveau H2 ciblant "daf de transition pour eti
          // et pme" (déjà position 10,2 en GSC, cible à renforcer en
          // priorité). Contenu spécifique aux problématiques ETI/PME pour
          // différencier du contenu généraliste.
          heading: "DAF de transition pour ETI et PME",
          content: [
            "Les **ETI (Entreprises de Taille Intermédiaire, 250 à 5 000 salariés)** et les **PME en croissance (50 à 250 salariés)** ont des besoins de DAF de transition très spécifiques qui les distinguent à la fois des grands groupes et des start-ups early-stage.",
            "**Contexte typique en ETI :** restructuration suite à un changement d'actionnariat (LBO, cession familiale), intégration post-acquisition d'une cible, préparation d'une cession ou d'un IPO, refonte de la direction financière après le départ du DAF historique. Ces missions impliquent souvent du multi-entités (filiales, holdings), du multi-pays, et une coordination avec des actionnaires institutionnels (private equity, banques d'investissement). Le DAF de transition apporte une expérience M&A et de gestion de gouvernance que peu de DAF salariés possèdent.",
            "**Contexte typique en PME en croissance :** structuration de la fonction finance qui n'a jamais existé (start-up qui dépasse les 50 salariés et la première levée de Série A), crise de trésorerie liée à une croissance trop rapide (BFR mal piloté), préparation d'une levée de fonds Série B/C. Le DAF de transition stabilise la situation en 30 à 60 jours puis recrute son successeur — souvent un DAF salarié junior qu'il forme avant son départ.",
            "**Délai de démarrage adapté à l'urgence.** Pour une PME en crise de trésorerie ou une ETI en sortie brutale de son DAF, nous mobilisons un profil senior en **48 à 72 heures**. Cette réactivité, impossible avec un recrutement classique (3 à 6 mois minimum), est ce qui distingue un cabinet de management de transition d'un cabinet de recrutement.",
            "**Coût rapporté à la valeur créée.** Pour une ETI de 50 M€ de CA, le coût d'un DAF de transition pendant 6 mois (90 à 180 k€ HT) est largement compensé par la sécurisation des flux financiers, l'évitement d'erreurs fiscales et la valorisation accrue lors d'une cession ou d'une levée. Sur les missions que nous avons menées en 2024-2025, le retour sur investissement médian se situe entre **3x et 8x** le coût de la mission.",
          ],
        },
        {
          heading: "Tarifs d'un DAF de Transition : TJM 2026",
          content: [
            "Le tarif d'un **management de transition finance** est exprimé en TJM (Taux Journalier Moyen). Il est généralement plus élevé que le tarif d'un DAF à temps partagé, car le DAF de transition mobilise l'intégralité de sa disponibilité pour votre entreprise et démarre sous 48-72 heures.",
            "Chez Iter Advisors, nos TJM pour les missions de transition varient entre 800 et 1 500 euros HT par jour, selon le profil du DAF et la complexité de la mission. Pour une mission à temps plein (20 jours par mois), cela représente entre 16 000 et 30 000 euros HT par mois.",
            // Tableau comparatif rendu en prose markdown car DafSubPage
            // utilise ReactMarkdown sans support GFM (pas de <table>).
            // Format choisi : sections **gras** lisibles côté SEO + UX.
            "**Comparatif 2026 — TJM et engagement par modalité d'intervention :**",
            "**1. DAF de transition (Iter Advisors)** — TJM 800 à 1 500 € HT, mission temps plein 3 à 12 mois, démarrage 48-72 h, facturation prestation de services (pas de charges sociales). Adapté à crise, restructuration, transformation, vacance brutale du poste.",
            "**2. DAF à temps partagé (Iter Advisors)** — Forfait mensuel 2 000 à 8 000 € HT (2-8 jours / mois), engagement 12 mois minimum, démarrage 1-2 semaines. Adapté à un besoin récurrent et durable.",
            "**3. DAF intérimaire (agence d'intérim spécialisée)** — TJM 1 100 à 1 800 € HT (avec marge agence ~25-35 %), salarié mis à disposition, démarrage 1-3 semaines. Plus rigide juridiquement, plus coûteux à mission équivalente.",
            "**4. Recrutement DAF salarié senior (cabinet de recrutement)** — Salaire brut annuel 90 000 à 150 000 € + 45 % de charges = coût total empreinte 130 000 à 220 000 € / an. Honoraires de recrutement : 20-30 % du salaire annuel (18-45 k€). Délai de mise en poste : 3 à 6 mois. Engagement long. Adapté quand le besoin est durable et le contexte stable.",
            "**Synthèse.** Pour une crise de 3 à 6 mois, le DAF de transition est 30 à 50 % moins coûteux qu'un DAF intérimaire d'agence et 5 à 10 fois plus rapide à mobiliser qu'un recrutement. Pour un besoin durable de plus de 12 mois, le DAF salarié reste l'option la plus économique à condition d'accepter le délai de recrutement.",
            "Pour une comparaison détaillée des coûts toutes formules confondues, consultez notre page sur les **[tarifs du DAF externalisé](/daf-externalise/tarifs)**.",
          ],
        },
        {
          heading: "DAF de Transition vs DAF Intérimaire",
          content: [
            "Les termes \"DAF de transition\" et \"DAF intérimaire\" sont souvent utilisés de manière interchangeable, mais ils recouvrent des réalités légèrement différentes.",
            "Le **DAF intérimaire** est un salarié mis à disposition par une agence d'intérim spécialisée. Cette formule implique des contraintes administratives et un coût souvent plus élevé en raison de la marge de l'agence.",
            "Le **DAF de transition** chez Iter Advisors est un prestataire indépendant qui intervient dans le cadre d'un contrat de prestation de services. Cette formule est plus flexible, plus rapide à mettre en place, et souvent moins coûteuse.",
          ],
        },
        {
          heading: "Nos Autres Formules d'Intervention",
          content: [
            "Si votre besoin est récurrent et s'inscrit dans la durée, le **[DAF à temps partagé](/daf-externalise/temps-partage)** est plus adapté. Pour comprendre les compétences requises pour ce poste, consultez notre page sur le **[métier de DAF](/daf-externalise/metier)**. Pour une comparaison transparente des coûts, consultez les **[tarifs du DAF externalisé](/daf-externalise/tarifs)**.",
            // T7 partial (2026-06-07) — remplacé le lien cassé
            // /daf-externalise/locaux (404 : la page n'a jamais été créée)
            // par les 3 vraies pages locales existantes (paris, toulouse,
            // barcelone) qui ont chacune leur trafic GSC propre.
            "Nous intervenons dans de nombreux secteurs (**[DAF externalisé par secteur](/daf-externalise/secteurs)**) et dans nos 3 villes d'implantation : **[DAF externalisé à Paris](/daf-externalise-paris)**, **[DAF externalisé à Toulouse](/daf-externalise-toulouse)** et **[DAF externalisé à Barcelone](/daf-externalise-barcelone)**.",
          ],
        },
        {
          heading: "Comment Démarrer une Mission de Transition ?",
          content: [
            "La réactivité est au cœur du DAF de transition. Chez Iter Advisors, nous pouvons démarrer une mission en 48 à 72 heures après la signature du contrat.",
            "**Jour 1 :** Premier appel de qualification pour comprendre la situation et évaluer l'urgence. **Jour 2-3 :** Présentation du DAF proposé au dirigeant. Signature du contrat de prestation. **Jour 4-5 :** Démarrage de la mission. Accès aux systèmes, rencontre avec l'équipe, début de l'audit.",
          ],
        },
        {
          heading: "FAQ - DAF de Transition",
          // T#12 (2026-07-18) — Q3 ajoutée "dans quels cas" pour capter
          // la PAA Google dominante sur "daf de transition". Les Q1/Q2
          // existantes ciblaient "salaire" et "manager de transition" —
          // maintenant les 3 requêtes clés sont couvertes en FAQPage JSON-LD.
          content: [
            "**Quel est le salaire d'un DAF de transition ?** Le DAF de transition se rémunère en TJM (Taux Journalier Moyen) entre 800 et 1 500 € HT par jour. Sur une mission à temps plein (20 jours par mois), cela représente une facturation mensuelle de 16 000 à 30 000 € HT, soit l'équivalent d'un salaire brut annuel de 180 000 à 350 000 € rapporté à un temps plein. Pour un DAF salarié senior en CDI à titre de comparaison, la fourchette est de 90 000 à 150 000 € bruts annuels.",
            "**Quelle est la différence entre un DAF de transition et un manager de transition ?** Le manager de transition est un terme générique qui désigne tout cadre dirigeant intervenant en mode transition (DG, DRH, DAF, DSI...). Le DAF de transition est un manager de transition spécialisé dans la direction financière.",
            "**Dans quels cas fait-on appel à un DAF de transition ?** Six situations déclenchent systématiquement le recours à un DAF de transition : (1) départ brutal ou démission du DAF en poste — la vacance ne peut pas durer 3 à 6 mois ; (2) crise de trésorerie sévère nécessitant un pilotage à temps plein (BFR hors de contrôle, rupture bancaire) ; (3) restructuration ou redressement impliquant banques et créanciers ; (4) préparation à une cession ou un LBO avec data room, audit vendeur et due diligence ; (5) levée de fonds urgente (Série A/B) nécessitant une disponibilité intégrale de 3 à 6 mois ; (6) transformation digitale de la direction financière (migration ERP, refonte des processus). Chez Iter Advisors, nous démarrons sous 48 à 72 heures.",
            "**Le DAF de transition peut-il recruter son successeur ?** Oui, c'est même recommandé. Le DAF de transition connaît les besoins réels du poste et peut aider à définir le profil idéal, participer aux entretiens, et assurer la passation avec le nouveau DAF recruté.",
            "**Peut-on passer d'une mission de transition à un DAF à temps partagé ?** Absolument. C'est même un scénario fréquent : la mission de transition stabilise la situation, puis le DAF reste en mode temps partagé pour assurer la continuité du pilotage financier.",
            "**En combien de temps un DAF de transition peut-il démarrer une mission ?** Chez Iter Advisors, nous démarrons une mission de transition en 48 à 72 heures après la signature du contrat. Notre vivier de DAF seniors disponibles immédiatement permet de répondre aux situations d'urgence — départ brutal, crise de trésorerie, levée de fonds à finaliser — sans le délai de 3 à 6 mois d'un recrutement classique.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    tarifs: {
      meta: {
        // SEO-02 (S31 2026-07-27) — 38 requêtes "prix/tarif/coût/combien
        // coûte" cumulent 5 640 impressions et 2 clics sur 3 mois ; la
        // page ne captait pas la formulation "prix" pourtant en position
        // 6,21 ("prix daf externalisé") et 2,28 ("prix fractional cfo").
        // Title reformulé pour ouvrir sur "Prix" plutôt que "Tarifs".
        title: "Prix d'un DAF externalisé : tarifs 2026 par mission | Iter Advisors",
        description: "Combien coûte un DAF externalisé ? Grille de tarifs par mission et par volume de jours, ce qui fait varier le prix, et comment arbitrer. Devis en 48h.",
      },
      parentLabel: "DAF Externalisé",
      parentHref: "/daf-externalise",
      breadcrumbLabel: "Tarifs",
      h1: "Tarifs DAF Externalisé 2026 : grille de prix et comparatif",
      sections: [
        {
          content: [
            "Combien coûte un DAF externalisé ? C'est souvent la première question que se posent les dirigeants de PME et de startups avant de franchir le pas. La réponse dépend de plusieurs facteurs : la formule choisie (temps partagé, transition ou mission ponctuelle), le nombre de jours d'intervention par mois, et la complexité de la situation financière de l'entreprise.",
            // SEO-02 (2026-07-01) — Cross-link intention. Cette page = grille
            // tarifaire officielle (intention commerciale). Le blog article
            // dédié = guide informationnel avec méthodologie et ROI calculator.
            // Séparation claire des intentions pour éviter la cannibalisation.
            "Chez Iter Advisors, nous avons fait le choix de la transparence totale sur nos tarifs. Cette page présente notre **grille de prix officielle 2026**, les facteurs qui influencent le coût, et une comparaison avec les alternatives (recrutement d'un DAF salarié, consultant financier, expert-comptable). Pour un **guide informationnel complet avec méthodologie de comparaison, calcul de ROI et analyse marché**, consultez notre article dédié : [Combien coûte un DAF externalisé en 2026 : tarifs, grille de prix et ROI](/ressources/blog/cout-daf-externalise-tarifs-prix-2026).",
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
    secteurs: {
      meta: {
        title: "DAF externalisé par secteur en 2026 | Iter Advisors",
        description:
          "DAF externalisé spécialisé par secteur (SaaS, e-commerce, industrie, fintech, santé). Notre expertise sectorielle adaptée à votre métier.",
      },
      parentLabel: "DAF Externalisé",
      parentHref: "/daf-externalise",
      breadcrumbLabel: "DAF par secteur",
      h1: "DAF Externalisé par Secteur : notre expertise sectorielle",
      sections: [
        {
          content: [
            "Chaque secteur d'activité a ses spécificités financières. Une startup **SaaS** n'a pas les mêmes enjeux qu'une **ETI industrielle** ou une plateforme **e-commerce**. Les cycles de vente sont différents, les modèles économiques varient, les risques ne sont pas les mêmes.",
            "Chez Iter Advisors, nos DAFs externalisés disposent d'une expertise sectorielle approfondie. Ils comprennent votre métier, vos défis spécifiques, et les bonnes pratiques de votre industrie.",
          ],
        },
        {
          heading: "DAF Externalisé pour Startups & SaaS",
          content: [
            "Les startups SaaS ont des enjeux financiers spécifiques : modèle d'abonnement, churn client, LTV/CAC ratio, burn rate, runway. Notre DAF externalisé pour SaaS maîtrise ces KPIs, aide à optimiser le modèle économique, et prépare les levées de fonds successives.",
          ],
        },
        {
          heading: "DAF Externalisé pour E-Commerce",
          content: [
            "Les plateformes e-commerce connaissent des cycles financiers particuliers : saisonnalité, gestion du stock et du BFR, marges fines sur les ventes. Notre expertise aide à piloter la profitabilité malgré les contraintes de trésorerie inhérentes au secteur.",
          ],
        },
        {
          heading: "DAF Externalisé pour l'Industrie & ETI",
          content: [
            "Les entreprises industrielles et les ETI ont besoin d'un DAF qui comprenne la complexité opérationnelle : production, supply chain, risques de change. Nos DAFs externalisés pour l'industrie apportent cette expertise.",
          ],
        },
        {
          heading: "DAF Externalisé pour Fintech & Finance",
          content: [
            "Les entreprises fintech opèrent dans un cadre réglementaire strict. Notre DAF externalisé pour fintech maîtrise la conformité, les reporting réglementaires, et les enjeux de trésorerie en temps réel.",
          ],
        },
        {
          heading: "DAF Externalisé pour Santé & Biotech",
          content: [
            "Les entreprises de santé et biotech font face à des cycles longs de R&D, des cycles de remboursement complexes, et des enjeux réglementaires importants. Notre expertise aide à piloter la performance dans cet environnement.",
          ],
        },
        {
          heading: "Contactez-Nous",
          content: [
            "Vous recherchez un DAF externalisé spécialisé dans votre secteur ? Nos consultants sauront vous proposer le profil idéal. Consultez également nos autres pages : **[DAF à temps partagé](/daf-externalise/temps-partage)**, **[DAF de transition](/daf-externalise/transition)**, **[métier de DAF](/daf-externalise/metier)**, et **[tarifs](/daf-externalise/tarifs)**.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    ecommerce: {
      meta: {
        title: "DAF Externalisé E-Commerce : Pilotez Votre Profitabilité | Iter Advisors",
        description:
          "DAF externalisé spécialisé e-commerce : gestion du BFR, saisonnalité, marges produits, trésorerie. Intervention dès 2 jours/mois.",
      },
      parentLabel: "DAF Externalisé",
      parentHref: "/daf-externalise",
      breadcrumbLabel: "DAF E-Commerce",
      h1: "DAF Externalisé pour E-Commerce : Pilotez Votre Profitabilité",
      sections: [
        {
          content: [
            "Le e-commerce est l'un des secteurs où la trésorerie est la plus volatile. Chez Iter Advisors, nos DAFs externalisés spécialisés e-commerce interviennent dès 2 jours/mois.",
          ],
        },
        {
          heading: "Les défis financiers du e-commerce",
          content: [
            "**Saisonnalité :** Le e-commerce connaît des pics (Black Friday, Noël) nécessitant un financement du stock 2 à 3 mois à l'avance. Notre DAF anticipe ces besoins.",
            "**BFR :** Notre DAF optimise la rotation du stock, négocie les conditions de règlement et étudie l'affacturage sélectif.",
            "**Marges produits :** Construction d'un P&L par produit, par canal (site propre, Amazon, marketplaces) et par segment client.",
            "**TVA internationale :** Conformité OSS, TVA par pays européen, optimisation de la trésorerie en devises.",
          ],
        },
        {
          heading: "Nos missions DAF e-commerce",
          content: [
            "**Prévisionnel de trésorerie :** Modélisation 13 semaines glissantes pour anticiper les besoins avant chaque pic.",
            "**Financement du stock :** Négociation banques + solutions fintech (Karmen, Silvr).",
            "**Dashboard :** KPIs financiers (marge brute, EBITDA, cash conversion cycle) + opérationnels (LTV, CAC, taux retour).",
            "Découvrez aussi : **[DAF externalisé](/daf-externalise)**, **[DAF industrie](/daf-externalise/industrie)**, **[DAF Deep Tech](/daf-externalise/deep-tech)**, **[tarifs](/daf-externalise/tarifs)**.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    industrie: {
      meta: {
        title: "DAF Externalisé Industrie & ETI : Expertise Opérationnelle | Iter Advisors",
        description:
          "DAF externalisé pour ETI et entreprises industrielles : contrôle de gestion, supply chain, risques de change, M&A.",
      },
      parentLabel: "DAF Externalisé",
      parentHref: "/daf-externalise",
      breadcrumbLabel: "DAF Industrie",
      h1: "DAF Externalisé Industrie : Expertise Financière pour ETI et PMI",
      sections: [
        {
          content: [
            "Les entreprises industrielles font face à des enjeux financiers que seul un DAF ayant une expérience industrielle peut maîtriser : contrôle analytique, CAPEX, risques de change, M&A. Iter Advisors intervient dès 2 jours/mois.",
          ],
        },
        {
          heading: "Les enjeux financiers de l'industrie",
          content: [
            "**Contrôle analytique :** P&L par ligne de produits, par client et par unité de production pour identifier les marges réelles.",
            "**CAPEX :** Business cases, financement (crédit-bail, BEI, subventions, CIR/CII) et suivi des ROI.",
            "**BFR :** Optimisation du cycle de trésorerie et négociation avec la chaîne d'approvisionnement.",
            "**Change :** Politique de couverture adaptée (forward, options) pour les industriels exportateurs.",
            "**M&A :** Due diligences, plans de financement et post-merger integration.",
          ],
        },
        {
          heading: "Notre approche",
          content: [
            "Iter Advisors accompagne des PMI et ETI dans toute la France et en Europe : aéronautique, plasturgie, métallurgie, agroalimentaire. En complément : **[DAF externalisé](/daf-externalise)**, **[DAF e-commerce](/daf-externalise/ecommerce)**, **[DAF Deep Tech](/daf-externalise/deep-tech)**.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    "deep-tech": {
      meta: {
        title: "DAF Externalisé Deep Tech & Biotech : Levée de Fonds & R&D | Iter Advisors",
        description:
          "DAF externalisé spécialisé deep tech, biotech et hardware : CIR/CII, levée de fonds Series A/B, data room, valorisation. 30+ tours accompagnés.",
      },
      parentLabel: "DAF Externalisé",
      parentHref: "/daf-externalise",
      breadcrumbLabel: "DAF Deep Tech",
      h1: "DAF Externalisé Deep Tech : Levée de Fonds et Pilotage R&D",
      sections: [
        {
          content: [
            "Les deep tech ont des cycles de développement longs, des besoins de financement importants et des investisseurs exigeants. Iter Advisors a accompagné 30+ tours de financement deep tech pour 100 M€+ levés.",
          ],
        },
        {
          heading: "Spécificités financières de la deep tech",
          content: [
            "**CIR/CII :** Le Crédit d'Impôt Recherche représente 15 à 30 % du financement en phase R&D. Notre DAF sécurise l'éligibilité et maximise l'assiette déclarée.",
            "**Subventions :** BPI France, Horizon Europe, DGA, ANR — notre DAF identifie les appels à projets et pilote le reporting.",
            "**Valorisation :** Modèles financiers robustes (DCF, comparables, option pricing biotech) pour crédibiliser la valorisation face aux VCs.",
            "**Due diligence :** Préparation de la data room et accompagnement jusqu'au closing.",
          ],
        },
        {
          heading: "Notre accompagnement phase par phase",
          content: [
            "**Pré-levée :** Modèle financier, data room, révision des KPIs, optimisation du cap table.",
            "**Pendant la levée :** Due diligences, Q&A VCs, négociation du term sheet.",
            "**Post-levée :** Reporting, budget annuel, pilotage du burn rate.",
            "En complément : **[DAF externalisé](/daf-externalise)**, **[levée de fonds](/services/accompagnement-levee-de-fond)**, **[tarifs](/daf-externalise/tarifs)**.",
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
        title: "Part-time CFO for SMEs & Startups | Iter Advisors",
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
        title: "Transitional CFO: Expert for Key Periods | Iter Advisors",
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
            "Part-time CFO Formula: 1 day/month €1,500-2,500; 2 days/month €2,500-4,500 (most popular); 3-4 days/month €4,500-8,000.",
            "Transition CFO Formula: €800-1,500 daily rate, or €16,000-30,000/month full-time.",
            "Specific Mission: €800-1,200 daily rate for audits, financial models, or treasury reviews.",
          ],
        },
        {
          heading: "What Affects the Price?",
          content: [
            "CFO experience: A CFO with 5 years experience costs less than one with 20 years. Our associates all have 10+ years experience.",
            "Complexity: Simple accounting with one entity costs less than multi-country structures with currency operations.",
            "Industry: SaaS, e-commerce, or biotech may require specialized expertise with higher rates.",
            "Location: Paris rates are typically 10-20% higher than other regions.",
          ],
        },
        {
          heading: "Comparison with Alternatives",
          content: [
            "Outsourced CFO vs In-house CFO: Full-time CFO costs €80,000-150,000 gross/year (€116,000-217,000 with benefits). Part-time outsourced CFO at 2 days/month costs €2,500-4,500/month = 3-7x less. Plus full flexibility.",
            "Outsourced CFO vs Accounting Firm: Accounting firms ensure legal compliance. CFOs drive daily financial performance. Most structured SMEs use both.",
            "Outsourced CFO vs Financial Consultant: Consultants handle one project then leave. CFOs build ongoing relationships and know your business.",
          ],
        },
        {
          heading: "How Does Billing Work?",
          content: [
            "We establish a service agreement specifying intervention days per month, monthly rate, and 30-day notice for termination. Invoicing is monthly with net-30 payment terms. No hidden fees, no minimum commitment beyond first month.",
          ],
        },
        {
          heading: "Get a Custom Quote",
          content: [
            "For a personalized quote, contact us for a 30-minute call to discuss your needs and financial situation. We'll send a detailed proposal within 48 hours.",
          ],
        },
        {
          heading: "FAQ - Outsourced CFO Pricing",
          content: [
            "Is the fee tax deductible? Yes. CFO fees are operating expenses deductible from taxable income.",
            "Can we negotiate? Our rates are market-based and transparent. We can adjust intervention days to fit your budget, but not the daily rate.",
            "Minimum commitment? No. Contracts are cancellable with 30 days notice. We prefer to earn your trust through quality work.",
            "Do travel costs count? For in-person work, travel is billed at cost. Remote work has no additional fees.",
          ],
        },
      ],
      ctaButton: "Make an appointment",
    },
    secteurs: {
      meta: {
        title: "Outsourced CFO by Industry | Iter Advisors",
        description:
          "Specialized CFO services by industry (SaaS, e-commerce, manufacturing, fintech, healthcare). Industry-specific financial expertise.",
      },
      parentLabel: "CFO Outsourced",
      parentHref: "/en/fractional-cfo",
      breadcrumbLabel: "CFO by industry",
      h1: "Outsourced CFO by Industry: Our sectoral expertise",
      sections: [
        {
          content: [
            "Each industry has unique financial challenges. A SaaS startup has different financial priorities than a manufacturing company or e-commerce platform. Sales cycles differ, business models vary, and risks are distinct.",
            "At Iter Advisors, our outsourced CFOs bring deep industry expertise. They understand your business, your specific challenges, and best practices in your sector.",
          ],
        },
        {
          heading: "Outsourced CFO for Startups & SaaS",
          content: [
            "SaaS startups face specific financial challenges: subscription models, customer churn, LTV/CAC ratio, burn rate, runway. Our SaaS CFO masters these KPIs and helps optimize your business model.",
          ],
        },
        {
          heading: "Outsourced CFO for E-Commerce",
          content: [
            "E-commerce platforms face unique cycles: seasonality, inventory and working capital management, thin margins. Our expertise helps you navigate these challenges profitably.",
          ],
        },
        {
          heading: "Outsourced CFO for Manufacturing & Mid-Market",
          content: [
            "Industrial companies need CFOs who understand operational complexity: production, supply chain, currency risks. Our manufacturing CFO brings this expertise.",
          ],
        },
        {
          heading: "Outsourced CFO for Fintech & Finance",
          content: [
            "Fintech companies operate in strict regulatory environments. Our fintech CFO masters compliance, regulatory reporting, and real-time treasury management.",
          ],
        },
        {
          heading: "Outsourced CFO for Healthcare & Biotech",
          content: [
            "Healthcare and biotech companies face long R&D cycles and complex reimbursement models. Our expertise helps you navigate these specialized challenges.",
          ],
        },
        {
          heading: "Contact Us",
          content: [
            "Looking for an industry-specialized CFO? Our consultants will recommend the ideal profile. Also see our Part-time CFO, Transition CFO, CFO Role, and Pricing pages.",
          ],
        },
      ],
      ctaButton: "Make an appointment",
    },
    ecommerce: {
      meta: {
        title: "Outsourced CFO for E-Commerce: Manage Profitability | Iter Advisors",
        description:
          "Fractional CFO for e-commerce: working capital, seasonality, product margins, cash flow. From 2 days/month.",
      },
      parentLabel: "Fractional CFO",
      parentHref: "/en/fractional-cfo",
      breadcrumbLabel: "CFO for E-Commerce",
      h1: "Outsourced CFO for E-Commerce: Manage Your Profitability",
      sections: [
        { content: ["Iter Advisors' fractional CFOs for e-commerce step in from 2 days/month to provide specialized financial expertise."] },
        {
          heading: "Our E-Commerce CFO Missions",
          content: [
            "**Cash flow forecast:** 13-week rolling modeling for seasonal peaks.",
            "**Working capital optimization:** Supplier terms, returns, marketplace disputes. Average 15-25% WC reduction.",
            "**E-commerce dashboard:** Gross margin, EBITDA, LTV, CAC, return rate.",
          ],
        },
        { heading: "Contact Us", content: ["See also **[Fractional CFO](/en/fractional-cfo)** and industry specializations."] },
      ],
      ctaButton: "Make an appointment",
    },
    industrie: {
      meta: {
        title: "Outsourced CFO for Manufacturing & Industrial Companies | Iter Advisors",
        description:
          "Fractional CFO for manufacturing: cost accounting, supply chain, FX risk, M&A. Proven sector expertise.",
      },
      parentLabel: "Fractional CFO",
      parentHref: "/en/fractional-cfo",
      breadcrumbLabel: "CFO for Industry",
      h1: "Outsourced CFO for Industrial Companies",
      sections: [
        { content: ["Iter Advisors' specialized industrial CFOs step in from 2 days/month."] },
        {
          heading: "Our Industrial CFO Missions",
          content: [
            "**Cost-center analytics:** Product-line profitability, margin tracking.",
            "**CAPEX management:** Business case structuring, financing, ROI monitoring.",
            "**Working capital:** Inventory cycle, supplier/customer terms.",
            "**M&A:** Due diligence, financing, post-merger integration.",
          ],
        },
        { heading: "Contact Us", content: ["See also **[Fractional CFO](/en/fractional-cfo)**."] },
      ],
      ctaButton: "Make an appointment",
    },
    "deep-tech": {
      meta: {
        title: "Outsourced CFO for Deep Tech & Biotech: Fundraising & R&D | Iter Advisors",
        description:
          "Fractional CFO for deep tech: R&D tax credits, Series A/B fundraising, due diligence. 30+ rounds closed.",
      },
      parentLabel: "Fractional CFO",
      parentHref: "/en/fractional-cfo",
      breadcrumbLabel: "CFO for Deep Tech",
      h1: "Outsourced CFO for Deep Tech: Fundraising & R&D Finance",
      sections: [
        { content: ["Iter Advisors has supported 30+ fundraising rounds in deep tech companies, totaling over €100M raised."] },
        {
          heading: "Our Deep Tech CFO Missions",
          content: [
            "**Pre-raise:** Financial model, data room, KPI review, cap table.",
            "**During raise:** Due diligences, VC Q&A, term sheet negotiation.",
            "**R&D tax credits:** CIR/CII filing, BPI grants, Horizon Europe.",
            "**Post-raise:** Reporting, annual budget, burn rate monitoring.",
          ],
        },
        { heading: "Contact Us", content: ["See also **[Fractional CFO](/en/fractional-cfo)** and **[fundraising support](/services/accompagnement-levee-de-fond)**."] },
      ],
      ctaButton: "Make an appointment",
    },
  },
  es: {
    metier: {
      meta: {
        title: "¿Qué es un Director Financiero? | Iter Advisors",
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
        title: "CFO a tiempo compartido — Pymes y Startups | Iter Advisors",
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
        title: "CFO de transición — Experto períodos clave | Iter Advisors",
        description:
          "El CFO de transición interviene en periodos críticos: reestructuración, rondas de financiación, reemplazo temporal. Consulte a Iter Advisors.",
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
            "Fórmula DAF a Tiempo Compartido: 1 día/mes €1.500-2.500; 2 días/mes €2.500-4.500 (más solicitada); 3-4 días/mes €4.500-8.000.",
            "Fórmula DAF de Transición: €800-1.500 diarios, o €16.000-30.000/mes a tiempo completo.",
            "Misión Puntual: €800-1.200 diarios para auditorías, modelos financieros, o revisiones de tesorería.",
          ],
        },
        {
          heading: "¿Qué Afecta al Precio?",
          content: [
            "Experiencia del DAF: Un DAF con 5 años cuesta menos que uno con 20. Nuestros asociados tienen 10+ años.",
            "Complejidad: Contabilidad simple con una entidad cuesta menos que estructuras multi-país con operaciones en divisas.",
            "Sector: SaaS, e-commerce o biotech pueden requerir especialización con tarifas más altas.",
            "Ubicación: Tarifas en París típicamente 10-20% superiores a otras regiones.",
          ],
        },
        {
          heading: "Comparativa con Alternativas",
          content: [
            "DAF externalizado vs DAF a tiempo completo: DAF a tiempo completo cuesta €80.000-150.000 brutos/año (€116.000-217.000 con costes sociales). DAF externalizado a 2 días/mes cuesta €2.500-4.500/mes = 3-7 veces menos. Además, flexibilidad total.",
            "DAF externalizado vs Despacho contable: Los despachos garantizan conformidad legal. Los DAFs impulsan desempeño financiero diario. PYMEs estructuradas típicamente usan ambos.",
            "DAF externalizado vs Consultor financiero: Los consultores manejan un proyecto y se van. Los DAFs construyen relaciones continuas y conocen su negocio.",
          ],
        },
        {
          heading: "¿Cómo Funciona la Facturación?",
          content: [
            "Establecemos un acuerdo de servicios especificando días de intervención por mes, tarifa mensual, y 30 días de preaviso para terminación. Facturación mensual con pago neto-30. Sin cuotas ocultas, sin compromiso mínimo más allá del primer mes.",
          ],
        },
        {
          heading: "Obtenga un Presupuesto Personalizado",
          content: [
            "Para un presupuesto personalizado, contáctenos para una llamada de 30 minutos donde discutiremos sus necesidades y situación financiera. Enviaremos una propuesta detallada en 48 horas.",
          ],
        },
        {
          heading: "FAQ - Tarifas del DAF Externalizado",
          content: [
            "¿Es la tarifa deducible fiscalmente? Sí. Los honorarios de un DAF externalizado son gastos de explotación deducibles de la base imponible.",
            "¿Podemos negociar? Nuestras tarifas son basadas en mercado y transparentes. Podemos ajustar días de intervención a su presupuesto, pero no negociamos la tarifa diaria.",
            "¿Compromiso mínimo? No. Los contratos son resolubles con 30 días de preaviso. Preferimos ganar su confianza mediante trabajo de calidad.",
            "¿Incluyen costes de desplazamiento? Para trabajo presencial, viajes se facturan a coste real. Trabajo remoto sin cuotas adicionales.",
          ],
        },
      ],
      ctaButton: "Concierte una cita",
    },
    secteurs: {
      meta: {
        title: "DAF Externalizado por Sector de Actividad | Iter Advisors",
        description:
          "DAF externalizado especializado por sector (SaaS, e-commerce, industria, fintech, sanidad). Experiencia sectorial adaptada a su negocio.",
      },
      parentLabel: "CFO Externalizado",
      parentHref: "/es/externalizacion-daf",
      breadcrumbLabel: "DAF por sector",
      h1: "DAF Externalizado por Sector: nuestra experiencia sectorial",
      sections: [
        {
          content: [
            "Cada sector de actividad tiene desafíos financieros únicos. Una startup SaaS no tiene las mismas prioridades que una empresa industrial o plataforma e-commerce. Ciclos de venta diferentes, modelos económicos variados, riesgos distintos.",
            "En Iter Advisors, nuestros DAFs externalizados cuentan con experiencia sectorial profunda. Entienden su negocio, sus desafíos específicos, y las mejores prácticas de su industria.",
          ],
        },
        {
          heading: "DAF Externalizado para Startups & SaaS",
          content: [
            "Las startups SaaS enfrentan desafíos financieros específicos: modelos de suscripción, churn de clientes, ratio LTV/CAC, burn rate, runway. Nuestro DAF para SaaS domina estos KPIs y ayuda a optimizar el modelo económico.",
          ],
        },
        {
          heading: "DAF Externalizado para E-Commerce",
          content: [
            "Las plataformas e-commerce enfrentan ciclos únicos: estacionalidad, gestión de stock y BFR, márgenes finos. Nuestra experiencia ayuda a pilotar rentabilidad a pesar de restricciones de tesorería.",
          ],
        },
        {
          heading: "DAF Externalizado para Industria & PYMEs",
          content: [
            "Empresas industriales y PYMEs necesitan DAF que entienda complejidad operacional: producción, cadena de suministro, riesgos de cambio. Nuestro DAF industrial trae esta experiencia.",
          ],
        },
        {
          heading: "DAF Externalizado para Fintech & Finanzas",
          content: [
            "Empresas fintech operan en marcos regulatorios estrictos. Nuestro DAF para fintech domina conformidad, reporting regulatorio, y gestión de tesorería en tiempo real.",
          ],
        },
        {
          heading: "DAF Externalizado para Sanidad & Biotech",
          content: [
            "Empresas de sanidad y biotech enfrentan ciclos largos de I+D y modelos complejos de reembolso. Nuestra experiencia ayuda a navegar estos desafíos especializados.",
          ],
        },
        {
          heading: "Contáctenos",
          content: [
            "¿Busca un DAF externalizado especializado en su sector? Nuestros consultores recomendarán el perfil ideal. Vea también nuestras páginas de DAF a Tiempo Compartido, DAF de Transición, Rol de DAF, y Tarifas.",
          ],
        },
      ],
      ctaButton: "Concierte una cita",
    },
    ecommerce: {
      meta: {
        title: "DAF Externalizado E-Commerce: Controle su Rentabilidad | Iter Advisors",
        description:
          "DAF externalizado para e-commerce: gestión del circulante, estacionalidad, márgenes. Desde 2 días/mes.",
      },
      parentLabel: "CFO Externalizado",
      parentHref: "/es/externalizacion-daf",
      breadcrumbLabel: "DAF E-Commerce",
      h1: "DAF Externalizado para E-Commerce: Controle su Rentabilidad",
      sections: [
        { content: ["Los DAF externalizados de Iter Advisors especializados en e-commerce intervienen desde 2 días/mes."] },
        {
          heading: "Nuestras misiones DAF e-commerce",
          content: [
            "**Previsión de tesorería:** 13 semanas deslizantes para anticipar picos estacionales.",
            "**Optimización del circulante:** Plazos de pago, devoluciones, litigios con marketplaces.",
            "**Cuadro de mando:** Margen bruto, EBITDA, LTV, CAC, tasa de devolución.",
          ],
        },
        { heading: "Contáctenos", content: ["Vea también **[DAF Externalizado](/es/externalizacion-daf)**."] },
      ],
      ctaButton: "Concierte una cita",
    },
    industrie: {
      meta: {
        title: "DAF Externalizado Industria y ETI: Experiencia Operacional | Iter Advisors",
        description:
          "DAF externalizado para empresas industriales: control de gestión, supply chain, riesgo de cambio, M&A.",
      },
      parentLabel: "CFO Externalizado",
      parentHref: "/es/externalizacion-daf",
      breadcrumbLabel: "DAF Industria",
      h1: "DAF Externalizado Industria: Experiencia Financiera para ETI y PYME",
      sections: [
        { content: ["Los DAF externalizados de Iter Advisors especializados en industria intervienen desde 2 días/mes."] },
        {
          heading: "Nuestras misiones DAF industrial",
          content: [
            "**Control analítico:** Rentabilidad por línea de producto, seguimiento de márgenes.",
            "**CAPEX:** Business cases, financiación, seguimiento del ROI.",
            "**Circulante:** Ciclo de inventario, negociación de plazos.",
            "**M&A:** Due diligences, estructuración de financiación.",
          ],
        },
        { heading: "Contáctenos", content: ["Vea también **[DAF Externalizado](/es/externalizacion-daf)**."] },
      ],
      ctaButton: "Concierte una cita",
    },
    "deep-tech": {
      meta: {
        title: "DAF Externalizado Deep Tech & Biotech: Rondas de Financiación | Iter Advisors",
        description:
          "DAF externalizado para deep tech: créditos I+D, Series A/B, due diligence, valoración. +30 rondas cerradas.",
      },
      parentLabel: "CFO Externalizado",
      parentHref: "/es/externalizacion-daf",
      breadcrumbLabel: "DAF Deep Tech",
      h1: "DAF Externalizado Deep Tech: Financiación e I+D",
      sections: [
        { content: ["Iter Advisors ha acompañado más de 30 rondas de financiación en empresas deep tech, por más de 100 M€ captados."] },
        {
          heading: "Nuestras misiones DAF Deep Tech",
          content: [
            "**Pre-ronda:** Modelo financiero, data room, revisión de KPIs.",
            "**Durante la captación:** Due diligences, Q&A con VCs, negociación del term sheet.",
            "**Créditos I+D:** Deducciones fiscales, subvenciones BPI, Horizon Europe.",
            "**Post-ronda:** Informes, presupuesto anual, burn rate.",
          ],
        },
        { heading: "Contáctenos", content: ["Vea también **[DAF Externalizado](/es/externalizacion-daf)** y captación de fondos."] },
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
    tarifs: "tarifs",
    secteurs: "secteurs",
    ecommerce: "ecommerce",
    industrie: "industrie",
    "deep-tech": "deep-tech",
  },
  en: {
    metier: "metier",
    "shared-time": "temps-partage",
    transition: "transition",
    pricing: "tarifs",
    industries: "secteurs",
    ecommerce: "ecommerce",
    industrie: "industrie",
    "deep-tech": "deep-tech",
  },
  es: {
    metier: "metier",
    ecommerce: "ecommerce",
    industrie: "industrie",
    "deep-tech": "deep-tech",
    // Audit V2 R-4: ES URL renamed multipropiedad → tiempo-compartido.
    // Legacy "multipropiedad" key retained as fallback for any direct hits
    // until the 301 in vercel.json fully takes over.
    "tiempo-compartido": "temps-partage",
    multipropiedad: "temps-partage",
    transition: "transition",
    tarifas: "tarifs",
    sectores: "secteurs",
  },
};

export function getDafSubContent(locale: Locale, urlSlug: string): DafSubContent | undefined {
  const key = slugMapping[locale]?.[urlSlug];
  if (!key) return undefined;
  return dafSubContent[locale][key];
}
