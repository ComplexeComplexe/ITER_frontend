import Link from "next/link";
import Image from "next/image";
import { MapPin, Linkedin, Globe } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { navigation, footerContent, languageSwitcher } from "@/lib/navigation";

const POPULAR_ARTICLES = {
  fr: [
    { slug: "cout-daf-externalise-tarifs-prix-2026", title: "Coût d'un DAF externalisé" },
    { slug: "daf-externalise-vs-daf-salarie", title: "DAF externalisé vs salarié" },
    { slug: "checklist-due-diligence-levee-de-fonds", title: "Due diligence & Levée de fonds" },
    { slug: "daf-drh-externalises-synergie", title: "DRH et synergie d'équipe" },
    { slug: "les-10-outils-pour-cfos-startup", title: "Les 10 outils pour CFO startup" },
  ],
  en: [
    { slug: "cout-daf-externalise-tarifs-prix-2026", title: "Cost of Outsourced CFO" },
    { slug: "daf-externalise-vs-daf-salarie", title: "Outsourced CFO vs Employee" },
    { slug: "checklist-due-diligence-levee-de-fonds", title: "Due Diligence & Fundraising" },
    { slug: "daf-drh-externalises-synergie", title: "HR and Team Synergy" },
    { slug: "les-10-outils-pour-cfos-startup", title: "10 CFO Tools for Startups" },
  ],
  es: [
    { slug: "cout-daf-externalise-tarifs-prix-2026", title: "Costo de CFO externalizado" },
    { slug: "daf-externalise-vs-daf-salarie", title: "CFO externalizado vs empleado" },
    { slug: "checklist-due-diligence-levee-de-fonds", title: "Due Diligence y Financiación" },
    { slug: "daf-drh-externalises-synergie", title: "RRHH y sinergia de equipo" },
    { slug: "les-10-outils-pour-cfos-startup", title: "10 herramientas para CFO startup" },
  ],
};

export default function Footer({ locale }: { locale: Locale }) {
  const content = footerContent[locale];
  const nav = navigation[locale];
  // SEO audit 16 mai 2026 — `baseUrl` / `localePrefix` and the
  // `WPFooter` JSON-LD schema were removed. `WPFooter` is a WordPress-
  // specific schema type; emitting it on a Next.js site signals an
  // inconsistent / templated stack to Google. The footer's nav is
  // already exposed via the page's main schema graph (Organization +
  // WebSite) and the user-facing footer markup itself.
  const serviceNav = nav.find((n) => n.title === "Services" || n.title === "Servicios");
  const resourceNav = nav.find(
    (n) => n.title === "Ressources" || n.title === "Resources" || n.title === "Recursos"
  );

  return (
    <>
      <footer className="bg-iter-dark py-12 sm:py-16">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Image
              src="/images/logos/logo-hero.webp"
              alt="Iter Advisors"
              width={120}
              height={14}
              className="mb-3 brightness-0 invert"
            />
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-3">
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
              <span className="text-white/40 text-xs">5/5 Trustfolio</span>
            </div>
            {/* Company Legal Details — E-E-A-T trust signals */}
            <address className="not-italic text-white/60 text-xs leading-relaxed mt-3 space-y-1">
              <p className="font-semibold text-white/80">Iter Advisors SAS</p>
              <p className="flex items-start gap-1.5">
                <MapPin size={12} className="shrink-0 mt-0.5 text-iter-chartreuse/80" aria-hidden />
                {/* TODO(seo-final-02): replace placeholder address with the real
                    registered HQ once the client confirms. Current value is the
                    placeholder agreed in the audit ticket. */}
                <span>10 rue de la Paix, 75002 Paris · Barcelone · Toulouse</span>
              </p>
              <p className="text-white/40">
                {/* TODO(seo-final-02): replace placeholder SIRET with the real
                    registered number once the client confirms. */}
                SIRET&nbsp;: 851 234 567 00012
              </p>
              <p>
                <a
                  href="mailto:contact@iteradvisors.com"
                  className="hover:text-iter-chartreuse transition-colors"
                >
                  contact@iteradvisors.com
                </a>
              </p>
              <p>
                {/* TODO(seo-final-qualite): replace placeholder phone with the
                    real switchboard number once the client confirms. */}
                <a
                  href="tel:+33180880001"
                  className="hover:text-iter-chartreuse transition-colors"
                >
                  +33 1 80 88 00 01
                </a>
              </p>
            </address>
          </div>

          {/* Services */}
          {serviceNav?.children && (
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
                {serviceNav.title}
              </p>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {serviceNav.children.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white/50 text-xs sm:text-sm hover:text-iter-chartreuse transition-colors line-clamp-2">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources */}
          {resourceNav?.children && (
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
                {resourceNav.title}
              </p>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {resourceNav.children.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white/50 text-xs sm:text-sm hover:text-iter-chartreuse transition-colors line-clamp-2">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Locations */}
          <div>
            <p className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              {locale === "fr" ? "Nos bureaux" : locale === "en" ? "Our offices" : "Nuestras oficinas"}
            </p>
            <div className="space-y-2 sm:space-y-3">
              {content.locations.map((loc) => (
                <Link key={loc.city} href={loc.href} className="flex items-start gap-2 group">
                  <MapPin size={12} className="text-iter-chartreuse mt-0.5 shrink-0 sm:w-4 sm:h-4" />
                  <div>
                    <span className="text-white/70 text-xs sm:text-sm block group-hover:text-iter-chartreuse transition-colors">{loc.city}</span>
                    <span className="text-white/40 text-xs">{loc.country}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
              <a
                href="https://www.linkedin.com/company/iter-advisors/"
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex items-center gap-2 text-white/50 hover:text-iter-chartreuse transition-colors text-xs sm:text-sm"
              >
                <Linkedin size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Language & Legal */}
          <div>
            <p className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              {locale === "fr" ? "Autres langues" : locale === "en" ? "Languages" : "Idiomas"}
            </p>
            <div className="space-y-1.5 sm:space-y-2.5">
              {Object.entries(languageSwitcher).map(([lang, data]) => {
                const localePath = locale === "fr" && lang === "fr" ? "/" : lang === "fr" ? "/" : `/${lang}`;
                return (
                  <Link
                    key={lang}
                    href={localePath}
                    className="flex items-center gap-2 text-white/50 text-xs sm:text-sm hover:text-iter-chartreuse transition-colors"
                  >
                    <Globe size={12} className="sm:w-4 sm:h-4" />
                    <span>{data.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                {locale === "fr" ? "Légal" : locale === "en" ? "Legal" : "Legal"}
              </p>
              <ul className="space-y-1">
                {content.legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/40 text-xs hover:text-white/60 transition-colors line-clamp-2">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Popular Articles */}
          <div>
            <p className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">
              {locale === "fr" ? "Articles populaires" : locale === "en" ? "Popular Articles" : "Artículos populares"}
            </p>
            <ul className="space-y-1.5 sm:space-y-2.5">
              {POPULAR_ARTICLES[locale].map((article) => {
                const articleHref = locale === "fr" ? `/ressources/blog/${article.slug}` : `/${locale}/ressources/blog/${article.slug}`;
                return (
                  <li key={article.slug}>
                    <Link
                      href={articleHref}
                      className="text-white/50 text-xs sm:text-sm hover:text-iter-chartreuse transition-colors line-clamp-2"
                    >
                      {article.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

          {/* Bottom bar */}
          <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col items-center justify-center">
            <p className="text-white/30 text-xs text-center">{content.copyright}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
