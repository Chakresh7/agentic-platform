import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUser() {
  const cookieStore = cookies()
  const authToken = cookieStore.get("auth-token")

  if (!authToken) {
    return null
  }

  // In a real app, you would:
  // 1. Verify the token (JWT verification)
  // 2. Fetch user data from database

  // For demo purposes, we'll return a mock user
  return {
    id: "user-123",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  }
}

export async function requireAuth() {
  const user = await getUser()

  if (!user) {
    redirect("/")
  }

  return user
}
