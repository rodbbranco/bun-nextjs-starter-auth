## Context

The project uses a `proxy.ts` middleware (Next.js 16) for auth protection. It currently checks for the existence of a `better-auth.session_token` cookie — not its validity. This causes a redirect loop:

1. User has stale/invalid session cookie
2. Visits `/dashboard` → proxy sees cookie, lets request through
3. `requireAuth()` validates session server-side → null → 307 redirect to `/sign-in`
4. Visits `/sign-in` → proxy sees cookie → 307 redirect to `/dashboard`
5. Back to step 2 → infinite loop

The proxy's cookie check is intentionally optimistic (per Better Auth docs), but the `/sign-in` → `/dashboard` redirect based on a non-validated check creates the loop.

## Goals / Non-Goals

**Goals:**
- Stop the 307 redirect loop for unauthenticated users
- Use Better Auth's `getSessionCookie` helper (standardized cookie detection)
- Keep optimistic unauthenticated → redirect from protected routes in proxy
- Keep full session validation in `requireAuth()` for pages

**Non-Goals:**
- No changes to `requireAuth()` or `getSession()` helpers
- No changes to the dashboard page's auth logic
- No performance regressions from adding DB calls to proxy

## Decisions

1. **Use `getSessionCookie` from Better Auth**: Instead of manually checking `request.cookies.get("better-auth.session_token")`, use the official helper. This is future-proof (handles cookie name/prefix changes) and is the recommended approach in Better Auth docs.

2. **Remove proxy redirect from `/sign-in`**: The `isLoginPage && sessionCookie` block is the root cause. Without it, unauthenticated users always land on the sign-in page where they can authenticate. Authenticated users who visit `/sign-in` will just see the sign-in page — harmless and simpler.

3. **Keep proxy redirect from protected routes**: The `isProtectedRoute && !sessionCookie` check is correct and recommended. It prevents unauthenticated users from seeing protected page content before the server-side redirect kicks in.

## Risks / Trade-offs

- [Risk: Authenticated users who manually visit `/sign-in` won't be auto-redirected] → Acceptable regression; they can navigate to `/dashboard` themselves or the sign-in page could add a client-side check using `authClient.getSession()` for a smoother UX
- [Risk: Cookie name changes in future Better Auth versions] → Mitigated by using `getSessionCookie` which tracks naming changes
