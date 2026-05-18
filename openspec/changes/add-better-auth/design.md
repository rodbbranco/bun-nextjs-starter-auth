## Context

The project is a Next.js 16 starter (App Router, Turbopack, TypeScript, Tailwind CSS, shadcn) with zero auth functionality. BetterAuth is chosen as the auth library because it provides a complete auth solution (providers, sessions, rate limiting, middleware) that integrates natively with Next.js and supports Drizzle ORM + NeonDB out of the box.

## Goals / Non-Goals

**Goals:**
- Google OAuth login with auto-account creation
- Session management with 30-day rolling expiry
- DB-backed rate limiting on auth endpoints
- Route protection middleware for dashboard/app/account routes
- Server-side auth helpers for RSCs, Server Actions, and Route Handlers
- Store Google access/refresh tokens on session for future API calls
- Drizzle schema and NeonDB client for auth persistence

**Non-Goals:**
- Email/password authentication
- Magic link authentication
- Two-factor authentication
- Role-based access control or permissions
- Organization / multi-tenant support
- Token refresh for Google API calls (store tokens for later use)

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Auth library | BetterAuth | Purpose-built for Next.js, supports Drizzle + Neon, has plugins for rate limiting and social auth. Lighter than next-auth (Auth.js) v5. |
| Database | NeonDB (serverless) | Serverless Postgres — fits Next.js deployment model. BetterAuth has first-class Drizzle + Neon support. |
| ORM | Drizzle | Type-safe, lightweight, works with Neon's serverless driver. Already well-suited for the BetterAuth schema adapter. |
| Auth driver | `@neondatabase/serverless` + Drizzle adapter | BetterAuth's drizzle adapter with neon-http driver provides optimal serverless performance. |
| Google OAuth scopes | `openid`, `email`, `profile` | Minimal scopes for authentication. Additional scopes can be added later for specific Google API features. |
| Rate limiting storage | Database-backed | Required for serverless — in-memory doesn't survive cold starts or scale across instances. |
| Session expiry | 30 days, rolling | Balance of security and UX. Rolling expiry means active users don't get logged out unexpectedly. |
| Cookie config | httpOnly, secure in production, sameSite: lax | Standard secure cookie settings. `lax` allows GET navigations from Google OAuth redirect. |
| Route protection | Edge middleware | Runs before the request reaches the page, avoiding flash of unauthenticated content. |
| Auth helpers | `getSession()`, `requireAuth()`, `withAuth()` | Three patterns for three contexts (RSC, Server Actions, Route Handlers) — explicit and composable. |
| Client auth lib | `auth-client.ts` | Separate client instance for browser-side `useSession` hook and sign-in mutations. |

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Google OAuth token expiration | Tokens are stored but not auto-refreshed initially. Future enhancement can add `refreshToken` exchange. |
| Middleware cookie parsing for BetterAuth | BetterAuth uses a custom cookie format — must use their `getSessionCookie` parser or replicate the logic. |
| NeonDB connection overhead in serverless | Use HTTP (non-pooled) connection via `@neondatabase/serverless` — no connection pool to manage. |
| Rate limit table growth | Periodic cleanup via TTL or scheduled job. BetterAuth handles expiration internally. |
| Google Cloud API quota | Monitor usage. Single-user apps unlikely to hit limits. Add exponential backoff if needed. |
