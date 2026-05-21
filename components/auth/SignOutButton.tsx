"use client"

import { authClient } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const SignOutButton = () => {
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

export default SignOutButton