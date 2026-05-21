## Context

Three auth pages (`forgot-password`, `reset-password`, `verify-email-notice`) manually repeat a 2-div centering layout (`flex min-h-svh items-center justify-center` > `flex w-full max-w-sm flex-col items-center gap-6 text-center`) that is already encapsulated in the shared `AuthLayout` component at `components/auth/AuthLayout.tsx`. The `sign-in` and `signup` pages already use this component correctly.

## Goals / Non-Goals

**Goals:**
- Replace all instances of the duplicated centering divs with `AuthLayout`
- Preserve exact visual output — no styling or behavior changes
- Remove the `"use client"` directive from pages that no longer need client-side behavior (only `reset-password` and `verify-email-notice` need it)

**Non-Goals:**
- No changes to the `AuthLayout` component itself
- No changes to the other auth pages that already use `AuthLayout`

## Decisions

1. **Use existing `AuthLayout` as-is** — no need to extend it since all three pages use title + description + children, which the component already supports.
2. **Remove `"use client"` from `forgot-password/page.tsx`** — after refactoring, this page no longer needs client-side hooks (state, effects, form handlers). Actually, it still uses `useState` and an event handler, so `"use client"` stays.
3. **Suspense fallback in `reset-password/page.tsx`** — The fallback currently duplicates the centering layout. Replace it with a centered "Loading..." text. Since `AuthLayout` is a `"use client"` component itself, the simplest approach is a minimal inline centering for the Suspense fallback, or wrap the fallback in a simple div.

## Risks / Trade-offs

- [Suspense fallback] → The fallback in reset-password is rendered before `AuthLayout` is loaded (since it's a client component). Keep a minimal inline centering `div` for the fallback, or add a simple loading state using `AuthLayout` as a server-compatible shell. Minimal inline fallback is the pragmatic choice.
