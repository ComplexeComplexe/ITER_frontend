import { NextRequest, NextResponse } from "next/server";
import { Locale, isLocale } from "@/lib/i18n";
import { getGlobal } from "@/lib/strapi";
import type { NavItem } from "@/lib/navigation";

function toLocale(input: string | null): Locale {
  if (input && isLocale(input)) return input;
  return "fr";
}

function toNavItems(navigation: { label: string; url: string; children: { label: string; url: string }[] }[]): NavItem[] {
  return navigation
    .map((item) => {
      const children =
        item.children
          ?.filter((child) => child.label && child.url)
          .map((child) => ({
            text: child.label,
            href: child.url,
          })) ?? [];

      return {
        title: item.label || "",
        href: item.url || "#",
        children: children.length > 0 ? children : undefined,
      };
    })
    .filter((item) => item.title && item.href);
}

export async function GET(request: NextRequest) {
  const locale = toLocale(request.nextUrl.searchParams.get("locale"));
  const global = await getGlobal(locale);
  const navigation = global?.navigation ? toNavItems(global.navigation) : [];

  return NextResponse.json(
    { navigation },
    {
      headers: {
        // Keep this short so CMS edits propagate quickly.
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    }
  );
}
