// SEO-03 / SEO-04: This layout intentionally contains no <html>/<head>/<body>.
// The root layout (app/layout.tsx) owns the full document shell and sets
// lang="es" dynamically from the x-pathname header injected by middleware.
// Same fix as app/en/layout.tsx — see that file for the full rationale.

export default function EsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
