# post-verification-redirect Specification

## Purpose
After email verification, users are redirected to `/dashboard` instead of `/verify-email-notice`.

## ADDED Requirements

### Requirement: Post-verification redirect to dashboard
After a user clicks the verification email link and Better Auth confirms their email, the system SHALL redirect to `/dashboard`.

#### Scenario: Verified user lands on dashboard
- **WHEN** a user clicks the verification link in their email
- **THEN** Better Auth marks their email as verified
- **THEN** the user is redirected to `/dashboard`

### Requirement: Signup callback URL points to dashboard
The signup form SHALL pass `callbackURL: "/dashboard"` to `signUp.email()` so the verification email link targets `/dashboard`.

#### Scenario: Signup callback URL configured
- **WHEN** a user submits the signup form
- **THEN** the `signUp.email()` call includes `callbackURL: "/dashboard"`
- **THEN** the verification email contains a link with `/dashboard` as the redirect target

### Requirement: Verify notice page redirects if already verified
The `/verify-email-notice` page SHALL check if the user's email is already verified and redirect to `/dashboard` if so.

#### Scenario: Already verified user visits notice page
- **WHEN** a user with `email_verified: true` navigates to `/verify-email-notice`
- **THEN** they are automatically redirected to `/dashboard`
