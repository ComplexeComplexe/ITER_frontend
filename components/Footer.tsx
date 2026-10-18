import { FINANCE_EXPERT } from "@/lib/content/finance-expert";
import Link from "@/components/PublishedLocaleLink";
import FooterLanguages from "./FooterLanguages";
import { parityHref } from "@/lib/locale-route-map";
import { getSiteInterface } from "@/lib/content/site-interface";
import Image from "next/image";
import { MapPin, Linkedin } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { navigation, footerContent } from "@/lib/navigation";
import { colon } from "@/lib/quote-marks";
import { TRUSTFOLIO_RATING, TRUSTFOLIO_REVIEW_COUNT } from "@/lib/content/facts";

export default function Footer({ locale }: { locale: Locale }) {
  const content = footerContent[locale];
  const ui = getSiteInterface(locale);
  const nav = navigation[locale];
  const serviceNav = nav.find((n) => n.href === (locale === "fr" ? "/services" : `/${locale}/services`));
  const resourceNav = nav.find(
    (n) => n.title === "Ressources" || n.title === "Resources" || n.title === "Recursos"
  );

  // The header's resource children are server-rendered. Keep only the two
  // reference destinations here; the other hubs remain in the header.
  const resourceLinks = resourceNav?.children?.filter(item =>
    ["/ressources/glossaire", "/daf-externalise/metier"].some(href => parityHref(href, locale) === parityHref(item.href, locale))
  ) ?? [];
  const financeHref = parityHref("/daf-externalise", locale);
  const hrHref = parityHref("/drh-externalise", locale);
  const startupHref = parityHref("/fractional-cfo-startups", locale);
  const serviceLinks = [
    { text: locale === "fr" ? "DAF externalisé" : locale === "en" ? "Fractional CFO" : "CFO externo", href: financeHref },
    { text: locale === "fr" ? "Tarifs DAF" : locale === "en" ? "CFO pricing" : "Honorarios CFO", href: parityHref("/daf-externalise/tarifs", locale) },
    ...(serviceNav?.children ?? []).filter(item => ![financeHref, hrHref, startupHref].includes(parityHref(item.href, locale))),
    { text: locale === "fr" ? "CFO externalisé startups" : locale === "en" ? "Fractional CFO for startups" : "CFO externo para startups", href: startupHref },
  ];
  const renderedHrefs = new Set([hrHref, ...serviceLinks.map(item => parityHref(item.href, locale)), ...resourceLinks.map(item => parityHref(item.href, locale))]);
  const editorialLinks = content.editorialLinks.filter(item =>
    !renderedHrefs.has(parityHref(item.href, locale)) &&
    !resourceNav?.children?.some(child => parityHref(child.href, locale) === parityHref(item.href, locale))
  );

  return (
    <>
      <footer className="bg-iter-dark py-12 sm:py-16">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Image
              src="/images/logos/logo-hero.webp"
              alt="Iter Advisors"
              width={120}
              height={14}
              className="mb-3 brightness-0 invert"
            />

            <p className="text-white/70 text-sm leading-relaxed mb-3">
              {content.description}
            </p>
            <a href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc" target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 mb-3 w-fit hover:opacity-80 transition-opacity">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-iter-chartreuse fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {/* NATIF-EN-ES phase 2 (2026-10-18) — la note vient de facts.ts et
                  s'accompagne du nombre d'avis vérifiés, seule preuve publiable. */}
              <span className="text-white/70 text-sm">{TRUSTFOLIO_RATING}/5 Trustfolio · {TRUSTFOLIO_REVIEW_COUNT} {locale === "fr" ? "avis" : locale === "en" ? "reviews" : "opiniones"}</span>
            </a>
            <p className="text-sm text-white/80 mb-4">{ui.financeContact}{colon(locale)}<Link locale={locale} href={parityHref(FINANCE_EXPERT.href, locale)} className="text-white underline underline-offset-4">{FINANCE_EXPERT.name}</Link></p>
            {/* Company Legal Details — E-E-A-T trust signals.
                Iter Advisors S.L. is registered in Spain (NIF B42960849);
                Barcelona is the headquarters; areas served are listed separately. */}
            <address className="not-italic text-white/60 text-sm leading-relaxed mt-3 space-y-1">
              <p className="font-semibold text-white/80">Iter Advisors S.L.</p>
              <p className="flex items-start gap-1.5">
                <MapPin size={12} className="shrink-0 mt-0.5 text-iter-chartreuse/80" aria-hidden />
                <span>Carrer Casp, 54, 5-1° · 08010 Barcelona</span>
              </p>
              <p className="text-white/70">NIF{colon(locale)}B42960849</p>
              <p>
                <a
                  href="mailto:contact@iteradvisors.com"
                  className="hover:text-iter-chartreuse transition-colors"
                >
                  contact@iteradvisors.com
                </a>
              </p>
            </address>
          </div>

          {/* Services */}
          {serviceNav?.children && (
            <div>
              <p className="text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
                {serviceNav.title}
              </p>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {serviceLinks.map((item) => (
                  <li key={item.href}>
                    <Link locale={locale} href={parityHref(item.href, locale)} className="inline-flex min-h-11 items-center py-1 text-white/70 text-sm hover:text-iter-chartreuse transition-colors line-clamp-2">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            {/* All three HR pillar pages link to their shared-time page in the body. */}
            <nav aria-label={locale === "fr" ? "Direction RH" : locale === "en" ? "HR leadership" : "Dirección de RR. HH."} className="mt-5 text-sm text-white/80">
              <Link locale={locale} href={hrHref} className="flex min-h-11 items-center py-1">{ui.hrOffer}</Link>
            </nav>
            </div>
          )}

          {/* Resources */}
          {resourceLinks.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
                {resourceNav?.title}
              </p>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {resourceLinks.map((item) => (
                  <li key={item.href}>
                    <Link locale={locale} href={parityHref(item.href, locale)} className="inline-flex min-h-11 items-center py-1 text-white/70 text-sm hover:text-iter-chartreuse transition-colors line-clamp-2">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* France-Spain taxation: one localized hub in each language. */}
          {(<div>
              <p className="text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
                {locale === "fr" ? "Fiscalité France-Espagne" : locale === "en" ? "France-Spain taxation" : "Fiscalidad Francia-España"}
              </p>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {[
                  { text: locale === "fr" ? "Guide complet" : locale === "en" ? "Complete guide" : "Guía completa", href: "/ressources/fiscalite-espagne-france" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      locale={locale}
                      href={parityHref(item.href, locale)}
                      className="inline-flex min-h-11 items-center py-1 text-white/70 text-sm hover:text-iter-chartreuse transition-colors line-clamp-2"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Locations */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              {locale === "fr" ? "Zones d’intervention" : locale === "en" ? "Where we work" : "Dónde intervenimos"}
            </p>
            <div className="space-y-2 sm:space-y-3">
              {content.locations.map((loc) => {
                const details = <>
                  <MapPin size={12} className="text-iter-chartreuse mt-0.5 shrink-0 sm:w-4 sm:h-4" />
                  <div>
                    <span className="text-white/70 text-sm block group-hover:text-iter-chartreuse transition-colors">{loc.city}</span>{" "}
                    <span className="text-white/70 text-sm">{loc.country}</span>
                  </div>
                </>;
                return loc.href
                  ? <Link locale={locale} key={loc.city} href={loc.href} className="flex min-h-11 items-start gap-2 group">{details}</Link>
                  : <div key={loc.city} className="flex min-h-11 items-start gap-2">{details}</div>;
              })}
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
              <a
                href="https://www.linkedin.com/company/iter-advisors/"
                aria-label={locale === "fr" ? "Iter Advisors sur LinkedIn" : locale === "en" ? "Iter Advisors on LinkedIn" : "Iter Advisors en LinkedIn"}
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex min-h-11 min-w-11 items-center gap-2 text-white/70 hover:text-iter-chartreuse transition-colors text-sm"
              >
                <Linkedin size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Language & Legal */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              {locale === "fr" ? "Autres langues" : locale === "en" ? "Languages" : "Idiomas"}
            </p>
            <FooterLanguages locale={locale} />
            {/* Additional destinations are shown only once in the footer. */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
              <p className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
                {locale === "fr" ? "À découvrir" : locale === "en" ? "Explore Iter" : "Descubrir Iter"}
              </p>
              <ul className="space-y-1 mb-4">
                {editorialLinks.map((link) => (
                  <li key={link.href}>
                    <Link locale={locale} href={link.href} className="inline-flex min-h-11 items-center py-1 text-white/70 text-sm hover:text-white transition-colors">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
                {locale === "fr" ? "Légal" : locale === "en" ? "Legal" : "Legal"}
              </p>
              <ul className="space-y-1">
                {content.legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link locale={locale} href={link.href} className="inline-flex min-h-11 items-center py-1 text-white/70 text-sm hover:text-white transition-colors">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

          {/* Bottom bar */}
          <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col items-center justify-center">
            <p className="text-white/70 text-sm text-center">{content.copyright}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
