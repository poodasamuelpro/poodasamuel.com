"use client";

// app/about/page.tsx

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaArrowRight, FaDownload, FaExternalLinkAlt,
  FaGraduationCap, FaBriefcase, FaHeart, FaCode,
  FaLightbulb, FaUsers, FaChartLine, FaMobileAlt,
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

const FORMATION = [
  {
    period: 'En cours',
    title: 'Licence Finance & Comptabilité',
    school: 'ESMC Business School — Casablanca, Maroc',
    detail: 'Spécialisation en analyse financière, comptabilité et gestion d\'entreprise.',
    current: true,
  },
  {
    period: '2022 – 2024',
    title: 'Bac+2 Management des Affaires & Transformation Digitale',
    school: 'ESMC Business School — Casablanca, Maroc',
    detail: 'Formation alliant stratégie d\'entreprise, marketing digital et outils numériques.',
    current: false,
  },
];

const NEXT_STEP = {
  title: 'Master en Finance',
  detail: 'Spécialisation visée : Corporate Finance / Analyse Financière / M&A. Actuellement à la recherche d\'un stage en Finance, Audit, Analyse Financière ou M&A.',
};

const HARD_SKILLS = [
  {
    category: '💼 Finance & Comptabilité',
    color: 'bg-blue-50 border-blue-100',
    labelColor: 'text-blue-700',
    items: [
      'Comptabilité générale & analytique',
      'Analyse financière',
      'Fiscalité',
      'Bilan & compte de résultat',
      'KPI & reporting',
      'Audit',
      'Décision d\'investissement',
      'Sage Comptabilité & Paie',
      'Excel avancé (TCD, tableaux de bord)',
      'Power BI',
      'Microsoft Access',
      'Word & PowerPoint',
    ],
  },
  {
    category: '📱 Marketing & Digital',
    color: 'bg-indigo-50 border-indigo-100',
    labelColor: 'text-indigo-700',
    items: [
      'Stratégie digitale',
      'SEO on-page & off-page',
      'Design graphique',
      'Intégration & développement web',
      'Rédaction de contenu',
      'WordPress & Elementor',
      'Canva & CapCut',
      'Google Search Console',
      'SEMrush',
    ],
  },
  {
    category: '🚀 Entrepreneuriat & Management',
    color: 'bg-green-50 border-green-100',
    labelColor: 'text-green-700',
    items: [
      'Gestion de projet',
      'Leadership',
      'Étude de marché',
      'Communication',
      'Coordination d\'équipe',
      'Microsoft Office',
      'Airtable',
    ],
  },
];

const SOFTSKILLS = [
  'Écoute active', 'Communication claire', 'Empathie', 'Sympathie',
  'Collaboration efficace', 'Esprit d\'équipe', 'Flexibilité', 'Adaptabilité',
  'Sens des responsabilités', 'Organisation', 'Persévérance', 'Gestion du temps',
];

const PROJECTS_ENTREPRE = [
  {
    icon: FaMobileAlt,
    tag: 'NFC & Innovation',
    title: 'IziCard Ouaga',
    role: 'Fondateur & Promoteur',
    color: 'bg-blue-50 text-blue-600',
    description: 'Solution burkinabè de cartes de visite et bracelets NFC intelligents, conçue pour digitaliser les échanges professionnels et personnels en Afrique de l\'Ouest. Un simple tap suffit pour partager ses informations — sans application à télécharger pour le destinataire.',
    highlights: [
      'IziCare — bracelet NFC de santé : accès immédiat aux informations médicales du porteur en cas d\'urgence',
      'IziPro — carte NFC professionnelle pour entreprises et indépendants',
      'IziID — identité numérique personnelle connectée',
      'IziPlus — offre premium et personnalisée',
    ],
    extra: 'Gestion complète du projet : conception, développement du site web, création de l\'identité visuelle, développement de l\'application mobile (Android + PWA).',
    url: 'https://izicardouaga.com',
    urlLabel: 'izicardouaga.com',
  },
  {
    icon: FaCode,
    tag: 'Santé Digitale',
    title: 'SantéBF',
    role: 'Fondateur & Promoteur',
    color: 'bg-green-50 text-green-600',
    description: 'Dossier Patient Informatisé National pour le Burkina Faso — une plateforme à vocation sociale visant à digitaliser le suivi médical des patients dans les structures sanitaires du pays.',
    highlights: [
      'Plateforme web de gestion des dossiers patients',
      'Application mobile dédiée aux patients — accès au dossier médical, rendez-vous, suivi',
      'Application mobile pour les professionnels de santé — consultations, prescriptions, ordonnances',
      'Couvre les 17 régions du Burkina Faso',
    ],
    extra: 'Projet en cours de développement actif — phase de construction et déploiement progressif.',
    url: 'https://santebf.izicardouaga.com',
    urlLabel: 'santebf.izicardouaga.com',
  },
];

const FREELANCE = [
  {
    title: 'Pro Braids Salon',
    desc: 'Création du site web complet pour un salon de coiffure africaine basé aux États-Unis. Design, développement, contenu et mise en ligne.',
    url: 'https://probraidssalon.com/en/',
    urlLabel: 'probraidssalon.com',
  },
  {
    title: 'Missions digitales',
    desc: 'Création de sites web pour clients particuliers et professionnels, conception de supports graphiques, rédaction de CV et lettres de motivation.',
    url: null,
    urlLabel: null,
  },
];

const ASSOCIATIONS = [
  {
    icon: FaUsers,
    title: 'Collectif Leaders Unis',
    role: 'Cofondateur & Président',
    desc: 'Association dédiée au leadership et à l\'engagement des jeunes. Coordination d\'actions concrètes, organisation d\'événements, développement du travail en équipe.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: FaHeart,
    title: 'Communauté Catholique Burkinabè de Casablanca',
    role: 'Responsable Adjoint à la Communication',
    desc: 'Gestion de la communication interne et externe de la communauté. Création de contenus, coordination des actions et animation des réseaux.',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: FaLightbulb,
    title: 'AJPD/BF',
    role: 'Membre actif',
    desc: 'Alliance des Jeunes pour la Paix et le Développement au Burkina Faso. Contribution au développement et à la cohésion des jeunes.',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    icon: FaGraduationCap,
    title: 'AECAM Casablanca',
    role: 'Membre actif',
    desc: 'Association des Étudiants Africains au Maroc. Réseau d\'entraide, solidarité et partage culturel entre étudiants africains à Casablanca.',
    color: 'bg-orange-50 text-orange-600',
  },
];

const ACADEMIC = [
  {
    title: 'MyBusiness — Simulation de création d\'entreprise',
    desc: 'Projet de fin de 2e année à l\'ESMC. Conception complète d\'une entreprise fictive adaptée au contexte marocain : offre de produits/services, identité visuelle, structure organisationnelle, fiches de poste, gestion des coûts, paie sur Sage, étude de marché locale, stratégie marketing digital et supports commerciaux. Présenté devant un jury académique et professionnel.',
  },
  {
    title: 'Étude de marché — Sidi Ali',
    desc: 'Analyse du comportement des consommateurs marocains vis-à-vis de l\'eau minérale Sidi Ali. Conception de l\'enquête, collecte de données terrain, analyse des résultats et rédaction du rapport complet. Développement de compétences en enquête terrain, analyse marketing et interprétation de données.',
  },
  {
    title: 'Projet audiovisuel — L\'envers du décor',
    desc: 'Court-métrage réalisé en équipe dans le cadre d\'un projet académique. Rôle central : scénariste principal, co-metteur en scène et co-réalisateur. Gestion du travail collaboratif, résolution de conflits et management participatif. Production présentée et soutenue devant jury.',
  },
  {
    title: 'Welcome to Morocco — Événement universitaire',
    desc: 'Organisation complète d\'un événement d\'intégration et de partage culturel à l\'ESMC. Prise en charge de la planification, du budget, de la communication, des invitations et de la logistique. Mise en pratique de la coordination d\'équipe, gestion budgétaire et communication événementielle.',
  },
  {
    title: 'Simulation comptable sur Sage',
    desc: 'Atelier académique de comptabilité opérationnelle. Création et paramétrage de la structure comptable d\'une entreprise fictive, enregistrement des opérations (achats, ventes, règlements), production des documents comptables. Renforcement des compétences sur Sage en conditions professionnelles.',
  },
];

// ── Composant ─────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ══ 1. HERO ══ */}
      <section className="relative pt-20 pb-16 px-5 sm:px-8 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] opacity-40"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(59,130,246,0.08) 0%, transparent 65%)' }}
        />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Texte */}
          <div className="space-y-5">
            <motion.p {...fadeUpHero(0)} className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500">
              À propos
            </motion.p>
            <motion.h1
              {...fadeUpHero(0.07)}
              className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Un parcours,<br />des projets,<br />une vision en construction.
            </motion.h1>
            <motion.p {...fadeUpHero(0.14)} className="text-gray-500 leading-relaxed">
              Je suis Pooda Aser Samuel, étudiant en Finance & Comptabilité à l'ESMC Business School de Casablanca, en fin de licence. Mon parcours est construit à l'intersection de la rigueur financière, du digital et de l'engagement humain.
            </motion.p>
            <motion.p {...fadeUpHero(0.2)} className="text-gray-500 leading-relaxed">
              En tant que personne en situation de handicap, j'ai appris très tôt que les contraintes ne définissent pas ce qu'on peut accomplir — elles révèlent comment on choisit de l'accomplir. Cette résilience est devenue ma force motrice.
            </motion.p>
            <motion.p {...fadeUpHero(0.26)} className="text-gray-500 leading-relaxed">
              Curieux, polyvalent et profondément attaché à l'impact concret, je m'intéresse autant aux chiffres qu'aux stratégies, autant à la gestion qu'à l'innovation. Mon objectif : devenir un professionnel capable de connecter la finance, le digital et les personnes pour créer de la valeur réelle.
            </motion.p>
            <motion.div {...fadeUpHero(0.32)} className="flex flex-wrap gap-3 pt-2">
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
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors duration-200 bg-white"
              >
                Me contacter
                <FaArrowRight className="text-xs" />
              </Link>
            </motion.div>
          </div>

          {/* Photos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white">
              <Image
                src="/images/pooda-photo.jpg"
                alt="Pooda Samuel"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white mt-8">
              <Image
                src="/images/soutenance.jpg"
                alt="Pooda Samuel — Soutenance"
                fill
                className="object-cover object-top"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══ 2. FORMATION ══ */}
      <section className="py-16 px-5 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">Formation</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
              Mon parcours académique
            </h2>
          </motion.div>

          <div className="space-y-4 max-w-3xl">
            {FORMATION.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.1)}
                className={`flex gap-5 p-5 rounded-2xl border ${f.current ? 'border-blue-200 bg-blue-50/40' : 'border-gray-100 bg-white'}`}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.current ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <FaGraduationCap className="text-base" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{f.period}</span>
                    {f.current && (
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">En cours</span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-0.5">{f.title}</p>
                  <p className="text-xs text-blue-600 font-medium mb-1">{f.school}</p>
                  <p className="text-xs text-gray-500">{f.detail}</p>
                </div>
              </motion.div>
            ))}

            {/* Prochaine étape */}
            <motion.div {...fadeUp(0.3)} className="flex gap-5 p-5 rounded-2xl border border-dashed border-gray-300 bg-gray-50/50">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-200 text-gray-500">
                  <FaArrowRight className="text-base" />
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Prochaine étape</span>
                <p className="text-sm font-bold text-gray-900 mt-1 mb-1">{NEXT_STEP.title}</p>
                <p className="text-xs text-gray-500">{NEXT_STEP.detail}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 3. PROJETS ENTREPRENEURIAUX ══ */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">Projets</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
              Initiatives entrepreneuriales
            </h2>
          </motion.div>

          <div className="space-y-6">
            {PROJECTS_ENTREPRE.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  {...fadeUp(i * 0.1)}
                  className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm"
                >
                  <div className="flex flex-wrap items-start gap-4 mb-4">
                    <span className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${p.color}`}>
                      <Icon className="text-xl" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                          {p.tag}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
                        {p.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">{p.role}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.description}</p>

                  <ul className="space-y-1.5 mb-4">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-gray-400 italic mb-4">{p.extra}</p>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaExternalLinkAlt className="text-[10px]" />
                    {p.urlLabel}
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 4. FREELANCE ══ */}
      <section className="py-16 px-5 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">Expérience</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
              Missions freelance
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FREELANCE.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.1)}
                className="bg-[#fafaf9] border border-gray-100 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-1">
                  <FaBriefcase className="text-blue-500 text-sm flex-shrink-0" />
                  <h3 className="text-sm font-bold text-gray-900">{f.title}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{f.desc}</p>
                {f.url && (
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaExternalLinkAlt className="text-[10px]" />
                    {f.urlLabel}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. ENGAGEMENTS ASSOCIATIFS ══ */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">Engagement</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
              Engagements associatifs
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ASSOCIATIONS.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.title}
                  {...fadeUp(i * 0.08)}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${a.color}`}>
                      <Icon className="text-base" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{a.title}</h3>
                      <p className="text-xs text-blue-600 font-medium">{a.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 6. PROJETS ACADÉMIQUES ══ */}
      <section className="py-16 px-5 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">Académique</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
              Projets académiques
            </h2>
          </motion.div>

          <div className="space-y-4 max-w-4xl">
            {ACADEMIC.map((a, i) => (
              <motion.div
                key={a.title}
                {...fadeUp(i * 0.08)}
                className="bg-[#fafaf9] border border-gray-100 rounded-2xl p-6"
              >
                <h3 className="text-sm font-bold text-gray-900 mb-2">{a.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. COMPÉTENCES ══ */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">Compétences</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
              Hard Skills
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {HARD_SKILLS.map((domain, i) => (
              <motion.div
                key={domain.category}
                {...fadeUp(i * 0.1)}
                className={`border rounded-2xl p-6 ${domain.color}`}
              >
                <h3 className={`text-sm font-bold mb-4 ${domain.labelColor}`} style={{ fontFamily: "'Sora', sans-serif" }}>
                  {domain.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {domain.items.map((item) => (
                    <span key={item} className="text-[11px] bg-white/80 border border-white/90 text-gray-700 px-2.5 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Soft Skills */}
          <motion.div {...fadeUp(0.2)}>
            <h3 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {SOFTSKILLS.map((s) => (
                <span key={s} className="text-sm bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full shadow-sm">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 8. JE RECHERCHE ══ */}
      <section className="py-16 px-5 sm:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="bg-gray-900 rounded-3xl px-8 py-12 text-center space-y-5"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">Opportunités</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
              Ce que je recherche
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-xl mx-auto">
              À l'approche de la fin de ma licence, je suis activement à la recherche d'un stage ou d'une première expérience professionnelle en <strong className="text-white">Finance, Audit, Analyse Financière ou M&A</strong>. Je suis ouvert à toute opportunité permettant de mettre en pratique mes compétences dans un environnement exigeant.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href="/cv-pooda-samuel.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <FaDownload className="text-xs" />
                Télécharger mon CV
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-xl hover:border-blue-400 hover:text-blue-400 transition-colors duration-200"
              >
                Me contacter
                <FaArrowRight className="text-xs" />
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
