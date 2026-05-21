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
