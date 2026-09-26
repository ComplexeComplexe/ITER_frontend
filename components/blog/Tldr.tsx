import { ReactNode } from 'react';
import type { Locale } from '@/lib/i18n';

interface TldrProps {
  children: ReactNode;
  locale?: Locale;
}

/**
 * Tldr — "À retenir en 30 secondes" summary box
 * Blue background, scannable for quick readers
 */
export default function Tldr({ children, locale = 'fr' }: TldrProps) {
  return (
    <div className="mb-8 rounded-lg border-l-4 border-iter-violet bg-iter-violet/5 p-6">
      <h3 className="mb-3 font-semibold text-slate-900">
        {{ fr: 'À retenir en 30 secondes', en: 'Key points in 30 seconds', es: 'Lo esencial en 30 segundos' }[locale]}
      </h3>
      <div className="space-y-2 text-sm leading-relaxed text-slate-700">
        {typeof children === 'string' ? (
          <p>{children}</p>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
