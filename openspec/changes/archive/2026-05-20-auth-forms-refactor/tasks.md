## 1. Validation Schemas

- [x] 1.1 Create `lib/validations/auth.ts` with `signInSchema` (email, password min 8 chars) and `signUpSchema` (name, email, password min 8 chars, confirmPassword with `.refine()` match check)
- [x] 1.2 Export inferred types `SignInValues` and `SignUpValues` from the validation module

## 2. Shared Layout

- [x] 2.1 Create `components/auth/AuthLayout.tsx` as a `"use client"` component accepting `title`, `description`, `children`, and optional `footer`
- [x] 2.2 Render centered card shell with branding slot, form slot, and optional footer link slot

## 3. Sign-In Form Refactor

- [x] 3.1 Replace raw HTML in `components/auth/SignInForm.tsx` with `useForm` from `@tanstack/react-form` using `zodValidator` and `signInSchema`
- [x] 3.2 Render email and password fields using shadcn `FormField > FormItem > FormLabel + FormControl + FormMessage` pattern
- [x] 3.3 Wire `FormMessage` to `field.state.meta.errors[0]` and submit button to `form.Subscribe` with `['isSubmitting']`
- [x] 3.4 Set correct `autoComplete` attributes (email, current-password) and wire existing sign-in server action in `onSubmit`

## 4. Sign-Up Form Refactor

- [x] 4.1 Replace raw HTML in `components/auth/SignUpForm.tsx` with `useForm` from `@tanstack/react-form` using `zodValidator` and `signUpSchema`
- [x] 4.2 Extract local `renderField` helper and render name, email, password, confirmPassword fields using shadcn Field Group components
- [x] 4.3 Wire `FormMessage` to `field.state.meta.errors[0]` and submit button to `form.Subscribe` with `['isSubmitting']`
- [x] 4.4 Set correct `autoComplete` attributes (name, email, new-password, new-password) and wire existing sign-up server action in `onSubmit`

## 5. Page Updates

- [x] 5.1 Update `app/(auth)/sign-in/page.tsx` to wrap `SignInForm` in `AuthLayout` with title, description, and footer link to sign-up
- [x] 5.2 Update `app/(auth)/sign-up/page.tsx` to wrap `SignUpForm` in `AuthLayout` with title, description, and footer link to sign-in

## 6. Cleanup & Verification

- [x] 6.1 Verify no raw HTML form elements remain in any auth component file
- [x] 6.2 Verify all field `id`s match their `FormLabel` `htmlFor` attributes for accessibility
- [x] 6.3 Run type-check and lint to confirm no regressions
