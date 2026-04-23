import { Locale } from "../i18n";

export type CookieCategory = "necessary" | "analytics" | "marketing";

export interface CookieEntry {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  type: "cookie" | "localStorage" | "pixel";
}

export interface CookieCategoryContent {
  category: CookieCategory;
  title: string;
  description: string;
  cookies: CookieEntry[];
}

export interface CookiePolicyContent {
  meta: { title: string; description: string };
  h1: string;
  intro: string;
  lastUpdated: string;
  sections: CookieCategoryContent[];
  outro: string;
  managePrefsLabel: string;
}

const LAST_UPDATED_FR = "23 avril 2026";
const LAST_UPDATED_EN = "April 23, 2026";
const LAST_UPDATED_ES = "23 de abril de 2026";

// ---------------------------------------------------------------------------
// Cookies list (shared structure, translated descriptions)
// ---------------------------------------------------------------------------

interface CookieEntryL10n {
  name: string;
  provider: string;
  duration: string;
  type: "cookie" | "localStorage" | "pixel";
  purposeFr: string;
  purposeEn: string;
  purposeEs: string;
}

const COOKIES: Record<CookieCategory, CookieEntryL10n[]> = {
  necessary: [
    {
      name: "iter_cookie_consent",
      provider: "Iter Advisors (1st party)",
      duration: "180 jours / 180 days / 180 días",
      type: "localStorage",
      purposeFr: "Mémorise vos choix de consentement aux cookies.",
      purposeEn: "Stores your cookie consent choices.",
      purposeEs: "Almacena sus preferencias de consentimiento de cookies.",
    },
    {
      name: "iter_cookie_consent_date",
      provider: "Iter Advisors (1st party)",
      duration: "180 jours / 180 days / 180 días",
      type: "localStorage",
      purposeFr: "Date du dernier consentement (pour l'expiration).",
      purposeEn: "Date of last consent (for expiry management).",
      purposeEs: "Fecha del último consentimiento (gestión de expiración).",
    },
  ],
  analytics: [
    {
      name: "_ga, _ga_*",
      provider: "Google Analytics 4 (Google LLC, US)",
      duration: "13 mois / 13 months / 13 meses",
      type: "cookie",
      purposeFr:
        "Distingue les utilisateurs pour mesurer l'audience (visites, pages vues, durée de session, provenance).",
      purposeEn:
        "Distinguishes users to measure traffic (visits, pageviews, session duration, source).",
      purposeEs:
        "Distingue usuarios para medir audiencia (visitas, páginas, duración de sesión, origen).",
    },
    {
      name: "_gid",
      provider: "Google Analytics (Google LLC, US)",
      duration: "24 h",
      type: "cookie",
      purposeFr: "Distingue les utilisateurs sur 24 h (si GA Universal encore actif).",
      purposeEn: "Distinguishes users over 24h (if GA Universal is still active).",
      purposeEs: "Distingue usuarios durante 24h (si GA Universal sigue activo).",
    },
  ],
  marketing: [
    {
      name: "_gcl_au",
      provider: "Google Ads (Google LLC, US)",
      duration: "90 jours / 90 days / 90 días",
      type: "cookie",
      purposeFr:
        "Conversion linker : relie les clics sur nos annonces à des conversions sur le site.",
      purposeEn:
        "Conversion linker: attributes ad clicks to on-site conversions.",
      purposeEs:
        "Vinculador de conversiones: atribuye clics en anuncios a conversiones en el sitio.",
    },
    {
      name: "IDE, DSID",
      provider: "Google Marketing Platform (Google LLC, US)",
      duration: "13 mois / 13 months / 13 meses",
      type: "cookie",
      purposeFr: "Reciblage publicitaire sur le réseau Google Display.",
      purposeEn: "Ad retargeting on the Google Display Network.",
      purposeEs: "Retargeting publicitario en la Red de Display de Google.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

function buildCategories(locale: Locale): CookieCategoryContent[] {
  const catMeta = {
    necessary: {
      fr: {
        title: "Cookies nécessaires",
        description:
          "Ces cookies sont indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés. Aucune donnée de ces cookies n'est transmise à des tiers.",
      },
      en: {
        title: "Necessary cookies",
        description:
          "These cookies are essential for the website to function. They cannot be disabled. No data from these cookies is shared with third parties.",
      },
      es: {
        title: "Cookies necesarias",
        description:
          "Estas cookies son esenciales para el funcionamiento del sitio. No se pueden desactivar. Ningún dato de estas cookies se comparte con terceros.",
      },
    },
    analytics: {
      fr: {
        title: "Cookies analytiques",
        description:
          "Ces cookies nous permettent de mesurer l'audience du site via Google Analytics 4 afin d'améliorer nos services. Ils ne sont déposés qu'après votre consentement explicite. Les données sont traitées par Google LLC (États-Unis) sur la base des Clauses Contractuelles Types de la Commission Européenne.",
      },
      en: {
        title: "Analytics cookies",
        description:
          "These cookies help us measure site traffic via Google Analytics 4 to improve our services. They are only set after your explicit consent. Data is processed by Google LLC (United States) under the European Commission's Standard Contractual Clauses.",
      },
      es: {
        title: "Cookies analíticas",
        description:
          "Estas cookies nos ayudan a medir el tráfico del sitio a través de Google Analytics 4 para mejorar nuestros servicios. Solo se instalan tras su consentimiento explícito. Los datos son procesados por Google LLC (EE.UU.) bajo las Cláusulas Contractuales Tipo de la Comisión Europea.",
      },
    },
    marketing: {
      fr: {
        title: "Cookies marketing",
        description:
          "Ces cookies servent à mesurer l'efficacité de nos campagnes publicitaires Google Ads et à vous montrer des annonces pertinentes. Ils ne sont déposés qu'après votre consentement explicite.",
      },
      en: {
        title: "Marketing cookies",
        description:
          "These cookies measure the effectiveness of our Google Ads campaigns and show you relevant ads. They are only set after your explicit consent.",
      },
      es: {
        title: "Cookies de marketing",
        description:
          "Estas cookies miden la eficacia de nuestras campañas de Google Ads y le muestran anuncios relevantes. Solo se instalan tras su consentimiento explícito.",
      },
    },
  };

  const purposeFor = (e: CookieEntryL10n): string =>
    locale === "fr" ? e.purposeFr : locale === "en" ? e.purposeEn : e.purposeEs;

  return (["necessary", "analytics", "marketing"] as CookieCategory[]).map(
    (cat) => ({
      category: cat,
      title: catMeta[cat][locale].title,
      description: catMeta[cat][locale].description,
      cookies: COOKIES[cat].map((e) => ({
        name: e.name,
        provider: e.provider,
        purpose: purposeFor(e),
        duration: e.duration,
        type: e.type,
      })),
    }),
  );
}

const contentFr: CookiePolicyContent = {
  meta: {
    title: "Politique de cookies | Iter Advisors",
    description:
      "Liste détaillée des cookies et traceurs utilisés par iteradvisors.com, leur finalité, leur durée et les fournisseurs concernés.",
  },
  h1: "Politique de cookies",
  intro:
    "Cette page liste de manière exhaustive les cookies et traceurs susceptibles d'être déposés sur votre terminal lors de votre navigation sur iteradvisors.com. Conformément au RGPD et à la directive ePrivacy, aucun cookie analytique ou marketing n'est déposé avant que vous ayez donné votre consentement explicite via notre bandeau de gestion des cookies.",
  lastUpdated: `Dernière mise à jour : ${LAST_UPDATED_FR}`,
  sections: buildCategories("fr"),
  outro:
    "Vous pouvez à tout moment modifier ou retirer votre consentement en cliquant sur le bouton « Gérer les cookies » en bas à gauche de chaque page. Votre choix est conservé pendant 180 jours au maximum, après quoi le bandeau réapparaît pour vous permettre de renouveler ou modifier votre consentement.\n\nPour toute question concernant le traitement de vos données personnelles, contactez-nous à contact@iteradvisors.com.",
  managePrefsLabel: "Gérer mes préférences",
};

const contentEn: CookiePolicyContent = {
  meta: {
    title: "Cookie Policy | Iter Advisors",
    description:
      "Detailed list of cookies and trackers used by iteradvisors.com, their purpose, duration and providers.",
  },
  h1: "Cookie Policy",
  intro:
    "This page comprehensively lists the cookies and trackers that may be set on your device when you browse iteradvisors.com. In accordance with GDPR and the ePrivacy directive, no analytics or marketing cookie is placed before you have given your explicit consent through our cookie banner.",
  lastUpdated: `Last updated: ${LAST_UPDATED_EN}`,
  sections: buildCategories("en"),
  outro:
    'You may modify or withdraw your consent at any time by clicking the "Manage cookies" button at the bottom left of each page. Your choice is stored for up to 180 days, after which the banner reappears to allow you to renew or update your consent.\n\nFor any question regarding the processing of your personal data, please contact us at contact@iteradvisors.com.',
  managePrefsLabel: "Manage my preferences",
};

const contentEs: CookiePolicyContent = {
  meta: {
    title: "Política de cookies | Iter Advisors",
    description:
      "Lista detallada de las cookies y trazadores utilizados por iteradvisors.com, su finalidad, duración y proveedores.",
  },
  h1: "Política de cookies",
  intro:
    "Esta página enumera de manera exhaustiva las cookies y trazadores que pueden instalarse en su dispositivo al navegar por iteradvisors.com. De conformidad con el RGPD y la directiva ePrivacy, no se instala ninguna cookie analítica o de marketing antes de que usted haya dado su consentimiento explícito a través de nuestro banner de cookies.",
  lastUpdated: `Última actualización: ${LAST_UPDATED_ES}`,
  sections: buildCategories("es"),
  outro:
    'Puede modificar o retirar su consentimiento en cualquier momento haciendo clic en el botón "Gestionar cookies" en la parte inferior izquierda de cada página. Su elección se conserva durante un máximo de 180 días, tras lo cual el banner reaparece para permitirle renovar o actualizar su consentimiento.\n\nPara cualquier pregunta sobre el tratamiento de sus datos personales, contáctenos en contact@iteradvisors.com.',
  managePrefsLabel: "Gestionar mis preferencias",
};

export function getCookiePolicyContent(locale: Locale): CookiePolicyContent {
  if (locale === "en") return contentEn;
  if (locale === "es") return contentEs;
  return contentFr;
}
