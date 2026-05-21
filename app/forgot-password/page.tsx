import type { Metadata } from "next"
import Link from "next/link"

import { AuthLayout } from "@/components/auth/AuthLayout"
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset your password by entering your email address.",
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot password"
      description="Enter your email and we&apos;ll send you a reset link"
      footer={
        <Link
          href="/sign-in"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Back to sign in
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
