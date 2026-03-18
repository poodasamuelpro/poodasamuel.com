"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGraduationCap, FaLightbulb, FaHeart, FaUsers, FaChartLine, FaCode, FaPalette, FaBullhorn } from 'react-icons/fa';

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const hardSkills = [
    {
      icon: FaCode,
      title: "Création & Maintenance de Sites",
      description: "WordPress, Elementor, sites responsives modernes"
    },
    {
      icon: FaChartLine,
      title: "Comptabilité & Gestion",
      description: "Sage Comptabilité, analyse financière"
    },
    {
      icon: FaPalette,
      title: "Suite Office Avancée",
      description: "Word, PowerPoint, Excel (niveau avancé)"
    },
    {
      icon: FaBullhorn,
      title: "SEO & Marketing Digital",
      description: "Google Analytics, SEMrush, optimisation SEO"
    },
    {
      icon: FaCode,
      title: "Design de Bases de Données",
      description: "Modélisation et gestion de données"
    },
    {
      icon: FaPalette,
      title: "Design Graphique & Vidéo",
      description: "Canva, CapCut, création de contenu visuel"
    }
  ];

  const softSkills = [
    {
      icon: FaLightbulb,
      title: "Rigoureux",
      description: "Attention aux détails et respect des délais"
    },
    {
      icon: FaHeart,
      title: "Créatif",
      description: "Solutions innovantes et approche originale"
    },
    {
      icon: FaUsers,
      title: "Agile",
      description: "Adaptation rapide aux changements"
    },
    {
      icon: FaHeart,
      title: "Engagé",
      description: "Investissement total dans chaque projet"
    }
  ];

  const education = [
    {
      year: "2024 - Présent",
      degree: "Licence en Finance & Comptabilité",
      school: "ESMC Business School",
      location: "Casablanca, Maroc",
      description: "Formation approfondie en finance, comptabilité, management et transformation digitale"
    },
    {
      year: "2022 - 2024",
      degree: "Bac+2 Gestion des Entreprises",
      school: "ESMC Business School",
      location: "Casablanca, Maroc",
      description: "Management et Transformation Digitale avec focus sur l'entrepreneuriat"
    }
  ];

  const experiences = [
    {
      year: "2024 - Présent",
      role: "Co-fondateur & Développeur",
      company: "IziCard",
      description: "Startup de cartes de visite NFC intelligentes et bracelets santé. Gestion du développement produit et mise sur le marché."
    },
    {
      year: "2023 - Présent",
      role: "Co-fondateur & Président",
      company: "Collectif Leaders Unis",
      description: "Association humanitaire axée sur le leadership, l'organisation et le travail d'équipe pour le développement communautaire."
    },
    {
      year: "2022 - Présent",
      role: "Freelance Web Designer",
      company: "Indépendant",
      description: "Création de sites web modernes avec WordPress, stratégie digitale, SEO et design graphique pour divers clients."
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
              À Mon Propos
            </h1>
            <p className="text-xl opacity-90">
              Découvrez mon parcours, mes compétences et ce qui me passionne
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl transform rotate-6" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/images/profile.png"
                    alt="Samuel POODA"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-900">
                Qui suis-je ?
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  <strong className="text-gray-900">Entrepreneur passionné</strong>, cofondateur d'une association 
                  engagée dans l'humanitaire, je me définis avant tout comme un <strong>bâtisseur de solutions utiles 
                  et innovantes</strong>.
                </p>
                <p>
                  Actuellement étudiant en <strong>Finance & Comptabilité</strong> à l'ESMC Business School de Casablanca, 
                  je me passionne pour la <strong>transformation digitale</strong>, l'entrepreneuriat et le leadership.
                </p>
                <p>
                  En situation de <strong>handicap</strong>, j'ai développé une <strong>résilience</strong> et une 
                  détermination qui me poussent à toujours aller de l'avant. Je crois fermement en l'<strong>innovation</strong>, 
                  le <strong>service</strong> et le <strong>progrès collectif</strong>.
                </p>
                <p>
                  Mon parcours est marqué par la <strong>créativité</strong>, la <strong>rigueur</strong> et 
                  l'<strong>inclusivité</strong>. Je m'investis dans des projets qui ont du sens et qui contribuent 
                  au développement de ma communauté.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <FaGraduationCap className="text-6xl text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Formation Académique
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mon parcours éducatif en finance, comptabilité et transformation digitale
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                    <p className="text-lg text-blue-600 font-semibold">{edu.school}</p>
                    <p className="text-gray-600">{edu.location}</p>
                  </div>
                  <span className="inline-block mt-4 md:mt-0 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    {edu.year}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
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
              Expérience & Engagements
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mes projets entrepreneuriaux et engagements associatifs
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-600"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.role}</h3>
                    <p className="text-lg text-purple-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="inline-block mt-4 md:mt-0 px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                    {exp.year}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hard Skills */}
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
              Compétences Techniques
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mes hard skills pour concrétiser vos projets digitaux
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {hardSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{skill.title}</h3>
                  <p className="text-gray-600 text-sm">{skill.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Soft Skills */}
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
              Qualités Personnelles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les soft skills qui font la différence dans mes collaborations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {softSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{skill.title}</h3>
                  <p className="text-gray-600 text-sm">{skill.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Mes Valeurs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { title: 'Créativité', description: 'Solutions innovantes et originales' },
                { title: 'Rigueur', description: 'Excellence et attention aux détails' },
                { title: 'Inclusivité', description: 'Accessibilité et diversité' }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl"
                >
                  <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                  <p className="opacity-90">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
