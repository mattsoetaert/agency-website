import { NextResponse } from "next/server";

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/WOspc4idLpdprHwXOvb2/webhook-trigger/487510b7-808f-4355-9d84-fbeb415af518";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const ownsBusiness = String(body.ownsBusiness ?? "").trim();
  const monthlyRevenue = String(body.monthlyRevenue ?? "").trim();

  if (!fullName || !email || !phone || !ownsBusiness || !monthlyRevenue) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const payload = {
    formType: "video_funnel",
    source: "start_page_vsl",
    fullName,
    email,
    phone,
    ownsBusiness,
    monthlyRevenue,
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("GHL webhook failed", response.status, await response.text());
      // Still return success to the user so they can proceed to /book
      // Lead is logged for manual follow-up
    }
  } catch (error) {
    console.error("GHL webhook error", error);
  }

  return NextResponse.json({ ok: true });
}
