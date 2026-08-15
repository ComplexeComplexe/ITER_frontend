import { Locale } from "../i18n";
import type { StrapiGlossaryTerm } from "../strapi";

export interface GlossaryTerm {
  title: string;
  definition: string;
  context: string;
}

export interface GlossaryContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    h1: string;
    intro: string;
  };
  intro: {
    paragraph: string;
  };
  terms: GlossaryTerm[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

// Helper function to convert our static glossary terms to StrapiGlossaryTerm format
export function convertToStrapiTerms(terms: GlossaryTerm[]): StrapiGlossaryTerm[] {
  return terms.map((term, idx) => ({
    id: idx + 1,
    documentId: `glossary-${idx + 1}`,
    title: term.title,
    slug: term.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    definition: term.definition,
    content: [],
  }));
}

const content: Record<Locale, GlossaryContent> = {
  fr: {
    meta: {
      title: "Glossaire Financier - Iter Advisors",
      description: "Définitions claires de 20+ termes financiers essentiels pour les startups et PME.",
    },
    hero: {
      h1: "Glossaire Financier",
      intro:
        "Démystifiez la finance avec nos définitions claires et pratiques. Les termes essentiels pour piloter votre entreprise.",
    },
    intro: {
      paragraph:
        "Comprendre la terminologie financière est essentiel pour prendre des décisions éclairées. Voici les termes que vous rencontrerez en tant que fondateur ou manager.",
    },
    terms: [
      {
        title: "Besoin en Fonds de Roulement (BFR)",
        definition:
          "Le BFR représente le montant de trésorerie que votre entreprise doit financer pour couvrir le décalage entre vos encaissements clients et vos décaissements fournisseurs et salaires. Il se calcule comme la somme des stocks et des créances clients, moins les dettes fournisseurs et fiscales. Un BFR positif signifie que vous devez avancer du cash pour faire tourner votre activité ; un BFR négatif (typique des modèles d'abonnement) signifie que vous encaissez avant de payer — un avantage majeur. Un BFR mal maîtrisé peut asphyxier une entreprise rentable.",
        context:
          "Exemple : un e-commerce D2C avec stocks de 60 jours, des clients qui paient à 30 jours et des fournisseurs à 30 jours porte un BFR ≈ 60 jours de coût des ventes. Une SaaS B2B encaissant annuellement à l'avance peut afficher un BFR négatif. Voir notre [page dédiée BFR](/ressources/glossaire/besoin-fonds-roulement-bfr).",
      },
      {
        title: "Cash Burn",
        definition:
          "Le cash burn (ou burn rate) mesure la consommation nette mensuelle de trésorerie d'une entreprise — c'est-à-dire les dépenses totales moins les revenus encaissés. On distingue le gross burn (total des dépenses) du net burn (après revenus). C'est la métrique vitale d'une startup : combinée à la trésorerie disponible, elle donne le runway (temps restant avant la faillite). Un burn qui diminue malgré la croissance signe un product-market fit ; un burn qui augmente sans contrepartie de revenus est un signal d'alerte pour les investisseurs.",
        context:
          "Une startup avec 500K€ de trésorerie et un burn net de 50K€/mois a 10 mois de runway. Détail complet sur la [page Cash Burn & Runway](/ressources/glossaire/cash-burn-runway).",
      },
      {
        title: "CAC (Customer Acquisition Cost)",
        definition:
          "Le CAC est le coût total pour acquérir un nouveau client. Il inclut toutes les dépenses marketing et commerciales : publicité payée, salaires marketing/sales, outils CRM, événements, contenu. La formule de base : CAC = (Dépenses marketing + Dépenses commerciales) / Nombre de nouveaux clients sur la période. Le CAC se calcule idéalement par canal (Google Ads, LinkedIn, content marketing) pour identifier les leviers les plus rentables et réallouer le budget. C'est l'un des KPIs scrutés en priorité par les investisseurs SaaS.",
        context:
          "Si vous dépensez 30K€/mois en marketing + 20K€ en sales pour acquérir 25 clients, votre CAC = 2 000 €. À comparer au LTV pour vérifier la viabilité du business model. Détails sur la [page CAC & LTV](/ressources/glossaire/cac-ltv).",
      },
      {
        title: "LTV (Lifetime Value)",
        definition:
          "La LTV est le revenu total qu'un client générera sur toute la durée de sa relation avec l'entreprise. Formule simplifiée : LTV = ARPU × Marge brute × Durée de vie moyenne du client. Formule plus précise : LTV = ARPU × (Marge brute %) / Churn mensuel. Le ratio LTV/CAC est le baromètre d'un business model récurrent : > 3 est sain, > 5 est excellent, < 1 indique un modèle non viable. Attention : pour une jeune startup, la LTV basée sur 6 mois de données est peu fiable — elle doit être recalculée régulièrement.",
        context:
          "Un SaaS avec ARPU 500 €/mois, marge brute 75% et churn 2%/mois a une LTV ≈ 18 750 €. Avec un CAC de 2 000 €, le ratio LTV/CAC est de 9,4x — excellent.",
      },
      {
        title: "Term Sheet",
        definition:
          "Le term sheet est la lettre d'intention non contraignante par laquelle un investisseur formalise les conditions d'une levée de fonds : montant, valorisation pre-money, liquidation preference, anti-dilution, board seats, drag-along, tag-along, vesting des fondateurs, no shop, pro-rata rights. C'est le document le plus important de votre levée : une clause mal négociée peut coûter des millions d'euros ou le contrôle de l'entreprise. Standard : 1x non-participating liquidation preference, weighted average anti-dilution, 1 siège investisseur sur 3, no shop 30 jours maximum.",
        context:
          "Un term sheet de Series A peut prévoir : 3M€ levés à 8M€ pre-money, 1x non-participating, weighted average, board 2 fondateurs + 1 investisseur, vesting 4 ans avec cliff 1 an, no shop 30 jours.",
      },
      {
        title: "Cap Table (Capitalization Table)",
        definition:
          "Le cap table est le registre vivant de la structure capitalistique de votre entreprise. Il liste tous les actionnaires (fondateurs, investisseurs, salariés via BSPCE/BSA) avec leur nombre d'actions, leur pourcentage du capital et leur droits de vote. Il intègre aussi les instruments non encore exercés : BSPCE non levés, SAFE, obligations convertibles. Un cap table tenu à jour est indispensable lors d'une levée — les investisseurs le scrutent en premier pour vérifier la dilution et la structure de gouvernance. Outils recommandés : Carta, Pulley, Tougerme.",
        context:
          "Cap table post-Series A typique : Fondateurs 55%, Pool BSPCE 12%, Business Angels seed 8%, VC Series A 25%. Le pool BSPCE étant dilué à chaque tour, prévoyez sa réabondance lors de la prochaine levée.",
      },
      {
        title: "Runway",
        definition:
          "Le runway est le nombre de mois pendant lesquels une entreprise peut continuer à opérer avec sa trésorerie actuelle à son burn rate actuel. Formule : Runway = Trésorerie disponible / Cash burn net mensuel. C'est l'indicateur vital qui pilote toutes les décisions stratégiques : timing de la prochaine levée, plan de hiring, marketing spend. Règle d'or du venture capital : lever quand on a 12-18 mois de runway, jamais avec moins de 9 mois (décote de 20-40% sur la valorisation). À suivre hebdomadairement quand le runway tombe sous 12 mois.",
        context:
          "Avec 650K€ de trésorerie et un burn net de 80K€/mois, votre runway est de 8 mois. Vous êtes en zone orange : il faut lancer la levée immédiatement ou réduire les coûts.",
      },
      {
        title: "MRR (Monthly Recurring Revenue)",
        definition:
          "Le MRR est le revenu récurrent mensuel d'une entreprise — la somme normalisée mensuellement de tous les abonnements actifs. Un client payant 12 000 €/an contribue 1 000 € au MRR. Le MRR se décompose en : New MRR (nouveaux clients), Expansion MRR (upsell), Contraction MRR (downgrades), Churned MRR (résiliations). Le Net New MRR = New + Expansion − Contraction − Churned. C'est la métrique #1 pour toute SaaS : sa croissance mois-à-mois est le moteur de la valorisation. Un MRR qui croît de 10%/mois doublé tous les 7 mois — la trajectoire idéale d'une early-stage SaaS.",
        context:
          "100 clients payant 100 €/mois = 10K€ MRR (120K€ ARR). Voir [ARR & MRR](/ressources/glossaire/arr-mrr) pour les benchmarks par stade de levée.",
      },
      {
        title: "Taux de Rétention (NRR)",
        definition:
          "Le taux de rétention mesure la proportion de clients (ou de revenus) conservés sur une période. On distingue le gross retention (résiliations uniquement), le net retention et surtout le NRR (Net Revenue Retention) qui inclut l'expansion (upsell). Un NRR > 100% signifie que les clients existants génèrent plus de revenus chaque année malgré le churn — c'est le « negative churn », état idéal d'une SaaS mature. Benchmarks SaaS B2B : NRR > 120% excellent, 110-120% bon, 100-110% sain, < 100% à corriger. Le NRR est la métrique la plus prédictive de la valorisation SaaS.",
        context:
          "MRR début 100K€, churn 5K€, downgrades 1,5K€, upsell 3K€ → NRR = (100 − 5 − 1,5 + 3) / 100 = 96,5%. Sain. Voir [Churn Rate](/ressources/glossaire/churn-rate) pour les formules détaillées.",
      },
      {
        title: "EBITDA",
        definition:
          "L'EBITDA (Earnings Before Interest, Taxes, Depreciation and Amortization) mesure la performance opérationnelle d'une entreprise indépendamment de sa structure financière, fiscale et d'investissement. Formule : EBITDA = Résultat net + Impôts + Charges financières + Dotations aux amortissements. C'est l'indicateur de référence pour comparer des entreprises d'un même secteur. Utilisé par les banques (ratio Dette/EBITDA < 3 pour la capacité d'endettement), par les VCs et fonds PE (multiple EV/EBITDA pour la valorisation), et en M&A (prix d'acquisition exprimé en multiple d'EBITDA, généralement 4x à 8x).",
        context:
          "Une SaaS avec 2,5M€ de CA et 450K€ d'EBITDA affiche une marge EBITDA de 18% — saine pour le secteur. Détails complets sur la [page EBITDA](/ressources/glossaire/ebitda).",
      },
      // ─── 6 termes ajoutés via TICKET 27 ─────────────────────────────
      {
        title: "Dilution (levée de fonds)",
        definition:
          "La dilution est la réduction du pourcentage de propriété des actionnaires existants lorsque l'entreprise émet de nouvelles actions — typiquement lors d'une levée de fonds. Formule : Dilution = Nouvelles actions / (Actions existantes + Nouvelles actions). Lors d'une Series A à 8M€ pre-money + 2M€ levés, les actionnaires existants sont dilués de 20%. Les fondateurs doivent anticiper la dilution cumulée sur plusieurs tours : 3 levées successives peuvent réduire leur part de 100% à 35-45% — d'où l'importance de négocier valorisation et taille du pool BSPCE à chaque tour.",
        context:
          "Pre-money 8M€, montant levé 2M€ → dilution 20%. Sur 3 levées (Seed + A + B), la dilution cumulée des fondateurs atteint typiquement 50-60%.",
      },
      {
        title: "Vesting",
        definition:
          "Le vesting est le mécanisme d'acquisition progressive des actions ou des BSPCE par un salarié ou un fondateur, conditionné à sa présence dans l'entreprise. Le standard du marché : 4 ans avec cliff de 1 an. Cela signifie : aucun droit pendant la première année (cliff), puis acquisition mensuelle de 1/48ème jusqu'à la fin des 4 ans. Si le salarié part avant le cliff, il perd tout. Le vesting protège l'entreprise contre les départs précoces et aligne les intérêts long terme. Distinction good leaver (départ non-fautif, conserve les actions acquises) vs bad leaver (départ fautif, perd tout).",
        context:
          "Un développeur reçoit 10 000 BSPCE en avril 2026 avec vesting 4 ans + cliff 1 an. Il part en mars 2027 (avant cliff) → 0 BSPCE acquis. S'il part en mars 2028 → 5 000 BSPCE acquis (50%).",
      },
      {
        title: "SAFE / BSA / BSPCE",
        definition:
          "Trois instruments financiers utilisés en early-stage. **SAFE** (Simple Agreement for Future Equity) : convention par laquelle l'investisseur paie maintenant pour des actions émises plus tard (typiquement lors de la prochaine levée), avec valuation cap et/ou discount. Pratique pour les bridges. **BSA** (Bon de Souscription d'Actions) : droit de souscrire des actions à un prix fixé, utilisable par toute société et tout bénéficiaire. **BSPCE** : équivalent réservé aux salariés/dirigeants de SAS et SA de moins de 15 ans, avec fiscalité avantageuse (PFU 12,8% après 3 ans). Voir notre [page BSPCE & BSA](/ressources/glossaire/bspce-bsa) pour les détails.",
        context:
          "SAFE de 200K€ avec valuation cap 6M€ et discount 20% : à la prochaine levée à 10M€ pre-money, l'investisseur convertit au minimum entre 6M€ (cap) et 8M€ (10M€ − 20%). Soit 6M€ → 3,3% du capital.",
      },
      {
        title: "Due Diligence",
        definition:
          "La due diligence (DD) est l'enquête approfondie menée par un investisseur ou un acquéreur avant de finaliser une opération de capital (levée, rachat, M&A). Elle couvre la due diligence financière (qualité du MRR/ARR, CAC/LTV, burn rate, comptabilité, projections), juridique (contrats clients/fournisseurs, IP, litiges, conformité RGPD), commerciale (marché, concurrence, traction) et technique (architecture, sécurité, dette technique). Une DD bien préparée peut réduire sa durée de 4 semaines à 10 jours et augmenter la valorisation de 10-20%. Anticipez avec une data room structurée 3 mois avant les rendez-vous VC.",
        context:
          "Lors d'une Series A, les VCs passent typiquement 2-4 semaines en DD avec des dizaines de documents demandés. Voir notre [checklist data room](/ressources/blog/checklist-due-diligence-levee-de-fonds).",
      },
      {
        title: "Kicker (dette venture)",
        definition:
          "Le kicker est une rémunération supplémentaire accordée à un prêteur en dette venture, sous forme de BSA (warrants) ou de participation au capital, en échange d'un taux d'intérêt plus bas. Standard du marché : un fonds de venture debt prête 2-5M€ à un taux de 10-12% + un warrant donnant droit à 1-3% du capital à un strike fixé. Le kicker compense le risque du prêteur (la dette venture est généralement subordonnée à la dette bancaire). Pour la startup : un financement moins dilutif que le capital pur, utile pour étendre le runway entre deux levées.",
        context:
          "Un fonds de venture debt prête 3M€ à 10%/an sur 4 ans + warrant pour 2% du capital à 10M€ de valuation cap. Si l'entreprise se valorise 50M€, le kicker rapporte 800K€ au prêteur.",
      },
      {
        title: "Ratio LTV/CAC",
        definition:
          "Le ratio LTV/CAC compare la valeur générée par un client (LTV) au coût pour l'acquérir (CAC). C'est le baromètre #1 d'un business model récurrent. Seuils standards : LTV/CAC < 1 = modèle non viable (chaque client coûte plus qu'il ne rapporte) ; 1-3 = viable mais fragile ; 3-5 = sain ; > 5 = excellent et scalable. Complémentaire au CAC Payback Period (délai pour récupérer le CAC) : < 12 mois = excellent pour SaaS B2B. Les investisseurs SaaS appliquent une décote significative aux startups avec LTV/CAC < 3 et un premium pour > 5. Voir [CAC & LTV](/ressources/glossaire/cac-ltv).",
        context:
          "CAC 2 000 € + LTV 18 750 € → ratio 9,4x = excellent. CAC 4 000 € + LTV 6 000 € → ratio 1,5x = fragile, modèle à corriger.",
      },
    ],
    cta: {
      title: "Besoin d'aide pour interpréter vos chiffres ?",
      description:
        "Consultez un expert Iter Advisors. Nous vous aidons à comprendre vos métriques financières.",
      buttonText: "Demander une consultation",
      buttonHref: "/contact",
    },
  },
  en: {
    meta: {
      title: "Financial Glossary - Iter Advisors",
      description: "Clear definitions of 20+ essential financial terms for startups and SMEs.",
    },
    hero: {
      h1: "Financial Glossary",
      intro:
        "Demystify finance with our clear, practical definitions. The essential terms for running your business.",
    },
    intro: {
      paragraph:
        "Understanding financial terminology is essential for making informed decisions. Here are the terms you'll encounter as a founder or manager.",
    },
    terms: [
      {
        title: "Working Capital",
        definition:
          "The difference between your short-term liabilities (suppliers, salaries) and short-term assets (customer receivables, inventory). High working capital means you need more cash to operate.",
        context:
          "Example: An e-commerce company pays suppliers in 30 days but customers pay in 45 days. Working capital = 15 days of operating expenses.",
      },
      {
        title: "Cash Burn",
        definition:
          "The average monthly amount of cash your company spends. Cash burn indicates how long you can operate with current cash before raising funds.",
        context:
          "A startup with €500k cash and €50k monthly burn has 10 months of runway.",
      },
      {
        title: "CAC (Customer Acquisition Cost)",
        definition:
          "The average cost to acquire one customer. Calculated by dividing your marketing spend by the number of customers acquired.",
        context:
          "If you spend €10k in marketing and gain 100 customers, your CAC = €100.",
      },
      {
        title: "LTV (Lifetime Value)",
        definition:
          "Total revenue expected from a customer over their lifetime. The higher your LTV, the more you can afford to spend on acquisition.",
        context:
          "If a SaaS customer pays €100/month for 3 years, their LTV = €3,600.",
      },
      {
        title: "Term Sheet",
        definition:
          "Non-binding document outlining the principal terms of an investment (amount, valuation, voting rights, liquidation preferences).",
        context:
          "A term sheet specifies you're raising €2M at a €10M pre-money valuation.",
      },
      {
        title: "Cap Table (Capitalization Table)",
        definition:
          "Table showing your company's ownership structure: who owns how many shares (founders, investors, employees with options).",
        context:
          "Your cap table might show: Founder 1: 40%, Founder 2: 40%, Seed Investor: 15%, Option pool: 5%.",
      },
      {
        title: "Runway",
        definition:
          "Number of months you can operate with current cash before running out of money.",
        context:
          "If you have €500k cash and burn €50k monthly, you have 10 months of runway.",
      },
      {
        title: "MRR (Monthly Recurring Revenue)",
        definition:
          "Predictable monthly revenue from subscriptions or recurring contracts. The foundation metric for SaaS and subscription models.",
        context:
          "100 customers paying €100/month = €10k MRR. This is your key metric to track.",
      },
      {
        title: "Retention Rate",
        definition:
          "Percentage of customers who remain active after a given period (typically calculated monthly or annually).",
        context:
          "A 90% retention rate means 10% of your customers leave each month.",
      },
      {
        title: "EBITDA",
        definition:
          "Earnings Before Interest, Taxes, Depreciation, and Amortization. Profit before financial and accounting deductions.",
        context:
          "EBITDA shows your operational profitability regardless of debt structure.",
      },
    ],
    cta: {
      title: "Need help interpreting your numbers?",
      description:
        "Talk to an Iter Advisors expert. We help you understand your financial metrics.",
      buttonText: "Book a free consultation",
      buttonHref: "/en/contact",
    },
  },
  es: {
    meta: {
      title: "Glosario Financiero - Iter Advisors",
      description: "Definiciones claras de 20+ términos financieros esenciales para startups y PMEs.",
    },
    hero: {
      h1: "Glosario Financiero",
      intro:
        "Desmitificar las finanzas con nuestras definiciones claras y prácticas. Los términos esenciales para dirigir tu negocio.",
    },
    intro: {
      paragraph:
        "Entender la terminología financiera es esencial para tomar decisiones informadas. Aquí están los términos que encontrarás como fundador o gerente.",
    },
    terms: [
      {
        title: "Capital de Trabajo",
        definition:
          "La diferencia entre tus pasivos a corto plazo (proveedores, salarios) y activos a corto plazo (clientes por cobrar, inventario). Capital de trabajo alto significa que necesitas más efectivo para operar.",
        context:
          "Ejemplo: Una empresa de e-commerce paga proveedores en 30 días pero los clientes pagan en 45 días. Capital de trabajo = 15 días de gastos operativos.",
      },
      {
        title: "Cash Burn",
        definition:
          "El monto mensual promedio de efectivo que tu empresa gasta. El burn indica cuánto tiempo puedes operar con el efectivo actual antes de recaudar fondos.",
        context:
          "Una startup con €500k de efectivo y €50k de burn mensual tiene 10 meses de runway.",
      },
      {
        title: "CAC (Costo de Adquisición de Clientes)",
        definition:
          "El costo promedio para adquirir un cliente. Se calcula dividiendo el gasto en marketing por la cantidad de clientes adquiridos.",
        context:
          "Si gastas €10k en marketing y adquieres 100 clientes, tu CAC = €100.",
      },
      {
        title: "LTV (Valor de Vida del Cliente)",
        definition:
          "Ingresos totales esperados de un cliente a lo largo de su vida. Cuanto mayor sea tu LTV, más puedes permitirte gastar en adquisición.",
        context:
          "Si un cliente SaaS paga €100/mes durante 3 años, su LTV = €3,600.",
      },
      {
        title: "Term Sheet",
        definition:
          "Documento no vinculante que describe los términos principales de una inversión (monto, valoración, derechos de voto, preferencias de liquidación).",
        context:
          "Un term sheet especifica que estás recaudando €2M con una valoración pre-money de €10M.",
      },
      {
        title: "Cap Table (Tabla de Capitalización)",
        definition:
          "Tabla que muestra la estructura de propiedad de tu empresa: quién posee cuántas acciones (fundadores, inversores, empleados con opciones).",
        context:
          "Tu cap table podría mostrar: Fundador 1: 40%, Fundador 2: 40%, Inversor Seed: 15%, Pool de opciones: 5%.",
      },
      {
        title: "Runway",
        definition:
          "Número de meses que puedes operar con el efectivo actual antes de quedarte sin dinero.",
        context:
          "Si tienes €500k de efectivo y quemas €50k al mes, tienes 10 meses de runway.",
      },
      {
        title: "MRR (Ingresos Recurrentes Mensuales)",
        definition:
          "Ingresos mensuales predecibles generados por suscripciones o contratos recurrentes. La métrica fundamental para SaaS y modelos de suscripción.",
        context:
          "100 clientes pagando €100/mes = €10k MRR. Esta es tu métrica clave a seguir.",
      },
      {
        title: "Tasa de Retención",
        definition:
          "Porcentaje de clientes que permanecen activos después de un período determinado (típicamente calculado mensual o anualmente).",
        context:
          "Una tasa de retención del 90% significa que el 10% de tus clientes se van cada mes.",
      },
      {
        title: "EBITDA",
        definition:
          "Beneficio antes de intereses, impuestos, depreciación y amortización. Beneficio antes de deducciones financieras y contables.",
        context:
          "EBITDA muestra tu rentabilidad operacional independientemente de la estructura de deuda.",
      },
    ],
    cta: {
      title: "¿Necesitas ayuda para interpretar tus números?",
      description:
        "Consulta con un experto de Iter Advisors. Te ayudamos a entender tus métricas financieras.",
      buttonText: "Solicitar consulta gratuita",
      buttonHref: "/es/contact",
    },
  },
};

export function getGlossaryContent(locale: Locale): GlossaryContent {
  return content[locale];
}
