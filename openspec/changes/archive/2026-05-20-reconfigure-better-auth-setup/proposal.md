## Why

The database layer currently lives in a top-level `db/` directory while the official Better Auth CLI (`bun x auth@latest generate` / `bun x auth@latest migrate`) expects a `drizzle/` structure with generated schema files in `drizzle/schemas/`. Restructuring to match this convention unlocks the ability to use the Better Auth CLI for schema generation and migration management, while keeping the project aligned with the broader Drizzle ecosystem convention.

## What Changes

- Create `drizzle/schemas/auth-schema.ts` — generated auth schema via `bun x auth@latest generate`
- Create `drizzle/db.ts` — Drizzle client instance (moved from `db/index.ts`)
- Create `drizzle/schema.ts` — barrel re-export of `drizzle/schemas/auth-schema.ts`
- Update `drizzle.config.ts` to point schema to `./drizzle/schema.ts`
- Update `lib/auth/auth.ts` imports to use `@/drizzle` instead of `@/db`
- Delete `db/` directory (both `db/index.ts` and `db/schema.ts`)
- Add `db:generate` script for `drizzle-kit generate`
- **BREAKING**: Imports from `@/db` will need to be updated to `@/drizzle`

## Capabilities

### New Capabilities
- `better-auth-cli-setup`: Integration with the Better Auth CLI (`bun x auth@latest`) for schema generation and migration management

### Modified Capabilities
- `db-persistence`: Schema path changes from `db/schema.ts` to `drizzle/schema.ts`; db client path changes from `db/index.ts` to `drizzle/db.ts`

## Impact

- `db/index.ts` — deleted (replaced by `drizzle/db.ts`)
- `db/schema.ts` — deleted (replaced by `drizzle/schemas/auth-schema.ts` and `drizzle/schema.ts`)
- `drizzle/schemas/auth-schema.ts` — new file (generated auth schema)
- `drizzle/db.ts` — new file (Drizzle client instance)
- `drizzle/schema.ts` — new file (barrel re-export)
- `drizzle.config.ts` — update schema path
- `lib/auth/auth.ts` — update import paths
- `package.json` — add `db:generate` script
- `openspec/specs/db-persistence/spec.md` — update file paths in requirements
