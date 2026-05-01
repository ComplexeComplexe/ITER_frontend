'use client';

import Image from 'next/image';
import AuthorByline from './AuthorByline';
import { AuthorInfo } from './BlogPostLayout';

interface BlogHeroProps {
  image?: string;
  category: string;
  title: string;
  dek: string;
  author: AuthorInfo;
  readingTime: number;
  dateModified: string;
}

/**
 * BlogHero — Header section with hero image, category badge, title, dek, and author info
 */
export default function BlogHero({
  image,
  category,
  title,
  dek,
  author,
  readingTime,
  dateModified,
}: BlogHeroProps) {
  return (
    <div className="w-full bg-white">
      {/* Hero Image */}
      {image && (
        <div className="relative h-96 w-full overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>
      )}

      {/* Header Content */}
      <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
        {/* Category Badge */}
        <div className="mb-6 inline-block">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
            {category}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-3xl font-medium leading-tight text-slate-900 lg:text-4xl">
          {title}
        </h1>

        {/* Dek / Subtitle */}
        <p className="mb-8 text-lg leading-relaxed text-slate-600">
          {dek}
        </p>

        {/* Author & Meta */}
        <div className="flex items-center gap-6 border-t border-slate-200 pt-6">
          <AuthorByline author={author} readingTime={readingTime} />
          <div className="text-sm text-slate-500">
            Mis à jour{' '}
            {dateModified &&
              new Date(dateModified).toLocaleDateString('fr-FR', {
                month: 'long',
                year: 'numeric',
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
