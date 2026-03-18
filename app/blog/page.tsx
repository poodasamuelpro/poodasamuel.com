"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaPenNib, FaChartLine, FaCode, FaLightbulb } from 'react-icons/fa';

export default function BlogPage() {
  // Placeholder articles - à remplacer par de vrais articles plus tard
  const articles = [
    {
      title: "Les tendances du design web en 2025",
      excerpt: "Découvrez les dernières tendances en matière de design web et comment les appliquer à votre site...",
      category: "Design",
      date: "15 Mars 2025",
      icon: FaPenNib,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Optimiser son SEO : les bases essentielles",
      excerpt: "Guide complet pour améliorer votre référencement naturel et gagner en visibilité sur Google...",
      category: "SEO",
      date: "10 Mars 2025",
      icon: FaChartLine,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "WordPress vs Site custom : que choisir ?",
      excerpt: "Comparaison détaillée entre WordPress et un site développé sur mesure pour votre projet...",
      category: "Développement",
      date: "5 Mars 2025",
      icon: FaCode,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Entrepreneuriat digital : par où commencer ?",
      excerpt: "Mes conseils pour se lancer dans l'entrepreneuriat digital et réussir son projet...",
      category: "Entrepreneuriat",
      date: "1 Mars 2025",
      icon: FaLightbulb,
      color: "from-orange-500 to-red-500"
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
              Blog
            </h1>
            <p className="text-xl opacity-90">
              Conseils, tutoriels et réflexions sur le web, le digital et l'entrepreneuriat
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Message */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
              <FaPenNib className="text-5xl text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bientôt disponible !
            </h2>
            <p className="text-xl text-gray-600">
              Je prépare actuellement une série d'articles passionnants sur le développement web, 
              le marketing digital et l'entrepreneuriat. Revenez bientôt !
            </p>
          </motion.div>

          {/* Preview Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {articles.map((article, index) => {
              const Icon = article.icon;
              return (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 opacity-60 cursor-not-allowed"
                >
                  <div className={`p-6 bg-gradient-to-br ${article.color}`}>
                    <Icon className="text-4xl text-white mb-3" />
                    <span className="inline-block px-3 py-1 bg-white/90 text-gray-900 rounded-full text-xs font-semibold mb-3">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                    <p className="text-gray-600">{article.excerpt}</p>
                    <div className="mt-4 inline-block px-4 py-2 bg-gray-200 text-gray-500 rounded-full text-sm font-semibold">
                      Prochainement
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center bg-gradient-to-br from-blue-50 to-purple-50 p-12 rounded-3xl"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Restez informé !
            </h3>
            <p className="text-gray-600 mb-8">
              Inscrivez-vous pour être notifié de la publication de nouveaux articles
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                disabled
              />
              <button
                type="submit"
                disabled
                className="px-8 py-4 bg-gray-400 text-white rounded-full font-semibold cursor-not-allowed"
              >
                Bientôt disponible
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
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
              En attendant le blog...
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Découvrez mes services et mes réalisations, ou contactez-moi pour discuter de votre projet !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Voir mes services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Me contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
