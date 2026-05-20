## Why

An unauthenticated user visiting `/dashboard` gets into a 307 redirect loop between `/dashboard` and `/sign-in`. The root cause: `proxy.ts` redirects `/sign-in` → `/dashboard` based solely on cookie existence (not session validity), while the dashboard page's `requireAuth()` properly validates the session server-side and redirects back to `/sign-in`. An invalid or expired session cookie triggers an infinite loop.

## What Changes

- Replace manual cookie check (`request.cookies.get()`) with Better Auth's `getSessionCookie` helper for robust cookie detection
- Remove the `/sign-in` → `/dashboard` redirect from `proxy.ts` — this is the root cause of the loop
- Instead, let the sign-in page handle redirecting already-authenticated users (where session can be properly validated)
- Keep the unauthenticated → redirect from protected routes in proxy (this is the correct optimistic check)
- **BREAKING**: The proxy no longer redirects authenticated users away from `/sign-in`

## Capabilities

### New Capabilities
- (none — this is a bug fix, not a new capability)

### Modified Capabilities
- `route-protection`: The "Already authenticated users skip login" requirement changes — proxy no longer redirects `/sign-in` → `/dashboard` based on cookie-only check

## Impact

- `proxy.ts` — use `getSessionCookie` from `better-auth/cookies` instead of manual cookie check; remove the `isLoginPage` redirect block
- `app/sign-in/page.tsx` — optionally add client-side redirect if already authenticated (validated via `authClient.getSession()`)
- `openspec/specs/route-protection/spec.md` — update "Already authenticated users skip login" requirement
