import { FINANCE_EXPERT } from "@/lib/content/finance-expert";
import Link from "@/components/PublishedLocaleLink";
import FooterLanguages from "./FooterLanguages";
import { parityHref } from "@/lib/locale-route-map";
import { getSiteInterface } from "@/lib/content/site-interface";
import Image from "next/image";
import { MapPin, Linkedin } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { navigation, footerContent } from "@/lib/navigation";

/**
 * SEO-ULT §4 (2026-08-15) — les articles populaires du footer portent
 * désormais leur URL finale au lieu d'un slug déduit.
 *
 * Le gabarit précédent construisait `/${locale}/ressources/blog/${slug}` pour
 * EN et ES. Sur les dix liens produits, huit partaient sur une redirection, et
 * trois côté espagnol enchaînaient deux sauts — parce que la convention ES est
 * /es/recursos/ et que trois de ces articles n'existent qu'en français.
 *
 * Le footer étant présent sur toutes les pages, cela faisait de loin la plus
 * grosse source de liens vers des 3xx du site. Elle échappait à l'audit de
 * configuration : ces URL n'existaient nulle part en dur, elles étaient
 * assemblées à l'exécution. C'est ce qui a motivé l'ajout du crawl des liens
 * rendus dans scripts/audit-seo.mjs.
 *
 * Les liens interlangues vers le français sont volontaires : ces articles n'ont
 * pas de traduction, et pointer vers le hub ferait perdre l'article au lecteur.
 */
const POPULAR_ARTICLES = {
  fr: [
    { href: "/ressources/blog/daf-externalise-vs-daf-salarie", title: "DAF externalisé vs salarié" },
    { href: "/ressources/blog/checklist-due-diligence-levee-de-fonds", title: "Due diligence & Levée de fonds" },
    { href: "/ressources/blog/daf-drh-externalises-synergie", title: "DRH et synergie d'équipe" },
    { href: "/ressources/blog/les-10-outils-pour-cfos-startup", title: "Les 10 outils pour CFO startup" },
  ],
  en: [
    { href: "/en/ressources/blog/daf-externalise-vs-daf-salarie", title: "Fractional CFO vs Employee" },
    { href: "/ressources/blog/checklist-due-diligence-levee-de-fonds", title: "Due Diligence & Fundraising" },
    { href: "/ressources/blog/daf-drh-externalises-synergie", title: "CFO & HR Director synergy" },
    { href: "/ressources/blog/les-10-outils-pour-cfos-startup", title: "10 tools for startup CFOs" },
  ],
  es: [
    { href: "/es/recursos/blog/daf-externalise-vs-daf-salarie", title: "CFO externo vs interno" },
    { href: "/ressources/blog/checklist-due-diligence-levee-de-fonds", title: "Due diligence y financiación" },
    { href: "/ressources/blog/daf-drh-externalises-synergie", title: "CFO y RR. HH.: sinergia" },
    { href: "/ressources/blog/les-10-outils-pour-cfos-startup", title: "10 herramientas para CFO" },
  ],
} as const;

export default function Footer({ locale }: { locale: Locale }) {
  const content = footerContent[locale];
  const ui = getSiteInterface(locale);
  const nav = navigation[locale];
  // SEO audit 16 mai 2026 — `baseUrl` / `localePrefix` and the
  // `WPFooter` JSON-LD schema were removed. `WPFooter` is a WordPress-
  // specific schema type; emitting it on a Next.js site signals an
  // inconsistent / templated stack to Google. The footer's nav is
  // already exposed via the page's main schema graph (Organization +
  // WebSite) and the user-facing footer markup itself.
  const serviceNav = nav.find((n) => n.href === (locale === "fr" ? "/services" : `/${locale}/services`));
  const resourceNav = nav.find(
    (n) => n.title === "Ressources" || n.title === "Resources" || n.title === "Recursos"
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
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-iter-chartreuse fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/70 text-sm">5/5 Trustfolio</span>
            </div>
            <p className="text-sm text-white/80 mb-4">{ui.financeContact} : <Link locale={locale} href={parityHref(FINANCE_EXPERT.href, locale)} className="text-white underline underline-offset-4">{FINANCE_EXPERT.name}</Link></p>
            {/* Company Legal Details — E-E-A-T trust signals.
                Iter Advisors S.L. is registered in Spain (NIF B42960849);
                Barcelona is the headquarters; areas served are listed separately. */}
            <address className="not-italic text-white/60 text-sm leading-relaxed mt-3 space-y-1">
              <p className="font-semibold text-white/80">Iter Advisors S.L.</p>
              <p className="flex items-start gap-1.5">
                <MapPin size={12} className="shrink-0 mt-0.5 text-iter-chartreuse/80" aria-hidden />
                <span>Carrer Casp, 54, 5-1° · 08010 Barcelona</span>
              </p>
              <p className="text-white/70">NIF&nbsp;: B42960849</p>
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
                {[{ text: locale === "fr" ? "DAF externalisé" : locale === "en" ? "Fractional CFO" : "CFO externo", href: parityHref("/daf-externalise", locale) }, { text: locale === "fr" ? "Tarifs du DAF externalisé" : locale === "en" ? "Fractional CFO fees" : "Precios del CFO externo", href: parityHref("/daf-externalise/tarifs", locale) }, ...serviceNav.children].map((item) => (
                  <li key={item.href}>
                    <Link locale={locale} href={parityHref(item.href, locale)} className="inline-flex min-h-11 items-center py-1 text-white/70 text-sm hover:text-iter-chartreuse transition-colors line-clamp-2">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            <nav aria-label={locale === "fr" ? "Direction RH" : locale === "en" ? "HR leadership" : "Dirección de RR. HH."} className="mt-5 text-sm text-white/80"><Link locale={locale} href={parityHref("/drh-externalise", locale)} className="flex min-h-11 items-center py-1">{ui.hrOffer}</Link><Link locale={locale} href={parityHref("/drh-externalise/temps-partage", locale)} className="flex min-h-11 items-center py-1">{locale === "fr" ? "Fonctionnement du temps partagé RH" : locale === "en" ? "How part-time HR works" : "Cómo funciona RR. HH. a tiempo parcial"}</Link></nav>
            </div>
          )}

          {/* Resources */}
          {resourceNav?.children && (
            <div>
              <p className="text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
                {resourceNav.title}
              </p>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {resourceNav.children.map((item) => (
                  <li key={item.href}>
                    <Link locale={locale} href={parityHref(item.href, locale)} className="inline-flex min-h-11 items-center py-1 text-white/70 text-sm hover:text-iter-chartreuse transition-colors line-clamp-2">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fiscalité France-Espagne — cocon sémantique (FR uniquement) */}
          {(<div>
              <p className="text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
                {locale === "fr" ? "Fiscalité France-Espagne" : locale === "en" ? "France-Spain taxation" : "Fiscalidad Francia-España"}
              </p>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {[
                  { text: locale === "fr" ? "Guide complet" : locale === "en" ? "Complete guide" : "Guía completa", href: "/ressources/fiscalite-espagne-france" },
                  { text: locale === "fr" ? "Résidence fiscale Espagne" : locale === "en" ? "Spanish tax residence" : "Residencia fiscal en España", href: "/ressources/fiscalite/residence-fiscale-france-espagne" },
                  { text: locale === "fr" ? "Double imposition" : locale === "en" ? "Double taxation" : "Doble imposición", href: "/ressources/fiscalite/double-imposition-france-espagne" },
                  { text: locale === "fr" ? "Impôt sur le revenu" : locale === "en" ? "Income tax" : "Impuesto sobre la renta", href: "/ressources/fiscalite/impot-revenu-espagne" },
                  { text: "Modelo 720", href: "/ressources/fiscalite/modelo-720" },
                  { text: locale === "fr" ? "Loi Beckham" : locale === "en" ? "Beckham Law" : "Ley Beckham", href: locale === "en" ? "/en/services/ley-beckham" : locale === "es" ? "/es/services/ley-beckham" : "/ressources/fiscalite/beckham-law" },
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
              {content.locations.map((loc) => (
                <Link locale={locale} key={loc.city} href={loc.href} className="flex min-h-11 items-start gap-2 group">
                  <MapPin size={12} className="text-iter-chartreuse mt-0.5 shrink-0 sm:w-4 sm:h-4" />
                  <div>
                    <span className="text-white/70 text-sm block group-hover:text-iter-chartreuse transition-colors">{loc.city}</span>{" "}
                    <span className="text-white/70 text-sm">{loc.country}</span>
                  </div>
                </Link>
              ))}
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
            {/* SEO-REP §8 (2026-08-15) — bloc éditorial : le glossaire et la
                fiche métier n'étaient atteignables que depuis le menu
                Ressources, ce qui laissait leurs fiches orphelines au crawl. */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
              <p className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
                {locale === "fr" ? "À découvrir" : locale === "en" ? "Explore Iter" : "Descubrir Iter"}
              </p>
              <ul className="space-y-1 mb-4">
                {content.editorialLinks.filter(link => !resourceNav?.children?.some(item => item.href === link.href)).map((link) => (
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

          {/* Popular Articles */}
          <div className="col-span-full">
            <p className="text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              {locale === "fr" ? "Articles populaires" : locale === "en" ? "Popular Articles" : "Artículos populares"}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-5">
              {POPULAR_ARTICLES[locale].map((article) => {
                const articleHref = article.href;
                return (
                  <li key={article.href}>
                    <Link
                      locale={locale}
                      href={articleHref}
                      className="inline-flex min-h-11 items-center py-1 text-white/70 text-sm hover:text-iter-chartreuse transition-colors line-clamp-2"
                    >
                      {article.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* FCFO-S10 (2026-05-30): permanent FR footer link to the commercial
                Fractional CFO startups page. The POPULAR_ARTICLES list above
                hard-wires the /ressources/blog/ prefix, so this lives next to
                it instead of inside. */}
            <Link locale={locale} href={parityHref("/fractional-cfo-startups", locale)} className="text-white/70 text-sm hover:text-iter-chartreuse transition-colors mt-3 inline-flex min-h-11 items-center">{locale === "fr" ? "CFO externalisé startups" : locale === "es" ? "CFO externo para startups" : "Fractional CFO for startups"} →</Link>
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
