## Why

The current form components (`FormItem`, `FormLabel`, `FormControl`, etc.) use a custom naming scheme that diverges from the shadcn/ui Field component anatomy. This creates inconsistency with shadcn conventions, makes it harder to follow official docs, and limits access to the full Field component family (FieldGroup, FieldSet, FieldLegend, FieldContent, FieldTitle, FieldSeparator).

## What Changes

- Rename all form component exports to match shadcn's Field component API:
  - `FormItem` → `Field`
  - `FormLabel` → `FieldLabel`
  - `FormControl` → `FieldContent`
  - `FormMessage` → `FieldError`
  - `FormDescription` → `FieldDescription`
- Add new Field family components: `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldTitle`, `FieldSeparator`
- Update import paths and usage in `SignInForm.tsx` and `SignUpForm.tsx` to use the new anatomy
- Follow shadcn's TanStack Form integration patterns for validation states (`data-invalid`, `aria-invalid`, `FieldError` with `errors` array)

## Capabilities

### New Capabilities
- `field-component-anatomy`: Field component family matching shadcn/ui Field API, with full support for Field, FieldContent, FieldGroup, FieldSet, FieldLegend, FieldLabel, FieldTitle, FieldSeparator, FieldDescription, and FieldError

### Modified Capabilities
- (none)

## Impact

- `components/ui/form.tsx` — complete rewrite to export shadcn Field family
- `components/auth/SignInForm.tsx` — update imports and component usage
- `components/auth/SignUpForm.tsx` — update imports and component usage
- Removes dependency on `@base-ui/react/field` internal wrappers in favor of direct shadcn-style Field components
