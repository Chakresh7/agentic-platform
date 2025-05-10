"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  FileText,
  FilePlus,
  FileCheck,
  Briefcase,
  MoreHorizontal,
  Download,
  Share2,
  MessageSquare,
  FileUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { type Resume, type CoverLetter, type JobDescription, getSupabaseBrowserClient } from "@/lib/supabase-client"

interface ResumeDashboardProps {
  resumes: Resume[]
  coverLetters: CoverLetter[]
  jobDescriptions: JobDescription[]
  userId: string
}

export default function ResumeDashboard({ resumes, coverLetters, jobDescriptions, userId }: ResumeDashboardProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isCreatingResume, setIsCreatingResume] = useState(false)
  const [newResumeTitle, setNewResumeTitle] = useState("")
  const [newResumeTemplate, setNewResumeTemplate] = useState("modern")
  const [isCreatingCoverLetter, setIsCreatingCoverLetter] = useState(false)
  const [newCoverLetterTitle, setNewCoverLetterTitle] = useState("")
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)
  const [isCreatingJobDescription, setIsCreatingJobDescription] = useState(false)
  const [newJobTitle, setNewJobTitle] = useState("")
  const [newJobCompany, setNewJobCompany] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: string } | null>(null)

  // Create a new resume
  const handleCreateResume = async () => {
    if (!newResumeTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your resume",
        variant: "destructive",
      })
      return
    }

    setIsCreatingResume(true)
    const supabase = getSupabaseBrowserClient()

    try {
      const { data, error } = await supabase
        .from("resumes")
        .insert({
          user_id: userId,
          title: newResumeTitle,
          template: newResumeTemplate,
          content: {
            personalInfo: {
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              location: "",
              website: "",
              summary: "",
            },
            experience: [
              {
                id: "exp-1",
                title: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                description: "",
                achievements: [],
              },
            ],
            education: [
              {
                id: "edu-1",
                degree: "",
                institution: "",
                location: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
            skills: {
              technical: [],
              soft: [],
            },
            projects: [],
            certifications: [],
            languages: [],
            references: [],
          },
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Resume created",
        description: "Your new resume has been created successfully.",
      })

      setIsCreatingResume(false)
      setNewResumeTitle("")
      setNewResumeTemplate("modern")

      // Navigate to the resume builder
      router.push(`/resume-builder/${data.id}`)
    } catch (error) {
      console.error("Error creating resume:", error)
      toast({
        title: "Error",
        description: "Failed to create resume. Please try again.",
        variant: "destructive",
      })
      setIsCreatingResume(false)
    }
  }

  // Create a new cover letter
  const handleCreateCoverLetter = async () => {
    if (!newCoverLetterTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your cover letter",
        variant: "destructive",
      })
      return
    }

    setIsCreatingCoverLetter(true)
    const supabase = getSupabaseBrowserClient()

    try {
      const { data, error } = await supabase
        .from("cover_letters")
        .insert({
          user_id: userId,
          resume_id: selectedResumeId,
          title: newCoverLetterTitle,
          content: "",
          tone: "professional",
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Cover letter created",
        description: "Your new cover letter has been created successfully.",
      })

      setIsCreatingCoverLetter(false)
      setNewCoverLetterTitle("")
      setSelectedResumeId(null)

      // Navigate to the cover letter editor
      router.push(`/cover-letter/${data.id}`)
    } catch (error) {
      console.error("Error creating cover letter:", error)
      toast({
        title: "Error",
        description: "Failed to create cover letter. Please try again.",
        variant: "destructive",
      })
      setIsCreatingCoverLetter(false)
    }
  }

  // Create a new job description
  const handleCreateJobDescription = async () => {
    if (!newJobTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job title",
        variant: "destructive",
      })
      return
    }

    setIsCreatingJobDescription(true)
    const supabase = getSupabaseBrowserClient()

    try {
      const { data, error } = await supabase
        .from("job_descriptions")
        .insert({
          user_id: userId,
          title: newJobTitle,
          company: newJobCompany,
          description: "",
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Job description created",
        description: "Your new job description has been created successfully.",
      })

      setIsCreatingJobDescription(false)
      setNewJobTitle("")
      setNewJobCompany("")

      // Navigate to the job description editor
      router.push(`/job-description/${data.id}`)
    } catch (error) {
      console.error("Error creating job description:", error)
      toast({
        title: "Error",
        description: "Failed to create job description. Please try again.",
        variant: "destructive",
      })
      setIsCreatingJobDescription(false)
    }
  }

  // Delete an item (resume, cover letter, or job description)
  const handleDelete = async () => {
    if (!itemToDelete) return

    setIsDeleting(true)
    const supabase = getSupabaseBrowserClient()

    try {
      let error

      if (itemToDelete.type === "resume") {
        const { error: deleteError } = await supabase.from("resumes").delete().eq("id", itemToDelete.id)
        error = deleteError
      } else if (itemToDelete.type === "coverLetter") {
        const { error: deleteError } = await supabase.from("cover_letters").delete().eq("id", itemToDelete.id)
        error = deleteError
      } else if (itemToDelete.type === "jobDescription") {
        const { error: deleteError } = await supabase.from("job_descriptions").delete().eq("id", itemToDelete.id)
        error = deleteError
      }

      if (error) throw error

      toast({
        title: "Item deleted",
        description: `The ${itemToDelete.type} has been deleted successfully.`,
      })

      // Refresh the page to update the lists
      router.refresh()
    } catch (error) {
      console.error("Error deleting item:", error)
      toast({
        title: "Error",
        description: `Failed to delete ${itemToDelete.type}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setItemToDelete(null)
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Dashboard</h1>
          <p className="text-muted-foreground">Manage your resumes, cover letters, and job applications</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreatingResume} onOpenChange={setIsCreatingResume}>
            <DialogTrigger asChild>
              <Button>
                <FilePlus className="h-4 w-4 mr-2" />
                Create Resume
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Resume</DialogTitle>
                <DialogDescription>Enter a title for your new resume and select a template.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="resume-title">Resume Title</Label>
                  <Input
                    id="resume-title"
                    placeholder="e.g., Software Developer Resume"
                    value={newResumeTitle}
                    onChange={(e) => setNewResumeTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="resume-template">Template</Label>
                  <select
                    id="resume-template"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newResumeTemplate}
                    onChange={(e) => setNewResumeTemplate(e.target.value)}
                  >
                    <option value="modern">Modern</option>
                    <option value="professional">Professional</option>
                    <option value="creative">Creative</option>
                    <option value="minimal">Minimal</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatingResume(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateResume} disabled={isCreatingResume}>
                  {isCreatingResume ? "Creating..." : "Create Resume"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreatingCoverLetter} onOpenChange={setIsCreatingCoverLetter}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Create Cover Letter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Cover Letter</DialogTitle>
                <DialogDescription>
                  Enter a title for your new cover letter and optionally select a resume to link it to.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="cover-letter-title">Cover Letter Title</Label>
                  <Input
                    id="cover-letter-title"
                    placeholder="e.g., Application for Software Developer at Google"
                    value={newCoverLetterTitle}
                    onChange={(e) => setNewCoverLetterTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="resume-link">Link to Resume (Optional)</Label>
                  <select
                    id="resume-link"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedResumeId || ""}
                    onChange={(e) => setSelectedResumeId(e.target.value || null)}
                  >
                    <option value="">None</option>
                    {resumes.map((resume) => (
                      <option key={resume.id} value={resume.id}>
                        {resume.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatingCoverLetter(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCoverLetter} disabled={isCreatingCoverLetter}>
                  {isCreatingCoverLetter ? "Creating..." : "Create Cover Letter"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreatingJobDescription} onOpenChange={setIsCreatingJobDescription}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Briefcase className="h-4 w-4 mr-2" />
                Add Job Description
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Job Description</DialogTitle>
                <DialogDescription>Enter details for the job you're applying to.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input
                    id="job-title"
                    placeholder="e.g., Senior Software Engineer"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="job-company">Company (Optional)</Label>
                  <Input
                    id="job-company"
                    placeholder="e.g., Google"
                    value={newJobCompany}
                    onChange={(e) => setNewJobCompany(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatingJobDescription(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateJobDescription} disabled={isCreatingJobDescription}>
                  {isCreatingJobDescription ? "Creating..." : "Add Job Description"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="resumes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumes" className="flex gap-2">
            <FileText className="h-4 w-4" />
            <span>Resumes</span>
            {resumes.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {resumes.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="coverLetters" className="flex gap-2">
            <FileText className="h-4 w-4" />
            <span>Cover Letters</span>
            {coverLetters.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {coverLetters.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="jobDescriptions" className="flex gap-2">
            <Briefcase className="h-4 w-4" />
            <span>Job Descriptions</span>
            {jobDescriptions.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {jobDescriptions.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resumes" className="space-y-4">
          {resumes.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No resumes yet</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Create your first resume to get started. Our AI-powered tools will help you craft a professional
                  resume.
                </p>
                <div className="flex gap-4">
                  <Button onClick={() => setIsCreatingResume(true)}>
                    <FilePlus className="h-4 w-4 mr-2" />
                    Create New Resume
                  </Button>
                  <Button variant="outline">
                    <FileUp className="h-4 w-4 mr-2" />
                    Import Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resumes.map((resume) => (
                <Card key={resume.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{resume.title}</CardTitle>
                        <CardDescription>Last updated: {formatDate(resume.updated_at)}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/resume-builder/${resume.id}`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/ats-checker/${resume.id}`}>ATS Check</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setNewCoverLetterTitle(`Cover Letter for ${resume.title}`)
                              setSelectedResumeId(resume.id)
                              setIsCreatingCoverLetter(true)
                            }}
                          >
                            Create Cover Letter
                          </DropdownMenuItem>
                          <DropdownMenuItem>Download PDF</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              // Clone the resume
                              const supabase = getSupabaseBrowserClient()
                              supabase
                                .from("resumes")
                                .insert({
                                  user_id: userId,
                                  title: `${resume.title} (Copy)`,
                                  content: resume.content,
                                  template: resume.template,
                                })
                                .then(() => {
                                  toast({
                                    title: "Resume duplicated",
                                    description: "A copy of your resume has been created.",
                                  })
                                  router.refresh()
                                })
                            }}
                          >
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setItemToDelete({ type: "resume", id: resume.id })}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="capitalize">
                        {resume.template}
                      </Badge>
                      {resume.ats_score && (
                        <Badge
                          variant={
                            resume.ats_score >= 80 ? "default" : resume.ats_score >= 60 ? "secondary" : "outline"
                          }
                        >
                          ATS Score: {resume.ats_score}%
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/resume-builder/${resume.id}`}>Edit</Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}

              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full py-6">
                  <Button variant="ghost" className="h-auto p-6" onClick={() => setIsCreatingResume(true)}>
                    <div className="flex flex-col items-center">
                      <FilePlus className="h-8 w-8 mb-2" />
                      <span>Create New Resume</span>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="coverLetters" className="space-y-4">
          {coverLetters.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No cover letters yet</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Create your first cover letter to complement your resume. Our AI will help you craft a personalized
                  cover letter.
                </p>
                <Button onClick={() => setIsCreatingCoverLetter(true)}>
                  <FilePlus className="h-4 w-4 mr-2" />
                  Create New Cover Letter
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coverLetters.map((coverLetter) => (
                <Card key={coverLetter.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{coverLetter.title}</CardTitle>
                        <CardDescription>Last updated: {formatDate(coverLetter.updated_at)}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/cover-letter/${coverLetter.id}`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Download PDF</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              // Clone the cover letter
                              const supabase = getSupabaseBrowserClient()
                              supabase
                                .from("cover_letters")
                                .insert({
                                  user_id: userId,
                                  resume_id: coverLetter.resume_id,
                                  title: `${coverLetter.title} (Copy)`,
                                  content: coverLetter.content,
                                  tone: coverLetter.tone,
                                })
                                .then(() => {
                                  toast({
                                    title: "Cover letter duplicated",
                                    description: "A copy of your cover letter has been created.",
                                  })
                                  router.refresh()
                                })
                            }}
                          >
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setItemToDelete({ type: "coverLetter", id: coverLetter.id })}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="capitalize">
                        {coverLetter.tone}
                      </Badge>
                      {coverLetter.resume_id && <Badge variant="secondary">Linked to Resume</Badge>}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/cover-letter/${coverLetter.id}`}>Edit</Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}

              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full py-6">
                  <Button variant="ghost" className="h-auto p-6" onClick={() => setIsCreatingCoverLetter(true)}>
                    <div className="flex flex-col items-center">
                      <FilePlus className="h-8 w-8 mb-2" />
                      <span>Create New Cover Letter</span>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="jobDescriptions" className="space-y-4">
          {jobDescriptions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No job descriptions yet</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Add job descriptions to tailor your resume and cover letter for specific positions.
                </p>
                <Button onClick={() => setIsCreatingJobDescription(true)}>
                  <Briefcase className="h-4 w-4 mr-2" />
                  Add Job Description
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobDescriptions.map((job) => (
                <Card key={job.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription>{job.company ? `at ${job.company}` : "No company specified"}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/job-description/${job.id}`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Tailor Resume</DropdownMenuItem>
                          <DropdownMenuItem>Generate Cover Letter</DropdownMenuItem>
                          <DropdownMenuItem>Prepare for Interview</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setItemToDelete({ type: "jobDescription", id: job.id })}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Added {formatDate(job.created_at)}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/job-description/${job.id}`}>View Details</Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/ats-checker/new?job=${job.id}`}>
                          <FileCheck className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}

              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full py-6">
                  <Button variant="ghost" className="h-auto p-6" onClick={() => setIsCreatingJobDescription(true)}>
                    <div className="flex flex-col items-center">
                      <Briefcase className="h-8 w-8 mb-2" />
                      <span>Add Job Description</span>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setItemToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
