import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"

import { AuthLayout } from "@/components/auth/AuthLayout"
import { SignInForm } from "@/components/auth/SignInForm"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your account to continue.",
}

export default function SignInPage() {
  return (
    <AuthLayout
      title="Welcome"
      description="Sign in to continue"
      footer={
        <div className="flex w-full justify-between text-sm">
          <Link href="/forgot-password" className="text-muted-foreground hover:text-primary">
            Forgot password?
          </Link>
          <Link href="/sign-up" className="text-muted-foreground hover:text-primary">
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <SignInForm />
      </Suspense>
    </AuthLayout>
  )
}
