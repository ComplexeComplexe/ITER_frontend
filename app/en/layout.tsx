// SEO-03 / SEO-04: This layout intentionally contains no <html>/<head>/<body>.
// The root layout (app/layout.tsx) owns the full document shell and sets
// lang="en" dynamically from the x-pathname header injected by middleware.
// Rendering another <html> here created nested document structures on all 69
// EN pages, causing Googlebot to see lang="fr" on English content and
// Screaming Frog to flag 76 pages with duplicate <html>/<head>/<body> tags.

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
