import ElectronicInvoicingPage from '@/components/pages/ElectronicInvoicingPage';
import { invoiceMetadata } from '@/lib/content/electronic-invoicing';
export const metadata = invoiceMetadata('deploiement-pme', 'es');
export default function Page() { return <ElectronicInvoicingPage pageKey="deploiement-pme" locale="es" />; }
