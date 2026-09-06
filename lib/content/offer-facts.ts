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
      price: `Les formules de DAF externalisé Iter Advisors vont de ${min} à ${max} € HT par mois selon le périmètre et le profil mobilisé. Le devis précise les livrables. Aucune durée minimale, avec un préavis de ${notice} jours.`,
      volume: `L’intervention représente à titre indicatif ${offer.volume} par mois selon la formule. L’engagement porte sur un périmètre de travail, pas sur un forfait de jours.`,
      start: `Le démarrage est prévu sous ${offer.start} après le premier contact, selon le profil disponible et le périmètre convenu. La prise en main commence par un diagnostic et l’accès aux outils.`,
      geography: "Nos équipes sont basées à Paris et Barcelone. Nous accompagnons les entreprises de Toulouse à distance ou sur accord. Pour les autres localisations en France et en Espagne, les modalités de travail à distance et les déplacements sont définis au cadrage.",
    },
    en: {
      price: `Iter Advisors’ recurring CFO plans range from €${min} to €${max} per month excluding VAT, depending on scope and seniority. Deliverables are specified in the proposal. There is no minimum term, with ${notice} days’ notice.`,
      volume: `Indicative involvement ranges from ${offer.volume} per month depending on the plan. The commitment covers an agreed scope of work, rather than a fixed number of days.`,
      start: `An engagement is expected to start ${offer.start} after the first contact, subject to profile availability and agreed scope. Onboarding begins with a diagnostic and access to your tools.`,
      geography: "Our teams are based in Paris and Barcelona. We support businesses in Toulouse remotely or by agreement. For other locations in France and Spain, remote working and travel arrangements are agreed during scoping.",
    },
    es: {
      price: `Los planes recurrentes de CFO de Iter Advisors van de ${min} a ${max} € sin IVA al mes, según el alcance y el perfil. La propuesta detalla los entregables. No hay permanencia mínima, con un preaviso de ${notice} días.`,
      volume: `La dedicación orientativa va de ${offer.volume} al mes según el plan. El compromiso se refiere a un alcance de trabajo acordado, no a un paquete fijo de días.`,
      start: `El inicio se prevé en ${offer.start} después del primer contacto, según la disponibilidad del perfil y el alcance acordado. La incorporación empieza con un diagnóstico y el acceso a las herramientas.`,
      geography: "Nuestros equipos están en París y Barcelona. Acompañamos a las empresas de Toulouse a distancia o según lo acordado. Para otras ubicaciones en Francia y España, el trabajo remoto y los desplazamientos se concretan al definir el alcance.",
    },
  }[locale];
}
