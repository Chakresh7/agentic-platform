"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function PortfolioForm({ initialData = {} }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    sections: initialData.sections || [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/portfolio/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to save portfolio")
      }

      const data = await response.json()

      toast({
        title: "Portfolio saved",
        description: "Your portfolio has been saved successfully.",
      })

      // Redirect or update UI
      router.refresh()
    } catch (error) {
      console.error("Portfolio save error:", error)
      toast({
        title: "Error",
        description: "Failed to save portfolio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input name="title" placeholder="Portfolio Title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Textarea
          name="description"
          placeholder="Portfolio Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      {/* More form fields would go here */}

      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Portfolio
      </Button>
    </form>
  )
}
