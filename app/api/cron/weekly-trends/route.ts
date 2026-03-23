// app/api/cron/weekly-trends/route.ts
//
// Version optimisée pour Vercel gratuit (60s max) :
// - Max 5 articles sélectionnés
// - 1 seul appel Gemini avec prompt court
// - Scraping en parallèle

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
  if (!apiKey) return;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Portfolio Bot <contact@poodasamuelpro.izicardouaga.com>',
      to: [to], subject, html,
    }),
  });
  if (!res.ok) console.error('Resend:', await res.text());
  else console.log('✅ Email envoyé');
}

const RSS_SOURCES = [
  { url: 'https://www.agenceecofin.com/feed', name: 'Agence Ecofin', category: 'Finance Afrique' },
  { url: 'https://www.financialafrik.com/feed', name: 'Financial Afrik', category: 'Finance Afrique' },
  { url: 'https://www.jeuneafrique.com/feed/rss/', name: 'Jeune Afrique', category: 'Économie Afrique' },
  { url: 'https://www.rfi.fr/fr/rss-economie', name: 'RFI Économie', category: 'Économie Internationale' },
  { url: 'https://coinacademy.fr/feed/', name: 'Coin Academy', category: 'Crypto & Blockchain' },
];

const GNEWS_QUERIES = [
  { q: 'BRVM bourse Afrique investissement', category: 'Bourse Africaine' },
  { q: 'fintech startup Afrique francophone', category: 'Fintech & Entrepreneuriat' },
  { q: 'intelligence artificielle finance entreprise', category: 'IA & Finance' },
];

const TITLE_KEYWORDS = [
  'finance', 'comptabilité', 'banque', 'investissement', 'économie', 'bourse',
  'BRVM', 'fintech', 'crypto', 'bitcoin', 'blockchain', 'digital', 'numérique',
  'intelligence artificielle', 'automatisation', 'transformation', 'startup',
  'entrepreneuriat', 'fusion', 'acquisition', 'audit', 'fiscalité', 'budget',
  'trésorerie', 'marché', 'capital', 'fonds', 'paiement', 'monnaie', 'dette',
  'croissance', 'PIB', 'inflation', 'sukuk', 'inclusion financière',
  'microfinance', 'stablecoin', 'valorisation', 'marketing', 'leadership',
];

interface Article {
  title: string;
  description: string;
  link: string;
  source: string;
  category: string;
}

interface GeneratedContent {
  linkedin_post: string;
  blog_title: string;
  blog_intro: string;
  blog_sections: Array<{ title: string; content: string }>;
  blog_conclusion: string;
  hashtags: string[];
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
  const p1 = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, 'i');
  const p2 = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const m1 = xml.match(p1);
  if (m1) return m1[1].trim();
  const m2 = xml.match(p2);
  if (m2) return m2[1].trim();
  return '';
}

function cleanHtml(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#\d+;/g, ' ').replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

function isRelevant(title: string): boolean {
  const t = title.toLowerCase();
  return TITLE_KEYWORDS.some(kw => t.includes(kw.toLowerCase()));
}

function getCategory(title: string, desc: string, fallback: string): string {
  const t = (title + ' ' + desc).toLowerCase();
  if (t.includes('brvm') || t.includes('bourse')) return 'Bourse Africaine';
  if (t.includes('crypto') || t.includes('bitcoin') || t.includes('stablecoin')) return 'Crypto & Blockchain';
  if (t.includes('fintech') || t.includes('paiement')) return 'Fintech & Paiement';
  if (t.includes('fusion') || t.includes('acquisition')) return 'M&A';
  if (t.includes('intelligence artificielle') || t.includes('automatisation')) return 'IA & Digital';
  if (t.includes('startup') || t.includes('entrepreneuriat')) return 'Entrepreneuriat';
  if (t.includes('banque') || t.includes('microfinance')) return 'Banque & Finance';
  return fallback;
}

async function scrapeRSS(): Promise<Article[]> {
  const results: Article[] = [];
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  await Promise.all(RSS_SOURCES.map(async (source) => {
    try {
      const res = await fetch(source.url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) return;
      const xml = await res.text();
      const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];

      for (const item of items.slice(0, 10)) {
        const title = cleanHtml(extractText(item, 'title'));
        const description = cleanHtml(extractText(item, 'description'));
        const link = cleanHtml(extractText(item, 'link') || extractText(item, 'guid'));
        const pubDate = extractText(item, 'pubDate');

        if (!title || title.length < 10) continue;
        if (!isRelevant(title)) continue;
        if (pubDate && new Date(pubDate) < weekAgo) continue;

        results.push({
          title,
          description: description.slice(0, 200),
          link,
          source: source.name,
          category: getCategory(title, description, source.category),
        });
        break; // 1 article max par source
      }
    } catch { /* continue */ }
  }));

  return results;
}

async function scrapeGNews(): Promise<Article[]> {
  const results: Article[] = [];
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) return [];

  await Promise.all(GNEWS_QUERIES.map(async (query) => {
    try {
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query.q)}&lang=fr&max=1&from=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}&apikey=${apiKey}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (!res.ok) return;
      const data = await res.json();
      const article = data.articles?.[0];
      if (!article?.title || !isRelevant(article.title)) return;
      results.push({
        title: article.title,
        description: (article.description || '').slice(0, 200),
        link: article.url || '',
        source: article.source?.name || 'GNews',
        category: query.category,
      });
    } catch { /* continue */ }
  }));

  return results;
}

async function generateContent(trends: Article[]): Promise<GeneratedContent[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return [];

  // Prompt court et direct
  const prompt = `Expert finance Afrique. Rédige pour Samuel POODA, étudiant Finance & Comptabilité, fondateur IziCard Burkina.

Pour chaque sujet génère un post LinkedIn et un article blog.
JSON uniquement. Commence par [ termine par ]. Pas de texte autour. Sauts de ligne = \\n

[{"linkedin_post":"🔥 Hook\\n\\nContexte\\n\\n▪ P1\\n▪ P2\\n▪ P3\\n▪ P4\\n\\n💡 Analyse\\n\\n👇 Question\\n\\n#tag","blog_title":"Titre","blog_intro":"150 mots","blog_sections":[{"title":"S1","content":"200 mots"},{"title":"S2","content":"200 mots"},{"title":"S3","content":"200 mots"}],"blog_conclusion":"100 mots","hashtags":["#Finance"]}]

${trends.map((t, i) => `${i + 1}. [${t.category}] ${t.title} — ${t.description.slice(0, 120)}`).join('\n')}`;

  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash-8b'];

  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
          }),
          signal: AbortSignal.timeout(30000),
        }
      );

      const data = await res.json();
      if (!res.ok) { console.warn(`${model} erreur:`, data.error?.message); continue; }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!text.trim()) { console.warn(`${model} vide`); continue; }

      console.log(`✅ ${model} OK — ${text.length} chars`);

      // Parse JSON
      let clean = text.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
      const start = clean.indexOf('[');
      const end = clean.lastIndexOf(']');
      if (start === -1 || end <= start) { console.warn(`${model} pas de JSON array`); continue; }
      clean = clean.slice(start, end + 1);

      const parsed = JSON.parse(clean);
      console.log(`✅ Parsé: ${parsed.length} items`);
      return parsed;

    } catch (err) {
      console.warn(`${model} exception:`, String(err).slice(0, 100));
      continue;
    }
  }

  console.error('Tous les modèles Gemini ont échoué');
  return [];
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const isManualTest = request.nextUrl.searchParams.get('token') === process.env.CRON_SECRET;

  if (!isVercelCron && !isManualTest) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('🔄 Démarrage...');

    const [rss, gnews] = await Promise.all([scrapeRSS(), scrapeGNews()]);
    console.log(`RSS: ${rss.length} | GNews: ${gnews.length}`);

    // Dédoublonnage + max 5
    const seen = new Set<string>();
    const all = [...rss, ...gnews].filter(a => {
      const key = a.title.slice(0, 40).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 6);

    console.log(`Sélectionnés: ${all.length}`);
    all.forEach((t, i) => console.log(`  ${i + 1}. ${t.title.slice(0, 60)}`));

    if (all.length === 0) {
      return NextResponse.json({ success: false, message: 'Aucun article.' });
    }

    const content = await generateContent(all);
    console.log(`Content: ${content.length} items`);

    // Sauvegarde
    const supabase = getSupabase();
    await supabase.from('weekly_trends').delete().eq('week_start', getWeekStart());

    const rows = all.map((t, i) => {
      const c = content[i];
      return {
        week_label: getWeekLabel(),
        week_start: getWeekStart(),
        topic: t.title,
        category: t.category,
        source: t.source,
        source_url: t.link,
        summary: t.description,
        linkedin_post: c?.linkedin_post || '',
        blog_title: c?.blog_title || t.title,
        blog_intro: c?.blog_intro || '',
        blog_sections: c?.blog_sections || [],
        blog_conclusion: c?.blog_conclusion || '',
        hashtags: c?.hashtags || [],
        is_published: false,
      };
    });

    const { error } = await supabase.from('weekly_trends').insert(rows);
    if (error) throw new Error(`Supabase: ${error.message}`);
    console.log(`✅ ${rows.length} sauvegardés`);

    await sendEmail(
      'poodasamuelpro@gmail.com',
      `📊 ${all.length} tendances prêtes — ${getWeekLabel()}`,
      `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;">
        <h1 style="font-size:20px;color:#111827;margin:0 0 8px;">📊 Tes tendances sont prêtes</h1>
        <p style="color:#6b7280;font-size:14px;margin:0 0 20px;">${getWeekLabel()}</p>
        <p style="color:#374151;margin:0 0 20px;"><strong>${all.length} sujets</strong> — ${content.length} contenus générés.</p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" style="display:inline-block;background:#111827;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Voir le dashboard →</a>
        <ul style="font-size:13px;color:#6b7280;margin-top:20px;padding-left:16px;line-height:1.8;">
          ${all.map(t => `<li>${t.title.slice(0, 70)}…</li>`).join('')}
        </ul>
      </div>`
    );

    return NextResponse.json({ success: true, selected: all.length, contentGenerated: content.length });

  } catch (error) {
    console.error('❌', error);
    return NextResponse.json({ error: 'Failed', details: String(error) }, { status: 500 });
  }
}
