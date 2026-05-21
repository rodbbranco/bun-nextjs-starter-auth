## MODIFIED Requirements

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

### Requirement: Both Google OAuth and email/password providers enabled
The system SHALL allow sign-in via both Google OAuth and email/password authentication.

#### Scenario: Both options available
- **WHEN** an unauthenticated user visits `/sign-in`
- **THEN** they see a "Continue with Google" button
- **THEN** they see email and password input fields for credentials sign-in

### Requirement: Google OAuth scopes
The system SHALL request `openid`, `email`, and `profile` scopes from Google OAuth.

#### Scenario: Scopes configured
- **WHEN** the OAuth flow is initiated
- **THEN** the authorization URL includes `scope=openid email profile`

## ADDED Requirements

### Requirement: Existing email/password accounts are linked to Google on sign-in
When a user with an existing email/password account signs in with Google OAuth using the same email address, the system SHALL automatically link the Google account to the existing user record.

#### Scenario: Email/password user signs in with Google
- **WHEN** a user previously registered with email/password signs in with Google using the same email
- **THEN** a new account record is created linking the Google OAuth provider to the existing user
- **THEN** a session is created for the user
- **THEN** the user is redirected to `/dashboard`

#### Scenario: Google-only accounts cannot link email/password
- **WHEN** a user who only registered via Google tries to sign up with email/password using the same email
- **THEN** the sign-up is rejected with an error indicating the email is already in use

#### Scenario: Different emails are not linked
- **WHEN** a user signs in with Google using an email different from their existing account email
- **THEN** the sign-in is rejected with an error
- **THEN** the accounts are not linked
