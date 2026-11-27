import { cloneElement, isValidElement, type ReactNode } from "react";
import Link from "next/link";

/*
 * Lien contextuel vers l'offre d'accompagnement Beckham, ajouté aux pages
 * EN/ES du sujet (pilier et articles). L'offre n'existe qu'en EN et en ES :
 * un lien posé dans le contenu FR serait traduit vers le pilier, d'où cet
 * ajout propre à la langue (même principe que /en/resources/france-spain-tax).
 *
 * Audit maillage interne du 2026-11-28 : /en/services/beckham-law et
 * /es/servicios/ley-beckham n'avaient qu'un lien entrant contextuel et une
 * profondeur de 4 ; la page ES est « Détectée, actuellement non indexée ».
 */
const COPY = {
  en: {
    href: "/en/services/beckham-law",
    lead: "Applying for the regime?",
    label: "Our Beckham Law support: eligibility check, Modelo 149 filing and coordination with your tax adviser",
  },
  es: {
    href: "/es/servicios/ley-beckham",
    lead: "¿Va a solicitar el régimen?",
    label: "Nuestro acompañamiento Ley Beckham: verificación de requisitos, presentación del Modelo 149 y coordinación con su asesor fiscal",
  },
} as const;

export function withBeckhamServiceLink(page: ReactNode, locale: "en" | "es"): ReactNode {
  if (!isValidElement<{ children: ReactNode }>(page)) return page;
  const copy = COPY[locale];
  return cloneElement(page, {
    children: (
      <>
        {page.props.children}
        <aside className="container px-4 sm:px-6 pb-10">
          <p className="text-base text-foreground">
            {copy.lead}{" "}
            <Link href={copy.href} className="text-iter-violet underline underline-offset-4">
              {copy.label}
            </Link>
          </p>
        </aside>
      </>
    ),
  });
}
