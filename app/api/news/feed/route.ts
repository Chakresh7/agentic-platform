import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const feed = searchParams.get("feed") || "for-you"

    // In a real app, you would fetch news from a database or external API
    // For demo purposes, we'll return mock data

    const mockNews = [
      {
        id: "news-1",
        title: "The Future of AI in Design: What Students Need to Know",
        description:
          "Artificial intelligence is transforming the design industry. Learn how AI tools are changing the landscape and what skills you'll need to stay competitive in this evolving field.",
        category: "Industry Trends",
        date: "2023-05-10",
        author: {
          name: "Tech Chronicle",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        image: "/placeholder.svg?height=300&width=600",
        featured: true,
      },
      {
        id: "news-2",
        title: "Summer Internship Opportunities at Top Tech Companies",
        description:
          "Looking for a summer internship? We've compiled a list of the best opportunities at leading tech companies with application deadlines approaching soon.",
        category: "Internships",
        date: "2023-05-08",
        author: {
          name: "Career Connect",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: "news-3",
        title: "Annual Student Design Challenge: $10,000 in Prizes",
        description:
          'The annual Student Design Challenge is now accepting submissions. This year\'s theme is "Sustainable Design Solutions" with prizes totaling $10,000 for the top entries.',
        category: "Competitions",
        date: "2023-05-05",
        author: {
          name: "Design Community",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
    ]

    // Filter based on category if provided
    let filteredNews = [...mockNews]

    if (category) {
      filteredNews = filteredNews.filter((item) => item.category.toLowerCase() === category.toLowerCase())
    }

    // Different feeds (for-you, trending, latest)
    if (feed === "trending") {
      // In a real app, you would sort by popularity metrics
      // For demo, we'll just return the same data
    } else if (feed === "latest") {
      // Sort by date
      filteredNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    return NextResponse.json({ news: filteredNews })
  } catch (error) {
    console.error("News feed error:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
