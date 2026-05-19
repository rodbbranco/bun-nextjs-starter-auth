## MODIFIED Requirements

### Requirement: Only Google OAuth provider enabled
The system SHALL support both Google OAuth and email/password authentication.

**Reason:** Email/password authentication was added as an alternative sign-in method alongside the existing Google OAuth provider.

#### Scenario: Email/password option available
- **WHEN** an unauthenticated user visits `/sign-in`
- **THEN** they see a "Continue with Google" button
- **THEN** they see email and password input fields for credentials sign-in

#### Scenario: Existing Google account blocks credentials sign-up
- **WHEN** a user attempts to sign up with an email that already has a Google-linked account
- **THEN** they see an error: "An account with this email already exists. Sign in with Google."
- **THEN** no account is created with that email
