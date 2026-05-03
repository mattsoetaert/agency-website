This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Staff-Assisted Subscription Checkout

This app includes a staff-only subscription flow at `/sell`.

Required setup:

- Create a recurring monthly Stripe Price for the website plan.
- Set the Stripe, Supabase, app URL, and `STAFF_CHECKOUT_PASSWORD` values from `.env.example`.
- Run the SQL in `supabase/billing.sql` in your Supabase project.
- Run the SQL in `supabase/onboarding.sql` if you want to collect client website onboarding forms at `/onboarding`.
- Add a Stripe webhook endpoint for `https://your-domain.com/api/stripe/webhook`.
- Subscribe the webhook to `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.updated`, and `customer.subscription.deleted`.

Use `/sell` during a sales call to enter the client details and continue to Stripe Checkout. Card details should only be entered on the Stripe-hosted Checkout page.

After a client signs up, send them `/onboarding` so they can submit the website kickoff details.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
