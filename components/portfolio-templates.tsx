import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PortfolioTemplates() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Professional Portfolio Templates
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-[800px] mx-auto">
            Choose from a variety of professionally designed templates to showcase your work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Template 1 */}
          <Card className="group overflow-hidden border shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                alt="Modern portfolio template"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Badge className="absolute top-3 left-3 bg-primary">Popular</Badge>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Modern</h3>
                <Badge variant="outline">Free</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                A clean, modern design perfect for developers and designers. Features a minimalist layout with focus on
                your work.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  Responsive
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Dark Mode
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Project Gallery
                </Badge>
              </div>
              <Button className="w-full mt-6">Use Template</Button>
            </CardContent>
          </Card>

          {/* Template 2 */}
          <Card className="group overflow-hidden border shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
                alt="Creative portfolio template"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Creative</h3>
                <Badge variant="outline">Premium</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                A bold, creative design for artists and creative professionals. Features interactive elements and
                animations.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  Animations
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Interactive
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Custom Colors
                </Badge>
              </div>
              <Button className="w-full mt-6">Use Template</Button>
            </CardContent>
          </Card>

          {/* Template 3 */}
          <Card className="group overflow-hidden border shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                alt="Minimal portfolio template"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Minimal</h3>
                <Badge variant="outline">Free</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                A minimalist design that puts your content front and center. Perfect for all professionals.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  Fast Loading
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  SEO Optimized
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Contact Form
                </Badge>
              </div>
              <Button className="w-full mt-6">Use Template</Button>
            </CardContent>
          </Card>

          {/* Template 4 */}
          <Card className="group overflow-hidden border shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1055&q=80"
                alt="Professional portfolio template"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Professional</h3>
                <Badge variant="outline">Premium</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                A professional template designed for corporate environments. Features a formal layout and structure.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  Resume Section
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Testimonials
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Blog Ready
                </Badge>
              </div>
              <Button className="w-full mt-6">Use Template</Button>
            </CardContent>
          </Card>

          {/* Template 5 */}
          <Card className="group overflow-hidden border shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                alt="Developer portfolio template"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Badge className="absolute top-3 left-3 bg-blue-500">New</Badge>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Developer</h3>
                <Badge variant="outline">Premium</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Designed specifically for developers. Features code snippets, GitHub integration, and project showcases.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  Code Highlighting
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  GitHub Stats
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Tech Stack
                </Badge>
              </div>
              <Button className="w-full mt-6">Use Template</Button>
            </CardContent>
          </Card>

          {/* Template 6 */}
          <Card className="group overflow-hidden border shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                alt="Photographer portfolio template"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">Photographer</h3>
                <Badge variant="outline">Premium</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Perfect for photographers and visual artists. Features large image galleries and visual storytelling.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  Image Gallery
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Lightbox
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Image Optimization
                </Badge>
              </div>
              <Button className="w-full mt-6">Use Template</Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  )
}
