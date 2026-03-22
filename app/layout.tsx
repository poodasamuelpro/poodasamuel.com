import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// DM Sans remplace Inter — cohérent avec le design des composants
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://poodasamuel.vercel.app'),
  title: {
    default: 'Pooda Samuel | Finance, Comptabilité & Digital — Portfolio',
    template: '%s | Pooda Samuel',
  },
  description:
    'Portfolio de Pooda Samuel — Étudiant en Finance & Comptabilité à l\'ESMC Business School Casablanca. Compétences en analyse financière, comptabilité, digital et entrepreneuriat.',
  keywords: [
    'Pooda Samuel',
    'Samuel Pooda',
    'Finance Comptabilité',
    'ESMC Casablanca',
    'Portfolio étudiant',
    'Analyse financière',
    'Comptabilité',
    'Marketing digital',
    'SEO',
    'IziCard',
    'Burkina Faso',
    'Casablanca',
    'Maroc',
  ],
  authors: [{ name: 'Pooda Samuel' }],
  creator: 'Pooda Samuel',
  publisher: 'Pooda Samuel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://poodasamuel.vercel.app',
    title: 'Pooda Samuel | Finance, Comptabilité & Digital',
    description:
      'Portfolio étudiant — Finance, Comptabilité, Digital et Entrepreneuriat.',
    siteName: 'Pooda Samuel Portfolio',
    images: [
      {
        url: '/images/profile.png',
        width: 1200,
        height: 630,
        alt: 'Pooda Samuel — Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pooda Samuel | Finance & Digital',
    description: 'Portfolio étudiant — Finance, Comptabilité, Digital et Entrepreneuriat.',
    images: ['/images/profile.png'],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://poodasamuel.vercel.app" />
        <meta name="theme-color" content="#1d4ed8" />
      </head>
      <body className={`${dmSans.className} antialiased bg-[#fafaf9]`}>
        <Navbar />
        {/* Pas de pt-20 — le Navbar inclut déjà son spacer h-[68px] */}
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
