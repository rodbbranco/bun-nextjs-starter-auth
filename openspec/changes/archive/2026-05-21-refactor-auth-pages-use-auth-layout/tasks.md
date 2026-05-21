## 1. Forgot Password Page

- [x] 1.1 Add `AuthLayout` import to `app/forgot-password/page.tsx`
- [x] 1.2 Replace both inline centering wrappers (form state and success state) with `<AuthLayout>`

## 2. Reset Password Page

- [x] 2.1 Add `AuthLayout` import to `app/reset-password/page.tsx`
- [x] 2.2 Replace inline centering wrapper in Suspense fallback with simple inline `<div className="flex min-h-svh items-center justify-center">`
- [x] 2.3 Replace inline centering wrapper in "invalid link" state with `<AuthLayout>`
- [x] 2.4 Replace inline centering wrapper in main form state with `<AuthLayout>`

## 3. Verify Email Notice Page

- [x] 3.1 Add `AuthLayout` import to `app/verify-email-notice/page.tsx`
- [x] 3.2 Replace inline centering wrapper with `<AuthLayout>`

## 4. Verification

- [x] 4.1 Run `npm run build` (or equivalent) to confirm no errors
- [x] 4.2 Verify visual parity — each page renders identically to before
