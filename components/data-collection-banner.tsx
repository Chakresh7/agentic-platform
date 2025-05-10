"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { UserService } from "@/services/user-service"
import { X } from "lucide-react"

export function DataCollectionBanner() {
  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(true)
  const [loading, setLoading] = useState(false)
  
  // Check if banner was previously closed
  useState(() => {
    if (typeof window !== "undefined") {
      const bannerClosed = localStorage.getItem("dataBannerClosed")
      if (bannerClosed) {
        setIsVisible(false)
      }
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await UserService.storeInterest(email)
      if (response.success) {
        toast({
          title: "Success!",
          description: "Thank you for your interest!",
        })
        // Close banner after successful submission
        setIsVisible(false)
        if (typeof window !== "undefined") {
          localStorage.setItem("dataBannerClosed", "true")
        }
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to submit. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting email:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    if (typeof window !== "undefined") {
      localStorage.setItem("dataBannerClosed", "true")
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm md:text-base font-medium">
            Be the first to know when we launch! Sign up for early access.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Auto-submit when a valid email is entered
              if (e.target.value.includes('@') && e.target.value.includes('.')) {
                const timer = setTimeout(() => {
                  handleSubmit(new Event('submit') as any);
                }, 1000);
                return () => clearTimeout(timer);
              }
            }}
            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70 w-full md:w-auto"
          />
        </form>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleClose}
          className="absolute top-2 right-2 md:relative md:top-0 md:right-0 hover:bg-primary-foreground/10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  )
}
