# Portfolio de Samuel POODA

Portfolio professionnel moderne et responsive pour **Samuel POODA**, étudiant en Finance & Comptabilité à l'ESMC Business School de Casablanca.

## 🌐 URLs

- **Aperçu en direct**: https://3000-itrdhphse6qhqlb38ydgf-b237eb32.sandbox.novita.ai
- **GitHub Repository**: https://github.com/poodasamuelpro/poodasamuel.com
- **Domaine principal**: poodasamuel.com (à configurer sur Vercel)

## ✨ Fonctionnalités

### Pages complètes
- **Accueil** (`/`) - Hero animé avec gradients modernes, compétences, et projets en vedette
- **À Mon Propos** (`/about`) - Parcours, formation, expérience, compétences techniques et qualités personnelles
- **Portfolio** (`/portfolio`) - 6 projets réels avec détails (IziCard, Collectif Leaders Unis, etc.)
- **Services** (`/services`) - Liste complète des services avec tarifs et processus de travail
- **Blog** (`/blog`) - Structure prête (à venir)
- **Contact** (`/contact`) - Formulaire fonctionnel avec validation et FAQ

### Caractéristiques techniques
- ✅ **Next.js 15** avec App Router
- ✅ **TypeScript** pour la robustesse du code
- ✅ **TailwindCSS 4** pour le design moderne
- ✅ **Framer Motion** pour les animations fluides
- ✅ **Responsive Design** optimisé mobile/tablette/desktop
- ✅ **SEO optimisé** (meta tags, sitemap, structured data)
- ✅ **Performance optimisée** (lazy loading, images optimisées)
- ✅ **Vercel Analytics** intégré

## 🎨 Design

- **Palette de couleurs**: Dégradés modernes (bleu, violet, rose)
- **Animations**: Fade-in, slide, hover effects, blob animations
- **Typography**: Inter font family
- **Icons**: React Icons (Font Awesome)

## 📦 Stack Technique

```json
{
  "framework": "Next.js 15",
  "language": "TypeScript 5",
  "styling": "TailwindCSS 4",
  "animations": "Framer Motion 12",
  "icons": "React Icons 5",
  "analytics": "Vercel Analytics & Speed Insights",
  "deployment": "Vercel"
}
```

## 🚀 Développement Local

### Prérequis
- Node.js 20+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/poodasamuelpro/poodasamuel.com.git
cd poodasamuel.com

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Builder pour la production
npm run build

# Démarrer en production
npm start
```

### Scripts disponibles

```bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Builder pour la production
npm run start        # Démarrer le serveur de production
npm run lint         # Linter le code
```

## 📁 Structure du Projet

```
webapp/
├── app/
│   ├── about/          # Page À Mon Propos
│   ├── api/            # API Routes (lead, email, scraping)
│   ├── blog/           # Page Blog (à venir)
│   ├── contact/        # Page Contact
│   ├── portfolio/      # Page Portfolio
│   ├── services/       # Page Services
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Page d'accueil
│   ├── globals.css     # Styles globaux
│   ├── robots.ts       # Configuration robots.txt
│   └── sitemap.ts      # Sitemap dynamique
├── components/
│   ├── Header.tsx      # Header avec navigation
│   ├── Footer.tsx      # Footer avec réseaux sociaux
│   └── ContactForm.tsx # Formulaire de contact
├── lib/
│   └── seo.ts          # Utilitaires SEO
├── public/
│   └── images/         # Images et assets
├── next.config.ts      # Configuration Next.js
├── tailwind.config.ts  # Configuration Tailwind
└── tsconfig.json       # Configuration TypeScript
```

## 🌟 Projets en Vedette

1. **IziCard** - Startup de cartes de visite NFC intelligentes
2. **Collectif Leaders Unis** - Association humanitaire
3. **Sites WordPress Pro** - Création de sites modernes
4. **Stratégie Digitale** - Marketing & SEO
5. **Design Graphique** - Logos, flyers, vidéos
6. **Engagement Associatif** - AJPD, AECAM Casablanca

## 🎯 Services Offerts

- **Création de Sites Web** (WordPress/Elementor)
- **Stratégie Digitale** (Content, Social Media, SEO)
- **Design Graphique** (Logos, Flyers, Présentations)
- **Optimisation SEO** (Audit, Analytics, SEMrush)
- **Publicité en Ligne** (Google Ads, Facebook, Instagram)
- **Rédaction Professionnelle** (CV, Lettres de motivation)

## 📞 Contact

- **Email**: contact@poodasamuel.com
- **Localisation**: Casablanca, Maroc
- **Facebook**: [Samuel POODA](https://www.facebook.com/share/1EnrY67Amd/)
- **Instagram**: [@samuelpooda09](https://www.instagram.com/samuelpooda09)
- **LinkedIn**: [Pooda Samuel](http://www.linkedin.com/in/pooda-samuel)

## 🚀 Déploiement sur Vercel

### Étape 1: Connecter à Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Cliquer sur "New Project"
4. Importer `poodasamuelpro/poodasamuel.com`

### Étape 2: Configuration

```bash
# Framework Preset: Next.js
# Build Command: npm run build
# Output Directory: .next
# Install Command: npm install
```

### Étape 3: Variables d'environnement (optionnelles)

```bash
RESEND_API_KEY=votre_clé_resend  # Pour l'envoi d'emails
```

### Étape 4: Domaine personnalisé

1. Aller dans "Settings" > "Domains"
2. Ajouter `poodasamuel.com`
3. Configurer les DNS selon les instructions Vercel

## 📊 Performance

- **Lighthouse Score cible**: 95-100
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Cumulative Layout Shift**: < 0.1

## 🔧 Maintenance

### Ajouter un article de blog

1. Créer un fichier dans `app/blog/[slug]/page.tsx`
2. Ajouter le contenu avec les métadonnées SEO
3. Rebuild et déployer

### Mettre à jour le portfolio

1. Modifier `app/portfolio/page.tsx`
2. Ajouter les images dans `public/images/`
3. Commit et push

## 📝 Licence

© 2025 Samuel POODA. Tous droits réservés.

## 🙏 Remerciements

- **ESMC Business School** - Formation
- **Collectif Leaders Unis** - Association
- **IziCard Team** - Startup
- **Tous mes clients et partenaires**

---

**Créé avec ❤️ par Samuel POODA | Étudiant en Finance & Digital**
