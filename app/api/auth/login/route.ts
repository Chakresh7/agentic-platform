import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// This would typically use a database to verify credentials
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // In a real app, you would validate against a database
    // For demo purposes, we'll accept any login with valid format
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Simulate successful login
    // In a real app, you would:
    // 1. Verify credentials against database
    // 2. Generate a JWT or session token
    // 3. Set secure HTTP-only cookies

    // Set a simple auth cookie for demo purposes
    const cookieStore = cookies()
    cookieStore.set("auth-token", "demo-token-" + Date.now(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Return user info (excluding sensitive data)
    return NextResponse.json({
      user: {
        id: "user-123",
        email,
        name: "John Doe",
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
