"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Loader2, Send, Sparkles, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

type AgentState = "idle" | "collecting" | "processing" | "suggesting" | "implementing" | "revising"

export default function AIAgentInterface({ onApplyChanges }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "I'm your AI portfolio assistant. I can help you build and improve your portfolio. What would you like to do?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [agentState, setAgentState] = useState<AgentState>("idle")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Preferences state
  const [preferences, setPreferences] = useState({
    stack: {
      frontend: "",
      backend: "",
      database: "",
    },
    style: {
      theme: "light",
      layout: "standard",
      color: "blue",
    },
    sections: {
      projects: true,
      achievements: false,
      certificates: false,
      contact: true,
    },
  })

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setAgentState("processing")

    try {
      // Simulate API call to AI service
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Process the message based on current agent state
      let response: Message

      if (agentState === "idle" || agentState === "revising") {
        // Initial state or revision state
        response = {
          role: "assistant",
          content:
            "I can help you build your portfolio. Would you like me to guide you through the process or generate a portfolio based on your preferences?",
          timestamp: new Date(),
        }
        setAgentState("collecting")
      } else if (agentState === "collecting") {
        // Collecting preferences
        response = {
          role: "assistant",
          content:
            "Great! Let's start by defining your preferences. What technologies do you work with? What style do you prefer for your portfolio?",
          timestamp: new Date(),
        }
        setAgentState("suggesting")
      } else if (agentState === "suggesting") {
        // Suggesting portfolio elements
        response = {
          role: "assistant",
          content:
            "Based on your preferences, I've created a portfolio design. Would you like to see a preview? You can also ask me to make specific changes.",
          timestamp: new Date(),
        }
        setAgentState("implementing")
      } else {
        // Default response
        response = {
          role: "assistant",
          content:
            "I'm processing your request. Is there anything specific you'd like me to help with for your portfolio?",
          timestamp: new Date(),
        }
      }

      setMessages((prev) => [...prev, response])
    } catch (error) {
      console.error("Error processing message:", error)
      toast({
        title: "Error",
        description: "Failed to process your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleApplyChanges = () => {
    // This would apply the AI-generated changes to the actual portfolio
    onApplyChanges({
      preferences,
      // Additional data the portfolio builder might need
    })

    toast({
      title: "Changes Applied",
      description: "AI-generated changes have been applied to your portfolio.",
    })
  }

  const handleStackChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      stack: {
        ...prev.stack,
        [key]: value,
      },
    }))
  }

  const handleStyleChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        [key]: value,
      },
    }))
  }

  const handleSectionToggle = (section) => {
    setPreferences((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections[section],
      },
    }))
  }

  return (
    <>
      {/* Floating button to open the interface */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <Sparkles className="h-6 w-6" />
      </Button>

      {/* AI Agent Interface */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl h-[80vh] flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle>AI Portfolio Agent</CardTitle>
                    <CardDescription>Let AI help you build your portfolio</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <Tabs defaultValue="chat" className="flex-1 flex flex-col">
              <TabsList className="mx-4">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex-1 flex flex-col px-4 pt-2 pb-4">
                <div className="flex items-center mb-2">
                  <Badge variant="outline" className="mr-2">
                    {agentState.charAt(0).toUpperCase() + agentState.slice(1)}
                  </Badge>
                  {agentState !== "idle" && (
                    <span className="text-xs text-muted-foreground">
                      AI is {agentState === "processing" ? "thinking..." : `in ${agentState} mode`}
                    </span>
                  )}
                </div>

                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : message.role === "system"
                                ? "bg-muted"
                                : "bg-muted border"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="mt-4 flex items-center">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="min-h-[60px] resize-none"
                    disabled={isLoading}
                  />
                  <Button onClick={handleSendMessage} className="ml-2 h-[60px]" disabled={isLoading || !input.trim()}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="flex-1 overflow-auto px-4 pt-2 pb-4">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Technology Stack</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Frontend</label>
                          <div className="flex flex-wrap gap-2">
                            {["React", "Vue", "Angular", "HTML/CSS", "Tailwind"].map((tech) => (
                              <Badge
                                key={tech}
                                variant={preferences.stack.frontend === tech ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => handleStackChange("frontend", tech)}
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Backend</label>
                          <div className="flex flex-wrap gap-2">
                            {["Node.js", "Python", "Java", "PHP", "Ruby", "None"].map((tech) => (
                              <Badge
                                key={tech}
                                variant={preferences.stack.backend === tech ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => handleStackChange("backend", tech)}
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Database</label>
                          <div className="flex flex-wrap gap-2">
                            {["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Supabase", "None"].map((tech) => (
                              <Badge
                                key={tech}
                                variant={preferences.stack.database === tech ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => handleStackChange("database", tech)}
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Style Preferences</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Theme</label>
                          <div className="flex gap-2">
                            {["Light", "Dark", "Colorful"].map((theme) => (
                              <Badge
                                key={theme}
                                variant={
                                  preferences.style.theme.toLowerCase() === theme.toLowerCase() ? "default" : "outline"
                                }
                                className="cursor-pointer"
                                onClick={() => handleStyleChange("theme", theme.toLowerCase())}
                              >
                                {theme}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Layout</label>
                          <div className="flex gap-2">
                            {["Standard", "Minimal", "Creative"].map((layout) => (
                              <Badge
                                key={layout}
                                variant={
                                  preferences.style.layout.toLowerCase() === layout.toLowerCase()
                                    ? "default"
                                    : "outline"
                                }
                                className="cursor-pointer"
                                onClick={() => handleStyleChange("layout", layout.toLowerCase())}
                              >
                                {layout}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Color Scheme</label>
                          <div className="flex gap-2">
                            {["Blue", "Green", "Purple", "Red", "Neutral"].map((color) => (
                              <Badge
                                key={color}
                                variant={
                                  preferences.style.color.toLowerCase() === color.toLowerCase() ? "default" : "outline"
                                }
                                className="cursor-pointer"
                                onClick={() => handleStyleChange("color", color.toLowerCase())}
                              >
                                {color}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Sections</h3>
                      <div className="space-y-2">
                        {Object.entries(preferences.sections).map(([section, included]) => (
                          <div key={section} className="flex items-center">
                            <Badge
                              variant={included ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => handleSectionToggle(section)}
                            >
                              {section.charAt(0).toUpperCase() + section.slice(1)}
                              {included ? " ✓" : ""}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="preview" className="flex-1 overflow-auto px-4 pt-2 pb-4">
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">AI-Generated Portfolio Preview</h3>
                    <p className="text-muted-foreground max-w-md">
                      Based on your preferences, the AI will generate a preview of your portfolio here. You can make
                      adjustments before applying the changes.
                    </p>
                    <Button onClick={handleApplyChanges} className="mt-4">
                      Apply to Portfolio
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <CardFooter className="pt-2 pb-4 px-4 flex justify-between border-t">
              <div className="text-xs text-muted-foreground">AI Agent is ready to help you build your portfolio</div>
              <Button variant="outline" size="sm" onClick={() => setAgentState("idle")}>
                Reset Agent
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
