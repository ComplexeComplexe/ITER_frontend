import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import BlogPostPageRefonte from "./BlogPostPageRefonte";
import { ProseTable } from "@/components/blog";
import { getCmsNavigation } from "@/lib/static-content";
import { taxComparison, TAX_COMPARISON_MODIFIED, TAX_COMPARISON_PATHS, TAX_COMPARISON_SLUG, TAX_SOURCES } from "@/lib/content/tax-comparison";

type TaxLocale = keyof typeof taxComparison;
const BASE = "https://www.iteradvisors.com";

export function taxComparisonMetadata(locale: TaxLocale): Metadata {
  const t = taxComparison[locale];
  return {
    title: t.title, description: t.description,
    alternates: { canonical: BASE + TAX_COMPARISON_PATHS[locale], languages: {
      "fr-FR": BASE + TAX_COMPARISON_PATHS.fr,
      "es-ES": BASE + TAX_COMPARISON_PATHS.es,
      "x-default": BASE + TAX_COMPARISON_PATHS.fr,
    } },
    robots: { index: true, follow: true },
    openGraph: { title: t.title, description: t.description, type: "article", images: [{ url: "/images/og-logo.png", alt: t.title }] },
  };
}

export default async function TaxComparisonPage({ locale }: { locale: TaxLocale }) {
  const t = taxComparison[locale];
  const fr = locale === "fr";
  const resourcesHref = fr ? "/ressources" : "/es/recursos";
  const usedSources = [...new Set(t.sections.flatMap(section => section.sources ?? []))];
  return <BlogPostPageRefonte
    locale={locale} cmsNavigation={await getCmsNavigation(locale)}
    breadcrumbs={{ resourcesLabel: fr ? "Ressources" : "Recursos", resourcesHref, blogLabel: "Blog", blogHref: `${resourcesHref}/blog` }}
    slug={TAX_COMPARISON_SLUG} category={t.category} title={t.title} dek={t.description}
    author={{ name: "Benjamin Ziza", avatar: "/images/team/benjamin-ziza.webp", jobTitle: t.authorRole, url: fr ? "/a-propos/benjamin-ziza" : "/es/quienes-somos/benjamin-ziza" }}
    readingTime={7} datePublished={fr ? "2026-08-31T00:00:00Z" : "2026-07-25T00:00:00Z"} dateModified={`${TAX_COMPARISON_MODIFIED}T00:00:00Z`}
    heroImage="/images/blog/covers/regimes-fiscaux-france-vs-espagne.svg"
    toc={[...t.sections.map(section => ({ id: section.id, label: section.title })), { id: "faq", label: "FAQ" }, { id: "sources", label: t.sourcesLabel }]}
    tldr={t.summary} metaDescription={t.description} faqItems={t.faq}
    relatedArticles={[{ url: t.cta.serviceHref, category: fr ? "Direction financière" : "Dirección financiera", title: t.cta.serviceLabel }, { url: fr ? "/ressources/fiscalite/beckham-law" : "/es/services/ley-beckham", category: t.category, title: fr ? "Régime Beckham : conditions et limites" : "Ley Beckham: requisitos y límites" }]}
  >
    <p className="text-sm text-muted-foreground">{t.checked}</p>
    {t.sections.map(section => <section key={section.id}>
      <h2 id={section.id}>{section.title}</h2>
      {section.paragraphs.map(paragraph => <ReactMarkdown key={paragraph} components={{ a: ({ href, children }) => href?.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href}>{children}</a> }}>{paragraph}</ReactMarkdown>)}
      {section.table && <ProseTable>
        <caption className="text-left text-sm mb-3">{section.table.caption}</caption>
        <thead><tr>{section.table.headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
        <tbody>{section.table.rows.map(row => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={index} scope="row">{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody>
      </ProseTable>}
      {section.sources && <p className="text-sm">{t.sourcesLabel} : {section.sources.map((source, index) => <span key={source}>{index > 0 && " · "}<a href={TAX_SOURCES[source]}>{t.sourceLabels[source]}</a></span>)}</p>}
    </section>)}
    <h2 id="faq">{fr ? "Questions fréquentes" : "Preguntas frecuentes"}</h2>
    {t.faq.map(item => <section key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></section>)}
    <h2>{t.cta.title}</h2><p>{t.cta.text}</p>
    <p><Link href={t.cta.serviceHref}>{t.cta.serviceLabel}</Link> · <Link href={t.cta.contactHref}>{t.cta.contactLabel}</Link></p>
    <h2 id="sources">{t.sourcesLabel}</h2>
    <ul>{usedSources.map(source => <li key={source}><a href={TAX_SOURCES[source]}>{t.sourceLabels[source]}</a></li>)}</ul>
  </BlogPostPageRefonte>;
}
