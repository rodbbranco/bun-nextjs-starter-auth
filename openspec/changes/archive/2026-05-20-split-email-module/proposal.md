## Why

All email logic lives in a single `lib/auth/email.ts` file, mixing the Resend client initialization, the generic `sendEmail` utility, and each email template. As more email types are added (e.g., welcome emails, change-notification emails), this file will grow without clear separation. Isolating each concern into its own file makes the module easier to navigate, test, and extend.

## What Changes

- Create `lib/email/` directory with separate files:
  - `client.ts` — Resend client initialization
  - `send.ts` — Generic `sendEmail(to, subject, html, text?)` function
  - `verification.ts` — `sendVerificationEmail` template
  - `password-reset.ts` — `sendPasswordResetEmail` template
  - `index.ts` — Public re-exports
- Delete `lib/auth/email.ts` (all functionality moved)
- Update imports in `lib/auth/auth.ts` to point to the new module

## Capabilities

### New Capabilities
- `email-module-structure`: Separate files for email client, send utility, and each email template within `lib/email/`

### Modified Capabilities
- `resend-email`: Internal module restructured into `lib/email/` with separate files; external API unchanged

## Impact

- `lib/auth/email.ts` — deleted (replaced by `lib/email/`)
- `lib/email/client.ts` — new file (Resend client init)
- `lib/email/send.ts` — new file (`sendEmail` utility)
- `lib/email/verification.ts` — new file (`sendVerificationEmail`)
- `lib/email/password-reset.ts` — new file (`sendPasswordResetEmail`)
- `lib/email/index.ts` — new file (re-exports)
- `lib/auth/auth.ts` — update import path from `@/lib/auth/email` to `@/lib/email`
