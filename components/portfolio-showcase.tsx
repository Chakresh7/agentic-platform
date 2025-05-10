import { Button } from "@/components/ui/button"
import EnhancedPortfolioCard from "@/components/enhanced-portfolio-card"

export default function PortfolioShowcase() {
  const projects = [
    {
      title: "E-commerce Website",
      description:
        "A fully responsive e-commerce platform built with React and Node.js. Features include user authentication, product filtering, and payment processing.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      title: "Task Management App",
      description:
        "A productivity application for managing tasks and projects. Includes features like drag-and-drop, task prioritization, and team collaboration.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Vue.js", "Firebase", "Tailwind CSS"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio website showcasing projects and skills. Built with modern web technologies and features a responsive design.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["HTML/CSS", "JavaScript", "GSAP"],
      demoUrl: "https://example.com",
    },
    {
      title: "Weather Dashboard",
      description:
        "A weather application that displays current conditions and forecasts for any location. Integrates with multiple weather APIs.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "OpenWeather API", "Chart.js"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Social Media Dashboard",
      description:
        "An analytics dashboard for social media accounts. Tracks engagement, follower growth, and content performance across platforms.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Angular", "D3.js", "Express"],
      demoUrl: "https://example.com",
    },
    {
      title: "Recipe Finder App",
      description:
        "A mobile-first web application for finding recipes based on available ingredients. Features filtering by dietary restrictions and cuisine type.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React Native", "GraphQL", "MongoDB"],
      githubUrl: "https://github.com",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Featured Portfolio Projects</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-[800px] mx-auto">
            Explore some of the amazing projects created by our users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <EnhancedPortfolioCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
              featured={project.featured}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">View All Projects</Button>
        </div>
      </div>
    </section>
  )
}
