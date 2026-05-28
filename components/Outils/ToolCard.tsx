import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

export interface ToolCardProps {
  name: string;
  slug: string;
  logo: string;
  /** SEO-optimized alt text for the logo (TICKET T3/T4). Optional for
   *  backwards compat with callers that haven't been migrated yet. */
  logoAlt?: string;
  category: string;
  categorySlug: string;
  rating: number;
  shortDescription: string;
  phase: 1 | 2 | 3;
}

export default function ToolCard({
  name,
  slug,
  logo,
  logoAlt,
  category,
  categorySlug,
  rating,
  shortDescription,
  phase,
}: ToolCardProps) {
  const phaseBadgeColors = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-orange-100 text-orange-800',
    3: 'bg-gray-100 text-gray-800',
  };

  const phaseLabels = {
    1: 'Phase 1',
    2: 'Phase 2',
    3: 'Phase 3',
  };

  return (
    <Link href={`/ressources/outils/${slug}`}>
      <div className="flex flex-col h-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
        {/* Header with logo and badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-shrink-0 w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center p-2">
            <Image
              src={logo}
              alt={logoAlt ?? `Logo ${name}`}
              width={120}
              height={40}
              sizes="120px"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${phaseBadgeColors[phase]}`}>
            {phaseLabels[phase]}
          </div>
        </div>

        {/* Tool name and category */}
        <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">
          <Link href={`/ressources/outils/${categorySlug}`} className="hover:underline">
            {category}
          </Link>
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">{rating}</span>
        </div>

        {/* Description - grows to fill available space */}
        <p className="text-sm text-gray-700 mb-4 flex-grow">{shortDescription}</p>

        {/* CTA */}
        <div className="inline-flex items-center gap-1 text-blue-900 font-semibold text-sm hover:gap-2 transition-all">
          Voir la fiche
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}
