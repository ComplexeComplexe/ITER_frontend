'use client';

import { TocItem } from './BlogPostLayout';

interface TableOfContentsProps {
  items: TocItem[];
}

/**
 * TableOfContents — Anchored TOC with links to H2 sections
 * Auto-generates from items passed in, or can be auto-extracted from page load
 */
export default function TableOfContents({ items }: TableOfContentsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="mb-8 rounded-lg border border-slate-200 bg-slate-50 p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">
        Sommaire
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-sm text-blue-600 transition-colors hover:text-blue-800 hover:underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
