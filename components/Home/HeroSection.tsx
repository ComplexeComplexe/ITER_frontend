import Link from "@/components/PublishedLocaleLink";
import { getHomeJourney } from "@/lib/content/home-journey";
import { parityHref } from "@/lib/locale-route-map";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface HeroSectionProps {
  locale: Locale;
  heroTitleRaw: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  heroCtaUrl: string;
  discoverServicesLabel: string;
  trustfolioLabel: string;
}

/** Keep the offer and actions readable at first paint, without a rotating H1. */
export default function HeroSection(props: HeroSectionProps) {
  const { locale, trustfolioLabel } = props;
  const t = getHomeJourney(locale);
  return (
    <section data-journey="home-hero" className={`home-finance-first site-hero site-hero--inverse relative bg-gradient-to-br from-iter-violet to-iter-dark text-white pt-28 pb-12 lg:pt-36 lg:pb-16`}>
      <div className="container">
        <div className="home-hero-layout"><div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight text-balance">{t.title}</h1>
          <p className="mt-6 text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl">{t.subtitle}</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link locale={locale} href={parityHref("/contact#daf", locale)} className="site-button site-button-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-iter-chartreuse px-6 py-3 text-iter-dark font-semibold">{t.contact}<ArrowRight size={18} /></Link>
            <Link locale={locale} href={parityHref("/daf-externalise", locale)} className="site-button site-button-secondary inline-flex min-h-12 items-center justify-center rounded-full border border-white/50 px-6 py-3 font-medium hover:bg-white/10">{t.offer}</Link>
          </div>
        </div>
          <aside className="home-rh-card" aria-label={t.hrLabel}><h2>{t.hrTitle}</h2><p>{t.hrText}</p><Link locale={locale} href={parityHref("/drh-externalise", locale)}>{t.hrCta} <span aria-hidden="true">→</span></Link></aside>
        </div>
        <a href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc/reviews" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex text-sm underline underline-offset-4">5/5 {trustfolioLabel} Trustfolio{t.reviews}</a>
        <nav aria-label={t.choice} className="mt-10 grid gap-3 md:grid-cols-3">
          {t.choices.map(item => <Link key={item.href} locale={locale} href={parityHref(item.href, locale)} className="site-card rounded-2xl border border-white/25 bg-white/5 p-5 hover:bg-white/10"><span className="font-semibold">{item.title}</span><span className="mt-2 flex items-center justify-between gap-2 text-sm text-white/80">{item.text}<ArrowRight size={16} aria-hidden="true" /></span></Link>)}
        </nav>
      </div>
    </section>
  );
}
