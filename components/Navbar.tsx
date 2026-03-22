"use client";

// components/Navbar.tsx
//
// Navigation principale — remplace Header.tsx ET Navbar.tsx
// Un seul composant à utiliser dans app/layout.tsx
//
// Design : fond blanc/translucide, scroll-aware (ombre au scroll),
// lien actif souligné, menu mobile animé, logo local

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

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
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Ombre au scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ferme le menu mobile au changement de route
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.08)]'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-blue-500 transition-all duration-300">
                <Image
                  src="/images/logo.jpg"
                  alt="Pooda Samuel"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-[15px] font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Pooda Samuel
                </p>
                <p className="text-[11px] text-gray-400 font-medium">Finance & Digital</p>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-blue-500 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── CTA desktop ── */}
            <div className="hidden lg:flex items-center gap-3">
              {SOCIAL_LINKS.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Icon className="text-base" />
                </a>
              ))}
              <Link
                href="/contact"
                className="ml-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-colors duration-200"
              >
                Me contacter
              </Link>
            </div>

            {/* ── Mobile burger ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-gray-100 bg-white"
            >
              <div className="max-w-6xl mx-auto px-5 py-4 space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Réseaux + CTA dans le menu mobile */}
                <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex gap-3">
                    {SOCIAL_LINKS.map(({ name, icon: Icon, href }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={name}
                        className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors"
                      >
                        <Icon className="text-sm" />
                      </a>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    Me contacter
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer pour compenser le fixed */}
      <div className="h-[68px]" />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
    </>
  );
}
