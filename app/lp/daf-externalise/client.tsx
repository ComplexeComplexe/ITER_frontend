'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';
import { ChevronDown, Star } from 'lucide-react';

// Type definitions for form and tracking
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  teamSize: string;
  priority: string;
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
function pushToDataLayer(event: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...data,
    });
  }
}

// Form Component
function ConversionForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    teamSize: '',
    priority: '',
    message: '',
    rgpd: false,
  });

  const [errors, setErrors] = useState<FormError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

    pushToDataLayer('page_view', {
      page_title: document.title,
      page_url: window.location.href,
    });
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

    // Clear field errors
    setErrors((prev) => prev.filter((err) => err.field !== name));

    // Track form field completed
    pushToDataLayer('form_field_completed', {
      field_name: name,
      field_value: e.target instanceof HTMLInputElement && e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
    });
  };

  const handleFocus = () => {
    pushToDataLayer('form_started', {
      form_name: 'audit_cash_runway',
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormError[] = [];

    if (!formData.firstName.trim()) newErrors.push({ field: 'firstName', message: 'Prénom requis' });
    if (!formData.lastName.trim()) newErrors.push({ field: 'lastName', message: 'Nom requis' });
    if (!formData.email.trim()) newErrors.push({ field: 'email', message: 'Email requis' });
    if (!validateEmail(formData.email)) newErrors.push({ field: 'email', message: 'Email invalide' });
    if (!formData.company.trim()) newErrors.push({ field: 'company', message: 'Société requise' });
    if (!formData.teamSize) newErrors.push({ field: 'teamSize', message: 'Taille équipe requise' });
    if (!formData.priority) newErrors.push({ field: 'priority', message: 'Enjeu requis' });
    if (!formData.rgpd) newErrors.push({ field: 'rgpd', message: 'Acceptation RGPD requise' });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    pushToDataLayer('form_submit_attempt', { form_name: 'audit_cash_runway' });

    if (!validateForm()) {
      const firstError = errors[0];
      if (firstError) {
        pushToDataLayer('form_error', {
          field: firstError.field,
          message: firstError.message,
        });
      }
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
        pushToDataLayer('form_submitted', {
          form_name: 'audit_cash_runway',
          phone_provided: !!formData.phone,
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          teamSize: '',
          priority: '',
          message: '',
          rgpd: false,
        });

        // Show success message
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        const errorData = await response.json();
        pushToDataLayer('form_error', {
          status: response.status,
          message: errorData.error || 'Erreur de soumission',
        });
      }
    } catch (error) {
      setSubmitStatus('error');
      pushToDataLayer('form_error', {
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string) => errors.find((e) => e.field === fieldName)?.message;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          ✅ Merci ! Nous vous recontacterons dans les 24h.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          ❌ Erreur lors de l'envoi. Veuillez réessayer.
        </div>
      )}

      {/* Prénom */}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1">
          Prénom *
        </label>
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
          aria-invalid={!!getFieldError('firstName')}
        />
        {getFieldError('firstName') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('firstName')}</p>
        )}
      </div>

      {/* Nom */}
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1">
          Nom *
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          autoComplete="family-name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
          aria-invalid={!!getFieldError('lastName')}
        />
        {getFieldError('lastName') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('lastName')}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
          Email professionnel *
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
          aria-invalid={!!getFieldError('email')}
        />
        {getFieldError('email') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('email')}</p>
        )}
      </div>

      {/* Société */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1">
          Société *
        </label>
        <input
          id="company"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          autoComplete="organization"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
          aria-invalid={!!getFieldError('company')}
        />
        {getFieldError('company') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('company')}</p>
        )}
      </div>

      {/* Téléphone (optionnel) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
          Téléphone (optionnel)
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          inputMode="numeric"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
        />
      </div>

      {/* Taille équipe */}
      <div>
        <label htmlFor="teamSize" className="block text-sm font-medium text-foreground mb-1">
          Taille de l'équipe *
        </label>
        <select
          id="teamSize"
          name="teamSize"
          value={formData.teamSize}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
          aria-invalid={!!getFieldError('teamSize')}
        >
          <option value="">-- Sélectionner --</option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-200">51-200</option>
          <option value="200+">200+</option>
        </select>
        {getFieldError('teamSize') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('teamSize')}</p>
        )}
      </div>

      {/* Enjeu prioritaire */}
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-foreground mb-1">
          Enjeu prioritaire *
        </label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
          aria-invalid={!!getFieldError('priority')}
        >
          <option value="">-- Sélectionner --</option>
          <option value="Trésorerie">Trésorerie</option>
          <option value="Levée de fonds">Levée de fonds</option>
          <option value="Reporting">Reporting</option>
          <option value="Structuration générale">Structuration générale</option>
          <option value="Autre">Autre</option>
        </select>
        {getFieldError('priority') && (
          <p className="text-red-600 text-sm mt-1">{getFieldError('priority')}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
          Message (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Décrivez en quelques mots votre contexte"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iter-violet focus:border-transparent outline-none"
        />
      </div>

      {/* RGPD Checkbox */}
      <div className="flex items-start gap-3">
        <input
          id="rgpd"
          type="checkbox"
          name="rgpd"
          checked={formData.rgpd}
          onChange={handleChange}
          required
          className="w-5 h-5 mt-1 cursor-pointer"
          aria-invalid={!!getFieldError('rgpd')}
        />
        <label htmlFor="rgpd" className="text-sm text-muted-foreground">
          J'accepte qu'Iter Advisors utilise mes données pour me recontacter dans le cadre de ma demande.{' '}
          <a href="/politique-de-confidentialite" className="text-iter-violet hover:underline">
            Voir notre politique de confidentialité
          </a>
        </label>
      </div>
      {getFieldError('rgpd') && (
        <p className="text-red-600 text-sm">{getFieldError('rgpd')}</p>
      )}

      {/* Hidden fields for UTM tracking */}
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        data-event="form_submit_attempt"
        className="w-full px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Obtenir mon Audit Cash Runway →'}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Réponse en moins de 24h. Aucune donnée n'est partagée avec des tiers.
      </p>
    </form>
  );
}

// Sticky Mobile CTA Footer
function StickyCTAFooter() {
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
          pushToDataLayer('cta_sticky_click', { position: 'sticky_footer' });
          const formElement = document.getElementById('conversion-form');
          formElement?.scrollIntoView({ behavior: 'smooth' });
        }}
        data-event="cta_sticky_click"
        className="w-full px-4 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold text-sm"
      >
        Audit Cash Runway →
      </button>
    </div>
  );
}

// FAQ Component with Scroll Depth Tracking
function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    // Track scroll depth
    let depths = new Set<string>();
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 25 && !depths.has('25')) {
        depths.add('25');
        pushToDataLayer('scroll_depth_25', { depth: '25%' });
      } else if (scrollPercent >= 50 && !depths.has('50')) {
        depths.add('50');
        pushToDataLayer('scroll_depth_50', { depth: '50%' });
      } else if (scrollPercent >= 75 && !depths.has('75')) {
        depths.add('75');
        pushToDataLayer('scroll_depth_75', { depth: '75%' });
      } else if (scrollPercent >= 99 && !depths.has('100')) {
        depths.add('100');
        pushToDataLayer('scroll_depth_100', { depth: '100%' });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      question: 'Combien coûte un DAF externalisé chez Iter Advisors ?',
      answer:
        'Nos formules démarrent à 2 000 € HT/mois pour 2-3 jours d\'intervention. Soit 80 % moins cher qu\'un DAF salarié à temps plein. Nous adaptons le package à vos besoins : pilotage de cash seul, reporting investisseur, gestion comptable complète, ou accompagnement levée de fonds. Chaque engagement est mensuel renouvelable — zéro pénalité de sortie. ',
      answerLink: { text: 'Voir la grille tarifaire détaillée', href: '/daf-externalise#tarifs' },
    },
    {
      question: 'Quand faire appel à un DAF externalisé ?',
      answer:
        'Dès que tu dois prendre des décisions financières critiques : lever des fonds, évaluer ta runway, comprendre tes marges, mettre en place du reporting pour tes investisseurs. Tu n\'as pas besoin d\'attendre d\'avoir un gros CFO salarié — ton DAF externalisé commence en 48h. ',
      answerLink: { text: 'Guide complet', href: '/daf-externalise' },
    },
    {
      question: 'DAF externalisé vs expert-comptable : quelle différence ?',
      answer:
        'Ton expert-comptable certifie les chiffres du passé (bilan, liasse fiscale). Ton DAF Iter Advisors les regarde le jour même et te dit « on a 6 mois de trésorerie, il faut accélérer la collecte » ou « on peut augmenter les marges ici ». L\'expert-comptable est réactif, le DAF est proactif. Ils se complètent. ',
      answerLink: { text: 'Article complet sur le sujet', href: '/ressources/blog' },
    },
    {
      question: 'DAF externalisé vs DAF salarié : quel ROI ?',
      answer:
        'Un DAF salarié coûte 120-200 k€/an chargé et 3-6 mois de recrutement. Notre DAF externalisé coûte 24-84 k€/an selon ta formule, démarre en 48h, et tu peux augmenter/diminuer les jours sans friction. Si tu as besoin de spécialisation tech uniquement, tu ne paynes que les jours consommés — pas une personne entière. Cas d\'usage parfait : startups Series A/B et PME en croissance rapide.',
      answerLink: null,
    },
    {
      question: 'Quel est le délai de mise en place ?',
      answer:
        'Mercredi 14h : tu valides l\'audit. Jeudi 9h : ton DAF arrive, accès aux outils, entretiens avec ton équipe. Vendredi : dashboard de pilotage fonctionnel. Lundi semaine 2 : plan d\'action. C\'est la raison pour laquelle nous sommes le DAF préféré des fondateurs en urgence fundraising. ',
      answerLink: null,
    },
    {
      question: 'Le DAF externalisé peut-il accompagner ma levée de fonds ?',
      answer:
        'Oui — c\'est même l\'un de nos cas d\'usage les plus courants. Nous préparons la data room, répondons aux due diligence questions, bâtissons ton business plan, présentons ton historique financier. Plus encore : c\'est beaucoup plus rentable qu\'un consultant à 500 €/jour, et c\'est quelqu\'un qui « vit » dans tes chiffres. ',
      answerLink: { text: 'Services levée de fonds', href: '/services/accompagnement-levee-de-fond' },
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
              <p className="text-muted-foreground">
                {faq.answer}
                {faq.answerLink && (
                  <a href={faq.answerLink.href} className="text-iter-violet hover:underline font-semibold">
                    {faq.answerLink.text}
                  </a>
                )}
              </p>
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
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer + (faq.answerLink?.text || ''),
              },
            })),
          }),
        }}
      />
    </div>
  );
}

// Main Client Component
export default function LandingPageClient() {
  return (
    <main className="min-h-screen bg-background">
      {/* GTM Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];`,
        }}
      />

      {/* SECTION 1: HERO */}
      <section className="pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-background via-background to-iter-violet/5">
        <div className="container max-w-4xl">
          <div className="text-center">
            <p className="text-sm sm:text-base font-semibold text-iter-violet mb-4">
              Cabinet européen — Barcelone, Paris, Toulouse
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-foreground mb-6 leading-tight">
              DAF externalisé pour PME et startups
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Pilotez votre cash et sécurisez votre croissance avec un DAF senior à temps partagé. Opérationnel en 48h,
              sans le coût d'un recrutement fixe.
            </p>

            {/* 3 Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
              <div className="text-center">
                <p className="text-2xl mb-2">✅</p>
                <p className="font-semibold text-foreground">Trésorerie maîtrisée</p>
                <p className="text-sm text-muted-foreground">Visibilité 13 semaines</p>
              </div>
              <div className="text-center">
                <p className="text-2xl mb-2">✅</p>
                <p className="font-semibold text-foreground">Reporting investisseur</p>
                <p className="text-sm text-muted-foreground">Board-ready en 30 jours</p>
              </div>
              <div className="text-center">
                <p className="text-2xl mb-2">✅</p>
                <p className="font-semibold text-foreground">Flexibilité totale</p>
                <p className="text-sm text-muted-foreground">Engagement 3 mois minimum</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  pushToDataLayer('cta_hero_click', { position: 'hero' });
                  document.getElementById('conversion-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                data-event="cta_hero_click"
                data-cta-position="hero"
                className="px-8 py-4 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
              >
                Planifier mon Audit Cash Runway →
              </button>
              <button
                onClick={() => {
                  pushToDataLayer('cta_secondary_click', { position: 'hero' });
                }}
                className="px-8 py-4 rounded-full border-2 border-iter-violet text-iter-violet hover:bg-iter-violet/5 transition-all duration-300 font-semibold"
              >
                Ou demander un échange par email
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-muted-foreground">
                ★ <strong>5/5 sur 35 avis Trustfolio</strong> · <strong>+85 entreprises accompagnées</strong> ·{' '}
                <strong>+100 M€ levés par nos clients</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PAIN POINT */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
              Pourquoi attendre que votre trésorerie soit sous tension ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Votre expert-comptable regarde le passé, votre DAF Iter Advisors construit votre futur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-iter-violet/5 border border-iter-violet/10">
              <p className="text-lg font-semibold text-foreground mb-2">
                Manque de visibilité sur votre cash runway ?
              </p>
              <p className="text-sm text-muted-foreground">
                Sans prévisions fiables, impossible de prendre les bonnes décisions à temps.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-iter-violet/5 border border-iter-violet/10">
              <p className="text-lg font-semibold text-foreground mb-2">
                Reporting manuel chronophage et imprécis ?
              </p>
              <p className="text-sm text-muted-foreground">
                Excel partout, données hétérogènes, aucun single source of truth.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-iter-violet/5 border border-iter-violet/10">
              <p className="text-lg font-semibold text-foreground mb-2">
                Une levée de fonds ou une cession à préparer ?
              </p>
              <p className="text-sm text-muted-foreground">
                Financiers et investisseurs exigent des données solides et professionnelles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MISSIONS */}
      <section className="py-16 sm:py-24 lg:py-32 bg-iter-violet/2">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
              Votre direction financière sur-mesure
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Pilotage de cash',
                description: 'Plan de trésorerie glissant 13 semaines + optimisation BFR',
              },
              {
                title: 'Stratégie & Budget',
                description: 'Business Plan 3 ans + Forecast trimestriel + suivi des écarts',
              },
              {
                title: 'Relations investisseurs',
                description: 'Reportings Board + préparation Data Room',
              },
              {
                title: 'Levée de fonds',
                description: 'Accompagnement Series A/B, Bridge, dette',
              },
              {
                title: 'Outils & structuration',
                description: 'Pennylane, Agicap, Notion, Looker',
              },
              {
                title: 'Management',
                description: 'Encadrement de votre équipe comptable',
              },
            ].map((mission, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-white border border-gray-200 hover:border-iter-violet/30 transition-colors"
              >
                <h3 className="font-semibold text-foreground mb-2">{mission.title}</h3>
                <p className="text-sm text-muted-foreground">{mission.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/daf-externalise" className="text-iter-violet hover:underline font-semibold">
              Voir tout notre périmètre →
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMPARATIF */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
              Pourquoi choisir le temps partagé avec Iter Advisors ?
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left p-3 font-semibold">Critère</th>
                  <th className="text-left p-3 font-semibold">Expert-Comptable</th>
                  <th className="text-left p-3 font-semibold">DAF salarié temps plein</th>
                  <th className="text-left p-3 font-semibold bg-iter-chartreuse/10">DAF Iter Advisors</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Vision stratégique', 'Faible', 'Élevée', 'Maximale'],
                  ['Coût annuel', '4-12 k€', '120-200 k€ chargé', '24-84 k€ selon formule'],
                  ['Délai de mise en place', '2-4 semaines', '3-6 mois', '48 heures'],
                  ['Expertise sectorielle tech', 'Généraliste', 'Variable', 'Spécialiste SaaS / scale-up'],
                  ['Engagement', 'Forfait annuel', 'CDI', 'Mensuel renouvelable'],
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

          <div className="text-center mt-8">
            <a href="/daf-externalise#tarifs" className="text-iter-violet hover:underline font-semibold">
              Voir notre grille tarifaire 2026 →
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5: MÉTHODE */}
      <section className="py-16 sm:py-24 lg:py-32 bg-iter-violet/2">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
              Notre méthode en 3 étapes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Audit flash (48h)',
                description: 'Analyse de l\'existant + identification des urgences',
              },
              {
                step: '2',
                title: 'Plan de bataille (semaine 2)',
                description: 'Mise en place outils + dashboard pilotage',
              },
              {
                step: '3',
                title: 'Copilote régulier',
                description: 'Point hebdomadaire ou mensuel selon vos besoins',
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="p-6 rounded-lg bg-white border border-gray-200">
                  <div className="text-4xl font-bold text-iter-violet mb-3">{item.step}</div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden sm:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronDown className="w-6 h-6 text-gray-300 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: TÉMOIGNAGES */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
              Ce que disent les dirigeants accompagnés
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: 'Charles Deknudt',
                role: 'PDG et fondateur',
                company: 'Eltex',
                quote:
                  'Après avoir levé notre premier tour de table, nous avions besoin de structurer rapidement nos opérations financières. Iter Advisors nous a aidés à professionnaliser notre fonction finance, du reporting à la trésorerie.',
              },
              {
                name: 'Arnaud Mege',
                role: 'Co-founder',
                company: 'Unplexed',
                quote:
                  'Nous avons été très bien accompagnés par les équipes d\'Iter dans la structuration de notre fonction finance chez Unplexed. Les résultats ont été à la hauteur de nos attentes, voire au-delà.',
              },
              {
                name: 'Mathurin Blouin',
                role: 'CEO',
                company: 'MFL',
                quote:
                  'Nous avons fait appel à Iter Advisors dans le cadre de la structuration financière de MFL, une startup web3 en pleine croissance. Meilleure visibilité sur nos finances depuis.',
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-iter-violet/5 border border-iter-violet/10">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role} — {testimonial.company}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
              target="_blank"
              rel="noopener nofollow"
              className="text-iter-violet hover:underline font-semibold"
            >
              Voir les 35 avis sur Trustfolio →
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 7: RÉASSURANCE */}
      <section className="py-16 sm:py-24 lg:py-32 bg-iter-violet/2">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-8">
              Des DAF qui ont déjà été à votre place
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Nos DAF ne sont pas des consultants. Ce sont des opérationnels qui ont dirigé la finance de scale-ups en
              hyper-croissance et de PME en transformation. Cabinet basé à Barcelone, Paris et Toulouse — au cœur de
              l'écosystème tech européen. Membre de France Digitale, recommandé par WILCO.
            </p>
          </div>

          {/* Partner Logos */}
          <div className="flex flex-col sm:flex-row justify-center gap-12 items-center">
            {['France Digitale', 'WILCO', 'DFCG'].map((partner, idx) => (
              <div key={idx} className="text-center">
                <div className="w-24 h-24 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-semibold text-sm text-muted-foreground">
                  {partner}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: FORMULAIRE */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
              Prêt à structurer votre finance ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Audit Cash Runway de 30 minutes — sans engagement, sans pression commerciale.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 border border-gray-200" id="conversion-form">
            <ConversionForm />
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="py-16 sm:py-24 lg:py-32 bg-iter-violet/2">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
              Questions fréquentes
            </h2>
          </div>

          <FAQ />
        </div>
      </section>

      {/* SECTION 10: CTA FINAL */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-6">
            Prenons 30 minutes pour faire le point sur votre cash runway
          </h2>
          <button
            onClick={() => {
              pushToDataLayer('cta_footer_click', { position: 'footer' });
              document.getElementById('conversion-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            data-event="cta_footer_click"
            data-cta-position="footer"
            className="px-8 py-4 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 mb-6"
          >
            Planifier mon Audit Cash Runway →
          </button>
          <p className="text-muted-foreground">
            <strong>Sans engagement. Sans pression commerciale. Garanti.</strong>
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <StickyCTAFooter />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'DAF externalisé pour PME et startups',
            serviceType: 'Direction financière externalisée',
            provider: {
              '@type': 'Organization',
              name: 'Iter Advisors',
              url: 'https://www.iteradvisors.com',
              sameAs: ['https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc'],
            },
            areaServed: [{ '@type': 'Country', name: 'France' }],
            audience: {
              '@type': 'Audience',
              audienceType: 'PME, Startups, Scale-ups',
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Iter Advisors',
                item: 'https://www.iteradvisors.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'DAF externalisé — Landing campagne',
                item: 'https://www.iteradvisors.com/lp/daf-externalise',
              },
            ],
          }),
        }}
      />
    </main>
  );
}
