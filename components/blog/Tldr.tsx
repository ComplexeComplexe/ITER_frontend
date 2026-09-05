import { ReactNode } from 'react';

interface TldrProps {
  children: ReactNode;
}

/**
 * Tldr — "À retenir en 30 secondes" summary box
 * Blue background, scannable for quick readers
 */
export default function Tldr({ children }: TldrProps) {
  return (
    <div className="mb-8 rounded-lg border-l-4 border-iter-violet bg-iter-violet/5 p-6">
      <h3 className="mb-3 font-semibold text-slate-900">
        À retenir en 30 secondes
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
