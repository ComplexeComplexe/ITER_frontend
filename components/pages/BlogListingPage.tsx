import { Locale } from "@/lib/i18n";
import { getLocalePath } from "@/lib/i18n";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import BlogFilterableGrid from "@/components/blog/BlogFilterableGrid";
import BlogFeaturedCard from "@/components/blog/BlogFeaturedCard";
import { strapiMediaUrl } from "@/lib/strapi";
import type { StrapiBlogArticle, CmsNavItem } from "@/lib/strapi";

/* ───────────────────────────────────────────────────────────────────────
 *  Per-locale UI strings.
 *  Editorial copy refresh + filter pills + featured slot (mai 2026
 *  design-critique deeper wins). All filtering happens client-side via
 *  React state inside <BlogFilterableGrid>; no faceted URL is ever
 *  generated (SEO contract documented in BlogFilterableGrid.tsx).
 * ─────────────────────────────────────────────────────────────────── */
const content: Record<
  Locale,
  {
    resourcesLabel: string;
    resourcesHref: string;
    breadcrumbLabel: string;
    h1: string;
    intro: string;
    /** Default CTA for cards that don’t match a more specific format. */
    discover: string;
    /** Format-specific CTAs picked by category / title heuristics. */
    discoverByKind: {
      guide: string;
      comparison: string;
      caseStudy: string;
      analysis: string;
    };
    /** "8 min de lecture" wrapper — the number is injected. */
    readTimeSuffix: string;
    /** Filter pills "All articles" tab. */
    allLabel: string;
    /** Eyebrow over the featured (hero) card. */
    featuredEyebrow: string;
    /** CTA on the featured card. */
    featuredCta: string;
    /** Label for the most-read articles section. */
    mostReadLabel: string;
    /** Most-read articles (static curation, updated manually). */
    mostReadArticles: { title: string; href: string; category: string }[];
    cards: { title: string; href: string; image: string }[];
  }
> = {
  fr: {
    resourcesLabel: "Ressources",
    resourcesHref: "/ressources",
    breadcrumbLabel: "Blog",
    h1: "Le journal d’Iter Advisors",
    intro:
      "Guides, comparatifs et retours d’expérience pour fondateurs et CFOs. Écrit par notre équipe, mis à jour chaque mois.",
    discover: "Lire l’article",
    discoverByKind: {
      guide: "Lire le guide",
      comparison: "Voir le comparatif",
      caseStudy: "Lire le cas pratique",
      analysis: "Lire l’analyse",
    },
    readTimeSuffix: "min de lecture",
    allLabel: "Tous",
    featuredEyebrow: "À la une",
    featuredCta: "Lire l’article",
    mostReadLabel: "Les articles les plus lus",
    mostReadArticles: [
      { title: "Combien coûte un DAF externalisé en 2026 ?", href: "/ressources/blog/cout-daf-externalise-tarifs-prix-2026", category: "DAF externalisé" },
      { title: "DAF externalisé vs DAF salarié : analyse complète", href: "/ressources/blog/daf-externalise-vs-daf-salarie", category: "DAF externalisé" },
      { title: "Checklist due diligence : préparation financière pour la levée de fonds", href: "/ressources/blog/checklist-due-diligence-levee-de-fonds", category: "Levée de fonds" },
      { title: "Cash burn : calculer son runway et anticiper sa levée de fonds", href: "/ressources/blog/cash-burn-calculer-runway-anticiper-levee", category: "Levée de fonds" },
      { title: "Régimes fiscaux : France vs Espagne — Comparaison complète 2026", href: "/ressources/blog/regimes-fiscaux-france-vs-espagne", category: "Fiscalité" },
    ],
    cards: [
      {
        title: "Les 10 outils pour les CFOs en start-up",
        href: "/ressources/blog/les-10-outils-pour-cfos-startup",
        image: "/images/blog/covers/les-10-outils-pour-cfos-startup.svg",
      },
      {
        title:
          "Flux de trésorerie : définition et importance pour les entreprises",
        href: "/ressources/blog/flux-de-tresorerie",
        image: "/images/blog/flux-de-tresorerie.webp",
      },
      {
        title: "La modernisation du rôle de CFO",
        href: "/ressources/blog/la-modernisation-du-role-de-cfo",
        image: "/images/blog/modernisation-cfo.webp",
      },
    ],
  },
  en: {
    resourcesLabel: "Resources",
    resourcesHref: "/en/ressources",
    breadcrumbLabel: "Blog",
    h1: "The Iter Advisors journal",
    intro:
      "Guides, comparisons and field notes for founders and CFOs. Written by our team of practising fractional CFOs, updated every month. Topics include outsourced CFO models, cash flow management, fundraising strategy, due diligence preparation, financial tool selection, SaaS KPIs, and HR outsourcing — all grounded in real client situations across France, Spain, and Belgium.",
    discover: "Read the article",
    discoverByKind: {
      guide: "Read the guide",
      comparison: "See the comparison",
      caseStudy: "Read the case study",
      analysis: "Read the analysis",
    },
    readTimeSuffix: "min read",
    allLabel: "All",
    featuredEyebrow: "Featured",
    featuredCta: "Read the article",
    mostReadLabel: "Most-read articles",
    mostReadArticles: [
      { title: "Fractional CFO cost in 2026: pricing, packages and ROI", href: "/en/ressources/blog/cout-daf-externalise-tarifs-prix-2026", category: "Fractional CFO" },
      { title: "Fractional CFO vs full-time CFO: complete comparison", href: "/en/ressources/blog/daf-externalise-vs-daf-salarie", category: "Fractional CFO" },
      { title: "Due diligence checklist: financial preparation for fundraising", href: "/en/ressources/blog/checklist-due-diligence-levee-de-fonds", category: "Fundraising" },
      { title: "Cash burn: calculate your runway and prepare your raise", href: "/en/ressources/blog/cash-burn-calculer-runway-anticiper-levee", category: "Fundraising" },
      { title: "Tax regimes: France vs Spain — Full comparison 2026", href: "/en/ressources/blog/regimes-fiscaux-france-vs-espagne", category: "Tax" },
    ],
    cards: [
      {
        title:
          "AI and automation of repetitive tasks in the Finance department",
        href: "/en/ressources/blog",
        image: "/images/blog/ia-automatisation.webp",
      },
      {
        title: "Organizing your finance department",
        href: "/en/ressources/blog/organiser-sa-direction-financiere",
        image: "/images/blog/organiser-direction-financiere.webp",
      },
      {
        title: "Essential financial tech tools",
        href: "/en/ressources/blog/essentiels-outils-tech-finance",
        image: "/images/blog/outils-tech-finance.webp",
      },
    ],
  },
  es: {
    resourcesLabel: "Recursos",
    resourcesHref: "/es/recursos",
    breadcrumbLabel: "Blog",
    h1: "La revista de Iter Advisors",
    intro:
      "Guías, comparativas y aprendizajes para fundadores y CFOs. Escrito por nuestro equipo, actualizado cada mes.",
    discover: "Leer el artículo",
    discoverByKind: {
      guide: "Leer la guía",
      comparison: "Ver la comparativa",
      caseStudy: "Leer el caso práctico",
      analysis: "Leer el análisis",
    },
    readTimeSuffix: "min de lectura",
    allLabel: "Todos",
    featuredEyebrow: "Destacado",
    featuredCta: "Leer el artículo",
    mostReadLabel: "Los artículos más leídos",
    mostReadArticles: [
      { title: "¿Cuánto cuesta un DAF externalizado en 2026?", href: "/es/recursos/blog/cout-daf-externalise-tarifs-prix-2026", category: "DAF externalizado" },
      { title: "DAF externalizado vs DAF asalariado: análisis completo", href: "/es/recursos/blog/daf-externalise-vs-daf-salarie", category: "DAF externalizado" },
      { title: "Checklist due diligence: preparación financiera para la ronda de inversión", href: "/es/recursos/blog/checklist-due-diligence-levee-de-fonds", category: "Inversión" },
      { title: "Cash burn: calcular el runway y anticipar la ronda", href: "/es/recursos/blog/cash-burn-calculer-runway-anticiper-levee", category: "Inversión" },
      { title: "Regímenes fiscales: Francia vs España — Comparativa completa 2026", href: "/es/recursos/blog/regimes-fiscaux-france-vs-espagne", category: "Fiscalidad" },
    ],
    cards: [
      {
        title:
          "IA y automatización de tareas repetitivas en el departamento de Finanzas",
        href: "/es/recursos/blog",
        image: "/images/blog/ia-automatisation.webp",
      },
      {
        title: "Organizar su departamento financiero",
        href: "/es/recursos/blog/organiser-sa-direction-financiere",
        image: "/images/blog/organiser-direction-financiere.webp",
      },
      {
        title: "Las herramientas tecnológicas esenciales para las finanzas",
        href: "/es/recursos/blog/essentiels-outils-tech-finance",
        image: "/images/blog/outils-tech-finance.webp",
      },
    ],
  },
};

const blogBasePath = "/ressources/blog";

function getBlogHref(locale: Locale, slug: string): string {
  return getLocalePath(locale, `${blogBasePath}/${slug}`);
}

/* ── Card-format heuristics ──────────────────────────────────────────── */
function inferKind(
  title: string,
  category: string
): keyof (typeof content)["fr"]["discoverByKind"] {
  const t = title.toLowerCase();
  const c = category.toLowerCase();
  if (t.includes("vs ") || t.includes(" vs") || t.includes("comparatif")) return "comparison";
  if (t.includes("cas client") || t.includes("cas-etude") || t.includes("case study") || c.includes("cas-etude")) return "caseStudy";
  if (t.includes("checklist") || t.includes("guide") || t.includes("comment ") || t.startsWith("les ")) return "guide";
  return "analysis";
}

function formatDate(iso: string | undefined, locale: Locale): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const localeTag: Record<Locale, string> = {
    fr: "fr-FR",
    en: "en-GB",
    es: "es-ES",
  };
  return d.toLocaleDateString(localeTag[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const CATEGORY_LABEL_FR: Record<string, string> = {
  "daf-externalise": "DAF externalisé",
  "DAF externalisé": "DAF externalisé",
  "levee-de-fonds": "Levée de fonds",
  "Levee de fonds": "Levée de fonds",
  "outils-stack": "Outils & stack",
  "Outils & stack": "Outils & stack",
  "cas-etudes": "Cas pratiques",
  "gestion-financiere": "Gestion financière",
  "Gestion financière": "Gestion financière",
  "guides-pratiques": "Guides pratiques",
  "thought-leadership": "Tribune",
  "rh-paie": "RH & Paie",
  Externalisation: "Externalisation",
  "Fiscalité internationale": "Fiscalité",
};

function categoryLabel(raw: string | undefined): string | null {
  if (!raw) return null;
  return CATEGORY_LABEL_FR[raw] ?? raw;
}

export default function BlogListingPage({
  locale,
  articles,
  cmsNavigation,
}: {
  locale: Locale;
  articles?: StrapiBlogArticle[] | null;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = content[locale];

  // Convert StrapiBlogArticle[] into the shape consumed by the client
  // components. We do this here (RSC) so the client never sees the raw
  // Strapi shape and we keep typing tight.
  const fullCards =
    articles && articles.length > 0
      ? articles.map((a) => {
          const imageUrl = a.featuredImage?.url
            ? strapiMediaUrl(a.featuredImage)
            : "";
          const alt =
            (a.featuredImage as unknown as { alternativeText?: string })
              ?.alternativeText || a.title;
          const kind = inferKind(a.title, a.category ?? "");
          return {
            title: a.title,
            href: getBlogHref(locale, a.slug),
            image: imageUrl || "/images/og-default.webp", // Ahrefs T-404 (2026-06-08): placeholder.webp missing → og-default
            alt,
            category: categoryLabel(a.category),
            date: formatDate(a.publishedDate, locale),
            readMinutes: a.readMinutes,
            ctaLabel: t.discoverByKind[kind] ?? t.discover,
            excerpt: a.excerpt ?? "",
          };
        })
      : t.cards.map((c) => ({
          title: c.title,
          href: c.href,
          image: c.image,
          alt: c.title,
          category: null as string | null,
          date: null as string | null,
          readMinutes: undefined as number | undefined,
          ctaLabel: t.discover,
          excerpt: "",
        }));

  // Featured slot = newest article (cards are already sorted by
  // publishedDate desc in getStaticBlogListing). No URL duplication —
  // we just style the first card differently and remove it from the
  // grid below so the visitor doesn't see it twice.
  const featured = fullCards[0];
  const rest = fullCards.slice(1);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      <section className="bg-background pt-32 pb-12 lg:pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: t.resourcesLabel, href: t.resourcesHref },
              { label: t.breadcrumbLabel },
            ]}
          />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
            {t.h1}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Most-read articles strip */}
      <section className="bg-muted/40 border-y border-border py-8">
        <div className="container">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            {t.mostReadLabel}
          </p>
          <ul className="flex flex-wrap gap-2">
            {t.mostReadArticles.map((article) => (
              <li key={article.href}>
                <a
                  href={article.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:border-iter-violet hover:text-iter-violet transition-colors"
                >
                  <span className="text-xs font-medium text-muted-foreground">
                    {article.category}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background pb-24 lg:pb-16">
        <div className="container">
          {featured && (
            <BlogFeaturedCard
              data={{
                title: featured.title,
                href: featured.href,
                image: featured.image,
                alt: featured.alt,
                category: featured.category,
                date: featured.date,
                readMinutes: featured.readMinutes,
                excerpt: featured.excerpt,
              }}
              cta={t.featuredCta}
              eyebrow={t.featuredEyebrow}
              readTimeSuffix={t.readTimeSuffix}
            />
          )}
          <BlogFilterableGrid
            cards={rest}
            allLabel={t.allLabel}
            readTimeSuffix={t.readTimeSuffix}
          />
        </div>
      </section>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
