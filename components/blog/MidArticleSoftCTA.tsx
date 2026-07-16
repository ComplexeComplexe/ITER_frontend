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
    title: "Une question précise sur votre setup finance ?",
    body: "20 minutes avec un de nos DAFs — sans engagement, pour préciser le diagnostic et chiffrer un accompagnement.",
    cta: "Réserver un créneau",
    ariaLabel: "Réserver un appel de 20 minutes avec un DAF d'Iter Advisors",
  },
  en: {
    eyebrow: "Let’s talk",
    title: "A specific question on your finance setup?",
    body: "20 minutes with one of our CFOs — no commitment, to sharpen the diagnosis and scope a possible engagement.",
    cta: "Book a slot",
    ariaLabel: "Book a 20-minute call with an Iter Advisors CFO",
  },
  es: {
    eyebrow: "Hablemos",
    title: "¿Una pregunta concreta sobre su setup financiero?",
    body: "20 minutos con uno de nuestros CFOs — sin compromiso, para afinar el diagnóstico y dimensionar un acompañamiento.",
    cta: "Reservar una llamada",
    ariaLabel: "Reservar una llamada de 20 minutos con un CFO de Iter Advisors",
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
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-iter-violet text-white font-semibold text-sm hover:brightness-110 transition-all whitespace-nowrap"
        >
          <Mail size={16} aria-hidden="true" />
          {t.cta}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
