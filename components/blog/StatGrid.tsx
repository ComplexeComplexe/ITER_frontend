'use client';

export interface StatItem {
  label: string;
  value: string | number;
  sublabel?: string;
}

interface StatGridProps {
  items: StatItem[];
  columns?: 2 | 3 | 4;
}

/**
 * StatGrid — Cards for key metrics and statistics
 * Auto-fit 2-4 columns, highlights important numbers
 */
export default function StatGrid({
  items,
  columns = 2,
}: StatGridProps) {
  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`my-8 grid gap-6 ${gridClass}`}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-slate-200 bg-slate-50 p-6"
        >
          <div className="mb-2 text-3xl font-bold text-slate-900">
            {item.value}
          </div>
          <div className="text-sm font-medium text-slate-700">
            {item.label}
          </div>
          {item.sublabel && (
            <div className="mt-2 text-xs text-slate-600">
              {item.sublabel}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
