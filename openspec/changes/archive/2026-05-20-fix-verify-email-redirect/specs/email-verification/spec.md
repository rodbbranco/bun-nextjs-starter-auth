# email-verification Specification (Delta)

## MODIFIED Requirements

### Requirement: Verification link consumable
When a user clicks the verification link in their email, Better Auth processes the token and marks the user's email as verified, then redirects to `/dashboard`.

#### Scenario: Verification link consumable
- **WHEN** a user clicks the verification link in their email
- **THEN** Better Auth processes the token and marks the user's email as verified
- **THEN** the user is redirected to `/dashboard`
