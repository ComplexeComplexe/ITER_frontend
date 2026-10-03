import { Metadata } from "next";
import DrhFrenchPage from "@/components/pages/DrhFrenchPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import { LOCALE_ROUTES } from "@/lib/locale-route-map";
export function generateMetadata(): Metadata { return buildMetadata({locale:"es", path:"/es/externalizacion-rrhh", title:"Dirección de RRHH externa | Iter Advisors", description:"Dirección de RRHH externa con Borith Biv: contratación, gestión y organización. Horquillas orientativas y presupuesto según alcance.", localizedPaths:LOCALE_ROUTES["/drh-externalise"]}); }
export default async function Page() { return <DrhFrenchPage locale="es" sharedTime={false} cmsNavigation={await getCmsNavigation("es")} />; }
