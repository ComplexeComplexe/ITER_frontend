import Link from "@/components/PublishedLocaleLink";
import type { Locale } from "@/lib/i18n";
import { getHomeJourney, HOME_RESOURCE_PATHS } from "@/lib/content/home-journey";
import { parityHref } from "@/lib/locale-route-map";
import { ArrowRight, BriefcaseBusiness, Wallet, Workflow } from "lucide-react";

const icons = [BriefcaseBusiness, Wallet, Workflow];
export default function HomeDecisionResources({ locale = "fr" }: { locale?: Locale }) {
  const t = getHomeJourney(locale).resources;
  const resources = t.cards.map((card, i) => ({ ...card, href: parityHref(HOME_RESOURCE_PATHS[i], locale), icon: icons[i] }));
  return <section className="site-section bg-muted/30 py-16 lg:py-24" aria-labelledby="decision-resources">
    <div className="container">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3">{t.eyebrow}</p><h2 id="decision-resources" className="text-3xl lg:text-4xl font-bold">{t.title}</h2><p className="mt-4 text-muted-foreground">{t.intro}</p></div>
        <Link locale={locale} href={parityHref("/ressources", locale)} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-iter-violet underline underline-offset-4">{t.all} <ArrowRight size={16} aria-hidden /></Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">{resources.map(({icon: Icon,...r}) => <Link locale={locale} key={r.href} href={r.href} className="site-card group flex flex-col rounded-2xl border border-border bg-background p-6 sm:p-8 transition-colors hover:border-iter-violet focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iter-violet">
        <div className="flex items-center gap-3 text-iter-violet"><span className="rounded-xl bg-iter-violet/10 p-3"><Icon size={24} aria-hidden /></span><span className="text-xs font-semibold uppercase tracking-wide">{r.label}</span></div>
        <h3 className="mt-6 text-xl font-semibold leading-snug group-hover:text-iter-violet">{r.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
        <span className="mt-auto pt-6 text-sm font-medium flex items-center justify-between gap-3">{r.detail}<ArrowRight size={18} className="shrink-0 text-iter-violet" aria-hidden /></span>
      </Link>)}</div>
      <p className="mt-6 text-sm"><Link locale={locale} href={parityHref("/drh-externalise", locale)} className="site-inline-link">{t.hr}</Link></p>
    </div>
  </section>;
}
