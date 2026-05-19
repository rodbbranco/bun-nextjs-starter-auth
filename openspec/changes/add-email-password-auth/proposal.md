## Why

The existing authentication system only supports Google OAuth, excluding users who prefer or require email/password authentication. Adding credentials-based auth provides a universal sign-in method, improves user onboarding flexibility, and lays groundwork for future auth features.

## What Changes

- Enable BetterAuth's `emailAndPassword` plugin with email verification required
- Add sign-up page (email + password + name) and update sign-in page with email/password form
- Add email verification flow via Resend with automatic email sending on sign-up
- Add password reset flow (forgot password + reset password pages)
- Add stricter rate limiting rules for credential-specific endpoints
- Add email verification check to route protection proxy
- Add new env vars for Resend API key and from-email
- Block account linking when email matches existing Google account (clear error message)
- Update google-oauth spec to reflect coexistence with credentials auth

## Capabilities

### New Capabilities
- `email-password-auth`: Email/password sign-up, sign-in, and session management with BetterAuth
- `email-verification`: Email verification on sign-up, resend verification, and unverified access blocking
- `password-reset`: Forgot password and reset password flow with token-based email links
- `resend-email`: Resend transactional email client and templates for verification and password reset

### Modified Capabilities
- `rate-limiting`: Add credential-specific rate limit rules (sign-in, sign-up, forgot-password, resend-verification)
- `route-protection`: Add email verification check guard for unverified users
- `google-oauth`: Update to reflect coexistence with credentials, add account linking rules when email already exists

## Impact

- `/lib/auth/auth.ts` — add `emailAndPassword` plugin, new rate limit rules
- `/lib/auth/email.ts` — new file: Resend client + email templates
- `/app/signup/page.tsx` — new page
- `/app/forgot-password/page.tsx` — new page
- `/app/reset-password/page.tsx` — new page
- `/app/verify-email-notice/page.tsx` — new page
- `/app/sign-in/page.tsx` — add email/password form, divider, links
- `proxy.ts` — add email verification check guard
- `.env.local.example` — add `RESEND_API_KEY`, `RESEND_FROM_EMAIL`
- `package.json` — add `resend` dependency
