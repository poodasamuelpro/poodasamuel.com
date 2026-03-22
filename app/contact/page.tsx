"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaPaperPlane,
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ nom: '', email: '', objet: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: FaPhone,
      label: 'Téléphone & WhatsApp',
      value: '+212 649 289 798',
      href: 'tel:+212649289798',
      sub: 'Disponible en appel et sur WhatsApp',
      wa: true,
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'poodasamuelpro@gmail.com',
      href: 'mailto:poodasamuelpro@gmail.com',
      sub: 'Réponse sous 24–48h',
      wa: false,
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Localisation',
      value: 'Casablanca, Maroc',
      href: null,
      sub: 'La Gironde',
      wa: false,
    },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      href: 'https://www.facebook.com/share/1EnrY67Amd/?mibextid=wwXIfr',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      href: 'https://www.instagram.com/samuelpooda09',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      href: 'http://www.linkedin.com/in/pooda-samuel',
    },
  ];

  return (
    <main className="min-h-screen bg-[#f9f9f8]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 w-[480px] h-[480px] opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at top right, rgba(59,130,246,0.08) 0%, transparent 65%)',
          }}
        />
        <div className="max-w-3xl mx-auto">
          <motion.p
            {...fadeUp(0)}
            className="text-xs font-bold tracking-[0.18em] text-blue-500 uppercase mb-4"
          >
            Contact
          </motion.p>
          <motion.h1
            {...fadeUp(0.07)}
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Échangeons ensemble
          </motion.h1>
          <motion.p
            {...fadeUp(0.14)}
            className="text-gray-500 text-lg leading-relaxed max-w-xl"
          >
            Une question, une idée de collaboration ou simplement envie d'échanger ?
            Je lis chaque message avec attention et vous réponds dans les meilleurs délais.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            const inner = (
              <div className="flex flex-col items-center text-center gap-2">
                <span className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center mb-1">
                  <Icon className="text-blue-500 text-lg" />
                </span>
                <p className="text-[11px] font-bold tracking-wider uppercase text-gray-400">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-gray-800 leading-snug">
                  {item.value}
                </p>
                <p className="text-xs text-gray-400">{item.sub}</p>
                {item.wa && (
                  <a
                    href="https://wa.me/212649289798"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold text-green-600 hover:text-green-700 transition-colors"
                  >
                    <FaWhatsapp className="text-sm" />
                    Ouvrir WhatsApp
                  </a>
                )}
              </div>
            );

            return (
              <motion.div
                key={item.label}
                {...fadeUpView(i * 0.08)}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                {item.href && !item.wa ? (
                  <a href={item.href} className="block">{inner}</a>
                ) : (
                  inner
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gray-200" />
      </div>

      {/* ── FORM + ASIDE ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ─ FORM ─ */}
          <motion.div {...fadeUpView(0)} className="lg:col-span-3">
            <h2
              className="text-2xl font-bold text-gray-900 mb-8"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Envoyer un message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="nom"
                    className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5"
                  >
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="objet"
                  className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5"
                >
                  Objet *
                </label>
                <input
                  type="text"
                  id="objet"
                  name="objet"
                  value={formData.objet}
                  onChange={handleChange}
                  required
                  placeholder="Ex : Création de site, collaboration, IziCard…"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Décrivez votre besoin ou posez votre question…"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Envoi en cours…
                  </span>
                ) : (
                  <>
                    <FaPaperPlane className="text-xs" />
                    Envoyer le message
                  </>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-700 bg-green-50 border border-green-200 px-4 py-3 rounded-xl"
                >
                  ✓ Message envoyé ! Je vous répondrai dès que possible.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-xl"
                >
                  Une erreur est survenue. Écrivez-moi directement à{' '}
                  <a
                    href="mailto:poodasamuelpro@gmail.com"
                    className="underline font-medium"
                  >
                    poodasamuelpro@gmail.com
                  </a>
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* ─ ASIDE ─ */}
          <motion.aside
            {...fadeUpView(0.1)}
            className="lg:col-span-2 space-y-6"
          >
            {/* Attentes */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3
                className="text-base font-bold text-gray-900 mb-5"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Ce que vous pouvez attendre
              </h3>
              <ul className="space-y-4">
                {[
                  ['Réponse sous 24–48h', 'Je lis mes messages régulièrement.'],
                  ['Échanges en français', 'Ou en anglais selon vos préférences.'],
                  ['Honnêteté avant tout', 'Si je ne peux pas aider, je le dirai.'],
                  ['Tarifs accessibles', 'Cohérents avec la qualité du travail fourni.'],
                ].map(([title, desc], i) => (
                  <motion.li
                    key={title}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex gap-3 list-none"
                  >
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                      <span className="block w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Réseaux */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3
                className="text-base font-bold text-gray-900 mb-1"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Réseaux sociaux
              </h3>
              <p className="text-xs text-gray-400 mb-5">
                Projets, réflexions et actualités.
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ name, icon: Icon, href }, i) => (
                  <motion.a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    whileHover={{ scale: 1.12, y: -2 }}
                    className="w-11 h-11 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <Icon className="text-base" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Disponibilité */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Disponible
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-300">
                Ouvert aux projets ponctuels, collaborations et missions freelance.
                N'hésitez pas à me soumettre votre idée.
              </p>
            </div>

          </motion.aside>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
    </main>
  );
}
