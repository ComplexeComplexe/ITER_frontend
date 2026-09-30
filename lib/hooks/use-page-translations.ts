"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

type Translations = Partial<Record<Locale, string>>;
const normalize = (path: string) => path.replace(/\/$/, "") || "/";

/** Read the published equivalents, never invent a translated slug. */
export function readPageTranslations(pathname: string, locale: Locale): Translations {
  const current: Translations = { [locale]: pathname };
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical || normalize(new URL(canonical.href).pathname) !== normalize(pathname)) return current;
  document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach((link) => {
    const lang = link.hreflang.toLowerCase().split("-")[0];
    if (lang !== "fr" && lang !== "en" && lang !== "es") return;
    const url = new URL(link.href);
    if (url.origin !== new URL(canonical.href).origin || url.search || url.hash) return;
    const targetLocale = url.pathname.split("/")[1];
    const actualLocale = targetLocale === "en" || targetLocale === "es" ? targetLocale : "fr";
    if (actualLocale === lang) current[lang] = url.pathname;
  });
  return current;
}

export function usePageTranslations(pathname: string, locale: Locale): Translations {
  const [state, setState] = useState<{ pathname: string; links: Translations } | null>(null);
  useEffect(() => {
    const refresh = () => {
      const links = readPageTranslations(pathname, locale);
      setState((previous) => previous?.pathname === pathname && JSON.stringify(previous.links) === JSON.stringify(links)
        ? previous : { pathname, links });
    };
    refresh();
    // Next can replace metadata after client navigation; never retain the previous page's links.
    const observer = new MutationObserver(refresh);
    observer.observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ["href", "hreflang"] });
    return () => observer.disconnect();
  }, [pathname, locale]);
  return state?.pathname === pathname ? state.links : { [locale]: pathname };
}
