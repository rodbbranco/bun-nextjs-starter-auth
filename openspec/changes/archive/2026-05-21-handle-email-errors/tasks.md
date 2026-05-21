## 1. Error handling in sendEmail

- [x] 1.1 Wrap `resend.emails.send()` in try/catch inside `lib/email/send.ts`, log errors with `console.error`
- [x] 1.2 Verify the function still throws after logging so callers can react if needed

## 2. Remove void from auth.ts callbacks

- [x] 2.1 Replace `void sendPasswordResetEmail(...)` with `sendPasswordResetEmail(...).catch(...)` in `lib/auth/auth.ts`
- [x] 2.2 Replace `void sendVerificationEmail(...)` with `sendVerificationEmail(...).catch(...)` in `lib/auth/auth.ts`

## 3. Verify

- [x] 3.1 Run `bun run typecheck` to confirm no type errors
- [x] 3.2 Run `bun run lint` to confirm no lint errors
