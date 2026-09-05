import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/navigation";
import { GlossaryEntryContent } from "@/lib/content/glossary-entries";
import { glossaryHref } from "@/lib/path-localization";
import {
  GLOSSARY_AUTHOR,
  GLOSSARY_MODIFIED,
  GLOSSARY_MODIFIED_LABEL,
  getRelatedGlossary,
} from "@/lib/glossary-links";
import type { CmsNavItem } from "@/lib/static-content";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

/**
 * Fiche du glossaire.
 *
 * REDESIGN-P3 (2026-09-01) — la fiche empilait ses sections en bandes pleine
 * largeur alternées, avec 96 à 128 px de marge chacune : une définition de
 * 700 mots s'étirait sur quatre écrans, sans auteur, sans date, sans lien
 * vers les autres termes. Désormais : la définition en une phrase répond en
 * tête (c'est ce qu'un moteur — classique ou génératif — extrait), byline
 * rel="author", corps dans la typographie éditoriale du site, termes liés,
 * et les articles où le terme apparaît.
 */

interface GlossaryEntryPageProps {
  locale: Locale;
  content: GlossaryEntryContent;
  cmsNavigation?: CmsNavItem[];
  /** Slug de la fiche — sert aux termes liés. */
  slug?: string;
  /** Articles du blog où le terme apparaît (calculés côté serveur). */
  mentions?: { href: string; title: string }[];
}

const STRINGS: Record<
  Locale,
  {
    eyebrow: string;
    glossary: string;
    by: string;
    updated: string;
    inOneSentence: string;
    related: string;
    mentions: string;
    cta: string;
    ctaTitle: string;
    ctaText: string;
  }
> = {
  fr: {
    eyebrow: "Glossaire finance",
    glossary: "Glossaire",
    by: "Par",
    updated: "Mis à jour le",
    inOneSentence: "En une phrase",
    related: "Termes liés",
    mentions: "Où ce terme apparaît dans nos articles",
    cta: "Prendre rendez-vous",
    ctaTitle: "Ce terme pèse dans votre pilotage ?",
    ctaText:
      "Nos DAF externalisés le mesurent et le suivent chaque mois chez leurs clients. Premier échange offert de 30 minutes.",
  },
  en: {
    eyebrow: "Finance glossary",
    glossary: "Glossary",
    by: "By",
    updated: "Updated on",
    inOneSentence: "In one sentence",
    related: "Related terms",
    mentions: "Where this term appears in our articles",
    cta: "Make an appointment",
    ctaTitle: "Does this metric matter to your business?",
    ctaText: "Our fractional CFOs measure and track it monthly for their clients. First 30-minute call is free.",
  },
  es: {
    eyebrow: "Glosario financiero",
    glossary: "Glosario",
    by: "Por",
    updated: "Actualizado el",
    inOneSentence: "En una frase",
    related: "Términos relacionados",
    mentions: "Dónde aparece este término en nuestros artículos",
    cta: "Concierte una cita",
    ctaTitle: "¿Este indicador pesa en su gestión?",
    ctaText: "Nuestros CFO externalizados lo miden y siguen cada mes. Primera llamada de 30 minutos gratuita.",
  },
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const md = {
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <Link href={href || "#"}>{children}</Link>
  ),
};

export default function GlossaryEntryPage({
  locale,
  content,
  cmsNavigation,
  slug,
  mentions = [],
}: GlossaryEntryPageProps) {
  const t = STRINGS[locale];
  const [first, ...rest] = content.sections;
  const [definition, ...firstRest] = first?.content ?? [];
  const related = slug ? getRelatedGlossary(locale, slug) : [];

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      <section className="bg-background pt-32 pb-8 sm:pb-10">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale={locale}
            items={[{ label: t.glossary, href: glossaryHref(locale) }, { label: content.h1 }]}
          />
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-iter-violet">{t.eyebrow}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-5 mt-2 leading-tight text-balance">
            {content.h1}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-iter-violet/5 px-3 py-1 text-sm font-medium text-iter-violet">
              <CheckCircle2 size={16} aria-hidden />
              {t.updated} {GLOSSARY_MODIFIED_LABEL[locale]}
            </span>
            <span className="text-xs text-muted-foreground">
              {t.by}{" "}
              <Link href={GLOSSARY_AUTHOR.url} rel="author" className="text-iter-violet hover:underline">
                {GLOSSARY_AUTHOR.name}
              </Link>
              {" · "}
              <time dateTime={GLOSSARY_MODIFIED}>{GLOSSARY_MODIFIED_LABEL[locale]}</time>
            </span>
          </div>

          {definition && (
            <aside className="rounded-2xl border-l-4 border-iter-violet bg-iter-violet/5 p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-iter-violet">
                {t.inOneSentence}
              </p>
              <div className="text-base sm:text-lg text-foreground/85 leading-relaxed [&_p]:m-0 [&_strong]:text-foreground [&_a]:text-iter-violet [&_a]:underline">
                <ReactMarkdown components={md}>{definition}</ReactMarkdown>
              </div>
            </aside>
          )}
        </div>
      </section>

      <section className="bg-background py-8 sm:py-10">
        <div className="container max-w-3xl">
          <div className="prose-iter-blog max-w-[72ch]">
            {firstRest.map((p, j) => (
              <ReactMarkdown key={`intro-${j}`} components={md}>
                {p}
              </ReactMarkdown>
            ))}
            {rest.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 id={slugify(section.heading)}>{section.heading}</h2>
                )}
                {section.content.map((p, j) => (
                  <ReactMarkdown key={j} components={md}>
                    {p}
                  </ReactMarkdown>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>

      {(related.length > 0 || mentions.length > 0) && (
        <section className="bg-background pb-10">
          <div className="container max-w-3xl grid gap-6 sm:grid-cols-2">
            {related.length > 0 && (
              <div className="rounded-3xl border border-border/60 bg-muted/30 p-6">
                <p className="text-base font-semibold text-foreground mb-3">{t.related}</p>
                <ul className="space-y-2 list-none pl-0">
                  {related.map((r) => (
                    <li key={r.slug} className="flex gap-2.5 text-sm sm:text-base">
                      <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                      <Link href={`${glossaryHref(locale)}/${r.slug}`} className="text-iter-violet hover:underline">
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {mentions.length > 0 && (
              <div className="rounded-3xl border border-border/60 bg-muted/30 p-6">
                <p className="text-base font-semibold text-foreground mb-3">{t.mentions}</p>
                <ul className="space-y-2 list-none pl-0">
                  {mentions.map((m) => (
                    <li key={m.href} className="flex gap-2.5 text-sm sm:text-base">
                      <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                      <Link href={m.href} className="text-iter-violet hover:underline">
                        {m.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="bg-background pb-14">
        <div className="container max-w-3xl">
          <aside className="rounded-3xl bg-iter-violet/5 border-l-4 border-iter-violet p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-2">{t.ctaTitle}</p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">{t.ctaText}</p>
            <Link
              href={BOOKING_URL}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-violet text-white font-semibold hover:bg-iter-violet/90 transition-all duration-300"
            >
              {t.cta}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </aside>
        </div>
      </section>

      <TestimonialsSection locale={locale} />
      <CTASection locale={locale} />
    </PageLayout>
  );
}
