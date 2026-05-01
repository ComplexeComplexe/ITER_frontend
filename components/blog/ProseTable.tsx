'use client';

import { ReactNode } from 'react';

interface ProseTableProps {
  children: ReactNode;
}

/**
 * ProseTable — Styled wrapper for HTML tables
 * Applies: zebra striping, padding, bottom borders, responsive sizing
 */
export default function ProseTable({ children }: ProseTableProps) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  );
}

/**
 * Helper styles for tables (apply to parent or use with CSS modules):
 *
 * thead {
 *   background-color: var(--color-bg-secondary);
 * }
 * th, td {
 *   padding: 10px 12px;
 *   border-bottom: 0.5px solid var(--color-border);
 *   text-align: left;
 * }
 * tbody tr:nth-child(even) {
 *   background-color: var(--color-bg-secondary);
 * }
 */
