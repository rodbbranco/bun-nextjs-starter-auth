## ADDED Requirements

### Requirement: Email verification check in proxy
The system SHALL check that authenticated users have verified their email before accessing protected routes.

#### Scenario: Unverified user redirected from protected route
- **WHEN** an authenticated user with `email_verified: false` requests a protected route
- **THEN** they are redirected to `/verify-email-notice`

#### Scenario: Unverified user exempt routes
- **WHEN** an authenticated user with `email_verified: false` requests `/verify-email-notice`, `/auth/*`, `/login`, or `/logout`
- **THEN** the request proceeds without redirect
