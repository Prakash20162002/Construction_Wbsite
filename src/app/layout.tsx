import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import LoadingScreen from '@/components/LoadingScreen';
import ContactPopup from '@/components/ContactPopup';


export const metadata: Metadata = {
  title: 'Bhandari Enterprise — Industrial Engineering & Steel Fabrication',
  description:
    'Bhandari Enterprise is a leading industrial steel fabrication, erection, manufacturing and civil construction company based in Konnagar, West Bengal. Serving clients across India since 1998.',
  keywords: [
    'steel fabrication Kolkata West Bengal',
    'structural erection India',
    'industrial construction',
    'pre-engineered buildings',
    'civil construction India',
    'PEB contractor',
    'steel structure erection',
    'Bhandari Enterprise',
  ],
  authors: [{ name: 'Bhandari Enterprise' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Bhandari Enterprise — Industrial Engineering & Steel Fabrication',
    description: 'Steel fabrication, erection, manufacturing & civil construction company. 50+ projects. Konnagar, West Bengal, India.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Bhandari Enterprise',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0C1829',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LoadingScreen />
        <ContactPopup />
        <a href="#main-content" className="sr-only">Skip to main content</a>
        <Navbar />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
