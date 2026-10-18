import { notFound } from "next/navigation";

/**
 * HYGIENE-2 (2026-10-18) — attrape-tout du groupe (en) : toute URL inconnue
 * sous /en/ rend `app/(en)/en/not-found.tsx` dans le layout anglais, statut
 * 404, titre et noindex portés par ce fichier not-found.
 * Voir components/pages/NotFoundPage.tsx.
 */
export function generateStaticParams() {
  return [];
}

export default function CatchAll() {
  notFound();
}
