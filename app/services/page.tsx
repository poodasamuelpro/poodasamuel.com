"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCode, FaChartLine, FaPalette, FaSearch, FaBullhorn, FaFileAlt, FaCheck, FaArrowRight } from 'react-icons/fa';

export default function ServicesPage() {
  const services = [
    {
      icon: FaCode,
      title: "Création de Sites Web Modernes",
      description: "Sites professionnels et responsives avec WordPress/Elementor",
      features: [
        "Sites vitrines & e-commerce",
        "Design moderne et responsive",
        "Fonctionnalités personnalisées",
        "Maintenance et mises à jour",
        "Intégration de systèmes de paiement"
      ],
      color: "from-blue-500 to-cyan-500",
      price: "À partir de 500 €"
    },
    {
      icon: FaChartLine,
      title: "Stratégie Digitale Complète",
      description: "Content marketing, réseaux sociaux et acquisition de trafic",
      features: [
        "Stratégie de contenu personnalisée",
        "Gestion des réseaux sociaux",
        "Acquisition de trafic qualifié",
        "Analyse et reporting",
        "Optimisation continue"
      ],
      color: "from-purple-500 to-pink-500",
      price: "À partir de 300 €/mois"
    },
    {
      icon: FaPalette,
      title: "Design Graphique & Visuel",
      description: "Création de logos, flyers, présentations et montage vidéo",
      features: [
        "Logos professionnels",
        "Flyers et affiches",
        "Présentations visuelles",
        "Montage vidéo (CapCut)",
        "Charte graphique complète"
      ],
      color: "from-pink-500 to-rose-500",
      price: "À partir de 50 €"
    },
    {
      icon: FaSearch,
      title: "Optimisation SEO",
      description: "Audit SEO on-page/off-page, Google Analytics et SEMrush",
      features: [
        "Audit SEO complet",
        "Optimisation on-page",
        "Stratégie de backlinks",
        "Configuration Google Analytics",
        "Reporting mensuel SEMrush"
      ],
      color: "from-green-500 to-teal-500",
      price: "À partir de 200 €"
    },
    {
      icon: FaBullhorn,
      title: "Gestion de Campagnes Publicitaires",
      description: "Google Ads, Facebook Ads et Instagram pour booster votre visibilité",
      features: [
        "Campagnes Google Ads",
        "Publicités Facebook & Instagram",
        "Ciblage et optimisation",
        "A/B Testing",
        "Reporting détaillé"
      ],
      color: "from-orange-500 to-red-500",
      price: "À partir de 150 €/mois"
    },
    {
      icon: FaFileAlt,
      title: "Rédaction de CV & Lettres de Motivation",
      description: "Documents professionnels percutants pour décrocher vos opportunités",
      features: [
        "CV professionnel ATS-friendly",
        "Lettre de motivation personnalisée",
        "Optimisation LinkedIn",
        "Révisions illimitées",
        "Conseil en personal branding"
      ],
      color: "from-indigo-500 to-purple-500",
      price: "À partir de 40 €"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Découverte",
      description: "Analyse de vos besoins et objectifs lors d'un premier échange"
    },
    {
      step: "02",
      title: "Proposition",
      description: "Présentation d'une solution sur mesure avec devis détaillé"
    },
    {
      step: "03",
      title: "Réalisation",
      description: "Développement et création avec validation à chaque étape"
    },
    {
      step: "04",
      title: "Livraison",
      description: "Mise en ligne et formation pour une autonomie complète"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Mes Services
            </h1>
            <p className="text-xl opacity-90">
              Des solutions digitales complètes pour booster votre présence en ligne et atteindre vos objectifs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ce que je propose
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une gamme complète de services pour répondre à tous vos besoins digitaux
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Service Header */}
                  <div className={`p-8 bg-gradient-to-br ${service.color} text-white`}>
                    <Icon className="text-5xl mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="opacity-90">{service.description}</p>
                  </div>

                  {/* Service Content */}
                  <div className="p-8">
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-2xl font-bold text-gray-900 mb-4">{service.price}</p>
                      <Link
                        href="/contact"
                        className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${service.color} text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                      >
                        <span>Demander un devis</span>
                        <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ma Méthode de Travail
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un processus simple et efficace pour garantir votre satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="mb-6">
                  <span className="text-6xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>

                {/* Arrow connector (except for last item) */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform -translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pourquoi me choisir ?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Expertise Multiple",
                description: "Compétences variées en web, design, marketing et finance pour une approche globale"
              },
              {
                title: "Qualité Garantie",
                description: "Travail rigoureux, attention aux détails et respect des délais promis"
              },
              {
                title: "Accompagnement Personnalisé",
                description: "Écoute, conseil et suivi régulier pour assurer votre réussite"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contactez-moi dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé gratuit
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center space-x-2 px-10 py-5 bg-white text-blue-600 rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <span>Me Contacter</span>
                <FaArrowRight />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center space-x-2 px-10 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <span>Voir mes réalisations</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
