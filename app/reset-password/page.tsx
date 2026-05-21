import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"

import { AuthLayout } from "@/components/auth/AuthLayout"
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"

export const metadata: Metadata = {
  title: "Reset password",
  description: "Choose a new password for your account.",
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset password"
      description="Enter your new password"
      footer={
        <Link
          href="/forgot-password"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Back to forgot password
        </Link>
      }
    >
      <Suspense
        fallback={
          <div className="flex min-h-svh items-center justify-center">
            Loading...
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  )
}
