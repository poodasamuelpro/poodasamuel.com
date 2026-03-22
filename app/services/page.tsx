"use client";

// app/services/page.tsx

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaGlobe, FaMobileAlt, FaPalette, FaSearch,
  FaFileAlt, FaCheck, FaArrowRight, FaChartLine,
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

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: FaChartLine,
    title: 'Analyse & Conseil Financier',
    desc: 'Analyse de bilans, reporting, tableaux de bord KPI et aide à la décision financière.',
    features: [
      'Analyse de bilans et comptes de résultat',
      'Construction de tableaux de bord KPI',
      'Reporting financier',
      'Aide à la décision d\'investissement',
      'Audit et recommandations',
    ],
    accent: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100',
    note: 'Domaine principal',
  },
  {
    icon: FaGlobe,
    title: 'Création de sites web',
    desc: 'Sites vitrines et portfolios modernes, responsifs et optimisés pour votre activité.',
    features: [
      'Sites vitrines professionnels',
      'Design responsive et moderne',
      'Optimisation des performances',
      'Intégration de formulaires et outils',
      'Mise en ligne et suivi',
    ],
    accent: 'bg-indigo-50 text-indigo-600',
    border: 'border-indigo-100',
    note: null,
  },
  {
    icon: FaMobileAlt,
    title: 'Applications mobiles WebView',
    desc: 'Développement d\'applications mobiles WebView pour iOS et Android à partir de votre site web.',
    features: [
      'Application mobile iOS & Android',
      'Intégration de votre site web existant',
      'Interface native et fluide',
      'Publication sur les stores',
      'Maintenance et mises à jour',
    ],
    accent: 'bg-orange-50 text-orange-600',
    border: 'border-orange-100',
    note: null,
  },
  {
    icon: FaPalette,
    title: 'Design graphique & identité visuelle',
    desc: 'Création de logos, chartes graphiques, flyers et visuels pour vos supports de communication.',
    features: [
      'Logo et identité visuelle',
      'Flyers et affiches',
      'Visuels pour réseaux sociaux',
      'Charte graphique complète',
      'Montage vidéo court (CapCut)',
    ],
    accent: 'bg-pink-50 text-pink-600',
    border: 'border-pink-100',
    note: null,
  },
  {
    icon: FaSearch,
    title: 'Référencement SEO & audit',
    desc: 'Optimisation de votre visibilité sur Google grâce à un audit technique et une stratégie SEO adaptée.',
    features: [
      'Audit SEO technique complet',
      'Optimisation on-page & off-page',
      'Analyse des mots-clés',
      'Recommandations ciblées',
      'Suivi et reporting',
    ],
    accent: 'bg-green-50 text-green-600',
    border: 'border-green-100',
    note: null,
  },
  {
    icon: FaFileAlt,
    title: 'CV & lettres de motivation',
    desc: 'Rédaction de documents professionnels percutants, personnalisés selon votre profil et vos objectifs.',
    features: [
      'CV professionnel et moderne',
      'Lettre de motivation personnalisée',
      'Adaptation au poste visé',
      'Contenu optimisé recruteurs',
      'Révisions incluses',
    ],
    accent: 'bg-purple-50 text-purple-600',
    border: 'border-purple-100',
    note: null,
  },
];

const PROCESS = [
  {
    step: '01',
    title: 'Échange initial',
    desc: 'On discute de votre besoin, de vos objectifs et du contexte de votre projet.',
  },
  {
    step: '02',
    title: 'Proposition',
    desc: 'Je vous soumets une solution adaptée avec un devis clair et transparent.',
  },
  {
    step: '03',
    title: 'Réalisation',
    desc: 'Je travaille sur votre projet avec des points réguliers pour valider ensemble chaque étape.',
  },
  {
    step: '04',
    title: 'Livraison',
    desc: 'Livraison du projet finalisé avec accompagnement pour une prise en main autonome.',
  },
];

const WHY = [
  {
    title: 'Rigueur & sérieux',
    desc: 'Formation en Finance & Comptabilité, j\'apporte une approche structurée et méthodique à chaque projet.',
  },
  {
    title: 'Profil polyvalent',
    desc: 'Finance, digital, design, développement — je m\'adapte à des besoins variés sans perdre en qualité.',
  },
  {
    title: 'Proximité & transparence',
    desc: 'Échanges directs, devis clairs, suivi régulier. Vous savez toujours où en est votre projet.',
  },
];

// ── Composant ─────────────────────────────────────────────────────────────────

export default function ServicesPage() {
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
            Services
          </motion.p>
          <motion.h1
            {...fadeUpHero(0.07)}
            className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Ce que je propose
          </motion.h1>
          <motion.p {...fadeUpHero(0.14)} className="text-gray-500 text-lg leading-relaxed max-w-xl">
            La finance et la comptabilité sont au cœur de mon parcours. En complément, je propose des services digitaux concrets issus de mes expériences réelles — avec rigueur, honnêteté et envie d'apprendre.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-5">
        <div className="h-px bg-gray-200" />
      </div>

      {/* ══ SERVICES ══ */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                {...fadeUp(i * 0.07)}
                whileHover={{ y: -4 }}
                className={`bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col ${s.border}`}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <span className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${s.accent}`}>
                    <Icon className="text-lg" />
                  </span>
                  <div>
                    {s.note && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full mb-1 inline-block">
                        {s.note}
                      </span>
                    )}
                    <h3 className="text-sm font-bold text-gray-900 leading-snug">{s.title}</h3>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-4">{s.desc}</p>

                {/* Features */}
                <ul className="space-y-1.5 mb-5 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                      <FaCheck className="text-green-500 flex-shrink-0 mt-0.5 text-[10px]" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:gap-2.5 transition-all"
                >
                  Demander un devis <FaArrowRight className="text-[10px]" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="py-16 px-5 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">Méthode</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
              Comment je travaille
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                {...fadeUp(i * 0.08)}
                className="relative"
              >
                <div className="bg-[#fafaf9] border border-gray-100 rounded-2xl p-6 h-full">
                  <p
                    className="text-4xl font-bold text-blue-100 mb-3"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {p.step}
                  </p>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
                {/* Connecteur */}
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 w-6 h-6 items-center justify-center">
                    <FaArrowRight className="text-gray-300 text-xs" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ POURQUOI MOI ══ */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">Pourquoi moi</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
              Ce qui me différencie
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {WHY.map((w, i) => (
              <motion.div
                key={w.title}
                {...fadeUp(i * 0.1)}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-sm font-bold text-gray-900 mb-2">{w.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-16 px-5 sm:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="bg-gray-900 rounded-3xl px-8 py-14 text-center space-y-6"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">Contact</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Parlons de votre projet
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-md mx-auto">
              Vous avez un projet en tête ? Contactez-moi pour un échange sans engagement. Je vous réponds sous 24–48h.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                Demander un devis gratuit
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-xl hover:border-blue-400 hover:text-blue-400 transition-colors duration-200"
              >
                Voir mes réalisations
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
