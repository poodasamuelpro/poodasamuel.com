"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      href: 'https://www.facebook.com/share/1EnrY67Amd/?mibextid=wwXIfr',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      href: 'https://www.instagram.com/samuelpooda09',
      color: 'hover:text-pink-600'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      href: 'http://www.linkedin.com/in/pooda-samuel',
      color: 'hover:text-blue-700'
    }
  ];

  const quickLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'À Mon Propos', href: '/about' },
    { name: 'Mon Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-blue-500">
                <Image
                  src="/images/logo.jpg"
                  alt="Pooda Samuel Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">POODA SAMUEL</h3>
                <p className="text-sm text-gray-400">Finance & Digital</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Étudiant en Finance & Comptabilité à ESMC Business School, passionné par la transformation digitale et l'entrepreneuriat.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className={`text-gray-400 ${social.color} transition-colors duration-300`}
                    aria-label={social.name}
                  >
                    <Icon className="text-2xl" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-400">Liens Rapides</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 h-px bg-blue-400 group-hover:w-4 transition-all duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-400">Mes Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Création de sites web modernes</li>
              <li>• Stratégie digitale</li>
              <li>• Design graphique</li>
              <li>• Optimisation SEO</li>
              <li>• Gestion de campagnes publicitaires</li>
              <li>• Rédaction de CV & lettres de motivation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-400">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                <span>Casablanca, Maroc</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <FaEnvelope className="text-blue-400 flex-shrink-0" />
                <a href="mailto:contact@poodasamuel.com" className="hover:text-blue-400 transition-colors">
                  contact@poodasamuel.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <FaPhone className="text-blue-400 flex-shrink-0" />
                <span>Disponible sur demande</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Pooda Samuel. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
