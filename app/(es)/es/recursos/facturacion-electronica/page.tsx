import ElectronicInvoicingPage from '@/components/pages/ElectronicInvoicingPage';
import { invoiceMetadata } from '@/lib/content/electronic-invoicing';
export const metadata = invoiceMetadata('guide', 'es');
export default function Page() { return <ElectronicInvoicingPage pageKey="guide" locale="es" />; }
