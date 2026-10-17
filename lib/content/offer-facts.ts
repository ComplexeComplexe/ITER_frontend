import { getCompanyGeography } from "@/lib/company-facts";
import { getDafOffer } from "./daf-offer";
import type { Locale } from "@/lib/i18n";
import { FORMULES, ENGAGEMENT } from "./facts";

/** Summaries for visible FAQs and their JSON-LD, using the approved offer. */
export function getDafOfferFacts(locale: Locale) {
  const offer = getDafOffer(locale);
  const format = (value: number) => new Intl.NumberFormat(locale).format(value);
  const min = format(Math.min(...FORMULES.map(f => f.prixMin)));
  const max = format(Math.max(...FORMULES.map(f => f.prixMax)));
  const notice = ENGAGEMENT.preavisJours;
  return {
    fr: {
      price: `Les fourchettes indicatives de DAF externalisé Iter Advisors vont de ${min} à ${max} € HT par mois selon le périmètre et le profil mobilisé. Le devis précise les livrables. Aucune durée minimale, avec un préavis de ${notice} jours.`,
      volume: `L’intervention représente à titre indicatif ${offer.volume} par mois selon la formule. L’engagement porte sur un périmètre de travail, pas sur un forfait de jours.`,
      geography: getCompanyGeography("fr").summary,
    },
    en: {
      price: `Iter Advisors’ indicative recurring CFO fee ranges go from €${min} to €${max} per month excluding VAT, depending on scope and seniority. Deliverables are specified in the proposal.`,
      volume: `Indicative involvement ranges from ${offer.volume} per month depending on the plan. The commitment covers an agreed scope of work, rather than a fixed number of days.`,
      geography: getCompanyGeography("en").summary,
    },
    es: {
      price: `Las horquillas orientativas de CFO recurrente de Iter Advisors van de ${min} a ${max} € sin IVA al mes, según el alcance y el perfil. La propuesta detalla los entregables.`,
      volume: `La dedicación orientativa va de ${offer.volume} al mes según el plan. El compromiso se refiere a un alcance de trabajo acordado, no a un paquete fijo de días.`,
      geography: getCompanyGeography("es").summary,
    },
  }[locale];
}
