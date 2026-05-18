import { auth } from "@/lib/auth/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect("/sign-in")
  }
  return session
}

export async function withAuth(handler: (request: Request, context: { session: NonNullable<Awaited<ReturnType<typeof getSession>>> }) => Response | Promise<Response>) {
  return async (request: Request) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    return handler(request, { session })
  }
}
