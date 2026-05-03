import { NextResponse } from "next/server";

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;
const leadFromEmail = process.env.LEAD_FROM_EMAIL;
const leadToEmail = process.env.ONBOARDING_TO_EMAIL ?? process.env.LEAD_TO_EMAIL;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type OnboardingSubmission = {
  businessName: string;
  contactName: string;
  contactEmail: string;
  payload: Record<string, string | string[]>;
};

const fieldLabels: Record<string, string> = {
  businessName: "Business name",
  shortName: "Preferred short name",
  contactName: "Contact name",
  contactEmail: "Contact email",
  businessPhone: "Business phone",
  domain: "Business website or domain",
  address: "Business address",
  hours: "Business hours",
  serviceArea: "Main service area",
  otherServiceAreas: "Other service areas",
  websiteGoals: "Website goals",
  desiredAction: "Desired visitor action",
  businessSummary: "Business summary",
  yearsInBusiness: "Years in business",
  bestCustomers: "Best customers",
  wantedJobs: "Jobs wanted",
  unwantedJobs: "Jobs not wanted",
  whyChooseYou: "Why customers choose them",
  service1Name: "Service 1 name",
  service1Description: "Service 1 description",
  service2Name: "Service 2 name",
  service2Description: "Service 2 description",
  service3Name: "Service 3 name",
  service3Description: "Service 3 description",
  service4Name: "Service 4 name",
  service4Description: "Service 4 description",
  additionalServices: "Additional services",
  trustSignals: "Trust signals",
  legalText: "Legal text",
  certifications: "Certifications and memberships",
  proofDetails: "Proof details",
  review1: "Review 1",
  review2: "Review 2",
  review3: "Review 3",
  commonQuestions: "Common questions",
  faq1: "FAQ 1",
  faq2: "FAQ 2",
  faq3: "FAQ 3",
  availablePhotos: "Available photos",
  brandColors: "Brand colors",
  colorsToAvoid: "Colors to avoid",
  preferredStyle: "Preferred style",
  likedWebsites: "Websites liked",
  dislikedWebsites: "Websites disliked",
  leadDestination: "Lead destination",
  leadRecipient: "Lead recipient",
  responseTime: "Response time",
  formQuestions: "Contact form questions",
  primaryService: "Primary service",
  primaryCity: "Primary city",
  secondaryCities: "Secondary cities",
  searchTerms: "Search terms",
  competitors: "Competitors",
  googleBusinessProfile: "Google Business Profile",
  launchDomain: "Launch domain",
  domainRegistrar: "Domain registrar",
  domainAccess: "Domain access",
  toolsToConnect: "Tools to connect",
  preferredLaunchDate: "Preferred launch date",
  launchRequirements: "Launch requirements",
  finalNotes: "Final notes",
};

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readList(formData: FormData, key: string) {
  return formData.getAll(key).filter((value): value is string => typeof value === "string" && value.trim().length > 0);
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

function redirectWithError(requestUrl: string, error: string) {
  const url = new URL("/onboarding", requestUrl);
  url.searchParams.set("error", error);
  return NextResponse.redirect(url, 303);
}

function buildPayload(formData: FormData) {
  const payload: Record<string, string | string[]> = {};

  for (const key of Object.keys(fieldLabels)) {
    const values = readList(formData, key);

    if (values.length > 1) {
      payload[key] = values;
      continue;
    }

    const value = readField(formData, key);
    if (value) payload[key] = value;
  }

  return payload;
}

function renderPayloadValue(value: string | string[]) {
  return Array.isArray(value) ? value.join(", ") : value;
}

function buildEmailText(submission: OnboardingSubmission) {
  return [
    "New website onboarding submission",
    "",
    `Business: ${submission.businessName}`,
    `Contact: ${submission.contactName}`,
    `Email: ${submission.contactEmail}`,
    "",
    ...Object.entries(submission.payload).map(([key, value]) => {
      const label = fieldLabels[key] ?? key;
      return `${label}: ${renderPayloadValue(value)}`;
    }),
  ].join("\n");
}

function buildEmailHtml(submission: OnboardingSubmission) {
  return `
    <h1>New website onboarding submission</h1>
    <p><strong>Business:</strong> ${escapeHtml(submission.businessName)}</p>
    <p><strong>Contact:</strong> ${escapeHtml(submission.contactName)} (${escapeHtml(submission.contactEmail)})</p>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;">
      ${Object.entries(submission.payload)
        .map(([key, value]) => {
          const label = fieldLabels[key] ?? key;
          return `
            <tr>
              <td style="border:1px solid #ddd;font-weight:bold;vertical-align:top;">${escapeHtml(label)}</td>
              <td style="border:1px solid #ddd;white-space:pre-wrap;">${escapeHtml(renderPayloadValue(value))}</td>
            </tr>
          `;
        })
        .join("")}
    </table>
  `;
}

async function sendOnboardingEmail(submission: OnboardingSubmission) {
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
      reply_to: submission.contactEmail,
      subject: `Website onboarding: ${submission.businessName}`,
      text: buildEmailText(submission),
      html: buildEmailHtml(submission),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend failed with ${response.status}: ${await response.text()}`);
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const submission: OnboardingSubmission = {
    businessName: readField(formData, "businessName"),
    contactName: readField(formData, "contactName"),
    contactEmail: readField(formData, "contactEmail").toLowerCase(),
    payload: buildPayload(formData),
  };

  if (!submission.businessName || !submission.contactName || !submission.contactEmail) {
    return redirectWithError(request.url, "required");
  }

  if (!emailPattern.test(submission.contactEmail)) {
    return redirectWithError(request.url, "email");
  }

  if (!supabaseUrl || !serviceRoleKey) {
    return redirectWithError(request.url, "configuration");
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/client_onboarding_submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        business_name: submission.businessName,
        contact_name: submission.contactName,
        contact_email: submission.contactEmail,
        payload: submission.payload,
      }),
    });

    if (!response.ok) {
      console.error("Failed to save onboarding submission", {
        status: response.status,
        details: await response.text(),
      });
      return redirectWithError(request.url, "save");
    }

    try {
      await sendOnboardingEmail(submission);
    } catch (error) {
      console.error("Onboarding email notification failed", error);
    }
  } catch (error) {
    console.error("Unexpected onboarding submission error", error);
    return redirectWithError(request.url, "save");
  }

  return NextResponse.redirect(new URL("/onboarding/thanks", request.url), 303);
}
