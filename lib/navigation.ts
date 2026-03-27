import { Locale } from "./i18n";
import { SERVICE_PAGE_SLUGS, SERVICE_URL_SLUG_BY_LOCALE } from "./strapi";

export interface NavItem {
  title: string;
  href: string;
  children?: { text: string; href: string; group?: string }[];
  megaMenu?: boolean;
}

export interface FooterContent {
  description: string;
  copyright: string;
  trustfolio: string;
  legalLinks: { text: string; href: string }[];
}

const navFr: NavItem[] = [
  {
    title: "DAF Externalisé",
    href: "/daf-externalise",
    children: [
      { text: "DAF à Temps Partagé", href: "/daf-externalise/temps-partage" },
      { text: "DAF de Transition", href: "/daf-externalise/transition" },
      { text: "DAF : Métier", href: "/daf-externalise/metier" },
    ],
  },
  {
    title: "DRH Externalisé",
    href: "/drh-externalise",
    children: [
      { text: "DRH à Temps Partagé", href: "/drh-externalise/temps-partage" },
    ],
  },
  {
    title: "Services",
    href: "/services",
    megaMenu: true,
    children: [
      { text: "DAF externalisé", href: "/daf-externalise", group: "Finance" },
      { text: "Prévisionnel de trésorerie", href: "/services/previsionnel-tresorerie", group: "Finance" },
      { text: "Gestion financière externalisée", href: "/services/gestion-financiere-externalisee", group: "Finance" },
      { text: "Accompagnement levée de fonds", href: "/services/accompagnement-levee-de-fond", group: "Finance" },
      { text: "Contrôle de gestion", href: "/services/controle-de-gestion-externalise", group: "Finance" },
      { text: "M&A & Due Diligence", href: "/services/ma-due-diligence", group: "Finance" },
      { text: "DRH externalisé", href: "/drh-externalise", group: "RH" },
      { text: "Recrutement & talent acquisition", href: "/drh-externalise", group: "RH" },
      { text: "Gestion de la paie", href: "/drh-externalise", group: "RH" },
      { text: "Formation & développement", href: "/drh-externalise", group: "RH" },
      { text: "Conformité & droit du travail", href: "/drh-externalise", group: "RH" },
    ],
  },
  {
    title: "Ressources",
    href: "/ressources",
    children: [
      { text: "Cas clients", href: "/ressources/testimonials" },
      { text: "Actualités", href: "/ressources/blog" },
      { text: "Fiches métier", href: "/ressources/fiche-metier" },
      { text: "Glossaire", href: "/ressources/glossaire" },
    ],
  },
  { title: "A propos", href: "/a-propos" },
  { title: "Jobs", href: "/jobs" },
  { title: "Contact", href: "/contact" },
];

const navEn: NavItem[] = [
  {
    title: "CFO Outsourced",
    href: "/en/daf-outsourcing",
    children: [
      { text: "Shared-time CFO", href: "/en/daf-outsourcing/shared-time" },
      { text: "Transitional CFO", href: "/en/daf-outsourcing/transition" },
      { text: "CFO : The Mission", href: "/en/daf-outsourcing/metier" },
    ],
  },
  {
    title: "HR Outsourced",
    href: "/en/hr-outsourcing",
    children: [
      { text: "Shared-time HR", href: "/en/hr-outsourcing/shared-time" },
    ],
  },
  {
    title: "Services",
    href: "/en/services",
    children: SERVICE_PAGE_SLUGS.map((slug) => ({
      text: {
        "previsionnel-tresorerie": "Cash flow forecast",
        "gestion-financiere-externalisee": "Outsourced financial management",
        "accompagnement-levee-de-fond": "Fund raising support",
        "comptabilite-externalisation": "Outsource your accounting",
        "controle-de-gestion-externalise": "Outsourced management control",
      }[slug],
      href: `/en/services/${SERVICE_URL_SLUG_BY_LOCALE.en[slug]}`,
    })),
  },
  {
    title: "Resources",
    href: "/en/ressources",
    children: [
      { text: "Case studies", href: "/en/ressources/testimonials" },
      { text: "Blog", href: "/en/ressources/blog" },
      { text: "Job descriptions", href: "/en/ressources/fiche-metier" },
      { text: "Glossary", href: "/en/ressources/glossaire" },
    ],
  },
  { title: "About us", href: "/en/a-propos" },
  { title: "Jobs", href: "/en/jobs" },
  { title: "contact", href: "/en/contact" },
];

const navEs: NavItem[] = [
  {
    title: "CFO externo",
    href: "/es/externalizacion-daf",
    children: [
      { text: "CFO a Tiempo Compartido", href: "/es/externalizacion-daf/multipropiedad" },
      { text: "CFO de transición", href: "/es/externalizacion-daf/transition" },
      { text: "CFO : Perfil profesional", href: "/es/externalizacion-daf/metier" },
    ],
  },
  {
    title: "RRHH externalizado",
    href: "/es/externalizacion-rrhh",
    children: [
      { text: "RRHH a tiempo compartido", href: "/es/externalizacion-rrhh/tiempo-compartido" },
    ],
  },
  {
    title: "Servicios",
    href: "/es/services",
    children: SERVICE_PAGE_SLUGS.map((slug) => ({
      text: {
        "previsionnel-tresorerie": "Previsión de tesorería",
        "gestion-financiere-externalisee": "Gestión financiera externalizada",
        "accompagnement-levee-de-fond": "Soporte a la financiación",
        "comptabilite-externalisation": "Externalizar la contabilidad",
        "controle-de-gestion-externalise": "Control de gestión externalizado",
      }[slug],
      href: `/es/services/${SERVICE_URL_SLUG_BY_LOCALE.es[slug]}`,
    })),
  },
  {
    title: "Recursos",
    href: "/es/ressources",
    children: [
      { text: "Casos prácticos", href: "/es/ressources/testimonials" },
      { text: "Blog", href: "/es/ressources/blog" },
      { text: "Perfiles profesionales", href: "/es/ressources/fiche-metier" },
      { text: "Glosario", href: "/es/ressources/glossaire" },
    ],
  },
  { title: "Quiénes somos", href: "/es/quienes-somos" },
  { title: "Empleo", href: "/es/jobs" },
  { title: "Contacto", href: "/es/contact" },
];

export const navigation: Record<Locale, NavItem[]> = {
  fr: navFr,
  en: navEn,
  es: navEs,
};

export const footerContent: Record<Locale, FooterContent> = {
  fr: {
    description:
      "Iter Advisors, basé à Barcelone, Paris et Toulouse, est un cabinet spécialisé dans les services de DAF externalisé, de conseil stratégique et d\u2019accompagnement en investissements, fusions-acquisitions.",
    copyright: "Copyright \u00A9 2025-2026 Iter Advisors. Tous droits réservés.",
    trustfolio: "Note de 5/5 sur 31 avis sur notre profil",
    legalLinks: [
      { text: "Mentions légales", href: "/mentions-legales" },
      { text: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    ],
  },
  en: {
    description:
      "Iter Advisors, based in Barcelona, Paris and Toulouse, specializes in outsourced CFO services, strategic consulting and support for investments and mergers & acquisitions.",
    copyright: "Copyright \u00A9 2025-2026 Iter Advisors. All Rights Reserved.",
    trustfolio: "5/5 rating based on 31 reviews on our profile",
    legalLinks: [
      { text: "Terms of use", href: "/en/legal-notice" },
      { text: "Privacy policy", href: "/en/privacy-policy" },
    ],
  },
  es: {
    description:
      "Iter Advisors, con sedes en Barcelona, París y Toulouse, es una empresa especializada en servicios externos de CFO, consultoría estratégica y apoyo a inversiones, fusiones y adquisiciones.",
    copyright: "Copyright \u00A9 2025-2026 Iter Advisors. Todos los derechos reservados.",
    trustfolio: "Puntuación de 5/5 basada en 31 opiniones en nuestro perfil",
    legalLinks: [
      { text: "Información jurídica", href: "/es/aviso-legal" },
      { text: "Política de privacidad", href: "/es/politica-de-privacidad" },
    ],
  },
};

export const languageSwitcher: Record<Locale, { label: string; flag: string }> = {
  fr: { label: "Français", flag: "fr" },
  en: { label: "English", flag: "gb" },
  es: { label: "Español", flag: "es" },
};

export function getContactPath(locale: Locale): string {
  if (locale === "fr") return "/contact";
  return `/${locale}/contact`;
}

export const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2DVmtdvwnZykAPoQC9_BNTFB_wHl1IrNagCAX0AaSbmEs8JmSGsTdWo96WGPzMEYtf_nkILQN8";

export function getBookingUrl(): string {
  return BOOKING_URL;
}

export function getHomePath(locale: Locale): string {
  if (locale === "fr") return "/";
  return `/${locale}`;
}
