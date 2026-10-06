import ElectronicInvoicingPage from '@/components/pages/ElectronicInvoicingPage';
import { invoiceMetadata } from '@/lib/content/electronic-invoicing';
export const metadata = invoiceMetadata('deploiement-pme', 'en');
export default function Page() { return <ElectronicInvoicingPage pageKey="deploiement-pme" locale="en" />; }
