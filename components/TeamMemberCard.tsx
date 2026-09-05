import Image from "next/image";
import Link from "next/link";
import type { StrapiTeamMember } from "@/lib/static-content";
import { strapiMediaUrl } from "@/lib/static-content";
import { getAuthorSlugs } from "@/lib/content/team";
import { aboutHref } from "@/lib/path-localization";
import type { Locale } from "@/lib/i18n";

function getInitials(firstName: string, lastName: string): string {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

const PROFILS_PUBLIES = new Set(getAuthorSlugs());

const VOIR_PROFIL: Record<Locale, string> = {
  fr: "Voir le profil",
  en: "View profile",
  es: "Ver perfil",
};

/**
 * Carte d'un membre de l'équipe.
 *
 * SEO-AUD-0824 §3 (2026-08-24) — la carte entière était un lien vers LinkedIn.
 * Les 24 fiches d'expert du site (8 personnes × 3 langues) n'avaient donc
 * aucun lien entrant : orphelines, elles ne recevaient aucun PageRank interne
 * et n'étaient découvrables que par le sitemap. C'est d'autant plus dommage
 * que ces pages portent l'E-E-A-T du cabinet — le nom, le parcours et les
 * publications de la personne qui signe les articles.
 *
 * La carte pointe désormais vers la fiche interne quand elle existe ; LinkedIn
 * reste accessible par son icône, en lien distinct. Un membre sans fiche
 * publiée (bio incomplète dans les trois langues) garde l'ancien comportement.
 */
export default function TeamMemberCard({
  member,
  locale = "fr",
}: {
  member: StrapiTeamMember;
  locale?: Locale;
}) {
  const name = `${member.firstName} ${member.lastName}`.trim();
  const photoUrl = strapiMediaUrl(member.photo);
  const linkedin = member.linkedIn || "#";
  const initials = getInitials(member.firstName, member.lastName);
  const profil = PROFILS_PUBLIES.has(member.slug) ? aboutHref(locale, member.slug) : null;

  const visuel = (
    <>
      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-2xl bg-iter-violet overflow-hidden group-hover:shadow-lg group-hover:shadow-iter-violet/20 transition-all duration-300">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            width={96}
            height={96}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white font-bold text-lg md:text-xl">
              {initials}
            </span>
          </div>
        )}
      </div>
      <h3 className="font-semibold text-sm group-hover:text-iter-violet transition-colors">
        {name}
      </h3>
      <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
    </>
  );

  const iconeLinkedIn = linkedin !== "#" && (
    <a
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`LinkedIn — ${name}`}
      className="mt-1.5 inline-flex justify-center"
    >
      <svg
        className="w-3.5 h-3.5 text-muted-foreground/40 hover:text-iter-violet transition-colors"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </a>
  );

  const classes =
    "group text-center w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(20%-1.2rem)]";

  // Sans fiche publiée, la carte reste un lien LinkedIn — mieux vaut ça qu'un
  // lien vers une page qui n'existe pas.
  if (!profil) {
    return (
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className={classes}>
        {visuel}
        {linkedin !== "#" && <div className="mt-1.5 flex justify-center">{iconeLinkedIn}</div>}
      </a>
    );
  }

  return (
    <div className={classes}>
      <Link href={profil} className="group block">
        {visuel}
        <span className="mt-1 inline-block text-xs font-medium text-iter-violet/80 group-hover:text-iter-violet transition-colors">
          {VOIR_PROFIL[locale]}
        </span>
      </Link>
      <div className="mt-1 flex justify-center">{iconeLinkedIn}</div>
    </div>
  );
}
