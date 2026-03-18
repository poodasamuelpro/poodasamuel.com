# 🚀 Guide de Déploiement Vercel

Ce guide vous accompagne étape par étape pour déployer votre portfolio sur Vercel et configurer le domaine poodasamuel.com.

## ✅ Prérequis

- [x] Compte GitHub avec le repository `poodasamuelpro/poodasamuel.com`
- [ ] Compte Vercel (gratuit) - [Créer un compte](https://vercel.com/signup)
- [ ] Accès aux DNS de votre domaine poodasamuel.com

## 📋 Étape 1: Créer un projet Vercel

### 1.1 Se connecter à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"** (si nouveau compte) ou **"Log In"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel à accéder à votre compte GitHub

### 1.2 Importer le repository

1. Sur le dashboard Vercel, cliquez sur **"Add New..." > "Project"**
2. Trouvez le repository `poodasamuelpro/poodasamuel.com`
3. Cliquez sur **"Import"**

### 1.3 Configurer le projet

```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node Version: 20.x
```

**Important**: Laissez ces valeurs par défaut, Vercel les détecte automatiquement.

### 1.4 Variables d'environnement (Optionnel)

Pour l'instant, aucune variable n'est requise. Plus tard, si vous voulez activer l'envoi d'emails :

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

### 1.5 Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 2-3 minutes pendant le build
3. Votre site sera disponible sur une URL temporaire : `poodasamuel-xxxx.vercel.app`

## 🌐 Étape 2: Configurer le domaine personnalisé

### 2.1 Ajouter le domaine

1. Dans votre projet Vercel, allez dans **"Settings"** > **"Domains"**
2. Entrez `poodasamuel.com` dans le champ
3. Cliquez sur **"Add"**
4. Vercel vous donnera des instructions DNS

### 2.2 Configurer les DNS

Vous devez ajouter ces enregistrements DNS chez votre registrar (OVH, Namecheap, GoDaddy, etc.) :

#### Option A: DNS Records (Recommandé)

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### Option B: Nameservers (Alternative)

Si proposé par Vercel, vous pouvez utiliser leurs nameservers :

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### 2.3 Vérification

1. Retournez sur Vercel
2. Attendez 5-10 minutes (propagation DNS)
3. Vercel vérifiera automatiquement votre configuration
4. Une fois validé, un certificat SSL sera généré automatiquement

### 2.4 Redirection www → non-www (Optionnel)

Pour rediriger automatiquement `www.poodasamuel.com` vers `poodasamuel.com` :

1. Ajoutez aussi le domaine `www.poodasamuel.com` dans Vercel
2. Vercel configurera automatiquement la redirection

## 🔄 Étape 3: Déploiement automatique

### Configuration Git

Vercel est maintenant connecté à votre repository GitHub. Chaque fois que vous pushez sur la branche `main`, Vercel déploie automatiquement :

```bash
git add .
git commit -m "fix: Update homepage text"
git push origin main
```

### Preview Deployments

Vercel crée aussi des previews pour chaque Pull Request :

1. Créez une branche : `git checkout -b feature/new-feature`
2. Faites vos modifications
3. Pushez : `git push origin feature/new-feature`
4. Créez une Pull Request sur GitHub
5. Vercel génère une URL de preview automatiquement

## ⚙️ Étape 4: Configuration avancée (Optionnel)

### 4.1 Analytics

Vercel Analytics est déjà intégré dans le code. Pour l'activer :

1. Allez dans **"Analytics"** dans votre projet Vercel
2. Cliquez sur **"Enable Analytics"** (gratuit pour 100k pageviews/mois)

### 4.2 Speed Insights

Speed Insights est déjà intégré. Pour l'activer :

1. Allez dans **"Speed Insights"** 
2. Cliquez sur **"Enable Speed Insights"** (gratuit)

### 4.3 Variables d'environnement pour production

Si vous voulez activer l'envoi d'emails via Resend :

1. Allez sur [resend.com](https://resend.com) et créez un compte
2. Créez une clé API
3. Dans Vercel, allez dans **"Settings"** > **"Environment Variables"**
4. Ajoutez :
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
   ```
5. Redéployez votre application

### 4.4 Build & Development Settings

Configuration recommandée :

```
Node.js Version: 20.x
Output Directory: .next
Install Command: npm install
Build Command: npm run build
Development Command: npm run dev
```

## 🐛 Dépannage

### Le domaine ne fonctionne pas

1. **Vérifiez les DNS** : Utilisez [whatsmydns.net](https://whatsmydns.net) pour vérifier la propagation
2. **Attendez** : La propagation DNS peut prendre jusqu'à 48h (souvent 5-10 minutes)
3. **Videz le cache** : Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)

### Erreur de build

1. **Vérifiez les logs** : Dans Vercel, allez dans **"Deployments"** > Cliquez sur le déploiement > **"View Logs"**
2. **Testez localement** : 
   ```bash
   npm install
   npm run build
   ```
3. **Vérifiez Node version** : Le projet nécessite Node.js 20+

### Images ne s'affichent pas

1. Vérifiez que les images sont dans `public/images/`
2. Vérifiez `next.config.ts` pour la configuration des images
3. Utilisez des chemins absoluts : `/images/logo.jpg` et non `./images/logo.jpg`

## 📊 Vérification post-déploiement

### Checklist finale

- [ ] Le site s'affiche correctement sur `poodasamuel.com`
- [ ] Toutes les pages sont accessibles (Accueil, À Propos, Portfolio, Services, Blog, Contact)
- [ ] Les images s'affichent correctement
- [ ] Les animations Framer Motion fonctionnent
- [ ] Le formulaire de contact fonctionne
- [ ] Le SSL (HTTPS) est actif
- [ ] La version mobile est responsive
- [ ] Les liens de réseaux sociaux fonctionnent
- [ ] Google Analytics / Vercel Analytics est actif

### Tests de performance

1. **PageSpeed Insights** : [pagespeed.web.dev](https://pagespeed.web.dev/)
2. **GTmetrix** : [gtmetrix.com](https://gtmetrix.com/)
3. **WebPageTest** : [webpagetest.org](https://webpagetest.org/)

Score cible : **90-100** sur tous les indicateurs

## 🎉 Félicitations !

Votre portfolio est maintenant en ligne sur `poodasamuel.com` ! 

### Prochaines étapes recommandées

1. **Soumettre à Google** : [search.google.com/search-console](https://search.google.com/search-console)
2. **Créer un compte Google Analytics** (en plus de Vercel Analytics)
3. **Partager sur les réseaux sociaux** (LinkedIn, Facebook, Instagram)
4. **Ajouter du contenu au blog** régulièrement
5. **Mettre à jour le portfolio** avec de nouveaux projets

## 📧 Support

Si vous rencontrez des problèmes :

- **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)
- **Documentation Next.js** : [nextjs.org/docs](https://nextjs.org/docs)
- **Support Vercel** : [vercel.com/support](https://vercel.com/support)

---

**Bon déploiement ! 🚀**
