import ElectronicInvoicingPage from '@/components/pages/ElectronicInvoicingPage';
import { invoiceMetadata } from '@/lib/content/electronic-invoicing';
export const metadata = invoiceMetadata('e-reporting', 'fr');
export default function Page() { return <ElectronicInvoicingPage pageKey="e-reporting" locale="fr" />; }
