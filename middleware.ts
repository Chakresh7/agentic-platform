import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // For development purposes, we'll create a mock auth token if it doesn't exist
  const authToken = request.cookies.get("auth-token")
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/portfolio-builder", "/resume-builder", "/team-finder", "/projects", "/news"]
  
  // DEVELOPMENT MODE: Allow access to all routes without authentication
  // In production, you would uncomment the code below
  /*
  // Check if the route is protected and user is not authenticated
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !authToken) {
    // Redirect to landing page
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If user is authenticated and trying to access landing page, redirect to dashboard
  if (pathname === "/" && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }
  */
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (they handle their own auth)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
}
