// app/api/cron/weekly-trends/route.ts
//
// 2 appels Gemini séparés :
// - Appel 1 : génère les posts LinkedIn
// - Appel 2 : génère les articles blog
// Plus fiable — prompts plus courts = JSON plus propre

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const maxDuration = 60;

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) { console.warn('RESEND_API_KEY manquante'); return; }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Portfolio Bot <contact@poodasamuelpro.izicardouaga.com>',
      to: [to],
      subject,
      html,
    }),
  });
  if (!res.ok) console.error('Resend error:', await res.text());
  else console.log('✅ Email envoyé');
}

// ── Sources RSS ───────────────────────────────────────────────────────────────

const RSS_SOURCES = [
  { url: 'https://www.agenceecofin.com/feed', name: 'Agence Ecofin', category: 'Finance Afrique' },
  { url: 'https://www.financialafrik.com/feed', name: 'Financial Afrik', category: 'Finance Afrique' },
  { url: 'https://www.jeuneafrique.com/feed/rss/', name: 'Jeune Afrique', category: 'Économie Afrique' },
  { url: 'https://www.rfi.fr/fr/rss-economie', name: 'RFI Économie', category: 'Économie Internationale' },
  { url: 'https://www.latribune.fr/rss/rubriques/finance.xml', name: 'La Tribune', category: 'Finance Internationale' },
  { url: 'https://www.lesechos.fr/rss/rss_finance.xml', name: 'Les Echos', category: 'Finance Internationale' },
  { url: 'https://www.journaldunet.com/ebusiness/le-net/rss/', name: 'Journal du Net', category: 'Digital & Tech' },
  { url: 'https://coinacademy.fr/feed/', name: 'Coin Academy', category: 'Crypto & Blockchain' },
];

const GNEWS_QUERIES = [
  { q: 'fusion acquisition Afrique finance', category: 'M&A & Capital' },
  { q: 'intelligence artificielle comptabilité finance', category: 'IA & Finance' },
  { q: 'BRVM bourse Afrique ouest investissement', category: 'Bourse Africaine' },
  { q: 'fintech paiement mobile Afrique', category: 'Fintech & Paiement' },
  { q: 'entrepreneuriat startup Afrique francophone', category: 'Entrepreneuriat' },
];

const TITLE_KEYWORDS = [
  'finance', 'comptabilité', 'banque', 'investissement', 'économie', 'bourse',
  'BRVM', 'fintech', 'crypto', 'bitcoin', 'blockchain', 'digital', 'numérique',
  'IA', 'intelligence artificielle', 'automatisation', 'transformation',
  'startup', 'entrepreneuriat', 'fusion', 'acquisition', 'audit', 'fiscalité',
  'budget', 'trésorerie', 'marché', 'capital', 'fonds', 'paiement', 'NFC',
  'monnaie', 'dette', 'croissance', 'PIB', 'inflation', 'sukuk',
  'inclusion financière', 'microfinance', 'stablecoin', 'valorisation',
  'marketing', 'stratégie', 'leadership', 'management', 'développement',
];

interface Article {
  title: string;
  description: string;
  link: string;
  source: string;
  category: string;
  origin: 'rss' | 'gnews';
}

interface LinkedInPost {
  linkedin_post: string;
  hashtags: string[];
}

interface BlogPost {
  blog_title: string;
  blog_intro: string;
  blog_sections: Array<{ title: string; content: string }>;
  blog_conclusion: string;
}

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
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'")
    .replace(/&#\d+;/g, ' ').replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

function isTitleRelevant(title: string): boolean {
  const t = title.toLowerCase();
  return TITLE_KEYWORDS.some(kw => t.includes(kw.toLowerCase()));
}

function getCategory(title: string, desc: string, fallback: string): string {
  const t = (title + ' ' + desc).toLowerCase();
  if (t.includes('brvm') || t.includes('bourse')) return 'Bourse & Marchés Africains';
  if (t.includes('crypto') || t.includes('bitcoin') || t.includes('blockchain') || t.includes('stablecoin')) return 'Crypto & Blockchain';
  if (t.includes('fintech') || t.includes('paiement') || t.includes('inclusion financière')) return 'Fintech & Paiement';
  if (t.includes('fusion') || t.includes('acquisition') || t.includes('sukuk')) return 'M&A & Capital';
  if (t.includes('intelligence artificielle') || t.includes('automatisation')) return 'IA & Automatisation';
  if (t.includes('digital') || t.includes('transformation') || t.includes('numérique')) return 'Transformation Digitale';
  if (t.includes('comptabilité') || t.includes('audit') || t.includes('fiscalité')) return 'Comptabilité & Audit';
  if (t.includes('banque') || t.includes('crédit') || t.includes('microfinance')) return 'Banque & Finance';
  if (t.includes('startup') || t.includes('entrepreneuriat')) return 'Entrepreneuriat';
  if (t.includes('marketing') || t.includes('stratégie')) return 'Marketing & Stratégie';
  if (t.includes('leadership') || t.includes('management')) return 'Leadership & Management';
  return fallback;
}

// ── Gemini helper ─────────────────────────────────────────────────────────────

async function callGemini(prompt: string, label: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY manquante');

  // Essai 1 : gemini-2.5-flash
  // Essai 2 : gemini-2.0-flash-lite (fallback)
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash-lite'];

  for (const model of models) {
    try {
      console.log(`Gemini [${label}] essai avec ${model}...`);
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.warn(`${model} erreur ${res.status}:`, data.error?.message);
        continue; // essai suivant
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!text.trim()) {
        console.warn(`${model} retourne vide`);
        continue;
      }

      console.log(`✅ ${model} [${label}] OK — ${text.length} chars`);
      return text;

    } catch (err) {
      console.warn(`${model} exception:`, err);
      continue;
    }
  }

  throw new Error(`Tous les modèles Gemini ont échoué pour [${label}]`);
}

function parseJsonArray(text: string, label: string): unknown[] {
  let clean = text.trim();
  clean = clean.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
  const start = clean.indexOf('[');
  const end = clean.lastIndexOf(']');
  if (start === -1 || end === -1 || end <= start) {
    console.error(`[${label}] Pas de tableau JSON. Raw:`, clean.slice(0, 300));
    return [];
  }
  try {
    const parsed = JSON.parse(clean.slice(start, end + 1));
    console.log(`✅ [${label}] ${parsed.length} items parsés`);
    return parsed;
  } catch (err) {
    console.error(`[${label}] JSON parse error:`, err);
    return [];
  }
}

// ── Appel 1 : Posts LinkedIn ──────────────────────────────────────────────────

async function generateLinkedIn(trends: Article[]): Promise<LinkedInPost[]> {
  const prompt = `Tu es expert en finance et digital Afrique francophone.
Tu rédiges pour Samuel POODA, étudiant Finance & Comptabilité, fondateur IziCard Burkina Faso.
Ton ton : professionnel, pédagogique, accessible.

Génère ${trends.length} posts LinkedIn — un par sujet.

Chaque post doit avoir :
- Hook accrocheur 🔥 (1-2 lignes)
- Contexte (2-3 lignes)
- 4 points clés avec ▪
- Analyse personnelle 💡
- Question pour les commentaires 👇
- 6-8 hashtags

RÈGLE : Réponds UNIQUEMENT avec un tableau JSON. Commence par [ et termine par ].
Aucun texte avant ou après. Aucun backtick.
Sauts de ligne : \\n

Format :
[{"linkedin_post":"🔥 Hook\\n\\nContexte\\n\\n▪ Point 1\\n▪ Point 2\\n▪ Point 3\\n▪ Point 4\\n\\n💡 Analyse\\n\\n👇 Question\\n\\n#tag1 #tag2","hashtags":["#Finance","#Afrique"]}]

Sujets :
${trends.map((t, i) => `${i + 1}. [${t.category}] ${t.title}\nContexte: ${t.description}`).join('\n\n')}`;

  const text = await callGemini(prompt, 'LinkedIn');
  return parseJsonArray(text, 'LinkedIn') as LinkedInPost[];
}

// ── Appel 2 : Articles Blog ───────────────────────────────────────────────────

async function generateBlog(trends: Article[]): Promise<BlogPost[]> {
  const prompt = `Tu es expert en finance et digital Afrique francophone.
Tu rédiges pour Samuel POODA, étudiant Finance & Comptabilité, fondateur IziCard Burkina Faso.

Génère ${trends.length} articles de blog — un par sujet.

Chaque article doit avoir :
- Titre SEO accrocheur
- Introduction développée (150 mots)
- 3 sections avec titre et contenu (200 mots chacune)
- Conclusion avec call to action (100 mots)

RÈGLE : Réponds UNIQUEMENT avec un tableau JSON. Commence par [ et termine par ].
Aucun texte avant ou après. Aucun backtick.

Format :
[{"blog_title":"Titre SEO","blog_intro":"Introduction...","blog_sections":[{"title":"Section 1","content":"Contenu..."},{"title":"Section 2","content":"Contenu..."},{"title":"Section 3","content":"Contenu..."}],"blog_conclusion":"Conclusion..."}]

Sujets :
${trends.map((t, i) => `${i + 1}. [${t.category}] ${t.title}\nContexte: ${t.description}`).join('\n\n')}`;

  const text = await callGemini(prompt, 'Blog');
  return parseJsonArray(text, 'Blog') as BlogPost[];
}

// ── Scraping ──────────────────────────────────────────────────────────────────

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
      let added = 0;

      for (const item of items.slice(0, 20)) {
        const title = cleanHtml(extractText(item, 'title'));
        const description = cleanHtml(extractText(item, 'description'));
        const link = cleanHtml(extractText(item, 'link') || extractText(item, 'guid'));
        const pubDate = extractText(item, 'pubDate');

        if (!title || title.length < 10) continue;
        if (!isTitleRelevant(title)) continue;
        if (pubDate && new Date(pubDate) < weekAgo) continue;

        results.push({
          title,
          description: description.slice(0, 250),
          link,
          source: source.name,
          category: getCategory(title, description, source.category),
          origin: 'rss',
        });
        added++;
        if (added >= 5) break;
      }
      console.log(`RSS ${source.name}: ${added} articles`);
    } catch { continue; }
  }
  return results;
}

async function scrapeGNews(): Promise<Article[]> {
  const results: Article[] = [];
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) { console.log('GNews: clé manquante'); return []; }

  for (const query of GNEWS_QUERIES) {
    try {
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query.q)}&lang=fr&max=3&from=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}&apikey=${apiKey}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;
      const data = await res.json();
      for (const article of data.articles || []) {
        if (!article.title || !isTitleRelevant(article.title)) continue;
        results.push({
          title: article.title,
          description: (article.description || '').slice(0, 250),
          link: article.url || '',
          source: article.source?.name || 'GNews',
          category: getCategory(article.title, article.description || '', query.category),
          origin: 'gnews',
        });
      }
    } catch { continue; }
  }
  return results;
}

function mergeAndSelect(rss: Article[], gnews: Article[]): Article[] {
  const all = [...rss, ...gnews];
  const seen = new Set<string>();
  const unique = all.filter(a => {
    const key = a.title.slice(0, 50).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const african = unique.filter(a => ['Agence Ecofin', 'Financial Afrik', 'Jeune Afrique'].includes(a.source));
  const gnewsItems = unique.filter(a => a.origin === 'gnews');
  const other = unique.filter(a => !african.includes(a) && !gnewsItems.includes(a));

  return [...african.slice(0, 7), ...gnewsItems.slice(0, 5), ...other.slice(0, 3)].slice(0, 15);
}

// ── Sauvegarde ────────────────────────────────────────────────────────────────

async function saveToSupabase(
  trends: Article[],
  linkedinPosts: LinkedInPost[],
  blogPosts: BlogPost[]
) {
  const supabase = getSupabase();
  await supabase.from('weekly_trends').delete().eq('week_start', getWeekStart());

  const rows = trends.map((t, i) => {
    const li = linkedinPosts[i];
    const bl = blogPosts[i];
    return {
      week_label: getWeekLabel(),
      week_start: getWeekStart(),
      topic: t.title,
      category: t.category,
      source: t.source,
      source_url: t.link,
      summary: t.description,
      linkedin_post: li?.linkedin_post || '',
      blog_title: bl?.blog_title || t.title,
      blog_intro: bl?.blog_intro || '',
      blog_sections: bl?.blog_sections || [],
      blog_conclusion: bl?.blog_conclusion || '',
      hashtags: li?.hashtags || [],
      is_published: false,
    };
  });

  console.log('Sample linkedin:', rows[0]?.linkedin_post?.slice(0, 80) || 'EMPTY');
  console.log('Sample blog_title:', rows[0]?.blog_title || 'EMPTY');

  const { error } = await supabase.from('weekly_trends').insert(rows);
  if (error) throw new Error(`Supabase: ${error.message}`);
  console.log(`✅ ${rows.length} lignes sauvegardées`);
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const isManualTest = request.nextUrl.searchParams.get('token') === process.env.CRON_SECRET;

  if (!isVercelCron && !isManualTest) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('🔄 Démarrage veille...');

    // Scraping
    const [rssArticles, gnewsArticles] = await Promise.all([scrapeRSS(), scrapeGNews()]);
    console.log(`RSS: ${rssArticles.length} | GNews: ${gnewsArticles.length}`);

    const trends = mergeAndSelect(rssArticles, gnewsArticles);
    console.log(`Sélectionnés: ${trends.length}`);
    trends.forEach((t, i) => console.log(`  ${i + 1}. [${t.source}] ${t.title.slice(0, 60)}`));

    if (trends.length === 0) {
      return NextResponse.json({ success: false, message: 'Aucun article pertinent.' });
    }

    // 2 appels Gemini séparés
    console.log('🤖 Appel Gemini 1/2 — LinkedIn...');
    const linkedinPosts = await generateLinkedIn(trends);

    console.log('🤖 Appel Gemini 2/2 — Blog...');
    const blogPosts = await generateBlog(trends);

    // Sauvegarde
    await saveToSupabase(trends, linkedinPosts, blogPosts);

    // Email
    const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`;
    await sendEmail(
      'poodasamuelpro@gmail.com',
      `📊 ${trends.length} tendances prêtes — ${getWeekLabel()}`,
      `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;">
        <h1 style="font-size:22px;color:#111827;margin:0 0 4px;">📊 Tes tendances sont prêtes</h1>
        <p style="color:#6b7280;font-size:14px;margin:0 0 24px;">${getWeekLabel()}</p>
        <p style="font-size:15px;color:#374151;margin:0 0 20px;">
          <strong>${trends.length} sujets</strong> — ${linkedinPosts.length} posts LinkedIn + ${blogPosts.length} articles blog générés.
        </p>
        <a href="${dashboardUrl}" style="display:inline-block;background:#111827;color:white;padding:13px 26px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
          Voir mes tendances →
        </a>
        <ul style="font-size:13px;color:#6b7280;padding-left:16px;margin-top:24px;line-height:1.8;">
          ${trends.slice(0, 5).map(t => `<li>${t.title.slice(0, 72)}${t.title.length > 72 ? '…' : ''}</li>`).join('')}
          ${trends.length > 5 ? `<li style="color:#9ca3af;">+ ${trends.length - 5} autres…</li>` : ''}
        </ul>
      </div>`
    );

    return NextResponse.json({
      success: true,
      week: getWeekLabel(),
      selected: trends.length,
      linkedinGenerated: linkedinPosts.length,
      blogGenerated: blogPosts.length,
    });

  } catch (error) {
    console.error('❌ Erreur cron:', error);
    return NextResponse.json({ error: 'Failed', details: String(error) }, { status: 500 });
  }
}
