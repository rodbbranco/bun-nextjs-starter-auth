# db-persistence Specification (Delta)

## MODIFIED Requirements

### Requirement: Database schema defined for all auth tables
The system SHALL define Drizzle schema for the `user`, `session`, `account`, and `verification` tables as required by BetterAuth. The schema SHALL be located at `drizzle/schemas/auth-schema.ts` and re-exported through `drizzle/schema.ts`.

#### Scenario: All tables exist in schema
- **WHEN** the `drizzle/schemas/auth-schema.ts` file is read
- **THEN** it contains table definitions for `user`, `session`, `account`, and `verification`
- **THEN** each table has the columns expected by BetterAuth's Drizzle adapter
- **WHEN** the `drizzle/schema.ts` file is read
- **THEN** it re-exports all tables from `drizzle/schemas/auth-schema.ts`

### Requirement: Drizzle client exported
The system SHALL export a configured Drizzle client instance from `drizzle/db.ts` using the Neon HTTP driver.

#### Scenario: Drizzle client configured
- **WHEN** `drizzle/db.ts` is imported
- **THEN** it exports a Drizzle client connected via `@neondatabase/serverless` with `DATABASE_URL` environment variable

### Requirement: drizzle.config.ts exists
The system SHALL have a `drizzle.config.ts` file pointing to `DATABASE_URL` for schema and migrations.

#### Scenario: drizzle.config configured
- **WHEN** `drizzle.config.ts` is read
- **THEN** it specifies the schema path (`drizzle/schema.ts`)
- **THEN** it uses `DATABASE_URL` environment variable for the connection
- **THEN** it uses `drizzle-orm/neon-http` driver

### Requirement: Scripts for db push, generate, and migrate
The `package.json` SHALL include `db:push`, `db:generate`, and `db:migrate` scripts.

#### Scenario: Scripts available
- **WHEN** `package.json` scripts are inspected
- **THEN** `db:push` script exists (runs `drizzle-kit push`)
- **THEN** `db:generate` script exists (runs `drizzle-kit generate`)
- **THEN** `db:migrate` script exists (runs `drizzle-kit migrate`)
