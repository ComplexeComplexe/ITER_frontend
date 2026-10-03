import type { Locale } from "@/lib/i18n";

/** Navigation by business need, not a second pricing or service catalogue. */
export const FINANCE_ROUTING = {
  fr: {
    caption: "Quel accompagnement pour votre besoin ?",
    headers: ["Votre besoin", "Accompagnement", "Format à convenir"],
    intro: "Les services finance couvrent une direction financière récurrente, un relais temporaire ou une mission ciblée. Choisissez d’abord la décision à préparer ; le périmètre et les livrables sont convenus avant le devis.",
    needs: ["Piloter la finance dans la durée", "Remplacer une direction financière absente", "Comprendre les marges et les écarts", "Anticiper les échéances de cash", "Organiser les pièces et la clôture", "Préparer un financement", "Examiner une acquisition ou une cession"],
    formats: ["Interventions récurrentes et revues de décision", "Mandat temporaire et passation", "Construction du reporting puis suivi", "Prévisionnel puis actualisation", "Organisation avec le cabinet comptable", "Préparation d’une opération définie", "Préparation ou revue selon le mandat"],
  },
  en: {
    caption: "Which support fits your needs?", headers: ["Your need", "Support", "Format to agree"],
    intro: "Finance services cover ongoing leadership, temporary cover or a focused engagement. Start with the decision to prepare; scope and deliverables are agreed before a proposal is priced.",
    needs: ["Lead finance over time", "Cover an absent finance leader", "Understand margins and variances", "Anticipate cash obligations", "Organise documents and closing", "Prepare financing", "Review an acquisition or disposal"],
    formats: ["Recurring work and decision reviews", "Temporary mandate and handover", "Build reporting, then monitor", "Forecast, then update", "Organisation with your accountant", "Preparation for a defined transaction", "Preparation or review under the mandate"],
  },
  es: {
    caption: "¿Qué acompañamiento necesita?", headers: ["Su necesidad", "Acompañamiento", "Formato a acordar"],
    intro: "Los servicios financieros cubren dirección recurrente, relevo temporal o una misión concreta. Empiece por la decisión que debe preparar; el alcance y los entregables se acuerdan antes del presupuesto.",
    needs: ["Dirigir las finanzas a largo plazo", "Sustituir a un responsable financiero ausente", "Entender márgenes y desviaciones", "Anticipar vencimientos de caja", "Organizar documentos y cierre", "Preparar financiación", "Revisar una adquisición o venta"],
    formats: ["Trabajo recurrente y revisiones de decisión", "Mandato temporal y traspaso", "Construir el reporting y seguirlo", "Previsión y actualización", "Organización con su asesor contable", "Preparación de una operación definida", "Preparación o revisión según el mandato"],
  },
} satisfies Record<Locale, { caption: string; headers: string[]; intro: string; needs: string[]; formats: string[] }>;
export const FINANCE_ROUTING_KEYS = ["temps-partage", "transition", "controle", "tresorerie", "comptabilite", "levee", "due-diligence"] as const;
