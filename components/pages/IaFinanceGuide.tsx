import Link from "next/link";
import GuideFiscalPage from "./GuideFiscalPage";
import { IA_GUIDES } from "@/lib/content/ia-finance-guides";
import { IA_FINANCE_AUTHOR, IA_FINANCE_HUB, IA_SOURCES } from "@/lib/content/ia-finance-references";

/** Server-rendered editorial guides; no additional client script. */
export default function IaFinanceGuide({ slug }: { slug: string }) {
  const guide = IA_GUIDES[slug];
  return <GuideFiscalPage
    hub={IA_FINANCE_HUB}
    path={`${IA_FINANCE_HUB.href}/${slug}`}
    breadcrumbLabel={guide.label}
    h1={guide.title}
    description={guide.description}
    author={IA_FINANCE_AUTHOR}
    publishedDate={guide.published}
    modifiedDate="2026-09-05"
    modifiedLabel="5 septembre 2026"
    badge="Cas et sources actualisés"
    dek={guide.dek}
    heroImage={{ src: guide.image, alt: "Tableaux de bord et analyse de données financières" }}
    kpis={[]}
    essentiel={{title:"À retenir", items:guide.summary}}
    toc={guide.sections.map(s => ({id:s.id, label:s.title, level:2}))}
    faqTitle="Questions fréquentes"
    faq={guide.faq}
    cta={{title:"Cadrer votre projet avec un DAF", text:"Partagez votre besoin, les outils utilisés et les difficultés rencontrées. Nous pourrons préciser le périmètre, les livrables et les contrôles d’un accompagnement.", footnote:<Link href="/daf-externalise" className="underline">Découvrir notre offre de DAF externalisé</Link>}}
    related={guide.related.map(key => ({href:`${IA_FINANCE_HUB.href}/${key}`, title:IA_GUIDES[key].title, img:IA_GUIDES[key].image, alt:IA_GUIDES[key].label}))}
    references={guide.sources.map(key => IA_SOURCES[key])}
  >
    <p className="text-sm">Mise à jour du 5 septembre 2026 : cas attribués, méthode de contrôle et liens documentaires vérifiés.</p>
    {guide.sections.map(section => <section key={section.id}>
      <h2 id={section.id} className="scroll-mt-24">{section.title}</h2>
      <div className="[&_tbody_th]:px-4 [&_tbody_th]:py-3 [&_tbody_th]:text-left [&_tbody_th]:align-top [&_caption]:text-left [&_caption]:p-3 [&_caption]:font-medium" dangerouslySetInnerHTML={{ __html: section.html }} />
    </section>)}
  </GuideFiscalPage>;
}
