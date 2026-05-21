import { requireAuth } from "@/lib/auth/helpers"
import SignOutButton from "@/components/auth/signOutButton"

export default async function DashboardPage() {
  const session = await requireAuth()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6">
      <div className="flex max-w-md flex-col gap-4 text-center">
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          You are signed in as{" "}
          <span className="font-medium">{session.user.email}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Authentication is working correctly.
        </p>
        <SignOutButton />
      </div>
    </div>
  )
}
