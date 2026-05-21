# post-auth-redirect Specification

## Purpose
Ensure all authentication flows redirect users to `/dashboard` after successful authentication.

## Requirements
### Requirement: All auth flows redirect to /dashboard on success
After successful authentication via any method, the system SHALL redirect the user to `/dashboard`.

#### Scenario: Email/password sign-in redirects to dashboard
- **WHEN** a user signs in with email and password successfully
- **THEN** they are redirected to `/dashboard`

#### Scenario: Google OAuth sign-in redirects to dashboard
- **WHEN** a user signs in with Google OAuth successfully
- **THEN** they are redirected to `/dashboard`

#### Scenario: Sign-up redirects to dashboard after email verification
- **WHEN** a user completes email verification after signing up
- **THEN** they are redirected to `/dashboard`
