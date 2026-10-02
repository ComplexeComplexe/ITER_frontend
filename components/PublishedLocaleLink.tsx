import Link from "next/link";
import type { ComponentProps } from "react";
import type { Locale } from "@/lib/i18n";

/** Clearly label a temporary FR reference until its translation is reviewed. */
export default function PublishedLocaleLink({ locale, children, href, ...props }: ComponentProps<typeof Link> & { locale: Locale }) {
  const french = locale !== "fr" && typeof href === "string" && href.startsWith("/") && !/^\/(?:en|es)(?:\/|$)/.test(href);
  return <Link href={href} {...props} hrefLang={french ? "fr" : props.hrefLang}>{children}{french && <span className="ml-1 text-xs font-normal" title={locale === "en" ? "Resource in French" : "Recurso en francés"}>{" (FR)"}</span>}</Link>;
}
