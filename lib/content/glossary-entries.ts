import { Locale } from "../i18n";

export type GlossaryEntrySlug = "bfr" | "ebitda" | "cfo";

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

export const glossaryEntries: Record<Locale, Record<GlossaryEntrySlug, GlossaryEntryContent>> = {
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
        title: "CFO : Définition, Rôle et Différence avec le DAF | Iter Advisors",
        description:
          "Définition du CFO (Chief Financial Officer) : rôle, missions et différence avec le DAF. Guide rédigé par les experts financiers d'Iter Advisors.",
      },
      h1: "CFO (Chief Financial Officer) : définition et rôle",
      sections: [
        {
          content: [
            "Le **CFO** (Chief Financial Officer) est le titre anglophone du Directeur Financier d'une entreprise. En France, ce titre est de plus en plus utilisé dans les startups, les scale-ups et les entreprises à culture internationale, en remplacement ou en complément du titre traditionnel de **[DAF](/daf-externalise/metier)** (Directeur Administratif et Financier).",
          ],
        },
        {
          heading: "Définition du CFO",
          content: [
            "Le CFO est le responsable de la gestion financière d'une organisation. Il est membre du comité de direction (CODIR ou C-suite) et rend compte directement au CEO (Chief Executive Officer). Ses responsabilités couvrent la comptabilité, la trésorerie, le reporting financier, la planification financière (FP&A), la fiscalité, et souvent les relations avec les investisseurs (Investor Relations).",
          ],
        },
        {
          heading: "CFO vs DAF : Quelle Différence ?",
          content: [
            "Dans la pratique, CFO et DAF désignent le même poste. La différence est principalement culturelle et sectorielle.",
            "Le titre **DAF** est plus courant dans les entreprises françaises traditionnelles (PME, ETI, grandes entreprises françaises). Il implique souvent un périmètre administratif plus large (juridique, RH dans certains cas).",
            "Le titre **CFO** est privilégié dans les startups, les scale-ups, et les entreprises à culture internationale. Il est perçu comme plus moderne et plus orienté vers la stratégie financière.",
            "Dans les deux cas, les missions sont similaires : pilotage de la trésorerie, reporting financier, accompagnement stratégique du dirigeant, relations avec les banques et les investisseurs.",
          ],
        },
        {
          heading: "Le CFO Externalisé (Fractional CFO)",
          content: [
            "Le concept de **CFO externalisé** (ou Fractional CFO en anglais) est l'équivalent du **[DAF externalisé](/daf-externalise)** pour les entreprises à culture internationale. Il s'agit d'un CFO senior qui partage son temps entre plusieurs entreprises clientes, offrant une expertise de haut niveau à un coût adapté aux PME et aux startups.",
            "Chez Iter Advisors, nos associés interviennent indifféremment sous le titre de DAF externalisé ou de CFO externalisé selon la culture de l'entreprise cliente. Pour en savoir plus sur nos services de **[DAF externalisé](/daf-externalise)**, consultez notre page dédiée.",
          ],
        },
        {
          heading: "FAQ - CFO",
          content: [
            "**Quelle est la différence entre CFO et CFA ?** Le CFA (Chartered Financial Analyst) est une certification professionnelle délivrée par le CFA Institute, principalement utilisée dans la gestion d'actifs et l'analyse financière. Le CFO est un titre de poste (directeur financier). Les deux n'ont rien à voir.",
            "**Un CFO peut-il être externalisé ?** Oui. Le Fractional CFO (CFO externalisé) est un modèle de plus en plus répandu, notamment aux États-Unis et au Royaume-Uni. En France, on parle plutôt de DAF externalisé, mais le concept est identique.",
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
  },
  en: {
    bfr: "bfr",
    ebitda: "ebitda",
    cfo: "cfo",
  },
  es: {
    bfr: "bfr",
    ebitda: "ebitda",
    cfo: "cfo",
  },
};

export function getGlossaryEntryContent(locale: string, urlSlug: string): GlossaryEntryContent | undefined {
  const key = slugMapping[locale as Locale]?.[urlSlug];
  if (!key) return undefined;
  return glossaryEntries[locale as Locale]?.[key];
}
