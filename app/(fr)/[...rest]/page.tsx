import { notFound } from "next/navigation";

/**
 * HYGIENE-2 (2026-10-18) — attrape-tout du groupe (fr).
 *
 * Toute URL qui ne correspond à aucune route du site arrive ici (les segments
 * statiques `/en` et `/es` l'emportent sur ce segment dynamique, chacun a son
 * propre attrape-tout). `notFound()` rend `app/(fr)/not-found.tsx` dans le
 * layout français, avec le statut 404 ; le titre et le `noindex` sont portés
 * par ce fichier not-found, les métadonnées d'une page qui lève notFound()
 * n'étant pas rendues. Voir components/pages/NotFoundPage.tsx.
 */

// Aucun chemin connu à l'avance : la 404 est générée à la demande puis mise en
// cache par Vercel (ISR), au lieu d'invoquer une fonction à chaque URL inconnue.
export function generateStaticParams() {
  return [];
}

export default function CatchAll() {
  notFound();
}
