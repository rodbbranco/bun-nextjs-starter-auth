## Context

`lib/auth/email.ts` currently contains three concerns in one file: the Resend client instance, the generic `sendEmail` utility, and two email templates. Adding more templates (welcome, change-notification, etc.) will continue to bloat this single file. The module should be split so each concern has its own file within `lib/email/`, with a barrel `index.ts` for clean imports.

## Goals / Non-Goals

**Goals:**
- Move all email code from `lib/auth/email.ts` to `lib/email/` with separate files per concern
- The public API (what `auth.ts` imports) remains the same
- No behavioral changes — identical email sending logic

**Non-Goals:**
- No new email types or templates
- No changes to the `sendEmail` function signature
- No changes to BetterAuth hooks or auth config beyond import paths

## Decisions

1. **Directory structure**: `lib/email/client.ts` (Resend init), `lib/email/send.ts` (`sendEmail`), `lib/email/verification.ts` (`sendVerificationEmail`), `lib/email/password-reset.ts` (`sendPasswordResetEmail`), `lib/email/index.ts` (re-exports)
2. **Barrel export pattern**: `index.ts` re-exports `sendEmail`, `sendVerificationEmail`, and `sendPasswordResetEmail` so `auth.ts` does a single import from `@/lib/email`
3. **Client module singleton**: The Resend client stays as a module-level singleton in `client.ts` — imported by `send.ts` — no change in behavior

## Risks / Trade-offs

- [Risk: Incorrect import path causes build failure] → Mitigation: trivial to fix, typecheck will catch it immediately
- [Trade-off: More files, more imports] → Acceptable; clear separation of concerns is worth the slight increase in file count
