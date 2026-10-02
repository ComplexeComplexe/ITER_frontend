import { LOCALE_ALIGNMENT_DATE } from "@/lib/content/locale-publication";
import PublishedLocaleLink from "@/components/PublishedLocaleLink";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import PageByline from "@/components/PageByline";
import { FINANCE_REVIEW_DATE } from "@/lib/content/finance-services";
import { editorialWebPageSchema, FINANCE_AUTHOR } from "@/lib/schemas/editorial";
import type { Locale } from "@/lib/i18n";
import { parityHref } from "@/lib/locale-route-map";
import { getFinanceHub } from "@/lib/content/finance-hub-locales";
import { getFinanceServices } from "@/lib/content/finance-service-locales";
import { getServicesContent } from "@/lib/content/services";
import { PAGE_REVISIONS } from "@/lib/content/page-revisions";
import styles from "./finance.module.css";

export default function FinanceServicesHub({ locale = "fr" }: { locale?: Locale }) {
  const t = getFinanceHub(locale);
  const services = getFinanceServices(locale);
  const href = (path: string) => parityHref(path, locale);
  const modified = locale === "fr" ? (PAGE_REVISIONS["/services"] ?? FINANCE_REVIEW_DATE) : LOCALE_ALIGNMENT_DATE;
  const schema = editorialWebPageSchema({ path: href("/services"), name: t.title, description: t.description, locale, author: FINANCE_AUTHOR, dateModified: modified });
  return <PageLayout locale={locale}><div className={styles.root} data-finance-template="hub">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className={`${styles.hero} site-hero`}><div className={styles.wrap}><Breadcrumb locale={locale} items={[{ label: t.label }]} /><div className={styles.hubHero}>
      <p className={styles.eyebrow}>{t.eyebrow}</p><h1>{t.title}</h1><p className={styles.promise}>{t.promise}</p><p className={styles.intro}>{t.intro}</p><div className={styles.actions}><a href="#direction" className={`${styles.primary} site-button site-button-primary`}>{t.find} <span aria-hidden="true">↓</span></a><PublishedLocaleLink locale={locale} href={href("/daf-externalise")} className={styles.textLink}>{t.offer} <span aria-hidden="true">↗</span></PublishedLocaleLink></div>
    </div></div></section>
    <nav className={styles.subnav} aria-label={t.navLabel}><div className={styles.wrap}><a href="#direction">{t.nav[0]}</a><a href="#pilotage">{t.nav[1]}</a><a href="#organisation">{t.nav[2]}</a><a href="#operations">{t.nav[3]}</a></div></nav>
    <div className={styles.wrap}>{t.groups.map((group, index) => <section id={group.id} key={group.id} className={`${styles.section} ${styles.stacked}`}>
      <div className={styles.sectionHeading}><p className={styles.eyebrow}>0{index + 1} · {t.priority}</p><h2>{group.title}</h2><p>{group.intro}</p></div>
      <div className={styles.hubGrid}>{group.keys.map(key => { const service = services[key]; return <article key={key} className={styles.hubItem}><h3><PublishedLocaleLink locale={locale} href={href(service.path)}>{service.label}<span aria-hidden="true">↗</span></PublishedLocaleLink></h3><p>{service.promise}</p><p>{service.summary[0][1]}.</p><PublishedLocaleLink locale={locale} href={href(service.path)} className={styles.textLink}>{t.work}</PublishedLocaleLink></article>; })}</div>
    </section>)}
    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.eyebrow}>{t.choose}</p><h2>{t.decision}</h2></div><div className={styles.sectionBody}><p>{t.chooseCopy[0]}</p><p>{t.chooseCopy[1]}</p><PublishedLocaleLink locale={locale} className={styles.textLink} href={href("/daf-externalise/tarifs")}>{t.prices} <span aria-hidden="true">↗</span></PublishedLocaleLink></div></section>
    <section className={`${styles.section} ${styles.stacked}`}><div className={styles.sectionHeading}><p className={styles.eyebrow}>{t.explore}</p><h2>{t.cases}</h2></div><div className={styles.resourceList}><PublishedLocaleLink locale={locale} href={href("/ressources/cas-clients/opti-digital-structuration-financement")}>{t.caseLabels[0]} <span aria-hidden="true">↗</span></PublishedLocaleLink><PublishedLocaleLink locale={locale} href={href("/ressources/cas-clients/seasonly-marge-par-canal-bfr")}>{t.caseLabels[1]} <span aria-hidden="true">↗</span></PublishedLocaleLink><PublishedLocaleLink locale={locale} href={href("/ressources/cas-clients/solarmente-serie-b-cleantech")}>{t.caseLabels[2]} <span aria-hidden="true">↗</span></PublishedLocaleLink></div></section>
    <section className={styles.contact}><p className={styles.eyebrow}>{t.start}</p><h2>{t.contactTitle}</h2><p>{t.contact}</p><PublishedLocaleLink locale={locale} href={href("/contact#services-finance")} className={`${styles.primary} site-button site-button-primary`}>{t.cta} <span aria-hidden="true">↗</span></PublishedLocaleLink></section>
    <section className={`${styles.section} ${styles.stacked}`}><div className={styles.sectionHeading}><h2>{t.hrTitle}</h2><p>{t.hrIntro}</p></div><div className={styles.related}><PublishedLocaleLink locale={locale} href={href("/drh-externalise")}>{t.hr} <span aria-hidden="true">↗</span></PublishedLocaleLink>{getServicesContent(locale).services.filter(service => service.category === "rh").map(service => <PublishedLocaleLink locale={locale} key={service.href} href={service.href}>{service.title} ↗</PublishedLocaleLink>)}</div></section>
    <div className={styles.byline}><PageByline locale={locale} author={FINANCE_AUTHOR} dateModified={modified} /></div>
    </div>
  </div></PageLayout>;
}
