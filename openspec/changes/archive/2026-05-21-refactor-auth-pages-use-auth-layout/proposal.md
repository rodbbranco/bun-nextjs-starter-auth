## Why

Three auth pages (forgot-password, reset-password, verify-email-notice) manually duplicate the same centering layout JSX that already exists in the shared `AuthLayout` component. This creates unnecessary code duplication (~16 lines of JSX per page), making the codebase harder to maintain and inconsistent with the sign-in and signup pages that already use `AuthLayout`.

## What Changes

- Refactor `app/forgot-password/page.tsx` to use `AuthLayout` instead of inline centering divs
- Refactor `app/reset-password/page.tsx` to use `AuthLayout` instead of inline centering divs (including Suspense fallback)
- Refactor `app/verify-email-notice/page.tsx` to use `AuthLayout` instead of inline centering divs
- No behavioral changes — only layout extraction to the shared component

## Capabilities

### New Capabilities

None — this is a pure refactoring with no new capabilities.

### Modified Capabilities

None — no spec-level behavior changes. The `AuthLayout` component already exists; this change only extends its usage.

## Impact

- 3 page components: `app/forgot-password/page.tsx`, `app/reset-password/page.tsx`, `app/verify-email-notice/page.tsx`
- No new dependencies, no API changes, no behavioral changes
- Reduces total JSX by ~16 lines across the three files
