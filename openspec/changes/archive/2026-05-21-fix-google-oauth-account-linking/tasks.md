## 1. Enable Account Linking in Better Auth Config

- [x] 1.1 In `lib/auth/auth.ts`, change `account.accountLinking.enabled` from `false` to `true` and set `trustedProviders: ["google"]`

## 2. Handle OAuth Errors on Sign-In Page

- [x] 2.1 In `components/auth/SignInForm.tsx`, read `error` query param from `searchParams` on mount
- [x] 2.2 Display a user-friendly error message based on the `error` param value (e.g., `account_not_linked`, generic errors)
- [x] 2.3 Clear the error query param from the URL after displaying it (to prevent stale errors on re-render)

## 3. Update Main Spec

- [x] 3.1 Update `openspec/specs/google-oauth/spec.md` with the new account linking requirement and scenarios from `openspec/changes/fix-google-oauth-account-linking/specs/google-oauth/spec.md`
