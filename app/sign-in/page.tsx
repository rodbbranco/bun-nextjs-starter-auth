"use client"

import { authClient } from "@/lib/auth/auth-client"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    })
  }

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium">Welcome</h1>
          <p className="text-sm text-muted-foreground">Sign in to continue</p>
        </div>
        <Button onClick={handleSignIn} className="w-full">
          Continue with Google
        </Button>
      </div>
    </div>
  )
}
