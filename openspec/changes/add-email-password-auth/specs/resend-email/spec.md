## ADDED Requirements

### Requirement: Resend is the email provider for transactional emails
The system SHALL use Resend to send verification and password reset emails.

#### Scenario: Resend client configured
- **WHEN** the application starts or sends its first email
- **THEN** a Resend client is initialized with the `RESEND_API_KEY` environment variable

#### Scenario: Verification email sent via Resend
- **WHEN** a user signs up with email/password
- **THEN** Resend sends a verification email with a verify button and fallback link

#### Scenario: Password reset email sent via Resend
- **WHEN** a user requests a password reset
- **THEN** Resend sends a password reset email with a reset button and fallback link

### Requirement: Email templates are plain transactional
The system SHALL send plain transactional emails with a call-to-action button and a fallback plain-text link.

#### Scenario: Verification email format
- **WHEN** a verification email is sent
- **THEN** it includes a "Verify email" button linking to `/auth/verify-email?token=...`
- **THEN** it includes a fallback plain-text link if the button does not render

#### Scenario: Password reset email format
- **WHEN** a password reset email is sent
- **THEN** it includes a "Reset password" button linking to `/auth/reset-password?token=...`
- **THEN** it includes a fallback plain-text link if the button does not render

### Requirement: Environment variables for Resend
The system SHALL require `RESEND_API_KEY` and `RESEND_FROM_EMAIL` environment variables.

#### Scenario: Missing Resend env vars
- **WHEN** the server starts without `RESEND_API_KEY` or `RESEND_FROM_EMAIL` configured
- **THEN** email sending fails with a clear error
