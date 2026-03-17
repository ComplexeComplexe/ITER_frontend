import { Locale } from "@/lib/i18n";
import Header from "./Header";
import Footer from "./Footer";
import type { NavItem } from "@/lib/navigation";

export default function PageLayout({
  locale,
  children,
  cmsNavigation,
}: {
  locale: Locale;
  children: React.ReactNode;
  cmsNavigation?: NavItem[];
}) {
  return (
    <>
      <Header locale={locale} cmsNavigation={cmsNavigation} />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  );
}
