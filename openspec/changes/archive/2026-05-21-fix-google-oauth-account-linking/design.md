## Context

Better Auth has `account.accountLinking.enabled: false` in `lib/auth/auth.ts`. When a user with an existing email/password account signs in with Google (same email), Better Auth detects the match but refuses to link because account linking is disabled. The OAuth callback returns an `account_not_linked` error via query parameter. The current `SignInForm.tsx` does not handle OAuth callback errors, so users see a silent redirect or a generic error page.

## Goals / Non-Goals

**Goals:**
- Enable auto-linking when an existing email/password user signs in with Google for the first time
- Prevent reverse-linking (Google-first user linking email/password)
- Show a clear error message on the sign-in page when linking fails for unexpected reasons
- Flow: user clicks Google → Google auth → callback → accounts linked → session created → redirect to `/dashboard`

**Non-Goals:**
- Do NOT implement unlinking or account management UI
- Do NOT modify the sign-up flow (it already warns users about choosing a method)
- Do NOT add multi-account linking (e.g., GitHub + Google + email)

## Decisions

1. **Enable account linking with `trustedProviders`** — Set `account.accountLinking.enabled: true` with `trustedProviders: ["google"]`. This allows existing email/password users to link Google but prevents Google-first users from linking email/password (avoiding account takeover via password guessing).

2. **Handle OAuth callback errors via query params** — Better Auth's redirect-based OAuth flow returns errors as query parameters on the callback URL (e.g., `?error=account_not_linked`). The sign-in page will read `searchParams.get("error")` and display a user-friendly message. This requires the `callbackURL` to point back to `/sign-in` (default behavior).

3. **`allowDifferentEmails: false`** — Keep the default to prevent linking accounts with different email addresses, which could bypass email ownership verification.

## Risks / Trade-offs

- **Account takeover via Google** — If an attacker compromises a user's Google account, they could sign in. Mitigation: This is already possible if the user originally signed up with Google. The linked account still requires the same email, so this is equivalent risk.
- **Race conditions** — If a user clicks Google sign-in rapidly, multiple link attempts could occur. Mitigation: Better Auth handles this via OAuth state parameter (`storeStateStrategy`).
- **Existing sessions** — Already authenticated users clicking "Sign in with Google" should not break. Mitigation: Better Auth handles this — if already signed in, it links the account to the current user.
