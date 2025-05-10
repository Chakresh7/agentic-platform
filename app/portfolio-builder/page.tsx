"use client"

import { useState } from "react"
import { Eye, Pencil, Plus, Save, Share2, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import TopNavigation from "@/components/top-navigation"
import AIAgentInterface from "@/components/ai-agent-interface"
import EnhancedPortfolioCard from "@/components/enhanced-portfolio-card"

// Define the type for AI changes
interface AIChanges {
  theme?: string;
  sections?: string[];
  content?: Record<string, any>;
  preferences?: {
    stack?: {
      frontend?: string;
      backend?: string;
      database?: string;
    };
    style?: {
      theme?: string;
      layout?: string;
      color?: string;
    };
    sections?: Record<string, boolean>;
  };
  [key: string]: any;
}

export default function PortfolioBuilder() {
  const [portfolio, setPortfolio] = useState({
    theme: "modern",
    sections: ["header", "about", "projects", "skills"],
    content: {}
  });
  
  // This function handles changes from the AI agent
  const handleAIChanges = (changes: AIChanges) => {
    console.log("AI-generated changes:", changes)
    // Update the portfolio state with AI suggestions
    setPortfolio(prev => ({
      ...prev,
      ...changes
    }));
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Portfolio Builder</h1>
            <p className="text-muted-foreground">Create and customize your professional portfolio</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        {/* AI Agent Interface */}
        <AIAgentInterface onApplyChanges={handleAIChanges} />

        {/* Portfolio Builder Banner */}
        <div className="mb-8 rounded-lg border bg-card p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-bold mb-2">Welcome to the Portfolio Builder</h2>
              <p className="text-muted-foreground mb-4">
                Create a stunning portfolio to showcase your work and skills. Use our drag-and-drop builder to customize
                your portfolio.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" variant="default">
                  <Plus className="h-4 w-4 mr-1" /> Add New Section
                </Button>
                <Button size="sm" variant="outline">
                  Choose Template
                </Button>
                <Button size="sm" variant="outline">
                  Import Projects
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Portfolio builder illustration"
                className="rounded-lg border shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Components */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="sections">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="sections">Sections</TabsTrigger>
                    <TabsTrigger value="themes">Themes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="sections" className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Drag to add</h3>

                      <div className="border rounded-md p-3 cursor-move hover:bg-accent transition-colors">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                            <Pencil className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">About Me</span>
                        </div>
                      </div>

                      <div className="border rounded-md p-3 cursor-move hover:bg-accent transition-colors">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                            <Pencil className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">Project</span>
                        </div>
                      </div>

                      <div className="border rounded-md p-3 cursor-move hover:bg-accent transition-colors">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                            <Pencil className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">Skills</span>
                        </div>
                      </div>

                      <div className="border rounded-md p-3 cursor-move hover:bg-accent transition-colors">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                            <Pencil className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">Education</span>
                        </div>
                      </div>

                      <div className="border rounded-md p-3 cursor-move hover:bg-accent transition-colors">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                            <Pencil className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">Gallery</span>
                        </div>
                      </div>

                      <div className="border rounded-md p-3 cursor-move hover:bg-accent transition-colors">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                            <Pencil className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">Contact</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="themes" className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors">
                        <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500 rounded-md mb-2"></div>
                        <p className="text-xs font-medium">Modern</p>
                      </div>
                      <div className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors">
                        <div className="aspect-video bg-gradient-to-r from-green-500 to-teal-500 rounded-md mb-2"></div>
                        <p className="text-xs font-medium">Creative</p>
                      </div>
                      <div className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors">
                        <div className="aspect-video bg-gradient-to-r from-gray-200 to-gray-400 rounded-md mb-2"></div>
                        <p className="text-xs font-medium">Minimal</p>
                      </div>
                      <div className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors">
                        <div className="aspect-video bg-gradient-to-r from-red-500 to-orange-500 rounded-md mb-2"></div>
                        <p className="text-xs font-medium">Bold</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Canvas */}
          <div className="lg:col-span-6">
            <Card className="min-h-[600px]">
              <CardContent className="p-6">
                {/* Header Section */}
                <div className="border-2 border-dashed border-primary/20 rounded-md p-4 mb-4 hover:border-primary/40 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold">Header</h2>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center relative overflow-hidden border-2 border-background shadow-sm">
                      <img
                        src="/placeholder.svg?height=96&width=96"
                        alt="Profile"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                        <Plus className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">John Doe</h1>
                      <p className="text-muted-foreground">UX Designer & Front-end Developer</p>
                    </div>
                  </div>
                </div>

                {/* About Me Section */}
                <div className="border-2 border-dashed border-primary/20 rounded-md p-4 mb-4 hover:border-primary/40 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold">About Me</h2>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground">
                    I'm a passionate designer and developer with 3 years of experience creating user-centered digital
                    experiences. My approach combines creative design thinking with technical expertise to build
                    products that people love to use.
                  </p>
                </div>

                {/* Projects Section */}
                <div className="border-2 border-dashed border-primary/20 rounded-md p-4 mb-4 hover:border-primary/40 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold">Projects</h2>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <EnhancedPortfolioCard
                      title="E-commerce Redesign"
                      description="Complete redesign of an e-commerce platform focusing on user experience and conversion optimization."
                      image="/placeholder.svg?height=200&width=300"
                      tags={["UI/UX", "Web Development"]}
                      demoUrl="https://example.com"
                      githubUrl="https://github.com"
                    />
                    <EnhancedPortfolioCard
                      title="Mobile App Design"
                      description="UI/UX design for a fitness tracking mobile application with custom animations and interactions."
                      image="/placeholder.svg?height=200&width=300"
                      tags={["UI/UX", "Mobile"]}
                      demoUrl="https://example.com"
                    />
                  </div>

                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </div>

                {/* Drop Zone */}
                <div className="border-2 border-dashed border-muted rounded-md p-8 flex flex-col items-center justify-center text-center">
                  <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Drag and drop sections here</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Properties */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-4">Properties</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="section-title">Section Title</Label>
                    <Input id="section-title" defaultValue="Projects" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="layout">Layout</Label>
                    <Select defaultValue="grid">
                      <SelectTrigger id="layout">
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid</SelectItem>
                        <SelectItem value="list">List</SelectItem>
                        <SelectItem value="carousel">Carousel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="columns">Columns</Label>
                    <Select defaultValue="2">
                      <SelectTrigger id="columns">
                        <SelectValue placeholder="Select columns" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Column</SelectItem>
                        <SelectItem value="2">2 Columns</SelectItem>
                        <SelectItem value="3">3 Columns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-title" className="cursor-pointer">
                      Show Title
                    </Label>
                    <Switch id="show-title" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-tags" className="cursor-pointer">
                      Show Tags
                    </Label>
                    <Switch id="show-tags" defaultChecked />
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">AI Suggestions</h4>
                    <div className="space-y-2">
                      <div className="border rounded-md p-3 cursor-pointer hover:bg-accent transition-colors">
                        <p className="text-sm">Add a skills section to highlight your expertise</p>
                      </div>
                      <div className="border rounded-md p-3 cursor-pointer hover:bg-accent transition-colors">
                        <p className="text-sm">Include a testimonial from your recent project</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
