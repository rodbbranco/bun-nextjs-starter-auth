"use client"

import { useState, useId } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"

import { authClient } from "@/lib/auth/auth-client"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import { FormField } from "@/components/ui/form-field"

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const urlError = searchParams.get("error")

  const [serverError, setServerError] = useState<string | null>(
    urlError === "INVALID_TOKEN"
      ? "This reset link is invalid or has expired. Please request a new one."
      : null
  )

  const passwordId = useId()
  const confirmPasswordId = useId()

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null)

      if (!token) {
        setServerError(
          "No reset token provided. Please use the link from your email."
        )
        return
      }

      const { error } = await authClient.resetPassword({
        newPassword: value.password,
        token,
      })

      if (error) {
        setServerError(error.message || "Something went wrong")
        return
      }

      router.push("/sign-in?reset=success")
    },
  })

  if (!token && !urlError) {
    return (
      <div className="flex w-full flex-col items-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          This password reset link is missing a token. Please request a new one.
        </p>
        <Link href="/forgot-password">
          <Button>Request new link</Button>
        </Link>
      </div>
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
      <form.Field name="password">
        {(field) => (
          <FormField
            field={field}
            label="New password"
            htmlFor={passwordId}
            description="Must be at least 8 characters"
          >
            <PasswordInput
              id={passwordId}
              autoComplete="new-password"
              placeholder="••••••••"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
            />
          </FormField>
        )}
      </form.Field>

      <form.Field name="confirmPassword">
        {(field) => (
          <FormField field={field} label="Confirm password" htmlFor={confirmPasswordId}>
            <PasswordInput
              id={confirmPasswordId}
              autoComplete="new-password"
              placeholder="••••••••"
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
            {isSubmitting ? "Resetting..." : "Reset password"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
