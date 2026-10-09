/** Public identity. A finance contact is not automatically an article's author or reviewer. */
export const FINANCE_EXPERT = {
  name: "Sébastien Doat",
  slug: "sebastien-doat",
  href: "/a-propos/sebastien-doat",
  id: "https://www.iteradvisors.com/a-propos/sebastien-doat#person",
  linkedin: "https://www.linkedin.com/in/sebastien-doat-fractional-cfo/",
  malt: "https://www.malt.com/profile/sebastiendoat",
  photo: "/images/team/sebastien-doat.webp",
  role: "Associé fondateur et DAF externalisé",
  description: "Sébastien Doat, associé fondateur d’Iter Advisors, accompagne les dirigeants sur le pilotage financier, la trésorerie et la préparation des financements.",
  expertise: ["DAF externalisé", "Gestion de trésorerie", "Modélisation financière", "Reporting investisseurs", "Acquisitions et intégration financière"],
  podcast: {
    href: "https://podcast.ausha.co/le-nerf-de-la-guerre/12-dans-les-coulisses-de-l-acquisition-de-filiales-sebastien-doat-iter-advisors",
    title: "Gérer la partie financière de l’acquisition de filiales",
    series: "Le Nerf de la Guerre",
    date: "2025-02-07",
  },
} as const;

/** A single Person ID across translated profiles, articles, services and the organization. */
export function editorialPersonId(url: string): string {
  const absolute = new URL(url, "https://www.iteradvisors.com");
  if (absolute.origin === "https://www.iteradvisors.com" && absolute.pathname.replace(/\/$/, "").endsWith(`/${FINANCE_EXPERT.slug}`)) return FINANCE_EXPERT.id;
  const newMember = absolute.pathname.match(/^\/(?:en\/(?:about|a-propos)|es\/(?:quienes-somos|a-propos)|a-propos)\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/);
  if (newMember && absolute.origin === "https://www.iteradvisors.com") return `https://www.iteradvisors.com/a-propos/${newMember[1]}#person`;
  return `${absolute.origin}${absolute.pathname.replace(/\/$/, "")}#person`;
}
