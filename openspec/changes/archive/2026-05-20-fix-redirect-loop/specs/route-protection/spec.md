# route-protection Specification (Delta)

## MODIFIED Requirements

### Requirement: Already authenticated users skip login
The system SHALL NOT redirect based on cookie-only existence from `/sign-in`. The proxy SHALL only handle unauthenticated redirects from protected routes. Authenticated user redirects from `/sign-in` SHALL be handled by the sign-in page itself with proper session validation.

#### Scenario: Unauthenticated user visits login
- **WHEN** an unauthenticated (or invalid session) user visits `/sign-in`
- **THEN** the sign-in page renders normally without redirect

#### Scenario: Authenticated user visits login with valid session
- **WHEN** a user with a valid session visits `/sign-in`
- **THEN** the sign-in page MAY optionally redirect to `/dashboard` after validating the session via `authClient.getSession()`

## REMOVED Requirements

### Requirement: Already authenticated users skip login (proxy-level)
**Reason**: Root cause of infinite redirect loop. Proxy cookie-only check cannot distinguish valid from invalid sessions, creating a loop when `requireAuth()` rejects the cookie.
**Migration**: Sign-in page can optionally implement client-side redirect with proper session validation via `authClient.getSession()`.
