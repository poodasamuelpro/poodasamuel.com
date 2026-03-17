import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">SAMUEL POODA</h3>
            <p className="text-gray-400 mb-4">
              Expert en Finance Digitale, Private Equity et Transformation Digitale.
              Spécialisé en stratégie financière, automatisation et développement web.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/in/poodasamuel" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="https://twitter.com/poodasamuel" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="https://github.com/poodasamuel" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <FaGithub size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">À Propos</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <FaEnvelope />
                <a href="mailto:contact@poodasamuel.com" className="hover:text-white transition-colors">
                  contact@poodasamuel.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone />
                <span>Casablanca, Maroc</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Samuel POODA. Tous droits réservés.</p>
          <p className="mt-2 text-sm">
            Finance Digitale | Private Equity | Transformation Digitale
          </p>
        </div>
      </div>
    </footer>
  );
}
