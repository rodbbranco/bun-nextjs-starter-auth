## Context

The current `components/ui/form.tsx` wraps `@base-ui/react/field` primitives and exports a custom naming scheme (`FormItem`, `FormLabel`, `FormControl`, `FormMessage`, `FormDescription`). This diverges from the shadcn/ui Field component anatomy which uses `Field`, `FieldLabel`, `FieldContent`, `FieldError`, `FieldDescription`, `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldTitle`, `FieldSeparator`.

The project already uses `@tanstack/react-form` and `@tanstack/zod-form-adapter`, matching the shadcn TanStack Form integration. The shadcn Field components are built on top of `@base-ui/react/field` with their own styling conventions.

## Goals / Non-Goals

**Goals:**
- Rename all existing form components to match shadcn Field naming conventions
- Add missing Field family components (FieldGroup, FieldSet, FieldLegend, FieldTitle, FieldSeparator)
- Update SignInForm and SignUpForm to use the new anatomy
- Add proper validation state handling (`data-invalid`, `aria-invalid`, `FieldError` with `errors` array)

**Non-Goals:**
- No changes to form validation logic or auth behavior
- No changes to @tanstack/react-form usage patterns
- No changes to other components outside auth forms

## Decisions

- **Remove `@base-ui/react/field` re-exports**: Directly export shadcn-style Field components using the same underlying patterns but with the exact API surface matching shadcn docs
- **Follow shadcn's Field component API exactly**: Use `Field`, `FieldGroup`, `FieldSet`, `FieldContent`, `FieldLabel`, `FieldTitle`, `FieldDescription`, `FieldError`, `FieldLegend`, `FieldSeparator` as the public API
- **Use `FieldError` with `errors` array**: Match shadcn's `FieldError` which accepts an `errors` prop (an array of `{ message?: string }`) — compatible with TanStack Form's `field.state.meta.errors`
- **Use `data-invalid` on `Field`**: Follow shadcn pattern of adding `data-invalid` prop for styling
- **Use `aria-invalid` on inputs**: Follow accessibility best practices from shadcn docs

## Risks / Trade-offs

- [Breaking] All current form imports (`FormItem`, `FormLabel`, etc.) need to be updated — but only affects SignInForm and SignUpForm
- [Low] If any other components import from form.tsx, they'll also need migration. Check before proceeding.
