import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

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

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not set');
    _resend = new Resend(key);
  }
  return _resend;
}

const TO = 'contact@iteradvisors.com';
const FROM = 'Iter Advisors <contact@mail.iteradvisors.com>';

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

    // Build email
    const subject = `Nouvelle demande d'audit - ${data.firstName} ${data.lastName} (${data.company})`;
    const html = buildHtmlEmail(data);
    const text = buildPlainTextEmail(data);

    // Send email using Resend
    const { data: result, error } = await getResend().emails.send({
      from: FROM,
      to: [TO],
      subject,
      html,
      text,
      replyTo: data.email,
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi. Veuillez réessayer.' },
        { status: 500 }
      );
    }

    console.log('Email sent:', result?.id);
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

// Build HTML email
function buildHtmlEmail(data: FormData): string {
  const date = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="fr">
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
      <h1>Nouvelle demande - DAF Externalisé</h1>
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
          ${data.utm_campaign ? `Campaign: ${escapeHtml(data.utm_campaign)}` : 'N/A'}
        </div>
      </div>

      ${data.gclid ? `
      <div class="field">
        <span class="label">Google Click ID:</span>
        <div class="value">${escapeHtml(data.gclid)}</div>
      </div>
      ` : ''}

      <div class="footer">
        <p>Date: ${date}</p>
        <p>Landing URL: ${escapeHtml(data.landing_url || '')}</p>
        <p>Referrer: ${escapeHtml(data.referrer || 'direct')}</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Build plain text email
function buildPlainTextEmail(data: FormData): string {
  const date = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const lines = [
    `Nouvelle demande - DAF Externalisé`,
    `Landing page: /lp/daf-externalise`,
    '',
    `Prénom: ${data.firstName}`,
    `Nom: ${data.lastName}`,
    `Email: ${data.email}`,
    `Société: ${data.company}`,
    `Taille de l'équipe: ${data.teamSize}`,
    `Enjeu prioritaire: ${data.mainNeed}`,
  ];

  if (data.phone) lines.push(`Téléphone: ${data.phone}`);
  if (data.message) lines.push(`Message: ${data.message}`);

  lines.push('');
  lines.push(
    `Source UTM: ${[data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(' | ') || 'N/A'}`
  );

  if (data.gclid) lines.push(`Google Click ID: ${data.gclid}`);

  lines.push('');
  lines.push(`Date: ${date}`);
  lines.push(`Landing URL: ${data.landing_url || ''}`);
  lines.push(`Referrer: ${data.referrer || 'direct'}`);

  return lines.join('\n');
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
