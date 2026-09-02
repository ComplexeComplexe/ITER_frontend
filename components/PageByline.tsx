import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import {
  authorHref,
  SERVICE_MODIFIED,
  SERVICE_MODIFIED_LABEL,
  type EditorialAuthor,
} from "@/lib/schemas/editorial";

/**
 * Ligne d'attribution des pages de services : qui a rédigé, quand c'est à
 * jour. Rendue au serveur, lien rel="author" vers la fiche de l'auteur.
 * Utilisable depuis un composant client (aucune API serveur).
 */

const STRINGS: Record<Locale, { by: string; updated: string }> = {
  fr: { by: "Rédigé par", updated: "mis à jour le" },
  en: { by: "Written by", updated: "updated on" },
  es: { by: "Redactado por", updated: "actualizado el" },
};

export default function PageByline({
  locale,
  author,
  dateModified = SERVICE_MODIFIED,
  dateLabel,
  tone = "light",
  className = "",
}: {
  locale: Locale;
  author: EditorialAuthor;
  dateModified?: string;
  dateLabel?: string;
  /** `dark` sur les heros sombres (texte clair). */
  tone?: "light" | "dark";
  className?: string;
}) {
  const t = STRINGS[locale];
  const muted = tone === "dark" ? "text-white/70" : "text-muted-foreground";
  const link = tone === "dark" ? "text-white underline hover:no-underline" : "text-iter-violet hover:underline";
  return (
    <p className={`text-sm ${muted} ${className}`}>
      {t.by}{" "}
      <Link href={authorHref(locale, author)} rel="author" className={`font-medium ${link}`}>
        {author.name}
      </Link>
      {" · "}
      {t.updated} <time dateTime={dateModified}>{dateLabel ?? SERVICE_MODIFIED_LABEL[locale]}</time>
    </p>
  );
}
