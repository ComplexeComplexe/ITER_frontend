import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n";

/**
 * Soft CTA injected in the middle of long blog articles.
 *
 * Design-critique rationale (May 2026):
 *   "Les CTA en cours d'article (Devis gratuit + conseil) sont trop
 *    transactionnels pour un visiteur en phase de découverte. Ajouter un
 *    CTA léger en milieu d'article."
 *
 * SEO contract:
 *   - Renders inside an <aside> (not a section/heading) so it doesn't
 *     pollute the article's heading outline.
 *   - All copy stays in this component — no duplicated content from
 *     other landing pages.
 *   - Single internal link to /contact (already exists in main nav),
 *     no new indexable URL.
 *   - aria-label provides assistive-tech context.
 */
const STRINGS: Record<
  Locale,
  { eyebrow: string; title: string; body: string; cta: string; ariaLabel: string }
> = {
  fr: {
    eyebrow: "Restons en contact",
    title: "Une question sur votre organisation financière ?",
    body: "Décrivez votre situation et vos priorités. Un premier échange permettra de préciser le besoin et le périmètre d’un éventuel accompagnement.",
    cta: "Décrire mon besoin",
    ariaLabel: "Contacter Iter Advisors pour décrire mon besoin",
  },
  en: {
    eyebrow: "Let’s talk",
    title: "A specific question on your finance setup?",
    body: "Tell us about your situation and priorities. An initial conversation will help clarify your needs and the scope of a possible engagement.",
    cta: "Describe my needs",
    ariaLabel: "Contact Iter Advisors to describe my needs",
  },
  es: {
    eyebrow: "Hablemos",
    title: "¿Una pregunta sobre su organización financiera?",
    body: "Cuéntenos su situación y sus prioridades. Una primera conversación permitirá aclarar sus necesidades y el alcance de un posible acompañamiento.",
    cta: "Explicar mis necesidades",
    ariaLabel: "Contactar con Iter Advisors para explicar mis necesidades",
  },
};

export default function MidArticleSoftCTA({ locale }: { locale: Locale }) {
  const t = STRINGS[locale];
  const contactHref =
    locale === "fr" ? "/contact" : `/${locale}/contact`;

  return (
    <aside
      aria-label={t.ariaLabel}
      className="not-prose my-12 rounded-2xl border border-iter-violet/20 bg-iter-violet/5 px-6 py-7 lg:px-8 lg:py-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-widest text-iter-violet mb-2">
            {t.eyebrow}
          </p>
          <p className="text-lg font-semibold font-heading text-foreground leading-snug mb-2">
            {t.title}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.body}
          </p>
        </div>
        <Link
          href={contactHref}
          className="site-button site-button-primary inline-flex items-center gap-2 px-5 py-3 rounded-full bg-iter-violet text-white font-semibold text-sm hover:brightness-110 transition-all whitespace-nowrap"
        >
          <Mail size={16} aria-hidden="true" />
          {t.cta}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
