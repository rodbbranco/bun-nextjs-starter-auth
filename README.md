# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## Database Setup with Drizzle & NeonDB

This project uses [Drizzle ORM](https://orm.drizzle.team/) with [Neon](https://neon.tech/) as the PostgreSQL database provider.

### Prerequisites

1. Create a free account at [Neon](https://neon.tech/)
2. Create a new project and copy the connection string

### Configuration

1. Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

2. Add your Neon database connection string to `.env.local`:

```env
DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"
```

### Pushing Tables to NeonDB

To create/update tables in your Neon database based on your schema:

```bash
bun run db:push
```

This will push your schema defined in `db/schema.ts` directly to Neon without creating migration files.

### Alternative: Using Migrations

If you prefer to use migrations instead of `db:push`:

```bash
# Generate a new migration file
bun run db:generate

# Apply migrations to the database
bun run db:migrate
```
