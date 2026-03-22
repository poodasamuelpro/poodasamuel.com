"use client";

// app/not-found.tsx
// Page 404 custom — s'affiche automatiquement sur toute URL inexistante

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaHome } from 'react-icons/fa';

export default function NotFound() {
  return (
    <main
      className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-5"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-lg w-full text-center space-y-6">

        {/* Numéro 404 décoratif */}
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[120px] sm:text-[160px] font-bold text-gray-100 leading-none select-none"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          404
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3 -mt-8"
        >
          <h1
            className="text-2xl sm:text-3xl font-bold text-gray-900"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Page introuvable
          </h1>
          <p className="text-gray-500 leading-relaxed">
            La page que vous cherchez n'existe pas ou a été déplacée.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 pt-2"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-colors duration-200"
          >
            <FaHome className="text-xs" />
            Retour à l'accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors duration-200 bg-white"
          >
            Me contacter
            <FaArrowRight className="text-xs" />
          </Link>
        </motion.div>

      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
    </main>
  );
}
