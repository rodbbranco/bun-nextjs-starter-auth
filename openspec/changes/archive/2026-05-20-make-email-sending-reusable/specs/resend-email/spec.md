## MODIFIED Requirements

### Requirement: Resend is the email provider for transactional emails
The system SHALL use Resend to send verification and password reset emails via a shared `sendEmail` utility function.

#### Scenario: Resend client configured
- **WHEN** the application starts or sends its first email
- **THEN** a Resend client is initialized with the `RESEND_API_KEY` environment variable

#### Scenario: Verification email sent via Resend
- **WHEN** a user signs up with email/password
- **THEN** `sendVerificationEmail` calls `sendEmail` which sends a verification email via Resend with a verify button and fallback link

#### Scenario: Password reset email sent via Resend
- **WHEN** a user requests a password reset
- **THEN** `sendPasswordResetEmail` calls `sendEmail` which sends a password reset email via Resend with a reset button and fallback link
