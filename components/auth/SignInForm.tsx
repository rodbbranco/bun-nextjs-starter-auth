"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useId } from "react"
import { useForm } from "@tanstack/react-form"
import { Eye, EyeClosed } from "@phosphor-icons/react"

import { authClient } from "@/lib/auth/auth-client"
import { signInSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const emailId = useId()
  const passwordId = useId()

  const resetSuccess = searchParams.get("reset") === "success"

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
          {(field) => (
            <FormItem>
              <FormLabel htmlFor={emailId}>Email</FormLabel>
              <FormControl>
                <Input
                  id={emailId}
                  type="email"
                  autoComplete="email"
                  placeholder="john@example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FormControl>
              <FormMessage>
                {field.state.meta.errors[0] as string | undefined}
              </FormMessage>
            </FormItem>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <FormItem>
              <FormLabel htmlFor={passwordId}>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    id={passwordId}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="pr-10"
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <FormMessage>
                {field.state.meta.errors[0] as string | undefined}
              </FormMessage>
            </FormItem>
          )}
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
