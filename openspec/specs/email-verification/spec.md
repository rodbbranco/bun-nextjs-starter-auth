# email-verification Specification

## Purpose
Email verification is required before users can access the application with email/password credentials.

## Requirements

### Requirement: Email verification is required before first sign-in
The system SHALL require users to verify their email before they can sign in with email/password credentials.

#### Scenario: Verification email sent on sign-up
- **WHEN** a user signs up with email and password
- **THEN** BetterAuth automatically sends a verification email to the provided address
- **THEN** the email contains a verification link pointing to `/auth/verify-email?token=...`

#### Scenario: Unverified user blocked from sign-in
- **WHEN** a user with `email_verified: false` attempts to sign in
- **THEN** sign-in is denied
- **THEN** the user is redirected to `/verify-email-notice`

### Requirement: Verification link consumable
When a user clicks the verification link in their email, Better Auth processes the token and marks the user's email as verified, then redirects to `/dashboard`.

#### Scenario: Verification link consumable
- **WHEN** a user clicks the verification link in their email
- **THEN** Better Auth processes the token and marks the user's email as verified
- **THEN** the user is redirected to `/dashboard`

### Requirement: Verify email notice page
The system SHALL provide a `/verify-email-notice` page informing users to check their inbox.

#### Scenario: Verify email notice rendered
- **WHEN** a user is redirected to `/verify-email-notice`
- **THEN** they see a message to check their email inbox
- **THEN** they see a "Resend verification email" button

### Requirement: Resend verification email
The system SHALL allow users to request a new verification email.

#### Scenario: Resend verification email
- **WHEN** an unverified user clicks "Resend verification email" on `/verify-email-notice`
- **THEN** a new verification email is sent to their registered email address
- **THEN** they see a success message confirming the email was sent

### Requirement: Route protection blocks unverified users from protected routes
The system SHALL redirect unverified users away from protected routes even if they have a session.

#### Scenario: Unverified user redirected from protected route
- **WHEN** a user with `email_verified: false` and an active session requests a protected route
- **THEN** they are redirected to `/verify-email-notice`

#### Scenario: Unverified user exempt routes
- **WHEN** a user with `email_verified: false` requests `/verify-email-notice`, `/auth/*`, `/login`, or `/logout`
- **THEN** the request proceeds normally without redirect
