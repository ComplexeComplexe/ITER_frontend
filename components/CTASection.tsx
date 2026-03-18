"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/navigation";

const ctaText: Record<Locale, { heading: string; paragraph: string; button: string; email: string }> = {
  fr: {
    heading: "Parlons de votre projet",
    paragraph: "Faites les bons choix. Maintenant. Dites non au statu quo et faites le choix de la proximité, de l'efficacité et de la flexibilité avec Iter Advisors.",
    button: "Prendre rendez-vous",
    email: "Nous écrire",
  },
  en: {
    heading: "Let's talk about your project",
    paragraph: "Make the right choices. Now. Say no to the status quo and choose proximity, efficiency and flexibility with Iter Advisors.",
    button: "Book a meeting",
    email: "Email us",
  },
  es: {
    heading: "Hablemos de su proyecto",
    paragraph: "Tome las decisiones correctas. Ahora. Diga no al statu quo y elija la proximidad, la eficiencia y la flexibilidad con Iter Advisors.",
    button: "Concierte una cita",
    email: "Escríbenos",
  },
};

export default function CTASection({ locale }: { locale: Locale }) {
  const t = ctaText[locale];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-iter-chartreuse relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none">
          <circle cx="200" cy="300" r="300" stroke="#0A0A0A" strokeWidth="0.5" fill="none" />
          <circle cx="1200" cy="200" r="200" stroke="#0A0A0A" strokeWidth="0.5" fill="none" />
          <line x1="0" y1="100" x2="1440" y2="500" stroke="#0A0A0A" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-iter-dark leading-tight mb-6">
            {t.heading}
          </h2>
          <p className="text-lg text-iter-dark/70 leading-relaxed mb-10">
            {t.paragraph}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-dark text-white font-semibold text-base hover:shadow-xl transition-all duration-300 group"
            >
              {t.button}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="mailto:contact@iteradvisors.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-iter-dark/30 text-iter-dark font-medium text-base hover:bg-iter-dark/5 transition-all duration-300"
            >
              <Mail size={18} />
              {t.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
