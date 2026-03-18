import type { MetadataRoute } from "next";
import { SERVICE_URL_SLUG_BY_LOCALE, SERVICE_PAGE_SLUGS } from "@/lib/strapi";

const BASE = "https://www.iteradvisors.com";

/**
 * Static pages mapped by locale.
 * Key = FR path, values = { en, es } equivalents.
 */
const staticPages: { fr: string; en: string; es: string }[] = [
  { fr: "/", en: "/en", es: "/es" },
  { fr: "/daf-externalise", en: "/en/daf-outsourcing", es: "/es/externalizacion-daf" },
  { fr: "/daf-externalise/metier", en: "/en/daf-outsourcing/metier", es: "/es/externalizacion-daf/metier" },
  { fr: "/daf-externalise/temps-partage", en: "/en/daf-outsourcing/shared-time", es: "/es/externalizacion-daf/multipropiedad" },
  { fr: "/daf-externalise/transition", en: "/en/daf-outsourcing/transition", es: "/es/externalizacion-daf/transition" },
  { fr: "/drh-externalise", en: "/en/hr-outsourcing", es: "/es/externalizacion-rrhh" },
  { fr: "/drh-externalise/temps-partage", en: "/en/hr-outsourcing/shared-time", es: "/es/externalizacion-rrhh/tiempo-compartido" },
  { fr: "/services", en: "/en/services", es: "/es/services" },
  { fr: "/ressources", en: "/en/ressources", es: "/es/ressources" },
  { fr: "/ressources/blog", en: "/en/ressources/blog", es: "/es/ressources/blog" },
  { fr: "/ressources/fiche-metier", en: "/en/ressources/fiche-metier", es: "/es/ressources/fiche-metier" },
  { fr: "/ressources/glossaire", en: "/en/ressources/glossaire", es: "/es/ressources/glossaire" },
  { fr: "/ressources/testimonials", en: "/en/ressources/testimonials", es: "/es/ressources/testimonials" },
  { fr: "/a-propos", en: "/en/a-propos", es: "/es/quienes-somos" },
  { fr: "/contact", en: "/en/contact", es: "/es/contact" },
  { fr: "/jobs", en: "/en/jobs", es: "/es/jobs" },
  { fr: "/mentions-legales", en: "/en/legal-notice", es: "/es/aviso-legal" },
  { fr: "/politique-de-confidentialite", en: "/en/privacy-policy", es: "/es/politica-de-privacidad" },
];

/** Known blog article slugs (static fallback). */
const blogSlugs = [
  "flux-de-tresorerie",
  "la-modernisation-du-role-de-cfo",
  "les-10-outils-pour-les-cfos-en-start-up",
  "essentiels-outils-tech-finance",
  "ia-et-automatisation-des-taches-repetitives-du-departement-finance",
  "organiser-sa-direction-financiere",
  "levee-de-fonds-dilutif-vs-non-dilutif",
  "consequences-financieres-cyberattaques",
  "regimes-fiscaux-france-vs-espagne",
  "ia-act-opportunite-fintechs",
  "anticiper-financierement-ses-recrutements-guide-pratique",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = [];

  // ── Static pages ──
  for (const page of staticPages) {
    entries.push({
      url: `${BASE}${page.fr}`,
      lastModified: now,
      changeFrequency: page.fr === "/" ? "weekly" : "monthly",
      priority: page.fr === "/" ? 1.0 : page.fr.includes("daf-externalise") || page.fr.includes("drh-externalise") ? 0.9 : 0.7,
      alternates: {
        languages: {
          fr: `${BASE}${page.fr}`,
          en: `${BASE}${page.en}`,
          es: `${BASE}${page.es}`,
          "x-default": `${BASE}${page.fr}`,
        },
      },
    });
  }

  // ── Service pages ──
  for (const slug of SERVICE_PAGE_SLUGS) {
    const frSlug = SERVICE_URL_SLUG_BY_LOCALE.fr[slug];
    const enSlug = SERVICE_URL_SLUG_BY_LOCALE.en[slug];
    const esSlug = SERVICE_URL_SLUG_BY_LOCALE.es[slug];

    entries.push({
      url: `${BASE}/services/${frSlug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${BASE}/services/${frSlug}`,
          en: `${BASE}/en/services/${enSlug}`,
          es: `${BASE}/es/services/${esSlug}`,
          "x-default": `${BASE}/services/${frSlug}`,
        },
      },
    });
  }

  // ── Blog articles ──
  for (const slug of blogSlugs) {
    entries.push({
      url: `${BASE}/ressources/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          fr: `${BASE}/ressources/blog/${slug}`,
          en: `${BASE}/en/ressources/blog/${slug}`,
          es: `${BASE}/es/ressources/blog/${slug}`,
          "x-default": `${BASE}/ressources/blog/${slug}`,
        },
      },
    });
  }

  return entries;
}
