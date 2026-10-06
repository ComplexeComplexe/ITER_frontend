import ElectronicInvoicingPage from '@/components/pages/ElectronicInvoicingPage';
import { invoiceMetadata } from '@/lib/content/electronic-invoicing';
export const metadata = invoiceMetadata('cout-deploiement', 'en');
export default function Page() { return <ElectronicInvoicingPage pageKey="cout-deploiement" locale="en" />; }
