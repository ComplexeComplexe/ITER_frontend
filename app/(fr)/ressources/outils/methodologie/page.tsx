import MethodologyPage from '@/components/Outils/MethodologyPage';
import { buildMetadata } from '@/lib/metadata';
import { getCmsNavigation } from '@/lib/static-content';
import { TOOL_METHODOLOGY, METHODOLOGY_PATHS } from '@/lib/content/tool-methodology';
const t = TOOL_METHODOLOGY.fr;
export const metadata = buildMetadata({ locale: 'fr', title: t.title, description: t.intro, path: '/ressources/outils/methodologie', localizedPaths: METHODOLOGY_PATHS });
export default async function Page() { return <MethodologyPage locale="fr" cmsNavigation={await getCmsNavigation('fr')} />; }
