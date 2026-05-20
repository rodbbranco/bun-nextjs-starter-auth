"use client"

import { useRouter } from "next/navigation"
import { useState, useId } from "react"
import { useForm } from "@tanstack/react-form"
import { Eye, EyeSlash } from "@phosphor-icons/react"

import { authClient } from "@/lib/auth/auth-client"
import { signUpSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"

export function SignUpForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const confirmPasswordId = useId()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null)
      const { data, error } = await authClient.signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
        callbackURL: "/dashboard",
      })

      if (error) {
        setServerError(error.message || "Something went wrong")
        return
      }

      if (data) {
        router.push("/verify-email-notice")
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex w-full flex-col gap-4"
    >
      <form.Field name="name">
        {(field) => (
          <FormItem>
            <FormLabel htmlFor={nameId}>Name</FormLabel>
            <FormControl>
              <Input
                id={nameId}
                autoComplete="name"
                placeholder="John Doe"
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
                  autoComplete="new-password"
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
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <FormDescription>Must be at least 8 characters</FormDescription>
            <FormMessage>
              {field.state.meta.errors[0] as string | undefined}
            </FormMessage>
          </FormItem>
        )}
      </form.Field>

      <form.Field name="confirmPassword">
        {(field) => (
          <FormItem>
            <FormLabel htmlFor={confirmPasswordId}>Confirm Password</FormLabel>
            <FormControl>
              <Input
                id={confirmPasswordId}
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
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

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
