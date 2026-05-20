import Link from "next/link"

import { AuthLayout } from "@/components/auth/AuthLayout"
import { SignUpForm } from "@/components/auth/SignUpForm"

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create an account"
      description="Sign up to get started"
      footer={
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
          <p className="text-xs text-muted-foreground">
            If you already signed up with Google, use that method instead.
          </p>
        </div>
      }
    >
      <SignUpForm />
    </AuthLayout>
  )
}
