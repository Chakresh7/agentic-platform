import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { type, content } = await request.json()

    // In a real app, you would use an AI service like OpenAI
    // For demo purposes, we'll return predefined suggestions

    let suggestions = []

    if (type === "resume") {
      suggestions = [
        "Try adding metrics to your project descriptions to make your impact clearer.",
        "Include specific technologies and tools you've used in each role.",
        "Add a brief summary that highlights your unique value proposition.",
      ]
    } else if (type === "portfolio") {
      suggestions = [
        "Add a skills section to highlight your expertise",
        "Include a testimonial from your recent project",
        "Consider adding a case study that shows your process",
      ]
    } else if (type === "skills") {
      suggestions = ["Usability Testing", "Information Architecture", "Design Systems"]
    }

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("AI suggestion error:", error)
    return NextResponse.json({ error: "Failed to generate suggestions" }, { status: 500 })
  }
}
