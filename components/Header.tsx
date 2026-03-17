"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { navigation, languageSwitcher, getContactPath, getHomePath } from "@/lib/navigation";
import type { NavItem } from "@/lib/navigation";
import { getLocalizedPath } from "@/lib/path-localization";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [cmsNavigation, setCmsNavigation] = useState<NavItem[] | null>(null);

  const nav = cmsNavigation && cmsNavigation.length > 0 ? cmsNavigation : navigation[locale];
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

  useEffect(() => {
    let active = true;

    async function loadCmsNavigation() {
      try {
        const res = await fetch(`/api/site-global-navigation?locale=${locale}`);
        if (!res.ok) return;
        const data = (await res.json()) as { navigation?: NavItem[] };
        if (!active) return;
        if (Array.isArray(data.navigation)) {
          setCmsNavigation(data.navigation);
        }
      } catch {
        // Keep static navigation fallback when CMS is unreachable.
      }
    }

    loadCmsNavigation();
    return () => {
      active = false;
    };
  }, [locale]);

  const getLocaleHref = (targetLocale: Locale) => getLocalizedPath(pathname, targetLocale);
  const contactItem = nav[nav.length - 1] ?? { title: "Contact", href: getContactPath(locale) };
  const mainNav = nav.slice(0, -1);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-iter-violet/95 backdrop-blur-md shadow-lg shadow-iter-violet/10"
          : "bg-transparent"
      }`}
    >
      <div className="container grid grid-cols-[1fr_auto_1fr] items-center h-16 lg:h-[72px] gap-4">
        {/* Logo */}
        <Link href={homePath} className="flex items-center gap-2 group relative z-10 min-w-0">
          <Image
            src="/images/logos/logo-hero.png"
            alt="Iter Advisors"
            width={140}
            height={16}
            priority
            className="brightness-0 invert"
          />
        </Link>

        {/* Desktop Nav — centré */}
        <nav className="hidden lg:flex items-center justify-center gap-0.5 min-w-0">
          {mainNav.map((item, i) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(i)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
              >
                {item.title}
                {item.children && (
                  <svg
                    className={`w-3 h-3 opacity-50 transition-transform duration-200 ${
                      openDropdown === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>

              {/* Dropdown */}
              {item.children && openDropdown === i && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-64 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl p-1.5 shadow-xl shadow-iter-violet/20">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2.5 text-sm text-iter-dark/70 hover:text-iter-violet hover:bg-iter-violet/5 rounded-lg transition-colors"
                      >
                        {child.text}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side: lang + CTA (desktop) + menu toggle (mobile) */}
        <div className="flex items-center justify-end gap-3 min-w-0">
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white/50 uppercase tracking-wider hover:text-white transition-colors">
                {locale}
                <svg className="w-2.5 h-2.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-28 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl p-1 shadow-xl">
                  {(["fr", "en", "es"] as Locale[])
                    .filter((l) => l !== locale)
                    .map((l) => (
                      <Link
                        key={l}
                        href={getLocaleHref(l)}
                        className="block px-3 py-2 text-xs text-iter-dark/60 hover:text-iter-violet hover:bg-iter-violet/5 rounded-lg transition-colors uppercase tracking-wider"
                      >
                        {languageSwitcher[l].label}
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href={contactItem.href}
              className="px-6 py-2.5 text-sm font-semibold rounded-full bg-iter-chartreuse text-iter-dark hover:brightness-105 transition-all duration-200 hover:shadow-lg hover:shadow-iter-chartreuse/30"
            >
              {contactItem.title.toUpperCase()}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white relative z-10"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
            className="lg:hidden bg-iter-violet border-t border-white/10"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {mainNav.map((item, i) => (
                <div key={item.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex-1"
                    >
                      {item.title}
                    </Link>
                    {item.children && (
                      <button
                        className="p-3 text-white/40"
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
                  {item.children && openDropdown === i && (
                    <div className="pl-6 pb-2 space-y-0.5">
                      {item.children.map((child) => (
                        <Link
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
                href={contactItem.href}
                onClick={() => setMobileOpen(false)}
                className="mt-2 mx-4 px-6 py-3 text-center font-semibold rounded-full bg-iter-chartreuse text-iter-dark"
              >
                {contactItem.title.toUpperCase()}
              </Link>

              {/* Mobile lang */}
              <div className="mt-4 mx-4 flex gap-3">
                {(["fr", "en", "es"] as Locale[]).map((l) => (
                  <Link
                    key={l}
                    href={getLocaleHref(l)}
                    className={`text-xs uppercase tracking-widest px-3 py-1.5 border rounded-lg ${
                      l === locale
                        ? "border-iter-chartreuse text-iter-chartreuse"
                        : "border-white/10 text-white/40 hover:text-white hover:border-white/30"
                    } transition-colors`}
                  >
                    {l}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
