import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { getCmsNavigation } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import References from "@/components/References";
import ArticleTOC, { type TocHeading } from "@/components/blog/ArticleTOC";
import { getFiscaliteReferences, type ExternalReference } from "@/lib/content/references";
import { faqPageSchema } from "@/lib/schemas";

/**
 * Gabarit partagé des piliers « Fiscalité Espagne France ».
 *
 * REDESIGN-01 (2026-09-01) — quatre des cinq piliers déversaient leur
 * htmlContent dans un `<div class="prose prose-sm">` : le plugin Tailwind
 * Typography n'étant pas installé, ces classes ne font rien. Les H2 se
 * rendaient en corps de texte, les listes sans puces, les tableaux sans
 * bordure — sur les pages qui portent le plus de trafic organique du site
 * (double-imposition seule : 14 000 impressions sur 90 jours).
 *
 * Le pilier Beckham, réécrit à la main le 2 août, avait le bon dessin :
 * chapô, image, bandeau de chiffres clés, encadré « L'essentiel »,
 * sommaire collant, FAQ, CTA, articles liés. Ce composant en fait le
 * gabarit commun — le corps accepte soit un `html` (déjà transformé par
 * lib/blog-html-transform + lib/blog-toc#injectHeadingIds) rendu dans la
 * typographie `.prose-iter-blog` du blog, soit des `children` JSX.
 *
 * Contrat SEO : Article (author Person relié, dateModified réelle, image)
 * + FAQPage générés depuis les mêmes données que le visible ; byline
 * `rel="author"` ; sources via <References>. La garde E-E-A-T de
 * scripts/audit-seo.mjs vérifie tout cela sur chaque page.
 */

export const FISCALITE_HUB = "/ressources/fiscalite-espagne-france";
const SITE = "https://www.iteradvisors.com";

export interface GuideFaqItem {
  question: string;
  answer: string;
}
export interface GuideKpi {
  value: string;
  label: string;
}
export interface GuideRelated {
  href: string;
  img: string;
  alt: string;
  title: string;
}

export interface GuideFiscalPageProps {
  path: string;
  breadcrumbLabel: string;
  h1: string;
  /** Headline du schéma Article — par défaut le H1. */
  headline?: string;
  description: string;
  author: { name: string; url: string };
  publishedDate: string;
  modifiedDate: string;
  /** Date de mise à jour telle qu'affichée (« 1er septembre 2026 »). */
  modifiedLabel: string;
  /** Pastille de fraîcheur (« Mis à jour en septembre 2026 »). */
  badge: string;
  readMinutes?: number;
  dek: ReactNode;
  heroImage: { src: string; alt: string };
  kpis: GuideKpi[];
  essentiel: { title: string; items: ReactNode[] };
  /** Titres du corps uniquement : le gabarit ajoute « L'essentiel » et la FAQ. */
  toc: TocHeading[];
  html?: string;
  children?: ReactNode;
  faqTitle: string;
  faq: GuideFaqItem[];
  cta: { title: string; text: string; footnote?: ReactNode };
  related: GuideRelated[];
  /** Sources : soit une clé du registre fiscalité, soit une liste explicite. */
  referencesKey?: Parameters<typeof getFiscaliteReferences>[0];
  references?: ExternalReference[];
  /** Hub parent (fil d'Ariane + isPartOf). Fiscalité par défaut. */
  hub?: { label: string; href: string };
}

export default async function GuideFiscalPage({
  path,
  breadcrumbLabel,
  h1,
  headline,
  description,
  author,
  publishedDate,
  modifiedDate,
  modifiedLabel,
  badge,
  readMinutes,
  dek,
  heroImage,
  kpis,
  essentiel,
  toc,
  html,
  children,
  faqTitle,
  faq,
  cta,
  related,
  referencesKey,
  references,
  hub = { label: "Fiscalité Espagne France", href: FISCALITE_HUB },
}: GuideFiscalPageProps) {
  const cmsNavigation = await getCmsNavigation("fr");
  const pageUrl = `${SITE}${path}`;
  const refs = references ?? (referencesKey ? getFiscaliteReferences(referencesKey) : []);

  const headings: TocHeading[] = [
    { id: "essentiel", level: 2, label: essentiel.title },
    ...toc,
    { id: "faq", level: 2, label: faqTitle },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        url: pageUrl,
        headline: headline ?? h1,
        description,
        image: heroImage.src,
        datePublished: publishedDate,
        dateModified: modifiedDate,
        inLanguage: "fr-FR",
        author: {
          "@type": "Person",
          name: author.name,
          url: `${SITE}${author.url}`,
        },
        publisher: { "@id": `${SITE}/#organization` },
        isPartOf: {
          "@type": "CollectionPage",
          "@id": `${SITE}${hub.href}#collection`,
        },
      },
      faqPageSchema(faq),
      // Pas de BreadcrumbList à la main : <Breadcrumb> en émet déjà un.
    ],
  };

  const kpiCols =
    kpis.length >= 4 ? "sm:grid-cols-4" : kpis.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ─── Hero : fil d'Ariane, H1, fraîcheur + byline, chapô, image ─── */}
      <section className="bg-background pt-32 pb-8 sm:pb-10">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale="fr"
            items={[
              { label: "Ressources", href: "/ressources" },
              { label: hub.label, href: hub.href },
              { label: breadcrumbLabel },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-5 mt-4 sm:mt-6 leading-tight text-balance">
            {h1}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-iter-violet/5 px-3 py-1 text-sm font-medium text-iter-violet">
              <CheckCircle2 size={16} aria-hidden />
              {badge}
            </span>
            <span className="text-xs text-muted-foreground">
              Par{" "}
              <Link href={author.url} rel="author" className="text-iter-violet hover:underline">
                {author.name}
              </Link>
              {" · "}
              <time dateTime={modifiedDate}>{modifiedLabel}</time>
              {readMinutes ? (
                <>
                  {" · "}
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} aria-hidden />
                    {readMinutes} min de lecture
                  </span>
                </>
              ) : null}
            </span>
          </div>

          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-8">{dek}</p>

          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>

          {/* Chiffres clés */}
          {kpis.length > 0 && (
            <div className={`my-8 grid grid-cols-2 gap-3 ${kpiCols}`}>
              {kpis.map((k) => (
                <div
                  key={k.label}
                  className="rounded-2xl border border-border/60 bg-background p-4 text-center"
                >
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-iter-violet tabular-nums text-balance">
                    {k.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{k.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* L'essentiel — la réponse directe avant le développement */}
          <aside
            id="essentiel"
            className="scroll-mt-24 rounded-2xl border-l-4 border-iter-violet bg-iter-violet/5 p-6"
          >
            <h2 className="mb-3 flex items-center gap-2 font-heading text-xl font-semibold text-iter-violet">
              <Sparkles size={20} aria-hidden />
              {essentiel.title}
            </h2>
            <ul className="space-y-2 text-sm sm:text-base text-foreground/80 leading-relaxed list-disc pl-5 marker:text-iter-violet">
              {essentiel.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ─── Corps + sommaire collant ─── */}
      <section className="bg-background py-8 sm:py-10">
        <div className="container">
          <div className="flex flex-col xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-12 max-w-6xl mx-auto">
            <div className="order-1 xl:order-none xl:col-start-2 xl:row-start-1">
              <ArticleTOC locale="fr" headings={headings} />
            </div>
            <div
              data-article-body
              className="prose-iter-blog max-w-[72ch] order-2 xl:order-none xl:col-start-1 xl:row-start-1"
            >
              {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : children}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ : visible et JSON-LD générés depuis le même tableau ─── */}
      <section className="bg-background py-10 sm:py-14">
        <div className="container max-w-3xl">
          <div id="faq" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 leading-tight">
              {faqTitle}
            </h2>
            <div className="space-y-3">
              {faq.map((q) => (
                <details key={q.question} className="group rounded-lg border border-border/60 bg-background">
                  <summary className="cursor-pointer p-4 sm:p-5 font-semibold text-foreground flex items-start justify-between gap-3 list-none">
                    <h3 className="text-base sm:text-lg font-heading m-0">{q.question}</h3>
                    <span
                      aria-hidden
                      className="text-iter-violet shrink-0 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <p>{q.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-background pb-10">
        <div className="container max-w-3xl">
          <div className="rounded-3xl bg-iter-dark p-8 sm:p-10 text-white">
            <p className="font-heading text-2xl font-semibold mb-2">{cta.title}</p>
            <p className="text-white/70 max-w-xl leading-relaxed mb-5">{cta.text}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-iter-violet px-6 py-3 font-heading font-semibold text-white hover:bg-iter-violet/90 transition-all duration-300"
            >
              Demander un diagnostic
              <ArrowRight size={16} aria-hidden />
            </Link>
            {cta.footnote && <p className="mt-4 text-sm text-white/50">{cta.footnote}</p>}
          </div>
        </div>
      </section>

      {/* ─── Articles liés ─── */}
      {related.length > 0 && (
        <section className="bg-background pb-14">
          <div className="container max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-5">
              Pour aller plus loin
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group block rounded-2xl border border-border/60 overflow-hidden hover:border-iter-violet/50 hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[16/9] bg-muted">
                    <Image
                      src={c.img}
                      alt={c.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 360px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-foreground leading-snug group-hover:text-iter-violet transition-colors">
                      {c.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {refs.length > 0 && <References locale="fr" refs={refs} />}

      <CTASection locale="fr" />
    </PageLayout>
  );
}
