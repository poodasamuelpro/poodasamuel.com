'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaChartLine, FaCoins, FaRobot, FaWordpress, FaMobile, FaDatabase, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              SAMUEL POODA
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-blue-200">
              Expert Finance Digitale & Private Equity
            </p>
            <p className="text-xl md:text-2xl mb-8 text-blue-300">
              Transformation Digitale | Automatisation | Stratégie Financière
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                href="/contact" 
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
              >
                Me Contacter
              </Link>
              <Link 
                href="/portfolio" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105"
              >
                Voir Mes Projets
              </Link>
            </div>
            
            <div className="flex justify-center gap-6 mt-12">
              <a href="https://linkedin.com/in/poodasamuel" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                <FaLinkedin size={32} />
              </a>
              <a href="mailto:contact@poodasamuel.com" className="hover:text-blue-300 transition-colors">
                <FaEnvelope size={32} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* À Propos Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Qui suis-je ?</h2>
            <div className="w-24 h-1 bg-blue-900 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="https://sspark.genspark.ai/cfimages?u1=qi%2BBIdIQWamYlb7Z7d6NWFgOgvHbR4v3SUOMBDfrWSLNlTWNWwh6gCFzWZD62IIVAPqwZG6liWl51U0q6JbfyruVvOph48wX6carqMCuB13PSIqY987NmuqBJ5FlwmasdxgOA0g%2FlREl9DEwWaljpx4qgz%2FH6K%2BY7F37ZNn4bvyO5V%2FhFmYsTXMc&u2=RALBMxZs0uzqdKtH&width=2560"
                  alt="Finance Digitale"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Étudiant en Finance & Expert Digital
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                Étudiant en troisième année de licence en <strong>Finance et Comptabilité</strong> à l'ESMC Business School à Casablanca, après l'obtention d'un Bac+2 en Management des Affaires et Transformation Digitale.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Je me positionne à l'intersection de la <strong>Finance Digitale</strong> et de la <strong>Transformation Digitale</strong>, avec une expertise en Private Equity, automatisation et développement web.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Mon objectif : devenir un acteur polyvalent capable de connecter les stratégies financières aux innovations technologiques pour créer de la valeur ajoutée.
              </p>
              <Link 
                href="/about" 
                className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                En savoir plus
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spécialisations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mes Spécialisations</h2>
            <div className="w-24 h-1 bg-blue-900 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Entre Finance et Transformation Digitale, je maîtrise les outils modernes pour optimiser la performance des entreprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Finance Digitale */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="flex justify-center mb-6">
                <FaChartLine className="text-blue-900 text-6xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Finance Digitale</h3>
              <p className="text-gray-700 mb-4">
                Expertise en analyse financière, gestion de patrimoine digitalisée et stratégies d'investissement modernes.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Analyse financière avancée</li>
                <li>• Gestion de portefeuille</li>
                <li>• Modélisation financière</li>
                <li>• Reporting automatisé</li>
              </ul>
            </motion.div>

            {/* Private Equity */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="flex justify-center mb-6">
                <FaCoins className="text-blue-900 text-6xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Private Equity</h3>
              <p className="text-gray-700 mb-4">
                Accompagnement dans les stratégies d'investissement et de levée de fonds pour startups et PME.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Due diligence financière</li>
                <li>• Valorisation d'entreprise</li>
                <li>• Structuration de deals</li>
                <li>• Pitch deck financier</li>
              </ul>
            </motion.div>

            {/* Automatisation */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="flex justify-center mb-6">
                <FaRobot className="text-blue-900 text-6xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Automatisation</h3>
              <p className="text-gray-700 mb-4">
                Développement de systèmes intelligents pour la génération de leads, emailing et publication automatique.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Lead generation automatisée</li>
                <li>• Email marketing intelligent</li>
                <li>• Scraping & analyse de données</li>
                <li>• Publication auto sur réseaux</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compétences Techniques */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Compétences Techniques</h2>
            <div className="w-24 h-1 bg-blue-900 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* WordPress */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <FaWordpress className="text-blue-900 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">WordPress</h4>
              <p className="text-gray-600">Sites vitrines, e-commerce, personnalisation avancée</p>
            </motion.div>

            {/* Applications Mobile */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <FaMobile className="text-blue-900 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Mobile Android</h4>
              <p className="text-gray-600">Développement d'applications mobiles natives</p>
            </motion.div>

            {/* DMP */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <FaDatabase className="text-blue-900 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">DMP (En cours)</h4>
              <p className="text-gray-600">Data Management Platform en développement</p>
            </motion.div>

            {/* SEO & Marketing */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <FaChartLine className="text-blue-900 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">SEO & Analytics</h4>
              <p className="text-gray-600">Référencement, Google Analytics, SEMrush</p>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/services" 
              className="inline-block bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Découvrir tous mes services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-6">Prêt à transformer votre entreprise ?</h2>
            <p className="text-xl mb-8 text-blue-200 max-w-3xl mx-auto">
              Contactez-moi pour discuter de vos projets en Finance Digitale, Private Equity ou Transformation Digitale.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              Démarrer un projet
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Samuel POODA",
            "jobTitle": "Expert Finance Digitale & Private Equity",
            "url": "https://poodasamuel.com",
            "sameAs": [
              "https://linkedin.com/in/poodasamuel",
              "https://twitter.com/poodasamuel"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Casablanca",
              "addressCountry": "MA"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "ESMC Business School"
            },
            "knowsAbout": [
              "Finance Digitale",
              "Private Equity",
              "Transformation Digitale",
              "Automatisation",
              "Développement Web"
            ]
          })
        }}
      />
    </>
  );
}
