import { NextResponse } from "next/server"
import { cookies } from "next/headers"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const cookieStore = cookies()
    const authToken = cookieStore.get("auth-token")

    if (!authToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { messages, agentState } = await request.json()

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages are required and must be an array" }, { status: 400 })
    }

    // In a real implementation, this would call an AI service like OpenAI
    // to generate a response based on the conversation history

    // For demo purposes, we'll simulate AI processing time and return mock responses
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a response based on the last message and agent state
    const response = generateMockResponse(messages, agentState)

    return NextResponse.json({
      success: true,
      response: {
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      },
      nextAgentState: determineNextState(agentState, messages),
    })
  } catch (error) {
    console.error("AI chat error:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}

function generateMockResponse(messages: Message[], agentState: string): string {
  const lastUserMessage =
    messages
      .filter((m) => m.role === "user")
      .pop()
      ?.content.toLowerCase() || ""

  if (agentState === "idle") {
    return "I'm your AI portfolio assistant. I can help you build and improve your portfolio. Would you like me to guide you through the process or generate a portfolio based on your preferences?"
  }

  if (agentState === "collecting") {
    if (lastUserMessage.includes("guide") || lastUserMessage.includes("help")) {
      return "Great! Let's start by defining your preferences. What technologies do you work with? What style do you prefer for your portfolio? You can also tell me about specific sections you want to include."
    }

    if (lastUserMessage.includes("generate") || lastUserMessage.includes("create")) {
      return "I'd be happy to generate a portfolio for you. To get started, could you tell me about your tech stack, preferred style, and what sections you'd like to include?"
    }

    return "I can help you build your portfolio. Let's start with some basics. What technologies do you work with, and what style would you prefer for your portfolio?"
  }

  if (agentState === "processing") {
    return "I'm analyzing your preferences and preparing some portfolio options for you. This will just take a moment."
  }

  if (agentState === "suggesting") {
    if (lastUserMessage.includes("react") || lastUserMessage.includes("javascript")) {
      return "Based on your preference for React/JavaScript, I've designed a modern portfolio that highlights your front-end skills. Would you like to see a preview? You can also tell me if you want to make any changes."
    }

    if (lastUserMessage.includes("minimal") || lastUserMessage.includes("clean")) {
      return "I've created a clean, minimal design for your portfolio that puts the focus on your work. Would you like to see a preview or make any adjustments?"
    }

    return "Based on your preferences, I've created a portfolio design. Would you like to see a preview? You can also ask me to make specific changes."
  }

  if (agentState === "implementing") {
    if (lastUserMessage.includes("preview") || lastUserMessage.includes("see")) {
      return "Here's a preview of your portfolio. You can see it in the Preview tab. What do you think? Would you like to make any changes before we finalize it?"
    }

    if (lastUserMessage.includes("change") || lastUserMessage.includes("adjust")) {
      return "I've made the requested changes to your portfolio. You can see the updated version in the Preview tab. Is there anything else you'd like to modify?"
    }

    return "Your portfolio is ready to be implemented. You can preview it in the Preview tab and apply it to your actual portfolio when you're satisfied."
  }

  if (agentState === "revising") {
    return "I'm revising your portfolio based on your feedback. What specific aspects would you like me to change or improve?"
  }

  // Default response
  return "I'm here to help with your portfolio. What would you like me to do next?"
}

function determineNextState(currentState: string, messages: Message[]): string {
  const lastUserMessage =
    messages
      .filter((m) => m.role === "user")
      .pop()
      ?.content.toLowerCase() || ""

  if (currentState === "idle") {
    return "collecting"
  }

  if (currentState === "collecting") {
    if (lastUserMessage.includes("tech") || lastUserMessage.includes("style") || lastUserMessage.includes("section")) {
      return "suggesting"
    }
    return "collecting"
  }

  if (currentState === "suggesting") {
    if (lastUserMessage.includes("preview") || lastUserMessage.includes("see") || lastUserMessage.includes("show")) {
      return "implementing"
    }
    return "suggesting"
  }

  if (currentState === "implementing") {
    if (
      lastUserMessage.includes("change") ||
      lastUserMessage.includes("revise") ||
      lastUserMessage.includes("modify")
    ) {
      return "revising"
    }
    if (lastUserMessage.includes("apply") || lastUserMessage.includes("use") || lastUserMessage.includes("implement")) {
      return "idle" // Reset after implementation
    }
    return "implementing"
  }

  if (currentState === "revising") {
    if (
      lastUserMessage.includes("looks good") ||
      lastUserMessage.includes("perfect") ||
      lastUserMessage.includes("done")
    ) {
      return "implementing"
    }
    return "revising"
  }

  // Default: stay in current state
  return currentState
}
