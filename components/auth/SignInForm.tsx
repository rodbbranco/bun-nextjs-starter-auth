"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useId, useEffect } from "react"
import { useForm } from "@tanstack/react-form"

import { authClient } from "@/lib/auth/auth-client"
import { signInSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { FormField } from "@/components/ui/form-field"

const oauthErrorMessages: Record<string, string> = {
  account_not_linked:
    "This email is already registered. Sign in with email and password, or use the same Google account.",
}

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // Derive the initial OAuth error message directly from searchParams so we
  // never need to call setState inside an effect body.
  const oauthErrorParam = searchParams.get("error")
  const initialError = oauthErrorParam
    ? (oauthErrorMessages[oauthErrorParam] ||
        "Sign in with Google failed. Please try again or use email/password.")
    : null

  const [serverError, setServerError] = useState<string | null>(initialError)
  const emailId = useId()
  const passwordId = useId()

  const resetSuccess = searchParams.get("reset") === "success"

  // Side-effect only: clean the ?error= param from the URL without causing a
  // re-render loop. No setState here — the error message is already in state.
  useEffect(() => {
    if (!oauthErrorParam) return
    const params = new URLSearchParams(searchParams.toString())
    params.delete("error")
    router.replace(`?${params.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally run once on mount only

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null)
      const { data, error } = await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onError: (ctx) => {
            if (ctx.error.status === 403) {
              router.push("/verify-email-notice")
            }
          },
        }
      )

      if (error) {
        setServerError(error.message || "Invalid email or password")
        return
      }

      if (data) {
        router.push("/dashboard")
      }
    },
  })

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    })
  }

  return (
    <>
      {resetSuccess && (
        <p className="text-sm text-green-600">
          Password reset successfully. Please sign in.
        </p>
      )}

      <Button onClick={handleGoogleSignIn} className="w-full">
        Continue with Google
      </Button>

      <div className="flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or continue with email</span>
        <div className="h-px flex-1 bg-border" />
      </div>

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

        <form.Field name="password">
          {(field) => (
            <FormField field={field} label="Password" htmlFor={passwordId}>
              <PasswordInput
                id={passwordId}
                autoComplete="current-password"
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
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </>
  )
}
