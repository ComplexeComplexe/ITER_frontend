import type { Metadata } from "next";
import NotFoundPage from "@/components/pages/NotFoundPage";

export const metadata: Metadata = {
  title: "Page not found | Iter Advisors",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundPage locale="en" />;
}
