## Why

After signing in with Google OAuth, users are redirected to `/` (the landing page) instead of `/dashboard`. Email/password sign-in and sign-up already redirect to `/dashboard`, but the Google OAuth flow is missing the `callbackURL` option. This creates an inconsistent experience where users must manually navigate to the dashboard after signing in with Google.

## What Changes

- Add `callbackURL: "/dashboard"` to the Google OAuth sign-in call in `SignInForm.tsx`
- Ensure all auth flows (email sign-in, Google OAuth, sign-up) consistently redirect to `/dashboard` on success

## Capabilities

### New Capabilities
- `post-auth-redirect`: Ensures all authentication flows redirect to `/dashboard` after successful sign-in or sign-up

### Modified Capabilities
- `google-oauth`: Update redirect behavior — after successful Google OAuth sign-in, users SHALL be redirected to `/dashboard` instead of the default landing page

## Impact

- `components/auth/SignInForm.tsx`: Add `callbackURL: "/dashboard"` to `authClient.signIn.social()` call
- `openspec/specs/google-oauth/spec.md`: Update redirect scenario
