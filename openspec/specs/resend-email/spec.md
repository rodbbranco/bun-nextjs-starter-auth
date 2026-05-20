# resend-email Specification

## Purpose
Resend is the email provider for transactional emails (verification, password reset).

## Requirements

### Requirement: Resend is the email provider for transactional emails
The system SHALL use Resend to send verification and password reset emails via files organized under `lib/email/`.

#### Scenario: Resend client configured
- **WHEN** the application starts or sends its first email
- **THEN** a Resend client is initialized in `lib/email/client.ts` with the `RESEND_API_KEY` environment variable

#### Scenario: Verification email sent via Resend
- **WHEN** a user signs up with email/password
- **THEN** `sendVerificationEmail` from `lib/email/verification.ts` sends a verification email via Resend with a verify button and fallback link

#### Scenario: Password reset email sent via Resend
- **WHEN** a user requests a password reset
- **THEN** `sendPasswordResetEmail` from `lib/email/password-reset.ts` sends a password reset email via Resend with a reset button and fallback link
