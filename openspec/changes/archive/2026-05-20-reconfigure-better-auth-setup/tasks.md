## 1. Create new drizzle directory structure

- [x] 1.1 Create `drizzle/schemas/` and `drizzle/migrations/` directories
- [x] 1.2 Run `bun x auth@latest generate` to produce `drizzle/schemas/auth-schema.ts`
- [x] 1.3 Create `drizzle/db.ts` with Neon + Drizzle client instance (moved from `db/index.ts`)
- [x] 1.4 Create `drizzle/schema.ts` re-exporting `* from "./schemas/auth-schema"`

## 2. Update configuration and imports

- [x] 2.1 Update `drizzle.config.ts` schema path from `./db/schema.ts` to `./drizzle/schema.ts`
- [x] 2.2 Update `lib/auth/auth.ts` imports from `@/db` to `@/drizzle`
- [x] 2.3 Remove `db/` directory (`db/index.ts` and `db/schema.ts`)

## 3. Add scripts and verify

- [x] 3.1 Add `"db:generate": "drizzle-kit generate"` script to `package.json`
- [x] 3.2 Run `bun run typecheck` to verify no type errors
- [x] 3.3 Run `bun run lint` to verify no lint errors
