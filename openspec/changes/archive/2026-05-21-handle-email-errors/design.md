## Context

Better Auth calls `sendPasswordResetEmail` and `sendVerificationEmail` as side-effect callbacks during auth flows. Both are currently preceded by `void`, which discards the promise — any errors from Resend API calls are silently swallowed. The `sendEmail` function in `lib/email/send.ts` handles the missing-API-key case with a `console.warn` but does not catch runtime errors from the Resend SDK itself.

The change is scoped to two files: `lib/auth/auth.ts` (remove `void`) and `lib/email/send.ts` (add error handling in the send function itself).

## Goals / Non-Goals

**Goals:**
- Log email send failures so operators can detect delivery problems
- Prevent unhandled promise rejections
- Keep email sending non-blocking — Better Auth flows should not fail if email delivery fails

**Non-Goals:**
- No retry logic — Resend already handles transient failures internally
- No user-facing error messages from email failures
- No monitoring/alerting integration beyond logs
- No changes to email templates or content

## Decisions

**1. Add error handling inside `sendEmail` rather than at each callsite in `auth.ts`**

This is the single point where all email sending goes through. Wrapping it once is DRYer than wrapping every caller. The error is caught, logged via `console.error`, and re-thrown so callers can still react if needed.

**2. Use `.catch()` on the promise in `auth.ts` instead of `void` or `await`**

`await` would block the auth flow on email delivery — a Resend API timeout would make the user wait. `.catch()` keeps it fire-and-forget but logs failures, which is the minimal correct behavior. No functional change to Better Auth's own error handling.

**3. Use `console.error` for logging**

No external logging dependency is worth adding for this. `console.error` is universally available, appears in server logs, and can be routed by the deployment platform (Vercel, etc.).

## Risks / Trade-offs

- **[Low] Email errors are still invisible if server logs aren't monitored** → Mitigation: `console.error` at least makes them visible in logs; adding an external logger is out of scope
- **[Low] `.catch()` creates an unhandled rejection if it throws inside** → Mitigation: the `.catch()` handler itself only does `console.error`, which doesn't throw
