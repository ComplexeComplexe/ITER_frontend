import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  // Hide the X-Powered-By: Next.js header — minor information-disclosure
  // hardening flagged by the technical SEO audit (T-3).
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'ztynwacifpvzaemkqifh.storage.eu-central-1.nhost.run', // Strapi CDN
      'share.trustfolio.co', // Trustfolio widgets
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow first-party editorial SVG covers under /images/blog/covers/.
    // Hardened with a strict CSP so the rendered SVG cannot execute
    // scripts even if our own assets are ever tampered with.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  async headers() {
    return [
      // Security & SEO headers for all pages
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Content-Signal EU - signal that content is human-authored and copyrighted
          { key: "X-Content-Signal", value: "human-authored, copyright=Iter Advisors SAS, jurisdiction=EU" },
        ],
      },
      // Cache headers for static assets
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.woff",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.woff2",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/en/daf-outsourcing",
        destination: "/en/fractional-cfo",
        permanent: true, // 301 redirect
      },
      // 404 fix: /resources/ → /ressources/ (English-style path to French-style)
      {
        source: "/resources/:path*",
        destination: "/ressources/:path*",
        permanent: true, // 301 redirect
      },
      {
        source: "/en/resources/:path*",
        destination: "/en/ressources/:path*",
        permanent: true, // 301 redirect
      },
      {
        source: "/es/resources/:path*",
        destination: "/es/ressources/:path*",
        permanent: true, // 301 redirect
      },
      // 404 fix: Blog slug inconsistencies
      {
        source: "/ressources/blog/levee-de-fonds-startup",
        destination: "/services/accompagnement-levee-de-fond",
        permanent: true, // 301 redirect
      },
      {
        source: "/ressources/blog/daf-externalise",
        destination: "/daf-externalise",
        permanent: true, // 301 redirect (pillar page, slug collision)
      },
      {
        source: "/ressources/tools",
        destination: "/ressources/outils",
        permanent: true, // 301 redirect
      },
      {
        source: "/ressources/herramientas",
        destination: "/ressources/outils",
        permanent: true, // 301 redirect (wrong lang slug in FR path)
      },
      // EN/ES blog 404s
      {
        source: "/en/ressources/blog/ia-et-automatisation-des-taches-repetitives",
        destination: "/en/ressources/blog",
        permanent: true, // 301 redirect (article depublished)
      },
      {
        source: "/es/ressources/blog/ia-et-automatisation-des-taches-repetitives",
        destination: "/es/ressources/blog",
        permanent: true, // 301 redirect (article depublished)
      },
      // les-10-outils-pour-les-cfos-en-start-up (long slug) was depublished
      // — kept the dedicated short-slug version. EN/ES paths redirect to
      // the FR short slug since no EN/ES translation exists.
      {
        source: "/ressources/blog/les-10-outils-pour-les-cfos-en-start-up",
        destination: "/ressources/blog/les-10-outils-pour-cfos-startup",
        permanent: true,
      },
      {
        source: "/en/ressources/blog/les-10-outils-pour-cfos-startup",
        destination: "/ressources/blog/les-10-outils-pour-cfos-startup",
        permanent: true,
      },
      {
        source: "/es/ressources/blog/les-10-outils-pour-cfos-startup",
        destination: "/ressources/blog/les-10-outils-pour-cfos-startup",
        permanent: true,
      },
      {
        source: "/en/ressources/blog/les-10-outils-pour-les-cfos-en-start-up",
        destination: "/ressources/blog/les-10-outils-pour-cfos-startup",
        permanent: true,
      },
      {
        source: "/es/ressources/blog/les-10-outils-pour-les-cfos-en-start-up",
        destination: "/ressources/blog/les-10-outils-pour-cfos-startup",
        permanent: true,
      },
      {
        source: "/es/ressources/tools",
        destination: "/es/ressources/herramientas",
        permanent: true, // 301 redirect
      },
      {
        source: "/en/ressources/herramientas",
        destination: "/en/ressources/tools",
        permanent: true, // 301 redirect
      },
      // HARMO-01 — EN canonical cluster is now /en/fractional-cfo/* to match
      // the parent slug. Old /en/daf-outsourcing/* URLs 301-redirect into it.
      {
        source: "/en/daf-outsourcing/shared-time",
        destination: "/en/fractional-cfo/shared-time",
        permanent: true,
      },
      {
        source: "/en/daf-outsourcing/transition",
        destination: "/en/fractional-cfo/transition",
        permanent: true,
      },
      {
        source: "/en/daf-outsourcing/metier",
        destination: "/en/fractional-cfo/metier",
        permanent: true,
      },
      // Jobs EN/ES (if positions not translated, redirect to hub)
      {
        source: "/en/jobs/fractional-cfo-startups",
        destination: "/en/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/es/jobs/fractional-cfo-startups",
        destination: "/es/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/en/jobs/marketing-growth-strategy",
        destination: "/en/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/es/jobs/marketing-growth-strategy",
        destination: "/es/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/en/jobs/senior-finance-manager",
        destination: "/en/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/es/jobs/senior-finance-manager",
        destination: "/es/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/en/jobs/finance-analyst-junior-fr",
        destination: "/en/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/es/jobs/finance-analyst-junior-fr",
        destination: "/es/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      // TICKET 2: Spanish slug migration to native Spanish
      {
        source: "/es/ressources/:path*",
        destination: "/es/recursos/:path*",
        permanent: true, // 301 redirect (French → Spanish)
      },
      {
        source: "/es/profil",
        destination: "/es/perfil",
        permanent: true, // 301 redirect (French → Spanish)
      },
      {
        source: "/es/qualification",
        destination: "/es/calificacion",
        permanent: true, // 301 redirect (French → Spanish)
      },
      {
        source: "/es/campagne",
        destination: "/es/campana",
        permanent: true, // 301 redirect (French → Spanish)
      },
      // TICKET 3: English URL slug corrections (French → English)
      {
        source: "/en/profil",
        destination: "/en/profile",
        permanent: true, // 301 redirect (French → English)
      },
      {
        source: "/en/qualification",
        destination: "/en/assessment",
        permanent: true, // 301 redirect (French → English)
      },
      {
        source: "/en/campagne",
        destination: "/en/campaign",
        permanent: true, // 301 redirect (French → English)
      },
      // INDEX-02 — 3 redirections 301 pour URLs 404 remontées par GSC (mai 2026).
      // Doivent venir AVANT les catch-all fiche-metier ci-dessous pour matcher
      // sur le slug exact plutôt que sur le pattern générique.
      {
        source: "/en/services/outsourced-management-accounting",
        destination: "/en/services/outsource-your-accounting",
        permanent: true,
      },
      {
        source: "/es/services/control-de-gestion-externalizado",
        destination: "/es/services/control-gestion-externalizado",
        permanent: true,
      },
      {
        source: "/en/ressources/fiche-metier/expert-paie-et-administration-du-personnel",
        destination: "/en/ressources/job-descriptions",
        permanent: true,
      },
      // Handle specific ressources → resources mappings for fiche-metier
      {
        source: "/en/ressources/fiche-metier/:path*",
        destination: "/en/ressources/job-descriptions/:path*",
        permanent: true, // 301 redirect (fiche-metier → job-descriptions)
      },
      // TICKET 4: Spanish service page for accounting externalization
      {
        source: "/es/services/comptabilite-externalisation",
        destination: "/es/services/externalizar-contabilidad",
        permanent: true, // 301 redirect (French service → Spanish service)
      },
      // TICKET 4: English service pages for consistency
      {
        source: "/en/services/comptabilite-externalisation",
        destination: "/en/services/outsource-your-accounting",
        permanent: true, // 301 redirect (French → English)
      },
      {
        source: "/en/services/accompagnement-levee-de-fond",
        destination: "/en/services/fund-raising-support",
        permanent: true, // 301 redirect (French → English)
      },
      {
        source: "/en/services/controle-de-gestion-externalise",
        destination: "/en/services/outsourced-management-control",
        permanent: true, // 301 redirect (French → English)
      },
      {
        source: "/en/services/gestion-financiere-externalisee",
        destination: "/en/fractional-cfo",
        permanent: true, // 301 redirect (French → English)
      },
      {
        source: "/en/services/previsionnel-tresorerie",
        destination: "/en/services/cash-flow-forecast",
        permanent: true, // 301 redirect (French → English)
      },
      // UX-02: Merge testimonials and case studies into unified social proof hub
      {
        source: "/ressources/case-studies",
        destination: "/ressources/cas-clients",
        permanent: true, // 301 redirect (merged content)
      },
      {
        source: "/ressources/testimonials",
        destination: "/ressources/cas-clients",
        permanent: true, // 301 redirect (merged content)
      },
      {
        source: "/en/ressources/case-studies",
        destination: "/en/ressources/cas-clients",
        permanent: true, // 301 redirect (merged content)
      },
      {
        source: "/en/ressources/testimonials",
        destination: "/en/ressources/cas-clients",
        permanent: true, // 301 redirect (merged content)
      },
      {
        source: "/es/ressources/case-studies",
        destination: "/es/ressources/cas-clients",
        permanent: true, // 301 redirect (merged content)
      },
      {
        source: "/es/ressources/testimonials",
        destination: "/es/ressources/cas-clients",
        permanent: true, // 301 redirect (merged content)
      },
      // UX-03: Remove empty job descriptions hub with redirect to main DAF role page
      {
        source: "/ressources/fiche-metier/:path*",
        destination: "/daf-externalise/metier",
        permanent: true, // 301 redirect (empty page)
      },
      {
        source: "/en/ressources/fiche-metier/:path*",
        destination: "/en/daf-externalise/metier",
        permanent: true, // 301 redirect (empty page)
      },
      {
        source: "/es/ressources/fiche-metier/:path*",
        destination: "/es/daf-externalise/metier",
        permanent: true, // 301 redirect (empty page)
      },
      // OUTILS CFO: Old URL redirects (from legacy implementation)
      {
        source: "/ressources/outils/outil-comptabilite/:path*",
        destination: "/ressources/outils/logiciels-comptabilite",
        permanent: true, // 301 redirect (slug rename)
      },
      {
        source: "/ressources/outils/outil-tresorerie/:path*",
        destination: "/ressources/outils/logiciels-tresorerie",
        permanent: true, // 301 redirect (slug rename)
      },
      // ─── INDEX-03 (mai 2026) — GSC "page avec redirection" cleanup ────
      // Goal: every URL reported by GSC must reach a 200 in exactly one
      // hop. This block kills four classes of issues:
      //   1. Double-locale prefixes  (/en/en/*, /es/es/*, /en/es/*, /es/en/*)
      //   2. Testimonials sub-slugs that GSC still tracks
      //   3. Orphan blog slugs in EN/ES (article exists only in FR)
      //   4. Per-locale service / pillar slug mismatches
      //
      // Double-locale catch-alls — MUST come before any /en/*, /es/* rule
      // so they collapse the prefix before downstream rules try to match.
      // GSC trace: /en/en/ressources/blog/..., /en/en/services/...,
      // /es/es/services/..., /en/es/..., /es/en/...
      {
        source: "/en/en/:path*",
        destination: "/en/:path*",
        permanent: true,
      },
      {
        source: "/es/es/:path*",
        destination: "/es/:path*",
        permanent: true,
      },
      {
        source: "/en/es/:path*",
        destination: "/es/:path*",
        permanent: true,
      },
      {
        source: "/es/en/:path*",
        destination: "/en/:path*",
        permanent: true,
      },
      // Testimonials sub-slugs — only the bare hub was redirected before,
      // so /ressources/testimonials/yego, /es/ressources/testimonials/ukio,
      // /en/ressources/testimonials/surf etc. all 404'd. The unified social
      // proof hub is /[locale]/ressources/cas-clients (see UX-02 above).
      {
        source: "/ressources/testimonials/:slug*",
        destination: "/ressources/cas-clients",
        permanent: true,
      },
      {
        source: "/en/ressources/testimonials/:slug*",
        destination: "/en/ressources/cas-clients",
        permanent: true,
      },
      // NOTE: the /es/ressources/* → /es/recursos/* rule (TICKET 2 above)
      // intercepts the source URL first, so we only need the redirect on
      // the post-migration path. Chain: GSC URL → /es/recursos/... → hub.
      {
        source: "/es/recursos/testimonials/:slug*",
        destination: "/es/recursos/cas-clients",
        permanent: true,
      },
      // EN/ES orphan blog slugs — article exists only in FR. Redirect to
      // the locale blog hub so Google replaces the indexed URL with the
      // hub instead of keeping the redirect chain.
      {
        source: "/en/ressources/blog/levee-de-fonds-dilutif-vs-non-dilutif",
        destination: "/en/ressources/blog",
        permanent: true,
      },
      {
        source: "/es/ressources/blog/levee-de-fonds-dilutif-vs-non-dilutif",
        destination: "/es/recursos/blog",
        permanent: true,
      },
      {
        source: "/en/ressources/blog/organiser-sa-direction-financiere",
        destination: "/en/ressources/blog",
        permanent: true,
      },
      {
        source: "/en/ressources/blog/regimes-fiscaux-france-vs-espagne",
        destination: "/en/ressources/blog",
        permanent: true,
      },
      {
        source: "/es/ressources/blog/regimes-fiscaux-france-vs-espagne",
        destination: "/es/recursos/blog",
        permanent: true,
      },
      // Full-slug variant of the depublished AI/automation article (the
      // shorter slug was already handled; GSC tracks both forms).
      {
        source:
          "/en/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance",
        destination: "/en/ressources/blog",
        permanent: true,
      },
      {
        source:
          "/es/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance",
        destination: "/es/recursos/blog",
        permanent: true,
      },
      // FR service slugs that GSC has indexed with old names. The
      // canonical names already live under app/services/*.
      {
        source: "/services/gestion-de-tresorerie",
        destination: "/services/previsionnel-tresorerie",
        permanent: true,
      },
      {
        source: "/services/externalisation-comptable",
        destination: "/services/comptabilite-externalisation",
        permanent: true,
      },
      {
        source: "/services/levee-de-fonds",
        destination: "/services/accompagnement-levee-de-fond",
        permanent: true,
      },
      // ES site: French-named service routes exist as duplicates of the
      // Spanish canonical slugs. Collapse them so each topic has exactly
      // one indexable URL per locale.
      {
        source: "/es/services/previsionnel-tresorerie",
        destination: "/es/services/flujo-de-caja",
        permanent: true,
      },
      {
        source: "/es/services/accompagnement-levee-de-fond",
        destination: "/es/services",
        permanent: true,
      },
      {
        source: "/es/services/controle-de-gestion-externalise",
        destination: "/es/services",
        permanent: true,
      },
      {
        source: "/es/services/fund-raising-support",
        destination: "/es/services",
        permanent: true,
      },
      // EN site: Spanish-named service slug indexed by mistake.
      {
        source: "/en/services/control-gestion-externalizado",
        destination: "/en/services/outsourced-management-control",
        permanent: true,
      },
      // FR site: foreign-locale pillar slugs that shouldn't exist on the
      // root domain. The canonical FR cluster is /daf-externalise/*.
      {
        source: "/daf-outsourcing/:path*",
        destination: "/daf-externalise/:path*",
        permanent: true,
      },
      {
        source: "/externalizacion-daf/:path*",
        destination: "/daf-externalise/:path*",
        permanent: true,
      },
      // EN site: legacy DAF cluster slugs that still appear in GSC.
      // Canonical EN cluster is /en/fractional-cfo/*.
      {
        source: "/en/daf-externalise/:path*",
        destination: "/en/fractional-cfo/:path*",
        permanent: true,
      },
      {
        source: "/en/externalizacion-daf/:path*",
        destination: "/en/fractional-cfo/:path*",
        permanent: true,
      },
      // ES site: canonical ES cluster is /es/externalizacion-daf/*.
      {
        source: "/es/daf-externalise",
        destination: "/es/externalizacion-daf",
        permanent: true,
      },
      {
        source: "/es/daf-externalise/:path*",
        destination: "/es/externalizacion-daf/:path*",
        permanent: true,
      },
      {
        source: "/es/daf-outsourcing/:path*",
        destination: "/es/externalizacion-daf/:path*",
        permanent: true,
      },
      // Legal page in wrong language on /es.
      {
        source: "/es/mentions-legales",
        destination: "/es/aviso-legal",
        permanent: true,
      },
      // Glossary 404 — entry never existed. Send to the hub.
      {
        source: "/ressources/glossaire/fusion-acquisition",
        destination: "/ressources/glossaire",
        permanent: true,
      },
      // ─── INDEX-05 (mai 2026) — ES blog 404s reported by Bing & Google ──
      // checklist-due-diligence-levee-de-fonds: article exists only in FR
      // (lib/content/blog-posts.ts) — redirect ES variant to the ES blog
      // hub so Bingbot stops collecting the 404.
      {
        source: "/es/recursos/blog/checklist-due-diligence-levee-de-fonds",
        destination: "/es/recursos/blog",
        permanent: true,
      },
      // recaudacion-fondos-dilutiva-vs-no-dilutiva: ES translation slug
      // for the dilutif-vs-non-dilutif piece which only exists in FR.
      // Send to the ES blog hub (matches the existing handling of
      // /es/ressources/blog/levee-de-fonds-dilutif-vs-non-dilutif above).
      {
        source: "/es/recursos/blog/recaudacion-fondos-dilutiva-vs-no-dilutiva",
        destination: "/es/recursos/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
