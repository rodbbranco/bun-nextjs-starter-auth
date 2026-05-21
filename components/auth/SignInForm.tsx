"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useId, useEffect } from "react"
import { useForm } from "@tanstack/react-form"
import { Eye, EyeClosed } from "@phosphor-icons/react"

import { authClient } from "@/lib/auth/auth-client"
import { signInSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field"

const oauthErrorMessages: Record<string, string> = {
  account_not_linked:
    "This email is already registered. Sign in with email and password, or use the same Google account.",
}

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const emailId = useId()
  const passwordId = useId()

  const resetSuccess = searchParams.get("reset") === "success"

  useEffect(() => {
    const error = searchParams.get("error")
    if (error) {
      setServerError(oauthErrorMessages[error] || "Sign in with Google failed. Please try again or use email/password.")
      const params = new URLSearchParams(searchParams.toString())
      params.delete("error")
      router.replace(`?${params.toString()}`)
    }
  }, [searchParams, router])

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
        <p className="text-sm text-green-600">Password reset successfully. Please sign in.</p>
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
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={emailId}>Email</FieldLabel>
                <Input
                  id={emailId}
                  type="email"
                  autoComplete="email"
                  placeholder="john@example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="password">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={passwordId}>Password</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Input
                      id={passwordId}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pr-10"
                      aria-invalid={isInvalid}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
              </Field>
            )
          }}
        </form.Field>

        {serverError && <p className="text-sm text-destructive">{serverError}</p>}

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
