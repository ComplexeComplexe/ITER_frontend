import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Force dynamic rendering to avoid build-time initialization
export const dynamic = "force-dynamic";

// Resend is initialized lazily to avoid build-time errors
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(key);
  }
  return _resend;
}

const RECIPIENT_EMAIL = "guillaume@frenchtechbarcelona.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source, data } = body;

    if (!source || !data) {
      return NextResponse.json(
        { error: "Missing required fields: source, data" },
        { status: 400 }
      );
    }

    // Build email content based on source
    let subject = "";
    let htmlContent = "";

    if (source === "profil") {
      // Lead from /profil diagnostic page
      subject = `🔥 Nouveau Lead Diagnostic — ${data.firstName || ""} ${data.lastName || ""} (${data.company || "N/A"})`;
      htmlContent = buildProfilEmail(data);
    } else if (source === "campagne") {
      // Lead from /campagne CTA (contact request)
      subject = `📩 Demande de contact Campagne — ${data.firstName || ""} ${data.lastName || ""} (${data.company || "N/A"})`;
      htmlContent = buildCampagneEmail(data);
    } else {
      subject = `📋 Nouveau Lead Iter Advisors — ${data.email || "N/A"}`;
      htmlContent = buildGenericEmail(data);
    }

    // Send email via Resend
    const { error } = await getResend().emails.send({
      from: "Iter Advisors Leads <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Lead sent successfully" });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function buildProfilEmail(data: Record<string, string>): string {
  const fields = [
    { label: "Prénom", value: data.firstName },
    { label: "Nom", value: data.lastName },
    { label: "Entreprise", value: data.company },
    { label: "Email", value: data.email },
    { label: "Téléphone", value: data.phone },
    { label: "Stade de développement", value: data.stage },
    { label: "Enjeu financier", value: data.challenge },
    { label: "Taille de l'équipe", value: data.teamSize },
    { label: "Urgence", value: data.urgency },
  ];

  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
      <div style="background: #3400F0; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #CCFF00; margin: 0; font-size: 22px;">🔥 Nouveau Lead — Diagnostic Financier</h1>
        <p style="color: #ffffff; margin: 8px 0 0; font-size: 14px;">Page source : /profil</p>
      </div>
      <div style="background: #ffffff; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          ${fields
            .filter((f) => f.value)
            .map(
              (f) => `
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 12px 8px; font-weight: 600; color: #374151; width: 40%; font-size: 14px;">${f.label}</td>
              <td style="padding: 12px 8px; color: #111827; font-size: 14px;">${f.value}</td>
            </tr>
          `
            )
            .join("")}
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f0f4ff; border-radius: 8px;">
          <p style="margin: 0; font-size: 13px; color: #6b7280;">
            Lead reçu le ${new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildCampagneEmail(data: Record<string, string>): string {
  const fields = [
    { label: "Prénom", value: data.firstName },
    { label: "Nom", value: data.lastName },
    { label: "Entreprise", value: data.company },
    { label: "Email", value: data.email },
    { label: "Téléphone", value: data.phone },
    { label: "Message", value: data.message },
  ];

  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
      <div style="background: #3400F0; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #CCFF00; margin: 0; font-size: 22px;">📩 Demande de Contact — Campagne</h1>
        <p style="color: #ffffff; margin: 8px 0 0; font-size: 14px;">Page source : /campagne</p>
      </div>
      <div style="background: #ffffff; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          ${fields
            .filter((f) => f.value)
            .map(
              (f) => `
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 12px 8px; font-weight: 600; color: #374151; width: 40%; font-size: 14px;">${f.label}</td>
              <td style="padding: 12px 8px; color: #111827; font-size: 14px;">${f.value}</td>
            </tr>
          `
            )
            .join("")}
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f0f4ff; border-radius: 8px;">
          <p style="margin: 0; font-size: 13px; color: #6b7280;">
            Lead reçu le ${new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildGenericEmail(data: Record<string, string>): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
      <div style="background: #3400F0; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #CCFF00; margin: 0; font-size: 22px;">📋 Nouveau Lead — Iter Advisors</h1>
      </div>
      <div style="background: #ffffff; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <pre style="white-space: pre-wrap; font-size: 14px; color: #374151;">${JSON.stringify(data, null, 2)}</pre>
        <div style="margin-top: 20px; padding: 16px; background: #f0f4ff; border-radius: 8px;">
          <p style="margin: 0; font-size: 13px; color: #6b7280;">
            Lead reçu le ${new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>
    </div>
  `;
}
