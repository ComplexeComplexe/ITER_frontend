import { Locale } from "../i18n";

export type GlossaryEntrySlug =
  | "bfr"
  | "ebitda"
  | "cfo"
  // TICKET 21 — 8 nouvelles pages glossaire dédiées
  | "besoin-fonds-roulement-bfr"
  | "cash-burn-runway"
  | "cac-ltv"
  | "arr-mrr"
  | "churn-rate"
  | "run-rate"
  | "bspce-bsa"
  // EC-02 — 4 nouvelles pages glossaire (DAF, DRH, contrôle de gestion, fractional CFO)
  | "daf"
  | "drh-externalise"
  | "controle-de-gestion"
  | "fractional-cfo";

export interface GlossaryEntryContent {
  meta: {
    title: string;
    description: string;
  };
  h1: string;
  sections: {
    heading?: string;
    content: string[];
  }[];
  ctaButton: string;
}

export const glossaryEntries: Record<Locale, Partial<Record<GlossaryEntrySlug, GlossaryEntryContent>>> = {
  fr: {
    bfr: {
      meta: {
        title: "BFR : Définition, Calcul et Optimisation | Iter Advisors",
        description:
          "Besoin en Fonds de Roulement (BFR) : définition, formule de calcul, et stratégies d'optimisation pour améliorer votre trésorerie.",
      },
      h1: "BFR (Besoin en Fonds de Roulement) : définition et calcul",
      sections: [
        {
          content: [
            "Le **BFR** (Besoin en Fonds de Roulement) est l'un des indicateurs financiers les plus importants à maîtriser pour un entrepreneur. Il représente le montant de trésorerie que votre entreprise doit immobiliser pour financer l'écart entre le moment où vous payez vos fournisseurs et le moment où vous percevez l'argent de vos clients.",
            "Contrairement au résultat comptable (qui peut être positif sur le papier), le BFR est une réalité cash : c'est la trésorerie qui « s'échappe » de votre compte bancaire chaque mois.",
          ],
        },
        {
          heading: "Définition du BFR",
          content: [
            "Le BFR se calcule selon la formule suivante :",
            "**BFR = (Stocks + Créances clients) - (Dettes fournisseurs + Dettes fiscales et sociales)**",
            "En d'autres termes, le BFR mesure l'écart entre vos ressources court terme (ce que vous devez payer) et vos besoins court terme (ce que vous devez attendre de recevoir).",
            "Un BFR positif signifie que vous devez financer cet écart avec de la trésorerie. Un BFR négatif (rare mais possible dans les modèles e-commerce) signifie que vous recevez l'argent de vos clients avant de payer vos fournisseurs.",
          ],
        },
        {
          heading: "Composantes du BFR",
          content: [
            "**Stock :** Durée moyenne pendant laquelle vos produits restent en stock avant vente. Un fabricant avec 30 jours de stock immobilise plus de trésorerie qu'un SaaS avec zéro stock.",
            "**Délai client (DSO - Days Sales Outstanding) :** Nombre de jours avant que vos clients ne paient leurs factures. Si vous facturez en net-30 mais vos clients paient en net-60, vous attendez 60 jours.",
            "**Délai fournisseur (DPO - Days Payable Outstanding) :** Nombre de jours avant que vous payiez vos fournisseurs. Si vous payez en net-30, c'est 30 jours.",
          ],
        },
        {
          heading: "Pourquoi le BFR est Critique",
          content: [
            "Un BFR mal maîtrisé est l'une des principales causes de crise de trésorerie, même pour des entreprises rentables. Imaginez une startup SaaS qui croît 50% par an : son chiffre d'affaires (et donc ses créances clients) augmente 50%, ce qui augmente son BFR de 50%. Soudain, vous avez besoin de beaucoup plus de trésorerie pour financer cette croissance.",
            "C'est pour cette raison qu'une levée de fonds est souvent nécessaire lors d'une croissance rapide : non pas pour payer les déficits, mais pour financer l'augmentation du BFR liée à la croissance.",
          ],
        },
        {
          heading: "Comment Réduire Votre BFR",
          content: [
            "**Négocier des délais fournisseur plus longs :** Si vous passez de net-30 à net-60 avec vos fournisseurs, vous libérez 30 jours de trésorerie. C'est du cash gratuit.",
            "**Réduire les délais clients :** Facturer à réception, proposer une réduction pour paiement comptant, ou utiliser l'affacturage pour recevoir rapidement votre argent.",
            "**Optimiser les stocks :** Un BFR trop élevé peut indiquer que vous achetez trop de stock ou que vous avez du stock mort. La méthode Kanban ou le just-in-time aident à réduire les stocks immobilisés.",
            "**Utiliser le crédit client strategiquement :** Une ligne de crédit ou d'affacturage peut vous aider à financer temporairement votre BFR en attente de levée de fonds.",
          ],
        },
        {
          heading: "FAQ - BFR",
          content: [
            "**Le BFR peut-il être négatif ?** Oui, c'est même excellent ! Les modèles e-commerce et SaaS peuvent avoir un BFR négatif car ils reçoivent l'argent du client avant de payer les fournisseurs.",
            "**Pourquoi ma startup croît mais ma trésorerie baisse ?** C'est probablement dû à une augmentation du BFR. Vous financez la croissance avec votre trésorerie et vous épuisez votre cash. D'où l'importance des levées de fonds en phase de croissance.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    ebitda: {
      meta: {
        title: "EBITDA : Définition, Calcul et Interprétation | Iter Advisors",
        description:
          "Définition de l'EBITDA : formule de calcul, différence avec l'EBE, et comment l'utiliser pour évaluer la performance d'une entreprise.",
      },
      h1: "EBITDA : définition, calcul et utilisation en finance d'entreprise",
      sections: [
        {
          content: [
            "L'**EBITDA** (Earnings Before Interest, Taxes, Depreciation and Amortization) est l'un des indicateurs financiers les plus utilisés dans le monde des affaires, notamment par les investisseurs, les banquiers et les analystes financiers. En français, il correspond approximativement à l'**EBE** (Excédent Brut d'Exploitation), bien que les deux indicateurs ne soient pas strictement identiques.",
          ],
        },
        {
          heading: "Définition de l'EBITDA",
          content: [
            "L'EBITDA mesure la performance opérationnelle d'une entreprise avant la prise en compte des éléments financiers (intérêts), fiscaux (impôts), et non monétaires (amortissements et dépréciations). Il représente ce que l'entreprise génère comme richesse à partir de son activité courante, indépendamment de sa structure financière et de ses choix comptables.",
            "**Formule de calcul :**",
            "EBITDA = Résultat net + Impôts + Charges financières nettes + Dotations aux amortissements et dépréciations",
            "Ou de manière équivalente :",
            "EBITDA = Chiffre d'affaires - Charges d'exploitation (hors amortissements)",
          ],
        },
        {
          heading: "Pourquoi l'EBITDA est-il si Utilisé ?",
          content: [
            "L'EBITDA est apprécié des investisseurs et des analystes pour plusieurs raisons.",
            "**Il est comparable entre entreprises :** En neutralisant les effets de la structure financière (endettement) et des politiques d'amortissement (qui varient selon les choix comptables), l'EBITDA permet de comparer la performance opérationnelle de deux entreprises indépendamment de leur structure de capital.",
            "**Il est un proxy de la génération de cash :** L'EBITDA est souvent utilisé comme approximation de la capacité d'une entreprise à générer du cash. C'est pourquoi les multiples de valorisation sont souvent exprimés en multiple d'EBITDA (ex: 'l'entreprise est valorisée 8x l'EBITDA').",
            "**Il est utilisé dans les covenants bancaires :** Les banques incluent souvent des clauses (covenants) dans leurs contrats de prêt qui imposent un ratio minimum de dette nette / EBITDA.",
          ],
        },
        {
          heading: "EBITDA vs EBE : Quelle Différence ?",
          content: [
            "L'**EBE** (Excédent Brut d'Exploitation) est l'équivalent français de l'EBITDA, mais il existe des différences de calcul selon les normes comptables utilisées (normes françaises vs IFRS). Dans la pratique, les deux termes sont souvent utilisés de manière interchangeable, mais il est important de préciser quelle définition est utilisée lors de comparaisons.",
          ],
        },
        {
          heading: "Comment Interpréter l'EBITDA ?",
          content: [
            "Un EBITDA positif signifie que l'entreprise génère de la valeur à partir de son activité opérationnelle. Un EBITDA négatif est un signal d'alerte : l'entreprise consomme plus de ressources qu'elle n'en génère.",
            "La marge d'EBITDA (EBITDA / Chiffre d'affaires) est un indicateur de rentabilité opérationnelle. Une marge d'EBITDA de 15 à 20% est considérée comme bonne dans la plupart des secteurs. Les entreprises SaaS visent souvent des marges supérieures à 20%.",
            "Un **[DAF externalisé](/daf-externalise)** peut vous aider à calculer et à interpréter votre EBITDA dans le contexte de votre secteur d'activité, et à identifier les leviers d'amélioration. Pour en savoir plus sur les autres indicateurs financiers clés, consultez notre définition du **[BFR](/ressources/glossaire/bfr)**.",
          ],
        },
        {
          heading: "FAQ - EBITDA",
          content: [
            "**L'EBITDA est-il un indicateur fiable ?** L'EBITDA est un indicateur utile mais imparfait. Il ne tient pas compte des investissements nécessaires au maintien de l'outil de production (capex de maintenance), ni du besoin en fonds de roulement. Pour une analyse complète, il faut le compléter par le free cash flow.",
            "**Quel est un bon niveau d'EBITDA ?** Il n'y a pas de niveau universel. L'EBITDA doit être interprété en fonction du secteur d'activité et du stade de développement de l'entreprise. Une startup en phase de croissance peut avoir un EBITDA négatif tout en étant en bonne santé financière.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    cfo: {
      meta: {
        title: "CFO — Définition, Rôle et Missions du Chief Financial Officer | Iter Advisors",
        description:
          "CFO : définition complète du Chief Financial Officer, ses missions, la différence avec un DAF, et pourquoi les startups ont besoin d'un CFO externalisé. Guide par Iter Advisors.",
      },
      h1: "CFO — Définition, Rôle et Missions du Chief Financial Officer",
      sections: [
        {
          content: [
            "Le **CFO** (Chief Financial Officer) est le dirigeant financier d'une entreprise. Il dirige la fonction finance, assure la gestion de la trésorerie, supervise la comptabilité, et conseille la direction générale sur les décisions stratégiques à impact financier. Dans une startup, le CFO peut être la différence entre une croissance maîtrisée et une faillite évitable.",
            "En France, le CFO est souvent appelé **[DAF](/daf-externalise/metier)** (Directeur Administratif et Financier). Les deux termes désignent globalement le même poste, même si le DAF français a traditionnellement une dimension administrative plus marquée.",
          ],
        },
        {
          heading: "Définition du CFO",
          content: [
            "Le **Chief Financial Officer** (CFO) est le membre de la direction chargé de la stratégie financière de l'entreprise. Il est responsable de :",
            "**La stratégie financière** : planification, prévisions, modèles financiers",
            "**La gestion de la trésorerie** : cash-flow, prévisions de trésorerie, relations bancaires",
            "**La comptabilité et le reporting** : comptes annuels, reporting mensuel, audit",
            "**Le contrôle de gestion** : budgets, analyse des écarts, KPIs financiers",
            "**Les relations avec les investisseurs** : levées de fonds, reporting board, M&A",
            "**La fiscalité** : optimisation fiscale, conformité, subventions (CIR)",
          ],
        },
        {
          heading: "CFO vs DAF : quelle différence ?",
          content: [
            "**Appellation** : « CFO » est anglo-saxonne ; « DAF » est française.",
            "**Focus principal** : le CFO se concentre sur la stratégie financière et les investisseurs ; le DAF combine administration et finance.",
            "**Typologie d'entreprise** : on parle plus de CFO dans les startups, scale-ups et entreprises multinationales ; le DAF est la norme dans les PME, ETI et groupes français.",
            "**Relations investisseurs** : centrales chez le CFO (VC, M&A), moindres chez le DAF.",
            "**Dimension administrative** : limitée chez le CFO, marquée chez le DAF (juridique, RH).",
            "**International** : très présent chez le CFO, plus local chez le DAF.",
            "« Dans la pratique, chez nos clients startups, le DAF externalisé joue exactement le même rôle qu'un CFO. Il gère la stratégie financière, accompagne les levées de fonds, et présente au board. La différence est dans le nom, pas dans les missions. » — **Benjamin Ziza, Founding Partner & CFO, Iter Advisors**",
          ],
        },
        {
          heading: "Les missions d'un CFO dans une startup",
          content: [
            "**Phase Seed (CA < 1M€, < 15 personnes)** : mise en place de la comptabilité et des outils, suivi de la trésorerie, déclarations fiscales, premiers budgets.",
            "**Phase Series A (CA 1-5M€, 15-50 personnes)** : construction du modèle financier, reporting mensuel au board, accompagnement à la levée de fonds, contrôle de gestion, optimisation fiscale (CIR).",
            "**Phase Series B+ (CA > 5M€, > 50 personnes)** : stratégie financière et M&A, consolidation multi-sociétés, relations bancaires et dette, supervision de l'équipe finance, préparation à l'exit (IPO ou rachat).",
          ],
        },
        {
          heading: "Le CFO externalisé : la solution pour les PME et startups",
          content: [
            "Toutes les entreprises n'ont pas besoin (ni les moyens) d'un CFO à temps plein. Le **CFO externalisé** (ou [DAF externalisé](/daf-externalise)) offre :",
            "**Un accès à une expertise de niveau C-suite** sans le coût d'un salarié (30 à 50 % moins cher)",
            "**Une flexibilité totale** : de 2 jours/mois à temps plein selon les besoins",
            "**Une vision multi-sectorielle** : nos CFOs interviennent sur 10 à 15 entreprises par an",
            "**Un réseau** : accès à des VCs, banquiers, avocats, experts-comptables",
            "Pour aller plus loin, découvrez notre offre de [DAF externalisé](/daf-externalise) ou comparez avec un [expert-comptable](/ressources/blog/daf-externalise-vs-expert-comptable). En anglais, lisez notre page [Fractional CFO](/en/fractional-cfo).",
          ],
        },
        {
          heading: "FAQ - CFO",
          content: [
            "**Quelle est la différence entre un CFO et un expert-comptable ?** L'expert-comptable gère la comptabilité passée (déclarations, bilans). Le CFO pilote la stratégie financière future (prévisions, levées de fonds, board). Les deux sont complémentaires.",
            "**À quel stade une startup a-t-elle besoin d'un CFO ?** Dès 10 salariés et/ou quand vous préparez une levée de fonds. Un CFO seed coûte 2 000 à 3 500 €/mois pour 2 jours/semaine.",
            "**CFO salarié vs CFO externalisé : que choisir ?** < 50 personnes = externalisé (plus flexible, moins cher). > 50 personnes avec une finance complexe = salarié.",
            "**Le CFO fait-il aussi de la paie et du RH ?** Généralement non. La paie est gérée par un outil ([PayFit](/ressources/outils/payfit), [Silae](/ressources/outils/silae)) ou un cabinet. Le CFO peut superviser la fonction RH mais ne la gère pas directement.",
            "**Quelle est la différence entre CFO et CFA ?** Le CFA (Chartered Financial Analyst) est une certification professionnelle. Le CFO est un titre de poste. Les deux n'ont rien à voir.",
          ],
        },
      ],
      ctaButton: "Besoin d'un CFO ? Diagnostic gratuit",
    },
    // ─── 8 pages glossaire ajoutées via TICKET 21 ──────────────────────
    "besoin-fonds-roulement-bfr": {
      meta: {
        title: "Besoin en Fonds de Roulement (BFR) — Définition et Calcul Complet | Iter Advisors",
        description: "BFR : définition, formule de calcul, benchmarks par secteur, leviers d'optimisation. Le guide complet pour piloter votre trésorerie.",
      },
      h1: "Besoin en Fonds de Roulement (BFR) — Définition, Formule et Calcul",
      sections: [
        {
          content: [
            "Le **Besoin en Fonds de Roulement (BFR)** est l'un des indicateurs financiers les plus critiques pour les entreprises en croissance — et pourtant l'un des moins compris. Il mesure le montant de trésorerie que vous devez financer pour couvrir le décalage temporel entre vos décaissements (paiement fournisseurs, salaires) et vos encaissements (paiement clients). Un BFR mal maîtrisé peut asphyxier une entreprise rentable et tuer une startup en pleine croissance.",
          ],
        },
        {
          heading: "Définition complète",
          content: [
            "Le BFR représente le montant de ressources financières nécessaire au financement du cycle d'exploitation. Il résulte du décalage entre les encaissements générés par l'activité et les décaissements nécessaires à cette même activité.",
            "En termes simples : c'est l'argent que vous devez « avancer » pour faire tourner votre business entre le moment où vous payez vos charges et celui où vous encaissez vos revenus.",
            "**Composantes du BFR** : actifs circulants d'exploitation (stocks + créances clients + charges constatées d'avance) moins passifs circulants d'exploitation (dettes fournisseurs + dettes fiscales et sociales).",
          ],
        },
        {
          heading: "Formule de calcul",
          content: [
            "**Formule de base** : BFR = Actifs circulants d'exploitation − Passifs circulants d'exploitation",
            "**Formule détaillée** : BFR = (Stocks + Créances clients + Charges payées d'avance) − (Dettes fournisseurs + Dettes fiscales/sociales)",
            "**Formule par délais (méthode des ratios)** : BFR = (DSO × CA journalier) + (DIO × Coût achats journalier) − (DPO × Coût achats journalier)",
            "Avec **DSO** = délai moyen clients, **DIO** = délai moyen stocks, **DPO** = délai moyen fournisseurs.",
          ],
        },
        {
          heading: "Pourquoi le BFR est important",
          content: [
            "**Prédicteur de santé financière.** Une entreprise avec un BFR négatif (modèle abonnement, Amazon) est en position de force. Un BFR positif trop élevé asphyxie la croissance.",
            "**Levier de croissance.** Chaque euro de CA supplémentaire nécessite un financement de BFR. Si votre BFR/CA = 20%, 1M€ de croissance = 200K€ de besoin de financement.",
            "**Indicateur de performance opérationnelle.** Un BFR qui diminue malgré la croissance du CA signe une optimisation réussie.",
            "**Clé pour les banques.** Les banques analysent le BFR pour dimensionner les lignes de trésorerie et le crédit de caisse.",
          ],
        },
        {
          heading: "Benchmarks et seuils par secteur",
          content: [
            "**SaaS (abonnement)** : BFR/CA = -10 à 5%. DSO 15-30j, DIO 0j, DPO 30-45j. Cible : négatif.",
            "**E-commerce D2C** : BFR/CA = 15-25%. DSO 5-15j, DIO 30-60j, DPO 30-45j. Cible : < 15%.",
            "**Industrie** : BFR/CA = 20-35%. DSO 45-75j, DIO 30-90j, DPO 30-60j. Cible : < 25%.",
            "**BTP** : BFR/CA = 25-40%. DSO 60-90j, DIO 15-30j, DPO 45-75j. Cible : < 30%.",
            "**Interprétation** : BFR < 0 = excellent. 0-15% = sain. 15-30% = à surveiller. > 30% = critique.",
          ],
        },
        {
          heading: "Limites et pièges",
          content: [
            "**BFR négatif ≠ trésorerie saine.** Un BFR négatif est excellent mais ne garantit pas une trésorerie positive si l'entreprise a des dettes financières lourdes.",
            "**Saisonnalité ignorée.** Le BFR annuel masque des variations mensuelles importantes.",
            "**Croissance = BFR qui augmente.** Une entreprise qui double son CA en 1 an doit financer une augmentation de BFR de 20-30% du CA additionnel.",
            "**Comparaison sectorielle obligatoire.** Un BFR de 20% du CA est excellent pour une industrie mais critique pour une SaaS.",
          ],
        },
        {
          heading: "FAQ",
          content: [
            "**Comment réduire mon BFR ?** 3 leviers : (1) réduire le DSO, (2) réduire le DIO (stocks), (3) augmenter le DPO (délais fournisseurs). Voir notre [guide des 7 leviers](/ressources/blog/reduire-bfr-7-leviers-actionnables).",
            "**Un BFR négatif est-il possible ?** Oui, c'est même idéal. Typique des abonnements payés en avance (SaaS) et du e-commerce avec paiement immédiat.",
            "**Le BFR est-il le même que le besoin de trésorerie ?** Non. Le besoin de trésorerie = BFR + Investissements − Capitaux permanents. Le BFR ne mesure que la partie exploitation.",
            "**À quelle fréquence calculer le BFR ?** Mensuellement pour les startups en croissance rapide, trimestriellement pour les PME établies.",
          ],
        },
      ],
      ctaButton: "Auditer mon BFR avec un DAF",
    },
    "cash-burn-runway": {
      meta: {
        title: "Cash Burn & Runway — Définition, Calcul et Seuils pour Startups | Iter Advisors",
        description: "Cash burn et runway : les 2 métriques vitales de toute startup. Méthode de calcul, seuils critiques, règles du venture capital.",
      },
      h1: "Cash Burn & Runway — Définition et Calcul pour Startups",
      sections: [
        {
          content: [
            "Le **cash burn** et le **runway** sont les deux indicateurs vitaux de toute startup. Le cash burn mesure la vitesse à laquelle une entreprise consomme sa trésorerie. Le runway indique combien de temps il lui reste avant de manquer d'argent. Ces deux métriques sont suivies religieusement par les fondateurs, les investisseurs et les board members — car elles déterminent littéralement la survie de l'entreprise.",
          ],
        },
        {
          heading: "Définition complète",
          content: [
            "**Cash burn (ou burn rate)** : montant net de trésorerie dépensé par une entreprise sur une période donnée (généralement mensuelle).",
            "**Runway** : nombre de mois pendant lesquels une entreprise peut continuer à opérer avec sa trésorerie actuelle à son taux de burn actuel.",
            "**Gross burn** : total des dépenses mensuelles (sans tenir compte des revenus).",
            "**Net burn** : dépenses mensuelles − revenus mensuels = consommation nette de trésorerie.",
          ],
        },
        {
          heading: "Formule de calcul",
          content: [
            "**Cash burn mensuel net** = Dépenses mensuelles totales − Revenus mensuels",
            "**Runway (mois)** = Trésorerie disponible / Cash burn mensuel net",
            "Exemple : revenus 45 000 €, dépenses 140 000 €, trésorerie 760 000 € → burn 95 000 €/mois → runway 8 mois.",
          ],
        },
        {
          heading: "Pourquoi c'est important",
          content: [
            "**Indicateur de survie.** Un runway < 6 mois est considéré comme critique. < 3 mois = levée quasi impossible.",
            "**Timing des levées.** Règle d'or du VC : lever quand on a 12-18 mois de runway. < 6 mois = décote de 20-40%.",
            "**Product-market fit.** Un burn qui diminue naturellement = signe de PMF.",
            "**Décisions opérationnelles.** Chaque embauche doit être pondérée contre son impact sur le runway.",
          ],
        },
        {
          heading: "Benchmarks et seuils",
          content: [
            "**Runway > 18 mois** : zone verte — focus croissance.",
            "**12-18 mois** : zone jaune — préparer la prochaine étape.",
            "**9-12 mois** : zone orange — lancer la levée activement.",
            "**6-9 mois** : zone rouge — levée urgente + réduction des coûts.",
            "**< 6 mois** : zone noire — plan d'urgence (bridge round, M&A).",
          ],
        },
        {
          heading: "Limites et pièges",
          content: [
            "**Burn lissé vs burn réel.** Un loyer trimestriel ou un pic de recrutement crée des mois à burn très élevé.",
            "**Revenus ≠ trésorerie.** En comptabilité d'engagement, un CA de 100K€ avec DSO 60 jours ne génère que ~50K€ de cash mensuel.",
            "**Dépenses engageantes.** Un contrat annuel AWS engage la trésorerie future.",
            "**Le Rule of 40 complémentaire.** Pour une SaaS, taux de croissance + marge EBITDA ≥ 40% est plus complet que le burn seul.",
          ],
        },
        {
          heading: "FAQ",
          content: [
            "**À quelle fréquence calculer le runway ?** Hebdomadairement pour les startups < 12 mois de runway, mensuellement sinon.",
            "**Que faire si mon runway tombe sous 6 mois ?** 3 options : réduire les coûts, accélérer les revenus, lancer un bridge round.",
            "**Le burn peut-il être positif ?** Oui — c'est l'objectif ! Un « burn négatif » = cash-flow positif.",
            "**Comment prédire le burn futur ?** Utilisez un modèle de forecast avec 3 scénarios (pessimiste/base/optimiste).",
          ],
        },
      ],
      ctaButton: "Construire mon forecast avec un DAF",
    },
    "cac-ltv": {
      meta: {
        title: "CAC & LTV — Définitions, Formules et Ratio | Iter Advisors",
        description: "CAC, LTV et ratio LTV/CAC : les métriques fondamentales du business model SaaS. Formules, benchmarks, leviers d'optimisation.",
      },
      h1: "CAC & LTV — Définitions, Formules et Ratio LTV/CAC",
      sections: [
        {
          content: [
            "Le **CAC** (Customer Acquisition Cost) et le **LTV** (Lifetime Value) sont les deux métriques fondamentales du business model SaaS et subscription. Elles répondent à deux questions essentielles : « combien coûte un nouveau client ? » et « combien un client nous rapporte-t-il sur toute sa durée de vie ? ». Le ratio LTV/CAC est le baromètre de la santé économique d'un modèle récurrent.",
          ],
        },
        {
          heading: "Définition complète",
          content: [
            "**CAC** : coût total pour acquérir un nouveau client. Il inclut tous les investissements marketing et commerciaux.",
            "**LTV** : revenu total qu'un client générera sur toute la durée de sa relation avec l'entreprise.",
            "**Ratio LTV/CAC** : retour sur investissement de l'acquisition client. > 3 est sain. > 5 est excellent. < 1 = modèle non viable.",
          ],
        },
        {
          heading: "Formule de calcul",
          content: [
            "**CAC** = (Dépenses marketing + Dépenses commerciales) / Nombre de nouveaux clients",
            "**LTV (formule simplifiée)** = ARPU × Marge brute × Durée de vie moyenne du client",
            "**LTV (formule précise)** = ARPU × (Marge brute %) / Churn rate mensuel",
            "**CAC Payback Period** = CAC / (ARPU × Marge brute). < 12 mois = excellent pour une SaaS B2B.",
          ],
        },
        {
          heading: "Pourquoi c'est important",
          content: [
            "**Viabilité du business model.** Si LTV/CAC < 1, chaque client coûte plus cher qu'il ne rapporte.",
            "**Scalabilité.** LTV/CAC > 5 signifie qu'on peut investir massivement en acquisition avec ROI positif.",
            "**Base de valorisation.** Les VCs utilisent le LTV/CAC pour évaluer la qualité du business model.",
            "**Optimisation marketing.** Le CAC par canal permet de réallouer le budget vers les canaux efficaces.",
          ],
        },
        {
          heading: "Benchmarks et seuils",
          content: [
            "**LTV/CAC** : < 1 critique. 3-5 sain. > 5 excellent.",
            "**CAC payback** : > 24 mois critique. 12-18 mois sain. < 12 mois excellent.",
            "**Churn mensuel** : > 5% critique. 2-5% à surveiller. < 2% excellent.",
          ],
        },
        {
          heading: "Limites et pièges",
          content: [
            "**LTV sur données limitées.** Une LTV basée sur 6 mois de données est peu fiable.",
            "**CAC qui varie par canal.** Le CAC global masque des disparités importantes.",
            "**Churn qui évolue.** Le churn des early adopters diffère du churn mainstream.",
            "**Coûts cachés du CAC.** Temps des fondateurs en vente, réductions accordées, onboarding souvent omis.",
            "**LTV ≠ trésorerie.** Une LTV de 20K€ sur 3 ans ne se traduit pas par 20K€ de cash immédiat.",
          ],
        },
        {
          heading: "FAQ",
          content: [
            "**Quel est le ratio LTV/CAC idéal ?** > 3 minimum. 3-5 sain. > 5 excellent. < 1 = non viable.",
            "**Comment réduire mon CAC ?** Optimiser les canaux payants, développer SEO/content, parrainage, améliorer la conversion trial→payant.",
            "**Comment augmenter mon LTV ?** Réduire le churn (customer success), augmenter l'ARPU (upsell), augmenter la durée de vie (engagement).",
            "**Le CAC inclut-il les account managers ?** Non, uniquement les coûts d'acquisition. Les AM et CS sont dans les coûts de rétention.",
          ],
        },
      ],
      ctaButton: "Optimiser mon LTV/CAC avec un DAF",
    },
    "arr-mrr": {
      meta: {
        title: "ARR & MRR — Définitions et Calcul pour SaaS | Iter Advisors",
        description: "ARR (Annual Recurring Revenue) et MRR (Monthly Recurring Revenue) : les métriques de référence du SaaS. Calcul, benchmarks, seuils de levée.",
      },
      h1: "ARR & MRR — Définitions et Calcul pour SaaS",
      sections: [
        {
          content: [
            "L'**ARR** (Annual Recurring Revenue) et le **MRR** (Monthly Recurring Revenue) sont les métriques de référence des entreprises en modèle d'abonnement. Elles mesurent le revenu récurrent — prévisible et régulier — qui constitue la base de valorisation des startups SaaS. Contrairement au chiffre d'affaires traditionnel, l'ARR et le MRR offrent une vision claire de la trajectoire de croissance et de la santé économique du business model récurrent.",
          ],
        },
        {
          heading: "Définition complète",
          content: [
            "**MRR** : revenu récurrent mensuel. Somme de tous les abonnements actifs d'un mois donné, normalisée sur une base mensuelle. Un client payant 12 000 €/an contribue 1 000 € au MRR.",
            "**ARR** : MRR × 12. Annualise le revenu récurrent pour donner une vision long terme.",
            "**Types de MRR** : New MRR (nouveaux clients), Expansion MRR (upsell/cross-sell), Contraction MRR (downgrades), Churned MRR (résiliations).",
            "**Net New MRR** = New + Expansion − Contraction − Churned.",
          ],
        },
        {
          heading: "Formule de calcul",
          content: [
            "**MRR** = Σ (Prix de chaque abonnement actif / Période en mois)",
            "**ARR** = MRR × 12",
            "**Net MRR Growth** = (MRR mois N − MRR mois N-1) / MRR mois N-1 × 100",
          ],
        },
        {
          heading: "Pourquoi c'est important",
          content: [
            "**Prédictibilité.** Le revenu récurrent est prévisible. Un ARR de 1M€ = 1M€ de CA garanti l'année suivante (hors churn).",
            "**Base de valorisation.** SaaS en croissance > 100% : valorisation 10-20x ARR. SaaS mature : 5-8x.",
            "**Mesure de la traction.** MRR qui croît 10%/mois = doubling time de 7 mois.",
            "**Pilotage opérationnel.** La décomposition du MRR permet d'identifier les leviers de croissance.",
          ],
        },
        {
          heading: "Benchmarks et seuils ARR par levée",
          content: [
            "**Pre-seed** : prototype, pas encore de MRR significatif.",
            "**Seed** : 10-50K€ MRR (120-600K€ ARR).",
            "**Series A** : 50-200K€ MRR (600K€-2,4M€ ARR).",
            "**Series B** : 200-500K€ MRR (2,4-6M€ ARR).",
            "**Series C+** : > 500K€ MRR (> 6M€ ARR).",
            "**Croissance ARR YoY** : > 100% early, 50-100% growth, 30-50% scale-up.",
          ],
        },
        {
          heading: "Limites et pièges",
          content: [
            "**ARR ≠ trésorerie.** Un ARR de 1M€ avec DSO 60 jours ne génère que ~917K€ de cash annuel.",
            "**Annual discounts gonflent l'ARR.** Un client qui paie 10K€/an pour un service à 12K€/an contribue 833 €/mois — mais a payé en une fois.",
            "**Churn caché.** L'ARR annuel masque le churn mensuel. 5%/mois = 46% annuel.",
            "**Comptabilisation des trials.** Les trials ne doivent pas être comptés en MRR.",
            "**ARR ≠ GAAP revenue.** En compta, un paiement annuel est comptabilisé sur 12 mois (deferred revenue).",
          ],
        },
        {
          heading: "FAQ",
          content: [
            "**ARR vs CA ?** Le CA inclut toutes les sources. L'ARR ne compte que le revenu récurrent d'abonnement.",
            "**Comment passer de MRR à ARR ?** ARR = MRR × 12.",
            "**Le MRR inclut-il les services pro ?** Non, uniquement le revenu récurrent d'abonnement.",
            "**Quel est un bon taux de croissance MRR ?** Pour une SaaS B2B early stage, 10-15%/mois est excellent.",
          ],
        },
      ],
      ctaButton: "Structurer mon reporting ARR avec un DAF",
    },
    "churn-rate": {
      meta: {
        title: "Churn Rate — Définition, Calcul et Seuils | Iter Advisors",
        description: "Churn rate : la métrique que les VCs scrutent en premier. Calcul, NRR, gross vs net, benchmarks B2B / B2C, leviers de rétention.",
      },
      h1: "Churn Rate — Définition, Calcul et Seuils",
      sections: [
        {
          content: [
            "Le **churn rate** (ou taux de désabonnement) est la métrique que les fondateurs de SaaS détestent regarder — mais que les investisseurs scrutent en premier. Il mesure la proportion de clients ou de revenus perdus sur une période donnée. Un churn élevé est le signe d'un product-market fit insuffisant. Un churn faible et maîtrisé est le garant de la prédictibilité du revenu récurrent.",
          ],
        },
        {
          heading: "Définition complète",
          content: [
            "**Churn rate client** : % de clients qui résilient leur abonnement sur une période donnée.",
            "**Churn rate revenu (Revenue Churn)** : % de revenus perdus sur une période — incluant les résiliations et downgrades.",
            "**NRR (Net Revenue Retention)** : % de revenus conservés d'une cohorte, incluant l'expansion (upsell). NRR > 100% = clients existants génèrent plus de revenus malgré le churn.",
            "**Gross Churn** : revenus perdus par résiliations uniquement.",
            "**Net Churn** : Gross Churn − Expansion (upsell/cross-sell).",
          ],
        },
        {
          heading: "Formule de calcul",
          content: [
            "**Churn client** = Clients perdus (mois N) / Clients au début du mois N × 100",
            "**Revenue Churn** = MRR perdu (mois N) / MRR au début du mois N × 100",
            "**NRR** = (MRR début + Expansion − Contraction − Churn) / MRR début × 100",
          ],
        },
        {
          heading: "Pourquoi c'est important",
          content: [
            "**Indicateur de PMF.** Churn > 5%/mois pour SaaS B2B = problème produit ou ciblage. < 2% = produit sticky.",
            "**Impact exponentiel.** Churn de 5%/mois = 46% annuel. Même avec une acquisition forte, la croissance nette est pénalisée.",
            "**Coût acquisition vs rétention.** Acquérir un nouveau client coûte 5 à 25x plus cher que d'en retenir un.",
            "**Valorisation.** Décote significative pour les startups avec churn élevé. NRR > 120% = valorisation premium.",
          ],
        },
        {
          heading: "Benchmarks et seuils",
          content: [
            "**Churn client B2B SaaS** : excellent < 2%/mois. Bon 2-3%. À surveiller 3-5%. Critique > 5%.",
            "**Churn client B2C** : excellent < 5%/mois. Bon 5-8%. À surveiller 8-12%. Critique > 12%.",
            "**NRR B2B SaaS** : excellent > 120%. Bon 110-120%. Sain 100-110%. < 100% critique.",
            "**Net revenue churn B2B** : idéal < 0% (negative churn). 0-2% bon. > 5% critique.",
          ],
        },
        {
          heading: "Limites et pièges",
          content: [
            "**Churn par segment.** Le churn des petits clients peut être 3x plus élevé que celui des grands comptes.",
            "**Churn early adopters ≠ mainstream.** Les premiers clients sont plus tolérants.",
            "**Churn annualisé trompeur.** 2%/mois ≠ 24% annuel. Formule : 1 − (1 − churn mensuel)^12.",
            "**Voluntary vs Involuntary churn.** Le churn involontaire (carte expirée) = 20-40% du total, récupérable par dunning.",
            "**Churn masqué par la croissance.** Calculez toujours le churn en parallèle du NRR.",
          ],
        },
        {
          heading: "FAQ",
          content: [
            "**Quel est un bon taux de churn pour une SaaS B2B ?** < 2% mensuel (22% annuel) = bon. < 1% = excellent. > 5% = critique.",
            "**Comment réduire le churn ?** Customer success proactif, onboarding optimisé, features sticky, pricing aligné avec la valeur, NPS régulier.",
            "**Churn client vs churn revenu ?** Le churn revenu inclut les downgrades. Un churn client de 3% peut coexister avec un churn revenu de 5%.",
            "**Qu'est-ce que le « negative churn » ?** Quand l'expansion dépasse le churn — NRR > 100%. État idéal d'une SaaS mature.",
          ],
        },
      ],
      ctaButton: "Réduire mon churn avec un DAF",
    },
    "run-rate": {
      meta: {
        title: "Run Rate — Définition et Calcul pour Projections | Iter Advisors",
        description: "Run rate : annualisation d'une performance récente pour estimer le résultat sur 12 mois. Limites, pièges, utilisation correcte.",
      },
      h1: "Run Rate — Définition et Calcul pour Projections",
      sections: [
        {
          content: [
            "Le **run rate** est une métrique de projection qui annualise une performance récente pour estimer le résultat sur une période complète. Très utilisé par les startups et les investisseurs, il permet d'extrapoler le chiffre d'affaires ou les coûts actuels sur 12 mois. C'est un outil rapide mais qui doit être manipulé avec précaution — car il suppose que les conditions actuelles resteront constantes, ce qui est rarement le cas dans une startup en croissance.",
          ],
        },
        {
          heading: "Définition complète",
          content: [
            "Le run rate annualise une métrique mensuelle ou trimestrielle pour estimer sa valeur sur 12 mois. Il répond à la question : « si notre performance actuelle se maintient, où serons-nous dans 12 mois ? »",
            "**Run rate ≠ ARR.** Le run rate est une extrapolation basée sur une période récente. L'ARR est la somme des abonnements actifs contractés. Pour une SaaS en croissance rapide, le run rate est généralement supérieur à l'ARR.",
          ],
        },
        {
          heading: "Formule de calcul",
          content: [
            "**À partir d'une métrique mensuelle** : Run Rate = Métrique du dernier mois × 12",
            "**À partir d'une métrique trimestrielle** : Run Rate = Métrique du dernier trimestre × 4",
            "Exemple : MRR fin janvier 85 000 € → ARR run rate = 1 020 000 €.",
          ],
        },
        {
          heading: "Pourquoi c'est important",
          content: [
            "**Projections rapides.** Estimation rapide de l'ARR ou du CA annuel sans modèle complexe.",
            "**Comparaisons.** « Nous sommes à 2M€ de run rate » est compris par tous les investisseurs.",
            "**Suivi de la croissance.** Une courbe de run rate qui accélère = croissance exponentielle.",
            "**Budgets et prévisions.** Base pour des prévisions rapides en attendant des modèles plus sophistiqués.",
          ],
        },
        {
          heading: "Fiabilité du run rate selon le contexte",
          content: [
            "**SaaS mature, croissance stable** : fiabilité élevée — prévisions fiables.",
            "**SaaS en hyper-croissance** : fiabilité faible — sous-estime la performance future.",
            "**Activité saisonnière** : fiabilité faible — nécessite un ajustement saisonnier.",
            "**Projet en phase de lancement** : fiabilité très faible — à éviter pour les projections.",
          ],
        },
        {
          heading: "Limites et pièges",
          content: [
            "**Hypothèse de constance fausse.** Janvier ≠ février ≠ mars. La croissance, la saisonnalité, les aléas rendent cette hypothèse fausse.",
            "**Sous-estimation en croissance.** Pour une SaaS qui croît 10%/mois, le run rate basé sur le dernier mois sous-estime l'ARR réel.",
            "**Sensible aux outliers.** Un mois exceptionnel (gros contrat) fausse le run rate. Utilisez une moyenne 3 mois.",
            "**Ne remplace pas un vrai forecast.** Pour les décisions stratégiques, utilisez un modèle avec plusieurs scénarios.",
            "**Run rate revenus ≠ run rate dépenses.** Les dépenses augmentent plus vite que les revenus.",
          ],
        },
        {
          heading: "FAQ",
          content: [
            "**Run rate vs ARR ?** Le run rate annualise le dernier mois. L'ARR somme les abonnements actuels. Pour une SaaS en croissance, run rate > ARR.",
            "**Quelle période utiliser ?** Le dernier mois pour une estimation rapide. Une moyenne sur 3 mois pour plus de fiabilité.",
            "**Le run rate est-il fiable pour une levée ?** Non. Les VCs préfèrent l'ARR et les cohortes.",
            "**Puis-je utiliser le run rate pour les coûts ?** Oui, avec prudence. Les coûts de personnel augmentent par paliers (hiring).",
          ],
        },
      ],
      ctaButton: "Construire mon forecast avec un DAF",
    },
    "bspce-bsa": {
      meta: {
        title: "BSPCE & BSA — Guide Complet pour Startups Françaises | Iter Advisors",
        description: "BSPCE et BSA : conditions d'attribution, fiscalité, dilution, pièges juridiques. Le guide complet pour structurer votre plan stock-options.",
      },
      h1: "BSPCE & BSA — Guide Complet pour Startups Françaises",
      sections: [
        {
          content: [
            "Les **BSPCE** (Bons de Souscription de Parts de Créateur d'Entreprise) et les **BSA** (Bons de Souscription d'Actions) sont les deux instruments juridiques les plus utilisés par les startups françaises pour attribuer des stock-options à leurs salariés et lever des fonds. Ils sont au cœur de la rémunération des startups tech et constituent un levier de motivation et de rétention des talents.",
          ],
        },
        {
          heading: "Définition complète",
          content: [
            "**BSPCE** : instrument réservé aux salariés et dirigeants de sociétés par actions (SAS, SA) qui leur donne le droit de souscrire des actions à un prix fixé à l'avance. Gratuits à l'attribution, régime fiscal et social avantageux.",
            "**BSA** : instrument plus souple, utilisable par tous types de sociétés (SAS, SARL, SA) et attribuable à des non-salariés (conseillers, investisseurs, partenaires).",
            "**BSA Air** : variante du BSA sans prix d'exercice — attribution gratuite d'actions différée.",
          ],
        },
        {
          heading: "Conditions d'attribution des BSPCE",
          content: [
            "Pour attribuer des BSPCE, la société doit remplir les conditions suivantes :",
            "- Être une société par actions (SAS ou SA) — les SARL ne peuvent pas attribuer de BSPCE",
            "- Avoir moins de 15 ans d'existence",
            "- Ne pas être issue d'une fusion, scission ou apport partiel d'actif",
            "- Être soumise à l'IS — exclut les SCIs",
            "- Ne pas être cotée en bourse (sauf sur Euronext Growth)",
          ],
        },
        {
          heading: "Formule de calcul",
          content: [
            "**Plus-value par BSPCE** = Valeur de l'action au moment de l'exercice − Prix d'exercice du BSPCE",
            "**Dilution** = Nombre d'actions à créer / (Nombre d'actions existantes + Nombre d'actions à créer) × 100",
          ],
        },
        {
          heading: "Pourquoi c'est important",
          content: [
            "**Rétention des talents.** Les BSPCE alignent les intérêts des salariés avec ceux de l'entreprise.",
            "**Rémunération différée.** En phase de lancement, les BSPCE compensent les salaires sous-market.",
            "**Avantages fiscaux.** Plus-value taxée à 12,8% (PFU) après 3 ans de détention, contre 30% pour les plus-values classiques.",
            "**Avantages sociaux.** Pas de cotisations sociales sur l'attribution ni sur l'exercice.",
            "**Culture d'entreprise.** Attribution à toute l'équipe = culture de propriété.",
          ],
        },
        {
          heading: "Benchmarks d'attribution",
          content: [
            "**CTO / Cofondateur non-fondateur** : 1-3% du capital.",
            "**VP / Director** : 0,3-1%.",
            "**Lead / Senior** : 0,1-0,3%.",
            "**Junior / IC** : 0,05-0,1%.",
            "**Pool total salariés** : 10-15% du capital.",
            "**Délai d'exercice** : BSPCE = vesting 3-4 ans avec cliff 1 an. BSA Air = souvent sans vesting ou court (1-2 ans).",
          ],
        },
        {
          heading: "Limites et pièges",
          content: [
            "**Dilution mal calculée.** Pool de 15% + BSPCE précédents peuvent cumuler 25-30% de dilution.",
            "**Prix d'exercice mal fixé.** Doit être à la valeur réelle (fair market value). Trop bas = redressement fiscal. Trop haut = inexerçables.",
            "**Clauses de sortie manquantes.** Bien prévoir good leaver / bad leaver, licenciement, décès.",
            "**Condition de présence excessive.** Un vesting de 5 ans avec cliff 2 ans serait contestable.",
            "**Complexité administrative.** AGE, avenant aux statuts, suivi rigoureux des attributions et exercices.",
          ],
        },
        {
          heading: "FAQ",
          content: [
            "**BSPCE vs BSA Air ?** BSPCE = réservé aux salariés de SAS/SA, prix d'exercice à payer. BSA Air = utilisable par tous, sans prix d'exercice, attribution gratuite.",
            "**Combien de BSPCE faut-il attribuer ?** Pool de 10-15% du capital est standard.",
            "**Régime fiscal ?** Plus-value à 12,8% après 3 ans. Avant 3 ans : 30%. Exonération de cotisations sociales.",
            "**Une SARL peut-elle attribuer des BSPCE ?** Non, uniquement SAS et SA. Les SARL peuvent utiliser des BSA ou des AGA.",
            "**Que se passe-t-il si le salarié part avant la fin du vesting ?** Il perd les BSPCE non acquises (bad leaver). En cas de départ non-fautif, il conserve les BSPCE acquis (good leaver).",
          ],
        },
      ],
      ctaButton: "Structurer mon plan BSPCE avec un DAF",
    },
    // EC-02 — 4 nouvelles pages glossaire (DAF, DRH, contrôle de gestion, fractional CFO)
    daf: {
      meta: {
        title: "DAF : Définition du Directeur Administratif et Financier | Missions | Iter Advisors",
        description: "Le DAF (Directeur Administratif et Financier) pilote la stratégie financière, la gestion administrative et le reporting de l'entreprise. Définition, missions et compétences clés.",
      },
      h1: "DAF — Définition du Directeur Administratif et Financier | 2026 | Iter Advisors",
      sections: [
        {
          content: [
            "Le **DAF** (Directeur Administratif et Financier) est le dirigeant responsable de la gestion financière et administrative d'une entreprise. En France, c'est le titre le plus courant pour désigner la direction financière des PME, ETI, et filiales de grands groupes. Le DAF occupe une fonction transversale qui touche à la comptabilité, la trésorerie, le contrôle de gestion, la fiscalité, et souvent les ressources humaines et le juridique.",
            "Contrairement au CFO anglo-saxon qui est fortement orienté stratégie financière et relations investisseurs, le DAF français a traditionnellement un périmètre plus large qui inclut la gestion administrative et parfois les RH. Cette distinction s'estompe dans les startups, où le DAF prend souvent un profil très proche du CFO.",
          ],
        },
        {
          heading: "Définition complète",
          content: [
            "Le DAF est un membre de la direction qui supervise l'ensemble des fonctions financières et administratives de l'entreprise. Il participe aux décisions stratégiques et en assure la traduction opérationnelle et financière.",
            "**1. Pilotage de la performance financière.** Le DAF construit et suit les budgets, analyse les écarts, produit les reportings de gestion, et alerte la direction sur les dérives. Il est le garant de la vision chiffrée de l'entreprise.",
            "**2. Gestion de la trésorerie et du financement.** Le DAF anticipe les besoins en fonds, négocie les lignes de crédit, optimise le BFR, et pilote les relations bancaires. Il est le dernier rempart contre la cessation de paiement.",
            "**3. Conformité et reporting réglementaire.** Le DAF supervise la comptabilité, les déclarations fiscales et sociales, les audits légaux, et s'assure de la conformité avec la réglementation en vigueur.",
            "**4. Accompagnement à la stratégie.** Le DAF évalue la rentabilité des projets, modélise les scénarios de croissance, accompagne les opérations de fusion-acquisition, et participe aux comités de direction.",
            "**5. Direction administrative et juridique.** Selon la taille de l'entreprise, le DAF peut superviser les fonctions juridique, assurances, immobilier, et parfois ressources humaines.",
          ],
        },
        {
          heading: "DAF vs Expert-comptable : la complémentarité",
          content: [
            "Le DAF et l'expert-comptable sont complémentaires mais distincts. **Le DAF** pilote la stratégie financière avec une vision prospective (prévisions, scénarios, décisions) et est présent de façon continue ou régulière dans l'entreprise. **L'expert-comptable** enregistre les opérations passées avec une vision rétrospective (comptabilité, fiscalité) et intervient mensuellement ou trimestriellement.",
            "Coût : un [DAF externalisé](/daf-externalise) coûte entre 2 000€ et 7 000€/mois ; un expert-comptable entre 500€ et 3 000€/mois.",
          ],
        },
        {
          heading: "Quand une entreprise a-t-elle besoin d'un DAF ?",
          content: [
            "**CA > 1M€ sans direction financière :** le fondateur ne peut plus tout gérer seul.",
            "**Préparation d'une levée de fonds :** les investisseurs exigent un reporting professionnel.",
            "**Départ du DAF interne :** continuité financière à assurer en urgence.",
            "**Expansion internationale :** multi-devises, prix de transfert, conformité.",
            "**M&A ou LBO :** due diligence financière à piloter.",
            "**Problèmes de trésorerie récurrents :** BFR, délais clients, prévisions à structurer.",
            "Toutes les PME ne peuvent pas justifier le recrutement d'un DAF à plein temps (80 000€-150 000€ chargé/an). Le [DAF externalisé](/daf-externalise) permet d'accéder à une expertise senior pour un budget maîtrisé.",
          ],
        },
        {
          heading: "FAQ — DAF",
          content: [
            "**Quelle est la différence entre DAF et CFO ?** Le CFO est anglo-saxon, fortement orienté stratégie financière et relations investisseurs. Le DAF est français, avec un périmètre plus large incluant l'administratif et parfois les RH. Dans les startups, les deux profils convergent.",
            "**Quel est le salaire d'un DAF en France ?** Un DAF interne coûte entre 70 000€ et 150 000€ brut chargé. Un [DAF externalisé](/daf-externalise) démarre à 2 000€/mois.",
            "**Un DAF peut-il être à temps partiel ?** Oui, c'est le modèle du DAF externalisé ou du DAF à temps partagé. C'est particulièrement adapté aux PME de 10 à 200 salariés qui ont besoin d'expertise financière senior sans le coût d'un plein temps.",
            "**Le DAF gère-t-il les RH ?** Dans certaines structures, oui — le DAF peut superviser les fonctions RH, juridique, et administrative. C'est plus fréquent dans les PME où les rôles sont plus transversaux.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    "drh-externalise": {
      meta: {
        title: "DRH Externalisé : Définition & Missions | Tarifs 2026 | Iter Advisors",
        description: "Le DRH externalisé est un directeur des ressources humaines senior qui intervient à temps partagé. Définition complète, missions, tarifs et différences avec le DRH interne.",
      },
      h1: "DRH Externalisé — Définition, Missions et Tarifs | 2026 | Iter Advisors",
      sections: [
        {
          content: [
            "Le **DRH externalisé** est un professionnel senior des ressources humaines qui intervient dans votre entreprise sans en être salarié à plein temps. Généralement recruté sous forme de mission récurrente (2 à 8 jours par mois), il assume les responsabilités stratégiques d'un directeur des ressources humaines pour une fraction du coût d'un salarié permanent.",
            "Ce modèle connaît une croissance rapide en France, porté par deux tendances : la difficulté des PME à recruter un DRH interne qualifié, et le besoin croissant de structuration RH dans les entreprises en croissance.",
          ],
        },
        {
          heading: "Les 6 missions du DRH externalisé",
          content: [
            "**1. Stratégie RH et plan de transformation.** Le DRH externalisé évalue la maturité RH de l'entreprise, identifie les priorités (recrutement, conformité, rétention), et construit une feuille de route sur 12 à 18 mois.",
            "**2. Recrutement et acquisition de talents.** Il structure le processus de recrutement (sourcing, entretiens, onboarding), forme les managers aux entretiens, et supervise les recrutements clés.",
            "**3. Gestion de la paie et conformité sociale.** Il supervise la paie, gère les relations avec l'inspection du travail et l'URSSAF, et assure la conformité en cas d'audit.",
            "**4. Développement des talents et management.** Il met en place les entretiens annuels, les plans de formation, les grilles de rémunération, et accompagne les managers sur les sujets sensibles.",
            "**5. Relations sociales et dialogue interne.** Il prépare et anime les réunions avec les représentants du personnel, négocie les accords d'entreprise, et gère les situations de crise sociale.",
            "**6. Digitalisation RH (SIRH).** Il sélectionne et déploie les outils SIRH (Silae, Lucca, PayFit), automatise les processus RH, et met en place le reporting RH pour la direction.",
          ],
        },
        {
          heading: "DRH externalisé vs DRH interne",
          content: [
            "**Coût annuel :** DRH externalisé 30 000€-96 000€ vs DRH interne 80 000€-150 000€ chargé.",
            "**Mise en place :** 1 à 2 semaines pour un DRH externalisé vs 3 à 6 mois (recrutement + onboarding) pour un DRH interne.",
            "**Flexibilité :** volume ajustable mensuellement pour l'externalisé vs CDI fixe pour l'interne.",
            "**Expertise :** multi-sectorielle avec benchmarks croisés pour l'externalisé vs mono-entreprise pour l'interne.",
            "**Continuité :** garantie par le cabinet pour l'externalisé vs risque de départ = vide pour l'interne.",
          ],
        },
        {
          heading: "Tarifs indicatifs 2026",
          content: [
            "**Formule Essentiel (2 jours/mois) :** audit RH, recrutement 1-2 postes/mois, conformité de base — 2 500€/mois.",
            "**Formule Croissance (4 jours/mois) :** + onboarding, gestion des talents, rémunération — 4 500€/mois.",
            "**Formule Premium (8 jours/mois) :** + SIRH, culture d'entreprise, formation, due diligence RH — 8 000€/mois.",
            "**Formule Projet (sur mesure) :** audit flash, due diligence, accompagnement levée — 3 000€-6 000€.",
            "Découvrez notre [service DRH externalisé](/drh-externalise).",
          ],
        },
        {
          heading: "FAQ — DRH Externalisé",
          content: [
            "**Le DRH externalisé gère-t-il la paie ?** Il supervise et coordonne la paie mais ne la traite pas directement. Il travaille avec votre expert-comptable ou un partenaire paie pour garantir la conformité.",
            "**Quelle est la différence entre DRH externalisé et DRH à temps partagé ?** C'est la même chose. 'DRH externalisé' est le terme générique. 'DRH à temps partagé' insiste sur le mode d'organisation récurrente.",
            "**Comment mesurer le ROI d'un DRH externalisé ?** Sur 4 axes : time-to-hire réduit (45 à 25 jours), turnover en baisse (15% à 8%), conformité sociale garantie, et 2 à 5 heures/semaine récupérées par le fondateur.",
            "**Le DRH externalisé intervient-il sur site ?** Oui, selon vos besoins. Nos DRH interviennent sur site et en distanciel, avec une expertise particulière sur les sujets transfrontaliers France-Espagne.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    "controle-de-gestion": {
      meta: {
        title: "Contrôle de Gestion : Définition & Outils | Pilotage Financier | Iter Advisors",
        description: "Le contrôle de gestion est la fonction qui mesure, analyse et pilote la performance de l'entreprise. Définition, outils, tableaux de bord et missions du contrôleur de gestion.",
      },
      h1: "Contrôle de Gestion — Définition, Outils et Missions | 2026 | Iter Advisors",
      sections: [
        {
          content: [
            "Le **contrôle de gestion** est la fonction de l'entreprise chargée de mesurer, analyser, et piloter la performance économique et financière. Contrairement à la comptabilité qui enregistre les flux passés, le contrôle de gestion regarde vers l'avenir : il construit des prévisions, identifie les écarts, et recommande des actions correctives.",
            "Pour les PME et startups en croissance, le contrôle de gestion est souvent négligé — jusqu'au jour où le fondateur se rend compte qu'il ne sait pas si son entreprise est rentable, quels sont ses produits les plus performants, ou où part son argent.",
          ],
        },
        {
          heading: "Définition complète",
          content: [
            "Le contrôle de gestion est un processus par lequel les managers s'assurent que les ressources de l'entreprise sont obtenues et utilisées de façon efficace et efficiente pour atteindre ses objectifs.",
            "**Efficacité :** faire les bonnes choses (atteindre les objectifs). **Efficience :** faire les choses bien (optimiser l'utilisation des ressources). **Économie :** minimiser les coûts pour un résultat donné.",
            "Il se décline en trois niveaux : **Contrôle stratégique** (pertinence de la stratégie et allocation des ressources), **Contrôle opérationnel** (suivi des budgets, analyse des écarts, ajustements tactiques), et **Contrôle interne** (conformité des processus, fiabilité de l'information, prévention des risques).",
          ],
        },
        {
          heading: "Les outils du contrôle de gestion",
          content: [
            "**Tableau de bord de pilotage (Dashboard).** Agrège les KPIs sur une base mensuelle et permet au dirigeant de visualiser la santé de l'entreprise. Il comprend des KPIs financiers (CA, marge brute, EBITDA, trésorerie, BFR), commerciaux (clients, panier moyen, taux de conversion, churn), opérationnels (productivité, qualité, délais), et RH (effectifs, turnover, masse salariale).",
            "**Budget et forecast.** Le budget annuel fixe les objectifs. Le forecast ajuste le budget en fonction de la réalité avec une revue mensuelle et analyse des écarts.",
            "**Reporting de gestion.** Livrable mensuel du contrôleur : résultats du mois, analyse des écarts par rapport au budget, tendances sur 3 à 12 mois, recommandations d'action.",
            "**Costing et analyse de rentabilité.** Analyse des coûts par produit, client, ou canal pour identifier les zones de valeur et les fuites de rentabilité.",
          ],
        },
        {
          heading: "Les 12 KPIs indispensables d'un tableau de bord startup",
          content: [
            "**MRR/ARR** (revenu récurrent mensuel/annuel) — alerte si churn > 5%.",
            "**Burn rate** (dépenses - revenus) — alerte si runway < 6 mois.",
            "**Runway** (trésorerie / burn) — alerte si < 6 mois.",
            "**LTV/CAC** (valeur vie client / coût acquisition) — alerte si < 3x.",
            "**CAC Payback** (CAC / ARPU × marge) — alerte si > 18 mois.",
            "**NRR** ((MRR début + Expansion - Churn) / début) — alerte si < 100%.",
            "**Marge brute** ((CA - Coûts directs) / CA) — alerte si < 60% pour le SaaS.",
            "**BFR/CA** (BFR en jours de CA) — alerte si > 45 jours.",
            "**Churn client** (clients perdus / total) — alerte si > 3%/mois.",
            "**NPS** (% promoteurs - % détracteurs) — alerte si < 30.",
            "**Rétention employés** (1 - départs / effectif) — alerte si < 85%.",
            "**Productivité** (CA / nombre d'employés) — alerte si baisse > 10%.",
          ],
        },
        {
          heading: "FAQ — Contrôle de Gestion",
          content: [
            "**Quelle est la différence entre comptabilité et contrôle de gestion ?** La comptabilité enregistre et justifie les flux passés. Le contrôle de gestion analyse ces données pour piloter l'avenir : prévisions, budgets, KPIs, et recommandations.",
            "**Quand une startup a-t-elle besoin d'un contrôleur de gestion ?** Dès que le CA dépasse 500K€ ou que l'équipe dépasse 15 personnes.",
            "**Combien coûte un contrôleur de gestion externalisé ?** Les formules Iter Advisors démarrent à 1 500€/mois pour un tableau de bord mensuel. La formule complète est à 3 500€/mois. Découvrez notre [service de gestion financière externalisée](/services/gestion-financiere-externalisee).",
            "**Quels outils utilise un contrôleur de gestion ?** Power BI pour les dashboards, Excel pour les modèles financiers, Pennylane pour la comptabilité, et Agicap pour la trésorerie.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
    "fractional-cfo": {
      meta: {
        title: "Fractional CFO : Définition & Tarifs 2026 | CFO à Temps Partiel | Iter Advisors",
        description: "Le Fractional CFO est un directeur financier senior qui intervient à temps partiel. Définition, missions, tarifs et différences avec le DAF externalisé. Guide complet 2026.",
      },
      h1: "Fractional CFO — Définition, Tarifs et Missions | 2026 | Iter Advisors",
      sections: [
        {
          content: [
            "Le **Fractional CFO** (Chief Financial Officer à temps partiel) est un modèle de direction financière qui connaît une croissance explosive dans l'écosystème startup. Contrairement au CFO à plein temps qui coûte 120 000€ à 200 000€ par an, le Fractional CFO apporte la même expertise stratégique pour un budget 3 à 5 fois inférieur, en intervenant quelques jours par semaine.",
            "Ce modèle est né dans la Silicon Valley et s'est rapidement répandu en Europe. En France, on parle également de [DAF externalisé](/daf-externalise) ou de CFO à temps partagé.",
          ],
        },
        {
          heading: "Définition complète",
          content: [
            "Un Fractional CFO est un directeur financier senior qui intervient dans votre entreprise à temps partiel — généralement 1 à 3 jours par semaine. Il assume les responsabilités stratégiques d'un CFO à plein temps sans le coût fixe d'un salarié permanent.",
            "**Expertise senior à la demande.** Le Fractional CFO a généralement 10 à 20 ans d'expérience en finance d'entreprise, souvent dans des cabinets M&A, des fonds d'investissement, ou des startups en forte croissance.",
            "**Flexibilité totale.** Vous augmentez l'intervention pendant la levée de fonds, vous réduisez après la clôture. Aucun engagement de long terme, aucune charge sociale.",
            "**Focus sur la valeur ajoutée.** Le Fractional CFO ne fait pas de la saisie comptable. Il se concentre sur les missions à haute valeur ajoutée : stratégie financière, prévisions, relations investisseurs, et conseil au fondateur.",
          ],
        },
        {
          heading: "Les 5 missions d'un Fractional CFO",
          content: [
            "**1. Planification financière et forecast.** Il construit les modèles financiers à 3 scénarios, produit les forecasts mensuels, et aide le fondateur à anticiper les besoins de trésorerie.",
            "**2. Accompagnement aux levées de fonds.** Il prépare le data room, construit le modèle financier, rédige le deck investisseur, et coach le fondateur sur les questions de due diligence.",
            "**3. Reporting aux investisseurs.** Il produit les reportings mensuels pour le board et les investisseurs (KPIs SaaS, burn rate, runway, cohortes) et participe aux board meetings.",
            "**4. Gestion de la trésorerie et du burn.** Il pilote le cash, optimise le BFR, négocie avec les banques, et alerte le fondateur sur les risques de trésorerie.",
            "**5. Encadrement de l'équipe comptable et finance.** Il supervise l'expert-comptable, recrute et forme les profils finance, et met en place les processus financiers.",
          ],
        },
        {
          heading: "Fractional CFO vs DAF Externalisé",
          content: [
            "**Contexte :** Fractional CFO pour startups et scale-ups tech ; [DAF externalisé](/daf-externalise) pour PME traditionnelles et ETI.",
            "**Focus :** Fractional CFO orienté levée de fonds, M&A, relations VC ; DAF externalisé orienté conformité, optimisation, gestion.",
            "**Profil :** Fractional CFO souvent ex-VC, ex-M&A, ex-startup ; DAF externalisé souvent issu de l'expertise comptable ou du contrôle de gestion.",
            "En pratique : si vous êtes une startup SaaS qui prépare une Series A, vous avez besoin d'un Fractional CFO. Si vous êtes une PME industrielle qui veut structurer sa fonction financière, vous avez besoin d'un [DAF externalisé](/daf-externalise). Chez Iter Advisors, nos profils couvrent les deux cas de figure.",
          ],
        },
        {
          heading: "Tarifs Fractional CFO 2026",
          content: [
            "**Formule Starter (2 jours/semaine) :** reporting, trésorerie, clôture mensuelle — 4 500€/mois.",
            "**Formule Growth (4 jours/semaine) :** + levée de fonds, board, KPIs — 8 500€/mois.",
            "**Formule Scale (8 jours/semaine) :** + planification, relations investisseurs, mentoring — 15 000€/mois.",
            "**Formule Projet (sur mesure) :** data room, modèle financier, due diligence — 3 000€-8 000€.",
            "Découvrez notre offre [Fractional CFO](/fr/fractional-cfo).",
          ],
        },
        {
          heading: "FAQ — Fractional CFO",
          content: [
            "**Quelle est la différence entre un Fractional CFO et un comptable ?** Un comptable enregistre et rapproche les transactions. Un Fractional CFO analyse la performance, construit des prévisions, accompagne les levées, et conseille le fondateur sur les décisions stratégiques.",
            "**Un Fractional CFO peut-il aider pour une levée de fonds ?** Oui, c'est la mission la plus fréquente. Les Fractional CFO d'Iter Advisors ont accompagné plus de 50 levées de fonds du Seed à la Series B.",
            "**Dans quel délai un Fractional CFO peut-il intervenir ?** Iter Advisors met en relation sous 5 jours ouvrés. Le diagnostic et la mise en route sont réalisés sous 2 semaines.",
            "**Le Fractional CFO est-il présent sur site ?** Selon vos besoins. Nos Fractional CFO interviennent sur site (Paris, Toulouse, Barcelone) et en distanciel.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
  },
  en: {
    bfr: {
      meta: {
        title: "Working Capital Requirement (WCR): Definition and Optimization | Iter Advisors",
        description:
          "Working Capital Requirement: definition, calculation formula, and strategies to optimize your cash flow.",
      },
      h1: "Working Capital Requirement (WCR): Definition and Calculation",
      sections: [
        {
          content: [
            "**WCR** (Working Capital Requirement), also known as **Working Capital**, is one of the most important financial metrics for entrepreneurs to master. It represents the amount of cash your company must tie up to finance the gap between when you pay your suppliers and when you receive payment from your customers.",
            "Unlike accounting profit (which may be positive on paper), WCR is cash reality: it's the money that \"escapes\" from your bank account each month.",
          ],
        },
        {
          heading: "WCR Definition",
          content: [
            "WCR is calculated using the following formula:",
            "**WCR = (Inventory + Receivables) - (Payables + Tax and Social Liabilities)**",
            "In other words, WCR measures the gap between your short-term resources (what you owe) and your short-term needs (what you're waiting to receive).",
            "A positive WCR means you must finance this gap with cash. A negative WCR (rare but possible in e-commerce models) means you receive payment from customers before paying suppliers.",
          ],
        },
        {
          heading: "WCR Components",
          content: [
            "**Inventory:** Average duration your products remain in inventory before sale. A manufacturer with 30 days of inventory ties up more cash than a SaaS with zero inventory.",
            "**Customer Payment Delay (DSO - Days Sales Outstanding):** Number of days before customers pay their invoices. If you invoice net-30 but customers pay net-60, you wait 60 days.",
            "**Supplier Payment Delay (DPO - Days Payable Outstanding):** Number of days before you pay suppliers. If you pay net-30, it's 30 days.",
          ],
        },
        {
          heading: "Why WCR is Critical",
          content: [
            "Poor WCR management is one of the main causes of cash crises, even for profitable companies. Imagine a SaaS startup growing 50% annually: its revenue (and thus receivables) increases 50%, which increases WCR by 50%. Suddenly, you need much more cash to finance this growth.",
            "This is why funding rounds are often necessary during rapid growth: not to cover losses, but to finance WCR increases driven by growth.",
          ],
        },
        {
          heading: "How to Reduce Your WCR",
          content: [
            "**Negotiate longer supplier terms:** Moving from net-30 to net-60 frees up 30 days of cash—essentially free money.",
            "**Reduce customer payment delays:** Invoice upon receipt, offer discounts for early payment, or use factoring for quick cash.",
            "**Optimize inventory:** High WCR may indicate excess stock or dead inventory. Kanban or just-in-time methods help reduce tied-up inventory.",
            "**Use trade credit strategically:** A credit line or factoring facility can temporarily finance WCR while awaiting funding.",
          ],
        },
        {
          heading: "FAQ - WCR",
          content: [
            "**Can WCR be negative?** Yes—it's actually great! E-commerce and SaaS models can have negative WCR by receiving customer payments before paying suppliers.",
            "**Why is my startup growing but cash declining?** Likely due to WCR increase. You're financing growth with cash and depleting reserves. Hence the importance of funding rounds during growth phases.",
          ],
        },
      ],
      ctaButton: "Make an appointment",
    },
    ebitda: {
      meta: {
        title: "EBITDA: Definition, Calculation and Interpretation | Iter Advisors",
        description:
          "EBITDA definition: calculation formula, difference with EBIT, and how to use it to evaluate company performance.",
      },
      h1: "EBITDA: Definition, Calculation and Use in Corporate Finance",
      sections: [
        {
          content: [
            "**EBITDA** (Earnings Before Interest, Taxes, Depreciation and Amortization) is one of the most widely used financial metrics in business, particularly among investors, bankers and financial analysts. It measures operational performance before financial (interest), tax, and non-cash (depreciation/amortization) elements.",
          ],
        },
        {
          heading: "EBITDA Definition",
          content: [
            "EBITDA measures a company's operating performance before interest, taxes, depreciation, and amortization. It represents the cash generated from core business operations, independent of capital structure and accounting choices.",
            "**Calculation formula:**",
            "EBITDA = Net Income + Taxes + Interest Expense + Depreciation & Amortization",
            "Or equivalently:",
            "EBITDA = Revenue - Operating Expenses (excluding depreciation)",
          ],
        },
        {
          heading: "Why is EBITDA So Important?",
          content: [
            "EBITDA is valued by investors and analysts for several reasons.",
            "**Comparability:** By neutralizing capital structure and depreciation policy effects, EBITDA allows performance comparison between companies independent of financial engineering.",
            "**Cash generation proxy:** EBITDA approximates cash-generating capacity, which is why valuations often use EBITDA multiples (e.g., 'valued at 8x EBITDA').",
            "**Loan covenants:** Banks often require minimum debt/EBITDA ratios in loan agreements.",
          ],
        },
        {
          heading: "EBITDA Interpretation",
          content: [
            "Positive EBITDA means generating value from operations. Negative EBITDA signals distress.",
            "EBITDA margin (EBITDA/Revenue) indicates operational profitability. 15-20% is good for most sectors; SaaS typically targets 20%+.",
            "An **[Outsourced CFO](/en/fractional-cfo)** can help calculate and contextualize your EBITDA within your industry and identify improvement levers.",
          ],
        },
        {
          heading: "FAQ - EBITDA",
          content: [
            "**Is EBITDA reliable?** It's useful but imperfect. It ignores maintenance capital expenditure and working capital needs. Complement with free cash flow for complete analysis.",
            "**What's good EBITDA?** No universal standard. Interpret by sector and development stage. Growth-stage startups may have negative EBITDA while being healthy.",
          ],
        },
      ],
      ctaButton: "Make an appointment",
    },
    cfo: {
      meta: {
        title: "CFO: Definition, Role and Difference from Finance Director | Iter Advisors",
        description:
          "CFO (Chief Financial Officer) definition: role, responsibilities and difference from traditional finance director. Expert guide from Iter Advisors.",
      },
      h1: "CFO (Chief Financial Officer): Definition and Role",
      sections: [
        {
          content: [
            "The **CFO** (Chief Financial Officer) is the English title for a company's Chief Financial Officer. In France, this title is increasingly used in startups, scale-ups, and internationally-minded companies as a replacement for or complement to the traditional title of **[Finance Director](/en/fractional-cfo)**.",
          ],
        },
        {
          heading: "CFO Definition",
          content: [
            "The CFO is responsible for an organization's financial management. CFO is a C-suite executive reporting directly to the CEO. Responsibilities span accounting, cash management, financial reporting, financial planning (FP&A), taxation, and often investor relations.",
          ],
        },
        {
          heading: "CFO vs Finance Director: What's the Difference?",
          content: [
            "In practice, CFO and Finance Director (Director) are the same role. The difference is primarily cultural and sectoral.",
            "The **Finance Director** title is more common in traditional French companies (SMEs, mid-market, large enterprises). Often includes broader administrative scope (legal, HR in some cases).",
            "The **CFO** title dominates startups, scale-ups, and internationally-minded companies. Perceived as more modern and strategically-focused.",
            "In both cases, core responsibilities are similar: cash management, financial reporting, strategic CEO support, bank and investor relations.",
          ],
        },
        {
          heading: "The Outsourced CFO (Fractional CFO)",
          content: [
            "The **Fractional CFO** (or **[Outsourced CFO](/en/fractional-cfo)**) concept serves internationally-minded companies just as **[Outsourced Finance Director](/en/fractional-cfo)** does for traditional French companies. A senior CFO divides time across multiple client companies, providing high-level expertise at SME/startup-friendly costs.",
            "At Iter Advisors, our partners work interchangeably as Outsourced Finance Directors or Fractional CFOs based on client company culture. Learn more about our **[Outsourced CFO](/en/fractional-cfo)** services on our dedicated page.",
          ],
        },
        {
          heading: "FAQ - CFO",
          content: [
            "**What's the difference between CFO and CFA?** CFA (Chartered Financial Analyst) is a professional certification from the CFA Institute, primarily for asset management and financial analysis. CFO is a job title. They're unrelated.",
            "**Can a CFO be outsourced?** Yes. Fractional CFO is an increasingly popular model, especially in the US and UK. In France, we typically say Outsourced Finance Director, but it's the same concept.",
          ],
        },
      ],
      ctaButton: "Make an appointment",
    },
  },
  es: {
    bfr: {
      meta: {
        title: "BFR: Definición, Cálculo y Optimización | Iter Advisors",
        description:
          "Necesidad de Capital de Trabajo (BFR): definición, fórmula de cálculo y estrategias de optimización para mejorar su tesorería.",
      },
      h1: "BFR (Necesidad de Capital de Trabajo): Definición y Cálculo",
      sections: [
        {
          content: [
            "El **BFR** (Necesidad de Capital de Trabajo) es uno de los indicadores financieros más importantes que debe dominar un emprendedor. Representa el montante de tesorería que su empresa debe inmovilizar para financiar la brecha entre el momento en que paga a sus proveedores y el momento en que cobra de sus clientes.",
            "A diferencia del resultado contable (que puede ser positivo sobre el papel), el BFR es una realidad de caja: es el efectivo que \"se escapa\" de su cuenta bancaria cada mes.",
          ],
        },
        {
          heading: "Definición del BFR",
          content: [
            "El BFR se calcula según la siguiente fórmula:",
            "**BFR = (Inventario + Cuentas por Cobrar) - (Cuentas por Pagar + Deudas Fiscales y Sociales)**",
            "En otras palabras, el BFR mide la brecha entre sus recursos a corto plazo (lo que debe pagar) y sus necesidades a corto plazo (lo que espera recibir).",
            "Un BFR positivo significa que debe financiar esta brecha con tesorería. Un BFR negativo (raro pero posible en modelos de e-commerce) significa que recibe dinero de clientes antes de pagar proveedores.",
          ],
        },
        {
          heading: "Componentes del BFR",
          content: [
            "**Inventario:** Duración promedio que sus productos permanecen en inventario antes de la venta. Un fabricante con 30 días de inventario inmoviliza más efectivo que un SaaS con cero inventario.",
            "**Plazo de Cobro a Clientes (DSO):** Número de días antes de que los clientes paguen las facturas. Si factura neto-30 pero los clientes pagan neto-60, espera 60 días.",
            "**Plazo de Pago a Proveedores (DPO):** Número de días antes de que pague a proveedores. Si paga neto-30, son 30 días.",
          ],
        },
        {
          heading: "¿Por Qué el BFR es Crítico?",
          content: [
            "Un BFR mal gestionado es una de las principales causas de crisis de tesorería, incluso para empresas rentables. Imagine una startup SaaS que crece 50% anualmente: su ingresos (y por tanto sus cuentas por cobrar) aumentan 50%, lo que aumenta el BFR 50%. De repente, necesita mucho más efectivo para financiar este crecimiento.",
            "Por eso una ronda de financiación suele ser necesaria durante el crecimiento rápido: no para cubrir pérdidas, sino para financiar el aumento del BFR asociado al crecimiento.",
          ],
        },
        {
          heading: "Cómo Reducir su BFR",
          content: [
            "**Negociar plazos de pago más largos:** Pasar de neto-30 a neto-60 con proveedores libera 30 días de tesorería—efectivo gratis esencialmente.",
            "**Reducir plazos de cobro:** Facturar a la entrega, ofrecer descuentos por pago inmediato, o usar factoraje para cobrar rápidamente.",
            "**Optimizar inventario:** Un BFR alto puede indicar exceso de stock o stock muerto. Métodos Kanban o just-in-time reducen inventario inmovilizado.",
            "**Usar crédito comercial estratégicamente:** Una línea de crédito o factoraje puede financiar temporalmente el BFR mientras espera financiación.",
          ],
        },
        {
          heading: "FAQ - BFR",
          content: [
            "**¿Puede el BFR ser negativo?** Sí, ¡incluso es excelente! Modelos de e-commerce y SaaS pueden tener BFR negativo al cobrar de clientes antes de pagar proveedores.",
            "**¿Por qué mi startup crece pero la tesorería baja?** Probablemente por aumento de BFR. Financia el crecimiento con tesorería y agota reservas. De ahí la importancia de rondas de financiación en fases de crecimiento.",
          ],
        },
      ],
      ctaButton: "Concierte una cita",
    },
    ebitda: {
      meta: {
        title: "EBITDA: Definición, Cálculo e Interpretación | Iter Advisors",
        description:
          "Definición de EBITDA: fórmula de cálculo, diferencia con EBE, y cómo usarlo para evaluar el desempeño de una empresa.",
      },
      h1: "EBITDA: Definición, Cálculo y Uso en Finanzas Empresariales",
      sections: [
        {
          content: [
            "El **EBITDA** (Earnings Before Interest, Taxes, Depreciation and Amortization) es uno de los indicadores financieros más utilizados en el mundo de los negocios, particularmente por inversores, banqueros y analistas financieros. Mide el desempeño operacional antes de intereses, impuestos y elementos no monetarios (depreciación/amortización).",
          ],
        },
        {
          heading: "Definición del EBITDA",
          content: [
            "El EBITDA mide el desempeño operacional de una empresa antes de intereses, impuestos, depreciación y amortización. Representa el efectivo generado desde operaciones básicas, independientemente de estructura de capital y elecciones contables.",
            "**Fórmula de cálculo:**",
            "EBITDA = Ingresos Netos + Impuestos + Gastos por Intereses + Depreciación y Amortización",
            "O equivalentemente:",
            "EBITDA = Ingresos - Gastos Operacionales (excluyendo depreciación)",
          ],
        },
        {
          heading: "¿Por Qué es tan Importante el EBITDA?",
          content: [
            "El EBITDA es valorado por inversores y analistas por varias razones.",
            "**Comparabilidad:** Al neutralizar estructura de capital y políticas de depreciación, EBITDA permite comparar desempeño entre empresas independientemente de ingeniería financiera.",
            "**Proxy de generación de efectivo:** EBITDA aproxima capacidad de generar efectivo, por eso valoraciones usan múltiplos de EBITDA (ej: 'valorada en 8x EBITDA').",
            "**Pactos de préstamos:** Bancos a menudo requieren ratios mínimos de deuda/EBITDA en contratos de préstamo.",
          ],
        },
        {
          heading: "Interpretación del EBITDA",
          content: [
            "EBITDA positivo significa generar valor desde operaciones. EBITDA negativo señala distress.",
            "Margen de EBITDA (EBITDA/Ingresos) indica rentabilidad operacional. 15-20% es bueno para la mayoría de sectores; SaaS típicamente apunta a 20%+.",
            "Un **[CFO externalizado](/es/externalizacion-daf)** puede ayudar a calcular e interpretar su EBITDA en contexto de su industria e identificar palancas de mejora.",
          ],
        },
        {
          heading: "FAQ - EBITDA",
          content: [
            "**¿Es EBITDA confiable?** Es útil pero imperfecto. Ignora gastos de capital de mantenimiento y necesidades de capital de trabajo. Complemente con flujo de caja libre para análisis completo.",
            "**¿Qué es buen EBITDA?** Sin estándar universal. Interprete por sector y etapa de desarrollo. Startups en crecimiento pueden tener EBITDA negativo siendo saludables.",
          ],
        },
      ],
      ctaButton: "Concierte una cita",
    },
    cfo: {
      meta: {
        title: "CFO: Definición, Rol y Diferencia con Director Financiero | Iter Advisors",
        description:
          "Definición de CFO (Chief Financial Officer): rol, responsabilidades y diferencia con Director Financiero. Guía de expertos de Iter Advisors.",
      },
      h1: "CFO (Chief Financial Officer): Definición y Rol",
      sections: [
        {
          content: [
            "El **CFO** (Chief Financial Officer) es el título en inglés del Director Financiero de una empresa. En España, este título es cada vez más utilizado en startups, scale-ups y empresas con cultura internacional, como complemento o reemplazo del título tradicional de **[Director Financiero](/es/externalizacion-daf)**.",
          ],
        },
        {
          heading: "Definición del CFO",
          content: [
            "El CFO es responsable de la gestión financiera de una organización. Es miembro del comité de dirección (comex) y reporta directamente al CEO. Las responsabilidades abarcan contabilidad, gestión de tesorería, reporting financiero, planificación financiera, fiscalidad, y a menudo relaciones con inversores.",
          ],
        },
        {
          heading: "CFO vs Director Financiero: ¿Cuál es la Diferencia?",
          content: [
            "En la práctica, CFO y Director Financiero son el mismo rol. La diferencia es principalmente cultural y sectorial.",
            "El título **Director Financiero** es más común en empresas españolas tradicionales (pymes, grandes empresas). A menudo incluye alcance administrativo más amplio (legal, RH en algunos casos).",
            "El título **CFO** domina en startups, scale-ups y empresas con cultura internacional. Percibido como más moderno y estratégicamente enfocado.",
            "En ambos casos, responsabilidades principales son similares: gestión de tesorería, reporting financiero, apoyo estratégico al CEO, relaciones bancarias e inversoras.",
          ],
        },
        {
          heading: "El CFO Externalizado (CFO Fraccionado)",
          content: [
            "El concepto de **CFO Externalizado** (o CFO Fraccionado en inglés) sirve a empresas con cultura internacional tal como **[Director Financiero Externalizado](/es/externalizacion-daf)** lo hace para empresas españolas tradicionales. Un CFO senior divide su tiempo entre múltiples empresas clientes, proporcionando experiencia de alto nivel a costos amigables para pymes y startups.",
            "En Iter Advisors, nuestros asociados trabajan indistintamente como Director Financiero Externalizado o CFO Externalizado según la cultura de la empresa cliente. Aprenda más sobre nuestros servicios de **[CFO Externalizado](/es/externalizacion-daf)** en nuestra página dedicada.",
          ],
        },
        {
          heading: "FAQ - CFO",
          content: [
            "**¿Cuál es la diferencia entre CFO y CFA?** CFA (Chartered Financial Analyst) es una certificación profesional del CFA Institute, principalmente para gestión de activos y análisis financiero. CFO es un título de puesto. No están relacionados.",
            "**¿Puede un CFO ser externalizado?** Sí. CFO Fraccionado es modelo cada vez más popular, especialmente en EE.UU. y Reino Unido. En España, típicamente decimos Director Financiero Externalizado, pero es el mismo concepto.",
          ],
        },
      ],
      ctaButton: "Concierte una cita",
    },
  },
};


// Mapping from URL slug to internal content key
const slugMapping: Record<Locale, Record<string, GlossaryEntrySlug>> = {
  fr: {
    bfr: "bfr",
    ebitda: "ebitda",
    cfo: "cfo",
    // TICKET 21 — 8 nouvelles pages glossaire
    "besoin-fonds-roulement-bfr": "besoin-fonds-roulement-bfr",
    "cash-burn-runway": "cash-burn-runway",
    "cac-ltv": "cac-ltv",
    "arr-mrr": "arr-mrr",
    "churn-rate": "churn-rate",
    "run-rate": "run-rate",
    "bspce-bsa": "bspce-bsa",
    // EC-02 — 4 nouvelles pages glossaire
    daf: "daf",
    "drh-externalise": "drh-externalise",
    "controle-de-gestion": "controle-de-gestion",
    "fractional-cfo": "fractional-cfo",
  },
  en: {
    bfr: "bfr",
    ebitda: "ebitda",
    cfo: "cfo",
    // FR fallback for new slugs (EN translation pending)
    "besoin-fonds-roulement-bfr": "besoin-fonds-roulement-bfr",
    "cash-burn-runway": "cash-burn-runway",
    "cac-ltv": "cac-ltv",
    "arr-mrr": "arr-mrr",
    "churn-rate": "churn-rate",
    "run-rate": "run-rate",
    "bspce-bsa": "bspce-bsa",
    // EC-02 — FR fallback for new glossary pages (EN translation pending)
    daf: "daf",
    "drh-externalise": "drh-externalise",
    "controle-de-gestion": "controle-de-gestion",
    "fractional-cfo": "fractional-cfo",
  },
  es: {
    bfr: "bfr",
    ebitda: "ebitda",
    cfo: "cfo",
    // FR fallback for new slugs (ES translation pending)
    "besoin-fonds-roulement-bfr": "besoin-fonds-roulement-bfr",
    "cash-burn-runway": "cash-burn-runway",
    "cac-ltv": "cac-ltv",
    "arr-mrr": "arr-mrr",
    "churn-rate": "churn-rate",
    "run-rate": "run-rate",
    "bspce-bsa": "bspce-bsa",
    // EC-02 — FR fallback for new glossary pages (ES translation pending)
    daf: "daf",
    "drh-externalise": "drh-externalise",
    "controle-de-gestion": "controle-de-gestion",
    "fractional-cfo": "fractional-cfo",
  },
};

/**
 * Locales whose entries fall back to FR content when the locale-specific
 * version is missing — used for the TICKET 21 new entries (EN/ES translations
 * not yet produced).
 */
function getEntryWithFrFallback(locale: Locale, slug: GlossaryEntrySlug): GlossaryEntryContent | undefined {
  return glossaryEntries[locale]?.[slug] ?? glossaryEntries.fr?.[slug];
}

export function getGlossaryEntryContent(locale: string, urlSlug: string): GlossaryEntryContent | undefined {
  const key = slugMapping[locale as Locale]?.[urlSlug];
  if (!key) return undefined;
  return getEntryWithFrFallback(locale as Locale, key);
}
