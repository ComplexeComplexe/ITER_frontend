import { Metadata } from "next";
import DrhFrenchPage from "@/components/pages/DrhFrenchPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import { LOCALE_ROUTES } from "@/lib/locale-route-map";
export function generateMetadata(): Metadata { return buildMetadata({locale:"en", path:"/en/hr-outsourcing", title:"HR director for SMEs and startups | Iter Advisors", description:"HR management, recruitment and team organisation. Agree deliverables, schedule and budget with the right professionals.", localizedPaths:LOCALE_ROUTES["/drh-externalise"]}); }
export default async function Page() { return <DrhFrenchPage locale="en" sharedTime={false} cmsNavigation={await getCmsNavigation("en")} />; }
