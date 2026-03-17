import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/og-image.jpg',
}: SEOProps): Metadata {
  const baseUrl = 'https://poodasamuel.com';
  const fullUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return {
    title,
    description,
    keywords: [
      'Finance Digitale',
      'Private Equity',
      'Transformation Digitale',
      'Samuel POODA',
      ...keywords,
    ],
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Samuel POODA Portfolio',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// Structured Data (JSON-LD) pour SEO avancé
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Samuel POODA',
    jobTitle: 'Expert Finance Digitale & Private Equity',
    url: 'https://poodasamuel.com',
    sameAs: [
      'https://linkedin.com/in/poodasamuel',
      'https://twitter.com/poodasamuel',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Casablanca',
      addressCountry: 'MA',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'ESMC Business School',
    },
    knowsAbout: [
      'Finance Digitale',
      'Private Equity',
      'Transformation Digitale',
      'Stratégie Financière',
      'Automatisation',
      'Développement Web',
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Samuel POODA Portfolio',
    url: 'https://poodasamuel.com',
    description: 'Expert en Finance Digitale, Private Equity et Transformation Digitale',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://poodasamuel.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Samuel POODA Consulting',
    image: 'https://poodasamuel.com/logo.png',
    description: 'Services de conseil en Finance Digitale, Private Equity et Transformation Digitale',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Casablanca',
      addressCountry: 'MA',
    },
    email: 'contact@poodasamuel.com',
    url: 'https://poodasamuel.com',
    priceRange: '$$',
    telephone: '+212-XXX-XXXXXX',
  };
}
