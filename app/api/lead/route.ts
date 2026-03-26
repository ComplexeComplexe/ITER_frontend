import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SignJWT } from "jose";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(key);
  }
  return _resend;
}

const TO = process.env.LEAD_RECIPIENT_EMAIL || "contact@iteradvisors.com";
const FROM = "Iter Advisors <leads@crm.iteradvisors.com>";
const CRM_BASE_URL =
  process.env.CRM_BASE_URL || "https://crm.iteradvisors.com";

function getSigningSecret(): Uint8Array {
  const raw = process.env.LEAD_SIGNING_SECRET;
  if (!raw) throw new Error("LEAD_SIGNING_SECRET is not set");
  return new TextEncoder().encode(raw);
}

/* ────────────────────── field mapping front → CRM ────────────────────── */

const FIELD_MAP: Record<string, string> = {
  firstName: "first_name",
  lastName: "last_name",
  email: "email",
  phone: "phone",
  company: "company",
  message: "message",
  stage: "development_stage",
  challenge: "financial_challenge",
  teamSize: "team_size",
  urgency: "urgency",
};

function toCrmPayload(
  source: string,
  data: Record<string, string>,
): Record<string, string> {
  const payload: Record<string, string> = { source };
  for (const [frontKey, value] of Object.entries(data)) {
    if (!value) continue;
    const crmKey = FIELD_MAP[frontKey] ?? frontKey;
    payload[crmKey] = value;
  }
  payload.submitted_at = new Date().toISOString();
  return payload;
}

/* ────────────────────── JWT signing ────────────────────── */

async function buildAcceptUrl(
  source: string,
  data: Record<string, string>,
): Promise<string> {
  const payload = toCrmPayload(source, data);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(randomUUID())
    .setExpirationTime("7d")
    .sign(getSigningSecret());

  return `${CRM_BASE_URL}/api/leads/accept?token=${token}`;
}

/* ────────────────────── HTML email builder ────────────────────── */

const FIELD_LABELS: Record<string, string> = {
  firstName: "Prénom",
  lastName: "Nom",
  company: "Entreprise",
  email: "Email",
  phone: "Téléphone",
  message: "Message",
  stage: "Stade de développement",
  challenge: "Enjeu financier",
  teamSize: "Taille de l'équipe",
  urgency: "Urgence",
};

function buildSubject(
  source: string,
  data: Record<string, string>,
): string {
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
  const company = data.company || "";
  const who = [name, company].filter(Boolean).join(" — ");

  switch (source) {
    case "contact":
      return `Nouveau message contact — ${who || data.email || "N/A"}`;
    case "profil":
      return `Nouveau lead diagnostic — ${who || data.email || "N/A"}`;
    case "campagne":
      return `Demande de contact campagne — ${who || data.email || "N/A"}`;
    default:
      return `Nouveau lead Iter Advisors — ${data.email || "N/A"}`;
  }
}

function buildSourceLabel(source: string): string {
  switch (source) {
    case "contact":
      return "Formulaire de contact";
    case "profil":
      return "Diagnostic financier (profil)";
    case "campagne":
      return "Campagne";
    default:
      return source;
  }
}

function buildHtmlEmail(
  source: string,
  data: Record<string, string>,
  acceptUrl: string,
): string {
  const date = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const rows = Object.entries(data)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr>
          <td style="padding:6px 12px 6px 0;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top;">${FIELD_LABELS[k] || k}</td>
          <td style="padding:6px 0;font-size:14px;color:#111827;">${v}</td>
        </tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    
    <div style="background:#1e1b4b;padding:24px 32px;">
      <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">Nouveau lead</h1>
      <p style="margin:4px 0 0;color:#c4b5fd;font-size:14px;">${buildSourceLabel(source)} · ${date}</p>
    </div>

    <div style="padding:24px 32px;">
      <table style="width:100%;border-collapse:collapse;">
        ${rows}
      </table>
    </div>

    <div style="padding:0 32px 32px;text-align:center;">
      <a href="${acceptUrl}" 
         style="display:inline-block;padding:14px 32px;background:#2563eb;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:8px;">
        ✅ Ajouter au CRM
      </a>
      <p style="margin:12px 0 0;font-size:12px;color:#9ca3af;">
        Ce lien est valable 7 jours. Le lead ne sera ajouté au CRM que si vous cliquez.
      </p>
    </div>

  </div>
</body>
</html>`.trim();
}

function buildPlainText(
  source: string,
  data: Record<string, string>,
  acceptUrl: string,
): string {
  const date = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const lines = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `${FIELD_LABELS[k] || k}: ${v}`);

  return [
    `Source: ${source}`,
    `Date: ${date}`,
    "",
    ...lines,
    "",
    "—",
    "Ajouter ce lead au CRM :",
    acceptUrl,
    "",
    "(Ce lien est valable 7 jours)",
  ].join("\n");
}

/* ────────────────────── POST handler ────────────────────── */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source, data } = body;

    if (!source || !data) {
      return NextResponse.json(
        { error: "Missing required fields: source, data" },
        { status: 400 },
      );
    }

    const acceptUrl = await buildAcceptUrl(source, data);
    const subject = buildSubject(source, data);
    const html = buildHtmlEmail(source, data, acceptUrl);
    const text = buildPlainText(source, data, acceptUrl);
    const replyTo = data?.email ? [data.email] : undefined;

    const { data: result, error } = await getResend().emails.send({
      from: FROM,
      to: [TO],
      subject,
      html,
      text,
      replyTo,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 500 },
      );
    }

    console.log("Email sent:", result?.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
