# layout-consistency Specification

## Purpose

All auth pages use the shared `AuthLayout` component to ensure consistent layout across auth-facing pages.

## Requirements

### Requirement: Auth pages use AuthLayout component

All auth-facing pages SHALL use the `AuthLayout` component from `@/components/auth/AuthLayout` instead of manually inlining the centering layout.

#### Scenario: Forgot password page uses AuthLayout
- **WHEN** rendering `app/forgot-password/page.tsx`
- **THEN** the page SHALL wrap its content in `<AuthLayout>` instead of inline centering divs

#### Scenario: Reset password page uses AuthLayout
- **WHEN** rendering `app/reset-password/page.tsx`
- **THEN** the page SHALL wrap its content in `<AuthLayout>` instead of inline centering divs

#### Scenario: Verify email notice page uses AuthLayout
- **WHEN** rendering `app/verify-email-notice/page.tsx`
- **THEN** the page SHALL wrap its content in `<AuthLayout>` instead of inline centering divs
