import ElectronicInvoicingPage from '@/components/pages/ElectronicInvoicingPage';
import { invoiceMetadata } from '@/lib/content/electronic-invoicing';
export const metadata = invoiceMetadata('choisir-plateforme-agreee', 'en');
export default function Page() { return <ElectronicInvoicingPage pageKey="choisir-plateforme-agreee" locale="en" />; }
