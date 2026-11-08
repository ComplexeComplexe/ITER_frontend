import type { Locale } from "@/lib/i18n";
import type { FinanceService } from "./finance-services";

/** Descriptive headings matched to the work actually described on each page. */
export const FINANCE_HEADING_REVIEW = {
  "fr": {
    "comptabilite": {
      "headline": "Comptabilité externalisée : coordination et reporting",
      "headings": {
        "need": "Quand réorganiser votre comptabilité externalisée ?",
        "deliverables": "Pièces, clôture et reporting : les livrables comptables",
        "method": "Comment organiser les échanges avec votre expert-comptable ?"
      },
      "budgetHeading": "Quel budget prévoir pour organiser votre comptabilité ?"
    },
    "organisation": {
      "headings": {
        "need": "Quand structurer les opérations de votre fonction finance ?",
        "deliverables": "Responsabilités, calendrier et procédures financières",
        "method": "Comment réorganiser votre fonction finance ?"
      },
      "budgetHeading": "Quel budget prévoir pour structurer la fonction finance ?"
    },
    "levee": {
      "headline": "Accompagnement financier à la levée de fonds",
      "headings": {
        "need": "Quand préparer le dossier financier d’une levée de fonds ?",
        "deliverables": "Modèle financier, data room et réponses aux investisseurs",
        "method": "Comment se prépare une levée de fonds avec le DAF ?"
      },
      "budgetHeading": "Quel budget prévoir pour la préparation financière d’une levée ?"
    },
    "due-diligence": {
      "headings": {
        "need": "Quand réaliser une due diligence financière ?",
        "deliverables": "Résultat, dette et BFR : les analyses de due diligence",
        "method": "Comment se déroule une due diligence financière ?"
      },
      "budgetHeading": "Quel budget prévoir pour une due diligence financière ?"
    },
    "temps-partage": {
      "budgetHeading": "Devis et périmètre d’un DAF à temps partagé"
    },
    "transition": {
      "budgetHeading": "Quel budget prévoir pour un DAF de transition ?"
    },
    "fractional": {
      "budgetHeading": "Quel budget prévoir pour un CFO de startup ?"
    },
    "paris": {
      "budgetHeading": "Tarif et périmètre d’un DAF externalisé à Paris"
    },
    "controle": {
      "budgetHeading": "Quel est le tarif d’un contrôle de gestion externalisé ?"
    },
    "tresorerie": {
      "budgetHeading": "Quel budget prévoir pour un prévisionnel de trésorerie ?"
    }
  },
  "en": {
    "comptabilite": {
      "headline": "Outsourced accounting: coordination and reporting",
      "headings": {
        "need": "When should you reorganise outsourced accounting?",
        "deliverables": "Accounting records, closing and reporting deliverables",
        "method": "How do we organise work with your accountant?"
      },
      "budgetHeading": "What does accounting coordination cost?"
    },
    "organisation": {
      "headings": {
        "need": "When should you structure your finance operations?",
        "deliverables": "Finance responsibilities, calendar and procedures",
        "method": "How do we reorganise your finance function?"
      },
      "budgetHeading": "What does structuring your finance function cost?"
    },
    "levee": {
      "headings": {
        "need": "When should you prepare the financial case for fundraising?",
        "deliverables": "Financial model, data room and investor responses",
        "method": "How does a CFO prepare your fundraising process?"
      },
      "budgetHeading": "What does financial preparation for fundraising cost?"
    },
    "due-diligence": {
      "headings": {
        "need": "When should you commission financial due diligence?",
        "deliverables": "Earnings, debt and working capital analysis",
        "method": "How does financial due diligence work?"
      },
      "budgetHeading": "What does financial due diligence cost?"
    },
    "temps-partage": {
      "budgetHeading": "Scope and quotation for a part-time CFO"
    },
    "transition": {
      "budgetHeading": "What does an interim CFO engagement cost?"
    },
    "fractional": {
      "budgetHeading": "What budget should a startup allow for a CFO?"
    },
    "paris": {
      "budgetHeading": "Fees and scope for a fractional CFO in Paris"
    },
    "controle": {
      "budgetHeading": "What does outsourced management control cost?"
    },
    "tresorerie": {
      "budgetHeading": "What does a cash-flow forecasting engagement cost?"
    }
  },
  "es": {
    "comptabilite": {
      "headline": "Contabilidad externalizada: coordinación y reporting",
      "headings": {
        "need": "¿Cuándo reorganizar la contabilidad externalizada?",
        "deliverables": "Documentos, cierre y reporting: los entregables contables",
        "method": "¿Cómo organizamos el trabajo con su asesoría contable?"
      },
      "budgetHeading": "¿Qué presupuesto prever para la coordinación contable?"
    },
    "organisation": {
      "headings": {
        "need": "¿Cuándo estructurar las operaciones financieras de la empresa?",
        "deliverables": "Responsabilidades, calendario y procedimientos financieros",
        "method": "¿Cómo reorganizamos la función financiera?"
      },
      "budgetHeading": "¿Qué presupuesto prever para estructurar la función financiera?"
    },
    "levee": {
      "headings": {
        "need": "¿Cuándo preparar la documentación financiera de una ronda?",
        "deliverables": "Modelo financiero, data room y respuestas a inversores",
        "method": "¿Cómo prepara el CFO una ronda de financiación?"
      },
      "budgetHeading": "¿Cuánto cuesta la preparación financiera de una ronda?"
    },
    "due-diligence": {
      "headings": {
        "need": "¿Cuándo realizar una due diligence financiera?",
        "deliverables": "Resultados, deuda y capital circulante: los análisis financieros",
        "method": "¿Cómo se desarrolla una due diligence financiera?"
      },
      "budgetHeading": "¿Cuánto cuesta una due diligence financiera?"
    },
    "temps-partage": {
      "budgetHeading": "Alcance y presupuesto de un CFO a tiempo parcial"
    },
    "transition": {
      "budgetHeading": "¿Qué presupuesto prever para un CFO de transición?"
    },
    "fractional": {
      "budgetHeading": "¿Qué presupuesto necesita una startup para un CFO?"
    },
    "paris": {
      "budgetHeading": "Honorarios y alcance de un CFO externo en París"
    },
    "controle": {
      "budgetHeading": "¿Cuánto cuesta externalizar el control de gestión?"
    },
    "tresorerie": {
      "budgetHeading": "¿Cuánto cuesta preparar una previsión de tesorería?"
    }
  }
} satisfies Record<Locale, Record<string, Partial<Pick<FinanceService, "headline" | "headings" | "budgetHeading">>>>;
