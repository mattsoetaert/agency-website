import { NextResponse } from "next/server";

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;
const leadFromEmail = process.env.LEAD_FROM_EMAIL;
const leadToEmail = process.env.LEAD_TO_EMAIL;
const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
const crmWebhookSecret = process.env.CRM_WEBHOOK_SECRET;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Lead = {
  name: string;
  business: string | null;
  email: string;
  phone: string | null;
  details: string | null;
  source: string;
};

type SavedLead = Lead & {
  id?: string;
  created_at?: string;
};

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function buildEmailText(lead: SavedLead) {
  return [
    "New website lead",
    "",
    `Name: ${lead.name}`,
    `Business: ${lead.business ?? "Not provided"}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone ?? "Not provided"}`,
    `Details: ${lead.details ?? "Not provided"}`,
    `Source: ${lead.source}`,
    lead.id ? `Lead ID: ${lead.id}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildEmailHtml(lead: SavedLead) {
  const rows = [
    ["Name", lead.name],
    ["Business", lead.business ?? "Not provided"],
    ["Email", lead.email],
    ["Phone", lead.phone ?? "Not provided"],
    ["Details", lead.details ?? "Not provided"],
    ["Source", lead.source],
    ["Lead ID", lead.id ?? "Not available"],
  ];

  return `
    <h1>New website lead</h1>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;">
      ${rows
        .map(
          ([label, value]) => `
            <tr>
              <td style="border:1px solid #ddd;font-weight:bold;">${escapeHtml(label)}</td>
              <td style="border:1px solid #ddd;">${escapeHtml(value)}</td>
            </tr>
          `,
        )
        .join("")}
    </table>
  `;
}

async function sendLeadEmail(lead: SavedLead) {
  if (!resendApiKey || !leadFromEmail || !leadToEmail) {
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: leadFromEmail,
      to: [leadToEmail],
      reply_to: lead.email,
      subject: `New website lead: ${lead.name}`,
      text: buildEmailText(lead),
      html: buildEmailHtml(lead),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend failed with ${response.status}: ${await response.text()}`);
  }
}

async function sendLeadToCrm(lead: SavedLead) {
  if (!crmWebhookUrl) {
    return;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (crmWebhookSecret) {
    headers.Authorization = `Bearer ${crmWebhookSecret}`;
  }

  const response = await fetch(crmWebhookUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      event: "lead.created",
      lead,
    }),
  });

  if (!response.ok) {
    throw new Error(`CRM webhook failed with ${response.status}: ${await response.text()}`);
  }
}

async function notifyLeadDestinations(lead: SavedLead) {
  const results = await Promise.allSettled([sendLeadEmail(lead), sendLeadToCrm(lead)]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Lead notification failed", result.reason);
    }
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const lead: Lead = {
    name: readField(formData, "name"),
    business: readField(formData, "business") || null,
    email: readField(formData, "email").toLowerCase(),
    phone: readField(formData, "phone") || null,
    details: readField(formData, "details") || null,
    source: readField(formData, "source") || "website",
  };

  if (!lead.name || !lead.email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  if (!emailPattern.test(lead.email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to save lead in Supabase", {
        status: response.status,
        details: errorText,
      });

      return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
    }

    const savedLeads = (await response.json()) as Array<{ id?: string; created_at?: string }>;
    await notifyLeadDestinations({
      ...lead,
      id: savedLeads[0]?.id,
      created_at: savedLeads[0]?.created_at,
    });
  } catch (error) {
    console.error("Unexpected lead submission error", error);
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }

  const redirectUrl = new URL("/book", request.url);
  for (const [key, value] of Object.entries(lead)) {
    if (value) {
      redirectUrl.searchParams.set(key, value);
    }
  }

  return NextResponse.redirect(redirectUrl, 303);
}
