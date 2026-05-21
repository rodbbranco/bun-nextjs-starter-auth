# account-linking-error-handling Specification

## Purpose
Handle OAuth account linking errors on the sign-in page, displaying user-friendly messages when authentication fails due to account linking issues.

## Requirements
### Requirement: OAuth errors are displayed on the sign-in page
When a Google OAuth sign-in fails, the error SHALL be captured from the callback URL query parameters and displayed to the user on the `/sign-in` page as a user-friendly message.

#### Scenario: account_not_linked error shown on sign-in page
- **WHEN** the Google OAuth callback returns with `error=account_not_linked`
- **THEN** the sign-in page displays a message: "This email is already registered. Sign in with your email and password first, then link your Google account from your account settings."

#### Scenario: Generic OAuth error shown on sign-in page
- **WHEN** the Google OAuth callback returns with an unrecognized `error` parameter
- **THEN** the sign-in page displays a message: "Sign in with Google failed. Please try again or use email/password."
