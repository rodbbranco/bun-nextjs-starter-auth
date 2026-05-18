## 1. Dependencies & Config

- [x] 1.1 Install npm packages: `better-auth`, `drizzle-orm`, `drizzle-kit`, `@neondatabase/serverless`, `@better-auth/drizzle-adapter`
- [x] 1.2 Add `db:push` and `db:migrate` scripts to `package.json`
- [x] 1.3 Create `.env.local.example` with all required env vars: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`

## 2. Database Schema & Client

- [x] 2.1 Create `drizzle.config.ts` pointing to `DATABASE_URL` with schema path and neon-http driver
- [x] 2.2 Create `db/schema.ts` with BetterAuth tables: `user`, `session`, `account`, `verification`, `rateLimit`
- [x] 2.3 Create `db/index.ts` exporting Drizzle client using `@neondatabase/serverless` (neon-http driver)

## 3. BetterAuth Server Instance

- [x] 3.1 Create `lib/auth/auth.ts` — BetterAuth server instance with Google OAuth provider, Drizzle adapter, rate limit plugin, and session config (30d rolling, secure cookies)
- [x] 3.2 Create `lib/auth/auth-client.ts` — BetterAuth client instance for browser use

## 4. Auth Helpers

- [x] 4.1 Create `lib/auth/helpers.ts` with `getSession()`, `requireAuth()`, and `withAuth()` wrappers

## 5. Middleware & Route Protection

- [x] 5.1 Create `middleware.ts` at project root — Edge middleware that checks BetterAuth session cookie, protects routes in `PROTECTED_ROUTES` array, redirects `/login` for authenticated users

## 6. Pages

- [x] 6.1 Create `app/login/page.tsx` — centered layout with "Continue with Google" button
- [x] 6.2 Create `app/dashboard/page.tsx` — protected placeholder page confirming auth works

## 7. Final Integration

- [x] 7.1 Verify all files exist and imports are correct
- [x] 7.2 Run `bun run typecheck` to verify TypeScript compilation
- [x] 7.3 Run `bun run build` to verify production build succeeds
