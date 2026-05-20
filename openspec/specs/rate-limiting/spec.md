# rate-limiting Specification

## Purpose
TBD - created by archiving change add-better-auth. Update Purpose after archive.
## Requirements
### Requirement: Rate limiting is applied to all auth endpoints
The system SHALL apply rate limiting to all BetterAuth endpoints by default using BetterAuth's built-in rate limiting plugin.

#### Scenario: Rate limit enforced
- **WHEN** a client exceeds the configured rate limit for an auth endpoint
- **THEN** the endpoint returns HTTP 429 (Too Many Requests)
- **THEN** the response includes a `retryAfter` value indicating when to retry

### Requirement: Different limits per endpoint type
The system SHALL support custom rate limits per endpoint type — stricter for sign-in attempts, looser for general auth endpoints.

#### Scenario: Stricter sign-in rate limit
- **WHEN** a client makes sign-in attempts from the same IP
- **THEN** the limit is 5 attempts per 15 minutes per IP

#### Scenario: Looser general auth rate limit
- **WHEN** a client makes requests to general auth endpoints (non sign-in)
- **THEN** the limit is 100 requests per 10 minutes per IP

### Requirement: Rate limit storage is database-backed
The system SHALL store rate limit data in the database rather than in-memory.

#### Scenario: Rate limit persists across instances
- **WHEN** a request is rate-limited by one serverless instance
- **THEN** other instances also see the rate-limited state because it's stored in the database

#### Scenario: Rate limit survives cold start
- **WHEN** a serverless function cold-starts
- **THEN** the rate limit state is preserved because it's stored in the database

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

