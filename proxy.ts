import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

const PROTECTED_ROUTES = ["/dashboard", "/app", "/account"]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = getSessionCookie(request)

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (isProtectedRoute && !sessionCookie) {
    const loginUrl = new URL("/sign-in", request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Missing: redirect authenticated users away from auth pages
  const AUTH_ROUTES = [
    "/sign-in",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email-notice",
  ]

  if (AUTH_ROUTES.some((r) => pathname.startsWith(r)) && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/app/:path*",
    "/account/:path*",
    "/sign-in",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email-notice",
    "/auth/:path*",
  ],
}
