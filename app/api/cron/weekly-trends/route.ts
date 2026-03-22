// app/api/cron/weekly-trends/route.ts
//
// Ce fichier est le cœur du système.
// Il est déclenché automatiquement chaque dimanche à 20h (UTC)
// par Vercel Cron Jobs — aucune intervention manuelle nécessaire.
//
// Flux :
// 1. Vérifie le token de sécurité (évite les appels non autorisés)
// 2. Récupère 15 actualités tendances via NewsAPI
// 3. Envoie les titres à Gemini pour rédiger posts LinkedIn + articles blog
// 4. Sauvegarde tout dans Supabase
// 5. Envoie un email d'alerte via Resend

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// ── Clients ──────────────────────────────────────────────────────────────────

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // clé service (pas la clé publique)
);

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Thématiques surveillées ───────────────────────────────────────────────────

const TOPICS = [
  'comptabilité finance entreprise',
  'fusions acquisitions M&A',
  'transformation digitale entreprise',
  'analyse financière bilan',
  'automatisation intelligence artificielle entreprise',
  'finance digitale fintech',
  'banque Afrique BRVM',
  'bourse Afrique de l ouest économie',
  'marketing digital stratégie',
  'crypto blockchain finance',
  'développement personnel compétences',
  'entrepreneuriat startup Afrique',
  'fiscalité audit comptable',
  'microfinance inclusion financière Afrique',
  'capital risque investissement startup',
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getWeekLabel(): string {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString('fr-FR', { month: 'long' });
  const year = now.getFullYear();
  return `Semaine du ${day} ${month} ${year}`;
}

function getWeekStart(): string {
  const now = new Date();
  now.setDate(now.getDate() - now.getDay());
  return now.toISOString().split('T')[0];
}

// ── Étape 1 : Récupérer les tendances via NewsAPI ─────────────────────────────

async function fetchTrends(): Promise<Array<{
  topic: string;
  category: string;
  title: string;
  summary: string;
  source: string;
  url: string;
}>> {
  const results = [];
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const from = oneWeekAgo.toISOString().split('T')[0];

  for (const topic of TOPICS) {
    try {
      const url = `https://newsapi.org/v2/everything?` +
        `q=${encodeURIComponent(topic)}&` +
        `from=${from}&` +
        `sortBy=relevancy&` +
        `language=fr&` +
        `pageSize=1&` +
        `apiKey=${process.env.NEWSAPI_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.articles && data.articles.length > 0) {
        const article = data.articles[0];
        results.push({
          topic,
          category: getCategoryFromTopic(topic),
          title: article.title || topic,
          summary: article.description || article.content || '',
          source: article.source?.name || 'NewsAPI',
          url: article.url || '',
        });
      } else {
        // Pas d'article trouvé → on garde quand même le sujet
        results.push({
          topic,
          category: getCategoryFromTopic(topic),
          title: topic,
          summary: `Tendance de la semaine : ${topic}`,
          source: 'Tendance',
          url: '',
        });
      }
    } catch {
      // En cas d'erreur sur un sujet, on continue avec les autres
      continue;
    }
  }

  return results.slice(0, 15);
}

function getCategoryFromTopic(topic: string): string {
  if (topic.includes('comptabilité') || topic.includes('fiscal') || topic.includes('audit')) return 'Comptabilité & Finance';
  if (topic.includes('fusions') || topic.includes('M&A')) return 'M&A';
  if (topic.includes('transformation') || topic.includes('automatisation')) return 'Transformation Digitale';
  if (topic.includes('intelligence artificielle')) return 'Intelligence Artificielle';
  if (topic.includes('fintech') || topic.includes('finance digitale')) return 'Finance Digitale';
  if (topic.includes('BRVM') || topic.includes('banque')) return 'Banque & Bourse Africaine';
  if (topic.includes('bourse') || topic.includes('économie')) return 'Économie & Marchés';
  if (topic.includes('marketing')) return 'Marketing Digital';
  if (topic.includes('crypto')) return 'Crypto & Blockchain';
  if (topic.includes('développement personnel')) return 'Développement Personnel';
  if (topic.includes('entrepreneuriat')) return 'Entrepreneuriat';
  if (topic.includes('microfinance') || topic.includes('inclusion')) return 'Inclusion Financière';
  if (topic.includes('capital risque')) return 'Capital Risque';
  return 'Finance & Business';
}

// ── Étape 2 : Générer le contenu avec Gemini ─────────────────────────────────

async function generateContent(trends: Array<{
  topic: string;
  category: string;
  title: string;
  summary: string;
}>): Promise<Array<{
  linkedin_post: string;
  blog_title: string;
  blog_intro: string;
  blog_sections: Array<{ title: string; content: string }>;
  blog_conclusion: string;
  hashtags: string[];
}>> {

  const prompt = `Tu es un expert en finance, comptabilité, transformation digitale et entrepreneuriat en Afrique.
Tu rédiges du contenu pour Samuel POODA, étudiant en Finance & Comptabilité, fondateur d'IziCard (solution NFC), basé à Casablanca.

Voici 15 sujets tendance de la semaine. Pour CHACUN, génère :

1. UN POST LINKEDIN avec :
   - Un hook accrocheur (1-2 lignes qui arrêtent le scroll)
   - Contexte en 2-3 lignes simples
   - 4 points clés avec ▪️
   - 1-2 lignes de prise de position personnelle
   - Une question engageante pour les commentaires
   - 6-8 hashtags pertinents

2. UN ARTICLE BLOG avec :
   - Titre accrocheur SEO
   - Introduction développée (150 mots)
   - 3 sections avec titre et contenu développé (200 mots chacune)
   - Conclusion avec call to action (100 mots)

Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks.
Format exact :
[
  {
    "linkedin_post": "...",
    "blog_title": "...",
    "blog_intro": "...",
    "blog_sections": [
      {"title": "...", "content": "..."},
      {"title": "...", "content": "..."},
      {"title": "...", "content": "..."}
    ],
    "blog_conclusion": "...",
    "hashtags": ["#Finance", "#Afrique", "..."]
  }
]

Les 15 sujets :
${trends.map((t, i) => `${i + 1}. [${t.category}] ${t.title}\nContexte: ${t.summary}`).join('\n\n')}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
        },
      }),
    }
  );

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';

  // Nettoyage au cas où Gemini ajoute des backticks malgré la consigne
  const clean = text.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(clean);
  } catch {
    // Si le JSON est malformé, on retourne un tableau vide
    console.error('Gemini JSON parse error:', clean.slice(0, 200));
    return [];
  }
}

// ── Étape 3 : Sauvegarder dans Supabase ──────────────────────────────────────

async function saveToSupabase(
  trends: Array<{
    topic: string;
    category: string;
    title: string;
    summary: string;
    source: string;
    url: string;
  }>,
  content: Array<{
    linkedin_post: string;
    blog_title: string;
    blog_intro: string;
    blog_sections: Array<{ title: string; content: string }>;
    blog_conclusion: string;
    hashtags: string[];
  }>
) {
  const weekLabel = getWeekLabel();
  const weekStart = getWeekStart();

  const rows = trends.map((trend, i) => ({
    week_label: weekLabel,
    week_start: weekStart,
    topic: trend.topic,
    category: trend.category,
    source: trend.source,
    source_url: trend.url,
    summary: trend.summary,
    linkedin_post: content[i]?.linkedin_post || '',
    blog_title: content[i]?.blog_title || trend.title,
    blog_intro: content[i]?.blog_intro || '',
    blog_sections: content[i]?.blog_sections || [],
    blog_conclusion: content[i]?.blog_conclusion || '',
    hashtags: content[i]?.hashtags || [],
    is_published: false,
  }));

  const { error } = await supabase
    .from('weekly_trends')
    .insert(rows);

  if (error) throw new Error(`Supabase insert error: ${error.message}`);
}

// ── Étape 4 : Envoyer l'email d'alerte ───────────────────────────────────────

async function sendAlertEmail(trendsCount: number) {
  const weekLabel = getWeekLabel();
  const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`;

  await resend.emails.send({
    from: 'Portfolio Bot <onboarding@resend.dev>',
    to: 'poodasamuelpro@gmail.com',
    subject: `📊 ${trendsCount} tendances prêtes — ${weekLabel}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px;">
        
        <h1 style="font-size: 22px; color: #111827; margin: 0 0 8px;">
          📊 Tes tendances sont prêtes
        </h1>
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 24px;">${weekLabel}</p>

        <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 15px; color: #374151;">
            <strong>${trendsCount} sujets</strong> ont été analysés et rédigés cette semaine sur tes thématiques :
            Finance, Comptabilité, M&A, IA, BRVM, Marketing Digital, Crypto, Entrepreneuriat Afrique et plus.
          </p>
        </div>

        <p style="font-size: 14px; color: #6b7280; margin-bottom: 20px;">
          Pour chaque sujet tu trouveras :
        </p>
        <ul style="font-size: 14px; color: #374151; padding-left: 20px; margin-bottom: 28px; line-height: 2;">
          <li>📱 Post LinkedIn rédigé avec hook, points clés et hashtags</li>
          <li>✍️ Article blog développé avec intro, sections et conclusion</li>
          <li>🏷️ Hashtags optimisés</li>
        </ul>

        <a href="${dashboardUrl}" 
           style="display: inline-block; background: #111827; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
          Voir mes tendances →
        </a>

        <p style="margin-top: 32px; font-size: 12px; color: #9ca3af;">
          Généré automatiquement chaque dimanche soir — Portfolio Samuel POODA
        </p>
      </div>
    `,
  });
}

// ── Handler principal ─────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  // Sécurité : Vercel envoie automatiquement ce header pour les cron jobs
  // On vérifie aussi un token custom pour les tests manuels
  const authHeader = request.headers.get('authorization');
  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const isManualTest = request.nextUrl.searchParams.get('token') === process.env.CRON_SECRET;

  if (!isVercelCron && !isManualTest) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('🔄 Démarrage génération tendances hebdomadaires...');

    // Étape 1 : Récupérer les tendances
    console.log('📰 Récupération des tendances NewsAPI...');
    const trends = await fetchTrends();
    console.log(`✅ ${trends.length} tendances récupérées`);

    // Étape 2 : Générer le contenu avec Gemini
    console.log('🤖 Génération du contenu avec Gemini...');
    const content = await generateContent(trends);
    console.log(`✅ ${content.length} contenus générés`);

    // Étape 3 : Sauvegarder dans Supabase
    console.log('💾 Sauvegarde dans Supabase...');
    await saveToSupabase(trends, content);
    console.log('✅ Données sauvegardées');

    // Étape 4 : Envoyer l'email
    console.log('📧 Envoi de l\'email d\'alerte...');
    await sendAlertEmail(trends.length);
    console.log('✅ Email envoyé');

    return NextResponse.json({
      success: true,
      week: getWeekLabel(),
      trendsGenerated: trends.length,
      contentGenerated: content.length,
    });

  } catch (error) {
    console.error('❌ Erreur cron weekly-trends:', error);
    return NextResponse.json(
      { error: 'Cron job failed', details: String(error) },
      { status: 500 }
    );
  }
}
