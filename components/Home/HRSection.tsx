import Link from "@/components/PublishedLocaleLink";
import type { Locale } from "@/lib/i18n";
import { getHomeJourney, HOME_HR_PATHS } from "@/lib/content/home-journey";
import { parityHref } from "@/lib/locale-route-map";
import HRExpert from "@/components/HRExpert";

export default function HRSection({ locale = "fr" }: { locale?: Locale }) {
  const t = getHomeJourney(locale).hr;
  return <section id="direction-rh" className="site-section bg-iter-light" data-journey="home-rh-section">
    <div className="site-container grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-14 items-start">
      <div className="site-copy"><p className="site-eyebrow">{t.eyebrow}</p><h2>{t.title}</h2>
        {t.paragraphs.map(text => <p key={text}>{text}</p>)}
        <div className="site-actions"><Link locale={locale} className="site-button site-button-primary" href={parityHref("/drh-externalise", locale)}>{t.cta}</Link><Link locale={locale} className="site-inline-link" href={parityHref("/drh-externalise/temps-partage", locale)}>{t.shared}</Link></div>
        <nav aria-label={t.nav} className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-iter-violet">
          {HOME_HR_PATHS.map((href, i) => <Link key={href} locale={locale} href={parityHref(href, locale)}>{t.links[i]}</Link>)}
        </nav>
      </div><HRExpert locale={locale} />
    </div>
  </section>;
}
