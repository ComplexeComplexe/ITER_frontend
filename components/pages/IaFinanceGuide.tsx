import FinanceExpert from "@/components/FinanceExpert";
import Link from "@/components/PublishedLocaleLink";
import type { Locale } from "@/lib/i18n";
import { parityHref } from "@/lib/locale-route-map";
import { iaText } from "@/lib/content/ia-finance-interface";
import { getIaGuide, iaHub, iaGuideHref, iaReference } from "@/lib/content/ia-finance-locales";
import ReportingKit from "@/components/finance/ReportingKit";
import ReportingRoi from "@/components/finance/ReportingRoi";
import GuideFiscalPage from "./GuideFiscalPage";
import { IA_FINANCE_AUTHOR } from "@/lib/content/ia-finance-references";

/** Server-rendered editorial guides with isolated interactive exercises. */
export default function IaFinanceGuide({ slug, locale = "fr" }: { slug: string; locale?: Locale }) {
  const guide = getIaGuide(locale, slug);
  const t = (source: string) => iaText(locale, source);
  const hasKit = ["automatiser-reporting-financier", "chatgpt-finance"].includes(slug);
  const hasCalculator = slug === "automatiser-reporting-financier";
  const context = hasCalculator ? "ia-reporting" : slug === "chatgpt-finance" ? "ia-chatgpt" : "ia-finance";
  return <GuideFiscalPage
    locale={locale}
    hub={iaHub(locale)}
    path={iaGuideHref(slug, locale)}
    breadcrumbLabel={guide.label}
    h1={guide.title}
    description={guide.description}
    author={IA_FINANCE_AUTHOR}
    publishedDate={locale === "fr" ? guide.published : "2026-10-02"}
    modifiedDate={locale === "fr" ? (hasKit ? "2026-09-30" : "2026-09-05") : "2026-10-02"}
    modifiedLabel={locale === "fr" ? (hasKit ? "30 septembre 2026" : "5 septembre 2026") : (locale === "en" ? "2 October 2026" : "2 de octubre de 2026")}
    badge={t("Cas et sources actualisés")}
    dek={guide.dek}
    heroImage={{ src: guide.image, alt: t("Tableaux de bord et analyse de données financières") }}
    kpis={[]}
    essentiel={{title:t("À retenir"), items:guide.summary}}
    toc={[...guide.sections.map(s => ({id:s.id, label:s.title, level:2 as const})), ...(hasKit ? [{id:"kit-reporting", label:t("Kit et exercice corrigé"), level:2 as const}] : []), ...(hasCalculator ? [{id:"calculateur-roi", label:t("Calculer le retour sur investissement"), level:2 as const}] : [])]}
    faqTitle={t("Questions fréquentes")}
    faq={guide.faq}
    cta={{href:`${parityHref("/contact", locale)}#${context}`, label:t("Échanger sur mon projet"), title:t("Cadrer votre projet avec un DAF"), text:t("Partagez votre besoin, les outils utilisés et les difficultés rencontrées. Nous pourrons préciser le périmètre, les livrables et les contrôles d’un accompagnement."), footnote:<Link locale={locale} href={parityHref("/daf-externalise", locale)} className="underline">{t("Découvrir notre offre de DAF externalisé")}</Link>}}
    related={guide.related.map(key => ({href:iaGuideHref(key, locale), title:getIaGuide(locale, key).title, img:getIaGuide(locale, key).image, alt:getIaGuide(locale, key).label}))}
    references={guide.sources.map(key => iaReference(key, locale))}
  >
    <p className="text-sm">{locale !== "fr" ? (locale === "en" ? "English version published on 2 October 2026. Sources rechecked on the same date." + (hasKit ? " The corrected teaching kit was added to the French guide on 30 September 2026." : "") : "Versión española publicada el 2 de octubre de 2026. Fuentes revisadas ese día." + (hasKit ? " El kit didáctico con solución se añadió a la guía francesa el 30 de septiembre de 2026." : "")) : hasKit ? "Mise à jour du 30 septembre 2026 : ajout d’un kit pédagogique corrigé" + (hasCalculator ? " et d’un calculateur de rentabilité." : ".") + " Sources documentaires vérifiées le 5 septembre 2026." : "Mise à jour du 5 septembre 2026 : cas attribués, méthode de contrôle et liens documentaires vérifiés."}</p>
    {hasKit && <nav aria-label={t("Outils pratiques du guide")} className="not-prose my-6 flex flex-wrap gap-3">
      <a href="#kit-reporting" className="site-button site-button-secondary inline-flex min-h-11 items-center rounded-full border border-iter-violet/30 px-4 py-2 font-medium text-iter-violet">{t("Accéder au kit corrigé")}</a>
      {hasCalculator && <a href="#calculateur-roi" className="site-button site-button-secondary inline-flex min-h-11 items-center rounded-full border border-iter-violet/30 px-4 py-2 font-medium text-iter-violet">{t("Calculer mon gain net")}</a>}
    </nav>}
    {guide.sections.map(section => <section key={section.id}>
      <h2 id={section.id} className="scroll-mt-24">{section.title}</h2>
      <div className="[&_tbody_th]:px-4 [&_tbody_th]:py-3 [&_tbody_th]:text-left [&_tbody_th]:align-top [&_caption]:text-left [&_caption]:p-3 [&_caption]:font-medium" dangerouslySetInnerHTML={{ __html: section.html }} />
    </section>)}
    {hasKit && <ReportingKit locale={locale} />}
    {hasCalculator && <section><h2 id="calculateur-roi" className="scroll-mt-24">{t("Quel gain net sur vos hypothèses ?")}</h2><ReportingRoi locale={locale} /></section>}
    <FinanceExpert locale={locale} compact />
  </GuideFiscalPage>;
}
