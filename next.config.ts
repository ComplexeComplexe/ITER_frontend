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
          // Iter Advisors S.L. (Spanish company, NIF B42960849) — ES
          // jurisdiction signal for the EU Content-Signal initiative.
          { key: "X-Content-Signal", value: "human-authored, copyright=Iter Advisors S.L., jurisdiction=ES" },
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
      // T2 (2026-06-07): /recursos/ → /ressources/. GSC reports internal
      // links pointing to /recursos/* that 404 (the Spanish word was used
      // in some older internal content but the routes were never created).
      // Catch-all so any /recursos/{slug} hits the matching /ressources/{slug}.
      {
        source: "/recursos/:path*",
        destination: "/ressources/:path*",
        permanent: true,
      },
      {
        source: "/en/recursos/:path*",
        destination: "/en/ressources/:path*",
        permanent: true,
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
      // TICKET F1 (2026-05-17) — /fr/fractional-cfo referenced in tickets but
      // no FR route exists under that path. The canonical FR cluster is
      // /daf-externalise. 301 so internal links and any external backlinks
      // pointing to /fr/fractional-cfo land on the right pillar.
      {
        source: "/fr/fractional-cfo",
        destination: "/daf-externalise",
        permanent: true,
      },
      // ─── GSC-QA (2026-05-19) — 404 URLs from GSC report ─────────────────
      // A. Locale-prefixed geo pages that used the wrong slug convention.
      {
        source: "/en/daf-externalise-paris",
        destination: "/en/outsourced-cfo-paris",
        permanent: true,
      },
      {
        source: "/es/daf-externalise-paris",
        destination: "/es/cfo-externalizado-paris",
        permanent: true,
      },
      // B. Root-level client/testimonial orphan pages — old CMS URLs that
      //    Google indexed via internal links. No Next.js route exists; redirect
      //    to the unified social proof hub /ressources/cas-clients.
      {
        source: "/impact",
        destination: "/ressources/cas-clients",
        permanent: true,
      },
      {
        source: "/optidigital",
        destination: "/ressources/cas-clients",
        permanent: true,
      },
      {
        source: "/seasonly",
        destination: "/ressources/cas-clients",
        permanent: true,
      },
      {
        source: "/yego",
        destination: "/ressources/cas-clients",
        permanent: true,
      },
      {
        source: "/happy-scribe",
        destination: "/ressources/cas-clients",
        permanent: true,
      },
      {
        source: "/mitiga-solutions",
        destination: "/ressources/cas-clients",
        permanent: true,
      },
      {
        source: "/surf",
        destination: "/ressources/cas-clients",
        permanent: true,
      },
      {
        source: "/ukio",
        destination: "/ressources/cas-clients",
        permanent: true,
      },
      {
        source: "/solarmente",
        destination: "/ressources/cas-clients",
        permanent: true,
      },
      {
        source: "/neat",
        destination: "/ressources/cas-clients",
        permanent: true,
      },
      // C. Glossary duplicate — /bfr duplicates /besoin-fonds-roulement-bfr.
      //    Keep the long descriptive slug as canonical; redirect the short one.
      {
        source: "/ressources/glossaire/bfr",
        destination: "/ressources/glossaire/besoin-fonds-roulement-bfr",
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

      // ─── SEO-01 (2026-05-23) — 120 URLs en 404 remontées par Screaming Frog ─
      //
      // Strategy:
      //  • Catch-all patterns where NO valid pages exist at those subpaths
      //  • Individual rules for locale-slug mismatches and FR-only articles
      //  • All redirect to the best semantically equivalent 200 page

      // ── CATCH-ALL: EN glossaire slugs (/en/ressources/glossaire/*)
      // The valid EN glossaire hub is at /en/ressources/glossaire (200 OK).
      // No [slug] handler exists — all individual slugs 404.
      // Redirect each slug to its FR canonical (glossaire is FR-only).
      {
        source: "/en/ressources/glossaire/:slug",
        destination: "/ressources/glossaire/:slug",
        permanent: true,
      },
      // ── CATCH-ALL: ES glossaire slugs (/es/recursos/glossaire/*)
      {
        source: "/es/recursos/glossaire/:slug",
        destination: "/ressources/glossaire/:slug",
        permanent: true,
      },
      // ── CATCH-ALL: EN tools slugs (/en/ressources/tools/*)
      // /en/ressources/tools hub (200), but no [slug] handler.
      {
        source: "/en/ressources/tools/:slug",
        destination: "/ressources/outils/:slug",
        permanent: true,
      },
      // ── CATCH-ALL: ES herramientas slugs (/es/recursos/herramientas/*)
      {
        source: "/es/recursos/herramientas/:slug",
        destination: "/ressources/outils/:slug",
        permanent: true,
      },

      // ── FR orphan tool & blog pages (no content planned, redirect to hub)
      { source: "/ressources/outils/sap-/-netsuite", destination: "/ressources/outils", permanent: true },
      { source: "/ressources/outils/agicap-lite",    destination: "/ressources/outils", permanent: true },
      { source: "/ressources/outils/stripe",          destination: "/ressources/outils", permanent: true },
      { source: "/daf-externalise/locaux",            destination: "/daf-externalise",   permanent: true },
      { source: "/ressources/blog/daf-transition-quand", destination: "/ressources/blog", permanent: true },
      { source: "/ressources/blog/que-es-fractional-cfo", destination: "/ressources/blog", permanent: true },

      // ── ES locale slug mismatches (old or untranslated subpage slugs)
      { source: "/es/externalizacion-daf/tarifas",      destination: "/es/externalizacion-daf", permanent: true },
      { source: "/es/externalizacion-daf/tarifs",       destination: "/es/externalizacion-daf", permanent: true },
      { source: "/es/externalizacion-daf/secteurs",     destination: "/es/externalizacion-daf", permanent: true },
      { source: "/es/externalizacion-daf/sectores",     destination: "/es/externalizacion-daf", permanent: true },
      // FR slug for ES page → correct ES slug
      { source: "/es/externalizacion-daf/temps-partage", destination: "/es/externalizacion-daf/tiempo-compartido", permanent: true },

      // ── EN locale slug mismatches
      { source: "/en/fractional-cfo/tarifs",   destination: "/en/fractional-cfo",             permanent: true },
      { source: "/en/fractional-cfo/secteurs", destination: "/en/fractional-cfo",             permanent: true },
      // FR slug → correct EN slug (page exists)
      { source: "/en/fractional-cfo/temps-partage", destination: "/en/fractional-cfo/shared-time", permanent: true },

      // ── Services pages that only exist in FR (no EN/ES equivalents)
      { source: "/en/services/conformite-droit-travail",    destination: "/en/services",  permanent: true },
      { source: "/es/services/conformite-droit-travail",    destination: "/es/services",  permanent: true },
      { source: "/en/services/formation-developpement",     destination: "/en/services",  permanent: true },
      { source: "/es/services/formation-developpement",     destination: "/es/services",  permanent: true },
      { source: "/en/services/recrutement-talent-acquisition", destination: "/en/services", permanent: true },
      { source: "/es/services/recrutement-talent-acquisition", destination: "/es/services", permanent: true },
      { source: "/en/services/gestion-paie-charges-sociales",  destination: "/en/services", permanent: true },
      { source: "/es/services/gestion-paie-charges-sociales",  destination: "/es/services", permanent: true },

      // ── Typo / wrong locale prefix: `recursos` is the Spanish slug, but on
      // the FR root and on /en it must map to /ressources. Catch-all so every
      // subpath (blog, cas-clients, glossaire, herramientas, …) resolves
      // instead of 404ing. ES keeps `recursos` as its own canonical slug.
      { source: "/recursos/:path*",    destination: "/ressources/:path*",    permanent: true },
      { source: "/en/recursos/:path*", destination: "/en/ressources/:path*", permanent: true },

      // ── Job descriptions (no EN/ES localized versions)
      { source: "/en/ressources/job-descriptions", destination: "/ressources/fiche-metier", permanent: true },
      { source: "/es/recursos/fiche-metier",       destination: "/ressources/fiche-metier", permanent: true },

      // ── EN blog articles that only exist in FR — redirect to FR canonical
      // (preserves link equity flowing to the actual content vs the EN blog hub)
      { source: "/en/ressources/blog/quand-embaucher-daf-externalise-5-signes",            destination: "/ressources/blog/quand-embaucher-daf-externalise-5-signes",            permanent: true },
      // 2026-05-31 (T8 follow-up): destination was sending EN visitors to the
      // FR article. Now points to the canonical EN slug (an EN version of the
      // article exists at this slug in lib/content/blog-posts.ts).
      { source: "/en/ressources/blog/cout-daf-externalise-2026-tarifs-par-mission",        destination: "/en/ressources/blog/cout-daf-externalise-tarifs-prix-2026",        permanent: true },
      { source: "/en/ressources/blog/tableau-de-bord-financier-startup-12-kpis",           destination: "/ressources/blog/tableau-de-bord-financier-startup-12-kpis",           permanent: true },
      { source: "/en/ressources/blog/daf-externalise-vs-expert-comptable",                 destination: "/ressources/blog/daf-externalise-vs-expert-comptable",                 permanent: true },
      { source: "/en/ressources/blog/impot-revenu-espagne",                                destination: "/ressources/blog/impot-revenu-espagne",                                permanent: true },
      { source: "/en/ressources/blog/cash-burn-calculer-runway-anticiper-levee",           destination: "/ressources/blog/cash-burn-calculer-runway-anticiper-levee",           permanent: true },
      { source: "/en/ressources/blog/agicap-vs-fygr-outil-tresorerie",                    destination: "/ressources/blog/agicap-vs-fygr-outil-tresorerie",                    permanent: true },
      { source: "/en/ressources/blog/daf-externalise-barcelone-guide-startups-espagnoles", destination: "/ressources/blog/daf-externalise-barcelone-guide-startups-espagnoles", permanent: true },
      { source: "/en/ressources/blog/due-diligence-financiere-investisseurs",              destination: "/ressources/blog/due-diligence-financiere-investisseurs",              permanent: true },
      { source: "/en/ressources/blog/drh-externalise-quand-et-pourquoi",                  destination: "/ressources/blog/drh-externalise-quand-et-pourquoi",                  permanent: true },
      { source: "/en/ressources/blog/reduire-bfr-7-leviers-actionnables",                 destination: "/ressources/blog/reduire-bfr-7-leviers-actionnables",                 permanent: true },
      { source: "/en/ressources/blog/pennylane-vs-sage-comparatif-40-deploiements",        destination: "/ressources/blog/pennylane-vs-sage-comparatif-40-deploiements",        permanent: true },
      { source: "/en/ressources/blog/stack-financier-saas-series-a",                      destination: "/ressources/blog/stack-financier-saas-series-a",                      permanent: true },
      { source: "/en/ressources/blog/term-sheet-negocier-clauses-cles",                   destination: "/ressources/blog/term-sheet-negocier-clauses-cles",                   permanent: true },
      { source: "/en/ressources/blog/data-room-checklist-levee-de-fonds",                 destination: "/ressources/blog/data-room-checklist-levee-de-fonds",                 permanent: true },
      { source: "/en/ressources/blog/cas-etude-happy-scribe",                             destination: "/ressources/cas-clients",                                             permanent: true },
      { source: "/en/ressources/blog/externaliser-comptabilite-guide",                    destination: "/ressources/blog/externaliser-comptabilite-guide",                    permanent: true },
      { source: "/en/ressources/blog/payfit-vs-silae-comparatif-pme",                     destination: "/ressources/blog/payfit-vs-silae-comparatif-pme",                     permanent: true },
      // "que-es-fractional-cfo" is a Spanish-concept article → EN fractional-cfo pillar
      { source: "/en/ressources/blog/que-es-fractional-cfo",                              destination: "/en/fractional-cfo",                                                  permanent: true },

      // ── ES blog articles that only exist in FR — redirect to FR canonical
      { source: "/es/recursos/blog/agicap-vs-fygr-outil-tresorerie",                      destination: "/ressources/blog/agicap-vs-fygr-outil-tresorerie",                    permanent: true },
      { source: "/es/recursos/blog/daf-externalise-vs-expert-comptable",                  destination: "/ressources/blog/daf-externalise-vs-expert-comptable",                 permanent: true },
      { source: "/es/recursos/blog/cash-burn-calculer-runway-anticiper-levee",            destination: "/ressources/blog/cash-burn-calculer-runway-anticiper-levee",           permanent: true },
      { source: "/es/recursos/blog/tableau-de-bord-financier-startup-12-kpis",            destination: "/ressources/blog/tableau-de-bord-financier-startup-12-kpis",           permanent: true },
      { source: "/es/recursos/blog/due-diligence-financiere-investisseurs",               destination: "/ressources/blog/due-diligence-financiere-investisseurs",              permanent: true },
      { source: "/es/recursos/blog/payfit-vs-silae-comparatif-pme",                       destination: "/ressources/blog/payfit-vs-silae-comparatif-pme",                     permanent: true },
      { source: "/es/recursos/blog/externaliser-comptabilite-guide",                      destination: "/ressources/blog/externaliser-comptabilite-guide",                    permanent: true },
      { source: "/es/recursos/blog/cas-etude-happy-scribe",                               destination: "/ressources/cas-clients",                                             permanent: true },
      { source: "/es/recursos/blog/data-room-checklist-levee-de-fonds",                   destination: "/ressources/blog/data-room-checklist-levee-de-fonds",                 permanent: true },
      { source: "/es/recursos/blog/stack-financier-saas-series-a",                        destination: "/ressources/blog/stack-financier-saas-series-a",                      permanent: true },
      { source: "/es/recursos/blog/term-sheet-negocier-clauses-cles",                     destination: "/ressources/blog/term-sheet-negocier-clauses-cles",                   permanent: true },
      { source: "/es/recursos/blog/pennylane-vs-sage-comparatif-40-deploiements",         destination: "/ressources/blog/pennylane-vs-sage-comparatif-40-deploiements",        permanent: true },
      { source: "/es/recursos/blog/reduire-bfr-7-leviers-actionnables",                   destination: "/ressources/blog/reduire-bfr-7-leviers-actionnables",                 permanent: true },
      { source: "/es/recursos/blog/drh-externalise-quand-et-pourquoi",                    destination: "/ressources/blog/drh-externalise-quand-et-pourquoi",                  permanent: true },
      { source: "/es/recursos/blog/daf-externalise-barcelone-guide-startups-espagnoles",  destination: "/ressources/blog/daf-externalise-barcelone-guide-startups-espagnoles", permanent: true },
      { source: "/es/recursos/blog/quand-embaucher-daf-externalise-5-signes",             destination: "/ressources/blog/quand-embaucher-daf-externalise-5-signes",            permanent: true },
      // 2026-05-31 — same fix as the EN sibling above: destination was
      // sending ES visitors to the FR article. Now points to the canonical
      // ES slug (an ES version exists at this slug in lib/content/blog-posts.ts).
      { source: "/es/recursos/blog/cout-daf-externalise-2026-tarifs-par-mission",         destination: "/es/recursos/blog/cout-daf-externalise-tarifs-prix-2026",        permanent: true },
      { source: "/es/recursos/blog/la-modernisation-du-role-de-cfo",                      destination: "/ressources/blog/la-modernisation-du-role-de-cfo",                    permanent: true },
      { source: "/es/recursos/blog/impot-revenu-espagne",                                 destination: "/ressources/blog/impot-revenu-espagne",                               permanent: true },
      { source: "/es/recursos/blog/daf-drh-externalises-synergie",                        destination: "/ressources/blog/daf-drh-externalises-synergie",                      permanent: true },
      // FR-only articles linked from EN/ES featured cards (SEO-06)
      { source: "/es/recursos/blog/organiser-sa-direction-financiere",                    destination: "/ressources/blog/organiser-sa-direction-financiere",                   permanent: true },
      { source: "/es/recursos/blog/essentiels-outils-tech-finance",                       destination: "/ressources/blog/essentiels-outils-tech-finance",                     permanent: true },
      { source: "/en/ressources/blog/essentiels-outils-tech-finance",                     destination: "/ressources/blog/essentiels-outils-tech-finance",                     permanent: true },

      // ── Complement SEO-01 (2026-05-25) — résidus de iteradvisors-next-redirects.js
      // non couverts par les catch-alls existants.
      // Ahrefs T-404 (2026-06-08) — REMPLACÉ les wildcards :path* qui
      // préservaient le slug FR (temps-partage) au lieu de le mapper vers
      // le slug EN (shared-time) / ES (tiempo-compartido), ce qui produisait
      // /en/hr-outsourcing/temps-partage (404) et /es/externalizacion-rrhh/temps-partage (404).
      // Désormais chaque path est mappé explicitement.
      { source: "/es/drh-externalise",                       destination: "/es/externalizacion-rrhh",                       permanent: true },
      { source: "/es/drh-externalise/temps-partage",          destination: "/es/externalizacion-rrhh/tiempo-compartido",     permanent: true },
      { source: "/en/drh-externalise",                       destination: "/en/hr-outsourcing",                             permanent: true },
      { source: "/en/drh-externalise/temps-partage",          destination: "/en/hr-outsourcing/shared-time",                 permanent: true },
      { source: "/en/services/outsourced-financial-management", destination: "/en/fractional-cfo",          permanent: true },
      { source: "/es/services/outsourced-management-control",   destination: "/es/services/control-gestion-externalizado", permanent: true },
      { source: "/services/externalizar-contabilidad",          destination: "/services/comptabilite-externalisation",     permanent: true },
      { source: "/en/services/externalizar-contabilidad",       destination: "/en/services/outsource-your-accounting",     permanent: true },
      { source: "/fractional-cfo-barcelona",    destination: "/daf-externalise-barcelone",                  permanent: true },
      { source: "/es/fractional-cfo-barcelona", destination: "/es/cfo-externalizado-barcelona",             permanent: true },
      { source: "/en/ressources/blog/la-modernisation-du-role-de-cfo", destination: "/ressources/blog/la-modernisation-du-role-de-cfo", permanent: true },

      // ─── GSC-T7 / T8 (2026-05-31) — final 404 cleanup batch ──────────
      // T7 — anciennes URLs jamais redirigées (architecture pre-Next.js).
      // The site never had /notre-equipe, /notre-methode or /notre-expertise
      // routes under Next.js; they're WordPress-era legacy URLs still
      // surfacing in GSC. All three best-fit /a-propos (équipe + méthode +
      // expertise sont consolidés là). Trailing-slash variants get a free
      // first hop via trailingSlash:false, then land on this rule.
      { source: "/notre-equipe",    destination: "/a-propos", permanent: true },
      { source: "/notre-methode",   destination: "/a-propos", permanent: true },
      { source: "/notre-expertise", destination: "/a-propos", permanent: true },

      // T7 — article moved out of /ressources/<slug> into /ressources/blog/<slug>
      // long ago; legacy URL still in GSC.
      { source: "/ressources/organiser-sa-direction-financiere",
        destination: "/ressources/blog/organiser-sa-direction-financiere",
        permanent: true },

      // T8 — root-level slug without locale prefix; /en/fractional-cfo is
      // the canonical EN destination (FR equivalent is /daf-externalise).
      { source: "/fractional-cfo", destination: "/en/fractional-cfo", permanent: true },

      // T8 — Spanish "fiches métiers" route never existed; route to the
      // FR canonical (fiche-metier listing) until a localized one ships.
      { source: "/es/ressources/descripcion-del-puesto",
        destination: "/ressources/fiche-metier",
        permanent: true },

      // T8 — broken / truncated blog slugs (article doesn't exist or slug
      // got cut by GSC). Send to the locale blog hub instead of 404'ing.
      { source: "/ressources/blog/consequences-financieres-cyberattaques",
        destination: "/ressources/blog",
        permanent: true },
      { source: "/ressources/blog/anticiper-financierement-ses-recrutements-guide-pratiqu",
        destination: "/ressources/blog",
        permanent: true },
      { source: "/en/ressources/blog/anticiper-financierement-ses-recrutements-guide-prat",
        destination: "/en/ressources/blog",
        permanent: true },
      { source: "/en/ressources/blog/les-10-outils-pour-cfos-startup",
        destination: "/en/ressources/blog",
        permanent: true },

      // (T8 EN cout-daf redirect now lives at the original line ~750 — the
      // pre-existing rule's destination was updated in place rather than
      // duplicating the source pattern here, which would have been dead code.)

      // EC-05: Fix /ressources/outils/reporting-dataviz 404
      { source: "/ressources/outils/reporting-dataviz", destination: "/ressources/outils", permanent: true },
      // EC-03: City pages — redirect short slugs to full city pages
      { source: "/toulouse", destination: "/daf-externalise-toulouse", permanent: true },
      { source: "/barcelone", destination: "/daf-externalise-barcelone", permanent: true },
      // BECK-01: English slug variant → canonical FR article
      { source: "/ressources/fiscalite/beckham-law", destination: "/ressources/fiscalite/loi-beckham", permanent: true },
      // AUDIT-07-21: 404s avec inlinks actifs
      { source: "/services/ley-beckham", destination: "/ressources/fiscalite/loi-beckham", permanent: true },
      { source: "/ressources/fiscalite/convention-fiscale-france-espagne", destination: "/ressources/fiscalite-espagne-france", permanent: true },
    ];
  },
};

export default nextConfig;
