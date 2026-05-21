## 1. Create Field Component Family

- [x] 1.1 Create `components/ui/field.tsx` exporting all Field family components (`Field`, `FieldContent`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldLabel`, `FieldLegend`, `FieldSeparator`, `FieldSet`, `FieldTitle`) matching shadcn/ui Field API
- [x] 1.2 Remove or deprecate old `components/ui/form.tsx` — replace with re-exports from field.tsx for backward compat (update consumers to use field.tsx directly)

## 2. Update SignInForm

- [x] 2.1 Update imports to use Field components from `@/components/ui/field`
- [x] 2.2 Replace `FormItem` with `Field` (with `data-invalid` on validation error)
- [x] 2.3 Replace `FormLabel` with `FieldLabel`
- [x] 2.4 Replace `FormControl` with `FieldContent`
- [x] 2.5 Replace `FormMessage` with `FieldError` using `errors` array pattern
- [x] 2.6 Add `aria-invalid` to inputs when validation fails

## 3. Update SignUpForm

- [x] 3.1 Update imports to use Field components from `@/components/ui/field`
- [x] 3.2 Replace `FormItem` with `Field` (with `data-invalid` on validation error)
- [x] 3.3 Replace `FormLabel` with `FieldLabel`
- [x] 3.4 Replace `FormControl` with `FieldContent`
- [x] 3.5 Replace `FormMessage` with `FieldError` using `errors` array pattern
- [x] 3.6 Replace `FormDescription` with `FieldDescription` (already used for password hint)
- [x] 3.7 Add `aria-invalid` to inputs when validation fails

## 4. Verify

- [x] 4.1 Run `npm run typecheck` to verify TypeScript compiles
- [x] 4.2 Run `npm run build` to verify build succeeds
