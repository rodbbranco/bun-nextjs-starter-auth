## ADDED Requirements

### Requirement: Session expires after 30 days of inactivity
The system SHALL expire sessions after 30 days of inactivity.

#### Scenario: Active session within 30 days
- **WHEN** a user with an active session makes a request within 30 days of last activity
- **THEN** the session is refreshed and expiry is extended by 30 days

#### Scenario: Session expired after 30 days of inactivity
- **WHEN** a user makes a request more than 30 days after last activity
- **THEN** the session is considered expired
- **THEN** the user is treated as unauthenticated and redirected to `/sign-in`

### Requirement: Session is rolling
The system SHALL extend the session expiry on each authenticated request (rolling/ sliding expiry).

#### Scenario: Activity refreshes session
- **WHEN** an authenticated user makes a request on day 20 of their session
- **THEN** the session expiry is reset to 30 days from that request

### Requirement: Session cookie is secure
The session cookie SHALL be httpOnly, secure in production, and sameSite: lax.

#### Scenario: Cookie attributes set
- **WHEN** a session cookie is created
- **THEN** it has `httpOnly: true`
- **THEN** in production it has `secure: true`
- **THEN** it has `sameSite: lax`

### Requirement: Session token stored in cookie and database
The system SHALL store session tokens in both the browser cookie and the database session table.

#### Scenario: Session token in cookie and DB
- **WHEN** a session is created
- **THEN** a session token is stored in the `session` table in the database
- **THEN** the same token is set as a cookie in the browser response

### Requirement: Server can validate session
The system SHALL provide a way for server code to validate a session and retrieve the authenticated user.

#### Scenario: Valid session returns user
- **WHEN** `getSession()` is called with a valid session token
- **THEN** it returns the authenticated user object and session data

#### Scenario: Invalid session returns null
- **WHEN** `getSession()` is called with no token or an invalid/expired token
- **THEN** it returns `null`
