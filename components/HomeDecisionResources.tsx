import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Wallet, Workflow } from "lucide-react";

const resources = [
  { label: "Choisir son DAF", title: "DAF salarié ou externalisé : comment décider ?", text: "Comparez les responsabilités, la disponibilité et le budget sur un même périmètre.", href: "/ressources/blog/daf-externalise-vs-daf-salarie", detail: "Comparatif et critères de décision", icon: BriefcaseBusiness },
  { label: "Anticiper le cash", title: "BFR : les leviers pour mieux piloter la trésorerie", text: "Identifiez le rôle des stocks, des délais clients et des échéances fournisseurs.", href: "/ressources/blog/reduire-bfr-7-leviers-actionnables", detail: "Guide pratique", icon: Wallet },
  { label: "Automatiser la finance", title: "Reporting financier : méthode, contrôles et ROI", text: "Testez un exercice fictif corrigé et estimez le gain net selon vos hypothèses.", href: "/ressources/ia-finance/automatiser-reporting-financier", detail: "Kit corrigé et calculateur", icon: Workflow },
];

export default function HomeDecisionResources() {
  return <section className="site-section bg-muted/30 py-16 lg:py-24" aria-labelledby="decision-resources">
    <div className="container">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3">Ressources</p><h2 id="decision-resources" className="text-3xl lg:text-4xl font-bold">Des ressources pour vos prochaines décisions</h2><p className="mt-4 text-muted-foreground">Choisir un DAF, anticiper le cash ou fiabiliser le reporting : commencez par votre besoin.</p></div>
        <Link href="/ressources" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-iter-violet underline underline-offset-4">Toutes nos ressources <ArrowRight size={16} aria-hidden /></Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">{resources.map(({icon: Icon,...r}) => <Link key={r.href} href={r.href} className="site-card group flex flex-col rounded-2xl border border-border bg-background p-6 sm:p-8 transition-colors hover:border-iter-violet focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iter-violet">
        <div className="flex items-center gap-3 text-iter-violet"><span className="rounded-xl bg-iter-violet/10 p-3"><Icon size={24} aria-hidden /></span><span className="text-xs font-semibold uppercase tracking-wide">{r.label}</span></div>
        <h3 className="mt-6 text-xl font-semibold leading-snug group-hover:text-iter-violet">{r.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
        <span className="mt-auto pt-6 text-sm font-medium flex items-center justify-between gap-3">{r.detail}<ArrowRight size={18} className="shrink-0 text-iter-violet" aria-hidden /></span>
      </Link>)}</div>
    </div>
  </section>;
}
