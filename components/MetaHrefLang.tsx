'use client';

/**
 * Client component to inject hreflang links into document head
 * Usage: <MetaHrefLang routes={{ fr: '...', en: '...', es: '...' }} />
 */

interface MetaHrefLangProps {
  routes: {
    fr: string;
    en: string;
    es: string;
  };
}

export default function MetaHrefLang({ routes }: MetaHrefLangProps) {
  const base = "https://www.iteradvisors.com";

  // Inject hreflang links into head
  const hreflangs = [
    { hreflang: "x-default", href: `${base}${routes.fr}` },
    { hreflang: "fr-FR", href: `${base}${routes.fr}` },
    { hreflang: "en-US", href: `${base}${routes.en}` },
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
