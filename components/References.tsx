import { Locale } from "@/lib/i18n";
import {
  getDafReferences,
  getReferencesHeading,
  type ExternalReference,
} from "@/lib/content/references";

/**
 * Discrete external-references block (CC-18). Cites authoritative public
 * sources (DFCG, INSEE, Bpifrance, OEC, ENISA, Agencia Tributaria) on
 * commercial pages to reinforce EEAT signals. Links are dofollow on
 * purpose — we want to send canonical traffic to these institutions.
 */
export default function References({
  locale,
  refs: refsProp,
}: {
  locale: Locale;
  /**
   * GEO-02 (2026-08-26) — jeu de sources explicite. Sans lui, le composant
   * sert les références du pilier DAF, qui n'ont rien à faire sous un article
   * de fiscalité espagnole.
   */
  refs?: ExternalReference[];
}) {
  const refs = refsProp ?? getDafReferences(locale);
  if (refs.length === 0) return null;

  return (
    <section className="bg-background py-12 lg:py-16 border-t border-border/40">
      <div className="container max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-5">
          {getReferencesHeading(locale)}
        </p>
        <ol className="space-y-3 text-sm">
          {refs.map((r, i) => (
            <li key={i} className="text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">{r.title}</span>
              {" — "}
              <a
                href={r.url}
                className="underline underline-offset-2 hover:no-underline hover:text-iter-violet"
                target="_blank"
                rel="noopener"
              >
                {r.source}
              </a>
              {r.date ? `, ${r.date}.` : "."}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
