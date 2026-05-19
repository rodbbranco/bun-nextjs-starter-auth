# db-persistence Specification

## Purpose
TBD - created by archiving change add-better-auth. Update Purpose after archive.
## Requirements
### Requirement: Database schema defined for all auth tables
The system SHALL define Drizzle schema for the `user`, `session`, `account`, and `verification` tables as required by BetterAuth.

#### Scenario: All tables exist in schema
- **WHEN** the `db/schema.ts` file is read
- **THEN** it contains table definitions for `user`, `session`, `account`, and `verification`
- **THEN** each table has the columns expected by BetterAuth's Drizzle adapter

### Requirement: User table schema
The `user` table SHALL contain: `id`, `name`, `email`, `emailVerified`, `image`, `createdAt`, `updatedAt`.

#### Scenario: User table columns
- **WHEN** the `user` table definition is inspected
- **THEN** it has columns: `id`, `name`, `email`, `emailVerified`, `image`, `createdAt`, `updatedAt`

### Requirement: Session table schema
The `session` table SHALL contain: `id`, `userId`, `token`, `expiresAt`, `ipAddress`, `userAgent`, `createdAt`, `updatedAt`.

#### Scenario: Session table columns
- **WHEN** the `session` table definition is inspected
- **THEN** it has columns: `id`, `userId`, `token`, `expiresAt`, `ipAddress`, `userAgent`, `createdAt`, `updatedAt`
- **THEN** `userId` references the `user` table

### Requirement: Account table schema
The `account` table SHALL contain: `id`, `userId`, `accountId`, `providerId`, `accessToken`, `refreshToken`, `expiresAt`, and other standard fields.

#### Scenario: Account table columns
- **WHEN** the `account` table definition is inspected
- **THEN** it has columns for `id`, `userId`, `accountId`, `providerId`, `accessToken`, `refreshToken`, `expiresAt`
- **THEN** `userId` references the `user` table

### Requirement: Verification table schema
The `verification` table SHALL contain: `id`, `identifier`, `value`, `expiresAt`, `createdAt`, `updatedAt`.

#### Scenario: Verification table columns
- **WHEN** the `verification` table definition is inspected
- **THEN** it has columns: `id`, `identifier`, `value`, `expiresAt`, `createdAt`, `updatedAt`

### Requirement: Drizzle client exported
The system SHALL export a configured Drizzle client instance from `db/index.ts` using the Neon HTTP driver.

#### Scenario: Drizzle client configured
- **WHEN** `db/index.ts` is imported
- **THEN** it exports a Drizzle client connected via `@neondatabase/serverless` with `DATABASE_URL` environment variable

### Requirement: drizzle.config.ts exists
The system SHALL have a `drizzle.config.ts` file pointing to `DATABASE_URL` for schema and migrations.

#### Scenario: drizzle.config configured
- **WHEN** `drizzle.config.ts` is read
- **THEN** it specifies the schema path (`db/schema.ts`)
- **THEN** it uses `DATABASE_URL` environment variable for the connection
- **THEN** it uses `drizzle-orm/neon-http` driver

### Requirement: Scripts for db push and migrate
The `package.json` SHALL include `db:push` and `db:migrate` scripts.

#### Scenario: Scripts available
- **WHEN** `package.json` scripts are inspected
- **THEN** `db:push` script exists (runs `drizzle-kit push`)
- **THEN** `db:migrate` script exists (runs `drizzle-kit migrate`)

