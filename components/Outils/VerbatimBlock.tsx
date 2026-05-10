export interface VerbatimBlockProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  variant?: 'sebastien' | 'benjamin' | 'neutral';
}

export default function VerbatimBlock({
  quote,
  author,
  role,
  company,
  variant = 'neutral',
}: VerbatimBlockProps) {
  const variantStyles = {
    sebastien: {
      bg: 'bg-blue-50',
      border: 'border-l-blue-900',
    },
    benjamin: {
      bg: 'bg-slate-50',
      border: 'border-l-slate-700',
    },
    neutral: {
      bg: 'bg-gray-50',
      border: 'border-l-gray-900',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`${styles.bg} border-l-4 ${styles.border} rounded-lg p-6 md:p-8 my-8`}>
      {/* Opening quotation mark */}
      <div className="text-5xl font-bold text-gray-300 mb-2 leading-none">"</div>

      {/* Quote text */}
      <blockquote className="text-base md:text-lg italic text-gray-800 mb-6 leading-relaxed">
        {quote}
      </blockquote>

      {/* Author info */}
      <div className="space-y-1">
        <div className="font-bold text-gray-900">{author}</div>
        <div className="text-sm text-gray-600">
          {role} chez {company}
        </div>
      </div>
    </div>
  );
}
