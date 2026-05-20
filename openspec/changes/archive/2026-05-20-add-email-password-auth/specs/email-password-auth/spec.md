## ADDED Requirements

### Requirement: User can sign up with email and password
The system SHALL allow users to create an account using their email, password, and name.

#### Scenario: Successful sign-up
- **WHEN** an unauthenticated user submits the sign-up form with a valid email, name, and password (8-128 characters)
- **THEN** a new user record is created with `email_verified: false`
- **THEN** a verification email is sent to the provided email address
- **THEN** the user is shown a notice to check their inbox

#### Scenario: Sign-up with existing email
- **WHEN** a user submits the sign-up form with an email that already has a user record
- **THEN** they see an error: "An account with this email already exists. Sign in with Google."
- **THEN** no user record is created or modified

#### Scenario: Sign-up with password too short
- **WHEN** a user submits the sign-up form with a password shorter than 8 characters
- **THEN** they see a validation error indicating the minimum length requirement

#### Scenario: Sign-up with password too long
- **WHEN** a user submits the sign-up form with a password longer than 128 characters
- **THEN** they see a validation error indicating the maximum length limit

### Requirement: User can sign in with email and password
The system SHALL allow users to sign in using their email and password.

#### Scenario: Successful sign-in with verified email
- **WHEN** a user with a verified email submits the sign-in form with correct email and password
- **THEN** a session is created
- **THEN** they are redirected to `/dashboard`

#### Scenario: Sign-in with unverified email
- **WHEN** a user with an unverified email submits the sign-in form with correct email and password
- **THEN** sign-in is denied
- **THEN** they are redirected to `/verify-email-notice`

#### Scenario: Sign-in with incorrect password
- **WHEN** a user submits the sign-in form with an incorrect password
- **THEN** they see a generic error: "Invalid email or password"

#### Scenario: Sign-in with nonexistent email
- **WHEN** a user submits the sign-in form with an email that has no account
- **THEN** they see a generic error: "Invalid email or password"

### Requirement: Sign-up requires minimum password length of 8
The system SHALL require passwords to be at least 8 characters long.

#### Scenario: Password below minimum rejected
- **WHEN** a user enters a password with fewer than 8 characters during sign-up
- **THEN** the system rejects the password with a validation error

### Requirement: Sign-up enforces maximum password length of 128
The system SHALL enforce a maximum password length of 128 characters.

#### Scenario: Password above maximum rejected
- **WHEN** a user enters a password with more than 128 characters during sign-up
- **THEN** the system rejects the password with a validation error

### Requirement: Password hashing uses scrypt
The system SHALL hash passwords using scrypt (BetterAuth's default).

#### Scenario: Password hashed on sign-up
- **WHEN** a user creates an account with a password
- **THEN** the password is hashed using scrypt before storage
- **THEN** the plaintext password is never stored

### Requirement: Sign-in page shows email/password form alongside Google
The system SHALL display the email/password sign-in form on the `/sign-in` page, with a divider between social and credentials sections.

#### Scenario: Sign-in page layout
- **WHEN** an unauthenticated user visits `/sign-in`
- **THEN** they see a "Continue with Google" button
- **THEN** they see a divider labeled "or continue with email"
- **THEN** they see email and password input fields
- **THEN** they see a "Forgot password?" link below the password field
- **THEN** they see a "Don't have an account? Sign up" link

### Requirement: Sign-up page has dedicated route
The system SHALL provide a `/signup` page with name, email, and password fields.

#### Scenario: Sign-up page rendered
- **WHEN** an unauthenticated user visits `/signup`
- **THEN** they see input fields for name, email, and password
- **THEN** they see a submit button labeled "Create account"
- **THEN** they see a "Already have an account? Sign in" link
