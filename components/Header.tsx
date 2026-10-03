"use client";

import { recordServiceNavigation } from "@/lib/analytics/serviceNavigation";
import { useState, useEffect, useRef } from "react";
import Link from "@/components/PublishedLocaleLink";
import NativeLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { navigation, languageSwitcher, getContactPath, getHomePath } from "@/lib/navigation";
import type { NavItem } from "@/lib/navigation";
import { usePageTranslations } from "@/lib/hooks/use-page-translations";

export default function Header({
  locale,
}: {
  locale: Locale;
  cmsNavigation?: NavItem[];
}) {
  const pathname = usePathname();
  useEffect(() => {
    if (locale !== "fr") return;
    const onClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!anchor) return;
      const placement = anchor.closest("[data-journey]")?.getAttribute("data-journey") ?? (anchor.closest("header") ? "navigation" : anchor.closest("footer") ? "footer" : "content");
      recordServiceNavigation(anchor.getAttribute("href") ?? "", placement);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [locale]);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [langOpenPath, setLangOpenPath] = useState<string | null>(null);
  const langOpen = langOpenPath === pathname;
  const setLangOpen = (open: boolean) => setLangOpenPath(open ? pathname : null);
  const langSwitcherRef = useRef<HTMLDivElement | null>(null);
  // Close timer so the dropdown survives a brief mouse exit (44ms WCAG target
  // is wider than the link, so a quick slide off-link should not close it).
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  // Clear pending timer on unmount
  useEffect(() => () => cancelClose(), []);

  // Shared static contract: CMS overrides must not reintroduce different groups.
  const nav = navigation[locale];
  const homePath = getHomePath(locale);
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/es";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close language switcher on route change, outside click, or Escape.

  useEffect(() => {
    if (!langOpen) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (target && langSwitcherRef.current && !langSwitcherRef.current.contains(target)) {
        setLangOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const translations = usePageTranslations(pathname, locale);
  const unavailable = { fr: "Traduction indisponible", en: "Translation unavailable", es: "Traducción no disponible" }[locale];
  const contactItem = nav[nav.length - 1] ?? { title: "Contact", href: getContactPath(locale) };
  const mainNav = nav.slice(0, -1);

  return (
    <motion.header
      initial={false}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-iter-violet/95 backdrop-blur-md shadow-lg shadow-iter-violet/10"
          : "bg-transparent"
      }`}
    >
      <div className="container grid grid-cols-[1fr_auto] xl:grid-cols-[1fr_auto_1fr] items-center h-16 lg:h-[72px] gap-4">
        {/* Logo */}
        <Link locale={locale} href={homePath} className="flex items-center gap-2 group relative z-10 min-w-0">
          <Image
            src="/images/logos/logo-hero.webp"
            alt="Iter Advisors"
            width={140}
            height={16}
            priority
            sizes="140px"
            className="brightness-0 invert"
          />
        </Link>

        {/* Desktop Nav — centré */}
        <nav aria-label={locale === "fr" ? "Navigation principale" : locale === "en" ? "Main navigation" : "Navegación principal"} data-navigation="desktop" className="hidden xl:flex items-center justify-center gap-0.5 min-w-0">
          {mainNav.map((item, i) => (
            <div
              key={item.href}
              className="relative"
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse") return;
                cancelClose();
                if (item.children) setOpenDropdown(i);
              }}
              onMouseLeave={() => scheduleClose()}
              onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenDropdown(null); }}
              onKeyDown={(event) => { if (event.key === "Escape") { setOpenDropdown(null); event.currentTarget.querySelector<HTMLButtonElement>("button[data-dropdown-toggle]")?.focus(); } }}
            >
              <div className="flex items-center">
                <Link locale={locale} href={item.href} className={`py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10 ${item.children ? "pl-3 pr-1" : "px-3"}`}>
                  {item.title}
                </Link>
                {item.children && <button
                  type="button" data-dropdown-toggle
                  aria-label={`${locale === "fr" ? "Sous-menu" : locale === "en" ? "Submenu" : "Submenú"} ${item.title}`}
                  aria-expanded={openDropdown === i} aria-controls={`header-desktop-panel-${i}`}
                  onClick={() => { cancelClose(); setOpenDropdown(openDropdown === i ? null : i); }}
                  className="p-2.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <svg aria-hidden="true" className={`w-3 h-3 transition-transform duration-200 ${openDropdown === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>}
              </div>

              {/* Dropdown / Mega-menu */}
              {item.children && (
                <div
                  id={`header-desktop-panel-${i}`}
                  hidden={openDropdown !== i}
                  className={`absolute top-full ${item.megaMenu ? 'left-1/2 -translate-x-1/2' : 'left-0'} pt-2`}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  {item.megaMenu ? (
                    <div className="w-[520px] bg-white/95 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow-xl shadow-iter-violet/20">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Finance column */}
                        <div>
                          <span className="inline-block px-2.5 py-1 rounded-full bg-iter-violet/10 text-iter-violet text-[11px] font-semibold uppercase tracking-wider mb-3">
                            Finance
                          </span>
                          <div className="space-y-0.5">
                            {item.children.filter(c => c.group === 'Finance').map((child) => (
                              <Link
                locale={locale}
                                key={child.href + child.text}
                                href={child.href}
                                className="block px-3 py-2.5 text-sm text-iter-dark/70 hover:text-iter-violet hover:bg-iter-violet/5 rounded-lg transition-colors"
                              >
                                {child.text}
                              </Link>
                            ))}
                          </div>
                        </div>
                        {/* RH column */}
                        <div>
                          <span className="inline-block px-2.5 py-1 rounded-full bg-iter-chartreuse/20 text-iter-dark text-[11px] font-semibold uppercase tracking-wider mb-3">
                            {locale === "fr" ? "Ressources humaines" : locale === "en" ? "Human resources" : "Recursos humanos"}
                          </span>
                          <div className="space-y-0.5">
                            {item.children.filter(c => c.group === 'RH').map((child) => (
                              <Link
                locale={locale}
                                key={child.href + child.text}
                                href={child.href}
                                className="block px-3 py-2.5 text-sm text-iter-dark/70 hover:text-iter-violet hover:bg-iter-violet/5 rounded-lg transition-colors"
                              >
                                {child.text}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-64 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl p-1.5 shadow-xl shadow-iter-violet/20">
                      {item.children.map((child) => (
                        <Link
                locale={locale}
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2.5 text-sm text-iter-dark/70 hover:text-iter-violet hover:bg-iter-violet/5 rounded-lg transition-colors"
                        >
                          {child.text}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side: lang + CTA (desktop) + menu toggle (mobile) */}
        <div className="flex items-center justify-end gap-3 min-w-0">
          <div className="hidden xl:flex items-center gap-3">
            {/* Language Switcher — click-driven (mouseenter caused flicker on the
                ~8px gap between trigger and panel; outside-click + Escape close
                are handled by the existing useEffect above). The panel uses
                AnimatePresence for a smooth unfold instead of a hard toggle. */}
            <div className="relative" ref={langSwitcherRef}>
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                aria-haspopup="menu"
                aria-expanded={langOpen}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white/50 uppercase tracking-wider hover:text-white transition-colors"
              >
                {locale}
                <svg
                  className={`w-2.5 h-2.5 opacity-50 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    key="lang-panel"
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full right-0 pt-2 origin-top-right"
                  >
                    <div
                      role="menu"
                      className="w-32 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl p-1 shadow-xl"
                    >
                      {(["fr", "en", "es"] as Locale[])
                        .filter((l) => l !== locale)
                        .map((l) => translations[l] ? (
                          <NativeLink
                            key={l}
                            role="menuitem"
                            href={translations[l]!}
                            onClick={() => setLangOpen(false)}
                            className="block px-3 py-2 text-xs text-iter-dark/70 hover:text-iter-violet hover:bg-iter-violet/5 rounded-lg transition-colors uppercase tracking-wider"
                          >
                            {languageSwitcher[l].label}
                          </NativeLink>
                        ) : (
                          <span key={l} role="menuitem" aria-disabled="true" className="block px-3 py-2 text-xs text-iter-dark/60">
                            {languageSwitcher[l].label}<span className="block text-[10px] normal-case">{unavailable}</span>
                          </span>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <Link
                locale={locale}
              href={contactItem.href}
              className={`site-header-contact px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ${isHome ? "border border-white/60 bg-transparent text-white hover:bg-white/10" : "bg-iter-chartreuse text-iter-dark hover:brightness-105 hover:shadow-lg hover:shadow-iter-chartreuse/30"}`}
            >
              {contactItem.title.toUpperCase()}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            className="xl:hidden p-2 text-white relative z-10"
            aria-label={locale === "en" ? (mobileOpen ? "Close menu" : "Open menu") : locale === "es" ? (mobileOpen ? "Cerrar el menú" : "Abrir el menú") : (mobileOpen ? "Fermer le menu" : "Ouvrir le menu")}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-iter-violet border-t border-white/10"
          >
            <nav aria-label={locale === "fr" ? "Navigation mobile" : locale === "en" ? "Mobile navigation" : "Navegación móvil"} data-navigation="mobile" className="container py-4 flex flex-col gap-1 max-h-[calc(100dvh-72px)] overflow-y-auto">
              {mainNav.map((item, i) => (
                <div key={item.href}>
                  <div className="flex items-center justify-between">
                    <Link
                locale={locale}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex-1"
                    >
                      {item.title}
                    </Link>
                    {item.children && (
                      <button
                        className="p-3 text-white/40"
                        type="button"
                        aria-controls={`header-mobile-panel-${i}`}
                        aria-label={`${locale === "fr" ? "Sous-menu" : locale === "en" ? "Submenu" : "Submenú"} ${item.title}`}
                        aria-expanded={openDropdown === i}
                        onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openDropdown === i ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.children && (
                    <div id={`header-mobile-panel-${i}`} hidden={openDropdown !== i} className="pl-6 pb-2 space-y-0.5">
                      {item.children.map((child) => (
                        <Link
                locale={locale}
                          key={child.href}
                          href={child.href}
                          className="block py-2 px-4 text-sm text-white/40 hover:text-white transition-colors rounded-lg"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.text}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                locale={locale}
                href={contactItem.href}
                onClick={() => setMobileOpen(false)}
                className={`site-header-contact mt-2 mx-4 px-6 py-3 text-center font-semibold rounded-full ${isHome ? "border border-white/60 bg-transparent text-white" : "bg-iter-chartreuse text-iter-dark"}`}
              >
                {contactItem.title.toUpperCase()}
              </Link>

              {/* Mobile lang */}
              <div className="mt-4 mx-4 flex gap-3">
                {(["fr", "en", "es"] as Locale[]).map((l) => l === locale ? (
                  <span key={l} aria-current="true" className="text-xs uppercase tracking-widest px-3 py-1.5 border rounded-lg border-iter-chartreuse text-iter-chartreuse">
                    {l}
                  </span>
                ) : translations[l] ? (
                  <NativeLink
                    key={l}
                    href={translations[l]!}
                    onClick={() => setMobileOpen(false)}
                    className="text-xs uppercase tracking-widest px-3 py-1.5 border rounded-lg border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors"
                  >
                    {l}
                  </NativeLink>
                ) : (
                  <span key={l} aria-disabled="true" className="text-xs px-3 py-1.5 text-white/60">
                    {l.toUpperCase()}<span className="block text-[10px]">{unavailable}</span>
                  </span>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
