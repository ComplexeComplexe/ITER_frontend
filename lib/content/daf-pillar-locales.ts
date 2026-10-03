import { CLIENTS_ACCOMPAGNES } from "./facts";
import type { Locale } from "@/lib/i18n";
import { dafPillar, type DafPillarContent } from "./daf-pillar";
import en from "./locales/daf-pillar.en.json";
import es from "./locales/daf-pillar.es.json";

const content: Record<Locale, DafPillarContent> = { fr: dafPillar, en, es };
export function getDafPillarContent(locale: Locale): DafPillarContent {
  const page = content[locale];
  return {
    ...page,
    hero: {
      ...page.hero,
      proofs: page.hero.proofs.map((proof) =>
        proof.replace("{{clients}}", String(CLIENTS_ACCOMPAGNES)),
      ),
    },
  };
}

export const pillarInterface = {
  fr: {
    eyebrow: "Iter Advisors · Direction financière",
    pricing: "Voir les tarifs",
    proof: "Lire les missions clients et le témoignage d’Opti Digital",
    deliverable: "Votre livrable",
    decision: "Pour décider",
    caption: "Trame illustrative de revue mensuelle, sans données client",
    headers: ["Constat", "Question à examiner", "Action à suivre"],
    cities: ["Paris", "Barcelone", "Toulouse"],
    cityPrefix: "DAF externalisé à",
    linkedIn: "Profil LinkedIn de",
    ai: "Notre approche de l’IA en finance",
    faq: "Les questions à clarifier avant de démarrer",
    sectors: "Accompagnements sectoriels",
    explore: "Approfondir selon votre activité",
    industry: "Industrie",
    service: "DAF externalisé",
    spain: "Espagne",
    founder: "Associé fondateur, DAF externalisé et CFO",
    partner: "Associé et CFO",
    expertise: [
      "DAF externalisé",
      "direction financière externalisée",
      "levée de fonds",
      "reporting financier",
      "budget prévisionnel",
    ],
    florentExpertise: [
      "DAF externalisé",
      "finance startups",
      "tableau de bord financier",
      "contrôle de gestion",
    ],
  },
  en: {
    eyebrow: "Iter Advisors · Finance leadership",
    pricing: "View pricing",
    proof: "Read the client engagements and Opti Digital testimonial",
    deliverable: "Your deliverable",
    decision: "Decisions it supports",
    caption: "Illustrative monthly review without client data",
    headers: ["Finding", "Question to examine", "Action to follow"],
    cities: ["Paris", "Barcelona", "Toulouse"],
    cityPrefix: "Fractional CFO in",
    linkedIn: "LinkedIn profile of",
    ai: "Our approach to AI in finance",
    faq: "Questions to clarify before starting",
    sectors: "Sector-specific support",
    explore: "Explore support for your business",
    industry: "Industry",
    service: "Fractional CFO",
    spain: "Spain",
    founder: "Founding partner and Fractional CFO",
    partner: "Partner and CFO",
    expertise: [
      "Fractional CFO",
      "Financial management",
      "Fundraising",
      "Financial reporting",
      "Budget forecasting",
    ],
    florentExpertise: [
      "Fractional CFO",
      "Startup finance",
      "Financial dashboards",
      "Management control",
    ],
  },
  es: {
    eyebrow: "Iter Advisors · Dirección financiera",
    pricing: "Ver precios",
    proof: "Leer las misiones y el testimonio de Opti Digital",
    deliverable: "Su entregable",
    decision: "Para decidir",
    caption: "Ejemplo de revisión mensual sin datos de clientes",
    headers: ["Observación", "Pregunta a examinar", "Acción a seguir"],
    cities: ["París", "Barcelona", "Toulouse"],
    cityPrefix: "CFO externo en",
    linkedIn: "Perfil de LinkedIn de",
    ai: "Nuestro enfoque de IA en finanzas",
    faq: "Preguntas que conviene aclarar antes de empezar",
    sectors: "Acompañamiento por sectores",
    explore: "Conozca el acompañamiento para su actividad",
    industry: "Industria",
    service: "CFO externo",
    spain: "España",
    founder: "Socio fundador y CFO externo",
    partner: "Socio y CFO",
    expertise: [
      "CFO externo",
      "Dirección financiera",
      "Rondas de financiación",
      "Reporting financiero",
      "Previsión presupuestaria",
    ],
    florentExpertise: [
      "CFO externo",
      "Finanzas de startups",
      "Cuadros de mando financieros",
      "Control de gestión",
    ],
  },
} satisfies Record<Locale, { [key: string]: string | string[] }>;
