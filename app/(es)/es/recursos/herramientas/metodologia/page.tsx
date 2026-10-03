import MethodologyPage from '@/components/Outils/MethodologyPage';
import { buildMetadata } from '@/lib/metadata';
import { getCmsNavigation } from '@/lib/static-content';
import { TOOL_METHODOLOGY, METHODOLOGY_PATHS } from '@/lib/content/tool-methodology';
const t = TOOL_METHODOLOGY.es;
export const metadata = buildMetadata({ locale: 'es', title: t.title, description: t.intro, path: '/es/recursos/herramientas/metodologia', localizedPaths: METHODOLOGY_PATHS });
export default async function Page() { return <MethodologyPage locale="es" cmsNavigation={await getCmsNavigation('es')} />; }
