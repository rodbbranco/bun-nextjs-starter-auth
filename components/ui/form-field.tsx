import * as React from "react"
import type { AnyFieldApi } from "@tanstack/react-form"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

interface FormFieldProps {
  /** The TanStack Form field instance from the `form.Field` render prop */
  field: AnyFieldApi
  /** Label text rendered above the input */
  label: string
  /** `id` of the associated input, used for `htmlFor` */
  htmlFor: string
  /** Optional helper text rendered below the input */
  description?: string
  /** The input element(s) to render */
  children: React.ReactNode
  className?: string
}

/**
 * A wrapper that connects TanStack Form field state to the design-system
 * `Field` / `FieldLabel` / `FieldError` components.
 *
 * Derive `isInvalid`, apply `data-invalid`, and render the error list
 * automatically so individual form fields don't repeat this logic.
 */
export function FormField({
  field,
  label,
  htmlFor,
  description,
  children,
  className,
}: FormFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid} className={className}>
      <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
      <FieldContent>
        {children}
        {description && (
          <FieldDescription>{description}</FieldDescription>
        )}
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </FieldContent>
    </Field>
  )
}
