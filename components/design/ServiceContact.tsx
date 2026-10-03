import PublishedLocaleLink from "@/components/PublishedLocaleLink";
import type { Locale } from "@/lib/i18n";
import type { ReactNode } from "react";

export default function ServiceContact({ locale, title, text, href, label, children }: {
  locale: Locale; title: string; text: string; href: string; label: string; children?: ReactNode;
}) {
  return <section id="contact" data-block-key="contact" data-page-block="contact" className="site-section site-contact-band relative">
    <div className="container max-w-3xl text-center">
      {children}
      <h2 className="site-cta-title">{title}</h2>
      <p className="site-cta-copy mt-5 mb-8">{text}</p>
      <PublishedLocaleLink locale={locale} href={href} className="site-button site-button-primary">{label}</PublishedLocaleLink>
    </div>
  </section>;
}
