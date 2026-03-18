import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://poodasamuel.com'),
  title: {
    default: 'Samuel POODA | Étudiant Finance & Digital - Portfolio',
    template: '%s | Samuel POODA'
  },
  description: 'Étudiant en Finance et Comptabilité à l\'ESMC Business School Casablanca. Découvrez mes compétences en WordPress, design graphique, SEO et stratégie digitale.',
  keywords: [
    'Samuel POODA',
    'Étudiant Finance',
    'ESMC Casablanca',
    'Portfolio Étudiant',
    'WordPress',
    'Design Graphique',
    'SEO',
    'Marketing Digital',
    'Transformation Digitale',
    'Casablanca',
    'Maroc'
  ],
  authors: [{ name: 'Samuel POODA' }],
  creator: 'Samuel POODA',
  publisher: 'Samuel POODA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://poodasamuel.com',
    title: 'Samuel POODA | Étudiant Finance & Digital',
    description: 'Portfolio étudiant - Finance, Digital, WordPress et Design',
    siteName: 'Samuel POODA Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samuel POODA | Étudiant Finance & Digital',
    description: 'Portfolio étudiant - Finance, Digital, WordPress et Design',
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
        <link rel="canonical" href="https://poodasamuel.com" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
