import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';
import { EnquiryProvider } from '@/context/EnquiryContext';
import JsonLd from '@/components/JsonLd';
import { getOrganizationSchema, BASE_URL } from '@/lib/jsonld';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Salasar Aluminium & Hardware | Architectural Extrusions & Hardware Supplier',
    template: '%s | Salasar Aluminium & Hardware',
  },
  description:
    'Premier supplier of architectural aluminium extrusions, slimline sliding door systems, glass balustrade channels, curtain wall mullions, and custom industrial T-slot profiles for builders, architects, and industrial manufacturers.',
  keywords: [
    'aluminium hardware supplier',
    'architectural aluminium extrusions',
    'slimline sliding door profiles',
    'glass railing U-channel',
    'commercial curtain wall mullion',
    'industrial T-slot 4040 profile',
    'anodized aluminium finishes',
    'solar PV mounting rails',
  ],
  authors: [{ name: 'Salasar Aluminium & Hardware Solutions' }],
  creator: 'Salasar Aluminium & Hardware',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Salasar Aluminium & Hardware',
    title: 'Salasar Aluminium & Hardware | Architectural Extrusions & Hardware',
    description:
      'Explore premier architectural extrusions, glass railing channels, curtain wall profiles, and anodized finishes. Direct trade supply for architects and contractors.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Salasar Architectural Aluminium Systems',
      },
    ],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = getOrganizationSchema();

  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <JsonLd schema={orgSchema} />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#1A1D20]" suppressHydrationWarning>
        <EnquiryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <EnquiryModal />
        </EnquiryProvider>
      </body>
    </html>
  );
}
