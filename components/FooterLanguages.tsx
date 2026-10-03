'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { languageSwitcher } from '@/lib/navigation';
import { usePageTranslations } from '@/lib/hooks/use-page-translations';

/** Keep readers on the same resource when switching language at the end of a page. */
export default function FooterLanguages({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? (locale === "fr" ? "/" : `/${locale}`);
  const translations = usePageTranslations(pathname, locale);
  return <div className="space-y-1.5 sm:space-y-2.5" data-language-links="footer">
    {(['fr', 'en', 'es'] as const).map(lang => translations[lang]
      ? <Link key={lang} href={translations[lang]!} hrefLang={lang} prefetch={false} aria-current={lang === locale ? 'page' : undefined} className="flex min-h-11 items-center gap-2 py-2 text-white/70 text-xs sm:text-sm hover:text-iter-chartreuse transition-colors"><Globe size={12} className="sm:w-4 sm:h-4" /><span>{languageSwitcher[lang].label}</span></Link>
      : <span key={lang} aria-disabled="true" className="flex min-h-11 items-center gap-2 py-2 text-white/40 text-xs sm:text-sm"><Globe size={12} className="sm:w-4 sm:h-4" /><span>{languageSwitcher[lang].label}</span></span>)}
  </div>;
}
