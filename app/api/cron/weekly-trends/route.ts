// app/api/cron/weekly-trends/route.ts
//
// Système de veille hebdomadaire — RSS + GNews combinés
//
// Sources :
// - 10 flux RSS gratuits (Afrique + Finance + Digital) — sans clé API
// - GNews API (gratuit 100/jour) — articles complémentaires
//
// Variables d'environnement nécessaires (toutes à ajouter sur Vercel) :
// - NEXT_PUBLIC_SUPABASE_URL      → Supabase → Settings → API → Project URL
// - NEXT_PUBLIC_SUPABASE_ANON_KEY → Supabase → Settings → API → anon public
// - SUPABASE_SERVICE_ROLE_KEY     → Supabase → Settings → API → service_role
// - GEMINI_API_KEY                → aistudio.google.com → Get API Key (gratuit)
// - GNEWS_API_KEY                 → gnews.io → Register → API Key (gratuit)
// - RESEND_API_KEY                → resend.com → API Keys (gratuit)
// - NEXT_PUBLIC_SITE_URL          → ton URL Vercel ex: https://poodasamuel.vercel.app
// - CRON_SECRET                   → mot de passe que tu inventes ex: cronSecret2026
// - NEXT_PUBLIC_DASHBOARD_PASSWORD→ mot de passe dashboard ex: pooda2026
//
// Coût total : 0€ — tous les services utilisés sont gratuits pour cet usage

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Permet à Vercel d'allouer jusqu'à 60s pour cette fonction (gratuit)
// Sans ça la limite est 10s ce qui est trop court pour ce cron
export const maxDuration = 60;

// ── Clients ───────────────────────────────────────────────────────────────────

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Sources RSS ───────────────────────────────────────────────────────────────

const RSS_SOURCES = [
  // Afrique — Finance & Économie
  { url: 'https://www.agenceecofin.com/feed', name: 'Agence Ecofin', category: 'Finance Afrique' },
  { url: 'https://www.financialafrik.com/feed', name: 'Financial Afrik', category: 'Finance Afrique' },
  { url: 'https://www.jeuneafrique.com/feed/rss/', name: 'Jeune Afrique', category: 'Économie Afrique' },
  // Burkina / Afrique de l'Ouest
  { url: 'https://lefaso.net/spip.php?page=backend', name: 'LeFaso.net', category: "Afrique de l'Ouest" },
  { url: 'https://www.burkina24.com/feed/', name: 'Burkina24', category: "Afrique de l'Ouest" },
  // International francophone
  { url: 'https://www.rfi.fr/fr/rss-economie', name: 'RFI Économie', category: 'Économie Internationale' },
  { url: 'https://www.latribune.fr/rss/rubriques/finance.xml', name: 'La Tribune', category: 'Finance Internationale' },
  { url: 'https://www.lesechos.fr/rss/rss_finance.xml', name: 'Les Echos', category: 'Finance Internationale' },
  // Digital & Tech
  { url: 'https://www.journaldunet.com/ebusiness/le-net/rss/', name: 'Journal du Net', category: 'Digital & Tech' },
  // Crypto
  { url: 'https://coinacademy.fr/feed/', name: 'Coin Academy', category: 'Crypto & Blockchain' },
];

// ── Requêtes GNews ────────────────────────────────────────────────────────────

const GNEWS_QUERIES = [
  { q: 'fusion acquisition Afrique finance', category: 'M&A & Capital' },
  { q: 'intelligence artificielle comptabilité finance', category: 'IA & Finance' },
  { q: 'BRVM bourse Afrique ouest investissement', category: 'Bourse Africaine' },
  { q: 'fintech paiement mobile Afrique', category: 'Fintech & Paiement' },
  { q: 'entrepreneuriat startup Afrique francophone', category: 'Entrepreneuriat' },
];

// ── Mots-clés de filtrage ─────────────────────────────────────────────────────

const KEYWORDS = [
  'comptabilité', 'finance', 'bilan', 'trésorerie', 'audit', 'fiscalité',
  'budget', 'investissement', 'rendement', 'dividende', 'fusion', 'acquisition',
  'capital', 'private equity', 'fonds', 'valorisation', 'banque', 'BRVM',
  'bourse', 'actions', 'BCEAO', 'UEMOA', 'microfinance', 'crédit',
  'digital', 'numérique', 'intelligence artificielle', 'automatisation',
  'transformation', 'fintech', 'NFC', 'paiement mobile', 'Afrique', 'Burkina',
  'CEDEAO', 'franc CFA', 'croissance', 'développement', 'entrepreneuriat',
  'startup', 'marketing', 'stratégie', 'crypto', 'bitcoin', 'blockchain',
  'leadership', 'compétences', 'management',
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface Article {
  title: string;
  description: string;
  link: string;
  source: string;
  category: string;
  origin: 'rss' | 'gnews';
}

interface GeneratedContent {
  linkedin_post: string;
  blog_title: string;
  blog_intro: string;
  blog_sections: Array<{ title: string; content: string }>;
  blog_conclusion: string;
  hashtags: string[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getWeekLabel(): string {
  const now = new Date();
  return `Semaine du ${now.getDate()} ${now.toLocaleString('fr-FR', { month: 'long' })} ${now.getFullYear()}`;
}

function getWeekStart(): string {
  const now = new Date();
  now.setDate(now.getDate() - now.getDay());
  return now.toISOString().split('T')[0];
}

function extractText(xml: string, tag: string): string {
  const patterns = [
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, 'i'),
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'),
  ];
  for (const p of patterns) {
    const m = xml.match(p);
    if (m) return m[1].trim();
  }
  return '';
}

function cleanHtml(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function isRelevant(title: string, desc: string): boolean {
  const text = (title + ' ' + desc).toLowerCase();
  return KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
}

function getCategory(title: string, desc: string, fallback: string): string {
  const t = (title + ' ' + desc).toLowerCase();
  if (t.includes('brvm') || t.includes('bourse')) return 'Bourse & Marchés Africains';
  if (t.includes('crypto') || t.includes('bitcoin') || t.includes('blockchain')) return 'Crypto & Blockchain';
  if (t.includes('fintech') || t.includes('paiement')) return 'Fintech & Paiement';
  if (t.includes('fusion') || t.includes('acquisition')) return 'M&A & Capital';
  if (t.includes('intelligence artificielle') || t.includes('automatisation')) return 'IA & Automatisation';
  if (t.includes('digital') || t.includes('transformation')) return 'Transformation Digitale';
  if (t.includes('comptabilité') || t.includes('audit')) return 'Comptabilité & Audit';
  if (t.includes('banque') || t.includes('crédit')) return 'Banque & Finance';
  if (t.includes('startup') || t.includes('entrepreneuriat')) return 'Entrepreneuriat';
  if (t.includes('marketing')) return 'Marketing & Stratégie';
  return fallback;
}

// ── Étape 1a : Scraper les flux RSS ──────────────────────────────────────────

async function scrapeRSS(): Promise<Article[]> {
  const results: Article[] = [];
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  for (const source of RSS_SOURCES) {
    try {
      const res = await fetch(source.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Bot/1.0)' },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;

      const xml = await res.text();
      const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];

      for (const item of items.slice(0, 8)) {
        const title = cleanHtml(extractText(item, 'title'));
        const description = cleanHtml(extractText(item, 'description'));
        const link = cleanHtml(extractText(item, 'link') || extractText(item, 'guid'));
        const pubDate = extractText(item, 'pubDate');

        if (!title || title.length < 10) continue;
        if (!isRelevant(title, description)) continue;

        if (pubDate) {
          const d = new Date(pubDate);
          if (d < weekAgo) continue;
        }

        results.push({
          title,
          description: description.slice(0, 300),
          link,
          source: source.name,
          category: getCategory(title, description, source.category),
          origin: 'rss',
        });
      }
      console.log(`✅ RSS ${source.name}: ok`);
    } catch {
      console.log(`⚠️ RSS ${source.name}: échec`);
    }
  }

  return results;
}

// ── Étape 1b : Récupérer via GNews API ───────────────────────────────────────

async function scrapeGNews(): Promise<Article[]> {
  const results: Article[] = [];
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    console.log('⚠️ GNEWS_API_KEY manquante — GNews ignoré');
    return [];
  }

  for (const query of GNEWS_QUERIES) {
    try {
      const url =
        `https://gnews.io/api/v4/search?` +
        `q=${encodeURIComponent(query.q)}&` +
        `lang=fr&` +
        `max=3&` +
        `from=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}&` +
        `apikey=${apiKey}`;

      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;

      const data = await res.json();

      for (const article of data.articles || []) {
        if (!article.title || !isRelevant(article.title, article.description || '')) continue;

        results.push({
          title: article.title,
          description: (article.description || '').slice(0, 300),
          link: article.url || '',
          source: article.source?.name || 'GNews',
          category: getCategory(article.title, article.description || '', query.category),
          origin: 'gnews',
        });
      }
      console.log(`✅ GNews "${query.q}": ok`);
    } catch {
      console.log(`⚠️ GNews "${query.q}": échec`);
    }
  }

  return results;
}

// ── Étape 1c : Fusionner et sélectionner les 15 meilleurs ────────────────────

function mergeAndSelect(rss: Article[], gnews: Article[]): Article[] {
  const all = [...rss, ...gnews];

  const seen = new Set<string>();
  const unique = all.filter(a => {
    const key = a.title.slice(0, 50).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const african = unique.filter(a =>
    ['Agence Ecofin', 'Financial Afrik', 'Jeune Afrique', 'LeFaso.net', 'Burkina24'].includes(a.source)
  );
  const gnewsItems = unique.filter(a => a.origin === 'gnews');
  const other = unique.filter(a => !african.includes(a) && !gnewsItems.includes(a));

  // 8 africains + 4 GNews + 3 autres = 15 max
  return [...african.slice(0, 8), ...gnewsItems.slice(0, 4), ...other.slice(0, 3)].slice(0, 15);
}

// ── Étape 2 : Générer le contenu avec Gemini ─────────────────────────────────

async function generateContent(trends: Article[]): Promise<GeneratedContent[]> {
  const prompt = `Tu es un expert en finance, comptabilité, transformation digitale et entrepreneuriat en Afrique francophone.
Tu rédiges du contenu pour Samuel POODA : étudiant en Finance & Comptabilité, fondateur d'IziCard (solution NFC Burkina Faso), basé à Casablanca.
Ton ton : professionnel, pédagogique, accessible. Jamais arrogant. Ancré dans le contexte africain quand pertinent.

Pour chacun des ${trends.length} sujets, génère :

1. POST LINKEDIN (format strict) :
🔥 [Hook fort — chiffre ou question choc, 1-2 lignes]

[Contexte en 2-3 lignes simples]

Les points clés :
▪️ Point 1 — explication courte
▪️ Point 2 — explication courte
▪️ Point 3 — explication courte
▪️ Point 4 — explication courte

💡 [Prise de position personnelle, 1-2 lignes]

👇 [Question engageante pour les commentaires]

#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5 #hashtag6

2. ARTICLE BLOG :
- Titre SEO accrocheur
- Introduction (150-200 mots)
- 3 sections développées (200-250 mots chacune)
- Conclusion avec call to action (100-150 mots)

Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks :
[
  {
    "linkedin_post": "texte avec \\n pour les sauts de ligne",
    "blog_title": "...",
    "blog_intro": "...",
    "blog_sections": [
      {"title": "...", "content": "..."},
      {"title": "...", "content": "..."},
      {"title": "...", "content": "..."}
    ],
    "blog_conclusion": "...",
    "hashtags": ["#Finance", "#Afrique"]
  }
]

Les ${trends.length} sujets :
${trends.map((t, i) => `${i + 1}. [${t.category}] — ${t.source}\nTitre: ${t.title}\nContexte: ${t.description}`).join('\n\n')}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.75, maxOutputTokens: 8192 },
      }),
    }
  );

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
  const clean = text.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(clean);
  } catch {
    console.error('Gemini parse error:', clean.slice(0, 300));
    return [];
  }
}

// ── Étape 3 : Sauvegarder dans Supabase ──────────────────────────────────────

async function saveToSupabase(trends: Article[], content: GeneratedContent[]) {
  const rows = trends.map((t, i) => ({
    week_label: getWeekLabel(),
    week_start: getWeekStart(),
    topic: t.title,
    category: t.category,
    source: t.source,
    source_url: t.link,
    summary: t.description,
    linkedin_post: content[i]?.linkedin_post || '',
    blog_title: content[i]?.blog_title || t.title,
    blog_intro: content[i]?.blog_intro || '',
    blog_sections: content[i]?.blog_sections || [],
    blog_conclusion: content[i]?.blog_conclusion || '',
    hashtags: content[i]?.hashtags || [],
    is_published: false,
  }));

  const { error } = await supabase.from('weekly_trends').insert(rows);
  if (error) throw new Error(`Supabase: ${error.message}`);
}

// ── Étape 4 : Email d'alerte ──────────────────────────────────────────────────

async function sendAlertEmail(trends: Article[]) {
  const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`;
  const categories = [...new Set(trends.map(t => t.category))].slice(0, 6);

  await resend.emails.send({
    from: 'Portfolio Bot <onboarding@resend.dev>',
    to: 'poodasamuelpro@gmail.com',
    subject: `📊 ${trends.length} tendances prêtes — ${getWeekLabel()}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;">
        <h1 style="font-size:22px;color:#111827;margin:0 0 4px;">📊 Tes tendances sont prêtes</h1>
        <p style="color:#6b7280;font-size:14px;margin:0 0 24px;">${getWeekLabel()}</p>

        <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:20px;">
          <p style="margin:0 0 12px;font-size:15px;color:#374151;">
            <strong>${trends.length} sujets</strong> issus de
            <strong>${RSS_SOURCES.length} flux RSS</strong> + <strong>GNews</strong>
            — filtrés et rédigés automatiquement.
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${categories.map(c => `<span style="background:#eff6ff;color:#3b82f6;font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px;">${c}</span>`).join('')}
          </div>
        </div>

        <ul style="font-size:14px;color:#374151;padding-left:20px;margin-bottom:28px;line-height:2.2;">
          <li>📱 Post LinkedIn avec hook, points clés et hashtags</li>
          <li>✍️ Article blog complet (intro + 3 sections + conclusion)</li>
          <li>🔗 Source originale pour chaque sujet</li>
        </ul>

        <a href="${dashboardUrl}" style="display:inline-block;background:#111827;color:white;padding:13px 26px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
          Voir mes tendances →
        </a>

        <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f3f4f6;">
          <p style="font-size:13px;color:#9ca3af;margin:0 0 8px;">Cette semaine :</p>
          <ul style="font-size:13px;color:#6b7280;padding-left:16px;margin:0;line-height:1.8;">
            ${trends.slice(0, 5).map(t => `<li>${t.title.slice(0, 72)}${t.title.length > 72 ? '…' : ''}</li>`).join('')}
            ${trends.length > 5 ? `<li style="color:#9ca3af;">+ ${trends.length - 5} autres…</li>` : ''}
          </ul>
        </div>

        <p style="margin-top:24px;font-size:11px;color:#d1d5db;">
          Généré automatiquement chaque dimanche · Portfolio Samuel POODA
        </p>
      </div>
    `,
  });
}

// ── Handler principal ─────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const isManualTest = request.nextUrl.searchParams.get('token') === process.env.CRON_SECRET;

  if (!isVercelCron && !isManualTest) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('🔄 Démarrage veille hebdomadaire...');

    console.log('📰 Scraping RSS + GNews en parallèle...');
    const [rssArticles, gnewsArticles] = await Promise.all([
      scrapeRSS(),
      scrapeGNews(),
    ]);
    console.log(`✅ RSS: ${rssArticles.length} | GNews: ${gnewsArticles.length}`);

    const trends = mergeAndSelect(rssArticles, gnewsArticles);
    console.log(`✅ ${trends.length} articles sélectionnés`);

    if (trends.length === 0) {
      return NextResponse.json({ success: false, message: 'Aucun article pertinent.' });
    }

    console.log('🤖 Génération Gemini...');
    const content = await generateContent(trends);
    console.log(`✅ ${content.length} contenus générés`);

    console.log('💾 Sauvegarde Supabase...');
    await saveToSupabase(trends, content);
    console.log('✅ Sauvegardé');

    console.log('📧 Envoi email...');
    await sendAlertEmail(trends);
    console.log('✅ Email envoyé');

    return NextResponse.json({
      success: true,
      week: getWeekLabel(),
      rssArticles: rssArticles.length,
      gnewsArticles: gnewsArticles.length,
      selected: trends.length,
      contentGenerated: content.length,
    });

  } catch (error) {
    console.error('❌ Erreur cron:', error);
    return NextResponse.json({ error: 'Failed', details: String(error) }, { status: 500 });
  }
}
