import Image from "next/image";
import type { StrapiTeamMember } from "@/lib/strapi";
import { strapiMediaUrl } from "@/lib/strapi";

function getInitials(firstName: string, lastName: string): string {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

export default function TeamMemberCard({ member }: { member: StrapiTeamMember }) {
  const name = `${member.firstName} ${member.lastName}`.trim();
  const photoUrl = strapiMediaUrl(member.photo);
  const linkedin = member.linkedIn || "#";
  const initials = getInitials(member.firstName, member.lastName);

  return (
    <a
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="group text-center w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(20%-1.2rem)]"
    >
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
      {linkedin !== "#" && (
        <div className="mt-1.5 flex justify-center">
          <svg
            className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-iter-violet transition-colors"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>
      )}
    </a>
  );
}
