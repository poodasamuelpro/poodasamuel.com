# 🚀 Guide de Déploiement - Portfolio Samuel POODA

## 📋 Prérequis

Avant de déployer, assurez-vous d'avoir :
- [ ] Un compte GitHub
- [ ] Un compte Vercel
- [ ] Le code prêt dans `/home/user/webapp`

---

## 🔐 Étape 1 : Configuration GitHub

### Option A : Créer un nouveau repository
1. Allez sur https://github.com/new
2. Créez un repository nommé : `portfolio-samuel-pooda`
3. **Ne cochez pas** "Initialize with README" (le projet a déjà un README)
4. Cliquez sur "Create repository"

### Option B : Utiliser un repository existant
1. Allez sur votre repository GitHub existant
2. Notez l'URL : `https://github.com/username/repository-name.git`

---

## 💻 Étape 2 : Pousser le code sur GitHub

### Depuis votre machine locale
```bash
# Naviguer vers le projet
cd /home/user/webapp

# Configurer Git (si pas déjà fait)
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"

# Ajouter le remote GitHub
git remote add origin https://github.com/USERNAME/portfolio-samuel-pooda.git

# Pousser le code
git push -u origin main
```

### Si erreur d'authentification
```bash
# Utiliser un token GitHub
# 1. Créez un Personal Access Token sur GitHub :
#    Settings → Developer settings → Personal access tokens → Tokens (classic)
#    Permissions : repo (full control)

# 2. Utilisez le token comme mot de passe lors du push
git push -u origin main
# Username: votre-username
# Password: ghp_VOTRE_TOKEN_ICI
```

---

## 🌐 Étape 3 : Déployer sur Vercel

### Via l'interface Vercel (Recommandé)
1. Allez sur https://vercel.com
2. Cliquez sur "New Project"
3. Importez votre repository GitHub
4. Configuration du projet :
   - **Framework Preset** : Next.js
   - **Root Directory** : `./` (racine)
   - **Build Command** : `npm run build`
   - **Output Directory** : `.next`
   - **Install Command** : `npm install`

5. Variables d'environnement (optionnel) :
   ```
   SITE_URL=https://votre-domaine.vercel.app
   RESEND_API_KEY=votre_resend_api_key
   ```

6. Cliquez sur "Deploy"

### Via Vercel CLI
```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
cd /home/user/webapp
vercel --prod
```

---

## ✅ Étape 4 : Vérification Post-Déploiement

### Checklist de vérification
- [ ] Le site est accessible : `https://votre-projet.vercel.app`
- [ ] Toutes les pages fonctionnent (Home, About, Services, Portfolio, Blog, Contact)
- [ ] Le formulaire de contact fonctionne
- [ ] Les images s'affichent correctement
- [ ] Le sitemap est accessible : `/sitemap.xml`
- [ ] Le robots.txt est accessible : `/robots.txt`
- [ ] Les API routes répondent : `/api/lead`, `/api/send-email`

### Tests SEO
```bash
# Tester le sitemap
curl https://votre-projet.vercel.app/sitemap.xml

# Tester robots.txt
curl https://votre-projet.vercel.app/robots.txt

# Tester une API
curl -X POST https://votre-projet.vercel.app/api/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

---

## 🔧 Étape 5 : Configuration Domaine Personnalisé (Optionnel)

### Ajouter votre domaine poodasamuel.com
1. Dans Vercel → Settings → Domains
2. Ajoutez : `poodasamuel.com` et `www.poodasamuel.com`
3. Configurez vos DNS chez votre registrar :
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 📧 Étape 6 : Configuration Email (Resend)

### Pour activer l'envoi d'emails
1. Créez un compte sur https://resend.com
2. Obtenez votre API Key
3. Ajoutez dans Vercel → Settings → Environment Variables :
   ```
   RESEND_API_KEY=re_VOTRE_CLE_API
   ```
4. Vérifiez votre domaine dans Resend
5. Redéployez le projet sur Vercel

---

## 📊 Étape 7 : Analytics & Monitoring

### Vercel Analytics (Déjà intégré)
- Activé automatiquement dans le code
- Voir les stats : Vercel Dashboard → Analytics

### Google Search Console
1. Allez sur https://search.google.com/search-console
2. Ajoutez votre propriété : `https://poodasamuel.com`
3. Vérifiez via DNS ou meta tag
4. Soumettez le sitemap : `https://poodasamuel.com/sitemap.xml`

### Google Analytics (Optionnel)
Ajoutez dans `app/layout.tsx` :
```typescript
// Google Analytics
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

---

## 🐛 Dépannage

### Erreur de build Vercel
```bash
# Vérifier le build en local
cd /home/user/webapp
npm run build

# Si erreurs, corriger et recommiter
git add .
git commit -m "fix: build errors"
git push
```

### Images ne s'affichent pas
Vérifier `next.config.ts` → `images.remotePatterns`

### API routes ne fonctionnent pas
Vérifier les logs Vercel → Deployments → Functions

---

## 📱 Étape 8 : Partage sur Réseaux Sociaux

### Optimisation Open Graph
Le site est déjà optimisé avec :
- Meta tags Open Graph
- Twitter Cards
- Images OG (1200x630px)

Testez avec :
- https://cards-dev.twitter.com/validator
- https://developers.facebook.com/tools/debug/

---

## 🎉 Félicitations !

Votre portfolio est maintenant en ligne et optimisé pour :
- ✅ SEO (Sitemap, Structured Data, Meta tags)
- ✅ Performance (Vercel Edge Network)
- ✅ Analytics (Vercel Analytics)
- ✅ Automatisation (Lead Gen, Email)

---

## 📞 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifiez les logs Vercel
2. Consultez la documentation Next.js
3. Contactez le support Vercel

**Bonne chance ! 🚀**
