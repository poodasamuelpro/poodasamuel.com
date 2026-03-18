"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaExternalLinkAlt, FaRocket, FaUsers, FaCode, FaPalette, FaChartLine, FaHeart } from 'react-icons/fa';

export default function PortfolioPage() {
  const projects = [
    {
      title: "IziCard - Cartes de Visite NFC",
      category: "Startup & Innovation",
      description: "Co-fondateur et développeur d'une startup innovante proposant des cartes de visite NFC intelligentes et des bracelets santé connectés. Gestion complète du développement produit, stratégie marketing et mise sur le marché.",
      image: "/images/izicard-logo.png",
      tags: ["Entrepreneuriat", "NFC", "Innovation", "Marketing Digital"],
      link: "#",
      status: "En cours",
      icon: FaRocket,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Collectif Leaders Unis",
      category: "Association & Leadership",
      description: "Co-fondateur et président d'une association humanitaire axée sur le leadership, l'organisation et le travail d'équipe. Coordination d'événements, gestion d'équipe et développement de projets communautaires.",
      image: "/images/collectif-logo.png",
      tags: ["Leadership", "Humanitaire", "Organisation", "Engagement"],
      link: "#",
      status: "Actif",
      icon: FaUsers,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Sites Web WordPress Professionnels",
      category: "Développement Web",
      description: "Création de sites vitrines modernes et responsives pour entreprises avec WordPress et Elementor. Design moderne, optimisation SEO, intégration de systèmes de paiement et stratégie de contenu.",
      image: "/images/smartcard-logo.png",
      tags: ["WordPress", "Elementor", "SEO", "Responsive Design"],
      link: "#",
      status: "Freelance",
      icon: FaCode,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Stratégie Digitale & Marketing",
      category: "Marketing & Communication",
      description: "Élaboration de stratégies digitales complètes : content marketing, social media, acquisition de trafic, SEO/SEA, analytics. Campagnes publicitaires sur Google Ads, Facebook et Instagram.",
      image: "/images/envers-decor.jpg",
      tags: ["Stratégie", "SEO", "Social Media", "Google Analytics"],
      link: "#",
      status: "Service",
      icon: FaChartLine,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Design Graphique & Contenu Visuel",
      category: "Création & Design",
      description: "Création de logos, flyers, présentations visuelles percutantes et montage vidéo professionnel. Utilisation de Canva pour le design graphique et CapCut pour l'édition vidéo.",
      image: "/images/welcome-morocco.png",
      tags: ["Canva", "CapCut", "Design", "Vidéo"],
      link: "#",
      status: "Service",
      icon: FaPalette,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Engagement Associatif",
      category: "Engagement & Réseau",
      description: "Membre actif de plusieurs associations (AJPD/BF, AECAM Casablanca) promouvant la solidarité, le développement et le réseau international. Organisation d'événements et projets de développement.",
      image: "/images/soutenance.jpg",
      tags: ["AJPD", "AECAM", "Solidarité", "Réseau"],
      link: "#",
      status: "Actif",
      icon: FaHeart,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const stats = [
    { number: "6+", label: "Projets Réalisés", icon: FaRocket },
    { number: "2", label: "Startups Fondées", icon: FaUsers },
    { number: "15+", label: "Clients Satisfaits", icon: FaChartLine },
    { number: "4", label: "Associations", icon: FaHeart }
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
              Mon Portfolio
            </h1>
            <p className="text-xl opacity-90">
              Découvrez mes projets, réalisations et engagements qui reflètent ma passion pour l'innovation et le service
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-transform duration-300"
                >
                  <Icon className="text-4xl text-blue-600 mx-auto mb-3" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
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
              Mes Réalisations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              De l'entrepreneuriat au design, découvrez la diversité de mes projets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-sm font-semibold shadow-lg">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className={`inline-block p-3 bg-gradient-to-br ${project.color} rounded-xl mb-3`}>
                            <Icon className="text-2xl text-white" />
                          </div>
                          <p className="text-sm text-gray-600 font-semibold mb-2">{project.category}</p>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={project.link}
                        className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-purple-600 transition-colors group/link"
                      >
                        <span>En savoir plus</span>
                        <FaExternalLinkAlt className="text-sm group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              Témoignages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ce que disent mes collaborateurs et professeurs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "Un étudiant motivé, rigoureux et créatif. Son engagement dans ses projets est remarquable.",
                author: "Professeur ESMC",
                role: "Enseignant",
                avatar: "👨‍🏫"
              },
              {
                quote: "Samuel allie parfaitement compétences techniques et qualités humaines. Un vrai professionnel.",
                author: "Partenaire IziCard",
                role: "Co-fondateur",
                avatar: "👨‍💼"
              },
              {
                quote: "Son travail en design et stratégie digitale a dépassé nos attentes. Très professionnel !",
                author: "Client WordPress",
                role: "Entrepreneur",
                avatar: "👩‍💼"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
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
              Intéressé par une collaboration ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Que ce soit pour un projet web, une stratégie digitale ou du design, je suis à votre écoute !
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-10 py-5 bg-white text-blue-600 rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span>Travaillons ensemble</span>
              <FaExternalLinkAlt />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
