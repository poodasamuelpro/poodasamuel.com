import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Services - Finance Digitale & Transformation',
  description: 'Services professionnels en Finance Digitale, Private Equity, développement web, automatisation et transformation digitale. WordPress, SEO, applications mobiles.',
  keywords: ['Services Finance', 'Consulting Digital', 'WordPress', 'SEO', 'Private Equity', 'Automatisation'],
  canonical: '/services',
});

export default function ServicesPage() {
  return <div>Services Content (sera développé)</div>;
}
