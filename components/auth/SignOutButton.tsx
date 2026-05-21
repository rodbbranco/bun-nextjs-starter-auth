"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth/auth-client"
import { Button } from "@/components/ui/button"

export function SignOutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in")
        },
      },
    })
  }

  return <Button onClick={handleLogout}>Logout</Button>
}