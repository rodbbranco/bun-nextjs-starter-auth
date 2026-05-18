import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PROTECTED_ROUTES = ["/dashboard", "/app", "/account"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get("better-auth.session_token")

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  const isLoginPage = pathname === "/sign-in"

  if (isProtectedRoute && !sessionCookie) {
    const loginUrl = new URL("/sign-in", request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (isLoginPage && sessionCookie) {
    const dashboardUrl = new URL("/dashboard", request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/app/:path*", "/account/:path*", "/sign-in"],
}
