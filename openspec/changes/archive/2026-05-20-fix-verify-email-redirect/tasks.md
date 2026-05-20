## 1. Fix signup callback URL

- [x] 1.1 Change `callbackURL` in `app/signup/page.tsx` from `/verify-email-notice` to `/dashboard` in the `signUp.email()` call

## 2. Add auto-redirect to verify notice page

- [x] 2.1 Add client-side session check to `app/verify-email-notice/page.tsx` that redirects to `/dashboard` if `emailVerified` is true

## 3. Verify

- [x] 3.1 Run `bun run typecheck` to verify no type errors
- [x] 3.2 Run `bun run lint` to verify no lint errors
