import { Metadata } from 'next';
import LandingPageClient from './client';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'DAF externalisé pour PME et startups | Iter Advisors',
    description:
      'Accédez à un DAF externalisé senior pour piloter votre trésorerie, vos budgets, vos reportings et vos décisions financières. Accompagnement flexible pour PME, startups et scale-ups.',
    robots: 'noindex, follow',
    openGraph: {
      title: 'DAF externalisé pour PME et startups | Iter Advisors',
      description:
        'Un DAF senior à temps partagé pour structurer votre trésorerie, vos reportings et votre pilotage financier.',
      type: 'website',
      url: 'https://www.iteradvisors.com/lp/daf-externalise',
      images: [
        {
          url: '/images/og/lp-daf-externalise.webp',
          width: 1200,
          height: 630,
          alt: 'DAF Externalisé pour PME & Startups',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DAF externalisé pour PME et startups | Iter Advisors',
      description:
        'Un DAF senior à temps partagé pour structurer votre trésorerie, vos reportings et votre pilotage financier.',
    },
    alternates: {
      canonical: 'https://www.iteradvisors.com/lp/daf-externalise',
    },
  };
}

export default function Page() {
  return <LandingPageClient />;
}
