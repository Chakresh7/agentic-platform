"use client"

import { useState } from "react"
import { ArrowLeft, Plus, MoreHorizontal, FileDown, Copy, Trash2, Eye, Clock, FileText, Star, StarOff } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import TopNavigation from "@/components/top-navigation"
import { useToast } from "@/components/ui/use-toast"

export default function MyResumes() {
  const { toast } = useToast()
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const [newResumeName, setNewResumeName] = useState("")
  const [newResumeTemplate, setNewResumeTemplate] = useState("professional")
  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: "Software Engineer Resume",
      lastUpdated: "2023-07-15T14:30:00Z",
      views: 48,
      downloads: 12,
      score: 85,
      starred: true,
      template: "modern",
      jobTitle: "Senior Software Engineer"
    },
    {
      id: 2,
      name: "Product Manager Resume",
      lastUpdated: "2023-08-02T09:15:00Z",
      views: 32,
      downloads: 8,
      score: 92,
      starred: true,
      template: "professional",
      jobTitle: "Product Manager"
    },
    {
      id: 3,
      name: "Frontend Developer Resume",
      lastUpdated: "2023-06-20T16:45:00Z",
      views: 27,
      downloads: 5,
      score: 78,
      starred: false,
      template: "creative",
      jobTitle: "Frontend Developer"
    },
    {
      id: 4,
      name: "UX Designer Resume",
      lastUpdated: "2023-09-05T11:20:00Z",
      views: 53,
      downloads: 14,
      score: 88,
      starred: false,
      template: "modern",
      jobTitle: "UX/UI Designer"
    },
    {
      id: 5,
      name: "Data Scientist Resume",
      lastUpdated: "2023-08-25T13:10:00Z",
      views: 36,
      downloads: 9,
      score: 84,
      starred: false,
      template: "professional",
      jobTitle: "Senior Data Scientist"
    }
  ])
  
  const handleCreateResume = () => {
    if (!newResumeName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your resume",
        variant: "destructive",
      })
      return
    }
    
    const newResume = {
      id: resumes.length + 1,
      name: newResumeName,
      lastUpdated: new Date().toISOString(),
      views: 0,
      downloads: 0,
      score: 0,
      starred: false,
      template: newResumeTemplate,
      jobTitle: ""
    }
    
    setResumes([newResume, ...resumes])
    setIsCreatingNew(false)
    setNewResumeName("")
    
    toast({
      title: "Resume created",
      description: "Your new resume has been created successfully.",
    })
  }
  
  const handleDeleteResume = (id) => {
    setResumes(resumes.filter(resume => resume.id !== id))
    
    toast({
      title: "Resume deleted",
      description: "Your resume has been deleted successfully.",
    })
  }
  
  const handleToggleStar = (id) => {
    setResumes(resumes.map(resume => 
      resume.id === id ? {...resume, starred: !resume.starred} : resume
    ))
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})
  }
  
  const getSortedResumes = () => {
    let filteredResumes = [...resumes]
    
    // Apply filtering
    if (filterBy === "starred") {
      filteredResumes = filteredResumes.filter(resume => resume.starred)
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredResumes = filteredResumes.filter(resume => 
        resume.name.toLowerCase().includes(query) || 
        resume.jobTitle.toLowerCase().includes(query)
      )
    }
    
    // Apply sorting
    return filteredResumes.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "score") {
        return b.score - a.score
      } else if (sortBy === "views") {
        return b.views - a.views
      }
      return 0
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Resumes</h1>
            <p className="text-muted-foreground">Manage and organize your resume collection</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Input 
              placeholder="Search resumes..." 
              className="w-full sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex gap-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resumes</SelectItem>
                  <SelectItem value="starred">Starred</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="score">Best Score</SelectItem>
                  <SelectItem value="views">Most Views</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Dialog open={isCreatingNew} onOpenChange={setIsCreatingNew}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Resume
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Resume</DialogTitle>
                <DialogDescription>
                  Give your resume a name and select a template to get started.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="resume-name">Resume Name</Label>
                  <Input 
                    id="resume-name" 
                    placeholder="e.g. Software Engineer Resume"
                    value={newResumeName}
                    onChange={(e) => setNewResumeName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="template">Template Style</Label>
                  <Select value={newResumeTemplate} onValueChange={setNewResumeTemplate}>
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatingNew(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateResume}>
                  Create Resume
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getSortedResumes().map((resume) => (
            <Card key={resume.id} className="relative group">
              {resume.starred && (
                <div className="absolute top-3 left-3">
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                    <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                    Starred
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{resume.name}</CardTitle>
                    <CardDescription>{resume.jobTitle || "No job title"}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleToggleStar(resume.id)}>
                        {resume.starred ? (
                          <>
                            <StarOff className="h-4 w-4 mr-2" />
                            Remove Star
                          </>
                        ) : (
                          <>
                            <Star className="h-4 w-4 mr-2" />
                            Star Resume
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileDown className="h-4 w-4 mr-2" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteResume(resume.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Updated {formatDate(resume.lastUpdated)}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center py-2 border rounded-md">
                    <p className="text-lg font-semibold">{resume.views}</p>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                  <div className="text-center py-2 border rounded-md">
                    <p className="text-lg font-semibold">{resume.downloads}</p>
                    <p className="text-xs text-muted-foreground">Downloads</p>
                  </div>
                  <div className="text-center py-2 border rounded-md">
                    <p className="text-lg font-semibold">{resume.score}%</p>
                    <p className="text-xs text-muted-foreground">ATS Score</p>
                  </div>
                </div>
                
                <Badge variant="outline" className="bg-muted/50 text-muted-foreground">
                  {resume.template.charAt(0).toUpperCase() + resume.template.slice(1)} Template
                </Badge>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/ats-checker/${resume.id}`}>
                    <FileText className="h-4 w-4 mr-2" />
                    Check ATS
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/resume-builder/${resume.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View & Edit
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {getSortedResumes().length === 0 && (
          <div className="border rounded-md p-8 text-center mt-4">
            <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No resumes found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 
                "No resumes match your search query. Try a different search term." :
                filterBy === "starred" ?
                  "You haven't starred any resumes yet." :
                  "You haven't created any resumes yet. Get started by creating a new resume."
              }
            </p>
            {!searchQuery && filterBy !== "starred" && (
              <Button onClick={() => setIsCreatingNew(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Resume
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  )
} 