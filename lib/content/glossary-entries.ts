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
  // EC-02 — 4 pages glossaire DAF ecosystem
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

/**
 * Termes du glossaire qui ont une fiche à eux.
 *
 * SEO-AUD-0824 §3 (2026-08-24) — le hub glossaire affichait chaque terme avec
 * sa définition, mais sans jamais lier la fiche détaillée : six d'entre elles
 * étaient orphelines, sans un seul lien entrant sur tout le site.
 *
 * `bfr` est volontairement absent : la route existe encore mais redirige vers
 * `besoin-fonds-roulement-bfr`. Ces fiches n'existent qu'en français — les
 * variantes EN et ES répondent en 308 ou en 404.
 */
export const GLOSSARY_PAGE_SLUGS: ReadonlySet<string> = new Set([
  "ebitda",
  "cfo",
  "besoin-fonds-roulement-bfr",
  "cash-burn-runway",
  "cac-ltv",
  "arr-mrr",
  "churn-rate",
  "run-rate",
  "bspce-bsa",
  "daf",
  "drh-externalise",
  "controle-de-gestion",
  "fractional-cfo",
]);

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
        title: "EBITDA : Définition et Calcul | Iter Advisors",
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
            "Un **[DAF externalisé](/daf-externalise)** peut vous aider à calculer et à interpréter votre EBITDA dans le contexte de votre secteur d'activité, et à identifier les leviers d'amélioration. Pour en savoir plus sur les autres indicateurs financiers clés, consultez notre définition du **[BFR](/ressources/glossaire/besoin-fonds-roulement-bfr)**.",
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
        title: "CFO — Rôle, Missions et Définition | Iter Advisors",
        description:
          "CFO : définition, missions du Chief Financial Officer, différence avec un DAF et pourquoi les startups ont besoin d'un CFO externalisé. Guide Iter Advisors.",
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
        title: "BFR — Définition et calcul complet | Iter Advisors",
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
        title: "Cash Burn & Runway — Calcul et définition | Iter Advisors",
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
        title: "Run Rate — Définition et calcul | Iter Advisors",
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
        title: "BSPCE & BSA — Guide pour startups françaises | Iter Advisors",
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
    // EC-02 — DAF ecosystem
    daf: {
      meta: {
        title: "DAF : définition, missions et salaire | Iter Advisors",
        description:
          "DAF (Directeur Administratif et Financier) : définition du rôle, missions, différence avec le CFO et coût d'un DAF externalisé pour PME.",
      },
      h1: "DAF externalisé : définition, missions et fonctionnement",
      sections: [
        {
          content: [
            "Le **DAF** (Directeur Administratif et Financier) est le responsable de la gestion financière et administrative d'une entreprise. En France, il occupe un rôle stratégique au sein du comité de direction et pilote l'ensemble des fonctions financières : comptabilité, trésorerie, contrôle de gestion, relations bancaires et parfois les ressources humaines.",
            "Un **[DAF externalisé](/daf-externalise)** exerce ces mêmes missions pour plusieurs entreprises en parallèle, à temps partagé — généralement 2 à 8 jours par mois. Ce modèle permet aux PME, startups et ETI d'accéder à une expertise financière senior sans le coût d'un temps plein.",
          ],
        },
        {
          heading: "Rôle et missions du DAF",
          content: [
            "**Pilotage financier :** Construction du budget annuel, prévisions de trésorerie, reporting mensuel et tableaux de bord pour le dirigeant et les investisseurs.",
            "**Comptabilité et conformité :** Supervision de la comptabilité, liasse fiscale, relations expert-comptable et commissaire aux comptes.",
            "**Trésorerie :** Gestion du BFR, relations bancaires, négociation des lignes de crédit, optimisation du placement des excédents.",
            "**Stratégie financière :** Accompagnement des levées de fonds, due diligence, structuration des opérations de M&A.",
            "**RH et administration :** Dans certaines PME, le DAF supervise la paie, les contrats de travail et les obligations sociales.",
          ],
        },
        {
          heading: "DAF externalisé : un modèle adapté aux PME",
          content: [
            "Le modèle du **DAF externalisé** (aussi appelé DAF à temps partagé) est particulièrement adapté aux entreprises de 10 à 200 salariés qui ont besoin d'expertise financière senior sans pouvoir justifier d'un temps plein.",
            "Concrètement, un DAF externalisé intervient 2 à 8 jours par mois selon les besoins. Il prend en charge le pilotage financier global, libère le dirigeant des sujets financiers chronophages, et structure l'information financière pour les décisions stratégiques.",
            "Chez **[Iter Advisors](/daf-externalise)**, nos DAF externalisés accompagnent des PME, startups et entreprises franco-espagnoles depuis 2021. Découvrez nos [tarifs DAF externalisé](/daf-externalise/tarifs) et nos [cas clients](/ressources/cas-clients).",
          ],
        },
        {
          heading: "Salaire et coût d'un DAF",
          content: [
            "**DAF salarié interne :** Entre 70 000 € et 150 000 € brut chargé selon l'expérience et la taille de l'entreprise.",
            "**DAF externalisé :** Les formules Iter Advisors démarrent à **2 000 €/mois** pour 2 jours/mois. Une mission complète (budget + reporting + conseil) se situe entre 3 500 et 8 000 €/mois.",
            "Le ROI du DAF externalisé est généralement positif dès le premier mois : optimisation de la trésorerie, renégociation des conditions bancaires, pilotage des charges.",
          ],
        },
      ],
      ctaButton: "Rencontrer un DAF externalisé",
    },
    "drh-externalise": {
      meta: {
        title: "DRH externalisé : définition, missions et tarifs | Iter Advisors",
        description:
          "DRH externalisé ou DRH à temps partagé : définition, périmètre d'intervention, différence avec un DRH salarié et tarifs 2026.",
      },
      h1: "DRH externalisé : définition, missions et fonctionnement",
      sections: [
        {
          content: [
            "Un **DRH externalisé** (Directeur des Ressources Humaines externalisé) est un professionnel RH senior qui intervient pour plusieurs entreprises en parallèle, à temps partagé. Aussi appelé DRH à temps partagé, ce modèle permet aux PME d'accéder à une direction RH experte sans recruter à temps plein.",
          ],
        },
        {
          heading: "Missions du DRH externalisé",
          content: [
            "**Recrutement et intégration :** Définition des fiches de poste, pilotage des processus de recrutement, onboarding et période d'essai.",
            "**Relations sociales :** Rédaction et négociation d'accords d'entreprise, animation du CSE, gestion des conflits individuels et collectifs.",
            "**Conformité sociale :** Veille juridique, conformité RGPD RH, politique de santé au travail, gestion des risques sociaux.",
            "**Développement RH :** Plans de formation, GPEC/GEPP, politique de rémunération, entretiens annuels.",
            "**Paie et administration :** Coordination avec l'expert-comptable ou le prestataire paie. Le DRH externalisé supervise sans traiter directement.",
          ],
        },
        {
          heading: "DRH externalisé vs DRH à temps partagé",
          content: [
            "Les deux termes désignent la même réalité. **DRH externalisé** insiste sur le fait que la fonction RH est confiée à l'extérieur. **DRH à temps partagé** insiste sur le mode d'organisation : un professionnel partage son temps entre plusieurs entreprises clientes.",
            "Chez Iter Advisors, nos **[DRH externalisés](/drh-externalise)** interviennent en France et en Espagne, avec une expertise particulière sur les sujets RH transfrontaliers.",
          ],
        },
        {
          heading: "Quand faire appel à un DRH externalisé ?",
          content: [
            "**10 à 50 salariés :** Besoin ponctuel — recrutements, accord d'entreprise, premier CSE. 1 à 2 jours/mois.",
            "**50 à 150 salariés :** Besoin récurrent — pilotage RH mensuel, conformité, plans de formation. 4 à 8 jours/mois.",
            "**Croissance rapide ou situation de crise :** Restructuration, pic de recrutement, fusion-acquisition. Mission à durée déterminée.",
          ],
        },
      ],
      ctaButton: "Parler à un DRH externalisé",
    },
    "controle-de-gestion": {
      meta: {
        title: "Contrôle de gestion : définition, outils et missions | Iter Advisors",
        description:
          "Contrôle de gestion : définition, différence avec la comptabilité, outils (Power BI, Excel, Agicap), et coût d'un contrôleur de gestion externalisé.",
      },
      h1: "Contrôle de gestion : définition, missions et outils",
      sections: [
        {
          content: [
            "Le **contrôle de gestion** est la fonction qui analyse les données financières et opérationnelles d'une entreprise pour aider les dirigeants à prendre de meilleures décisions. Contrairement à la comptabilité qui enregistre le passé, le contrôle de gestion **pilote l'avenir** : budgets, prévisions, tableaux de bord et analyse des écarts.",
          ],
        },
        {
          heading: "Différence entre comptabilité et contrôle de gestion",
          content: [
            "**Comptabilité :** Enregistrement et justification des flux financiers passés. Obligation légale. Production des bilans, comptes de résultat et liasses fiscales.",
            "**Contrôle de gestion :** Analyse de la performance pour piloter l'avenir. Production de budgets, forecasts, KPIs et reporting de pilotage.",
            "En pratique, dans les PME, le **[DAF externalisé](/daf-externalise)** pilote à la fois la comptabilité et le contrôle de gestion.",
          ],
        },
        {
          heading: "Missions du contrôleur de gestion",
          content: [
            "**Budget annuel :** Construction du budget par centre de coût, ventilation par BU, validation avec les managers.",
            "**Reporting mensuel :** Analyse des écarts réel vs budget, identification des dérives et recommandations correctives.",
            "**Forecast :** Mise à jour trimestrielle ou mensuelle des prévisions sur 3 à 12 mois glissants.",
            "**Tableaux de bord (KPIs) :** Conception et maintien des dashboards opérationnels et financiers.",
            "**Analyse des marges :** Calcul des marges par produit, client ou canal pour identifier les activités rentables.",
          ],
        },
        {
          heading: "Outils du contrôle de gestion",
          content: [
            "**[Power BI](/ressources/outils/power-bi) :** Outil de référence pour les dashboards dynamiques et la visualisation de données.",
            "**Excel / Google Sheets :** Modélisation financière, budget, scénarios.",
            "**[Pennylane](/ressources/outils/pennylane) :** Comptabilité connectée aux outils de pilotage.",
            "**[Agicap](/ressources/outils/agicap) :** Suivi de trésorerie en temps réel avec prévisions automatisées.",
          ],
        },
        {
          heading: "Contrôleur de gestion externalisé",
          content: [
            "Pour les PME qui ne peuvent pas justifier d'un temps plein, un **contrôleur de gestion externalisé** est la solution idéale. Chez Iter Advisors, nos formules démarrent à 1 500 €/mois pour un tableau de bord mensuel. La formule complète avec budget et forecast est à 3 500 €/mois.",
            "Au-delà de 500K€ de CA ou 15 collaborateurs, le contrôle de gestion devient indispensable pour piloter efficacement la croissance.",
          ],
        },
      ],
      ctaButton: "Mettre en place mon contrôle de gestion",
    },
    "fractional-cfo": {
      meta: {
        title: "Fractional CFO : définition, missions et tarifs France | Iter Advisors",
        description:
          "Fractional CFO (CFO fractionnel) : définition, différence avec le DAF externalisé, cas d'usage startups et tarifs 2026 en France.",
      },
      h1: "Fractional CFO : définition et missions",
      sections: [
        {
          content: [
            "Un **Fractional CFO** (CFO fractionnel) est un directeur financier senior qui intervient à temps partiel pour plusieurs entreprises en simultané. L'expression, venue du monde anglo-saxon, désigne le même profil qu'un **[DAF externalisé](/daf-externalise)** en France — avec une culture plus orientée startups tech, VCs et relations investisseurs.",
          ],
        },
        {
          heading: "Fractional CFO vs DAF externalisé",
          content: [
            "Les deux termes désignent le même modèle d'intervention (temps partiel, multi-clients) mais avec des cultures différentes :",
            "**Fractional CFO :** Terminologie anglo-saxonne, dominante dans les startups tech et scale-ups. Profil très orienté levée de fonds, data room, relations VC.",
            "**DAF externalisé :** Terminologie française, dominante dans les PME et ETI. Périmètre souvent plus large incluant comptabilité, paie, administration.",
            "Chez Iter Advisors, nos associés interviennent indifféremment sous les deux casquettes selon la culture de l'entreprise cliente.",
          ],
        },
        {
          heading: "Missions d'un Fractional CFO",
          content: [
            "**Levée de fonds :** Préparation de la data room, modèle financier, pitch financier et accompagnement des négociations. Nos Fractional CFO ont accompagné plus de 50 levées du Seed à la Series B.",
            "**Reporting investisseurs :** Reporting mensuel aux VCs et business angels, tableaux de bord KPIs, board packages.",
            "**Trésorerie et runway :** Suivi du cash burn, calcul du runway, alertes précoces et plan d'action.",
            "**Structuration financière :** Mise en place du contrôle de gestion, choix des outils, définition des KPIs.",
            "**Exit préparation :** Due diligence vendor-side, audit préalable, structuration fiscale de la sortie.",
          ],
        },
        {
          heading: "Tarifs d'un Fractional CFO en France",
          content: [
            "**2-4 jours/mois :** 2 000 à 4 000 €/mois. Pilotage de base, reporting mensuel.",
            "**4-8 jours/mois :** 4 000 à 8 000 €/mois. Mission complète avec levée de fonds ou restructuration.",
            "Chez Iter Advisors, nous intervenons sous 5 jours ouvrés et mettons en route la mission sous 2 semaines.",
          ],
        },
      ],
      ctaButton: "Parler à un Fractional CFO",
    },
  },
  en: {
    bfr: {
      meta: {
        title: "Working Capital (WCR): Definition | Iter Advisors",
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
        title: "EBITDA: Definition & Calculation | Iter Advisors",
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
        title: "CFO: Definition vs Finance Director | Iter Advisors",
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
        title: "CFO: Definición vs Director Financiero | Iter Advisors",
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
    // EC-02 — DAF ecosystem
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
/**
 * Fiches détaillées du glossaire, avec leur titre, pour les lister.
 *
 * SEO-AUD-0824 §3 — le hub dérive le slug de ses termes depuis leur titre
 * (« CAC (Customer Acquisition Cost) » devient `cac-customer-acquisition-cost-`),
 * ce qui ne tombe jamais sur le slug de la fiche correspondante — `cac-ltv`.
 * Seul « EBITDA » coïncidait, par hasard. Lier depuis une liste explicite est
 * plus sûr que d'espérer une correspondance de chaînes.
 */
export function getGlossaryPages(locale: Locale): { slug: string; title: string }[] {
  const entries = glossaryEntries[locale] ?? {};
  return [...GLOSSARY_PAGE_SLUGS]
    .map((slug) => {
      const entry = entries[slug as GlossaryEntrySlug] ?? glossaryEntries.fr[slug as GlossaryEntrySlug];
      return entry ? { slug, title: entry.h1 } : null;
    })
    .filter((e): e is { slug: string; title: string } => e !== null)
    .sort((a, b) => a.title.localeCompare(b.title, "fr"));
}

function getEntryWithFrFallback(locale: Locale, slug: GlossaryEntrySlug): GlossaryEntryContent | undefined {
  return glossaryEntries[locale]?.[slug] ?? glossaryEntries.fr?.[slug];
}

export function getGlossaryEntryContent(locale: string, urlSlug: string): GlossaryEntryContent | undefined {
  const key = slugMapping[locale as Locale]?.[urlSlug];
  if (!key) return undefined;
  return getEntryWithFrFallback(locale as Locale, key);
}
