"use client";

// app/dashboard/page.tsx 
//
// Page privée accessible uniquement via le lien dans l'email
// Protégée par un mot de passe simple côté client
// Affiche les 15 tendances de la semaine avec contenu rédigé

import { useState, useEffect, useCallback } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface BlogSection {
  title: string;
  content: string;
}

interface Trend {
  id: string;
  week_label: string;
  week_start: string;
  topic: string;
  category: string;
  source: string;
  source_url: string;
  summary: string;
  linkedin_post: string;
  blog_title: string;
  blog_intro: string;
  blog_sections: BlogSection[];
  blog_conclusion: string;
  hashtags: string[];
  is_published: boolean;
  published_at: string | null;
}

interface WeekOption {
  week_start: string;
  week_label: string;
}

// ── Mot de passe simple ───────────────────────────────────────────────────────
// Change cette valeur selon ta préférence
// C'est une protection légère, pas du vrai auth
const DASHBOARD_PASSWORD = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || 'pooda2026';

// ── Composant principal ───────────────────────────────────────────────────────

export default function DashboardPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState(false);

  const [trends, setTrends] = useState<Trend[]>([]);
  const [weeks, setWeeks] = useState<WeekOption[]>([]);
  const [selectedWeek, setSelectedWeek] = useState('');
  const [loading, setLoading] = useState(false);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Record<string, 'linkedin' | 'blog'>>({});
  const [copied, setCopied] = useState<string | null>(null);

  // ── Auth ──────────────────────────────────────────────────────────────────

  const handleLogin = () => {
    if (password === DASHBOARD_PASSWORD) {
      setIsAuth(true);
      localStorage.setItem('dashboard_auth', 'true');
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('dashboard_auth') === 'true') {
      setIsAuth(true);
    }
  }, []);

  // ── Fetch tendances ───────────────────────────────────────────────────────

  const fetchTrends = useCallback(async (week?: string) => {
    setLoading(true);
    try {
      const url = week
        ? `/api/dashboard/trends?week=${week}`
        : `/api/dashboard/trends`;
      const res = await fetch(url);
      const data = await res.json();
      setTrends(data.trends || []);
      setWeeks(data.availableWeeks || []);
      if (!selectedWeek && data.availableWeeks?.length > 0) {
        setSelectedWeek(data.availableWeeks[0].week_start);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [selectedWeek]);

  useEffect(() => {
    if (isAuth) fetchTrends();
  }, [isAuth, fetchTrends]);

  // ── Actions ───────────────────────────────────────────────────────────────

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const togglePublished = async (trend: Trend) => {
    await fetch('/api/dashboard/trends', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: trend.id, is_published: !trend.is_published }),
    });
    fetchTrends(selectedWeek);
  };

  const getTab = (id: string) => activeTab[id] || 'linkedin';
  const setTab = (id: string, tab: 'linkedin' | 'blog') => {
    setActiveTab(prev => ({ ...prev, [id]: tab }));
  };

  // ── Écran de connexion ────────────────────────────────────────────────────

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#f9f9f8] flex items-center justify-center px-4">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-sm text-gray-500 mb-6">Accès privé — Samuel POODA</p>

          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="••••••••"
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition mb-4 ${
              pwError
                ? 'border-red-400 focus:ring-red-100'
                : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'
            }`}
          />
          {pwError && (
            <p className="text-xs text-red-600 mb-3">Mot de passe incorrect.</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors"
          >
            Accéder au dashboard
          </button>
        </div>
      </div>
    );
  }

  // ── Dashboard principal ───────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f9f9f8]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">📊 Tendances hebdomadaires</h1>
            <p className="text-xs text-gray-400">
              {trends.length} sujets · {trends.filter(t => t.is_published).length} publiés
            </p>
          </div>

          {/* Sélecteur de semaine */}
          {weeks.length > 1 && (
            <select
              value={selectedWeek}
              onChange={e => {
                setSelectedWeek(e.target.value);
                fetchTrends(e.target.value);
              }}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
            >
              {weeks.map(w => (
                <option key={w.week_start} value={w.week_start}>
                  {w.week_label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-gray-400">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Chargement des tendances…
            </div>
          </div>
        ) : trends.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">📭</p>
            <p className="font-medium">Aucune tendance cette semaine.</p>
            <p className="text-sm mt-1">Le système génère le contenu chaque dimanche soir.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trends.map((trend, index) => (
              <div
                key={trend.id}
                className={`bg-white border rounded-2xl shadow-sm transition-all duration-200 ${
                  trend.is_published ? 'border-green-200' : 'border-gray-100'
                }`}
              >
                {/* En-tête de la carte */}
                <div
                  className="flex items-center justify-between p-5 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === trend.id ? null : trend.id)}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                          {trend.category}
                        </span>
                        {trend.is_published && (
                          <span className="text-[11px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            ✓ Publié
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {trend.blog_title || trend.topic}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{trend.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <button
                      onClick={e => { e.stopPropagation(); togglePublished(trend); }}
                      className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                        trend.is_published
                          ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700'
                      }`}
                    >
                      {trend.is_published ? '✓ Publié' : 'Marquer publié'}
                    </button>
                    <span className="text-gray-400 text-lg">
                      {expandedId === trend.id ? '↑' : '↓'}
                    </span>
                  </div>
                </div>

                {/* Contenu déplié */}
                {expandedId === trend.id && (
                  <div className="border-t border-gray-100 p-5">

                    {/* Tabs */}
                    <div className="flex gap-2 mb-5">
                      <button
                        onClick={() => setTab(trend.id, 'linkedin')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          getTab(trend.id) === 'linkedin'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        📱 Post LinkedIn
                      </button>
                      <button
                        onClick={() => setTab(trend.id, 'blog')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          getTab(trend.id) === 'blog'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        ✍️ Article Blog
                      </button>
                    </div>

                    {/* Tab LinkedIn */}
                    {getTab(trend.id) === 'linkedin' && (
                      <div>
                        <div className="bg-gray-50 rounded-xl p-4 mb-3">
                          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
                            {trend.linkedin_post}
                          </pre>
                        </div>

                        {/* Hashtags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {trend.hashtags?.map(tag => (
                            <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => handleCopy(
                            trend.linkedin_post + '\n\n' + (trend.hashtags?.join(' ') || ''),
                            `linkedin-${trend.id}`
                          )}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                        >
                          {copied === `linkedin-${trend.id}` ? '✓ Copié !' : 'Copier le post'}
                        </button>
                      </div>
                    )}

                    {/* Tab Blog */}
                    {getTab(trend.id) === 'blog' && (
                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-3">
                          {trend.blog_title}
                        </h3>

                        <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                          <p className="leading-relaxed">{trend.blog_intro}</p>

                          {trend.blog_sections?.map((section, i) => (
                            <div key={i}>
                              <h4 className="font-bold text-gray-900 mt-4 mb-2">{section.title}</h4>
                              <p className="leading-relaxed">{section.content}</p>
                            </div>
                          ))}

                          <div className="border-t border-gray-100 pt-4">
                            <p className="leading-relaxed text-gray-600 italic">{trend.blog_conclusion}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            const full = [
                              trend.blog_title,
                              '',
                              trend.blog_intro,
                              '',
                              ...(trend.blog_sections?.flatMap(s => [
                                `## ${s.title}`,
                                s.content,
                                '',
                              ]) || []),
                              trend.blog_conclusion,
                            ].join('\n');
                            handleCopy(full, `blog-${trend.id}`);
                          }}
                          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                        >
                          {copied === `blog-${trend.id}` ? '✓ Copié !' : 'Copier l\'article'}
                        </button>
                      </div>
                    )}

                    {/* Source */}
                    {trend.source_url && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <a
                          href={trend.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          Source : {trend.source} →
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}
