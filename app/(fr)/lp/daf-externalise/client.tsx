'use client';
import type { Locale } from '@/lib/i18n';
import { parityHref } from '@/lib/locale-route-map';
import { lpText } from '@/lib/content/landing-copy';
import { CLIENTS_ACCOMPAGNES, TRUSTFOLIO_REVIEW_COUNT } from "@/lib/content/facts";

import Script from 'next/script';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { currentConsent } from '@/lib/analytics/consent';
import { pushLeadFormSubmitted } from '@/lib/analytics/leadForm';

// Type definitions
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  teamSize: string;
  mainNeed: string;
  message?: string;
  rgpd: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  landing_url?: string;
  referrer?: string;
}

interface FormError {
  field: string;
  message: string;
}

// GTM event tracking
// Uses object spread on `data`, so nested objects (e.g. `user_data.address`)
// are preserved intact. NO flattening, NO JSON.stringify, NO key mutation —
// GTM Data Layer Variables can read `user_data.address.first_name` directly.
function pushToDataLayer(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.dataLayer && currentConsent()?.analytics) {
    window.dataLayer.push({
      event,
      page_type: 'landing_page',
      page_name: 'lp_daf_externalise',
      service: 'daf_externalise',
      ...data,
    });
  }
}

// Form Component
function ConversionForm({ locale }: { locale: Locale }) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    teamSize: '',
    mainNeed: '',
    message: '',
    rgpd: false,
  });

  const [errors, setErrors] = useState<FormError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const router = useRouter();

  // Anti-double-push guard for the `lead_form_submitted` event. React
  // StrictMode (dev) and certain re-renders could otherwise fire the push
  // twice, which would double-count Google Ads conversions.
  const leadPushedRef = useRef(false);

  // Capture URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get('utm_source') || '';
    const utm_medium = params.get('utm_medium') || '';
    const utm_campaign = params.get('utm_campaign') || '';
    const utm_term = params.get('utm_term') || '';
    const utm_content = params.get('utm_content') || '';
    const gclid = params.get('gclid') || '';

    setFormData((prev) => ({
      ...prev,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      gclid,
      landing_url: window.location.href,
      referrer: document.referrer,
    }));
  }, []);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => prev.filter((err) => err.field !== name));

    pushToDataLayer('form_field_interaction', {
      field_name: name,
    });
  };

  const handleFocus = () => {
    pushToDataLayer('lead_form_start', {
      form_position: 'main_form',
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormError[] = [];

    if (!formData.firstName.trim()) newErrors.push({ field: 'firstName', message: lpText(locale, "Prénom requis") });
    if (!formData.lastName.trim()) newErrors.push({ field: 'lastName', message: lpText(locale, "Nom requis") });
    if (!formData.email.trim() || !validateEmail(formData.email))
      newErrors.push({ field: 'email', message: lpText(locale, "Email invalide") });
    if (!formData.company.trim()) newErrors.push({ field: 'company', message: lpText(locale, "Société requise") });
    if (!formData.teamSize) newErrors.push({ field: 'teamSize', message: lpText(locale, "Taille équipe requise") });
    if (!formData.mainNeed) newErrors.push({ field: 'mainNeed', message: lpText(locale, "Besoin requis") });
    if (!formData.rgpd) newErrors.push({ field: 'rgpd', message: lpText(locale, "Acceptation RGPD requise") });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead/lp-daf-externalise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Google Ads enhanced conversion event (`lead_form_submitted`).
        // Fires ONLY after the backend confirms the lead (response.ok),
        // so clicks, validation errors, and network failures don't inflate
        // conversions. The helper preserves the nested `enhanced_conversion_data`
        // object so GTM's User-Provided Data variable can read each field
        // (email, phone_number, first_name, last_name, address.country)
        // by its dotted path. Anti-double-push guard via leadPushedRef
        // protects against React StrictMode double-execution in dev.
        if (!leadPushedRef.current) {
          leadPushedRef.current = true;
          pushLeadFormSubmitted({
            email: formData.email,
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            company: formData.company,
            companySize: formData.teamSize,
            mainNeed: formData.mainNeed,
            formLocation: 'lp-daf-externalise',
          });
          // Navigate to the dedicated thank-you page AFTER the dataLayer push
          // so GTM has a stable URL to associate with the conversion (useful
          // for GA4 thank-you-page tracking and future remarketing audiences).
          // We don't await — `router.push` returns immediately and the unmount
          // doesn't block the push that already ran synchronously.
          router.push(parityHref('/lp/daf-externalise/merci', locale));
        }
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          teamSize: '',
          mainNeed: '',
          message: '',
          rgpd: false,
        });

        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string) => errors.find((e) => e.field === fieldName)?.message;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitStatus === 'success' && (
        <div className="site-card p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {lpText(locale, "✅ Merci ! Nous vous recontacterons dans les 24h.")}
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="site-card p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {lpText(locale, "❌ Erreur lors de l'envoi. Veuillez réessayer.")}
        </div>
      )}

      {/* Prénom */}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1">{lpText(locale, "Prénom *")}</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onFocus={handleFocus}
          autoComplete="given-name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
        />
        {getFieldError('firstName') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('firstName')}</p>
        )}
      </div>

      {/* Nom */}
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1">{lpText(locale, "Nom *")}</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          autoComplete="family-name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
        />
        {getFieldError('lastName') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('lastName')}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">{lpText(locale, "Email professionnel *")}</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
        />
        {getFieldError('email') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('email')}</p>
        )}
      </div>

      {/* Société */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1">{lpText(locale, "Société *")}</label>
        <input
          id="company"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          autoComplete="organization"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
        />
        {getFieldError('company') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('company')}</p>
        )}
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">{lpText(locale, "Téléphone")}</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
        />
      </div>

      {/* Taille équipe */}
      <div>
        <label htmlFor="teamSize" className="block text-sm font-medium text-foreground mb-1">{lpText(locale, "Taille de l'entreprise *")}</label>
        <select
          id="teamSize"
          name="teamSize"
          value={formData.teamSize}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
        >
          <option value="">{lpText(locale, "-- Sélectionner --")}</option>
          <option value="1-10">{lpText(locale, "1-10 collaborateurs")}</option>
          <option value="11-50">{lpText(locale, "11-50 collaborateurs")}</option>
          <option value="51-200">{lpText(locale, "51-200 collaborateurs")}</option>
          <option value="200+">{lpText(locale, "200+ collaborateurs")}</option>
        </select>
        {getFieldError('teamSize') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('teamSize')}</p>
        )}
      </div>

      {/* Besoin principal */}
      <div>
        <label htmlFor="mainNeed" className="block text-sm font-medium text-foreground mb-1">{lpText(locale, "Besoin principal *")}</label>
        <select
          id="mainNeed"
          name="mainNeed"
          value={formData.mainNeed}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
        >
          <option value="">{lpText(locale, "-- Sélectionner --")}</option>
          <option value="Trésorerie">{lpText(locale, "Trésorerie et cash flow")}</option>
          <option value="Reporting">{lpText(locale, "Reporting et board")}</option>
          <option value="Budget">{lpText(locale, "Budget et forecast")}</option>
          <option value="Levée de fonds">{lpText(locale, "Levée de fonds")}</option>
          <option value="Contrôle de gestion">{lpText(locale, "Contrôle de gestion")}</option>
          <option value="Structuration finance">{lpText(locale, "Structuration finance")}</option>
          <option value="Renfort">{lpText(locale, "Renfort DAF")}</option>
          <option value="Autre">{lpText(locale, "Autre")}</option>
        </select>
        {getFieldError('mainNeed') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('mainNeed')}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">{lpText(locale, "Message (optionnel)")}</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={lpText(locale, "Parlez-nous de votre situation financière...")}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
        />
      </div>

      {/* RGPD */}
      <div className="flex items-start gap-3">
        <input
          id="rgpd"
          type="checkbox"
          name="rgpd"
          checked={formData.rgpd}
          onChange={handleChange}
          required
          className="w-5 h-5 mt-1 cursor-pointer"
        />
        <label htmlFor="rgpd" className="text-sm text-muted-foreground">{lpText(locale, "J'accepte qu'Iter Advisors utilise mes données pour me recontacter.")}{' '}
          <a href={parityHref("/politique-de-confidentialite", locale)} className="text-iter-violet hover:underline">{lpText(locale, "Politique de confidentialité")}</a>
        </label>
      </div>
      {getFieldError('rgpd') && (
        <p className="text-red-600 text-sm">{getFieldError('rgpd')}</p>
      )}

      {/* Hidden fields */}
      {['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'landing_url', 'referrer'].map(
        (field) => (
          <input
            key={field}
            type="hidden"
            name={field}
            value={String(formData[field as keyof FormData] || '')}
          />
        )
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        onClick={() => pushToDataLayer('cta_click', { cta_text: 'Planifier mon diagnostic', cta_position: 'form' })}
        className="w-full px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
      >
        {isSubmitting ? 'Envoi en cours...' : lpText(locale, "Planifier mon diagnostic financier")}
      </button>

      <p className="text-xs text-muted-foreground text-center">{lpText(locale, "Nous revenons vers vous sous 24h ouvrées.")}</p>
    </form>
  );
}

// Sticky Mobile CTA
function StickyCTAFooter({ locale }: { locale: Locale }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg md:hidden z-40">
      <button
        onClick={() => {
          pushToDataLayer('cta_click', { cta_text: 'Planifier diagnostic', cta_position: 'sticky_footer' });
          const formElement = document.getElementById('conversion-form');
          formElement?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="w-full px-4 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold text-sm"
      >
        Planifier →
      </button>
    </div>
  );
}

// FAQ with schema
function FAQ({ locale }: { locale: Locale }) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    const depths = new Set<string>();
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 25 && !depths.has('25')) {
        depths.add('25');
        pushToDataLayer('scroll_depth', { depth: '25%' });
      }
      if (scrollPercent >= 50 && !depths.has('50')) {
        depths.add('50');
        pushToDataLayer('scroll_depth', { depth: '50%' });
      }
      if (scrollPercent >= 75 && !depths.has('75')) {
        depths.add('75');
        pushToDataLayer('scroll_depth', { depth: '75%' });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      question: lpText(locale, "Qu'est-ce qu'un DAF externalisé ?"),
      answer:
        lpText(locale, "Un DAF externalisé est un directeur financier senior qui accompagne une entreprise sans être recruté à temps plein. Il intervient à temps partagé ou sur mission pour structurer la trésorerie, le budget, les reportings, le contrôle de gestion et les décisions financières. Aussi appelé DAF à temps partagé ou CFO part-time."),
    },
    {
      question: lpText(locale, "Quelle différence avec un expert-comptable ?"),
      answer:
        lpText(locale, "L'expert-comptable sécurise la production comptable, fiscale et légale. Le DAF externalisé utilise ces chiffres pour aider le dirigeant à piloter l'entreprise : trésorerie, marge, forecast, financement, budget et décisions stratégiques. Ils se complètent."),
    },
    {
      question: lpText(locale, "Combien coûte un DAF externalisé ?"),
      answer:
        lpText(locale, "Le coût dépend du niveau d'intervention, du rythme souhaité et de la complexité des sujets. L'intérêt du modèle est d'adapter l'accompagnement au besoin réel, sans supporter le coût fixe d'un DAF salarié à plein temps. Généralement 80% moins cher qu'un DAF recruté en CDI."),
    },
    {
      question: lpText(locale, "À partir de quand faut-il faire appel à un DAF externalisé ?"),
      answer:
        lpText(locale, "Le besoin apparaît souvent quand le dirigeant manque de visibilité sur la trésorerie, prépare une levée de fonds, doit produire un reporting fiable, ou ne peut plus piloter l'entreprise uniquement avec la comptabilité et quelques fichiers Excel."),
    },
    {
      question: lpText(locale, "Est-ce adapté aux PME qui ne lèvent pas de fonds ?"),
      answer:
        lpText(locale, "Oui. Le DAF externalisé n'est pas réservé aux startups. Il est utile dès qu'une entreprise veut mieux piloter son cash, ses marges, son budget, ses financements ou ses décisions de croissance, qu'elle soit en levée ou non."),
    },
    {
      question: lpText(locale, "Combien de temps faut-il pour démarrer ?"),
      answer:
        lpText(locale, "Après un premier diagnostic, nous pouvons cadrer rapidement les priorités, définir le rythme d'intervention et lancer les premiers chantiers : trésorerie, reporting, budget ou structuration finance. Mise en place possible en quelques semaines."),
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
            className="w-full p-6 text-left hover:bg-iter-violet/2 transition-colors flex justify-between items-center"
          >
            <h3 className="font-semibold text-foreground pr-4">{faq.question}</h3>
            <ChevronDown
              size={20}
              className={`flex-shrink-0 transition-transform ${openFAQ === idx ? 'rotate-180' : ''}`}
            />
          </button>
          {openFAQ === idx && (
            <div className="px-6 pb-6 border-t border-gray-200 bg-iter-violet/2">
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': lpText(locale, "Question"),
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}

// Main Client Component
export default function LandingPageClient({ locale = "fr" }: { locale?: Locale }) {
  return (
    <main className="min-h-screen bg-background">
      {/* GTM */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];`,
        }}
      />

      {/* Header */}
      <Header locale={locale} />

      {/* SECTION 1: HERO + FORM (2026-05-31 redesign — form now sits on
            the right above the fold; the "Planifier un diagnostic financier"
            CTA was removed since the form itself is now the primary action;
            "Nous contacter" stays as a small secondary link). */}
      <section className="site-hero pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-background via-background to-iter-violet/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            {/* ── Left: tagline, H1, subtitle, USPs, social proof (3/5) ── */}
            <div className="lg:col-span-3">
              <p className="site-copy text-sm sm:text-base font-semibold text-iter-violet mb-4">{lpText(locale, "Cabinet européen — Barcelone, Paris, Toulouse")}</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading text-foreground mb-6 leading-tight">{lpText(locale, "DAF externalisé pour PME et startups")}</h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl">{lpText(locale, "Un DAF senior à temps partagé pour structurer votre trésorerie, vos reportings et votre pilotage financier, sans recruter à temps plein.")}</p>

              {/* 3 USPs — stacked rows */}
              <ul className="space-y-5 mb-8 list-none pl-0">
                <li className="flex items-start gap-4">
                  <span className="text-2xl shrink-0" aria-hidden>💰</span>
                  <div>
                    <p className="font-semibold text-foreground">{lpText(locale, "Trésorerie prévisible à 3 mois")}</p>
                    <p className="text-sm text-muted-foreground">{lpText(locale, "Une vision claire du cash disponible.")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-2xl shrink-0" aria-hidden>📊</span>
                  <div>
                    <p className="font-semibold text-foreground">{lpText(locale, "Reporting prêt pour le board")}</p>
                    <p className="text-sm text-muted-foreground">{lpText(locale, "KPIs et forecast en 30 jours.")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-2xl shrink-0" aria-hidden>⚡</span>
                  <div>
                    <p className="font-semibold text-foreground">{lpText(locale, "DAF senior sans CDI")}</p>
                    <p className="text-sm text-muted-foreground">{lpText(locale, "Flexible, dès 3 mois d'engagement.")}</p>
                  </div>
                </li>
              </ul>

              {/* Social proof */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-muted-foreground">
                  ⭐ <strong>{lpText(locale, "5/5 sur Trustfolio")}</strong> · <strong>{CLIENTS_ACCOMPAGNES}{lpText(locale, " entreprises accompagnées")}</strong> ·{' '}
                  <strong>{lpText(locale, "100 M€+ levés par nos clients")}</strong>
                </p>
                <p className="mt-3 text-xs text-muted-foreground">{lpText(locale, "Vous préférez un échange par email ?")}{' '}
                  <a
                    href={parityHref("/contact", locale)}
                    onClick={() => {
                      pushToDataLayer('cta_click', { cta_text: "Nous contacter", cta_position: 'hero' });
                    }}
                    className="text-iter-violet hover:underline font-medium"
                  >{lpText(locale, "Nous contacter")}</a>
                </p>
              </div>
            </div>

            {/* ── Right: lead form (2/5) — above the fold on desktop ── */}
            <div className="lg:col-span-2" id="conversion-form">
              <div className="site-card bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xl">
                <p className="text-base sm:text-lg font-bold text-foreground mb-1">{lpText(locale, "Faites le point avec un DAF senior")}</p>
                <p className="text-sm text-muted-foreground mb-5">{lpText(locale, "30 minutes, sans engagement. Réponse sous 24 h.")}</p>
                <ConversionForm locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROBLEM */}
      <section className="site-section py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">{lpText(locale, "Pourquoi attendre que la trésorerie devienne un sujet urgent ?")}</h2>
            <p className="text-lg text-muted-foreground">{lpText(locale, "La comptabilité vous dit ce qui s'est passé. Le DAF vous aide à décider ce qui doit se passer ensuite.")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="site-card p-6 rounded-lg bg-iter-violet/5 border border-iter-violet/10">
              <p className="font-semibold text-foreground mb-2">{lpText(locale, "💧 Vous manquez de visibilité sur votre trésorerie ?")}</p>
              <p className="text-sm text-muted-foreground">{lpText(locale, "Vous ne savez pas précisément combien de mois vous pouvez tenir, ni quelles décisions prendre avant que la tension n'arrive.")}</p>
            </div>
            <div className="site-card p-6 rounded-lg bg-iter-violet/5 border border-iter-violet/10">
              <p className="font-semibold text-foreground mb-2">{lpText(locale, "📑 Vos reportings prennent trop de temps ?")}</p>
              <p className="text-sm text-muted-foreground">{lpText(locale, "Les chiffres circulent dans plusieurs fichiers, les versions changent, et personne n'a la même lecture de la situation.")}</p>
            </div>
            <div className="site-card p-6 rounded-lg bg-iter-violet/5 border border-iter-violet/10">
              <p className="font-semibold text-foreground mb-2">{lpText(locale, "🤝 Vous devez rassurer votre board ou des investisseurs ?")}</p>
              <p className="text-sm text-muted-foreground">{lpText(locale, "Prévisionnel, KPIs, data room, scénario de trésorerie : vos chiffres doivent être solides avant les discussions importantes.")}</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => {
                pushToDataLayer('cta_click', { cta_text: "Parler de ma situation", cta_position: 'problem_section' });
                document.getElementById('conversion-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block px-8 py-3 rounded-full border-2 border-iter-violet text-iter-violet hover:bg-iter-violet/5 transition-all duration-300 font-semibold"
            >{lpText(locale, "Parler de ma situation")}</button>
          </div>
        </div>
      </section>

      {/* SECTION 3: SOLUTION */}
      <section className="site-section py-16 sm:py-24 lg:py-32 bg-iter-violet/2">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-8 text-center">{lpText(locale, "Un DAF externalisé, pour piloter sans recruter trop tôt")}</h2>

          <div className="prose prose-sm max-w-none mb-12 text-center">
            <p className="text-lg text-muted-foreground">{lpText(locale, "Un DAF externalisé, aussi appelé DAF à temps partagé ou CFO part-time, intervient auprès de votre entreprise quelques jours par mois ou sur une mission précise.")}<br />
              <br />{lpText(locale, "Il devient le bras droit financier du dirigeant : il met de l'ordre dans les chiffres, structure les reportings, anticipe la trésorerie et aide à prendre les bonnes décisions au bon moment.")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="site-card bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-foreground font-semibold mb-2">{lpText(locale, "✅ Accès à un profil senior")}</p>
              <p className="text-sm text-muted-foreground">{lpText(locale, "Sans supporter le coût d'un recrutement à plein temps.")}</p>
            </div>
            <div className="site-card bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-foreground font-semibold mb-2">{lpText(locale, "✅ Visibilité sur vos chiffres")}</p>
              <p className="text-sm text-muted-foreground">{lpText(locale, "Cash, marges, budgets, priorités financières claires.")}</p>
            </div>
            <div className="site-card bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-foreground font-semibold mb-2">{lpText(locale, "✅ Routines financières simples")}</p>
              <p className="text-sm text-muted-foreground">{lpText(locale, "Lisibles, utiles et alignées avec votre pilotage.")}</p>
            </div>
          </div>

          <div className="site-card bg-white p-6 rounded-lg border border-gray-200 text-center mb-8">
            <p className="text-sm text-muted-foreground">
              <strong>{lpText(locale, "Iter Advisors ne remplace pas votre expert-comptable.")}</strong>{lpText(locale, " Nous complétons son travail en transformant vos chiffres en outils de pilotage.")}</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: MISSIONS */}
      <section className="site-section py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4 text-center">{lpText(locale, "Ce que votre DAF externalisé peut prendre en main")}</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">{lpText(locale, "L'intervention s'adapte à votre niveau de maturité : urgence cash, reporting board, structuration finance, levée de fonds ou renfort ponctuel.")}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: lpText(locale, "Pilotage de trésorerie"), desc: lpText(locale, "Prévisions 13 semaines, suivi du cash, anticipation des tensions.") },
              { title: lpText(locale, "Budget et forecast"), desc: lpText(locale, "Business plan, reforecast mensuel et analyse des écarts.") },
              { title: lpText(locale, "Reporting dirigeant et board"), desc: lpText(locale, "KPIs financiers, tableaux de bord prêts à partager.") },
              { title: lpText(locale, "Levée de fonds et financement"), desc: lpText(locale, "Prévisionnel, business plan, data room financière.") },
              { title: lpText(locale, "Contrôle de gestion"), desc: lpText(locale, "Analyse des marges, rentabilité par activité, pricing.") },
              { title: lpText(locale, "Structuration finance"), desc: lpText(locale, "Mise en place des outils, fiabilisation des données.") },
            ].map((mission, idx) => (
              <div key={idx} className="site-card p-6 rounded-lg bg-white border border-gray-200 hover:border-iter-violet/30 transition-colors">
                <h3 className="font-semibold text-foreground mb-2">{mission.title}</h3>
                <p className="text-sm text-muted-foreground">{mission.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => {
                pushToDataLayer('cta_click', { cta_text: 'Identifier priorités', cta_position: 'missions_section' });
                document.getElementById('conversion-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block px-8 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all"
            >{lpText(locale, "Identifier mes priorités finance")}</button>
          </div>
        </div>
      </section>

      {/* SECTION 5: COMPARISON */}
      <section className="site-section py-16 sm:py-24 lg:py-32 bg-iter-violet/2">
        <div className="container max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4 text-center">{lpText(locale, "Expert-comptable, DAF salarié ou DAF externalisé ?")}</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">{lpText(locale, "Ces rôles ne répondent pas au même besoin. L'expert-comptable sécurise la production comptable. Le DAF salarié structure une direction financière. Le DAF externalisé vous donne un pilotage senior sans recruter trop tôt.")}</p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left p-3 font-semibold">{lpText(locale, "Critère")}</th>
                  <th className="text-left p-3 font-semibold">{lpText(locale, "Expert-comptable")}</th>
                  <th className="text-left p-3 font-semibold">{lpText(locale, "DAF salarié")}</th>
                  <th className="text-left p-3 font-semibold bg-iter-chartreuse/10">{lpText(locale, "DAF externalisé Iter")}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [lpText(locale, "Rôle principal"), lpText(locale, "Comptabilité, fiscalité, obligations"), lpText(locale, "Direction financière interne"), lpText(locale, "Pilotage financier partagé")],
                  [lpText(locale, "Trésorerie et forecast"), lpText(locale, "Variable"), lpText(locale, "Fort"), lpText(locale, "Fort, rapidement")],
                  [lpText(locale, "Reporting board"), lpText(locale, "Variable"), lpText(locale, "Fort"), lpText(locale, "Structuré en semaines")],
                  [lpText(locale, "Budget et contrôle de gestion"), lpText(locale, "Variable"), lpText(locale, "Fort"), lpText(locale, "Fort, adapté")],
                  [lpText(locale, "Coût annuel"), lpText(locale, "Selon périmètre"), lpText(locale, "Élevé, charge fixe"), lpText(locale, "Adapté au besoin")],
                  [lpText(locale, "Délai de mise en place"), lpText(locale, "Variable"), lpText(locale, "3-6 mois"), lpText(locale, "Rapide")],
                  [lpText(locale, "Engagement"), lpText(locale, "Mission ou forfait"), lpText(locale, "CDI"), lpText(locale, "3 mois initial")],
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="p-3 font-semibold text-foreground">{row[0]}</td>
                    <td className="p-3 text-muted-foreground">{row[1]}</td>
                    <td className="p-3 text-muted-foreground">{row[2]}</td>
                    <td className="p-3 font-semibold text-foreground bg-iter-chartreuse/5">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="site-card bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-sm text-muted-foreground">{lpText(locale, "Le DAF externalisé ne remplace pas votre expert-comptable. Il l'aide à devenir une source fiable pour piloter l'entreprise, pas seulement pour produire les comptes.")}</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: METHOD */}
      <section className="site-section py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-12 text-center">{lpText(locale, "Une mise en place simple, en 3 étapes")}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                step: '1',
                title: lpText(locale, "Diagnostic rapide"),
                desc: lpText(locale, "Nous analysons votre situation, vos chiffres, vos outils, vos urgences et priorités financières."),
              },
              {
                step: '2',
                title: lpText(locale, "Plan d'action priorisé"),
                desc: lpText(locale, "Nous définissons les premiers sujets : trésorerie, reporting, budget, forecast ou financement."),
              },
              {
                step: '3',
                title: lpText(locale, "Pilotage régulier"),
                desc: lpText(locale, "Nous mettons en place les routines : points cash, reporting mensuel, arbitrages et décisions."),
              },
            ].map((item) => (
              <div key={item.step} className="site-card p-6 rounded-lg bg-white border border-gray-200">
                <div className="text-4xl font-bold text-iter-violet mb-3">{item.step}</div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                pushToDataLayer('cta_click', { cta_text: 'Lancer diagnostic', cta_position: 'method_section' });
                document.getElementById('conversion-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block px-8 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all"
            >{lpText(locale, "Lancer le diagnostic")}</button>
          </div>
        </div>
      </section>

      {/* SECTION 7: CREDIBILITY */}
      <section className="site-section py-16 sm:py-24 lg:py-32 bg-iter-violet/2">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-8 text-center">{lpText(locale, "Des DAF qui ont déjà été à votre place")}</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">{lpText(locale, "Un bon DAF externalisé ne se contente pas de commenter les chiffres. Il aide le dirigeant à prendre de meilleures décisions, avec des données fiables, des priorités claires et une vraie compréhension des enjeux business.")}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <div className="text-center">
              <p className="text-4xl font-bold text-iter-violet mb-2">{CLIENTS_ACCOMPAGNES}</p>
              <p className="text-muted-foreground">{lpText(locale, "Entreprises accompagnées")}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-iter-violet mb-2">{lpText(locale, "100 M€+")}</p>
              <p className="text-muted-foreground">{lpText(locale, "Levés par nos clients")}</p>
            </div>
          </div>

          <div className="site-card bg-white p-8 rounded-lg border border-gray-200 text-center mb-8">
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-2xl font-bold text-foreground mb-2">{lpText(locale, "5/5 sur Trustfolio")}</p>
            <p className="text-sm text-muted-foreground">{lpText(locale, "Basé sur ")}{TRUSTFOLIO_REVIEW_COUNT}{lpText(locale, " avis vérifiés")}</p>
          </div>

          <p className="text-center text-sm text-muted-foreground">{lpText(locale, "Cabinet basé à Barcelone, Paris et Toulouse, Iter Advisors accompagne des PME, startups et scale-ups dans leur pilotage financier, leur structuration finance et leurs opérations de croissance.")}</p>
        </div>
      </section>

      {/* SECTION 8: FORM — removed 2026-05-31. The conversion form moved
            into the hero (above the fold, right column). The 4 remaining
            "scroll to form" CTAs further up the page (Sections 2/3/5/7)
            still target id="conversion-form" — they now scroll users back
            up to the hero form, which is the same conversion endpoint. */}

      {/* SECTION 9: FAQ */}
      <section className="site-section py-16 sm:py-24 lg:py-32 bg-iter-violet/2">
        <div className="container max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-12 text-center">{lpText(locale, "Questions fréquentes")}</h2>

          <FAQ locale={locale} />
        </div>
      </section>

      {/* Sticky Footer */}
      <StickyCTAFooter locale={locale} />

      {/* Footer */}
      <Footer locale={locale} />

      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': lpText(locale, "Service"),
            name: lpText(locale, "DAF externalisé pour PME et startups"),
            serviceType: lpText(locale, "Direction financière externalisée"),
            provider: {
              '@type': 'Organization',
              name: lpText(locale, "Iter Advisors"),
              url: 'https://www.iteradvisors.com',
            },
            areaServed: [{ '@type': 'Country', name: lpText(locale, "France") }],
            audience: {
              '@type': 'Audience',
              audienceType: lpText(locale, "PME, Startups, Scale-ups"),
            },
          }),
        }}
      />
    </main>
  );
}
