import type { Locale } from "@/lib/i18n";
import { getCompanyGeography } from "@/lib/company-facts";

/** Rephrases the existing offer scope; adds no prices, credentials or service promises. */
export const PILLAR_DECISIONS = {
  fr: {
    comparison: {
      title: "DAF externalisé, DAF salarié ou expert-comptable ?",
      headers: ["Intervenant", "Travail confié", "Quand le choisir"],
      rows: [
        ["DAF externalisé", "Prévisions de trésorerie, budget, reporting et préparation des décisions, dans le périmètre convenu.", "Un besoin de direction financière récurrent à temps partiel, ou une mission temporaire délimitée."],
        ["DAF salarié", "Direction financière intégrée à l’entreprise, avec une disponibilité correspondant au poste.", "Une charge durable et une présence quotidienne qui justifient un recrutement."],
        ["Expert-comptable", "Comptes et déclarations prévus dans sa lettre de mission.", "Un besoin de production comptable et fiscale ; le DAF peut compléter cette intervention par le pilotage."],
      ],
    },
    financeCoverage: {
      question: "Un DAF Iter peut-il coordonner des entités en France et en Espagne ?",
      answer: `${getCompanyGeography("fr").presence} Le DAF externalisé Iter peut organiser le reporting et le suivi de trésorerie d’entités françaises et espagnoles selon le périmètre convenu. Le devis précise les entités, les langues, les déplacements et l’intervenant affecté. La tenue comptable, la paie et les déclarations locales restent attribuées aux prestataires compétents : elles ne sont pas incluses automatiquement dans la direction financière.`,
    },
    hrCoverage: {
      question: "Accompagnez-vous des équipes en France et en Espagne ?",
      answer: `${getCompanyGeography("fr").presence} Borith Biv accompagne l’organisation RH, le recrutement et les managers selon le périmètre convenu. Pour une équipe répartie entre la France et l’Espagne, la proposition précise les entités employeuses, les langues, les déplacements et les professionnels chargés de la paie et des validations juridiques locales. Une mission RH peut être confiée à Iter indépendamment d’une mission DAF.`,
    },
    financeRevision: "Cette révision : comparaison des rôles de DAF externalisé, DAF salarié et expert-comptable, et précision du périmètre France–Espagne.",
    hrRevision: "Cette révision : précision du périmètre RH France–Espagne et attribution du contenu métier à Borith Biv.",
  },
  en: {
    comparison: {
      title: "Fractional CFO, in-house CFO or accountant?",
      headers: ["Professional", "Work assigned", "When to choose"],
      rows: [
        ["Fractional CFO", "Cash forecasts, budgets, reporting and decision preparation within the agreed scope.", "Recurring part-time finance leadership, or a defined temporary assignment."],
        ["In-house CFO", "Finance leadership integrated into the business, with availability defined by the role.", "An ongoing workload and daily presence that justify hiring an employee."],
        ["Accountant", "Accounts and filings covered by the engagement letter.", "Accounting and tax production; a CFO can provide financial steering alongside this work."],
      ],
    },
    financeCoverage: {
      question: "Can an Iter CFO coordinate entities in France and Spain?",
      answer: `${getCompanyGeography("en").presence} An Iter fractional CFO can organise reporting and cash-flow monitoring for French and Spanish entities within the agreed scope. The proposal names the entities, languages, travel arrangements and assigned professional. Bookkeeping, payroll and local filings remain assigned to the relevant providers; they are not automatically included in finance leadership.`,
    },
    hrCoverage: {
      question: "Do you support teams in France and Spain?",
      answer: `${getCompanyGeography("en").presence} Borith Biv supports HR organisation, recruitment and managers within the agreed scope. For teams in France and Spain, the proposal identifies employing entities, languages, travel and the professionals responsible for payroll and local legal validation. An HR engagement can be commissioned independently of an Iter CFO engagement.`,
    },
    financeRevision: "This revision: comparison of fractional CFO, in-house CFO and accountant responsibilities, and clarification of the France–Spain scope.",
    hrRevision: "This revision: clarification of the France–Spain HR scope and attribution of the professional content to Borith Biv.",
  },
  es: {
    comparison: {
      title: "¿CFO externo, director financiero en plantilla o asesoría contable?",
      headers: ["Profesional", "Trabajo asignado", "Cuándo elegirlo"],
      rows: [
        ["CFO externo", "Previsiones de tesorería, presupuestos, reporting y preparación de decisiones dentro del alcance acordado.", "Una dirección financiera recurrente a tiempo parcial o un encargo temporal delimitado."],
        ["Director financiero en plantilla", "Dirección financiera integrada en la empresa, con la disponibilidad prevista para el puesto.", "Una carga de trabajo estable y una presencia diaria que justifican una contratación."],
        ["Asesoría contable", "Cuentas y declaraciones previstas en el contrato de servicios.", "Producción contable y fiscal; el CFO puede complementarla con la dirección financiera."],
      ],
    },
    financeCoverage: {
      question: "¿Puede un CFO de Iter coordinar entidades en España y Francia?",
      answer: `${getCompanyGeography("es").presence} El CFO externo de Iter puede organizar el reporting y el seguimiento de tesorería de entidades españolas y francesas dentro del alcance acordado. La propuesta precisa entidades, idiomas, desplazamientos y profesional asignado. La contabilidad, las nóminas y las declaraciones locales corresponden a los proveedores competentes y no se incluyen automáticamente en la dirección financiera.`,
    },
    hrCoverage: {
      question: "¿Acompañan a equipos en España y Francia?",
      answer: `${getCompanyGeography("es").presence} Borith Biv acompaña la organización de RR. HH., la contratación y los responsables de equipos dentro del alcance acordado. Para equipos en España y Francia, la propuesta identifica las entidades empleadoras, los idiomas, los desplazamientos y los profesionales responsables de nóminas y validaciones jurídicas locales. La dirección de RR. HH. puede contratarse independientemente de un encargo de CFO de Iter.`,
    },
    financeRevision: "Esta revisión: comparación de las funciones del CFO externo, del director financiero en plantilla y de la asesoría contable, y precisión del alcance España–Francia.",
    hrRevision: "Esta revisión: precisión del alcance de RR. HH. España–Francia y atribución del contenido profesional a Borith Biv.",
  },
} satisfies Record<Locale, {
  comparison: { title: string; headers: string[]; rows: string[][] };
  financeCoverage: { question: string; answer: string };
  hrCoverage: { question: string; answer: string };
  financeRevision: string;
  hrRevision: string;
}>;
