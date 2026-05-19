"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth/auth-client"
import { Button } from "@/components/ui/button"

export default function VerifyEmailNoticePage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleResend = async () => {
    setError(null)
    setSuccess(false)
    setLoading(true)

    const session = await authClient.getSession()
    if (!session.data?.user?.email) {
      setError("No email found. Please sign in again.")
      setLoading(false)
      return
    }

    const { error: resendError } = await authClient.sendVerificationEmail({
      email: session.data.user.email,
      callbackURL: "/dashboard",
    })

    setLoading(false)

    if (resendError) {
      setError(resendError.message || "Failed to resend verification email")
      return
    }

    setSuccess(true)
  }

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium">Check your inbox</h1>
          <p className="text-sm text-muted-foreground">
            We sent you a verification email. Please click the link in the email to verify your
            account.
          </p>
        </div>
        <Button onClick={handleResend} disabled={loading} variant="outline">
          {loading ? "Sending..." : "Resend verification email"}
        </Button>
        {success && (
          <p className="text-sm text-green-600">Verification email sent! Check your inbox.</p>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        <a href="/sign-in" className="text-sm text-muted-foreground hover:text-primary">
          Back to sign in
        </a>
      </div>
    </div>
  )
}
