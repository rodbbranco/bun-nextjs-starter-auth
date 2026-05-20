## 1. Fix proxy.ts

- [x] 1.1 Replace manual cookie check with `getSessionCookie` from `better-auth/cookies`
- [x] 1.2 Remove the `isLoginPage && sessionCookie` redirect block

## 2. Verify

- [x] 2.1 Run `bun run typecheck` to verify no type errors
- [x] 2.2 Run `bun run lint` to verify no lint errors
