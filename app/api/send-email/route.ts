// app/api/send-email/route.ts
//
// Appel direct à l'API Resend via fetch — sans import du SDK
// Le SDK Resend v6 valide la clé dès l'import et plante le build
// si RESEND_API_KEY est absente. fetch() n'a pas ce problème.

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, email, objet, message } = body;

    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: 'Champs requis manquants.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn('RESEND_API_KEY non configurée — email non envoyé');
      return NextResponse.json({ success: true, warning: 'Email non envoyé, clé API manquante.' });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <contact@poodasamuelpro.izicardouaga.com>',
        to: ['poodasamuelpro@gmail.com'],
        subject: objet ? `[Portfolio] ${objet}` : `[Portfolio] Nouveau message de ${nom}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
            <h2 style="color: #111827; margin-bottom: 4px;">Nouveau message depuis ton portfolio</h2>
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 24px;">Reçu via le formulaire de contact</p>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; width: 100px;">Nom</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; font-weight: 600;">${nom}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">
                  <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280;">Objet</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">${objet || '—'}</td>
              </tr>
            </table>

            <div style="margin-top: 24px;">
              <p style="font-size: 13px; color: #6b7280; margin-bottom: 8px;">Message</p>
              <div style="background: #f9fafb; border-radius: 8px; padding: 16px; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
              <a href="mailto:${email}" style="display: inline-block; background: #111827; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">
                Répondre à ${nom}
              </a>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend API error:', err);
      return NextResponse.json(
        { error: "Échec de l'envoi. Réessayez." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erreur envoi email:', error);
    return NextResponse.json(
      { error: "Échec de l'envoi. Réessayez." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Email API — POST uniquement.' });
}
