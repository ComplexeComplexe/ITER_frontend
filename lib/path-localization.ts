/**
 * Path localization for the language switcher.
 * Maps the current path to the equivalent path in the target locale.
 */

import { Locale } from "./i18n";
import { getCanonicalServiceSlug, SERVICE_URL_SLUG_BY_LOCALE, type ServicePageSlug } from "./fallback-service-pages";

// ─── Path segment mappings (canonical key → path per locale) ────────────────

const DAF_BASE: Record<Locale, string> = {
  fr: "daf-externalise",
  en: "fractional-cfo",
  es: "externalizacion-daf",
};

/**
 * Alternate EN slugs still recognized as "DAF base" so the language switcher
 * can map legacy `/en/daf-outsourcing/*` URLs back to FR / ES correctly.
 * The canonical EN slug is now `fractional-cfo` (HARMO-01).
 */
const DAF_BASE_ALIASES_EN = new Set(["daf-outsourcing", "fractional-cfo"]);

const DAF_SUB_PATHS: Record<string, Record<Locale, string>> = {
  // ES path renamed multipropiedad → tiempo-compartido (audit V2 R-4):
  // "multipropiedad" means real-estate timeshare in Spanish, mistranslation.
  "temps-partage": { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
  "shared-time": { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
  "tiempo-compartido": { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
  // Legacy ES slug kept for backwards path-localization until 301s expire:
  multipropiedad: { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
  // SEO-ULT §4 (2026-08-15) — deux entrées étaient fausses : la page ES de
  // transition est `transicion`, et la fiche métier est `role` en anglais,
  // `funciones` en espagnol. Le mapping renvoyait les slugs français, qui
  // répondent en 308.
  transition: { fr: "transition", en: "transition", es: "transicion" },
  transicion: { fr: "transition", en: "transition", es: "transicion" },
  metier: { fr: "metier", en: "role", es: "funciones" },
  role: { fr: "metier", en: "role", es: "funciones" },
  funciones: { fr: "metier", en: "role", es: "funciones" },
};

/**
 * URL finale d'une page du cluster DAF, par locale.
 *
 * SEO-ULT §4 (2026-08-15) — trois composants construisaient ces liens à la
 * main, en préfixant le slug français par la locale : `/en/daf-externalise/
 * metier`, `/es/daf-externalise/tarifs`… Aucune de ces URL n'existe, elles
 * répondent toutes en 308. Sur les sous-pages EN et ES, cela représentait 162
 * liens vers des redirections — invisibles pour un audit qui lit le code,
 * puisque les URL n'y figurent jamais en entier.
 *
 * `tarifs` et `secteurs` n'ont pas d'équivalent traduit : on renvoie vers la
 * page de base de la locale plutôt que vers une URL française, pour ne pas
 * sortir le lecteur de sa langue au milieu du cluster.
 */
export function dafClusterHref(
  sub: "" | "temps-partage" | "transition" | "metier" | "tarifs" | "secteurs",
  locale: Locale,
): string {
  const base = locale === "fr" ? "/daf-externalise" : `/${locale}/${DAF_BASE[locale]}`;
  if (!sub) return base;
  if (locale === "fr") return `${base}/${sub}`;
  if (sub === "tarifs" || sub === "secteurs") return base;
  return `${base}/${DAF_SUB_PATHS[sub][locale]}`;
}

const DRH_BASE: Record<Locale, string> = {
  fr: "drh-externalise",
  en: "hr-outsourcing",
  es: "externalizacion-rrhh",
};

const DRH_SUB_PATHS: Record<string, Record<Locale, string>> = {
  "temps-partage": { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
  "shared-time": { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
  "tiempo-compartido": { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
};

// SEO-ULT §4b (2026-08-15) — `en` valait "a-propos" alors que la route EN est
// /en/about : /en/a-propos et /en/a-propos/<slug> répondent tous deux en 308.
// Le dossier app/(en)/en/a-propos existe encore mais il est mort — la
// redirection s'applique avant le routage, il n'est jamais atteint.
const ABOUT_PATH: Record<Locale, string> = {
  fr: "a-propos",
  en: "about",
  es: "quienes-somos",
};

/** URL de la page équipe, ou de la fiche d'un membre, dans la locale donnée. */
export function aboutHref(locale: Locale, slug?: string): string {
  const prefix = locale === "fr" ? "" : `/${locale}`;
  const base = `${prefix}/${ABOUT_PATH[locale]}`;
  return slug ? `${base}/${slug}` : base;
}

const LEGAL_NOTICE_PATH: Record<Locale, string> = {
  fr: "mentions-legales",
  en: "legal-notice",
  es: "aviso-legal",
};

const PRIVACY_PATH: Record<Locale, string> = {
  fr: "politique-de-confidentialite",
  en: "privacy-policy",
  es: "politica-de-privacidad",
};

const COOKIE_PATH: Record<Locale, string> = {
  fr: "politique-cookies",
  en: "cookie-policy",
  es: "politica-cookies",
};

const PROFILE_PATH: Record<Locale, string> = {
  fr: "profil",
  en: "profile",
  es: "perfil",
};

const QUALIFICATION_PATH: Record<Locale, string> = {
  fr: "qualification",
  en: "assessment",
  es: "calificacion",
};

const CAMPAIGN_PATH: Record<Locale, string> = {
  fr: "campagne",
  en: "campaign",
  es: "campana",
};

// City landing pages: daf-externalise-{city} ↔ outsourced-cfo-{city} ↔ cfo-externalizado-{city}
const CITY_PAGES: Record<string, Record<Locale, string>> = {
  barcelone: {
    fr: "daf-externalise-barcelone",
    en: "outsourced-cfo-barcelona",
    es: "cfo-externalizado-barcelona",
  },
  paris: {
    fr: "daf-externalise-paris",
    en: "outsourced-cfo-paris",
    es: "cfo-externalizado-paris",
  },
  toulouse: {
    fr: "daf-externalise-toulouse",
    en: "outsourced-cfo-toulouse",
    es: "cfo-externalizado-toulouse",
  },
};

const CITY_PAGE_LOOKUP = new Map<string, string>();
for (const [key, paths] of Object.entries(CITY_PAGES)) {
  for (const v of Object.values(paths)) CITY_PAGE_LOOKUP.set(v, key);
}

// Resources sub-paths that vary by locale (excluding blog/glossaire which have [slug] handling)
const RESOURCES_TOOLS: Record<Locale, string> = {
  fr: "outils",
  en: "tools",
  es: "herramientas",
};
const RESOURCES_TOOLS_ALIASES = new Set(["outils", "tools", "herramientas"]);

/**
 * Racine de la section ressources, par locale.
 *
 * SEO-ULT §4b (2026-08-15) — l'espagnol dit `recursos`, pas `ressources` : le
 * middleware redirige `/es/ressources/*` vers `/es/recursos/*`. Tout le code
 * qui composait `/${locale}/ressources/...` produisait donc une 308 en ES —
 * y compris les cartes d'articles liés et la liste des articles d'un auteur,
 * assemblées à l'exécution et invisibles pour un audit qui lit le code.
 */
const RESOURCES_BASE: Record<Locale, string> = {
  fr: "ressources",
  en: "ressources",
  es: "recursos",
};

const GLOSSARY_PATH: Record<Locale, string> = {
  fr: "glossaire",
  en: "glossaire",
  es: "glosario",
};

const CASE_STUDIES_PATH: Record<Locale, string> = {
  fr: "cas-clients",
  en: "cas-clients",
  es: "casos-de-exito",
};

/** Racine de la section ressources, ou l'une de ses sous-sections déjà localisée. */
export function resourcesHref(locale: Locale, sub?: string): string {
  const prefix = locale === "fr" ? "" : `/${locale}`;
  const base = `${prefix}/${RESOURCES_BASE[locale]}`;
  return sub ? `${base}/${sub}` : base;
}

/** URL d'un article de blog dans la locale donnée. */
export function blogHref(locale: Locale, slug?: string): string {
  return resourcesHref(locale, slug ? `blog/${slug}` : "blog");
}

/**
 * Articles dont l'URL localisée ne sert pas l'article.
 *
 * SEO-ULT §4b (2026-08-15) — les listings EN et ES proposaient des articles
 * dont l'URL part en redirection. Trois situations distinctes, longtemps
 * confondues :
 *
 * 1. Doublon de slug. `blogPosts.en` contient à la fois
 *    `cout-daf-externalise-tarifs-prix-2026` (l'ancien slug français) et
 *    `fractional-cfo-cost-services-2026` (sa traduction). Les deux étaient
 *    listés ; le premier redirige vers le second. On ne garde que le second.
 * 2. Traduction écrite mais retirée de la circulation par une redirection
 *    vers la version française. Le lecteur arrive de toute façon sur l'article
 *    FR : autant l'y envoyer directement, sans le détour.
 * 3. Article dépublié dans cette locale — sa redirection renvoie au listing.
 *    Une carte qui ramène à la page où l'on se trouve n'a rien à y faire.
 *
 * `null` signifie « pas d'URL propre dans cette locale » : le lien n'est pas
 * réparable, la carte doit disparaître. Une chaîne donne l'URL qui sert
 * réellement l'article.
 *
 * Le contenu n'est pas supprimé et aucune redirection n'est levée : cette
 * table décrit l'état, elle ne le décide pas. Le jour où ces traductions
 * seront remises en ligne, c'est ici qu'on le verra.
 */
const BLOG_ARTICLE_OVERRIDES: Record<Locale, Record<string, string | null>> = {
  // Le français a le même défaut, pour une autre raison : `blogPosts.fr`
  // conserve des entrées d'articles fusionnés ou déplacés vers la section
  // fiscalité. `app/sitemap.ts` avait déjà retiré quatre de ces slugs, en
  // notant qu'ils « 308 vers un canonique déjà présent dans cette liste » —
  // mais le listing et les fiches auteur continuaient de les proposer.
  fr: {
    "ia-et-automatisation-des-taches-repetitives-du-departement-finance": null,
    "cout-daf-externalise-2026-tarifs-par-mission": null,
    "data-room-checklist-levee-de-fonds": null,
    "due-diligence-financiere-investisseurs": null,
    "externaliser-comptabilite-guide": null,
    // Le sujet a déjà sa carte sous `impot-revenu-espagne`.
    "bareme-irpf-espagne-2026": null,
    // Ces trois-là ont quitté le blog pour la section fiscalité : la carte
    // reste, elle pointe vers leur nouvelle adresse.
    "impot-revenu-espagne": "/ressources/fiscalite/impot-revenu-espagne",
    "modelo-720-declaration-biens-etranger": "/ressources/fiscalite/modelo-720",
    "double-imposition-france-espagne-convention":
      "/ressources/fiscalite/double-imposition-france-espagne",
    // Article complet, mais listé comme orphelin dans middleware.ts : il
    // répond 301 vers la liste des articles. Le retirer de la circulation
    // coupe les 13 liens qui y menaient. Voir la note de la PR : le remettre
    // en ligne suppose d'aligner d'abord ses tarifs sur lib/content/facts.ts.
    "daf-externalise-startup": null,
    // SEO-AUD-0824 §2 — articles qui n'existent pas en français. Sans cette
    // mention, leurs versions EN/ES déclaraient une traduction française vers
    // une URL qui redirige vers la liste des articles.
    "que-es-fractional-cfo": null,
    "cfo-externo-pymes-precio-2026": null,
    "fractional-cfo-cost-services-2026": null,
  },
  en: {
    "cout-daf-externalise-tarifs-prix-2026": null,
    // Articles espagnols, sans version anglaise.
    "que-es-fractional-cfo": null,
    "cfo-externo-pymes-precio-2026": null,
    "organiser-sa-direction-financiere": null,
    "ia-et-automatisation-des-taches-repetitives-du-departement-finance": null,
    "essentiels-outils-tech-finance": "/ressources/blog/essentiels-outils-tech-finance",
    "la-modernisation-du-role-de-cfo": "/ressources/blog/la-modernisation-du-role-de-cfo",
    "les-10-outils-pour-cfos-startup": "/ressources/blog/les-10-outils-pour-cfos-startup",
  },
  es: {
    "cout-daf-externalise-tarifs-prix-2026": null,
    // Article anglais, sans version espagnole.
    "fractional-cfo-cost-services-2026": null,
    // Aucune redirection ne couvre `/es/recursos/blog/…` pour cet article :
    // l'URL répond 404. C'était le seul lien cassé du site.
    "les-10-outils-pour-cfos-startup": null,
    "essentiels-outils-tech-finance": "/ressources/blog/essentiels-outils-tech-finance",
    "la-modernisation-du-role-de-cfo": "/ressources/blog/la-modernisation-du-role-de-cfo",
    "organiser-sa-direction-financiere": "/ressources/blog/organiser-sa-direction-financiere",
  },
};

/**
 * URL qui sert réellement un article dans la locale donnée, ou `null` si
 * l'article n'y est pas publié — auquel cas l'appelant doit le retirer de sa
 * liste plutôt que d'émettre un lien.
 */
export function resolveBlogArticleHref(locale: Locale, slug: string): string | null {
  const override = BLOG_ARTICLE_OVERRIDES[locale];
  if (slug in override) return override[slug];
  return blogHref(locale, slug);
}

/** URL du glossaire, ou d'une de ses entrées. */
export function glossaryHref(locale: Locale, slug?: string): string {
  return resourcesHref(locale, slug ? `${GLOSSARY_PATH[locale]}/${slug}` : GLOSSARY_PATH[locale]);
}

/** URL de la page cas clients. */
export function caseStudiesHref(locale: Locale, slug?: string): string {
  return resourcesHref(locale, slug ? `${CASE_STUDIES_PATH[locale]}/${slug}` : CASE_STUDIES_PATH[locale]);
}

/** URL du hub outils, ou d'une de ses fiches / catégories. */
export function toolsHref(locale: Locale, sub?: string): string {
  return resourcesHref(locale, sub ? `${RESOURCES_TOOLS[locale]}/${sub}` : RESOURCES_TOOLS[locale]);
}

/**
 * URL d'une page service, à partir de son slug canonique (celui du FR).
 *
 * SEO-ULT §4b — les pages villes EN et ES construisaient
 * `/${locale}/services/fund-raising-support` : le slug anglais était servi aux
 * deux locales, et l'espagnol partait donc systématiquement en 308.
 */
export function serviceHref(canonical: ServicePageSlug, locale: Locale): string {
  const prefix = locale === "fr" ? "" : `/${locale}`;
  return `${prefix}/services/${SERVICE_URL_SLUG_BY_LOCALE[locale][canonical]}`;
}

/** URL d'une page du cluster DRH, par locale. */
export function drhClusterHref(sub: "" | "temps-partage", locale: Locale): string {
  const prefix = locale === "fr" ? "" : `/${locale}`;
  const base = `${prefix}/${DRH_BASE[locale]}`;
  return sub ? `${base}/${DRH_SUB_PATHS[sub][locale]}` : base;
}

function getPathWithoutLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "en" || segments[0] === "es") {
    return { locale: segments[0] as Locale, path: "/" + segments.slice(1).join("/") };
  }
  return { locale: "fr", path: pathname || "/" };
}

/**
 * Returns the equivalent path in the target locale when switching languages.
 * Falls back to home if the route cannot be mapped.
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const { locale: currentLocale, path } = getPathWithoutLocale(pathname);
  if (currentLocale === targetLocale) {
    return pathname;
  }

  const prefix = targetLocale === "fr" ? "" : `/${targetLocale}`;

  // Home
  if (path === "/" || path === "") {
    return prefix || "/";
  }

  const segs = path.split("/").filter(Boolean);

  // Contact, Jobs, Clients, Diagnostic (same slug across locales)
  if (segs[0] === "contact" && segs.length === 1) return `${prefix}/contact`;
  if (segs[0] === "jobs") return `${prefix}/${segs.join("/")}`;
  if (segs[0] === "clients" && segs.length === 1) return `${prefix}/clients`;
  if (segs[0] === "diagnostic" && segs.length === 1) return `${prefix}/diagnostic`;

  // About — la fiche d'un membre partage son slug entre les trois locales,
  // seule la racine change (a-propos / about / quienes-somos).
  if (segs[0] === "a-propos" || segs[0] === "about" || segs[0] === "quienes-somos") {
    return aboutHref(targetLocale, segs.length > 1 ? segs.slice(1).join("/") : undefined);
  }

  // Legal
  if (segs[0] === "mentions-legales" && segs.length === 1) return `${prefix}/${LEGAL_NOTICE_PATH[targetLocale]}`;
  if (segs[0] === "legal-notice" && segs.length === 1) return `${prefix}/${LEGAL_NOTICE_PATH[targetLocale]}`;
  if (segs[0] === "aviso-legal" && segs.length === 1) return `${prefix}/${LEGAL_NOTICE_PATH[targetLocale]}`;
  if (segs[0] === "politique-de-confidentialite" && segs.length === 1)
    return `${prefix}/${PRIVACY_PATH[targetLocale]}`;
  if (segs[0] === "privacy-policy" && segs.length === 1) return `${prefix}/${PRIVACY_PATH[targetLocale]}`;
  if (segs[0] === "politica-de-privacidad" && segs.length === 1)
    return `${prefix}/${PRIVACY_PATH[targetLocale]}`;

  // Cookies
  if (
    segs.length === 1 &&
    (segs[0] === "politique-cookies" || segs[0] === "cookie-policy" || segs[0] === "politica-cookies")
  ) {
    return `${prefix}/${COOKIE_PATH[targetLocale]}`;
  }

  // Profile / Qualification / Campaign (single-page locale variants)
  if (segs.length === 1 && (segs[0] === "profil" || segs[0] === "profile" || segs[0] === "perfil")) {
    return `${prefix}/${PROFILE_PATH[targetLocale]}`;
  }
  if (
    segs.length === 1 &&
    (segs[0] === "qualification" || segs[0] === "assessment" || segs[0] === "calificacion")
  ) {
    return `${prefix}/${QUALIFICATION_PATH[targetLocale]}`;
  }
  if (segs.length === 1 && (segs[0] === "campagne" || segs[0] === "campaign" || segs[0] === "campana")) {
    return `${prefix}/${CAMPAIGN_PATH[targetLocale]}`;
  }

  // City landing pages: daf-externalise-{city} ↔ outsourced-cfo-{city} ↔ cfo-externalizado-{city}
  if (segs.length === 1) {
    const cityKey = CITY_PAGE_LOOKUP.get(segs[0]);
    if (cityKey) return `${prefix}/${CITY_PAGES[cityKey][targetLocale]}`;
  }

  // DAF — accept the EN `fractional-cfo` alias as well, since users may land
  // on the canonical /en/fractional-cfo URL.
  const dafBases = [...Object.values(DAF_BASE), ...DAF_BASE_ALIASES_EN];
  if (dafBases.includes(segs[0]) && segs.length >= 1) {
    const base = `${prefix}/${DAF_BASE[targetLocale]}`;
    if (segs.length === 1) return base;
    const sub = segs[1];
    const subMap = DAF_SUB_PATHS[sub];
    if (subMap) return `${base}/${subMap[targetLocale]}`;
    return `${base}/${sub}`;
  }

  // DRH
  const drhBases = Object.values(DRH_BASE);
  if (drhBases.includes(segs[0]) && segs.length >= 1) {
    const base = `${prefix}/${DRH_BASE[targetLocale]}`;
    if (segs.length === 1) return base;
    const sub = segs[1];
    const subMap = DRH_SUB_PATHS[sub];
    if (subMap) return `${base}/${subMap[targetLocale]}`;
    return `${base}/${sub}`;
  }

  // Services
  if (segs[0] === "services") {
    if (segs.length === 1) return `${prefix}/services`;
    const urlSlug = segs[1];
    const canonical = getCanonicalServiceSlug(currentLocale, urlSlug);
    if (canonical) {
      const targetSlug = SERVICE_URL_SLUG_BY_LOCALE[targetLocale][canonical as ServicePageSlug];
      return `${prefix}/services/${targetSlug}`;
    }
    return `${prefix}/services/${urlSlug}`;
  }

  // Resources (ressources) — structure: /ressources, /ressources/blog, /ressources/blog/[slug], etc.
  // Also handle /recursos (ES canonical) since middleware redirects /es/ressources/* → /es/recursos/*.
  if (segs[0] === "ressources" || segs[0] === "recursos") {
    if (segs.length === 1) return resourcesHref(targetLocale);

    // Tools hub: outils ↔ tools ↔ herramientas (+ sub-categories share the same slugs)
    if (RESOURCES_TOOLS_ALIASES.has(segs[1])) {
      return toolsHref(targetLocale, segs.length > 2 ? segs.slice(2).join("/") : undefined);
    }

    if (segs[1] === "cas-clients" || segs[1] === "case-studies" || segs[1] === "casos-de-exito") {
      // Canonical is cas-clients in FR/EN, casos-de-exito in ES.
      return caseStudiesHref(targetLocale, segs.length > 2 ? segs.slice(2).join("/") : undefined);
    }
    if (segs[1] === "testimonials") return resourcesHref(targetLocale, "testimonials");
    if (segs[1] === "blog") {
      return blogHref(targetLocale, segs.length > 2 ? segs.slice(2).join("/") : undefined);
    }
    // SEO-ULT §4b (2026-08-15) — les fiches métier ont été absorbées par le
    // cluster DAF : /ressources/fiche-metier et /ressources/fiche-metier/<slug>
    // redirigent tous deux vers la page métier de leur locale. Le sélecteur de
    // langue les y envoie directement plutôt que de passer par une 308.
    if (segs[1] === "fiche-metier" || segs[1] === "job-descriptions") {
      return dafClusterHref("metier", targetLocale);
    }
    // Glossary: glossaire (FR/EN canonical) / glosario (ES) / glossary-en (EN legacy)
    if (
      segs[1] === "glossaire" ||
      segs[1] === "glosario" ||
      segs[1] === "glossary-en" ||
      segs[1] === "glossary"
    ) {
      return glossaryHref(targetLocale, segs.length > 2 ? segs.slice(2).join("/") : undefined);
    }
    // Unknown sub-path under the resources hub: preserve segments under the
    // target locale's own resources base.
    return resourcesHref(targetLocale, segs.slice(1).join("/"));
  }

  // Fallback: preserve the path under the target locale prefix. Most unmapped
  // routes share their slug across locales (or have middleware/next.config
  // redirects that resolve mismatches), so this is safer than dropping the
  // user on the locale home page.
  return `${prefix}/${segs.join("/")}`;
}
