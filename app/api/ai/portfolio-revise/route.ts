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

    const { portfolioData, revisionPrompt } = await request.json()

    // Validate input
    if (!portfolioData || !revisionPrompt) {
      return NextResponse.json({ error: "Portfolio data and revision prompt are required" }, { status: 400 })
    }

    // In a real implementation, this would call an AI service like OpenAI
    // to revise the portfolio based on the user's feedback

    // For demo purposes, we'll simulate AI processing time and return mock revised data
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate mock revised portfolio data based on the prompt
    const revisedData = generateMockRevisedData(portfolioData, revisionPrompt)

    return NextResponse.json({
      success: true,
      data: revisedData,
      changes: [
        {
          type: "style",
          description: "Updated color scheme based on your preferences",
        },
        {
          type: "content",
          description: "Refined project descriptions to be more concise",
        },
        {
          type: "layout",
          description: "Adjusted layout to highlight your key skills",
        },
      ],
    })
  } catch (error) {
    console.error("Portfolio revision error:", error)
    return NextResponse.json({ error: "Failed to revise portfolio" }, { status: 500 })
  }
}

function generateMockRevisedData(portfolioData, revisionPrompt) {
  // This function would use the revision prompt to modify the portfolio data
  // For demo purposes, we're making some simple changes

  // Make a deep copy of the portfolio data
  const revisedData = JSON.parse(JSON.stringify(portfolioData))

  // Check for common revision requests and make changes
  if (revisionPrompt.toLowerCase().includes("dark theme") || revisionPrompt.toLowerCase().includes("dark mode")) {
    revisedData.style.theme = "dark"
    revisedData.header.background = "bg-gray-900"
  }

  if (revisionPrompt.toLowerCase().includes("more professional")) {
    revisedData.style.layout = "standard"
    revisedData.style.color = "blue"
  }

  if (revisionPrompt.toLowerCase().includes("creative") || revisionPrompt.toLowerCase().includes("unique")) {
    revisedData.style.layout = "creative"
    revisedData.style.color = "purple"
  }

  if (revisionPrompt.toLowerCase().includes("add project") || revisionPrompt.toLowerCase().includes("more project")) {
    revisedData.projects.push({
      id: `project-${revisedData.projects.length + 1}`,
      title: "New Project",
      description: "A new project based on your revision request.",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["New", "Featured"],
    })
  }

  // Add a timestamp to show the revision was processed
  revisedData.lastRevised = new Date().toISOString()

  return revisedData
}
