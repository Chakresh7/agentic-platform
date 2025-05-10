import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const skills = searchParams.get("skills")
    const projectType = searchParams.get("projectType")
    const availability = searchParams.get("availability")

    // In a real app, you would query a database based on these parameters
    // For demo purposes, we'll return mock data

    const mockTeamMembers = [
      {
        id: "user-1",
        name: "Sarah Davis",
        role: "UX Designer & Researcher",
        location: "New York, NY",
        availability: "Full-time",
        skills: ["UI/UX Design", "User Research", "Figma", "Prototyping"],
        matchPercentage: 95,
        avatar: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "user-2",
        name: "Michael Johnson",
        role: "Full Stack Developer",
        location: "Remote",
        availability: "Part-time",
        skills: ["React", "Node.js", "TypeScript", "MongoDB"],
        matchPercentage: 88,
        avatar: "/placeholder.svg?height=80&width=80",
      },
      // More mock data would be here
    ]

    // Filter based on search params if provided
    let filteredMembers = [...mockTeamMembers]

    if (skills) {
      const skillsList = skills.split(",")
      filteredMembers = filteredMembers.filter((member) => member.skills.some((skill) => skillsList.includes(skill)))
    }

    if (projectType) {
      // In a real app, you would have project type preferences for users
      // For demo, we'll just return all
    }

    if (availability) {
      filteredMembers = filteredMembers.filter(
        (member) => member.availability.toLowerCase() === availability.toLowerCase(),
      )
    }

    return NextResponse.json({ members: filteredMembers })
  } catch (error) {
    console.error("Team search error:", error)
    return NextResponse.json({ error: "Failed to search for team members" }, { status: 500 })
  }
}
