"use client"

import { useState, useId } from "react"
import Link from "next/link"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"

import { authClient } from "@/lib/auth/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/ui/form-field"
import { AuthLayout } from "@/components/auth/AuthLayout"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export function ForgotPasswordForm() {
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const emailId = useId()

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null)
      const { error } = await authClient.requestPasswordReset({
        email: value.email,
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      })

      if (error) {
        setServerError(error.message || "Something went wrong")
        return
      }

      setSuccess(true)
    },
  })

  if (success) {
    return (
      <AuthLayout
        title="Check your email"
        description="If an account with that email exists, a reset link has been sent."
        footer={
          <Link href="/sign-in">
            <Button variant="outline">Back to sign in</Button>
          </Link>
        }
      />
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex w-full flex-col gap-4"
    >
      <form.Field name="email">
        {(field) => (
          <FormField field={field} label="Email" htmlFor={emailId}>
            <Input
              id={emailId}
              type="email"
              autoComplete="email"
              placeholder="john@example.com"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
            />
          </FormField>
        )}
      </form.Field>

      {serverError && (
        <p className="text-sm text-destructive">{serverError}</p>
      )}

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send reset link"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
