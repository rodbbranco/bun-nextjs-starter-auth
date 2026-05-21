## Context

The app has three authentication flows: email/password sign-in, Google OAuth sign-in, and email/password sign-up. Currently:
- Email sign-in: redirects to `/dashboard` via `router.push("/dashboard")` after success
- Google OAuth sign-in: no `callbackURL` specified, defaults to `/` (landing page)
- Sign-up: `callbackURL: "/dashboard"` set, redirects to `/verify-email-notice` for email verification

The Google OAuth flow is the only one that doesn't redirect to `/dashboard`, creating an inconsistent post-auth experience.

## Goals / Non-Goals

**Goals:**
- All auth flows redirect to `/dashboard` after successful authentication
- Minimal code change — add `callbackURL` to the existing Google OAuth call

**Non-Goals:**
- Dynamic redirect based on user role or intent (e.g., `?next=/settings`)
- Changing the sign-up email verification redirect flow

## Decisions

1. **Use `callbackURL` option in `signIn.social()`** — Better Auth's `signIn.social()` accepts a `callbackURL` option that controls where the user is redirected after successful OAuth authentication. This is the standard approach and matches what's already used in `signUp.email()`.

2. **Keep email sign-in redirect as-is** — The email sign-in already uses `router.push("/dashboard")` after receiving successful data. This is correct and doesn't need changing.

## Risks / Trade-offs

- **None significant** — This is a single-line change with no side effects. If a user was relying on the `/` redirect (e.g., bookmarked the landing page), they can still navigate there manually from the dashboard.
