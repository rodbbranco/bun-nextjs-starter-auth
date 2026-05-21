## ADDED Requirements

### Requirement: Exported Field component family
The system SHALL export Field component family from `@/components/ui/field` matching shadcn/ui Field API.

#### Scenario: Field components are exported
- **WHEN** importing from `@/components/ui/field`
- **THEN** the following components SHALL be available: `Field`, `FieldContent`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldLabel`, `FieldLegend`, `FieldSeparator`, `FieldSet`, `FieldTitle`

### Requirement: Field component renders with data-invalid prop
The `Field` component SHALL accept a `data-invalid` prop to indicate validation error state.

#### Scenario: Field with data-invalid
- **WHEN** `data-invalid` is `true` on `Field`
- **THEN** the Field component SHALL apply error styling to its children

### Requirement: FieldError displays validation errors
The `FieldError` component SHALL accept an `errors` prop as an array of `{ message?: string } | undefined` and render the first error message.

#### Scenario: FieldError with errors array
- **WHEN** FieldError receives `errors={[{ message: "Required" }]}`
- **THEN** it SHALL render "Required"

#### Scenario: FieldError with single error
- **WHEN** FieldError receives a child string
- **THEN** it SHALL render that string

### Requirement: SignInForm uses Field anatomy
The SignInForm component SHALL use the new Field component family with proper validation state handling.

#### Scenario: SignInForm renders with Field components
- **WHEN** SignInForm renders email and password fields
- **THEN** each field SHALL use `Field`, `FieldLabel`, `FieldContent`, `FieldError` components matching shadcn TanStack Form patterns
- **AND** inputs SHALL have `aria-invalid` when validation fails
- **AND** Fields SHALL have `data-invalid` when validation fails

### Requirement: SignUpForm uses Field anatomy
The SignUpForm component SHALL use the new Field component family with proper validation state handling.

#### Scenario: SignUpForm renders with Field components
- **WHEN** SignUpForm renders name, email, password, and confirmPassword fields
- **THEN** each field SHALL use `Field`, `FieldLabel`, `FieldContent`, `FieldDescription`, `FieldError` components matching shadcn TanStack Form patterns
- **AND** inputs SHALL have `aria-invalid` when validation fails
- **AND** Fields SHALL have `data-invalid` when validation fails
