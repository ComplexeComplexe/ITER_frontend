import { permanentRedirect } from "next/navigation";
import { TAX_COMPARISON_PATHS } from "@/lib/content/tax-comparison";

// Match the existing next.config redirect; do not retain an obsolete article.
export default function Page() {
  permanentRedirect(TAX_COMPARISON_PATHS.fr);
}
