import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Eye, ExternalLink, Github, Heart } from "lucide-react"

type PortfolioProjectProps = {
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
  githubUrl?: string
  featured?: boolean
}

export default function EnhancedPortfolioCard({
  title,
  description,
  image,
  tags,
  demoUrl,
  githubUrl,
  featured = false,
}: PortfolioProjectProps) {
  return (
    <Card className="group overflow-hidden border shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {featured && <Badge className="absolute top-3 left-3 bg-primary">Featured</Badge>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {demoUrl && (
                  <Button size="sm" variant="secondary" className="h-8 gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    <span className="text-xs">Demo</span>
                  </Button>
                )}
                {githubUrl && (
                  <Button size="sm" variant="secondary" className="h-8 gap-1">
                    <Github className="h-3.5 w-3.5" />
                    <span className="text-xs">Code</span>
                  </Button>
                )}
              </div>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Heart className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
          View Details
        </Button>
        {demoUrl && (
          <Button variant="outline" size="sm" className="text-xs h-8 px-2 gap-1">
            <ExternalLink className="h-3 w-3" />
            Visit
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
