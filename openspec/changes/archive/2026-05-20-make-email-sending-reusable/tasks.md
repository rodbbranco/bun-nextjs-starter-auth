## 1. Extract sendEmail utility

- [x] 1.1 Create `sendEmail(to: string, subject: string, html: string, text?: string): Promise<void>` function in `lib/auth/email.ts` that wraps the Resend client with the shared `fromEmail` default
- [x] 1.2 Refactor `sendVerificationEmail` to call `sendEmail` internally instead of calling `resend.emails.send()` directly
- [x] 1.3 Refactor `sendPasswordResetEmail` to call `sendEmail` internally instead of calling `resend.emails.send()` directly
- [x] 1.4 Verify no lint or typecheck errors after refactoring
