// app/api/cron/weekly-trends/route.ts

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
  if (!apiKey) {
    console.warn('RESEND_API_KEY manquante');
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio Bot <contact@poodasamuelpro.izicardouaga.com>',
      to: [to],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
  }
}

const RSS_SOURCES = [
  { url: 'https://www.agenceecofin.com/feed', name: 'Agence Ecofin', category: 'Finance Afrique' },
  { url: 'https://www.financialafrik.com/feed', name: 'Financial Afrik', category: 'Finance Afrique' },
  { url: 'https://www.jeuneafrique.com/feed/rss/', name: 'Jeune Afrique', category: 'Économie Afrique' },
  { url: 'https://lefaso.net/spip.php?page=backend', name: 'LeFaso.net', category: "Afrique de l'Ouest" },
  { url: 'https://www.burkina24.com/feed/', name: 'Burkina24', category: "Afrique de l'Ouest" },
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
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, ' ').trim();
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
        if (pubDate && new Date(pubDate) < weekAgo) continue;

        results.push({
          title,
          description: description.slice(0, 300),
          link,
          source: source.name,
          category: getCategory(title, description, source.category),
          origin: 'rss',
        });
      }
    } catch { continue; }
  }
  return results;
}

async function scrapeGNews(): Promise<Article[]> {
  const results: Article[] = [];
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) return [];

  for (const query of GNEWS_QUERIES) {
    try {
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query.q)}&lang=fr&max=3&from=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}&apikey=${apiKey}`;
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

  const african = unique.filter(a =>
    ['Agence Ecofin', 'Financial Afrik', 'Jeune Afrique', 'LeFaso.net', 'Burkina24'].includes(a.source)
  );
  const gnewsItems = unique.filter(a => a.origin === 'gnews');
  const other = unique.filter(a => !african.includes(a) && !gnewsItems.includes(a));

  return [...african.slice(0, 8), ...gnewsItems.slice(0, 4), ...other.slice(0, 3)].slice(0, 15);
}

async function generateContent(trends: Article[]): Promise<GeneratedContent[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY manquante');
    return [];
  }

  // Prompt simplifié pour forcer un JSON propre
  const prompt = `Tu es expert en finance et digital Afrique francophone.
Tu rédiges pour Samuel POODA, étudiant Finance & Comptabilité, fondateur IziCard Burkina Faso.

Pour chacun des ${trends.length} sujets, génère un post LinkedIn et un article blog.

RÈGLES STRICTES :
- Réponds UNIQUEMENT avec un tableau JSON valide
- Commence directement par [ et termine par ]
- Aucun texte avant ou après
- Aucun backtick, aucun markdown
- Les sauts de ligne dans les textes : utilise \\n
- Les guillemets dans les textes : utilise \\'

FORMAT EXACT à respecter :
[{"linkedin_post":"hook\\n\\ncontexte\\n\\npoints clés:\\n▪ point1\\n▪ point2\\n\\n💡 analyse\\n\\n👇 question\\n\\n#tag1 #tag2","blog_title":"titre","blog_intro":"intro 150 mots","blog_sections":[{"title":"titre1","content":"contenu 200 mots"},{"title":"titre2","content":"contenu 200 mots"},{"title":"titre3","content":"contenu 200 mots"}],"blog_conclusion":"conclusion 100 mots","hashtags":["#Finance","#Afrique"]}]

Sujets (${trends.length}) :
${trends.map((t, i) => `${i + 1}. [${t.category}] ${t.title} — ${t.description.slice(0, 150)}`).join('\n')}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
            responseMimeType: 'application/json', // Force JSON response
          },
        }),
      }
    );

    const data = await res.json();
    console.log('Gemini status:', res.status);

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('Gemini raw (first 500):', text.slice(0, 500));

    if (!text) {
      console.error('Gemini returned empty text');
      return [];
    }

    // Nettoyage robuste
    let clean = text.trim();
    // Retirer backticks
    clean = clean.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');
    // Trouver le tableau JSON
    const start = clean.indexOf('[');
    const end = clean.lastIndexOf(']');
    if (start === -1 || end === -1) {
      console.error('No JSON array found in Gemini response');
      return [];
    }
    clean = clean.slice(start, end + 1);

    const parsed = JSON.parse(clean);
    console.log(`✅ Gemini parsed: ${parsed.length} items`);
    return parsed;

  } catch (err) {
    console.error('Gemini error:', err);
    return [];
  }
}

async function saveToSupabase(trends: Article[], content: GeneratedContent[]) {
  const supabase = getSupabase();
  const weekLabel = getWeekLabel();
  const weekStart = getWeekStart();

  const rows = trends.map((t, i) => {
    const c = content[i];
    return {
      week_label: weekLabel,
      week_start: weekStart,
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

  console.log('Saving rows, sample linkedin_post:', rows[0]?.linkedin_post?.slice(0, 100));

  const { error } = await supabase.from('weekly_trends').insert(rows);
  if (error) throw new Error(`Supabase: ${error.message}`);
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const isManualTest = request.nextUrl.searchParams.get('token') === process.env.CRON_SECRET;

  if (!isVercelCron && !isManualTest) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('🔄 Démarrage veille hebdomadaire...');

    const [rssArticles, gnewsArticles] = await Promise.all([scrapeRSS(), scrapeGNews()]);
    console.log(`RSS: ${rssArticles.length} | GNews: ${gnewsArticles.length}`);

    const trends = mergeAndSelect(rssArticles, gnewsArticles);
    console.log(`Selected: ${trends.length}`);

    if (trends.length === 0) {
      return NextResponse.json({ success: false, message: 'Aucun article pertinent.' });
    }

    const content = await generateContent(trends);
    console.log(`Content generated: ${content.length}`);

    // Vider les anciens enregistrements de cette semaine avant d'insérer
    const supabase = getSupabase();
    await supabase
      .from('weekly_trends')
      .delete()
      .eq('week_start', getWeekStart());

    await saveToSupabase(trends, content);
    console.log('✅ Saved to Supabase');

    // Email
    const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`;
    const categories = [...new Set(trends.map(t => t.category))].slice(0, 6);

    await sendEmail(
      'poodasamuelpro@gmail.com',
      `📊 ${trends.length} tendances prêtes — ${getWeekLabel()}`,
      `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;">
          <h1 style="font-size:22px;color:#111827;margin:0 0 4px;">📊 Tes tendances sont prêtes</h1>
          <p style="color:#6b7280;font-size:14px;margin:0 0 24px;">${getWeekLabel()}</p>
          <p style="font-size:15px;color:#374151;margin:0 0 16px;">
            <strong>${trends.length} sujets</strong> — ${categories.join(', ')}
          </p>
          <a href="${dashboardUrl}" style="display:inline-block;background:#111827;color:white;padding:13px 26px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
            Voir mes tendances →
          </a>
          <ul style="font-size:13px;color:#6b7280;padding-left:16px;margin-top:24px;line-height:1.8;">
            ${trends.slice(0, 5).map(t => `<li>${t.title.slice(0, 72)}${t.title.length > 72 ? '…' : ''}</li>`).join('')}
            ${trends.length > 5 ? `<li style="color:#9ca3af;">+ ${trends.length - 5} autres…</li>` : ''}
          </ul>
        </div>
      `
    );
    console.log('✅ Email envoyé');

    return NextResponse.json({
      success: true,
      week: getWeekLabel(),
      selected: trends.length,
      contentGenerated: content.length,
    });

  } catch (error) {
    console.error('❌ Erreur cron:', error);
    return NextResponse.json({ error: 'Failed', details: String(error) }, { status: 500 });
  }
}
