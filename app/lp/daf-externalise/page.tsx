import { Metadata } from 'next';
import LandingPageClient from './client';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'DAF Externalisé pour PME & Startups | Iter Advisors',
    description:
      'Sécurisez votre trésorerie et vos levées de fonds. DAF senior opérationnel en 48h. Audit Cash Runway 30 min sans engagement. Cabinet 5/5 sur 35 avis.',
    robots: 'noindex, follow',
    openGraph: {
      title: 'DAF Externalisé pour PME & Startups | Iter Advisors',
      description:
        'Sécurisez votre trésorerie et vos levées de fonds. DAF senior opérationnel en 48h.',
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
      title: 'DAF Externalisé pour PME & Startups | Iter Advisors',
      description:
        'Sécurisez votre trésorerie et vos levées de fonds. DAF senior opérationnel en 48h.',
    },
    alternates: {
      canonical: 'https://www.iteradvisors.com/lp/daf-externalise',
    },
  };
}

export default function Page() {
  return <LandingPageClient />;
}
