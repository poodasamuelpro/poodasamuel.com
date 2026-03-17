import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, interest } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // TODO: Intégrer avec votre CRM ou base de données
    // Exemple: Enregistrer dans une base de données, envoyer à un CRM, etc.
    
    // Pour l'instant, on simule l'enregistrement
    const leadData = {
      id: Date.now(),
      name,
      email,
      company: company || 'N/A',
      interest: interest || 'General',
      createdAt: new Date().toISOString(),
      source: 'website',
      status: 'new'
    };

    console.log('New lead captured:', leadData);

    // TODO: Déclencher l'automatisation email
    // Appeler l'API d'envoi d'email pour envoyer un email de bienvenue
    
    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      leadId: leadData.id
    });

  } catch (error) {
    console.error('Error capturing lead:', error);
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Lead Generation API',
    endpoints: {
      POST: '/api/lead - Capture a new lead'
    }
  });
}
