import Image from 'next/image';
import { AuthorInfo } from './BlogPostLayout';

interface AuthorBylineProps {
  author: AuthorInfo;
  readingTime?: number;
}

/**
 * AuthorByline — Author info with optional avatar
 * No duplication, no date, clean display
 */
export default function AuthorByline({
  author,
  readingTime,
}: AuthorBylineProps) {
  return (
    <div className="flex items-center gap-3">
      {author.avatar && (
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
      )}
      <div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {author.url ? (
            <a
              href={author.url}
              rel="author"
              className="font-medium text-slate-900 hover:text-iter-violet transition-colors"
            >
              {author.name}
            </a>
          ) : (
            <span className="font-medium text-slate-900">{author.name}</span>
          )}
          {readingTime && (
            <span className="text-sm text-slate-500">
              · {readingTime} min
            </span>
          )}
        </div>
        {author.jobTitle && (
          <p className="text-sm text-slate-600">{author.jobTitle}</p>
        )}
      </div>
    </div>
  );
}
