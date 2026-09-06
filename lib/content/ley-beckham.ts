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
  sourcesTitle: string;
  sources: { label: string; href: string }[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

// Reviewed against Article 93 and AEAT instructions on 2026-09-05.
const content: Record<Locale, LeyBeckhamContent> = {
  "en": {
    "meta": {
      "title": "Beckham Law Spain: eligibility and application | Iter",
      "description": "Understand Spain’s special tax regime for people relocating to Spain: eligibility, employment income, Form 149 and the documents to prepare."
    },
    "hero": {
      "h1": "Beckham Law in Spain: check eligibility before applying",
      "intro": "The Beckham Law is the common name for the special regime under Article 93 of Spain’s Personal Income Tax Law. Eligibility depends on the circumstances of the move and the conditions set out in the legislation; it is not an automatic benefit for every expatriate."
    },
    "sections": [
      {
        "heading": "Who may qualify?",
        "content": [
          "For moves covered by the rules introduced in 2023, the prior non-residence condition concerns the five tax periods before the move. Eligible circumstances include certain employment arrangements, remote employment, company directorships and specified entrepreneurial or highly qualified professional activities.",
          "Registering as self-employed is not sufficient on its own. The qualifying activity, residence history and other statutory conditions must be checked before choosing the regime."
        ]
      },
      {
        "heading": "How is income treated?",
        "content": [
          "Employment income is generally subject to a 24% rate up to €600,000 and 47% above that threshold. Other types of income follow their own rules: there is no blanket 0% exemption for gains on Spanish assets.",
          "Employment income earned during the regime is generally treated as Spanish-source for these purposes, even when paid from abroad. The treatment of other income and any double-tax relief must be assessed separately."
        ]
      },
      {
        "heading": "How do you apply?",
        "content": [
          "The option is communicated using Form 149. For the principal taxpayer, the general deadline is six months from the activity start date evidenced by Social Security registration or the relevant supporting document. Check the applicable starting date before filing.",
          "Prepare the documentation supporting the move, activity and eligibility. AEAT requires the supporting documents to be submitted before the option form. Annual reporting under the regime uses Form 151."
        ]
      },
      {
        "heading": "Prepare the decision",
        "content": [
          "Compare the regime with ordinary taxation using your actual income, family situation and expected duration in Spain. Keep the assumptions and supporting documents together; no fixed saving can be promised without that comparison.",
          "This overview does not determine an individual taxpayer’s eligibility. Use the official guidance below to prepare a review of your circumstances."
        ]
      }
    ],
    "faq": {
      "title": "Frequently asked questions",
      "items": [
        {
          "question": "How long can the regime apply?",
          "answer": "The year in which Spanish tax residence is acquired and the following five tax periods, provided the conditions remain satisfied."
        },
        {
          "question": "Can family members apply?",
          "answer": "Certain spouses, children and, in specified cases, the other parent may qualify as associated taxpayers. Their conditions and individual applications must be checked; the benefit is not automatic."
        },
        {
          "question": "Is remote work excluded?",
          "answer": "No. Certain remote employment arrangements are included in the current rules. The contract and circumstances of the move still need to satisfy the relevant conditions."
        }
      ]
    },
    "sourcesTitle": "Official sources — reviewed on 5 September 2026",
    "sources": [
      {
        "label": "BOE — Artículo 93, Ley 35/2006",
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764#a93"
      },
      {
        "label": "AEAT — Régimen especial de impatriados",
        "href": "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/manual-tributacion-no-residentes/regimenes-opcionales/regimen-especial-impatriados.html"
      },
      {
        "label": "AEAT — Instrucciones del modelo 149",
        "href": "https://sede.agenciatributaria.gob.es/Sede/todas-gestiones/impuestos-tasas/impuesto-sobre-renta-personas-fisicas/modelo-149-irpf-comunicacion-opcion-exclusion_/instrucciones-cumplimentar-comunicacion.html"
      }
    ],
    "cta": {
      "title": "Prepare your move to Spain",
      "description": "Identify the financial and administrative questions to review before deciding.",
      "buttonText": "Contact Iter Advisors",
      "buttonHref": "/en/contact"
    }
  },
  "es": {
    "meta": {
      "title": "Ley Beckham: requisitos y solicitud | Iter Advisors",
      "description": "Requisitos del régimen especial para personas desplazadas a España, tributación del trabajo, modelo 149 y documentación que conviene preparar."
    },
    "hero": {
      "h1": "Ley Beckham en España: comprobar los requisitos antes de solicitarla",
      "intro": "La Ley Beckham es el nombre habitual del régimen especial del artículo 93 de la Ley del IRPF. Su aplicación depende del motivo del desplazamiento y de las condiciones legales; no es una ventaja automática para cualquier persona que se instale en España."
    },
    "sections": [
      {
        "heading": "¿Quién puede acogerse?",
        "content": [
          "Para los desplazamientos sujetos a la regulación introducida en 2023, la condición de no residencia previa se refiere a los cinco períodos impositivos anteriores al desplazamiento. Se contemplan determinados contratos laborales, trabajo a distancia, administradores y actividades emprendedoras o profesionales cualificadas.",
          "El alta como autónomo no basta por sí sola. Deben comprobarse la actividad que permite acceder al régimen, el historial de residencia y las demás condiciones legales."
        ]
      },
      {
        "heading": "¿Cómo tributan las rentas?",
        "content": [
          "Los rendimientos del trabajo tributan, con carácter general, al 24 % hasta 600.000 euros y al 47 % por el exceso. Otras rentas siguen sus propias reglas: no existe una exención general del 0 % para las ganancias sobre activos españoles.",
          "Los rendimientos del trabajo obtenidos durante el régimen se consideran, con carácter general, obtenidos en España a estos efectos, aunque el pagador esté en el extranjero. Las demás rentas y la posible deducción por doble imposición requieren un análisis separado."
        ]
      },
      {
        "heading": "¿Cómo se solicita?",
        "content": [
          "La opción se comunica mediante el modelo 149. Para el contribuyente principal, el plazo general es de seis meses desde el inicio de actividad acreditado por el alta en la Seguridad Social o el documento justificativo correspondiente. Hay que comprobar la fecha aplicable antes de presentar la solicitud.",
          "Prepare los documentos del desplazamiento, la actividad y el cumplimiento de los requisitos. La AEAT exige aportar la documentación antes de presentar la comunicación de opción. La declaración anual del régimen se realiza mediante el modelo 151."
        ]
      },
      {
        "heading": "Preparar la decisión",
        "content": [
          "Compare este régimen con la tributación ordinaria a partir de sus rentas, situación familiar y permanencia prevista en España. Conserve las hipótesis y los documentos: no puede prometerse un ahorro fijo sin esa comparación.",
          "Este resumen no determina la elegibilidad de una persona concreta. Las fuentes oficiales siguientes permiten preparar la revisión de su situación."
        ]
      }
    ],
    "faq": {
      "title": "Preguntas frecuentes",
      "items": [
        {
          "question": "¿Cuánto dura el régimen?",
          "answer": "El período en el que se adquiere la residencia fiscal en España y los cinco períodos impositivos siguientes, siempre que se mantengan las condiciones."
        },
        {
          "question": "¿Puede aplicarse a familiares?",
          "answer": "Determinados cónyuges, hijos y, en los supuestos previstos, el otro progenitor pueden acogerse como contribuyentes asociados. Deben revisar sus requisitos y presentar su opción individual; no es automático."
        },
        {
          "question": "¿Está excluido el teletrabajo?",
          "answer": "No. La regulación actual incluye determinados supuestos de trabajo a distancia por cuenta ajena. El contrato y las circunstancias del desplazamiento deben cumplir los requisitos correspondientes."
        }
      ]
    },
    "sourcesTitle": "Fuentes oficiales — revisadas el 5 de septiembre de 2026",
    "sources": [
      {
        "label": "BOE — Artículo 93, Ley 35/2006",
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764#a93"
      },
      {
        "label": "AEAT — Régimen especial de impatriados",
        "href": "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/manual-tributacion-no-residentes/regimenes-opcionales/regimen-especial-impatriados.html"
      },
      {
        "label": "AEAT — Instrucciones del modelo 149",
        "href": "https://sede.agenciatributaria.gob.es/Sede/todas-gestiones/impuestos-tasas/impuesto-sobre-renta-personas-fisicas/modelo-149-irpf-comunicacion-opcion-exclusion_/instrucciones-cumplimentar-comunicacion.html"
      }
    ],
    "cta": {
      "title": "Preparar su traslado a España",
      "description": "Identifique las cuestiones financieras y administrativas que necesita revisar.",
      "buttonText": "Contactar con Iter Advisors",
      "buttonHref": "/es/contact"
    }
  },
  "fr": {
    "meta": {
      "title": "Loi Beckham : conditions et démarches en Espagne | Iter Advisors",
      "description": "Comprendre les conditions du régime spécial espagnol et préparer les documents nécessaires à une demande via le modèle 149."
    },
    "hero": {
      "h1": "Loi Beckham : vérifier les conditions avant de demander le régime",
      "intro": "La loi Beckham désigne le régime spécial prévu à l’article 93 de la loi espagnole relative à l’impôt sur le revenu. Son application dépend du motif du départ et de conditions légales précises."
    },
    "sections": [
      {
        "heading": "Vérifier les conditions",
        "content": [
          "Pour les situations relevant des règles introduites en 2023, la condition de non-résidence préalable porte sur les cinq périodes fiscales précédant le déplacement. Certains salariés, télétravailleurs salariés, dirigeants, entrepreneurs et professionnels qualifiés peuvent être concernés sous conditions."
        ]
      },
      {
        "heading": "Distinguer les revenus",
        "content": [
          "Les revenus du travail sont en principe imposés à 24 % jusqu’à 600 000 euros et à 47 % au-delà. Le traitement des autres revenus doit être analysé séparément : aucune exonération générale des plus-values espagnoles ne doit être présumée."
        ]
      },
      {
        "heading": "Préparer la demande",
        "content": [
          "La demande passe par le modèle 149. Le délai général du contribuable principal est de six mois à compter du début d’activité attesté par l’affiliation à la Sécurité sociale ou le justificatif applicable. La déclaration annuelle utilise le modèle 151."
        ]
      }
    ],
    "faq": {
      "title": "Questions fréquentes",
      "items": [
        {
          "question": "Quelle durée ?",
          "answer": "L’année d’acquisition de la résidence fiscale espagnole et les cinq périodes fiscales suivantes, sous réserve du maintien des conditions."
        },
        {
          "question": "Les proches sont-ils exclus ?",
          "answer": "Non. Certains membres de la famille peuvent bénéficier du régime comme contribuables associés, sous conditions et avec une demande individuelle."
        }
      ]
    },
    "sourcesTitle": "Sources officielles — vérifiées le 5 septembre 2026",
    "sources": [
      {
        "label": "BOE — Artículo 93, Ley 35/2006",
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764#a93"
      },
      {
        "label": "AEAT — Régimen especial de impatriados",
        "href": "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/manual-tributacion-no-residentes/regimenes-opcionales/regimen-especial-impatriados.html"
      },
      {
        "label": "AEAT — Instrucciones del modelo 149",
        "href": "https://sede.agenciatributaria.gob.es/Sede/todas-gestiones/impuestos-tasas/impuesto-sobre-renta-personas-fisicas/modelo-149-irpf-comunicacion-opcion-exclusion_/instrucciones-cumplimentar-comunicacion.html"
      }
    ],
    "cta": {
      "title": "Préparer votre installation en Espagne",
      "description": "Identifiez les éléments de votre situation à examiner.",
      "buttonText": "Contacter Iter Advisors",
      "buttonHref": "/contact"
    }
  }
};

export function getLeyBeckhamContent(locale: Locale): LeyBeckhamContent { return content[locale]; }
