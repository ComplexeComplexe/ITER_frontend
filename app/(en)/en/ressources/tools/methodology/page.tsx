import MethodologyPage from '@/components/Outils/MethodologyPage';
import { buildMetadata } from '@/lib/metadata';
import { getCmsNavigation } from '@/lib/static-content';
import { TOOL_METHODOLOGY, METHODOLOGY_PATHS } from '@/lib/content/tool-methodology';
const t = TOOL_METHODOLOGY.en;
export const metadata = buildMetadata({ locale: 'en', title: t.title, description: t.intro, path: '/en/ressources/tools/methodology', localizedPaths: METHODOLOGY_PATHS });
export default async function Page() { return <MethodologyPage locale="en" cmsNavigation={await getCmsNavigation('en')} />; }
