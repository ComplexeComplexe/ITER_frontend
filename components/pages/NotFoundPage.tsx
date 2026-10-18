import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import type { Locale } from "@/lib/i18n";

/**
 * HYGIENE-2 (2026-10-18) — page 404 du site, dans la langue de l'URL.
 *
 * Avant : les trois langues recevaient la 404 par défaut de Next.js
 * (« 404: This page could not be found. »), en anglais, sans en-tête ni pied
 * de page. Cause : le site a trois root layouts (un par groupe de routes), donc
 * pas de `app/not-found.tsx` global, et une URL inconnue n'appartient à aucun
 * groupe. Chaque groupe porte désormais une route attrape-tout `[...rest]` qui
 * appelle `notFound()`, ce qui rend ce composant dans le layout du groupe —
 * /en/* en anglais, /es/* en espagnol, le reste en français — avec le statut
 * 404 et le `noindex` que Next.js pose sur toute page not-found. Le titre de
 * chaque langue est exporté par le fichier not-found du groupe.
 *
 * Limite connue : pour un `notFound()` levé hors prérendu, Next.js envoie une
 * coquille `<html id="__next_error__">` avec le statut, le title et le noindex,
 * et l'App Router rend ce composant côté client (getErrorRSCPayload dans
 * app-render). C'est déjà le cas en production pour un slug de blog inconnu.
 * Googlebot exécute le JavaScript ; un `curl` ne voit que l'en-tête HTML.
 */
const COPY = {
  fr: {
    code: "Erreur 404",
    title: "Page introuvable",
    text: "La page que vous cherchez n’existe pas ou a été déplacée.",
    home: "Retour à l’accueil",
    services: "Nos services",
    resources: "Ressources",
    hrefs: { home: "/", services: "/services", resources: "/ressources" },
  },
  en: {
    code: "Error 404",
    title: "Page not found",
    text: "The page you are looking for does not exist or has been moved.",
    home: "Back to the homepage",
    services: "Our services",
    resources: "Resources",
    hrefs: { home: "/en", services: "/en/services", resources: "/en/ressources" },
  },
  es: {
    code: "Error 404",
    title: "Página no encontrada",
    text: "La página que busca no existe o ha sido trasladada.",
    home: "Volver al inicio",
    services: "Nuestros servicios",
    resources: "Recursos",
    hrefs: { home: "/es", services: "/es/services", resources: "/es/recursos" },
  },
} as const;

export default function NotFoundPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <PageLayout locale={locale}>
      <section className="site-section bg-background pt-32 pb-24">
        <div className="container max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-iter-violet mb-4">{t.code}</p>
          <h1 className="text-3xl lg:text-4xl font-bold font-heading text-foreground mb-4">{t.title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-10">{t.text}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={t.hrefs.home} className="site-button site-button-primary">
              {t.home}
            </Link>
            <Link href={t.hrefs.services} className="site-button site-button-secondary">
              {t.services}
            </Link>
            <Link href={t.hrefs.resources} className="site-button site-button-secondary">
              {t.resources}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
