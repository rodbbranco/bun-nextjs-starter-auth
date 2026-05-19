## Context

The project currently supports Google OAuth only. Adding email/password auth requires: BetterAuth's `emailAndPassword` plugin, an email provider (Resend) for verification and password reset, new UI pages for sign-up, forgot-password, reset-password, and verify-email-notice, and updates to existing rate limiting and route protection. The existing cookie-based session model remains unchanged.

## Goals / Non-Goals

**Goals:**
- Enable email/password registration and sign-in via BetterAuth's built-in plugin
- Email verification required before first sign-in
- Password reset flow with 1-hour token expiry
- Resend as the email provider for transactional emails
- Stricter rate limiting for credential-specific endpoints
- Email verification guard in route protection middleware
- Clear error when email matches existing Google account

**Non-Goals:**
- Username login (email only)
- "Remember me" toggle
- Passkeys / WebAuthn
- Social-to-credentials password set flow
- Account linking (explicitly blocked; can be added later)

## Decisions

1. **BetterAuth `emailAndPassword` plugin** — keep existing BetterAuth setup, add the plugin. No additional auth library needed. Plugin handles sign-up, sign-in, verification, and reset natively.
2. **Resend for transactional emails** — consistent with the project's modern serverless stack. BetterAuth integrates with Resend via its `sendEmail` hook. Templates will be plain transactional (verify button + fallback link).
3. **Scrypt password hashing (default)** — BetterAuth uses scrypt by default. No override needed.
4. **Email verification required before sign-in** — BetterAuth's `emailVerificationRequired: true` flag. Unverified users get a redirect to `/verify-email-notice` with a resend button.
5. **Rate limiting: extend existing config** — reuse the existing BetterAuth `rateLimit` config with additional `customRules` for credential endpoints.
6. **Route protection: add secondary email check** — proxy.ts already checks session. Adding a secondary check: if session exists but `emailVerified` is false, redirect to `/verify-email-notice`. Exempt `/verify-email-notice`, `/auth/*`, `/login`, `/logout`.
7. **Account linking blocked by default** — BetterAuth's default behavior blocks sign-up when email matches an existing OAuth account. We keep this default and surface a clear error: "An account with this email already exists. Sign in with Google."
8. **No custom API routes** — BetterAuth auto-generates all auth endpoints. No need for `app/api/auth/[...all]/route.ts` (BetterAuth v1 handles this via the framework integration).

## Risks / Trade-offs

- **Risk: Resend API key exposure** → Mitigation: use server-only env vars, never expose to client
- **Risk: Email deliverability** → Mitigation: use Resend's verified domain, monitor bounce rates
- **Risk: Rate limiting DB-backed may be slow under heavy load** → Acceptable for this scale; can migrate to Redis later
- **Risk: Users may forget passwords** → Mitigated by reset flow; risk is acceptable
- **Trade-off: No "Remember me"** → Simplifies session management; 30-day rolling session already long enough for most users
- **Trade-off: No account linking** → Prevents silent account takeover; can be added via BetterAuth config when ready
