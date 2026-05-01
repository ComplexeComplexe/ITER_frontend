'use client';

interface InlineCTAProps {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * InlineCta — Contextual call-to-action placed mid-article
 * Breaks up long content with a conversion opportunity
 */
export default function InlineCTA({
  title,
  body,
  ctaLabel,
  ctaHref,
}: InlineCTAProps) {
  return (
    <div className="my-8 rounded-lg border border-blue-200 bg-blue-50 p-6 md:p-8">
      <h3 className="mb-3 text-lg font-semibold text-slate-900">
        {title}
      </h3>
      <p className="mb-6 text-slate-700">
        {body}
      </p>
      <a
        href={ctaHref}
        className="inline-flex items-center rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
