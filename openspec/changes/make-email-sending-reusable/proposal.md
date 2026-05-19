## Why

The current `lib/auth/email.ts` has duplicated Resend client initialization and email-sending logic across `sendVerificationEmail` and `sendPasswordResetEmail`. Extracting a reusable `sendEmail` function eliminates duplication, makes adding new email types trivial, and provides a single place to configure email defaults, error handling, and logging.

## What Changes

- Extract a generic `sendEmail(to, subject, html, text?)` function that wraps the Resend client
- Refactor `sendVerificationEmail` and `sendPasswordResetEmail` to use the new `sendEmail` function
- Keep the same external API — no breaking changes for callers in `auth.ts`

## Capabilities

### New Capabilities
- `reusable-email-sender`: Generic `sendEmail` function with configurable recipient, subject, HTML body, and optional plain-text fallback

### Modified Capabilities
- `resend-email`: Internal implementation changes to use the new `sendEmail` function; external behavior unchanged

## Impact

- `lib/auth/email.ts` — refactor to extract `sendEmail`, simplify existing functions
- No changes to `lib/auth/auth.ts` or any callers — the exported function signatures remain the same
