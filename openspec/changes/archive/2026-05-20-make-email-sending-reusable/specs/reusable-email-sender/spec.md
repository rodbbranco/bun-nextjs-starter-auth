## ADDED Requirements

### Requirement: Reusable sendEmail function
The system SHALL provide a `sendEmail(to, subject, html, text?)` function that sends an email via the configured Resend client.

#### Scenario: Send email with HTML and plain-text fallback
- **WHEN** `sendEmail` is called with `to`, `subject`, `html`, and `text` arguments
- **THEN** Resend sends an email to the recipient with the provided subject, HTML body, and plain-text fallback

#### Scenario: Send email without plain-text fallback
- **WHEN** `sendEmail` is called with `to`, `subject`, and `html` arguments (no `text`)
- **THEN** Resend sends an email with the provided subject and HTML body

#### Scenario: Email uses configured from address
- **WHEN** `sendEmail` sends an email
- **THEN** the `from` field is set to the `RESEND_FROM_EMAIL` environment variable (or `noreply@yourdomain.com` as fallback)

### Requirement: sendEmail uses the shared Resend client
The system SHALL use a single Resend client instance initialized with `RESEND_API_KEY` for all email sending.

#### Scenario: Single client instance
- **WHEN** `sendEmail` is called multiple times
- **THEN** the same Resend client instance is used for all calls
