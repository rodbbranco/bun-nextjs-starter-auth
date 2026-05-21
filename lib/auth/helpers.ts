import { auth } from "@/lib/auth/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export async function getSession() {

  return await auth.api.getSession({
    headers: await headers(),
  })
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect("/sign-in")
  }
  if (!session.user.emailVerified) {
    redirect("/verify-email-notice")
  }
  return session
}

/**
 * Higher-order function that wraps an App Router route handler with
 * session authentication. Returns a standard Web `Response` (401) when
 * no session is found, and calls `handler` with the resolved session.
 *
 * @example
 * // app/api/protected/route.ts
 * import { withAuth } from "@/lib/auth/helpers"
 *
 * export const GET = withAuth(async (_request, { session }) => {
 *   return Response.json({ userId: session.user.id })
 * })
 */
export function withAuth(
  handler: (
    request: Request,
    context: { session: NonNullable<Awaited<ReturnType<typeof getSession>>> }
  ) => Response | Promise<Response>
) {
  return async (request: Request): Promise<Response> => {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }
    return handler(request, { session })
  }
}
