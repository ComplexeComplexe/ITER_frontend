'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * HrefLangInjector - Client component that automatically injects hreflang links
 * based on the current pathname. Detects locale (FR/EN/ES) and constructs alternates.
 *
 * Usage: Add <HrefLangInjector /> to any layout's head section
 */
export default function HrefLangInjector() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Determine current locale and base path
    let currentLocale: 'fr' | 'en' | 'es' = 'fr';
    let basePath = pathname;

    if (pathname.startsWith('/en/')) {
      currentLocale = 'en';
      basePath = pathname.slice(3); // Remove '/en'
    } else if (pathname === '/en') {
      currentLocale = 'en';
      basePath = '/';
    } else if (pathname.startsWith('/es/')) {
      currentLocale = 'es';
      basePath = pathname.slice(3); // Remove '/es'
    } else if (pathname === '/es') {
      currentLocale = 'es';
      basePath = '/';
    }

    // Build locale-specific paths
    const frPath = basePath;
    const enPath = basePath;
    const esPath = basePath;

    const base = 'https://www.iteradvisors.com';

    // Build hreflang URLs
    const hreflangs = [
      { hreflang: 'x-default', href: `${base}${frPath}` },
      { hreflang: 'fr-FR', href: `${base}${frPath}` },
      { hreflang: 'en-GB', href: `${base}/en${enPath === '/' ? '' : enPath}` },
      { hreflang: 'es-ES', href: `${base}/es${esPath === '/' ? '' : esPath}` },
    ];

    // Remove existing hreflang links (if any)
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => {
      if (!el.hasAttribute('data-persistent')) {
        el.remove();
      }
    });

    // Inject new hreflang links
    const head = document.head;
    hreflangs.forEach(({ hreflang, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.setAttribute('hrefLang', hreflang);
      link.href = href;
      head.appendChild(link);
    });
  }, [pathname]);

  return null; // This component doesn't render anything
}
