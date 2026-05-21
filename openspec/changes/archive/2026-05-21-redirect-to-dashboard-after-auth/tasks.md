## 1. Add Dashboard Redirect to Google OAuth Sign-In

- [x] 1.1 In `components/auth/SignInForm.tsx`, add `callbackURL: "/dashboard"` to the `authClient.signIn.social()` call in `handleGoogleSignIn`

## 2. Update Main Spec

- [x] 2.1 Update `openspec/specs/google-oauth/spec.md` to reflect that Google OAuth sign-in redirects to `/dashboard`
