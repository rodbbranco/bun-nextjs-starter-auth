## Why

After signing up and clicking the verification email link, users are redirected back to `/verify-email-notice` instead of `/dashboard`. This creates a confusing loop — the user verified their email but still lands on the "check your inbox" page with no automatic onward navigation.

## What Changes

- Change `callbackURL` in `signUp.email()` from `/verify-email-notice` to `/dashboard` so the post-verification redirect lands on the dashboard
- Add an auto-redirect to `/dashboard` on the `/verify-email-notice` page when the user's email is already verified (handles stale verification links and edge cases)
- Keep the immediate `router.push("/verify-email-notice")` after signup — this is the correct initial UX

## Capabilities

### New Capabilities
- `post-verification-redirect`: After email verification, users redirect to `/dashboard` instead of `/verify-email-notice`

### Modified Capabilities
- `email-verification`: Post-verification redirect target changes from `/verify-email-notice` to `/dashboard`

## Impact

- `app/signup/page.tsx` — update `callbackURL` in `signUp.email()` from `/verify-email-notice` to `/dashboard`
- `app/verify-email-notice/page.tsx` — add client-side check: if user already verified, redirect to `/dashboard`
