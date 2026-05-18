## Why

This project needs authentication to become a practical starter for real applications. Adding BetterAuth with Google OAuth provides a secure, scalable auth layer with minimal code — supporting social login, session management, rate limiting, and route protection out of the box. Google-only OAuth keeps the initial scope tight while laying the groundwork for future providers.

## What Changes

- Add BetterAuth as the authentication library (server + client instances)
- Configure Google OAuth as the sole identity provider (no email/password, no magic links)
- Set up NeonDB with Drizzle ORM for auth data persistence (user, session, account, verification tables)
- Implement rate limiting via BetterAuth's built-in plugin (DB-backed)
- Add route protection middleware for `/dashboard/*`, `/app/*`, `/account/*`
- Create server-side auth helpers (`getSession()`, `requireAuth()`, `withAuth()`)
- Add `/sign-in` page with "Continue with Google" button
- Add `/dashboard` protected placeholder page
- Store Google `accessToken` and `refreshToken` on the session for future Google API calls
- Configure 30-day rolling session expiry with secure cookies

## Capabilities

### New Capabilities
- `google-oauth`: Google OAuth 2.0 authentication — login, account linking, token storage
- `auth-session`: Session management — create, validate, refresh, expire sessions with 30-day rolling expiry
- `rate-limiting`: Rate limiting on auth endpoints — DB-backed, configurable per endpoint type
- `route-protection`: Middleware-based route protection — redirect unauthenticated users to `/sign-in`
- `db-persistence`: Database schema and client for auth data — users, sessions, accounts, verifications

### Modified Capabilities

*(none — first auth implementation)*

## Impact

- **Dependencies added**: `better-auth`, `@neondatabase/serverless`, `drizzle-orm`, `drizzle-kit`, `@libsql/client` (or `neon-http`)
- **New files**: `/lib/auth/auth.ts`, `/lib/auth/auth-client.ts`, `/lib/auth/helpers.ts`, `/db/schema.ts`, `/db/index.ts`, `/drizzle.config.ts`, `middleware.ts`, `/app/sign-in/page.tsx`, `/app/dashboard/page.tsx`, `.env.local.example`
- **Environment variables**: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`
- **Existing code unaffected** — auth is additive, no existing code is modified
