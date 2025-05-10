"use client"

import { useEffect } from "react"

export default function LogoutPage() {
  useEffect(() => {
    // Function to handle logout process
    const handleLogout = () => {
      try {
        // Clear user data from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("currentUser")
          
          // Add any additional logout logic here (e.g., clearing cookies, tokens, etc.)
          // For example, if using Supabase:
          // await supabase.auth.signOut()
          
          // Use direct navigation to ensure redirection works
          // Set a short timeout to ensure the localStorage is cleared first
          setTimeout(() => {
            window.location.href = "/"
          }, 100)
        }
      } catch (error) {
        console.error("Logout error:", error)
        // Ensure redirection happens even if there's an error
        window.location.href = "/"
      }
    }

    // Execute logout function
    handleLogout()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center p-6 rounded-lg border border-border bg-card shadow-md">
        <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
        <p className="text-muted-foreground">You are being redirected to the landing page.</p>
      </div>
    </div>
  )
}
