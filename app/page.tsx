"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  FaArrowRight, FaChartLine, FaGlobe, FaPalette,
  FaSearch, FaMobileAlt, FaFileAlt, FaChevronLeft,
  FaChevronRight, FaStar, FaLinkedin, FaDownload,
} from 'react-icons/fa';

// ── Animations ────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const fadeUpHero = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
});

// ── Data ──────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '3 ans', label: 'de formation en Finance & Comptabilité' },
  { value: 'Licence', label: 'en cours — Master visé en Finance' },
  { value: 'Freelance', label: 'Missions en digital & communication' },
  { value: 'Multi', label: 'Initiatives entrepreneuriales & associatives' },
];

const SERVICES = [
  {
    icon: FaChartLine,
    title: 'Analyse & Conseil Financier',
    desc: 'Analyse de bilans, reporting, tableaux de bord KPI et aide à la décision financière. Mon cœur de métier.',
    accent: 'bg-blue-50 text-blue-600',
  },
  {
    icon: FaGlobe,
    title: 'Création de sites web',
    desc: 'Sites vitrines et portfolios modernes, responsifs et optimisés avec WordPress.',
    accent: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: FaPalette,
    title: 'Conception de supports graphiques',
    desc: 'Logos, flyers, visuels pour réseaux sociaux et print. Design soigné et adapté à chaque objectif.',
    accent: 'bg-pink-50 text-pink-600',
  },
  {
    icon: FaSearch,
    title: 'Référencement SEO & audit',
    desc: 'Optimisation on-page & off-page, audit technique et recommandations pour améliorer la visibilité web.',
    accent: 'bg-green-50 text-green-600',
  },
  {
    icon: FaMobileAlt,
    title: 'Applications Android WebView',
    desc: 'Développement d\'applications mobiles Android WebView — intégration de sites web en application native.',
    accent: 'bg-orange-50 text-orange-600',
  },
  {
    icon: FaFileAlt,
    title: 'CV & lettres de motivation',
    desc: 'Rédaction de CV et lettres percutants, personnalisés selon le profil et optimisés pour les recruteurs.',
    accent: 'bg-purple-50 text-purple-600',
  },
];

const SKILLS = [
  {
    domain: 'Finance & Comptabilité',
    emoji: '💼',
    color: 'border-blue-200 bg-blue-50/30',
    headerColor: 'text-blue-700',
    skills: [
      'Comptabilité générale & analytique',
      'Analyse financière',
      'Fiscalité',
      'Bilan & compte de résultat',
      'KPI & reporting',
      'Audit',
      'Décision d\'investissement',
    ],
    tools: ['Sage Comptabilité', 'Sage Paie', 'Excel (TCD, formules avancées, tableaux de bord)', 'Power BI', 'Word', 'PowerPoint'],
  },
  {
    domain: 'Marketing & Digital',
    emoji: '📱',
    color: 'border-indigo-200 bg-indigo-50/30',
    headerColor: 'text-indigo-700',
    skills: [
      'Stratégie digitale',
      'SEO on-page & off-page',
      'Design graphique',
      'Intégration & développement web',
      'Community management',
      'Rédaction de contenu',
    ],
    tools: ['WordPress', 'Elementor', 'Canva', 'CapCut', 'Google Search Console', 'SEMrush'],
  },
  {
    domain: 'Entrepreneuriat & Management',
    emoji: '🚀',
    color: 'border-green-200 bg-green-50/30',
    headerColor: 'text-green-700',
    skills: [
      'Gestion de projet',
      'Leadership',
      'Étude de marché',
      'Communication',
      'Coordination d\'équipe',
    ],
    tools: ['Microsoft Office', 'Notion', 'Trello'],
  },
];

const SOFTSKILLS = [
  {
    group: 'Relationnelles',
    items: ['Écoute active', 'Communication claire', 'Empathie', 'Sympathie'],
  },
  {
    group: 'Travail en équipe',
    items: ['Collaboration efficace', 'Esprit d\'équipe', 'Flexibilité'],
  },
  {
    group: 'Personnelles',
    items: ['Sens des responsabilités', 'Organisation', 'Persévérance', 'Gestion du temps'],
  },
];

const PROJECTS = [
  {
    title: 'IziCard',
    desc: 'Solution NFC de cartes de visite connectées — projet entrepreneurial en cours de développement au Burkina Faso.',
    image: '/images/izicard-logo.png',
    tag: 'Entrepreneuriat',
  },
  {
    title: 'Collectif Leaders Unis',
    desc: 'Cofondateur et président de cette association dédiée au leadership et à l\'engagement des jeunes.',
    image: '/images/collectif-logo.png',
    tag: 'Leadership',
  },
  {
    title: 'Soutenance académique',
    desc: 'Présentation de projets académiques devant jury — MyBusiness, études de marché et simulations comptables.',
    image: '/images/soutenance.jpg',
    tag: 'Académique',
  },
  {
    title: 'Welcome to Morocco',
    desc: 'Organisation et communication d\'un événement universitaire d\'intégration et de partage culturel à l\'ESMC.',
    image: '/images/welcome-morocco.png',
    tag: 'Événementiel',
  },
  {
    title: 'L\'envers du décor',
    desc: 'Projet audiovisuel — scénariste principal, co-metteur en scène et co-réalisateur d\'un court-métrage étudiant.',
    image: '/images/envers-decor.jpg',
    tag: 'Audiovisuel',
  },
];

const TESTIMONIALS = [
  {
    name: 'Micheline Dondasse',
    text: 'Travailler avec Samuel, que ce soit en amitié ou en collaboration, a toujours été une expérience enrichissante. Il est motivé, à l\'écoute et toujours prêt à relever les défis avec professionnalisme.',
  },
  {
    name: 'Nsenda Jeancy',
    text: 'Samuel est un étudiant appliqué, curieux et toujours prêt à apprendre. Il prend son travail au sérieux et fait preuve d\'une grande rigueur dans ses projets.',
  },
  {
    name: 'Geraldine Gouba',
    text: 'Samuel est une personne déterminée, passionnée et constante dans ses efforts. Je suis témoin de son évolution et de son engagement dans tout ce qu\'il entreprend.',
  },
];

// ── Composant principal ───────────────────────────────────────────────────────

export default function HomePage() {
  const [currentProject, setCurrentProject] = useState(0);

  const prevProject = () =>
    setCurrentProject((p) => (p === 0 ? PROJECTS.length - 1 : p - 1));
  const nextProject = () =>
    setCurrentProject((p) => (p === PROJECTS.length - 1 ? 0 : p + 1));

  return (
    <main className="overflow-hidden bg-[#fafaf9]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">

        {/* Blob background */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Texte */}
            <div className="space-y-6">
              <motion.span
                {...fadeUpHero(0)}
                className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full"
              >
                Bienvenue sur mon portfolio
              </motion.span>

              <motion.h1
                {...fadeUpHero(0.08)}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Je suis{' '}
                <span className="text-blue-600">Pooda Aser Samuel</span>
              </motion.h1>

              <motion.p
                {...fadeUpHero(0.16)}
                className="text-lg text-gray-500 leading-relaxed max-w-lg"
              >
                Étudiant en <strong className="text-gray-700">Finance & Comptabilité</strong>, passionné par la finance, la comptabilité, le digital et l'entrepreneuriat. Découvrez mes compétences, projets et ma vision.
              </motion.p>

              <motion.div
                {...fadeUpHero(0.24)}
                className="flex flex-wrap gap-3 pt-2"
              >
                <a
                  href="/cv-pooda-samuel.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-colors duration-200"
                >
                  <FaDownload className="text-xs" />
                  Télécharger mon CV
                </a>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors duration-200 bg-white"
                >
                  Voir mes projets
                  <FaArrowRight className="text-xs" />
                </Link>
              </motion.div>
            </div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Ring décoratif */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-200 to-indigo-200 rotate-6 scale-105 opacity-40" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 -rotate-3 scale-102 opacity-30" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white">
                  <Image
                    src="/images/pooda-photo.jpg"
                    alt="Pooda Samuel"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-gray-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          2. CHIFFRES RAPIDES
      ══════════════════════════════════════════ */}
      <section className="py-12 border-y border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                {...fadeUp(i * 0.08)}
                className="text-center space-y-1"
              >
                <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {s.value}
                </p>
                <p className="text-xs text-gray-500 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. QUI SUIS-JE
      ══════════════════════════════════════════ */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div {...fadeUp(0)}>
            <Image
              src="/images/profile.png"
              alt="Pooda Samuel profil"
              width={500}
              height={500}
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="space-y-5">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500">
              À propos
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Bâtir mon avenir au croisement de la finance, du business et de l'impact humain.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Curieux, polyvalent et engagé, je consolide mes compétences en finance et comptabilité tout en explorant le digital et l'entrepreneuriat. Mon objectif : contribuer à des projets à forte valeur ajoutée dans des environnements professionnels exigeants.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Je m'intéresse autant aux chiffres qu'aux stratégies, à la gestion de projet qu'à l'innovation numérique. Chaque étape de mon parcours me rapproche de ce que je veux incarner : un professionnel agile, rigoureux et engagé.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:gap-3 transition-all"
            >
              En savoir plus <FaArrowRight className="text-xs" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. CE QUE JE PEUX APPORTER
      ══════════════════════════════════════════ */}
      <section className="py-20 px-5 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp(0)} className="mb-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">
              Services
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Ce que je peux vous apporter
            </h2>
            <p className="text-gray-500 max-w-2xl leading-relaxed">
              Même en formation, je mets déjà mes compétences au service de vos idées — avec rigueur et envie d'apprendre. La finance et la comptabilité sont au cœur de mon parcours, et je complète ce profil par des compétences digitales concrètes que je mobilise selon vos besoins.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  {...fadeUp(i * 0.07)}
                  whileHover={{ y: -4 }}
                  className="bg-[#fafaf9] border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300"
                >
                  <span className={`inline-flex w-11 h-11 items-center justify-center rounded-xl mb-4 ${s.accent}`}>
                    <Icon className="text-lg" />
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. COMPÉTENCES PAR DOMAINE
      ══════════════════════════════════════════ */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">
              Compétences
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Mes domaines de compétences
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SKILLS.map((domain, i) => (
              <motion.div
                key={domain.domain}
                {...fadeUp(i * 0.1)}
                className={`border rounded-2xl p-6 ${domain.color}`}
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">{domain.emoji}</span>
                  <h3
                    className={`text-base font-bold ${domain.headerColor}`}
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {domain.domain}
                  </h3>
                </div>

                <ul className="space-y-2 mb-5">
                  {domain.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/60 pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Outils & logiciels
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] bg-white/70 border border-white/80 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. SOFT SKILLS
      ══════════════════════════════════════════ */}
      <section className="py-20 px-5 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">
              Soft Skills
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Qualités personnelles
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SOFTSKILLS.map((group, i) => (
              <motion.div
                key={group.group}
                {...fadeUp(i * 0.1)}
                className="bg-[#fafaf9] border border-gray-100 rounded-2xl p-6"
              >
                <h3 className="text-sm font-bold text-gray-900 mb-4">{group.group}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. PROJETS EN VEDETTE — CARROUSEL
      ══════════════════════════════════════════ */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp(0)} className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">
                Portfolio
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-900"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Projets en vedette
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:gap-3 transition-all"
            >
              Voir tout <FaArrowRight className="text-xs" />
            </Link>
          </motion.div>

          {/* Carrousel */}
          <div className="relative">
            <motion.div
              key={currentProject}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden bg-gray-50">
                <Image
                  src={PROJECTS[currentProject].image}
                  alt={PROJECTS[currentProject].title}
                  fill
                  className="object-contain p-8"
                />
              </div>

              {/* Texte */}
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                  {PROJECTS[currentProject].tag}
                </span>
                <h3
                  className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {PROJECTS[currentProject].title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {PROJECTS[currentProject].desc}
                </p>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:gap-3 transition-all"
                >
                  En savoir plus <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </motion.div>

            {/* Contrôles */}
            <div className="flex items-center justify-between mt-5">
              <div className="flex gap-2">
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentProject(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentProject ? 'w-6 bg-blue-600' : 'w-1.5 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevProject}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  <FaChevronLeft className="text-xs" />
                </button>
                <button
                  onClick={nextProject}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. TÉMOIGNAGES
      ══════════════════════════════════════════ */}
      <section className="py-20 px-5 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">
              Témoignages
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Ce que l'on dit de moi
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Avis sincères de professeurs, camarades et proches.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp(i * 0.1)}
                className="bg-[#fafaf9] border border-gray-100 rounded-2xl p-6 space-y-4"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <FaStar key={j} className="text-amber-400 text-xs" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {t.name.charAt(0)}
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. CTA FINAL
      ══════════════════════════════════════════ */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="bg-gray-900 rounded-3xl px-8 py-14 text-center space-y-6"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">
              Contact
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Échangeons !
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-md mx-auto">
              Une question, une idée de collaboration ou simplement envie d'échanger ? Je suis toujours ouvert aux échanges.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                Discutons ensemble
                <FaArrowRight className="text-xs" />
              </Link>
              <a
                href="http://www.linkedin.com/in/pooda-samuel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-xl hover:border-blue-400 hover:text-blue-400 transition-colors duration-200"
              >
                <FaLinkedin />
                LinkedIn
              </a>
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
