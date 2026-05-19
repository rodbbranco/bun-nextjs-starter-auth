# google-oauth Specification

## Purpose
TBD - created by archiving change add-better-auth. Update Purpose after archive.
## Requirements
### Requirement: User can sign in with Google
The system SHALL allow users to authenticate using their Google account via OAuth 2.0.

#### Scenario: Successful sign-in
- **WHEN** an unauthenticated user clicks "Continue with Google" on `/sign-in`
- **THEN** they are redirected to Google's OAuth consent screen
- **THEN** after consent, they are redirected back and a session is created
- **THEN** they are redirected to `/dashboard`

#### Scenario: First-time sign-in auto-creates account
- **WHEN** a user signs in with Google for the first time
- **THEN** a new user record is created automatically
- **THEN** a new account record is created linking the Google account
- **THEN** a session is created without requiring a separate registration step

### Requirement: Google OAuth tokens are stored
The system SHALL store the Google `accessToken` and `refreshToken` returned from Google OAuth on the user's account record.

#### Scenario: Tokens stored on account creation
- **WHEN** a user authenticates via Google OAuth
- **THEN** the `accessToken` and `refreshToken` from Google are stored in the `account` table
- **THEN** these tokens are accessible via the session for future Google API calls

### Requirement: Only Google OAuth provider enabled
The system SHALL only allow sign-in via Google OAuth. Email/password, magic links, and other providers SHALL NOT be configured.

#### Scenario: No email/password option
- **WHEN** an unauthenticated user visits `/sign-in`
- **THEN** they only see a "Continue with Google" button
- **THEN** no email/password form fields or other provider buttons are displayed

### Requirement: Google OAuth scopes
The system SHALL request `openid`, `email`, and `profile` scopes from Google OAuth.

#### Scenario: Scopes configured
- **WHEN** the OAuth flow is initiated
- **THEN** the authorization URL includes `scope=openid email profile`

