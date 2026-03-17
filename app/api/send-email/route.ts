import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, message, type = 'contact' } = body;

    // Validation
    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, message' },
        { status: 400 }
      );
    }

    // TODO: Intégrer avec un service d'emailing
    // Options:
    // 1. Resend (recommandé pour Vercel)
    // 2. SendGrid
    // 3. Mailgun
    // 4. Nodemailer avec SMTP

    // Exemple avec Resend (vous devrez installer et configurer):
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'contact@poodasamuel.com',
      to: to,
      subject: subject,
      html: message,
    });
    */

    // Templates d'emails selon le type
    const emailTemplates = {
      contact: {
        subject: 'Merci de votre message',
        content: `
          <h2>Bonjour,</h2>
          <p>Merci de m'avoir contacté. J'ai bien reçu votre message et je vous répondrai dans les plus brefs délais.</p>
          <p>Cordialement,<br>Samuel POODA</p>
        `
      },
      lead: {
        subject: 'Bienvenue dans notre communauté',
        content: `
          <h2>Bienvenue !</h2>
          <p>Merci de votre intérêt pour mes services en Finance Digitale et Transformation Digitale.</p>
          <p>Je vous contacterai prochainement pour discuter de vos besoins.</p>
          <p>Cordialement,<br>Samuel POODA</p>
        `
      },
      blog: {
        subject: 'Nouvel article sur le blog',
        content: message // Le contenu est personnalisé
      }
    };

    // Pour l'instant, on simule l'envoi
    console.log('Email would be sent:', {
      to,
      subject,
      message,
      type,
      template: emailTemplates[type as keyof typeof emailTemplates]
    });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Email API',
    endpoints: {
      POST: '/api/send-email - Send an email'
    },
    requiredFields: ['to', 'subject', 'message'],
    optionalFields: ['type (contact|lead|blog)']
  });
}
