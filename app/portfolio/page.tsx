"use client";

// app/portfolio/page.tsx

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaArrowRight, FaExternalLinkAlt,
  FaRocket, FaUsers, FaCode, FaGraduationCap,
  FaHeart, FaImage, FaChevronLeft, FaChevronRight,
} from 'react-icons/fa';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const fadeUpHero = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
});

// ── Catégories ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all', label: 'Tout' },
  { id: 'entrepreneuriat', label: 'Entrepreneuriat' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'academique', label: 'Académique' },
  { id: 'associatif', label: 'Associatif' },
  { id: 'design', label: 'Design' },
];

// ── Projets ───────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 1,
    category: 'entrepreneuriat',
    tag: 'Entrepreneuriat',
    icon: FaRocket,
    accent: 'bg-blue-50 text-blue-600',
    title: 'IziCard Ouaga',
    desc: "IziCard Ouaga est une startup burkinabè spécialisée dans les solutions NFC intelligentes pour l'Afrique de l'Ouest. Son produit phare, IziCare, est un bracelet de santé qui permet d'accéder instantanément aux informations médicales essentielles du porteur en cas d'urgence — un simple tap, sans application à télécharger.",
    image: '/images/izicard-logo.png',
    imageContain: true,
    tags: ['IziCare', 'NFC', 'Santé', 'Burkina Faso', 'Innovation'],
    url: 'https://izicardouaga.com',
    urlLabel: 'izicardouaga.com',
  },
  {
    id: 2,
    category: 'entrepreneuriat',
    tag: 'Entrepreneuriat',
    icon: FaCode,
    accent: 'bg-green-50 text-green-600',
    title: 'SantéBF',
    desc: 'Dossier Patient Informatisé National pour le Burkina Faso — plateforme à vocation sociale pour digitaliser le suivi médical. Application web + applications mobiles dédiées aux patients et aux professionnels de santé.',
    image: '/images/izicard-logo.png',
    imageContain: true,
    tags: ['Santé', 'Digital', 'Burkina Faso', 'Social'],
    url: 'https://santebf.izicardouaga.com',
    urlLabel: 'santebf.izicardouaga.com',
  },
  {
    id: 3,
    category: 'freelance',
    tag: 'Freelance',
    icon: FaCode,
    accent: 'bg-indigo-50 text-indigo-600',
    title: 'Pro Braids Salon',
    desc: 'Création du site web complet pour un salon de coiffure africaine basé aux États-Unis. Design, développement, contenu et mise en ligne.',
    image: '/images/smartcard-logo.png',
    imageContain: true,
    tags: ['Site web', 'USA', 'WordPress', 'Design'],
    url: 'https://probraidssalon.com/en/',
    urlLabel: 'probraidssalon.com',
  },
  {
    id: 4,
    category: 'associatif',
    tag: 'Associatif',
    icon: FaUsers,
    accent: 'bg-purple-50 text-purple-600',
    title: 'Collectif Leaders Unis',
    desc: 'Cofondateur et président — association dédiée au leadership et à l\'engagement des jeunes. Coordination d\'actions concrètes, organisation d\'événements, développement du travail en équipe.',
    image: '/images/collectif-logo.png',
    imageContain: true,
    tags: ['Leadership', 'Associatif', 'Jeunesse'],
    url: null,
    urlLabel: null,
  },
  {
    id: 5,
    category: 'associatif',
    tag: 'Associatif',
    icon: FaHeart,
    accent: 'bg-red-50 text-red-600',
    title: 'Communauté Catholique Burkinabè de Casablanca',
    desc: 'Responsable Adjoint à la Communication — gestion de la communication interne et externe, création de contenus, coordination des actions de la communauté.',
    image: '/images/profile.png',
    imageContain: false,
    tags: ['Communication', 'Communauté', 'Casablanca'],
    url: null,
    urlLabel: null,
  },
  {
    id: 6,
    category: 'academique',
    tag: 'Académique',
    icon: FaGraduationCap,
    accent: 'bg-orange-50 text-orange-600',
    title: "MyBusiness — Simulation d'entreprise",
    desc: 'Création complète d\'une entreprise fictive en contexte marocain : identité visuelle, structure organisationnelle, gestion comptable sur Sage, étude de marché, stratégie marketing. Présenté devant jury.',
    image: '/images/soutenance.jpg',
    imageContain: false,
    tags: ['Finance', 'Comptabilité', 'Sage', 'Marketing'],
    url: null,
    urlLabel: null,
  },
  {
    id: 7,
    category: 'academique',
    tag: 'Académique',
    icon: FaGraduationCap,
    accent: 'bg-yellow-50 text-yellow-600',
    title: 'Étude de marché — Sidi Ali',
    desc: 'Analyse du comportement des consommateurs marocains vis-à-vis de l\'eau minérale Sidi Ali. Conception de l\'enquête, collecte terrain, analyse et rapport complet.',
    image: '/images/soutenance.jpg',
    imageContain: false,
    tags: ['Étude de marché', 'Marketing', 'Maroc'],
    url: null,
    urlLabel: null,
  },
  {
    id: 8,
    category: 'academique',
    tag: 'Académique',
    icon: FaGraduationCap,
    accent: 'bg-pink-50 text-pink-600',
    title: "L'envers du décor",
    desc: 'Court-métrage réalisé en équipe — scénariste principal, co-metteur en scène et co-réalisateur. Management participatif et présentation devant jury.',
    image: '/images/envers-decor.jpg',
    imageContain: false,
    tags: ['Audiovisuel', 'Scénario', 'Réalisation'],
    url: null,
    urlLabel: null,
  },
  {
    id: 9,
    category: 'academique',
    tag: 'Académique',
    icon: FaGraduationCap,
    accent: 'bg-teal-50 text-teal-600',
    title: 'Welcome to Morocco',
    desc: 'Organisation complète d\'un événement universitaire d\'intégration à l\'ESMC — planification, budget, communication, logistique et coordination d\'équipe.',
    image: '/images/welcome-morocco.png',
    imageContain: false,
    tags: ['Événementiel', 'Organisation', 'ESMC'],
    url: null,
    urlLabel: null,
  },
  {
    id: 10,
    category: 'design',
    tag: 'Design',
    icon: FaImage,
    accent: 'bg-rose-50 text-rose-600',
    title: 'Identité visuelle IziCard',
    desc: 'Conception complète de la charte graphique, logo et identité visuelle du projet IziCard — supports digitaux et print.',
    image: '/images/izicard-logo.png',
    imageContain: true,
    tags: ['Identité visuelle', 'Logo', 'Charte graphique'],
    url: null,
    urlLabel: null,
  },
];

// ── Galerie design — 15 slots ─────────────────────────────────────────────────

const DESIGN_GALLERY = [
  { label: 'Affiche Welcome to Morocco', image: '/images/welcome-morocco.png' },
  { label: 'Identité visuelle IziCard', image: '/images/izicard-logo.png' },
  { label: 'Charte graphique SmartCard', image: '/images/smartcard-logo.png' },
  { label: "L'envers du décor", image: '/images/envers-decor.jpg' },
  { label: 'Logo Collectif Leaders Unis', image: '/images/collectif-logo.png' },
  { label: 'Création graphique 6', image: null },
  { label: 'Création graphique 7', image: null },
  { label: 'Création graphique 8', image: null },
  { label: 'Création graphique 9', image: null },
  { label: 'Création graphique 10', image: null },
  { label: 'Création graphique 11', image: null },
  { label: 'Création graphique 12', image: null },
  { label: 'Création graphique 13', image: null },
  { label: 'Création graphique 14', image: null },
  { label: 'Création graphique 15', image: null },
];

// ── Composant ─────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const visibleCount = 4;
  const maxIndex = Math.max(0, DESIGN_GALLERY.length - visibleCount);

  const prev = useCallback(() => {
    setCarouselIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setCarouselIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  const filtered = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#fafaf9]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ══ HERO ══ */}
      <section className="relative pt-24 pb-16 px-5 sm:px-8 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 w-[480px] h-[480px] opacity-40"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(59,130,246,0.08) 0%, transparent 65%)' }}
        />
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUpHero(0)} className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-4">
            Portfolio
          </motion.p>
          <motion.h1
            {...fadeUpHero(0.07)}
            className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Mes réalisations
          </motion.h1>
          <motion.p {...fadeUpHero(0.14)} className="text-gray-500 text-lg leading-relaxed max-w-xl">
            Entre projets entrepreneuriaux, missions freelance, engagements associatifs et travaux académiques — voici un aperçu concret de mon parcours.
          </motion.p>
        </div>
      </section>

      {/* ══ FILTRES ══ */}
      <section className="px-5 sm:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUpHero(0.2)} className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-5">
        <div className="h-px bg-gray-200" />
      </div>

      {/* ══ GRILLE PROJETS ══ */}
      <section className="py-10 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((project, i) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gray-50 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={`transition-transform duration-300 hover:scale-105 ${
                          project.imageContain ? 'object-contain p-8' : 'object-cover object-top'
                        }`}
                      />
                    </div>

                    {/* Contenu */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${project.accent}`}>
                          <Icon className="text-xs" />
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                          {project.tag}
                        </span>
                      </div>

                      <h3
                        className="text-sm font-bold text-gray-900 mb-2"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                      >
                        {project.title}
                      </h3>

                      <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">
                        {project.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-gray-50 border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Lien */}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:gap-2.5 transition-all"
                        >
                          <FaExternalLinkAlt className="text-[10px]" />
                          {project.urlLabel}
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-sm">Aucun projet dans cette catégorie pour l'instant.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══ GALERIE DESIGN — CARROUSEL 15 SLOTS ══ */}
      <section className="py-16 px-5 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-8">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">Design</p>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-2">
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
                Créations graphiques
              </h2>
              <span className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Galerie en cours de construction
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              Affiches, chartes graphiques, identités visuelles et montages — d'autres créations arrivent bientôt.
            </p>
          </motion.div>

          {/* Carrousel */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: `calc(-${carouselIndex * (100 / visibleCount)}%)` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex gap-4"
              style={{ width: `${(DESIGN_GALLERY.length / visibleCount) * 100}%` }}
            >
              {DESIGN_GALLERY.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex-shrink-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ width: `calc(${(100 / DESIGN_GALLERY.length) * visibleCount}% - 12px)` }}
                >
                  {item.image ? (
                    <div className="relative aspect-square bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className="object-contain p-6 hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                        <p className="text-white text-[11px] font-semibold truncate">{item.label}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 p-4">
                      <FaImage className="text-gray-300 text-2xl" />
                      <p className="text-[10px] text-gray-400 text-center leading-snug">{item.label}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Contrôles */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex gap-1.5 flex-wrap">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === carouselIndex ? 'w-6 bg-blue-600' : 'w-1.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={carouselIndex === 0}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <button
                onClick={next}
                disabled={carouselIndex >= maxIndex}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="bg-gray-900 rounded-3xl px-8 py-14 text-center space-y-6"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">Collaboration</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Intéressé par une collaboration ?
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-md mx-auto">
              Que ce soit pour un projet web, du design ou une mission en finance, je suis toujours ouvert aux échanges.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                Me contacter
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-xl hover:border-blue-400 hover:text-blue-400 transition-colors duration-200"
              >
                Voir mes services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
    </main>
  );
}
