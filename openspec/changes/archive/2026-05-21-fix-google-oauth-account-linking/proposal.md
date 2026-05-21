## Why

When a user signs up with email/password and later tries to sign in with Google OAuth using the same email, Better Auth returns an `account_not_linked` error (with warning "User already exist but account isn't linked to google") because account linking is explicitly disabled. This creates a poor UX where users are locked out of their account if they choose the wrong sign-in method.

## What Changes

- Enable account linking in Better Auth config (`account.accountLinking.enabled: true`)
- Configure `trustedProviders` to only allow linking Google accounts to existing email/password accounts (prevent reverse-linking)
- Handle the `account_not_linked` error on the client-side sign-in form to show a meaningful message instead of a silent failure
- Update the `google-oauth` spec with account linking requirements

## Capabilities

### New Capabilities
- `account-linking-error-handling`: Client-side handling of the `account_not_linked` error during OAuth sign-in, displaying a clear message to users about linking their Google account

### Modified Capabilities
- `google-oauth`: Add requirement for account linking — when a user with an existing email/password account signs in with Google for the first time, the accounts SHALL be linked automatically

## Impact

- `lib/auth/auth.ts`: Enable `account.accountLinking` with appropriate trusted providers
- `components/auth/SignInForm.tsx`: Handle `account_not_linked` error from OAuth callback
- `openspec/specs/google-oauth/spec.md`: Add account linking scenario
