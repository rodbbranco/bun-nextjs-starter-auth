## ADDED Requirements

### Requirement: Rate limit for credentials sign-in
The system SHALL apply a rate limit of 5 attempts per 15 minutes per IP for email/password sign-in.

#### Scenario: Credentials sign-in rate limited
- **WHEN** a client exceeds 5 sign-in attempts with email/password within 15 minutes from the same IP
- **THEN** the endpoint returns HTTP 429 (Too Many Requests)
- **THEN** the response includes a `retryAfter` value

### Requirement: Rate limit for sign-up
The system SHALL apply a rate limit of 3 accounts per hour per IP for email/password sign-up.

#### Scenario: Sign-up rate limited
- **WHEN** a client creates more than 3 accounts within 1 hour from the same IP
- **THEN** the endpoint returns HTTP 429 (Too Many Requests)
- **THEN** the response includes a `retryAfter` value

### Requirement: Rate limit for forgot password requests
The system SHALL apply a rate limit of 3 requests per hour per email for forgot-password.

#### Scenario: Forgot password rate limited
- **WHEN** more than 3 forgot-password requests are made for the same email within 1 hour
- **THEN** the endpoint returns HTTP 429 (Too Many Requests)
- **THEN** the response includes a `retryAfter` value

### Requirement: Rate limit for resend verification
The system SHALL apply a rate limit of 3 requests per hour per email for resend verification.

#### Scenario: Resend verification rate limited
- **WHEN** more than 3 resend verification requests are made for the same email within 1 hour
- **THEN** the endpoint returns HTTP 429 (Too Many Requests)
- **THEN** the response includes a `retryAfter` value
