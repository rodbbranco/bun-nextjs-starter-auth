## Context

When a user signs up with email/password, Better Auth sends a verification email containing a link with the `callbackURL` embedded. Currently `callbackURL` is set to `/verify-email-notice`, so after the user clicks the verification link, they land on the same "check your inbox" page they were already on — creating a confusing loop with no onward navigation.

After verification, the user should be redirected to `/dashboard` since they now have a verified session and can access the app.

## Goals / Non-Goals

**Goals:**
- Change the post-verification redirect target from `/verify-email-notice` to `/dashboard`
- Keep the immediate post-signup UX (directing user to check their inbox) intact
- Handle edge cases: stale verification links, manually navigating to `/verify-email-notice` after verification

**Non-Goals:**
- No changes to the email verification flow itself
- No changes to the `requireAuth()` helper or proxy middleware
- No changes to the sign-in page's unverified email handling

## Decisions

1. **Two changes, one purpose**: `signup/page.tsx` gets the `callbackURL` fix (primary), and `/verify-email-notice` page gets a client-side verification check (safety net). This ensures the happy path works and edge cases are covered.
2. **`callbackURL` in client call, not server config**: The `callbackURL` is passed in the `signUp.email()` client call rather than setting a global `redirectTo` in the server's `emailVerification` config. This is more explicit and scoped to the signup flow.
3. **Client-side check on notice page**: `useEffect` calls `authClient.getSession()` and redirects to `/dashboard` if `emailVerified` is true. This handles users who arrive via stale verification links or bookmarks after already verifying.

## Risks / Trade-offs

- [Risk: Brief flash of notice page before redirect] → Mitigation: acceptable; the check is fast (local API call), and the notice page content is minimal
- [Risk: Session not yet reflecting verified status after redirect] → Mitigation: Better Auth refreshes session data on the server side during verification; the fresh `getSession()` call will return the updated status
