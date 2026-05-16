"use client";

import { useState, useCallback } from "react";
import { Clock, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n";

/**
 * Article meta line, rendered just below the H1 on every blog article.
 *
 *   Clock  X min de lecture    ·    Mis à jour le 13 mai 2026
 *   [LinkedIn] [X] [Copier le lien]
 *
 * SEO contract:
 *   - All meta values (date, word count) are also surfaced via the
 *     Article JSON-LD on BlogPostPage (datePublished, dateModified,
 *     wordCount). The visible string mirrors what crawlers see.
 *   - Share buttons emit external `<a>` (or copy to clipboard) — no
 *     new internal indexable URLs, no canonical pollution.
 */

interface ArticleMetaProps {
  locale: Locale;
  /** ISO-8601 date of last update / publication. */
  date: string | undefined;
  /** Estimated reading time in minutes. */
  readMinutes: number | undefined;
  /** Article URL on iteradvisors.com (absolute or path — we absolutise). */
  shareUrl: string;
  /** Article title (used as share text). */
  shareTitle: string;
}

const STRINGS: Record<
  Locale,
  {
    minRead: string;
    updatedOn: string;
    shareOnLinkedIn: string;
    shareOnX: string;
    copyLink: string;
    copied: string;
  }
> = {
  fr: {
    minRead: "min de lecture",
    updatedOn: "Mis à jour le",
    shareOnLinkedIn: "Partager sur LinkedIn",
    shareOnX: "Partager sur X",
    copyLink: "Copier le lien",
    copied: "Lien copié",
  },
  en: {
    minRead: "min read",
    updatedOn: "Updated on",
    shareOnLinkedIn: "Share on LinkedIn",
    shareOnX: "Share on X",
    copyLink: "Copy link",
    copied: "Link copied",
  },
  es: {
    minRead: "min de lectura",
    updatedOn: "Actualizado el",
    shareOnLinkedIn: "Compartir en LinkedIn",
    shareOnX: "Compartir en X",
    copyLink: "Copiar enlace",
    copied: "Enlace copiado",
  },
};

function formatDate(iso: string | undefined, locale: Locale): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const localeTag: Record<Locale, string> = {
    fr: "fr-FR",
    en: "en-GB",
    es: "es-ES",
  };
  return d.toLocaleDateString(localeTag[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `https://www.iteradvisors.com${path.startsWith("/") ? path : `/${path}`}`;
}

export default function ArticleMeta({
  locale,
  date,
  readMinutes,
  shareUrl,
  shareTitle,
}: ArticleMetaProps) {
  const t = STRINGS[locale];
  const [copied, setCopied] = useState(false);

  const absUrl = absoluteUrl(shareUrl);
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(absUrl)}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(absUrl)}`;

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(absUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore (clipboard API may be blocked)
    }
  }, [absUrl]);

  const formattedDate = formatDate(date, locale);

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-foreground/60 mb-6 not-prose">
      {readMinutes && (
        <span className="inline-flex items-center gap-1.5">
          <Clock size={14} aria-hidden="true" />
          {readMinutes} {t.minRead}
        </span>
      )}
      {readMinutes && formattedDate && (
        <span className="text-foreground/30" aria-hidden="true">
          ·
        </span>
      )}
      {formattedDate && (
        <span>
          {t.updatedOn} {formattedDate}
        </span>
      )}
      <span className="grow" aria-hidden="true" />
      <div className="flex items-center gap-2">
        <a
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.shareOnLinkedIn}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border/60 hover:border-iter-violet hover:text-iter-violet transition-colors"
        >
          <Linkedin size={14} aria-hidden="true" />
        </a>
        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.shareOnX}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border/60 hover:border-iter-violet hover:text-iter-violet transition-colors"
        >
          {/* X / Twitter logo (current brand mark) */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? t.copied : t.copyLink}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border/60 hover:border-iter-violet hover:text-iter-violet transition-colors"
        >
          {copied ? (
            <Check size={14} aria-hidden="true" className="text-iter-chartreuse" />
          ) : (
            <LinkIcon size={14} aria-hidden="true" />
          )}
        </button>
        {copied && (
          <span
            role="status"
            aria-live="polite"
            className="text-xs text-iter-violet font-medium"
          >
            {t.copied}
          </span>
        )}
      </div>
    </div>
  );
}
