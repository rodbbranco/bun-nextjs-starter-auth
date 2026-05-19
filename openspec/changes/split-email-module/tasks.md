## 1. Create new email module structure

- [x] 1.1 Create `lib/email/` directory
- [x] 1.2 Create `lib/email/client.ts` with Resend client initialization (moved from `lib/auth/email.ts`)
- [x] 1.3 Create `lib/email/send.ts` with `sendEmail` function (moved from `lib/auth/email.ts`)
- [x] 1.4 Create `lib/email/verification.ts` with `sendVerificationEmail` function (moved from `lib/auth/email.ts`)
- [x] 1.5 Create `lib/email/password-reset.ts` with `sendPasswordResetEmail` function (moved from `lib/auth/email.ts`)
- [x] 1.6 Create `lib/email/index.ts` re-exporting all public functions

## 2. Update imports and clean up

- [x] 2.1 Update `lib/auth/auth.ts` to import from `@/lib/email` instead of `@/lib/auth/email`
- [x] 2.2 Delete `lib/auth/email.ts`
- [x] 2.3 Verify no lint or typecheck errors after restructuring
