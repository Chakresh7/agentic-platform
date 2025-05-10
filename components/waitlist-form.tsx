"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { UserService } from "@/services/user-service"
import { Loader2 } from "lucide-react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await UserService.storeInterest(email, name)
      if (response.success) {
        toast({
          title: "Success!",
          description: "Thank you for joining our waitlist. We'll be in touch soon!",
        })
        setSubmitted(true)
        // Reset form
        setEmail("")
        setName("")
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to join waitlist. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting waitlist form:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {submitted ? (
        <div className="text-center space-y-4">
          <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">You're on the list!</h3>
          <p className="text-muted-foreground">
            We'll notify you when we're ready to launch. Thank you for your interest!
          </p>
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Join with another email
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Join Waitlist
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            We'll never share your information with third parties.
          </p>
        </form>
      )}
    </div>
  )
}
