// app/api/dashboard/trends/route.ts
//
// API qui retourne les tendances stockées dans Supabase
// Utilisée par la page /dashboard pour afficher le contenu

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/dashboard/trends?week=2026-03-22
export async function GET(request: NextRequest) {
  const week = request.nextUrl.searchParams.get('week');

  try {
    let query = supabase
      .from('weekly_trends')
      .select('*')
      .order('created_at', { ascending: true });

    if (week) {
      query = query.eq('week_start', week);
    } else {
      // Par défaut : dernière semaine disponible
      query = query.order('week_start', { ascending: false }).limit(15);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Récupérer les semaines disponibles pour le sélecteur
    const { data: weeks } = await supabase
      .from('weekly_trends')
      .select('week_start, week_label')
      .order('week_start', { ascending: false });

    const uniqueWeeks = weeks
      ? [...new Map(weeks.map(w => [w.week_start, w])).values()]
      : [];

    return NextResponse.json({
      success: true,
      trends: data || [],
      availableWeeks: uniqueWeeks,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trends', details: String(error) },
      { status: 500 }
    );
  }
}

// PATCH /api/dashboard/trends — Marquer comme publié
export async function PATCH(request: NextRequest) {
  try {
    const { id, is_published } = await request.json();

    const { error } = await supabase
      .from('weekly_trends')
      .update({
        is_published,
        published_at: is_published ? new Date().toISOString() : null,
      })
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update trend' },
      { status: 500 }
    );
  }
}
