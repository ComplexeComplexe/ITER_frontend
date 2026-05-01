'use client';

import { ReactNode } from 'react';

type CalloutType = 'info' | 'warning' | 'success' | 'danger';

interface CalloutProps {
  type?: CalloutType;
  children: ReactNode;
  title?: string;
}

const calloutStyles: Record<CalloutType, { bg: string; border: string; titleColor: string; textColor: string }> = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-l-blue-500',
    titleColor: 'text-blue-900',
    textColor: 'text-blue-800',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-l-yellow-500',
    titleColor: 'text-yellow-900',
    textColor: 'text-yellow-800',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-l-green-500',
    titleColor: 'text-green-900',
    textColor: 'text-green-800',
  },
  danger: {
    bg: 'bg-red-50',
    border: 'border-l-red-500',
    titleColor: 'text-red-900',
    textColor: 'text-red-800',
  },
};

/**
 * Callout — Info/warning/success/danger boxes with left border
 * Used for notes, warnings, best practices, important disclaimers
 */
export default function Callout({
  type = 'info',
  children,
  title,
}: CalloutProps) {
  const styles = calloutStyles[type];

  return (
    <div
      className={`my-6 rounded-lg border-l-4 ${styles.border} ${styles.bg} p-4`}
    >
      {title && (
        <h4 className={`mb-2 font-semibold ${styles.titleColor}`}>
          {title}
        </h4>
      )}
      <div className={`text-sm leading-relaxed ${styles.textColor}`}>
        {children}
      </div>
    </div>
  );
}
