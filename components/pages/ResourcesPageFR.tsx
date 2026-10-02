import ResourcesDecisionHub from "./ResourcesDecisionHub";
import type { CmsNavItem } from "@/lib/static-content";

export default function ResourcesPageFR({ cmsNavigation }: { cmsNavigation?: CmsNavItem[] }) {
  return <ResourcesDecisionHub locale="fr" cmsNavigation={cmsNavigation} />;
}
