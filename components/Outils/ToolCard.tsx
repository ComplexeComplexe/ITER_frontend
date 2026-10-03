import Image from 'next/image';
import Link from 'next/link';

export interface ToolCardProps {
  name: string;
  slug: string;
  logo: string;
  /** Plain brand name for accessibility. */
  logoAlt?: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  phase: 1 | 2 | 3;
}

export default function ToolCard({
  name,
  slug,
  logo,
  logoAlt,
  category,
  shortDescription,

}: ToolCardProps) {

  return (
    <Link href={`/ressources/outils/${slug}`}>
      <div className="site-card flex flex-col h-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
        {/* Header with logo and badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className={`flex-shrink-0 w-32 h-16 rounded-lg flex items-center justify-center p-2 ${["kyriba", "upflow"].includes(slug) ? "bg-iter-dark" : "bg-gray-50"}`}>
            {logo ? <Image
              src={logo}
              alt={logoAlt ?? `Logo ${name}`}
              width={120}
              height={40}
              sizes="120px"
              className="max-w-full max-h-full object-contain"
            /> : <span className="text-sm font-semibold text-center text-gray-700">{name}</span>}
          </div>

        </div>

        {/* Tool name and category */}
        <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
        {/* The whole card is a link; its category must not create a nested anchor. */}
        <p className="text-sm text-gray-600 mb-2">
          {category}
        </p>

        {/* Description - grows to fill available space */}
        <p className="text-sm text-gray-700 mb-4 flex-grow">{shortDescription}</p>

        {/* CTA */}
        <div className="inline-flex items-center gap-1 text-iter-violet font-semibold text-sm hover:gap-2 transition-all">
          Voir la fiche
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}
