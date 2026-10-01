import FinanceExpert from "@/components/FinanceExpert";
import Link from "next/link";
import ReportingKit from "@/components/finance/ReportingKit";
import ReportingRoi from "@/components/finance/ReportingRoi";
import GuideFiscalPage from "./GuideFiscalPage";
import { IA_GUIDES } from "@/lib/content/ia-finance-guides";
import { IA_FINANCE_AUTHOR, IA_FINANCE_HUB, IA_SOURCES } from "@/lib/content/ia-finance-references";

/** Server-rendered editorial guides with isolated interactive exercises. */
export default function IaFinanceGuide({ slug }: { slug: string }) {
  const guide = IA_GUIDES[slug];
  const hasKit = ["automatiser-reporting-financier", "chatgpt-finance"].includes(slug);
  const hasCalculator = slug === "automatiser-reporting-financier";
  const context = hasCalculator ? "ia-reporting" : slug === "chatgpt-finance" ? "ia-chatgpt" : "ia-finance";
  return <GuideFiscalPage
    hub={IA_FINANCE_HUB}
    path={`${IA_FINANCE_HUB.href}/${slug}`}
    breadcrumbLabel={guide.label}
    h1={guide.title}
    description={guide.description}
    author={IA_FINANCE_AUTHOR}
    publishedDate={guide.published}
    modifiedDate={hasKit ? "2026-09-30" : "2026-09-05"}
    modifiedLabel={hasKit ? "30 septembre 2026" : "5 septembre 2026"}
    badge="Cas et sources actualisés"
    dek={guide.dek}
    heroImage={{ src: guide.image, alt: "Tableaux de bord et analyse de données financières" }}
    kpis={[]}
    essentiel={{title:"À retenir", items:guide.summary}}
    toc={[...guide.sections.map(s => ({id:s.id, label:s.title, level:2 as const})), ...(hasKit ? [{id:"kit-reporting", label:"Kit et exercice corrigé", level:2 as const}] : []), ...(hasCalculator ? [{id:"calculateur-roi", label:"Calculer le retour sur investissement", level:2 as const}] : [])]}
    faqTitle="Questions fréquentes"
    faq={guide.faq}
    cta={{href:`/contact#${context}`, label:"Échanger sur mon projet", title:"Cadrer votre projet avec un DAF", text:"Partagez votre besoin, les outils utilisés et les difficultés rencontrées. Nous pourrons préciser le périmètre, les livrables et les contrôles d’un accompagnement.", footnote:<Link href="/daf-externalise" className="underline">Découvrir notre offre de DAF externalisé</Link>}}
    related={guide.related.map(key => ({href:`${IA_FINANCE_HUB.href}/${key}`, title:IA_GUIDES[key].title, img:IA_GUIDES[key].image, alt:IA_GUIDES[key].label}))}
    references={guide.sources.map(key => IA_SOURCES[key])}
  >
    <p className="text-sm">{hasKit ? "Mise à jour du 30 septembre 2026 : ajout d’un kit pédagogique corrigé" + (hasCalculator ? " et d’un calculateur de rentabilité." : ".") + " Sources documentaires vérifiées le 5 septembre 2026." : "Mise à jour du 5 septembre 2026 : cas attribués, méthode de contrôle et liens documentaires vérifiés."}</p>
    {hasKit && <nav aria-label="Outils pratiques du guide" className="not-prose my-6 flex flex-wrap gap-3">
      <a href="#kit-reporting" className="site-button site-button-secondary inline-flex min-h-11 items-center rounded-full border border-iter-violet/30 px-4 py-2 font-medium text-iter-violet">Accéder au kit corrigé</a>
      {hasCalculator && <a href="#calculateur-roi" className="site-button site-button-secondary inline-flex min-h-11 items-center rounded-full border border-iter-violet/30 px-4 py-2 font-medium text-iter-violet">Calculer mon gain net</a>}
    </nav>}
    {guide.sections.map(section => <section key={section.id}>
      <h2 id={section.id} className="scroll-mt-24">{section.title}</h2>
      <div className="[&_tbody_th]:px-4 [&_tbody_th]:py-3 [&_tbody_th]:text-left [&_tbody_th]:align-top [&_caption]:text-left [&_caption]:p-3 [&_caption]:font-medium" dangerouslySetInnerHTML={{ __html: section.html }} />
    </section>)}
    {hasKit && <ReportingKit />}
    {hasCalculator && <section><h2 id="calculateur-roi" className="scroll-mt-24">Quel gain net sur vos hypothèses ?</h2><ReportingRoi /></section>}
    <FinanceExpert compact />
  </GuideFiscalPage>;
}
