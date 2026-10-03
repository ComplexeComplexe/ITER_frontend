import HRExpert from "@/components/HRExpert";
import FinanceExpert from "@/components/FinanceExpert";
import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import type { Locale } from "@/lib/i18n";
import { getSiteInterface } from "@/lib/content/site-interface";
import { parityHref } from "@/lib/locale-route-map";

/** Shared French commercial-page heading. Content and anchors remain page-specific. */
export default function ServiceHero({ title, label, eyebrow, lead, intro, primary, secondary, summary, proof, navigation, family = "finance", locale = "fr", isRoot = false }: {
  locale?: Locale;
  isRoot?: boolean;
  family?: "finance" | "rh";
  title: string;
  label: string;
  eyebrow: string;
  lead: string;
  intro?: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  summary: ReadonlyArray<{ label: string; value: string }>;
  proof?: ReactNode;
  navigation: ReadonlyArray<{ id: string; label: string }>;
}) {
  const ui = getSiteInterface(locale);
  return <>
    <section className="site-hero site-service-hero">
      <div className="site-container">
        <Breadcrumb locale={locale} items={isRoot ? [{ label }] : [{ label: family === "rh" ? ui.hr : ui.finance, href: parityHref(family === "rh" ? "/drh-externalise" : "/services", locale) }, { label }]} />
        <div className="site-hero-grid">
          <div data-speakable="true">
            <p className="site-eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="site-lead">{lead}</p>
            {intro && <p className="site-intro">{intro}</p>}
            <div className="site-actions">
              <Link href={primary.href} className="site-button site-button-primary">{primary.label}<span aria-hidden="true">↗</span></Link>
              <Link href={secondary.href} className="site-button site-button-secondary">{secondary.label}<span aria-hidden="true">↓</span></Link>
            </div>
            {proof}
            {family === "rh" ? <HRExpert compact locale={locale} /> : <FinanceExpert compact locale={locale} />}
          </div>
          <aside className="site-brief" aria-label={ui.brief}>
            <p className="site-eyebrow">{ui.brief}</p>
            <dl>{summary.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
            <Link href={parityHref("/a-propos#equipe", locale)} className="site-inline-link">{ui.team} <span aria-hidden="true">↗</span></Link>
          </aside>
        </div>
      </div>
    </section>
    <nav className="site-section-nav" aria-label={ui.pageNav}><div className="site-container">{navigation.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</div></nav>
  </>;
}
