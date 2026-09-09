import { Metadata } from 'next';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
  title: 'Admin Portal | Salasar Aluminium & Hardware',
  description: 'Trade desk admin dashboard for managing wholesale inquiries and orders.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
