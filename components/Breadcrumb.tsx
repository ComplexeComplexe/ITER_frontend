import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { getHomePath } from "@/lib/navigation";
import { breadcrumbSchema } from "@/lib/schemas";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({
  locale,
  items,
  variant = "light",
}: {
  locale: Locale;
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  const homePath = getHomePath(locale);

  // Build schema items: Home + all breadcrumb items
  const schemaItems = [
    { name: "Iter Advisors", url: homePath },
    ...items.map((item) => ({
      name: item.label,
      url: item.href || "",
    })),
  ].filter((item) => item.url);

  return (
    <>
      {schemaItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema(schemaItems)),
          }}
        />
      )}
      <nav className="mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap text-[12px] tracking-wide">
          <li>
            <Link
              href={homePath}
              className={
                isDark
                  ? "text-white/30 hover:text-white/60 transition-colors"
                  : "text-foreground/30 hover:text-iter-violet transition-colors"
              }
            >
              Iter Advisors
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className={isDark ? "text-white/15" : "text-foreground/15"}>/</span>
              {item.href ? (
                <Link
                  href={item.href}
                  className={
                    isDark
                      ? "text-white/30 hover:text-white/60 transition-colors"
                      : "text-foreground/30 hover:text-iter-violet transition-colors"
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isDark ? "text-white/50" : "text-foreground/50"}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
