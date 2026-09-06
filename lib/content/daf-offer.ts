import type { Locale } from "../i18n";
import { COUT_DAF_SALARIE, DELAIS, ENGAGEMENT, FORMULES, VOLUME_DAF_JOURS_MOIS } from "./facts";

/** Localized presentation of the approved offer. Prices and terms stay in facts.ts. */
export function getDafOffer(locale: Locale) {
  const number = (value: number) => value.toLocaleString(locale === "en" ? "en-GB" : "fr-FR");
  const range = (min: number, max: number) => `${number(min)}–${number(max)}`;
  const monthly = (min: number, max: number) => locale === "en"
    ? `EUR ${range(min, max)} excl. VAT/month`
    : `${range(min, max)} € ${locale === "es" ? "sin IVA/mes" : "HT/mois"}`;
  const duration = (value: string) => locale === "fr" ? value : value
    .replace(" à ", locale === "en" ? " to " : " a ")
    .replace("jours", locale === "en" ? "days" : "días");
  const names = { fr: ["Essentiel", "Croissance", "Premium"], en: ["Essential", "Growth", "Premium"], es: ["Esencial", "Crecimiento", "Premium"] };
  const audiences = {
    en: ["Seed startups, fewer than 30 employees", "Series A, 30 to 100 employees", "Series B and beyond"],
    es: ["Startups en fase seed, menos de 30 empleados", "Serie A, de 30 a 100 empleados", "Serie B y posteriores"],
  };
  const tiers = FORMULES.map((plan, i) => ({
    name: names[locale][i],
    price: monthly(plan.prixMin, plan.prixMax),
    volume: duration(plan.volumeIndicatif).replace("par mois", locale === "en" ? "per month" : locale === "es" ? "al mes" : "par mois"),
    audience: locale === "fr" ? plan.cible : audiences[locale][i],
  }));
  const minimum = Math.min(...FORMULES.map(plan => plan.prixMin));
  const maximum = Math.max(...FORMULES.map(plan => plan.prixMax));
  const commitment = locale === "en"
    ? `No minimum engagement duration; cancellation with ${ENGAGEMENT.preavisJours} days' notice.`
    : locale === "es"
      ? `Sin duración mínima de compromiso; cancelación con ${ENGAGEMENT.preavisJours} días de preaviso.`
      : ENGAGEMENT.formulation;
  const billing = locale === "en"
    ? "The monthly retainer covers an agreed scope of work and seniority, not hours or a day-rate package. Days shown are observed averages. Any additional scope requires a signed amendment."
    : locale === "es"
      ? "La cuota mensual cubre un alcance de trabajo y un nivel de experiencia acordados, no un paquete de horas o jornadas. Los días indicados son promedios observados. Cualquier ampliación requiere un acuerdo adicional firmado."
      : "Le forfait mensuel couvre un périmètre de travail et un niveau de séniorité, pas un nombre d'heures ou de journées. Les jours indiqués sont des moyennes observées. Aucun dépassement n'est facturé sans avenant signé.";
  return {
    tiers, commitment, billing,
    volume: duration(`${VOLUME_DAF_JOURS_MOIS.min} à ${VOLUME_DAF_JOURS_MOIS.max} jours`),
    price: monthly(minimum, maximum),
    annualPrice: range(minimum * 12, maximum * 12),
    salary: range(COUT_DAF_SALARIE.min, COUT_DAF_SALARIE.max),
    start: duration(DELAIS.missionDemarree),
    transitionStart: duration(DELAIS.transitionUrgent),
    caption: locale === "en" ? "Monthly CFO packages — days are indicative averages, the commitment covers the agreed scope"
      : locale === "es" ? "Planes mensuales de CFO — días orientativos, compromiso sobre el alcance acordado"
      : "Formules DAF mensuelles — volumes indicatifs, engagement sur le périmètre",
  };
}
