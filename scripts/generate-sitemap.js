#!/usr/bin/env node
/**
 * Generate a static sitemap.xml in public/ for Next.js static export.
 * Run: node scripts/generate-sitemap.js
 */

const fs = require("fs");
const path = require("path");

const BASE = "https://www.iteradvisors.com";
const now = new Date().toISOString().split("T")[0];

const staticPages = [
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

const serviceSlugs = {
  fr: [
    "previsionnel-tresorerie",
    "gestion-financiere-externalisee",
    "accompagnement-levee-de-fond",
    "comptabilite-externalisation",
    "controle-de-gestion-externalise",
  ],
  en: [
    "cash-flow-forecast",
    "outsourced-financial-management",
    "fund-raising-support",
    "outsource-your-accounting",
    "outsourced-management-control",
  ],
  es: [
    "prevision-tesoreria",
    "gestion-financiera-externalizada",
    "soporte-financiacion",
    "externalizar-contabilidad",
    "control-gestion-externalizado",
  ],
};

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

function urlEntry(loc, priority, changefreq, alternates) {
  let xml = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n`;
  if (alternates) {
    for (const [lang, href] of Object.entries(alternates)) {
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />\n`;
    }
  }
  xml += `  </url>`;
  return xml;
}

const entries = [];

// Static pages
for (const page of staticPages) {
  const priority = page.fr === "/" ? "1.0" : page.fr.includes("daf-externalise") || page.fr.includes("drh-externalise") ? "0.9" : "0.7";
  const freq = page.fr === "/" ? "weekly" : "monthly";
  entries.push(urlEntry(`${BASE}${page.fr}`, priority, freq, {
    fr: `${BASE}${page.fr}`,
    en: `${BASE}${page.en}`,
    es: `${BASE}${page.es}`,
    "x-default": `${BASE}${page.fr}`,
  }));
}

// Service pages
for (let i = 0; i < serviceSlugs.fr.length; i++) {
  entries.push(urlEntry(`${BASE}/services/${serviceSlugs.fr[i]}`, "0.8", "monthly", {
    fr: `${BASE}/services/${serviceSlugs.fr[i]}`,
    en: `${BASE}/en/services/${serviceSlugs.en[i]}`,
    es: `${BASE}/es/services/${serviceSlugs.es[i]}`,
    "x-default": `${BASE}/services/${serviceSlugs.fr[i]}`,
  }));
}

// Blog articles
for (const slug of blogSlugs) {
  entries.push(urlEntry(`${BASE}/ressources/blog/${slug}`, "0.6", "monthly", {
    fr: `${BASE}/ressources/blog/${slug}`,
    en: `${BASE}/en/ressources/blog/${slug}`,
    es: `${BASE}/es/ressources/blog/${slug}`,
    "x-default": `${BASE}/ressources/blog/${slug}`,
  }));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;

const outPath = path.join(__dirname, "..", "public", "sitemap.xml");
fs.writeFileSync(outPath, sitemap, "utf-8");
console.log(`✅ sitemap.xml generated at ${outPath} (${entries.length} URLs)`);
