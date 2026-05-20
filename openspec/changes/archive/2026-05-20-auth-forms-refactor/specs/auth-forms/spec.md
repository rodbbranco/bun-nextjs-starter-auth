## ADDED Requirements

### Requirement: Sign-in schema validation
The system SHALL validate sign-in form inputs against a `signInSchema` Zod object exported from `lib/validations/auth.ts`. The schema MUST require `email` (valid email string) and `password` (non-empty string with minimum 8 characters). The inferred type `SignInValues` MUST be exported.

#### Scenario: Valid sign-in input passes validation
- **WHEN** the user submits an email in valid format and a password with 8+ characters
- **THEN** validation succeeds and values pass to the sign-in server action

#### Scenario: Invalid email is rejected
- **WHEN** the user submits an email that is not a valid email format
- **THEN** the `FormMessage` displays an appropriate validation error

#### Scenario: Short password is rejected
- **WHEN** the user submits a password with fewer than 8 characters
- **THEN** the `FormMessage` displays an appropriate validation error

### Requirement: Sign-up schema validation with confirmPassword
The system SHALL validate sign-up form inputs against a `signUpSchema` Zod object exported from `lib/validations/auth.ts`. The schema MUST require `name` (non-empty), `email` (valid email), `password` (minimum 8 characters), and `confirmPassword`. A `.refine()` check MUST ensure `confirmPassword === password`. The inferred type `SignUpValues` MUST be exported.

#### Scenario: Valid sign-up input passes validation
- **WHEN** the user submits name, email, valid password, and matching confirmPassword
- **THEN** validation succeeds and values pass to the sign-up server action

#### Scenario: Missing name is rejected
- **WHEN** the user submits an empty name field
- **THEN** the `FormMessage` for name displays a validation error

#### Scenario: Password mismatch is rejected
- **WHEN** the user submits non-matching password and confirmPassword fields
- **THEN** the `FormMessage` displays the refine error message

### Requirement: Shared AuthLayout component
The system SHALL render sign-in and sign-up pages using a shared `AuthLayout` component. The layout SHALL accept `title`, `description`, `children`, and optional `footer` props. It SHALL render a centered card with a branding slot, form content slot, and optional footer link slot.

#### Scenario: Sign-in page renders with AuthLayout
- **WHEN** the user navigates to `/sign-in`
- **THEN** the page renders content wrapped in `AuthLayout` with title, description, and a footer link to sign-up

#### Scenario: Sign-up page renders with AuthLayout
- **WHEN** the user navigates to `/sign-up`
- **THEN** the page renders content wrapped in `AuthLayout` with title, description, and a footer link to sign-in

### Requirement: TanStack Form integration
The system SHALL use `useForm` from `@tanstack/react-form` with `zodValidator` adapter for both sign-in and sign-up forms. Fields SHALL render using shadcn Field Group components: `FormField > FormItem > FormLabel + FormControl + FormMessage`. `FormMessage` SHALL display `field.state.meta.errors[0]`.

#### Scenario: Form field renders with shadcn Field Group
- **WHEN** a form field is rendered
- **THEN** it uses `FormField` with `FormItem`, `FormLabel`, `FormControl`, and `FormMessage` sub-components

#### Scenario: Submit button shows loading state
- **WHEN** the form is submitting
- **THEN** the submit button uses `form.Subscribe` with `['isSubmitting']` selector to display a disabled/loading state

### Requirement: Accessible form fields
All form field `<input>` elements MUST have correct `autoComplete` attributes per field type. All field `id` attributes MUST match their corresponding `FormLabel` `htmlFor` attribute.

#### Scenario: Sign-in field autocomplete attributes
- **WHEN** the sign-in form renders
- **THEN** the email field has `autoComplete="email"` and the password field has `autoComplete="current-password"`

#### Scenario: Sign-up field autocomplete attributes
- **WHEN** the sign-up form renders
- **THEN** name has `autoComplete="name"`, email has `autoComplete="email"`, password has `autoComplete="new-password"`, confirmPassword has `autoComplete="new-password"`

### Requirement: No raw HTML in auth forms
The system SHALL NOT contain raw `<form>`, `<input>`, `<label>`, or `<button>` HTML elements in any auth component file after this change. Validation schemas SHALL NOT be defined inside component files.

#### Scenario: Components use only framework form elements
- **WHEN** inspecting `SignInForm.tsx` and `SignUpForm.tsx`
- **THEN** all form elements are from shadcn/ui or TanStack Form — no raw HTML form tags
