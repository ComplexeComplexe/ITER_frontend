'use client';

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
 * BlogHero — Header section with category badge, title, dek, and author info.
 * Hero image rendering removed: source images were broken in production.
 */
export default function BlogHero({
  category,
  title,
  dek,
  author,
  readingTime,
  dateModified,
}: BlogHeroProps) {
  return (
    <div className="w-full bg-white">
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

        {/* Author & Meta — publication date intentionally hidden in the
            UI (still emitted by the parent JSON-LD schema for SEO). */}
        <div className="flex items-center gap-6 border-t border-slate-200 pt-6">
          <AuthorByline author={author} readingTime={readingTime} />
        </div>
      </div>
    </div>
  );
}
