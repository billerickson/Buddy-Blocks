# Buddy Blocks Hosted SaaS Plan

## Summary

Buddy Blocks Hosted should be a single multi-tenant application where parents sign up, pay, onboard their family, and start using the app without manual setup by the product owner.

Use one hosted app at `app.buddyblocks.io` or `buddyblocks.io`. Do not require family subdomains in v1. Optional subdomains can be added later as tenant aliases, but all hosted families should still use the same Worker, static assets, D1 schema, Stripe integration, and deploy pipeline.

## Product Scope

- Public marketing/signup entry point with a clear annual subscription offer.
- Stripe-hosted Checkout for subscription signup.
- Automated tenant creation after verified payment.
- Parent account creation during signup, with no manual approval or database edits.
- Child profile onboarding immediately after the parent creates their password or completes account activation.
- Parent billing self-service through Stripe Customer Portal.
- Hosted app login at one domain, with tenant resolved from the parent session.
- No separate Cloudflare install, D1 database, Worker, or subdomain per family in v1.

## Architecture

- Add a `tenants` table for each paying family or organization.
- Add `tenant_id` to every family-owned table: `parents`, `sessions`, `child_profiles`, progress tables, attempt tables, practice-set tables, and any future reports or settings.
- Keep canonical curriculum tables global: `tracks`, `units`, `lessons`, and `questions` should be stored once and shared by all tenants.
- Keep tenant isolation in server-side queries. Never accept `tenant_id` from the browser as authority; derive it from the verified session.
- Add tenant-scoped unique indexes, for example parent email per tenant, child slug per tenant, and Stripe customer ID globally unique.
- Keep the existing self-hosted first-run flow as a separate mode; the hosted app should disable public setup routes and use the Stripe signup flow instead.

## Signup And Onboarding Flow

1. Parent visits the hosted signup page and enters email, name, and optional family name.
2. Server creates a pending signup record with a random `signup_token`, normalized email, selected plan, and expiration.
3. Server creates or reuses a Stripe Customer and starts a Stripe Checkout Session in subscription mode.
4. Parent completes payment in Stripe Checkout.
5. Stripe sends a verified webhook to the app.
6. Webhook fulfillment creates or activates:
   - `tenant`
   - primary `parent`
   - `billing_subscription`
   - a one-time account activation token if the parent has not set a password yet
7. Parent returns to `/welcome` and either sets their password or lands in the app if already authenticated.
8. Parent creates child profiles: display name, grade level, and avatar.
9. For each child, the app initializes visible track progress and first available lessons.
10. Parent reaches `/profiles/` and kids can start lessons.

This flow must be fully automated. The product owner should not need to create accounts, configure subdomains, seed per-family data, or run manual scripts for normal signups.

## Stripe Integration

- Use Stripe Checkout Sessions for the first hosted release because Stripe hosts the payment page and supports subscription signup with less custom PCI surface area.
- Use Stripe Customer Portal so parents can update payment methods, view invoices, and cancel or renew without custom billing UI.
- Store Stripe IDs in D1:
  - `stripe_customer_id`
  - `stripe_subscription_id`
  - `stripe_price_id`
  - current subscription status
  - current period start/end
  - cancellation flags
- Required Worker secrets and vars:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `STRIPE_PRICE_YEARLY`
  - `APP_URL`
- Add hosted billing routes:
  - `POST /api/billing/checkout` creates a Stripe Checkout Session.
  - `POST /api/billing/portal` creates a Stripe Customer Portal Session for authenticated parents.
  - `POST /api/stripe/webhook` verifies Stripe signatures and processes billing events.
- Webhook handling must be idempotent. Store processed Stripe event IDs and ignore duplicates.
- Treat webhooks as the source of truth for subscription status. Success redirects can improve UX, but they must not grant access unless the corresponding Stripe state is verified.
- Handle at minimum:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - invoice payment succeeded/failed events if access should respond to renewal failures
- Verify webhook signatures using the raw request body. Do not parse JSON before verification.

Stripe references:

- [Checkout Sessions](https://docs.stripe.com/api/checkout/sessions)
- [Create a Checkout Session](https://docs.stripe.com/api/checkout/sessions/create)
- [Subscriptions with Checkout](https://docs.stripe.com/billing/quickstart)
- [Subscription webhooks](https://docs.stripe.com/billing/subscriptions/webhooks)
- [Customer Portal](https://docs.stripe.com/customer-management)
- [Create a Portal Session](https://docs.stripe.com/api/customer_portal/sessions/create)
- [Webhook endpoints and signature verification](https://docs.stripe.com/webhooks)

## Access Lifecycle

- `trialing` and `active` subscriptions get full access.
- `past_due` should keep access for a short grace period, then lock parent/kid access behind a billing update screen.
- `canceled`, `unpaid`, or expired subscriptions should block new lesson access but preserve all family data.
- Parents should always be able to sign in to billing/account pages to update payment or export data.
- Child profiles and progress should never be deleted automatically because of failed billing.

## Parent And Child Management

- A hosted tenant can have one primary parent in v1.
- Additional parent accounts, invitations, co-parent roles, school/co-op accounts, and family sharing are out of scope for the first hosted release.
- Parent onboarding must support create/edit/archive child profiles.
- Child slugs should be stable after creation because offline storage and kid URLs depend on them.
- Grade changes should update future track visibility without deleting existing attempts or progress.

## Data Model Additions

- `tenants`: family/workspace identity, name, slug, status, created/updated timestamps.
- `billing_customers`: tenant-to-Stripe customer mapping.
- `billing_subscriptions`: Stripe subscription status, plan, price, period dates, cancellation state.
- `signup_intents`: pending signup state before webhook fulfillment.
- `processed_stripe_events`: idempotency table for webhook event IDs.
- Add `tenant_id` to current family-owned tables and backfill self-hosted data into a default tenant when migrating an existing instance.

## Operational Requirements

- Add admin-only internal tooling for tenant lookup, billing status, resend activation link, and export/debug summaries.
- Add automatic emails for activation, password reset, failed payment, and cancellation confirmation. Pick a transactional email provider before implementation.
- Add database backup/export guidance before launch.
- Add observability for signup failures, webhook failures, failed payment transitions, and tenant-scoping errors.
- Add rate limits or abuse controls around signup, login, password reset, and child creation.

## Cost And Performance Notes

- A single multi-tenant install keeps canonical curriculum storage global, which is cheaper and easier to maintain than copying all tracks, lessons, and questions into one D1 database per customer.
- Full curriculum buildout mainly increases global curriculum storage and seed size. Tenant growth mainly increases progress, attempts, activity, practice sets, and session rows.
- Optimize kid home, parent dashboard, and track APIs for tenant-scoped indexed reads before launch. Avoid per-track query loops as the curriculum grows.
- Use Cloudflare metrics and D1 row-read/row-write metrics to watch cost drivers. Static asset requests and bandwidth should not be the primary cost concern.

## Implementation Phases

1. Tenant foundation: add tenant schema, tenant-scoped auth/session helpers, and migration path from single-family data.
2. Hosted billing: add Stripe Checkout, Stripe webhook verification, billing tables, and Customer Portal route.
3. Automated onboarding: connect successful payment to tenant/parent activation and child creation.
4. Access control: enforce subscription status and tenant isolation across every page and API.
5. Admin/support: add internal tenant lookup, billing diagnostics, resend activation, and export tooling.
6. Launch hardening: rate limits, email flows, webhook retry visibility, backups, and end-to-end signup tests.

## Test Plan

- Signup creates pending intent and Stripe Checkout Session.
- Verified `checkout.session.completed` creates tenant, parent, billing rows, and activation token exactly once.
- Duplicate webhook delivery is ignored after the first successful fulfillment.
- Parent activation sets password and signs in to the correct tenant.
- Child creation initializes correct grade and foundation-track progress.
- Tenant A cannot read or mutate Tenant B parent, child, progress, practice-set, session, or billing data.
- Subscription status changes correctly grant, grace, block, and restore app access.
- Customer Portal route is available only to authenticated parents in their own tenant.
- Failed or unverified Stripe webhooks do not mutate billing or account state.

## Open Decisions

- Final public domain: `buddyblocks.io` versus `app.buddyblocks.io`.
- Annual-only pricing versus monthly plus annual.
- Grace-period length for failed renewals.
- Transactional email provider.
- Whether optional family subdomains become a later paid feature or remain unsupported.
