import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

export interface ToolHeaderProps {
  name: string;
  logo: string;
  /** SEO-optimized alt text for the logo (TICKET T3/T4). */
  logoAlt?: string;
  category: string;
  categorySlug: string;
  rating: number;
  forWho: string[];
  notForWho: string[];
  implementationTime: string;
  priceRange: string;
  ctaUrl?: string;
}

export default function ToolHeader({
  name,
  logo,
  logoAlt,
  category,
  categorySlug,
  rating,
  forWho,
  notForWho,
  implementationTime,
  priceRange,
  ctaUrl = '/contact',
}: ToolHeaderProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="border border-gray-200 rounded-lg p-6 md:p-8 bg-white">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Logo & Basic Info */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-lg p-3 md:p-4">
            <Image
              src={logo}
              alt={logoAlt ?? `Logo ${name}`}
              width={160}
              height={60}
              sizes="(min-width: 768px) 128px, 96px"
              priority
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{name}</h1>
              <p className="text-lg text-gray-600">{category}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < fullStars ? 'fill-yellow-400 text-yellow-400' : i === fullStars && hasHalfStar ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{rating}/5</span>
            </div>
          </div>

          {/* For Who / Not For Who */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">
                Pour
              </h3>
              <ul className="space-y-2">
                {forWho.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">
                Pas pour
              </h3>
              <ul className="space-y-2">
                {notForWho.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-0.5">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Implémentation, Prix */}
          <div className="grid md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Implémentation
              </p>
              <p className="text-lg font-semibold text-gray-900">{implementationTime}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tarif</p>
              <p className="text-lg font-semibold text-gray-900">{priceRange}</p>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={ctaUrl}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-900 text-blue-900 font-semibold rounded-lg hover:bg-blue-900 hover:text-white transition-colors"
          >
            Demander un avis personnalisé
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
