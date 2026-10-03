import { Metadata } from "next";
import HRServicePage from "@/components/pages/HRServicePage";
import { getLocalizedHRService } from "@/lib/content/hr-locales";
import { buildMetadata } from "@/lib/metadata";
import { LOCALE_ROUTES } from "@/lib/locale-route-map";
const SOURCE = "/services/gestion-paie-charges-sociales";
const LOCALE = "es" as const;
const content = getLocalizedHRService(SOURCE.split("/").pop()!, LOCALE);
export function generateMetadata(): Metadata { return buildMetadata({ locale: LOCALE, title: content.meta.title, description: content.meta.description, path: LOCALE_ROUTES[SOURCE][LOCALE], localizedPaths: LOCALE_ROUTES[SOURCE] }); }
export default function Page() { return <HRServicePage locale={LOCALE} content={content} />; }
