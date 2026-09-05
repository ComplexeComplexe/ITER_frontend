"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GLOSSARY_PAGE_SLUGS } from "@/lib/content/glossary-entries";
import type { StrapiGlossaryTerm } from "@/lib/static-content";
import type { Locale } from "@/lib/i18n";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const allLabel: Record<Locale, string> = {
  fr: "Tous",
  en: "All",
  es: "Todos",
};

function getGroupLetter(title: string): string {
  const first = title.trim().charAt(0).toUpperCase();
  if (!first) return "";
  const normalized = first.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  return normalized.charAt(0) || first;
}

export default function GlossaryLetterIndex({
  terms,
  locale,
}: {
  terms: StrapiGlossaryTerm[];
  locale: Locale;
}) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const { lettersWithTerms, termsByLetter } = useMemo(() => {
    const byLetter: Record<string, StrapiGlossaryTerm[]> = {};
    for (const term of terms) {
      const letter = getGroupLetter(term.title);
      if (!letter) continue;
      if (!byLetter[letter]) byLetter[letter] = [];
      byLetter[letter].push(term);
    }
    const lettersWithTerms = LETTERS.filter((l) => byLetter[l]?.length);
    return { lettersWithTerms, termsByLetter: byLetter };
  }, [terms]);

  const filteredTerms = useMemo(() => {
    if (!selectedLetter) return terms;
    return termsByLetter[selectedLetter] ?? [];
  }, [terms, selectedLetter, termsByLetter]);

  return (
    <div className="space-y-10">
      {/* Barre A–Z */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedLetter(null)}
          className={`min-w-[2.5rem] rounded-lg px-2 py-1.5 text-sm font-medium transition-colors ${
            selectedLetter === null
              ? "bg-iter-violet text-white"
              : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {allLabel[locale]}
        </button>
        {LETTERS.map((letter) => {
          const hasTerms = lettersWithTerms.includes(letter);
          const isSelected = selectedLetter === letter;
          return (
            <button
              key={letter}
              type="button"
              onClick={() => setSelectedLetter(letter)}
              disabled={!hasTerms}
              className={`min-w-[2rem] rounded-lg px-1.5 py-1.5 text-sm font-medium transition-colors ${
                !hasTerms
                  ? "cursor-not-allowed text-muted-foreground/40"
                  : isSelected
                    ? "bg-iter-violet text-white"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Liste filtrée */}
      <ul className="space-y-6">
        {filteredTerms.map((term) => (
          <li
            key={term.documentId ?? term.id}
            className="border border-border/50 rounded-2xl p-6 lg:p-8 bg-background"
          >
            {/* SEO-AUD-0824 §3 — le titre n'était pas cliquable : les fiches
                détaillées n'avaient aucun lien entrant. Elles n'existent qu'en
                français, d'où la condition sur la locale. */}
            {locale === "fr" && GLOSSARY_PAGE_SLUGS.has(term.slug) ? (
              <h2 className="text-xl font-semibold font-heading mb-3">
                <Link
                  href={`/ressources/glossaire/${term.slug}`}
                  className="text-foreground hover:text-iter-violet transition-colors"
                >
                  {term.title}
                </Link>
              </h2>
            ) : (
              <h2 className="text-xl font-semibold font-heading text-foreground mb-3">{term.title}</h2>
            )}
            <p className="text-muted-foreground leading-relaxed">{term.definition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
