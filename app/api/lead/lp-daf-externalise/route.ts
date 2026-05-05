import { NextRequest, NextResponse } from 'next/server';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  teamSize: string;
  mainNeed: string;
  message?: string;
  rgpd: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  landing_url?: string;
  referrer?: string;
}

// Anti-spam honeypot field (not present in real submissions)
const HONEYPOT_FIELD = 'company_website';

// Email validation
function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Main API handler
export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();

    // Validate required fields
    if (!data.firstName?.trim()) {
      return NextResponse.json({ error: 'Prénom requis' }, { status: 400 });
    }
    if (!data.lastName?.trim()) {
      return NextResponse.json({ error: 'Nom requis' }, { status: 400 });
    }
    if (!data.email?.trim() || !validateEmail(data.email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }
    if (!data.company?.trim()) {
      return NextResponse.json({ error: 'Société requise' }, { status: 400 });
    }
    if (!data.teamSize) {
      return NextResponse.json({ error: 'Taille équipe requise' }, { status: 400 });
    }
    if (!data.mainNeed) {
      return NextResponse.json({ error: 'Enjeu requis' }, { status: 400 });
    }
    if (!data.rgpd) {
      return NextResponse.json({ error: 'Acceptation RGPD requise' }, { status: 400 });
    }

    // Anti-spam: Check if submission was too fast (< 3 seconds indicates bot)
    // Note: In production, you'd track submission time in frontend and send it here
    // For now, we'll rely on server-side validation

    // Send email (you'll need to set up email service)
    // This is a placeholder - integrate with your email service
    const emailSent = await sendLeadNotification(data);

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi. Veuillez réessayer.' },
        { status: 500 }
      );
    }

    // Return success
    return NextResponse.json(
      {
        success: true,
        message: 'Demande reçue. Nous vous recontacterons dans les 24h.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer plus tard.' },
      { status: 500 }
    );
  }
}

// Send email notification
async function sendLeadNotification(data: FormData): Promise<boolean> {
  try {
    // Email content
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #6366f1; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #6366f1; }
    .value { color: #666; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nouvelle demande d'audit Cash Runway</h1>
      <p>Landing page: /lp/daf-externalise</p>
    </div>

    <div class="content">
      <div class="field">
        <span class="label">Prénom:</span>
        <div class="value">${escapeHtml(data.firstName)}</div>
      </div>

      <div class="field">
        <span class="label">Nom:</span>
        <div class="value">${escapeHtml(data.lastName)}</div>
      </div>

      <div class="field">
        <span class="label">Email:</span>
        <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      </div>

      <div class="field">
        <span class="label">Société:</span>
        <div class="value">${escapeHtml(data.company)}</div>
      </div>

      <div class="field">
        <span class="label">Taille de l'équipe:</span>
        <div class="value">${escapeHtml(data.teamSize)}</div>
      </div>

      <div class="field">
        <span class="label">Enjeu prioritaire:</span>
        <div class="value">${escapeHtml(data.mainNeed)}</div>
      </div>

      ${data.phone ? `
      <div class="field">
        <span class="label">Téléphone:</span>
        <div class="value">${escapeHtml(data.phone)}</div>
      </div>
      ` : ''}

      ${data.message ? `
      <div class="field">
        <span class="label">Message:</span>
        <div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
      </div>
      ` : ''}

      <div class="field">
        <span class="label">Source UTM:</span>
        <div class="value">
          ${data.utm_source ? `Source: ${escapeHtml(data.utm_source)} | ` : ''}
          ${data.utm_medium ? `Medium: ${escapeHtml(data.utm_medium)} | ` : ''}
          ${data.utm_campaign ? `Campaign: ${escapeHtml(data.utm_campaign)}` : ''}
        </div>
      </div>

      ${data.gclid ? `
      <div class="field">
        <span class="label">Google Click ID:</span>
        <div class="value">${escapeHtml(data.gclid)}</div>
      </div>
      ` : ''}

      <div class="footer">
        <p>Landing URL: ${escapeHtml(data.landing_url || '')}</p>
        <p>Referrer: ${escapeHtml(data.referrer || 'direct')}</p>
        <p>Date: ${new Date().toLocaleString('fr-FR')}</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Use Resend or your email service here
    // This is a placeholder implementation
    // In production, integrate with Resend, SendGrid, AWS SES, etc.

    const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;

    if (!apiKey) {
      console.warn('No email service configured. Logging lead data instead.');
      console.log('Form submission:', data);
      return true; // Fallback: log and return success
    }

    // Example with Resend (popular email service)
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'leads@iteradvisors.com',
          to: 'contact@iteradvisors.com',
          subject: `Nouvelle demande d'audit - ${data.firstName} ${data.lastName} (${data.company})`,
          html: emailContent,
          reply_to: data.email,
        }),
      });

      return response.ok;
    }

    // Fallback: log submission
    console.log('Form submission received:', data);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

// HTML escape utility
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
