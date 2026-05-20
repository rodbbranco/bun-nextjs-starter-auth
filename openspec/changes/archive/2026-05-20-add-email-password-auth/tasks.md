## 1. Setup

- [x] 1.1 Add `resend` dependency to package.json
- [x] 1.2 Add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to `.env.local.example`

## 2. Auth Configuration

- [x] 2.1 Add `emailAndPassword` plugin to `lib/auth/auth.ts` with `emailVerificationRequired: true`, `sendVerificationEmailOnSignUp: true`, and `minPasswordLength: 8` / `maxPasswordLength: 128`
- [x] 2.2 Add `sendEmail` hook to `lib/auth/auth.ts` wired to the Resend email service for verification and password reset emails
- [x] 2.3 Add credential-specific rate limit rules to `lib/auth/auth.ts`: sign-in (5/15min), sign-up (3/hr), forgot-password (3/hr/email), resend-verification (3/hr/email)
- [x] 2.4 Run `bun run db:push` to sync any schema changes (requires DATABASE_URL env var — no schema changes needed for emailAndPassword)

## 3. Email Service

- [x] 3.1 Create `lib/auth/email.ts` with Resend client initialization using `RESEND_API_KEY`
- [x] 3.2 Create email template functions: `sendVerificationEmail(email, token)` and `sendPasswordResetEmail(email, token)` using Resend API with a verify/reset button + fallback plain-text link

## 4. New Pages

- [x] 4.1 Create `app/signup/page.tsx` — client component with name, email, password fields, submit handler calling `authClient.signUp.email()`, and "Already have an account? Sign in" link
- [x] 4.2 Create `app/forgot-password/page.tsx` — client component with email input, submit handler calling `authClient.forgetPassword()`, and success/error states
- [x] 4.3 Create `app/reset-password/page.tsx` — client component with new password + confirm password fields, reads token from URL search params, calls `authClient.resetPassword()`, shows error for expired/invalid token with link back to `/forgot-password`
- [x] 4.4 Create `app/verify-email-notice/page.tsx` — client component with "check your inbox" message and "Resend verification email" button calling `authClient.sendVerificationEmail()`

## 5. Update Existing Pages

- [x] 5.1 Update `app/sign-in/page.tsx` — add email + password input fields below Google button, divider ("or continue with email"), submit handler calling `authClient.signIn.email()`, "Forgot password?" link below password field, "Don't have an account? Sign up" link
- [x] 5.2 Handle unverified email error in sign-in flow — on error `EMAIL_NOT_VERIFIED`, redirect to `/verify-email-notice`

## 6. Route Protection

- [x] 6.1 Update `proxy.ts` to read session via BetterAuth API (not just cookie check) and add email verification guard: if session exists but `emailVerified` is false, redirect to `/verify-email-notice`; exempt `/verify-email-notice`, `/auth/*`, `/login`, `/logout`
- [x] 6.2 Add new routes to the proxy matcher config (signup, forgot-password, etc.)

## 7. Account Linking

- [x] 7.1 Configure BetterAuth to block sign-up when email matches existing Google account — return clear error: "An account with this email already exists. Sign in with Google." (default BetterAuth behavior, verify it surfaces correctly)
