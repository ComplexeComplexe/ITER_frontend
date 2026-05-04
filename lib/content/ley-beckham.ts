import { Locale } from "../i18n";

export interface LeyBeckhamContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    h1: string;
    intro: string;
  };
  sections: {
    heading: string;
    content: string[];
  }[];
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

const content: Record<Locale, LeyBeckhamContent> = {
  fr: {
    meta: {
      title: "Loi Beckham Espagne - Guide complet 2026 | Iter Advisors",
      description: "Loi Beckham en Espagne: avantages fiscaux, conditions d'eligibilité et mise en place. Économisez jusqu'à €50,000/an. Guide complet 2026.",
    },
    hero: {
      h1: "Loi Beckham: Le guide complet pour les expatriés en Espagne",
      intro: "La Loi Beckham est l'opportunité fiscale la plus importante pour les expatriés s'installant en Espagne. Mais beaucoup ne la comprennent pas complètement—et d'autres la perdent par des erreurs administratives.",
    },
    sections: [
      {
        heading: "Qu'est-ce que la Loi Beckham exactement ?",
        content: [
          "La Loi Beckham (officiellement 'Régime Fiscal Spécial des Travailleurs Détachés') est une loi fiscale espagnole qui permet aux cadres, entrepreneurs et professionnels hautement qualifiés s'installant en Espagne de payer l'impôt sur le revenu à un taux réduit de 24%.",
          "Taux imposable réduit de 24% sur les revenus mondiaux (revenu espagnol), exonération de l'impôt sur les plus-values sur les actifs espagnols (0%), simplification substantielle des obligations.",
        ],
      },
      {
        heading: "Qui qualifier pour la Loi Beckham",
        content: [
          "Ne doit pas avoir été résident fiscal en Espagne au cours des 10 dernières années",
          "Doit avoir un contrat de travail ou être inscrit comme travailleur indépendant en Espagne",
          "Doit établir sa résidence en Espagne (>183 jours/an)",
          "Doit avoir une activité économique pertinente",
        ],
      },
      {
        heading: "Mise en place : Étape par étape",
        content: [
          "Étape 1: Vérifier l'éligibilité - Obtenir le NIE, demander un certificat de 'non-résident préalable'",
          "Étape 2: Établir la résidence fiscale - S'enregistrer dans la municipalité, demander une déclaration de résidence fiscale",
          "Étape 3: Demander formellement - Si employé, votre employeur présente le formulaire (20-30 jours), si travailleur indépendant, vous vous inscrivez (60-90 jours)",
          "Étape 4: Conformité annuelle - Rester en Espagne >183 jours/an, présenter une déclaration fiscale annuelle",
        ],
      },
      {
        heading: "Pièges courants",
        content: [
          "La règle des 10 ans - Si vous aviez travaillé en Madrid il y a 8 ans, vous ne qualifier pas",
          "Perdre la résidence - Si vous êtes seulement 150 jours en Espagne une année, vous perdez le statut cette année-là",
          "Ne pas s'enregistrer correctement comme travailleur indépendant - L'inscription à la sécurité sociale est requise d'abord",
          "Les revenus étrangers ne sont pas inclus - La Loi Beckham ne s'applique qu'aux revenus ESPAGNOLS",
        ],
      },
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          question: "Puis-je utiliser la Loi Beckham si je travaille à distance pour une entreprise étrangère ?",
          answer: "C'est compliqué. Plus sûr d'être employé par une entreprise espagnole ou d'être inscrit comme travailleur indépendant.",
        },
        {
          question: "Mon conjoint peut-il l'utiliser aussi ?",
          answer: "Non. Chaque personne doit demander séparément et prouver une activité économique.",
        },
        {
          question: "Perds-je le statut si je change d'emploi ?",
          answer: "Non, tant que vous maintenez votre résidence fiscale espagnole et une activité continue.",
        },
        {
          question: "Barcelone et Madrid ont-elles des taux différents ?",
          answer: "Non. La Loi Beckham est nationale (24% partout en Espagne).",
        },
      ],
    },
    cta: {
      title: "Besoin d'aide pour mettre en place la Loi Beckham ?",
      description: "Iter Advisors travaille avec les expatriés à Barcelone et dans d'autres villes espagnoles pour optimiser leur position fiscale en vertu de la Loi Beckham.",
      buttonText: "Prendre rendez-vous",
      buttonHref: "/contact",
    },
  },
  en: {
    meta: {
      title: "Beckham Law Spain: Complete Guide 2026 for Expatriates | Iter Advisors",
      description: "Beckham Law in Spain 2026: Tax benefits, eligibility requirements, implementation. Save up to €50,000/year. Complete guide for expat executives and entrepreneurs.",
    },
    hero: {
      h1: "Beckham Law: The Complete Guide for Expatriates in Spain",
      intro: "The Beckham Law is the most important tax opportunity for expatriates relocating to Spain. But many don't fully understand it—and others lose it through administrative mistakes.",
    },
    sections: [
      {
        heading: "What Is the Beckham Law Exactly?",
        content: [
          "The Beckham Law (officially 'Special Tax Regime for Displaced Workers') is a Spanish tax law allowing executives, entrepreneurs, and highly qualified professionals relocating to Spain to pay income tax at a reduced rate of 24%.",
          "Fixed 24% tax rate on worldwide income (Spanish source), exemption from capital gains tax on Spanish assets (0%), substantial simplification of obligations.",
        ],
      },
      {
        heading: "Who Qualifies for the Beckham Law",
        content: [
          "Must not have been a tax resident in Spain in the last 10 years",
          "Must have an employment contract or be registered as self-employed in Spain",
          "Must establish tax residency in Spain (>183 days/year)",
          "Must have relevant economic activity",
        ],
      },
      {
        heading: "Implementation: Step-by-Step",
        content: [
          "Step 1: Verify Eligibility - Get your NIE, request a 'prior non-resident' certificate",
          "Step 2: Establish Tax Residency - Register in your municipality, request tax residency declaration",
          "Step 3: Apply Formally - If employed, your employer submits the form (20-30 days); if self-employed, you register (60-90 days)",
          "Step 4: Annual Compliance - Remain in Spain >183 days/year, file annual tax return",
        ],
      },
      {
        heading: "Common Traps",
        content: [
          "The 10-Year Rule - If you worked in Madrid 8 years ago, you don't qualify",
          "Losing Residency - If you're only 150 days in Spain one year, you lose the status that year",
          "Not Registering Properly as Self-Employed - Social Security registration is required first",
          "Foreign Income Not Included - Beckham Law only applies to SPANISH-source income",
        ],
      },
    ],
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "Can I use the Beckham Law if I work remotely for a foreign company?",
          answer: "Complicated. Safer to be employed by a Spanish company or registered as self-employed.",
        },
        {
          question: "Can my spouse use it too?",
          answer: "No. Each person must apply separately and demonstrate economic activity.",
        },
        {
          question: "Do I lose the status if I change jobs?",
          answer: "No, as long as you maintain Spanish tax residency and continuous activity.",
        },
        {
          question: "Do Barcelona and Madrid have different rates?",
          answer: "No. The Beckham Law is national (24% across all of Spain).",
        },
      ],
    },
    cta: {
      title: "Need help implementing the Beckham Law?",
      description: "Iter Advisors works with expatriates in Barcelona and across Spain to optimize their tax position under the Beckham Law.",
      buttonText: "Schedule a consultation",
      buttonHref: "/en/contact",
    },
  },
  es: {
    meta: {
      title: "Ley Beckham España: Guía Completa 2026 para Expatriados | Iter Advisors",
      description: "Ley Beckham en España 2026: beneficios fiscales, requisitos exactos, implementación. Ahorra hasta €50,000/año. Guía para ejecutivos y emprendedores expatriados.",
    },
    hero: {
      h1: "Ley Beckham: La Guía Completa para Expatriados en España",
      intro: "La Ley Beckham es la oportunidad fiscal más importante para expatriados que se trasladan a España. Pero muchos no la entienden completamente—y otros la pierden por errores administrativos.",
    },
    sections: [
      {
        heading: "¿Qué es la Ley Beckham exactamente?",
        content: [
          "La Ley Beckham (oficialmente 'Régimen Fiscal Especial de los Trabajadores Desplazados') permite a ejecutivos, emprendedores y profesionales altamente cualificados que se trasladen a España pagar impuestos sobre la renta a una tasa reducida del 24%.",
          "Tasa fija del 24% sobre renta mundial (ingresos españoles), exención de impuesto sobre plusvalías en activos españoles (0%), simplificación sustancial de obligaciones.",
        ],
      },
      {
        heading: "Quién califica para la Ley Beckham",
        content: [
          "No debe haber sido residente fiscal en España en los últimos 10 años",
          "Debe tener contrato laboral o estar registrado como autónomo en España",
          "Debe establecer residencia en España (>183 días/año)",
          "Debe tener actividad económica relevante",
        ],
      },
      {
        heading: "Implementación: Paso a Paso",
        content: [
          "Paso 1: Verificar elegibilidad - Obtén tu NIE, solicita certificado de 'no residente previo'",
          "Paso 2: Establecer residencia fiscal - Regístrate en tu municipio, solicita declaración de residencia",
          "Paso 3: Solicita formalmente - Si eres empleado, tu empleador presenta el formulario (20-30 días); si eres autónomo, te registras (60-90 días)",
          "Paso 4: Cumplimiento anual - Permanece en España >183 días/año, presenta declaración fiscal anual",
        ],
      },
      {
        heading: "Trampas comunes",
        content: [
          "La regla de los 10 años - Si trabajaste en Madrid hace 8 años, no calificas",
          "Perder la residencia - Si estás sólo 150 días en España un año, pierdes el estatus ese año",
          "No registrarse como autónomo correctamente - Requiere registro previo en Seguridad Social",
          "Ingresos extranjeros no incluidos - La Ley Beckham solo aplica a ingresos ESPAÑOLES",
        ],
      },
    ],
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          question: "¿Puedo usar la Ley Beckham si trabajo remotamente para empresa extranjera?",
          answer: "Complicado. Más seguro estar empleado por empresa española o registrado como autónomo.",
        },
        {
          question: "¿Mi cónyuge puede usarla también?",
          answer: "No. Cada persona debe solicitar por separado y demostrar actividad económica.",
        },
        {
          question: "¿Pierdo el estatus si cambio de trabajo?",
          answer: "No, siempre que mantengas residencia fiscal española y actividad continua.",
        },
        {
          question: "¿Barcelona y Madrid tienen tasas diferentes?",
          answer: "No. La Ley Beckham es nacional (24% en todo el país).",
        },
      ],
    },
    cta: {
      title: "¿Necesitas ayuda implementando la Ley Beckham?",
      description: "Iter Advisors trabaja con expatriados en Barcelona y en toda España para optimizar su posición fiscal bajo la Ley Beckham.",
      buttonText: "Agendar una consulta",
      buttonHref: "/es/contact",
    },
  },
};

export function getLeyBeckhamContent(locale: Locale): LeyBeckhamContent {
  return content[locale];
}
