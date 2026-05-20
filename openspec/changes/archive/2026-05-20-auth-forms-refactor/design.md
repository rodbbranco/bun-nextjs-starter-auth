## Context

Current auth forms in this Next.js app use raw HTML `<form>`, `<input>`, `<label>`, and `<button>` elements with no client-side validation schema. Each form component duplicates layout markup (card, branding, footer links). The project already uses shadcn/ui components (FormField, FormItem, FormLabel, FormControl, FormMessage) elsewhere. TanStack Form with Zod validation is the established pattern in the codebase.

## Goals / Non-Goals

**Goals:**
- Eliminate raw HTML form elements from all auth components
- Centralize validation schemas in a single `lib/validations/auth.ts` module
- Share layout structure across sign-in and sign-up via `AuthLayout`
- Use `@tanstack/react-form` with `zodValidator` adapter for all auth forms
- Use shadcn Field Group components for consistent rendering
- Add confirmPassword cross-field validation via Zod `.refine()`

**Non-Goals:**
- Changing server actions, BetterAuth configuration, session logic, or middleware
- Adding new OAuth providers or auth methods
- Modifying routing or page structure beyond the two auth pages
- Adding password strength indicators or other enhanced UX

## Decisions

1. **TanStack Form over React Hook Form** — TanStack Form is already used in other parts of the codebase. Using the same library avoids adding another form dependency and keeps patterns consistent. The `zodValidator` adapter provides first-class Zod integration.

2. **Zod schemas in dedicated module** — Placing all validation schemas in `lib/validations/auth.ts` with exported inferred types (`SignInValues`, `SignUpValues`) keeps schemas testable, reusable, and prevents schema drift between forms.

3. **AuthLayout as a client component** — The layout renders interactive elements (links) and accepts children. Keeping it `"use client"` while wrapping pages that remain Server Components maintains the project's component boundary conventions.

4. **renderField helper in SignUpForm** — The sign-up form has 4 fields vs sign-in's 2 fields. A local `renderField` helper reduces repetition without over-abstracting into a shared generic (which would add complexity for little gain across only two forms).

5. **Form.Subscribe for submit button state** — Using `form.Subscribe` with selector `['isSubmitting']` enables the submit button to show a loading state without unnecessary re-renders of the entire form.

## Risks / Trade-offs

- **Risk**: TanStack Form's `form.Subscribe` API may be unfamiliar to new contributors. **Mitigation**: Keep field rendering patterns identical between the two forms so there's a single pattern to learn.
- **Risk**: Moving validation schemas to a separate module could be overlooked if someone adds a new auth form. **Mitigation**: The schema export is the single import path — any new auth form must import from `lib/validations/auth.ts`.
- **Trade-off**: AuthLayout is `"use client"` which means pages using it lose some static optimization. Acceptable since auth pages are dynamic by nature (session-dependent redirects).
