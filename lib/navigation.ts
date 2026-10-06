import { parityHref } from "./locale-route-map";
import { TRUSTFOLIO_REVIEW_COUNT } from "@/lib/content/facts";
import { Locale } from "./i18n";


export interface NavItem {
  title: string;
  href: string;
  children?: { text: string; href: string; group?: string }[];
  megaMenu?: boolean;
}

export interface FooterLocation {
  city: string;
  country: string;
  href: string;
}

export interface FooterContent {
  description: string;
  copyright: string;
  trustfolio: string;
  legalLinks: { text: string; href: string }[];
  /** SEO-REP §8 (2026-08-15) — bloc éditorial du footer.
   *  Le glossaire n'était atteignable que depuis le menu Ressources ; ses
   *  neuf fiches étaient signalées orphelines par le crawl. Le footer lui
   *  donne un point d'entrée présent sur toutes les pages. */
  editorialLinks: { text: string; href: string }[];
  locations: FooterLocation[];
}

const navFr: NavItem[] = [
  {
    title: "DAF externalisé",
    href: "/daf-externalise",
  },
  {
    title: "Services Finance",
    href: "/services",
    children: [
      { text: "DAF à temps partagé", href: "/daf-externalise/temps-partage" },
      { text: "DAF de transition", href: "/daf-externalise/transition" },
      { text: "Contrôle de gestion externalisé", href: "/services/controle-de-gestion-externalise" },
      { text: "Prévisionnel de trésorerie", href: "/services/previsionnel-tresorerie" },
      { text: "Coordination comptable", href: "/services/comptabilite-externalisation" },
      { text: "Accompagnement levée de fonds", href: "/services/accompagnement-levee-de-fond" },
      { text: "M&A et due diligence", href: "/services/ma-due-diligence" },
    ],
  },
  { title: "DRH à temps partagé", href: "/drh-externalise" },
  {
    title: "Ressources",
    href: "/ressources",
    children: [
      { text: "Outils", href: "/ressources/outils" },
      // IA-FINANCE (2026-09-01) — hub de la nouvelle section, en sous-menu
      // (pas d'entrée de niveau 1 : le header en a déjà cinq).
      { text: "IA & Finance", href: "/ressources/ia-finance" },
      { text: "Facturation électronique", href: "/ressources/facturation-electronique" },
      { text: "Blog & Actualités", href: "/ressources/blog" },
      { text: "Cas clients", href: "/ressources/cas-clients" },
      { text: "Glossaire", href: "/ressources/glossaire" },
      { text: "Le métier de DAF", href: "/daf-externalise/metier" },
    ],
  },
  {
    title: "Le Cabinet",
    href: "/a-propos",
    children: [
      { text: "Notre équipe", href: "/a-propos#equipe" },
      { text: "Nos clients", href: "/clients" },
      { text: "Carrières", href: "/jobs" },
    ],
  },
  { title: "Contact", href: "/contact" },
];

const navigationLabels = {
  en: {
    titles: ["Fractional CFO", "Finance Services", "Part-time HR", "Resources", "The Firm", "Contact"],
    children: [[], ["Part-time CFO", "Interim CFO", "Management accounting", "Cash flow forecasting", "Accounting coordination", "Fundraising support", "M&A and due diligence"], [], ["Tools", "AI and Finance", "Electronic invoicing", "Blog and News", "Case studies", "Glossary", "The CFO role"], ["Our team", "Our clients", "Careers"], []],
    editorial: ["Finance glossary", "The CFO role", "Finance tools", "AI and Finance", "External HR leadership", "Our clients", "Careers"],
  },
  es: {
    titles: ["CFO externo", "Servicios financieros", "RR. HH. a tiempo parcial", "Recursos", "La firma", "Contacto"],
    children: [[], ["CFO a tiempo parcial", "CFO de transición", "Control de gestión externo", "Previsión de tesorería", "Coordinación contable", "Apoyo a la financiación", "M&A y due diligence"], [], ["Herramientas", "IA y Finanzas", "Facturación electrónica", "Blog y Noticias", "Casos de éxito", "Glosario", "Funciones del CFO"], ["Nuestro equipo", "Nuestros clientes", "Empleo"], []],
    editorial: ["Glosario financiero", "Funciones del CFO", "Herramientas financieras", "IA y Finanzas", "Dirección externa de RR. HH.", "Nuestros clientes", "Empleo"],
  },
};
function localizeNavigation(locale: "en" | "es"): NavItem[] {
  const t = navigationLabels[locale];
  return navFr.map((item, i) => ({ ...item, title: t.titles[i], href: parityHref(item.href, locale),
    ...(item.children ? { children: item.children.map((child, j) => ({ ...child, text: t.children[i][j], href: parityHref(child.href, locale) })) } : {}),
  }));
}
export const navigation: Record<Locale, NavItem[]> = { fr: navFr, en: localizeNavigation("en"), es: localizeNavigation("es") };

export const footerContent: Record<Locale, FooterContent> = {
  fr: {
    description:
      "Iter Advisors, avec des équipes à Barcelone et Paris et une intervention à distance ou sur accord à Toulouse, est un cabinet spécialisé dans les services de DAF externalisé, de conseil stratégique et d\u2019accompagnement en investissements, fusions-acquisitions.",
    copyright: "Copyright \u00A9 2025-2026 Iter Advisors. Tous droits réservés.",
    trustfolio: `Note de 5/5 sur ${TRUSTFOLIO_REVIEW_COUNT} avis sur notre profil`,
    legalLinks: [
      { text: "Mentions légales", href: "/mentions-legales" },
      { text: "Politique de confidentialité", href: "/politique-de-confidentialite" },
      { text: "Politique de cookies", href: "/politique-cookies" },
    ],
    // SEO-AUD-0824 §3 (2026-08-24) — « Nos clients » et « Carrières » ne
    // vivaient que dans le second niveau du menu, qui n'est rendu qu'après
    // ouverture côté client : aucun crawler ne les voyait. /clients et les
    // trois offres d'emploi étaient donc orphelines, alors qu'un visiteur les
    // atteignait en deux clics. Le pied de page, lui, est rendu au serveur.
    editorialLinks: [
      { text: "Glossaire financier", href: "/ressources/glossaire" },
      { text: "Fiche métier DAF", href: "/daf-externalise/metier" },
      { text: "Outils finance", href: "/ressources/outils" },
      // IA-FINANCE (2026-09-01) — le sous-menu est monté côté client ; le
      // pied de page est rendu au serveur sur chaque page.
      { text: "IA & Finance", href: "/ressources/ia-finance" },
      { text: "Facturation électronique", href: "/ressources/facturation-electronique" },
      // CONTENUS-T9 (2026-08-31) — /drh-externalise (P18, CPC 13,94 €) : sa
      // seule ancre depuis l'accueil vivait dans le menu déroulant, monté
      // côté client, invisible des crawlers. Le pied de page est rendu au
      // serveur sur chaque page.
      { text: "Direction RH externalisée", href: "/drh-externalise" },
      { text: "Nos clients", href: "/clients" },
      { text: "Carrières", href: "/jobs" },
    ],
    locations: [
      { city: "Barcelone", country: "Espagne", href: "/daf-externalise-barcelone" },
      { city: "Paris", country: "France", href: "/daf-externalise-paris" },
      { city: "Toulouse", country: "France", href: "/daf-externalise-toulouse" },
    ],
  },
  en: {
    description:
      "Iter Advisors, with teams in Barcelona and Paris, serving Toulouse remotely or on agreed visits, specializes in Fractional CFO services, strategic consulting and support for investments and mergers & acquisitions.",
    copyright: "Copyright \u00A9 2025-2026 Iter Advisors. All Rights Reserved.",
    trustfolio: `5/5 rating based on ${TRUSTFOLIO_REVIEW_COUNT} reviews on our profile`,
    legalLinks: [
      { text: "Terms of use", href: "/en/legal-notice" },
      { text: "Privacy policy", href: "/en/privacy-policy" },
      { text: "Cookie policy", href: "/en/cookie-policy" },
    ],
    editorialLinks: [
      { text: "Finance glossary", href: "/en/ressources/glossaire" },
      { text: "CFO role", href: "/en/fractional-cfo/role" },
      { text: "Finance tools", href: "/en/ressources/tools" },
      { text: "Outsourced HR direction", href: "/en/hr-outsourcing" },
      { text: "Our clients", href: "/en/clients" },
      { text: "Careers", href: "/en/jobs" },
      // SEO-AUD-0824 §10 — cette page était à quatre clics de l'accueil : le
      // cluster RH n'est atteignable qu'en passant par la bascule de langue
      // puis deux niveaux. Le pied de page la ramène à un clic.
      { text: "Fractional HR Director", href: "/en/hr-outsourcing/shared-time" },
    ],
    locations: [
      { city: "Barcelona", country: "Spain", href: "/en/fractional-cfo-barcelona" },
      { city: "Paris", country: "France", href: "/en/fractional-cfo-paris" },
      { city: "Toulouse", country: "France", href: "/en/fractional-cfo-toulouse" },
    ],
  },
  es: {
    description:
      "Iter Advisors, con equipos en Barcelona y París e intervención en Toulouse a distancia o mediante visitas acordadas, es una empresa especializada en servicios externos de CFO, consultoría estratégica y apoyo a inversiones, fusiones y adquisiciones.",
    copyright: "Copyright \u00A9 2025-2026 Iter Advisors. Todos los derechos reservados.",
    trustfolio: `Puntuación de 5/5 basada en ${TRUSTFOLIO_REVIEW_COUNT} opiniones en nuestro perfil`,
    legalLinks: [
      { text: "Información jurídica", href: "/es/aviso-legal" },
      { text: "Política de privacidad", href: "/es/politica-de-privacidad" },
      { text: "Política de cookies", href: "/es/politica-cookies" },
    ],
    editorialLinks: [
      { text: "Glosario financiero", href: "/es/recursos/glosario" },
      { text: "Funciones del CFO", href: "/es/externalizacion-daf/funciones" },
      { text: "Herramientas financieras", href: "/es/recursos/herramientas" },
      { text: "Dirección de RRHH externalizada", href: "/es/externalizacion-rrhh" },
      { text: "Nuestros clientes", href: "/es/clientes" },
      { text: "Empleo", href: "/es/jobs" },
      { text: "RRHH a tiempo compartido", href: "/es/externalizacion-rrhh/tiempo-compartido" },
    ],
    locations: [
      { city: "Barcelona", country: "España", href: "/es/cfo-externalizado-barcelona" },
      { city: "Paris", country: "Francia", href: "/es/cfo-externalizado-paris" },
      { city: "Toulouse", country: "Francia", href: "/es/cfo-externalizado-toulouse" },
    ],
  },
};

for (const locale of ["en", "es"] as const) {
  footerContent[locale].editorialLinks = footerContent.fr.editorialLinks.map((link, i) => ({ text: navigationLabels[locale].editorial[i], href: parityHref(link.href, locale) }));
}

export const languageSwitcher: Record<Locale, { label: string; flag: string }> = {
  fr: { label: "Français", flag: "fr" },
  en: { label: "English", flag: "gb" },
  es: { label: "Español", flag: "es" },
};

export function getContactPath(locale: Locale): string {
  if (locale === "fr") return "/contact";
  return `/${locale}/contact`;
}

// 2026-05-30: Sébastien is on paternity leave, so the "book a meeting"
// CTAs across the site now route to /contact (the contact form) instead of
// his Google Calendar appointment scheduler. Centralised here so every
// caller picks up the change automatically. The original URL is preserved
// below in comment form so we can restore it when leave ends:
// "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2DVmtdvwnZykAPoQC9_BNTFB_wHl1IrNagCAX0AaSbmEs8JmSGsTdWo96WGPzMEYtf_nkILQN8"
export const BOOKING_URL = "/contact";

export function getBookingUrl(): string {
  return BOOKING_URL;
}

export function getHomePath(locale: Locale): string {
  if (locale === "fr") return "/";
  return `/${locale}`;
}
