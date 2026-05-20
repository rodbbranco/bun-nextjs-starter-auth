## Context

The database layer is currently split across two locations:
- `db/index.ts` — Drizzle client instance (Neon HTTP driver)
- `db/schema.ts` — Auth table definitions (user, session, account, verification, rateLimit)

The official Better Auth CLI (`bun x auth@latest`) generates schema files into `drizzle/schemas/auth-schema.ts` and expects migrations in `drizzle/migrations/`. The project needs to adopt this convention to benefit from CLI-driven schema generation and migration management, while also matching the standard Drizzle project layout.

## Goals / Non-Goals

**Goals:**
- Restructure database files into `drizzle/` directory convention
- Enable `bun x auth@latest generate` to output to `drizzle/schemas/auth-schema.ts`
- Enable `bun x auth@latest migrate` to manage `drizzle/migrations/`
- Keep the same Drizzle client configuration (Neon HTTP driver)
- Update all import paths to point to the new `drizzle/` location

**Non-Goals:**
- No changes to the auth schema table definitions themselves
- No changes to Better Auth server or client configuration beyond import paths
- No changes to authentication behavior or providers
- No migration of existing data

## Decisions

1. **Centralized schema re-export**: `drizzle/schema.ts` acts as a barrel re-export of `drizzle/schemas/auth-schema.ts`. This decouples the import path (`@/drizzle`) from the generated file name (`auth-schema.ts`), keeping import paths stable if the generated schema file is renamed or split.
2. **Db instance stays hand-written**: `drizzle/db.ts` is manually maintained (not generated) to keep the Neon + Drizzle configuration explicit and version-controlled.
3. **drizzle.config.ts updated**: Schema path changes from `./db/schema.ts` to `./drizzle/schema.ts` so both `drizzle-kit` and Better Auth CLI resolve the correct schema.
4. **Barrel import pattern**: Both `drizzle/db.ts` and `drizzle/schema.ts` are importable from the same `@/drizzle` path (Next.js path alias). The `db` export lives in `drizzle/db.ts` and schemas in `drizzle/schema.ts`, matching the existing pattern of separations of concerns.

## Risks / Trade-offs

- [Risk: Broken imports if `@/db` is used elsewhere] → Mitigation: grep confirmed only `lib/auth/auth.ts` imports from `@/db`; typecheck will catch any missed references
- [Risk: Generated schema differs from current hand-written schema] → Mitigation: run `bun x auth@latest generate` first, diff against current `db/schema.ts`, adjust manually if needed
- [Trade-off: More nested directory structure] → Acceptable; aligns with community convention and Better Auth CLI expectations
