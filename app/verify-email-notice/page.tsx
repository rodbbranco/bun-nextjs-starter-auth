"use client"

import type { Metadata } from "next"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth/auth-client"
import { Button } from "@/components/ui/button"
import { AuthLayout } from "@/components/auth/AuthLayout"
import Link from "next/link"

// Note: metadata cannot be exported from client components.
// To add metadata, convert this to a server component shell + client component.
// See the pattern used in sign-in/page.tsx for reference.

export default function VerifyEmailNoticePage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  // Store session data from the initial check to avoid a second network call on resend
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data?.user?.emailVerified) {
        router.push("/dashboard")
        return
      }
      // Cache the email so handleResend doesn't need another getSession() call
      if (session.data?.user?.email) {
        setUserEmail(session.data.user.email)
      }
    })
  }, [router])

  const handleResend = async () => {
    setError(null)
    setSuccess(false)
    setLoading(true)

    const email = userEmail
    if (!email) {
      setError("No email found. Please sign in again.")
      setLoading(false)
      return
    }

    const { error: resendError } = await authClient.sendVerificationEmail({
      email,
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
    <AuthLayout
      title="Check your inbox"
      description="We sent you a verification email. Please click the link in the email to verify your account."
      footer={
        <Link href="/sign-in" className="text-sm text-muted-foreground hover:text-primary">
          Back to sign in
        </Link>
      }
    >
      <Button onClick={handleResend} disabled={loading} variant="outline">
        {loading ? "Sending..." : "Resend verification email"}
      </Button>
      {success && (
        <p className="text-sm text-green-600">
          Verification email sent! Check your inbox.
        </p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </AuthLayout>
  )
}
