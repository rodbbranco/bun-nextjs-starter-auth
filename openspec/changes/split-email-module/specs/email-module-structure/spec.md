## ADDED Requirements

### Requirement: Email module is organized into isolated files per concern
The system SHALL organize email-related code into separate files under `lib/email/`, with one concern per file.

#### Scenario: Client initialized in its own file
- **WHEN** the email module is loaded
- **THEN** the Resend client is initialized in `lib/email/client.ts` with `RESEND_API_KEY`

#### Scenario: sendEmail utility in its own file
- **WHEN** `sendEmail` is called
- **THEN** it is imported from `lib/email/send.ts` which depends on the client from `client.ts`

#### Scenario: Each email template in its own file
- **WHEN** a verification email needs to be sent
- **THEN** `sendVerificationEmail` is imported from `lib/email/verification.ts`
- **WHEN** a password reset email needs to be sent
- **THEN** `sendPasswordResetEmail` is imported from `lib/email/password-reset.ts`

### Requirement: Barrel export for clean imports
The system SHALL provide a barrel `index.ts` file that re-exports all public email functions.

#### Scenario: Single import from barrel
- **WHEN** `auth.ts` imports email functions
- **THEN** it imports from `@/lib/email` and receives `sendEmail`, `sendVerificationEmail`, and `sendPasswordResetEmail`
