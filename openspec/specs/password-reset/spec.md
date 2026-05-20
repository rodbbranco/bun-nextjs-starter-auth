# password-reset Specification

## Purpose
Users can request a password reset via email and set a new password using a time-limited token.

## Requirements

### Requirement: User can request a password reset
The system SHALL provide a `/forgot-password` page where users can request a password reset email.

#### Scenario: Forgot password page rendered
- **WHEN** an unauthenticated user visits `/forgot-password`
- **THEN** they see an email input field
- **THEN** they see a submit button labeled "Send reset link"

#### Scenario: Reset email sent for existing account
- **WHEN** a user submits the forgot-password form with an email that has an account
- **THEN** BetterAuth sends a password reset email to that address
- **THEN** they see a success message: "If an account with that email exists, a reset link has been sent"

#### Scenario: Reset email not sent for nonexistent account
- **WHEN** a user submits the forgot-password form with an email that has no account
- **THEN** they see the same message: "If an account with that email exists, a reset link has been sent"
- **THEN** no email is sent (prevents email enumeration)

### Requirement: Password reset token expires after 1 hour
The system SHALL expire password reset tokens after 1 hour.

#### Scenario: Token expires
- **WHEN** a user clicks a password reset link more than 1 hour after requesting it
- **THEN** the token is considered expired
- **THEN** they see an error message with a link back to `/forgot-password`

### Requirement: User can set a new password with a valid reset token
The system SHALL provide a `/reset-password` page where users can set a new password using a valid reset token.

#### Scenario: Reset password page with valid token
- **WHEN** a user clicks a valid, unexpired password reset link
- **THEN** they are taken to `/reset-password` with the token in the query string
- **THEN** they see new password and confirm password input fields

#### Scenario: Successful password reset
- **WHEN** a user submits the reset password form with matching passwords (8-128 chars) and a valid token
- **THEN** the password is updated
- **THEN** they are redirected to `/login` with a success toast

#### Scenario: Invalid token shows error
- **WHEN** a user submits the reset password form with an invalid or expired token
- **THEN** they see an error message
- **THEN** they see a link to `/forgot-password` to request a new reset

#### Scenario: Passwords do not match
- **WHEN** a user submits the reset password form with non-matching passwords
- **THEN** they see a validation error: "Passwords do not match"
