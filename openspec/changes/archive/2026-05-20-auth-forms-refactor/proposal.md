## Why

Current auth forms use raw HTML tags with no schema validation and no shared structure. This creates duplication, inconsistent UX, and makes future changes error-prone. Refactoring to use shadcn Field Group components, TanStack Form, and Zod will give us type-safe validation, reusable UI patterns, and a consistent auth experience.

## What Changes

- Extract Zod validation schemas into a dedicated `lib/validations/auth.ts` module
- Create a shared `AuthLayout` component wrapping sign-in and sign-up in a centered card shell
- Rewrite `SignInForm` using `@tanstack/react-form` with `zodValidator` and shadcn Field Group components
- Rewrite `SignUpForm` using the same pattern with confirmPassword validation
- Update `sign-in/page.tsx` and `sign-up/page.tsx` to use `AuthLayout`
- Remove all raw HTML form elements from auth components

## Capabilities

### New Capabilities
- `auth-forms`: Auth form validation and UI patterns — Zod schemas, TanStack Form integration, shadcn Field Group rendering, and shared layout for sign-in/sign-up pages

### Modified Capabilities
- *(none — no existing specs are changing)*

## Impact

- **Code**: `components/auth/SignInForm.tsx`, `components/auth/SignUpForm.tsx`, `app/(auth)/sign-in/page.tsx`, `app/(auth)/sign-up/page.tsx` — modified
- **New files**: `components/auth/AuthLayout.tsx`, `lib/validations/auth.ts`
- **Dependencies**: Adds `@tanstack/react-form` with `zodValidator` adapter
- **No impact on**: Server actions, BetterAuth config, session logic, middleware, routing
