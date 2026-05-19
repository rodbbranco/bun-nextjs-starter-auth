"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { authClient } from "@/lib/auth/auth-client"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const urlError = searchParams.get("error")
  const initialError = urlError === "INVALID_TOKEN"
    ? "This reset link is invalid or has expired. Please request a new one."
    : null
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(initialError)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!token) {
      setError("No reset token provided. Please use the link from your email.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setLoading(true)

    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    })

    setLoading(false)

    if (resetError) {
      setError(resetError.message || "Something went wrong")
      return
    }

    router.push("/sign-in?reset=success")
  }

  if (!token && !urlError) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium">Invalid link</h1>
            <p className="text-sm text-muted-foreground">
              This password reset link is missing a token. Please request a new one.
            </p>
          </div>
          <a href="/forgot-password">
            <Button>Request new link</Button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium">Reset password</h1>
          <p className="text-sm text-muted-foreground">Enter your new password</p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              New password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              maxLength={128}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="••••••••"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              maxLength={128}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Resetting..." : "Reset password"}
          </Button>
        </form>
        <a href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
          Back to forgot password
        </a>
      </div>
    </div>
  )
}
