"use client";

// components/Footer.tsx

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/about', label: 'À propos' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: FaLinkedin, href: 'http://www.linkedin.com/in/pooda-samuel' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/samuelpooda09' },
  { name: 'Facebook', icon: FaFacebook, href: 'https://www.facebook.com/share/1EnrY67Amd/?mibextid=wwXIfr' },
  { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/212649289798' },
];

export default function Footer() {
  return (
    <footer
      className="bg-gray-950 text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Contenu principal ── */}
      <div className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* ── Identité ── */}
            <div className="md:col-span-1 space-y-5">
              <Link href="/" className="flex items-center gap-3 group w-fit">
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-blue-500 transition-all duration-300">
                  <Image
                    src="/images/logo.jpg"
                    alt="Pooda Samuel"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="leading-tight">
                  <p
                    className="text-[15px] font-bold text-white tracking-tight"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    Pooda Samuel
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium">Finance & Digital</p>
                </div>
              </Link>

              <p className="text-sm text-gray-400 leading-relaxed">
                Étudiant en Finance & Comptabilité, curieux du digital et engagé
                dans des projets à impact. Toujours en mouvement, toujours en construction.
              </p>

              {/* Réseaux sociaux */}
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ name, icon: Icon, href }, i) => (
                  <motion.a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -3 }}
                    className="w-9 h-9 flex items-center justify-center border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200"
                  >
                    <Icon className="text-sm" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* ── Navigation ── */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">
                Navigation
              </p>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-blue-500 group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact ── */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">
                Contact
              </p>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:poodasamuelpro@gmail.com"
                    className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <FaEnvelope className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="break-all">poodasamuelpro@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/212649289798"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <FaWhatsapp className="text-green-500 flex-shrink-0" />
                    +212 649 289 798
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                  Casablanca, Maroc
                </li>
              </ul>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 transition-colors duration-200"
              >
                Discutons ensemble →
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── Barre basse ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Pooda Samuel — Tous droits réservés.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Disponible pour de nouveaux projets
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
    </footer>
  );
}
