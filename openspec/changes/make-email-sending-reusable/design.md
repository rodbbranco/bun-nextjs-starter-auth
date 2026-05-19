## Context

`lib/auth/email.ts` currently has two functions (`sendVerificationEmail`, `sendPasswordResetEmail`) that each independently call `resend.emails.send()` with nearly identical parameter structures. The Resend client and `fromEmail` are initialized once at module level, but every call repeats the same `from`, `to`, `subject`, `html`, `text` object shape.

## Goals / Non-Goals

**Goals:**
- Extract a single `sendEmail(to, subject, html, text?)` function that wraps the Resend client
- Deduplicate the email-sending logic while keeping existing exported functions as convenience wrappers
- No breaking changes — callers in `auth.ts` continue to work unchanged

**Non-Goals:**
- No new email types or templates
- No changes to BetterAuth hooks or configuration
- No new dependencies

## Decisions

1. **`sendEmail` signature**: `(to: string, subject: string, html: string, text?: string) => Promise<void>` — simple, covers all transactional email needs. The optional `text` parameter provides a plain-text fallback.
2. **Keep convenience wrappers**: `sendVerificationEmail` and `sendPasswordResetEmail` remain exported and call `sendEmail` internally. This preserves the existing API and keeps templates co-located with their purpose.
3. **Resend client stays module-level**: Single initialization at the top of `email.ts` — no change needed.
4. **No error handling changes**: Errors propagate as before (void/awaited by BetterAuth hooks). Logging or retry logic can be added later.

## Risks / Trade-offs

- [Risk: `sendEmail` is too generic and loses type safety for email types] → Mitigation: convenience wrappers remain as the primary API; `sendEmail` is an internal utility
- [Trade-off: no templating system] → Acceptable for now; only two email types exist. Can add a template engine later if more types are added
