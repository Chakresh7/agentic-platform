import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Store user in database
    // 4. Generate a JWT or session token
    // 5. Set secure HTTP-only cookies

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
        id: "user-" + Date.now(),
        name,
        email,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Account creation failed" }, { status: 500 })
  }
}
