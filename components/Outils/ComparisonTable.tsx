import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

export interface ComparisonTableTool {
  name: string;
  slug: string;
  logo: string;
  features: Record<string, string>;
  rating: number;
}

export interface ComparisonTableProps {
  tools: ComparisonTableTool[];
  criteria: string[];
}

export default function ComparisonTable({ tools, criteria }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="px-4 py-3 text-left font-semibold">Critère</th>
            {tools.map((tool) => (
              <th key={tool.slug} className="px-4 py-3 text-left font-semibold">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 flex-shrink-0">
                    <Image
                      src={tool.logo}
                      alt={`Logo ${tool.name}`}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <Link href={`/ressources/outils/${tool.slug}`} className="hover:underline">
                    {tool.name}
                  </Link>
                </div>
                <div className="flex gap-1 items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(tool.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-300 ml-1">{tool.rating}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion, rowIdx) => (
            <tr
              key={criterion}
              className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}
            >
              <td className="px-4 py-3 font-semibold text-gray-900">{criterion}</td>
              {tools.map((tool) => (
                <td key={`${tool.slug}-${criterion}`} className="px-4 py-3 text-gray-700">
                  {tool.features[criterion] || '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
