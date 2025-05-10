import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    // Check authentication
    const cookieStore = cookies()
    const authToken = cookieStore.get("auth-token")

    if (!authToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const portfolioData = await request.json()

    // In a real app, you would:
    // 1. Validate the portfolio data
    // 2. Save it to a database
    // 3. Return the saved portfolio with an ID

    // For demo purposes, we'll just echo back the data
    return NextResponse.json({
      id: "portfolio-" + Date.now(),
      ...portfolioData,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Portfolio save error:", error)
    return NextResponse.json({ error: "Failed to save portfolio" }, { status: 500 })
  }
}
