import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Website Onboarding Form - Cornerstone Marketing",
  description: "Submit your website onboarding details so Cornerstone Marketing can start your project.",
};

type OnboardingPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

const inputClass =
  "w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black";
const labelClass = "block text-xs font-semibold text-neutral-500 mb-2";
const sectionClass = "bg-white border border-black/10 p-6 sm:p-8";

function errorMessage(error?: string) {
  if (error === "required") return "Business name, your name, and email are required.";
  if (error === "email") return "Enter a valid email address.";
  if (error === "configuration") return "The onboarding form is not configured yet. Please contact us directly.";
  if (error === "save") return "We could not save the form. Please try again or contact us directly.";
  return null;
}

function TextField({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} className={inputClass} />
    </label>
  );
}

function TextArea({
  label,
  name,
  rows = 4,
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea name={name} rows={rows} required={required} placeholder={placeholder} className={`${inputClass} resize-y`} />
    </label>
  );
}

function CheckboxGroup({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => (
        <label key={option} className="flex items-start gap-3 text-sm font-medium text-neutral-700">
          <input name={name} value={option} type="checkbox" className="mt-1 h-4 w-4 accent-black" />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={sectionClass}>
      <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-3">{eyebrow}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">{title}</h2>
      {children}
    </section>
  );
}

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const params = await searchParams;
  const error = errorMessage(params?.error);

  return (
    <main className="min-h-screen bg-[#f5f4f0]">
      <header className="border-b border-black/10 bg-[#f5f4f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <BrandLogo href="/" imageClassName="h-10 w-auto max-w-[180px]" />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl mb-10">
          <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-4">Website Kickoff</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-black leading-tight mb-5">Website onboarding form.</h1>
          <p className="text-neutral-500 text-base sm:text-lg leading-relaxed">
            Fill this out after signup so we can write your website, structure your service pages, set up your contact flow, and launch with accurate business details.
          </p>
        </div>

        {error && <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <form action="/api/onboarding" method="post" className="space-y-6">
          <Section eyebrow="1" title="Business information">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Business name" name="businessName" required />
              <TextField label="Preferred short name" name="shortName" />
              <TextField label="Your name" name="contactName" required />
              <TextField label="Your email" name="contactEmail" type="email" required />
              <TextField label="Business phone" name="businessPhone" />
              <TextField label="Business website or domain" name="domain" />
              <div className="sm:col-span-2">
                <TextField label="Business address" name="address" />
              </div>
              <TextField label="Business hours" name="hours" />
              <TextField label="Main service area" name="serviceArea" />
              <div className="sm:col-span-2">
                <TextArea label="Other cities or areas served" name="otherServiceAreas" rows={3} />
              </div>
            </div>
          </Section>

          <Section eyebrow="2" title="Main website goal">
            <CheckboxGroup
              name="websiteGoals"
              options={[
                "Get more phone calls",
                "Get quote requests",
                "Book appointments",
                "Look more professional",
                "Rank better on Google",
                "Explain services clearly",
              ]}
            />
            <div className="mt-5">
              <TextArea label="Anything specific you want customers to do after visiting the site?" name="desiredAction" rows={3} />
            </div>
          </Section>

          <Section eyebrow="3" title="About the business">
            <div className="grid gap-4">
              <TextArea label="In one or two sentences, what does your business do?" name="businessSummary" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="How long have you been in business?" name="yearsInBusiness" />
                <TextField label="Who are your best customers?" name="bestCustomers" />
              </div>
              <TextArea label="What types of jobs do you want more of?" name="wantedJobs" />
              <TextArea label="What types of jobs do you not want?" name="unwantedJobs" />
              <TextArea label="Why do customers choose you instead of another company?" name="whyChooseYou" />
            </div>
          </Section>

          <Section eyebrow="4" title="Services">
            <div className="grid gap-4">
              {[1, 2, 3, 4].map((number) => (
                <div key={number} className="grid gap-4 border-t border-black/10 pt-5 first:border-t-0 first:pt-0">
                  <TextField label={`Service ${number} name`} name={`service${number}Name`} />
                  <TextArea label={`Service ${number} description and important details`} name={`service${number}Description`} rows={3} />
                </div>
              ))}
              <TextArea label="Additional services" name="additionalServices" />
            </div>
          </Section>

          <Section eyebrow="5" title="Trust and proof">
            <CheckboxGroup
              name="trustSignals"
              options={[
                "Licensed",
                "Insured",
                "Bonded",
                "Family owned",
                "Locally owned",
                "Emergency service",
                "Free estimates",
                "Financing available",
                "Warranty or guarantee",
              ]}
            />
            <div className="grid gap-4 mt-5">
              <TextArea label="License numbers or required legal text" name="legalText" rows={3} />
              <TextArea label="Certifications, awards, memberships, brands, or tools" name="certifications" rows={3} />
              <TextArea label="Guarantees, promises, jobs completed, or years of experience" name="proofDetails" rows={3} />
            </div>
          </Section>

          <Section eyebrow="6" title="Reviews and testimonials">
            <div className="grid gap-4">
              <TextArea label="Review 1" name="review1" />
              <TextArea label="Review 2" name="review2" />
              <TextArea label="Review 3" name="review3" />
            </div>
          </Section>

          <Section eyebrow="7" title="Frequently asked questions">
            <div className="grid gap-4">
              <TextArea label="What questions do customers ask before hiring you?" name="commonQuestions" />
              <TextArea label="Question and answer 1" name="faq1" rows={3} />
              <TextArea label="Question and answer 2" name="faq2" rows={3} />
              <TextArea label="Question and answer 3" name="faq3" rows={3} />
            </div>
          </Section>

          <Section eyebrow="8" title="Photos and branding">
            <CheckboxGroup
              name="availablePhotos"
              options={[
                "Logo",
                "Team photos",
                "Owner photo",
                "Storefront or office",
                "Work trucks",
                "Before and after photos",
                "Jobsite photos",
                "No photos yet",
              ]}
            />
            <div className="grid gap-4 mt-5 sm:grid-cols-2">
              <TextField label="Brand colors" name="brandColors" />
              <TextField label="Colors to avoid" name="colorsToAvoid" />
              <div className="sm:col-span-2">
                <TextArea label="Preferred website style" name="preferredStyle" />
              </div>
              <div className="sm:col-span-2">
                <TextArea label="Websites you like" name="likedWebsites" />
              </div>
              <div className="sm:col-span-2">
                <TextArea label="Websites you dislike" name="dislikedWebsites" />
              </div>
            </div>
          </Section>

          <Section eyebrow="9" title="Contact form and lead handling">
            <div className="grid gap-4">
              <TextArea label="Where should form submissions go?" name="leadDestination" />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Who should receive new leads?" name="leadRecipient" />
                <TextField label="How quickly do you respond?" name="responseTime" />
              </div>
              <TextArea label="What questions should the website contact form ask?" name="formQuestions" />
            </div>
          </Section>

          <Section eyebrow="10" title="Search and local SEO">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Primary service" name="primaryService" />
              <TextField label="Primary city" name="primaryCity" />
              <div className="sm:col-span-2">
                <TextArea label="Secondary cities" name="secondaryCities" />
              </div>
              <div className="sm:col-span-2">
                <TextArea label="What would someone type into Google to find you?" name="searchTerms" />
              </div>
              <div className="sm:col-span-2">
                <TextArea label="Top competitors" name="competitors" />
              </div>
              <div className="sm:col-span-2">
                <TextField label="Google Business Profile link" name="googleBusinessProfile" />
              </div>
            </div>
          </Section>

          <Section eyebrow="11" title="Domain, accounts, and launch">
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Domain name" name="launchDomain" />
                <TextField label="Where was it purchased?" name="domainRegistrar" />
              </div>
              <TextArea label="Do you have login access? Any domain email accounts?" name="domainAccess" />
              <TextArea label="Analytics, booking, chat, CRM, or tracking tools to connect?" name="toolsToConnect" />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Preferred launch date" name="preferredLaunchDate" />
                <TextField label="Must-have before launch" name="launchRequirements" />
              </div>
            </div>
          </Section>

          <Section eyebrow="12" title="Final notes">
            <TextArea label="Anything else we should know?" name="finalNotes" rows={5} />
          </Section>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-black hover:bg-neutral-800 text-white font-semibold text-sm transition-colors"
          >
            Submit Website Onboarding Form
          </button>
        </form>
      </div>
    </main>
  );
}
