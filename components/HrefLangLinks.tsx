/**
 * HrefLangLinks Component
 * Renders hreflang link tags for multi-language SEO
 *
 * Usage in a page's generateMetadata or layout:
 * Pass the same localizedPaths/alternates object used in buildMetadata
 */

interface HrefLangLinksProps {
  current: string; // Current page URL (canonical)
  routes: {
    fr: string;
    en: string;
    es: string;
  };
}

export function HrefLangLinksComponent({ current, routes }: HrefLangLinksProps) {
  const base = "https://www.iteradvisors.com";

  // Build all hreflang URLs
  const hreflangs = [
    { hreflang: "x-default", href: `${base}${routes.fr}` },
    { hreflang: "fr-FR", href: `${base}${routes.fr}` },
    { hreflang: "en-GB", href: `${base}${routes.en}` },
    { hreflang: "es-ES", href: `${base}${routes.es}` },
  ];

  return (
    <>
      {hreflangs.map(({ hreflang, href }) => (
        <link
          key={hreflang}
          rel="alternate"
          hrefLang={hreflang}
          href={href}
        />
      ))}
    </>
  );
}

/**
 * Utility to extract hreflang data from metadata alternates
 * and render them as JSX elements
 */
export function HrefLangFromMetadata(
  alternates?: Record<string, string>,
) {
  if (!alternates) return null;

  const links = Object.entries(alternates).map(([hreflang, href]) => (
    <link
      key={hreflang}
      rel="alternate"
      hrefLang={hreflang}
      href={href}
    />
  ));

  return <>{links}</>;
}
