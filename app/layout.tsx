import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://poodasamuel.com'),
  title: {
    default: 'Samuel POODA | Expert Finance Digitale & Private Equity',
    template: '%s | Samuel POODA'
  },
  description: 'Expert en Finance Digitale, Private Equity et Transformation Digitale. Spécialisé en stratégie financière, automatisation, développement web et gestion de patrimoine. Portfolio professionnel et services de conseil.',
  keywords: [
    'Finance Digitale',
    'Private Equity',
    'Transformation Digitale',
    'Consultant Finance',
    'Stratégie Financière',
    'Automatisation',
    'Lead Generation',
    'WordPress Expert',
    'Développement Web',
    'SEO',
    'Marketing Digital',
    'Finance Management',
    'Digital Strategy',
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
    title: 'Samuel POODA | Expert Finance Digitale & Private Equity',
    description: 'Expert en Finance Digitale, Private Equity et Transformation Digitale. Découvrez mes services et projets.',
    siteName: 'Samuel POODA Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Samuel POODA - Finance Digitale & Private Equity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samuel POODA | Expert Finance Digitale & Private Equity',
    description: 'Expert en Finance Digitale, Private Equity et Transformation Digitale.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
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
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
