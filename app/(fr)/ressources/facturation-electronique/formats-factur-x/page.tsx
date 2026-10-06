import ElectronicInvoicingPage from '@/components/pages/ElectronicInvoicingPage';
import { invoiceMetadata } from '@/lib/content/electronic-invoicing';
export const metadata = invoiceMetadata('formats-factur-x', 'fr');
export default function Page() { return <ElectronicInvoicingPage pageKey="formats-factur-x" locale="fr" />; }
