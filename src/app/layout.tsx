import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';
import { EnquiryProvider } from '@/context/EnquiryContext';
import JsonLd from '@/components/JsonLd';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/jsonld';
import { BUSINESS, SITE_URL } from '@/config/business';

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Aluminium Door & Window Hardware Raipur | Salasar',
    template: '%s',
  },
  description: BUSINESS.description,
  // `keywords` removed: ignored by Google since 2009 and by every other major
  // engine, and the previous list described extrusion products this business
  // does not actually sell.
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: BUSINESS.name,
    title: 'Aluminium Door & Window Hardware Raipur | Salasar',
    description: BUSINESS.description,
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon-48x48.png',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION / _BING_ in the deployment
    // environment. The DNS TXT method is an alternative that needs no code.
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
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

import MobileQuickActionBar from '@/components/layout/MobileQuickActionBar';
import Analytics from '@/components/Analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();

  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <JsonLd schema={orgSchema} />
        <JsonLd schema={webSiteSchema} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="192x192" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#1A1D20]" suppressHydrationWarning>
        <EnquiryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileQuickActionBar />
          <EnquiryModal />
          <Analytics />
        </EnquiryProvider>
      </body>
    </html>
  );
}
