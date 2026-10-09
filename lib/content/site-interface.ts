import { PEOPLE } from "@/lib/company-facts";
import type { Locale } from "../i18n";

/** Small UI dictionary shared by server templates and interactive islands. */
const interfaceText = {
  fr: {
    finance: "Services finance", hr: "Direction RH", brief: "La mission en bref",
    team: "Rencontrer l’équipe", pageNav: "Dans cette page",
    financeContact: "Votre interlocuteur finance", financeTitle: "Échanger avec Sébastien Doat",
    financeRole: PEOPLE.sebastien.roles.fr,
    financeDescription: "Sébastien Doat, associé fondateur d’Iter Advisors, accompagne les dirigeants sur le pilotage financier, la trésorerie et la préparation des financements.",
    profile: "Parcours, publications et interventions", linkedin: "Profil LinkedIn",
    contact: "Présenter mon besoin", hrContact: "Votre interlocuteur RH",
    hrRole: "Partner Capital Humain",
    hrDescription: "Échangez sur votre organisation, vos recrutements et les sujets RH qui mobilisent vos équipes. Le premier échange permet de préciser le périmètre et les intervenants nécessaires.",
    hrCta: "Présenter mon besoin RH", hrOffer: "Découvrir la direction RH externalisée",
  },
  en: {
    finance: "Finance services", hr: "HR leadership", brief: "The engagement at a glance",
    team: "Meet the team", pageNav: "On this page",
    financeContact: "Your finance contact", financeTitle: "Talk to Sébastien Doat",
    financeRole: PEOPLE.sebastien.roles.en,
    financeDescription: "Sébastien Doat, founding partner of Iter Advisors, works with business leaders on financial management, cash flow and financing preparation.",
    profile: "Experience, publications and talks", linkedin: "LinkedIn profile",
    contact: "Describe my needs", hrContact: "Your HR contact",
    hrRole: "Human Capital Partner",
    hrDescription: "Discuss your organization, recruitment and the HR issues taking up your team's time. The initial conversation helps define the scope and the professionals required.",
    hrCta: "Describe my HR needs", hrOffer: "Explore external HR leadership",
  },
  es: {
    finance: "Servicios financieros", hr: "Dirección de RR. HH.", brief: "La misión en breve",
    team: "Conocer al equipo", pageNav: "En esta página",
    financeContact: "Su interlocutor financiero", financeTitle: "Hablar con Sébastien Doat",
    financeRole: PEOPLE.sebastien.roles.es,
    financeDescription: "Sébastien Doat, socio fundador de Iter Advisors, acompaña a los dirigentes en el control financiero, la tesorería y la preparación de la financiación.",
    profile: "Trayectoria, publicaciones e intervenciones", linkedin: "Perfil de LinkedIn",
    contact: "Describir mi necesidad", hrContact: "Su interlocutor de RR. HH.",
    hrRole: "Socio de Capital Humano",
    hrDescription: "Hablemos de su organización, sus contrataciones y los asuntos de RR. HH. que requieren la atención de su equipo. La primera conversación permite precisar el alcance y los profesionales necesarios.",
    hrCta: "Describir mi necesidad de RR. HH.", hrOffer: "Conocer la dirección de RR. HH. externa",
  },
} satisfies Record<Locale, Record<string, string>>;

export function getSiteInterface(locale: Locale) { return interfaceText[locale]; }
