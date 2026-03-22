"use client";

// app/blog/page.tsx

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaArrowRight,
  FaChartLine,
  FaLightbulb,
  FaGlobe,
  FaRocket,
} from 'react-icons/fa';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
});

const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const TOPICS = [
  {
    icon: FaChartLine,
    label: 'Finance & Comptabilité',
    desc: 'Analyse financière, comptabilité, fiscalité, bilan et gestion.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: FaGlobe,
    label: 'Économie & Marchés Africains',
    desc: "BRVM, économie Afrique de l'Ouest, banque et inclusion financière.",
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: FaLightbulb,
    label: 'Digital & Transformation',
    desc: "IA, fintech, automatisation et transformation numérique des entreprises.",
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: FaRocket,
    label: 'Entrepreneuriat & Leadership',
    desc: 'Startups, gestion de projet, soft skills et développement personnel.',
    color: 'bg-orange-50 text-orange-600',
  },
];

export default function BlogPage() {
  return (
    <main
      className="min-h-screen bg-[#fafaf9]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── HERO ── */}
      <section className="relative pt-24 pb-16 px-5 sm:px-8 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] opacity-50"
          style={{
            background:
              'radial-gradient(ellipse at top right, rgba(59,130,246,0.07) 0%, transparent 65%)',
          }}
        />
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            {...fadeUp(0)}
            className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-4"
          >
            Blog
          </motion.p>
          <motion.h1
            {...fadeUp(0.07)}
            className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Articles & Réflexions
          </motion.h1>
          <motion.p
            {...fadeUp(0.14)}
            className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto mb-8"
          >
            Je travaille actuellement à la rédaction de mes premiers articles
            sur la finance, l'économie africaine, le digital et l'entrepreneuriat.
            Revenez bientôt !
          </motion.p>
          <motion.div {...fadeUp(0.2)}>
            <span className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Bientôt disponible
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-3xl mx-auto px-5">
        <div className="h-px bg-gray-200" />
      </div>

      {/* ── THÉMATIQUES ── */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.p
            {...fadeUpView(0)}
            className="text-center text-sm text-gray-500 mb-8"
          >
            Les thématiques que je vais couvrir
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOPICS.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={topic.label}
                  {...fadeUpView(i * 0.08)}
                  className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
                >
                  <span
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${topic.color}`}
                  >
                    <Icon className="text-base" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">{topic.label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{topic.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 px-5 sm:px-8">
        <div className="max-w-xl mx-auto">
          <motion.div
            {...fadeUpView(0)}
            className="bg-gray-900 rounded-2xl px-8 py-10 text-center space-y-4"
          >
            <p
              className="text-lg font-bold text-white"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              En attendant, échangeons !
            </p>
            <p className="text-sm text-gray-400">
              Une question ou une idée de collaboration ? Je suis disponible.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              Me contacter
              <FaArrowRight className="text-xs" />
            </Link>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
    </main>
  );
}
