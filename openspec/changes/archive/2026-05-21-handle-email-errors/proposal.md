## Why

Email sending failures (verification, password reset) are currently silent — `void` is used to fire-and-forget async calls, so any errors from Resend are swallowed. This means users never get their verification or reset emails, with no logging or feedback.

## What Changes

- Remove `void` from `sendPasswordResetEmail()` and `sendVerificationEmail()` calls in `lib/auth/auth.ts`
- Log email send failures using `console.error` at minimum
- Ensure Better Auth continues to work gracefully even if email sending fails

## Capabilities

### New Capabilities

(none — this is an implementation improvement, not a new capability)

### Modified Capabilities

(none — no spec-level behavior changes)

## Impact

- `lib/auth/auth.ts` — two email callback callsites changed
- No API changes, no new dependencies, no breaking changes
