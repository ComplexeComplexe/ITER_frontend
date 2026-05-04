import Link from "next/link";
import { Locale } from "@/lib/i18n";

interface AuthorBylineProps {
  name: string;
  jobTitle: string;
  linkedInUrl: string;
  avatarUrl: string;
  updateDate: string;
  locale: Locale;
}

export default function AuthorByline({
  name,
  jobTitle,
  linkedInUrl,
  avatarUrl,
  updateDate,
  locale,
}: AuthorBylineProps) {
  const formattedDate = new Date(updateDate).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-GB",
    { year: "numeric", month: "long" }
  );

  return (
    <div className="flex items-center gap-4 py-6 px-4 mb-8 bg-iter-violet/5 rounded-lg border border-iter-violet/10">
      <img
        src={avatarUrl}
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <Link
            href={linkedInUrl}
            target="_blank"
            rel="me noopener noreferrer"
            className="text-iter-violet hover:text-iter-violet/80 text-sm"
            title="LinkedIn Profile"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mb-1">{jobTitle}</p>
        <p className="text-xs text-muted-foreground">
          {locale === "fr" ? "Mis à jour en" : "Updated"} {formattedDate}
        </p>
      </div>
    </div>
  );
}
