## ADDED Requirements

### Requirement: Middleware protects configured routes
The system SHALL run Edge middleware that checks the session cookie before serving protected routes.

#### Scenario: Unauthenticated user redirected from protected route
- **WHEN** an unauthenticated user requests `/dashboard/*`, `/app/*`, or `/account/*`
- **THEN** they are redirected to `/sign-in`

#### Scenario: Authenticated user accesses protected route
- **WHEN** an authenticated user requests `/dashboard/*`, `/app/*`, or `/account/*`
- **THEN** the request proceeds normally

### Requirement: Protected routes are configurable
The system SHALL define protected routes via a `PROTECTED_ROUTES` array that can be easily modified.

#### Scenario: Route added to PROTECTED_ROUTES
- **WHEN** a new path is added to the `PROTECTED_ROUTES` array in middleware
- **THEN** that path is now protected and redirects unauthenticated users

### Requirement: Already authenticated users skip login
The system SHALL redirect already-authenticated users from `/sign-in` to `/dashboard`.

#### Scenario: Authenticated user visits login
- **WHEN** an authenticated user visits `/sign-in`
- **THEN** they are redirected to `/dashboard`

### Requirement: Server-side auth helpers for RSCs and Server Actions
The system SHALL provide `getSession()` and `requireAuth()` helpers for use in Server Components and Server Actions.

#### Scenario: getSession returns session in RSC
- **WHEN** `getSession()` is called in a Server Component
- **THEN** it returns the session data if authenticated, or `null` if not

#### Scenario: requireAuth redirects unauthenticated
- **WHEN** `requireAuth()` is called and there is no valid session
- **THEN** it throws a redirect to `/sign-in`

### Requirement: API route auth wrapper
The system SHALL provide a `withAuth()` wrapper for Route Handlers that returns 401 if unauthenticated.

#### Scenario: withAuth returns 401
- **WHEN** a Route Handler using `withAuth()` receives an unauthenticated request
- **THEN** it returns a 401 response

#### Scenario: withAuth passes authenticated request
- **WHEN** a Route Handler using `withAuth()` receives an authenticated request
- **THEN** the session and user context are available to the handler
