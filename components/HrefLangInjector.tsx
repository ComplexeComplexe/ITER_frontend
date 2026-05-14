import { headers } from "next/headers";

/**
 * Server-side hreflang injector. Renders `<link rel="alternate" hreflang>`
 * tags directly in the SSR HTML so crawlers (and curl) see them without
 * needing to execute JS.
 *
 * Reads the current pathname from the `x-pathname` header set by middleware
 * (see middleware.ts → response.headers.set('x-pathname', pathname)).
 *
 * For locale-specific path mapping (e.g. /a-propos ↔ /en/a-propos ↔
 * /es/quienes-somos), pages should still use `localizedPaths` in
 * `buildMetadata` — Next.js's `alternates.languages` is the source of truth.
 * This component is a defensive fallback to guarantee SSR rendering.
 */
export default async function HrefLangInjector() {
  const h = await headers();
  const pathname = h.get("x-pathname") || "/";

  let basePath = pathname;
  if (pathname.startsWith("/en/")) {
    basePath = pathname.slice(3);
  } else if (pathname === "/en") {
    basePath = "/";
  } else if (pathname.startsWith("/es/")) {
    basePath = pathname.slice(3);
  } else if (pathname === "/es") {
    basePath = "/";
  }

  const base = "https://www.iteradvisors.com";
  const enHref = `${base}/en${basePath === "/" ? "" : basePath}`;
  const esHref = `${base}/es${basePath === "/" ? "" : basePath}`;
  const frHref = `${base}${basePath}`;

  const hreflangs: { hreflang: string; href: string }[] = [
    { hreflang: "x-default", href: frHref },
    { hreflang: "fr-FR", href: frHref },
    { hreflang: "en-GB", href: enHref },
    { hreflang: "es-ES", href: esHref },
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
