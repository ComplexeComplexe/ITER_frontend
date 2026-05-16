import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getLocalePath } from "@/lib/i18n";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { strapiMediaUrl } from "@/lib/strapi";
import type { StrapiBlogArticle, CmsNavItem } from "@/lib/strapi";

/* ───────────────────────────────────────────────────────────────────────
 *  Per-locale UI strings.
 *
 *  Editorial pass (mai 2026 — design critique) :
 *  - the previous H1 "Nos articles" + tagline ("Retrouvez toutes les
 *    actualités…") was generic and signalled nothing about the angle.
 *  - new H1 names the publication as a journal, the deck announces who
 *    it is for and what cadence to expect, and the per-card CTA varies
 *    so 27 buttons no longer all say "Lire l'article".
 * ─────────────────────────────────────────────────────────────────── */
const content: Record<
  Locale,
  {
    resourcesLabel: string;
    resourcesHref: string;
    breadcrumbLabel: string;
    h1: string;
    intro: string;
    /** Default CTA for cards that don't match a more specific format. */
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
      "Guides, comparisons and field notes for founders and CFOs. Written by our team, updated every month.",
    discover: "Read the article",
    discoverByKind: {
      guide: "Read the guide",
      comparison: "See the comparison",
      caseStudy: "Read the case study",
      analysis: "Read the analysis",
    },
    readTimeSuffix: "min read",
    cards: [
      {
        title:
          "AI and automation of repetitive tasks in the Finance department",
        href: "/en/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance",
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
    resourcesHref: "/es/ressources",
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
    cards: [
      {
        title:
          "IA y automatización de tareas repetitivas en el departamento de Finanzas",
        href: "/es/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance",
        image: "/images/blog/ia-automatisation.webp",
      },
      {
        title: "Organizar su departamento financiero",
        href: "/es/ressources/blog/organiser-sa-direction-financiere",
        image: "/images/blog/organiser-direction-financiere.webp",
      },
      {
        title: "Las herramientas tecnológicas esenciales para las finanzas",
        href: "/es/ressources/blog/essentiels-outils-tech-finance",
        image: "/images/blog/outils-tech-finance.webp",
      },
    ],
  },
};

const blogBasePath = "/ressources/blog";

function getBlogHref(locale: Locale, slug: string): string {
  return getLocalePath(locale, `${blogBasePath}/${slug}`);
}

/* ── Card-format heuristics ────────────────────────────────────────────
 *
 * Pick a more specific CTA than the generic "Read the article" based on
 * the article's category and title. This is purely a UX-copy improvement
 * (one of the items flagged by the May 2026 critique); article ranking
 * and structure are untouched.
 */
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

/* ── Date formatter (locale-aware short form: "13 mai 2026") ───────── */
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

/* ── Category → display label normalisation ────────────────────────────
 *
 * The codebase has two coexisting category naming conventions (slug-style
 * "daf-externalise" and display-style "DAF externalisé"). We pick the
 * display style for surface UI and map slugs through this table — keeps
 * the listing visually coherent without rewriting every article entry.
 */
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
  // Source articles are assembled by `lib/blog-listing.ts` from the
  // static blog-posts.ts source. Each article carries its editorial
  // cover URL plus a per-article alt text on `featuredImage`, plus
  // optional readMinutes / category / publishedDate used below.
  const cards =
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
            image: imageUrl || "/images/blog/placeholder.webp",
            alt,
            category: categoryLabel(a.category),
            date: formatDate(a.publishedDate, locale),
            readMinutes: a.readMinutes,
            ctaLabel: t.discoverByKind[kind] ?? t.discover,
          };
        })
      : t.cards.map((c) => ({
          ...c,
          alt: c.title,
          category: null as string | null,
          date: null as string | null,
          readMinutes: undefined as number | undefined,
          ctaLabel: t.discover,
        }));

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      <section className="bg-background pt-32 pb-16">
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

      <section className="bg-background py-24 lg:py-16">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <Link key={i} href={card.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-5 bg-muted">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 block">
                  {card.category ?? "Blog"}
                </span>
                <h3 className="text-lg font-semibold font-heading group-hover:text-iter-violet transition-colors leading-snug">
                  {card.title}
                </h3>
                {(card.date || card.readMinutes) && (
                  <p className="mt-2 text-xs text-foreground/55 font-medium">
                    {card.date}
                    {card.date && card.readMinutes ? " · " : ""}
                    {card.readMinutes
                      ? `${card.readMinutes} ${t.readTimeSuffix}`
                      : ""}
                  </p>
                )}
                <span className="inline-flex items-center gap-2 mt-3 text-[13px] font-medium text-foreground/40 group-hover:text-iter-violet transition-colors">
                  {card.ctaLabel}
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
