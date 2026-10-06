import ElectronicInvoicingPage from '@/components/pages/ElectronicInvoicingPage';
import { invoiceMetadata } from '@/lib/content/electronic-invoicing';
export const metadata = invoiceMetadata('formats-factur-x', 'es');
export default function Page() { return <ElectronicInvoicingPage pageKey="formats-factur-x" locale="es" />; }
