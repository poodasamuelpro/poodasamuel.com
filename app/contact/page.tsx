import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

export const metadata: Metadata = generateSEO({
  title: 'Contact - Discutons de votre projet',
  description: 'Contactez Samuel POODA pour vos projets en Finance Digitale, Private Equity et Transformation Digitale. Consultation gratuite disponible.',
  keywords: ['Contact', 'Consultation', 'Finance', 'Digital', 'Casablanca'],
  canonical: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Contactez-moi</h1>
            <div className="w-24 h-1 bg-blue-900 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vous avez un projet en Finance Digitale, Private Equity ou Transformation Digitale ? 
              Discutons-en ensemble.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <FaEnvelope className="text-blue-900 text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <a href="mailto:contact@poodasamuel.com" className="text-gray-600 hover:text-blue-900">
                        contact@poodasamuel.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <FaMapMarkerAlt className="text-blue-900 text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Localisation</h4>
                      <p className="text-gray-600">Casablanca, Maroc</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <FaLinkedin className="text-blue-900 text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">LinkedIn</h4>
                      <a 
                        href="https://linkedin.com/in/poodasamuel" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-900"
                      >
                        /in/poodasamuel
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Consultation Gratuite</h3>
                <p className="mb-4">
                  Première consultation gratuite de 30 minutes pour discuter de votre projet.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Analyse de vos besoins</li>
                  <li>✓ Recommandations stratégiques</li>
                  <li>✓ Estimation de projet</li>
                  <li>✓ Plan d'action personnalisé</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-moi un message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact - Samuel POODA",
            "description": "Contactez Samuel POODA pour vos projets en Finance Digitale",
            "url": "https://poodasamuel.com/contact"
          })
        }}
      />
    </>
  );
}
