import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    // Check authentication
    const cookieStore = cookies()
    const authToken = cookieStore.get("auth-token")

    if (!authToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // In a real app, you would fetch projects from a database
    // For demo purposes, we'll return mock data
    const mockProjects = [
      {
        id: "project-1",
        title: "Mobile App Design",
        description: "UI/UX design for a fitness tracking application",
        status: "In Progress",
        progress: 65,
        dueDate: "2023-05-20",
        members: ["user-1", "user-2", "user-3"],
        tasks: {
          total: 20,
          completed: 12,
        },
        comments: 8,
      },
      {
        id: "project-2",
        title: "E-commerce Website",
        description: "Web development for a local business",
        status: "Planning",
        progress: 25,
        dueDate: "2023-06-15",
        members: ["user-1", "user-4"],
        tasks: {
          total: 18,
          completed: 5,
        },
        comments: 12,
      },
      {
        id: "project-3",
        title: "Market Analysis",
        description: "Research project for a new product launch",
        status: "Research",
        progress: 40,
        dueDate: "2023-05-25",
        members: ["user-5", "user-6"],
        tasks: {
          total: 15,
          completed: 8,
        },
        comments: 5,
      },
    ]

    return NextResponse.json({ projects: mockProjects })
  } catch (error) {
    console.error("Projects list error:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
