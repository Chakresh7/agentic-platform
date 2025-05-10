"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileCheck, FileUp, Loader2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// Add a type definition for the Resume interface if it's missing from the supabase-client
interface Resume {
  id: string
  title: string
  content: any
  ats_score?: number
}

// Temporary mock function since we don't have the actual supabase client
const getSupabaseBrowserClient = () => {
  return {
    from: () => ({
      update: () => ({
        eq: () => Promise.resolve()
      })
    })
  }
}

interface ATSCheckerProps {
  resume?: Resume
  isNew: boolean
  userId: string
}

export default function ATSChecker({ resume, isNew, userId }: ATSCheckerProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isChecking, setIsChecking] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [resumeText, setResumeText] = useState("")
  const [atsResults, setAtsResults] = useState<any>(null)
  
  // If we have a resume, extract text from it
  useEffect(() => {
    if (resume && resume.content) {
      // In a real app, you'd have a function to convert the resume JSON to plain text
      // For demo purposes, we'll just use a simplified version
      const content = resume.content
      
      let text = `${content.personalInfo.firstName} ${content.personalInfo.lastName}\n`
      text += `${content.personalInfo.email} | ${content.personalInfo.phone} | ${content.personalInfo.location}\n\n`
      
      if (content.personalInfo.summary) {
        text += `SUMMARY\n${content.personalInfo.summary}\n\n`
      }
      
      if (content.experience && content.experience.length > 0) {
        text += "EXPERIENCE\n"
        content.experience.forEach((exp: any) => {
          text += `${exp.title} at ${exp.company}, ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`
          text += `${exp.description}\n`
          if (exp.achievements && exp.achievements.length > 0) {
            exp.achievements.forEach((achievement: string) => {
              text += `• ${achievement}\n`
            })
          }
          text += "\n"
        })
      }
      
      if (content.education && content.education.length > 0) {
        text += "EDUCATION\n"
        content.education.forEach((edu: any) => {
          text += `${edu.degree} at ${edu.institution}, ${edu.startDate} - ${edu.endDate}\n`
          if (edu.description) {
            text += `${edu.description}\n`
          }
          text += "\n"
        })
      }
      
      if (content.skills && (content.skills.technical.length > 0 || content.skills.soft.length > 0)) {
        text += "SKILLS\n"
        if (content.skills.technical.length > 0) {
          text += `Technical: ${content.skills.technical.join(", ")}\n`
        }
        if (content.skills.soft.length > 0) {
          text += `Soft: ${content.skills.soft.join(", ")}\n`
        }
      }
      
      setResumeText(text)
    }
  }, [resume])
  
  // Function to check resume against ATS
  const checkResumeATS = async () => {
    setIsChecking(true)
    
    try {
      // In a real implementation, this would call an AI service to analyze the resume
      // For demo purposes, we'll simulate the ATS check
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate mock ATS results
      const mockScore = Math.floor(Math.random() * 31) + 70 // Score between 70-100
      
      const mockKeywords = [
        { keyword: "user experience", found: true, count: 3 },
        { keyword: "figma", found: true, count: 2 },
        { keyword: "wireframing", found: true, count: 1 },
        { keyword: "prototyping", found: true, count: 2 },
        { keyword: "user research", found: true, count: 1 },
        { keyword: "design thinking", found: false, count: 0 },
        { keyword: "usability testing", found: false, count: 0 },
        { keyword: "information architecture", found: false, count: 0 },
      ]
      
      const mockIssues = [
        { type: "format", severity: "medium", description: "Resume contains special characters that may not parse correctly in ATS systems." },
        { type: "content", severity: "high", description: "Missing quantifiable achievements in your work experience." },
        { type: "keywords", severity: "medium", description: "Some important keywords from the job description are missing." },
        { type: "format", severity: "low", description: "Consider using a simpler font for better ATS compatibility." },
      ]
      
      const mockSuggestions = [
        "Add metrics to quantify your achievements (e.g., 'increased user engagement by 35%').",
        "Include the keywords 'design thinking', 'usability testing', and 'information architecture' in your resume.",
        "Use a simpler format with standard section headings (e.g., 'Experience', 'Education', 'Skills').",
        "Ensure your contact information is at the top of the resume and easily parseable.",
        "Tailor your resume specifically to this job description by matching more keywords.",
      ]
      
      const results = {
        score: mockScore,
        keywords: mockKeywords,
        issues: mockIssues,
        suggestions: mockSuggestions
      }
      
      setAtsResults(results)
      
      // If we have a resume, update its ATS score
      if (resume) {
        const supabase = getSupabaseBrowserClient()
        await supabase
          .from("resumes")
          .update({ ats_score: mockScore })
          .eq("id", resume.id)
      }
      
      toast({
        title: "ATS Check Complete",
        description: `Your resume scored ${mockScore}% for ATS compatibility.`,
      })
    } catch (error) {
      console.error("Error checking resume:", error)
      toast({
        title: "Error",
        description: "Failed to check resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsChecking(false)
    }
  }
  
  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/resume-dashboard")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">ATS Resume Checker</h1>
          <p className="text-muted-foreground">
            Check your resume for ATS compatibility and get suggestions for improvement
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side - Input */}
        <div className="lg:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle>Check Your Resume</CardTitle>
              <CardDescription>
                Upload your resume or paste the job description to check ATS compatibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="resume">
                <TabsList className="mb-4">
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                  <TabsTrigger value="job">Job Description</TabsTrigger>
                </TabsList>
                
                <TabsContent value="resume" className="space-y-4">
                  {resume ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{resume.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Using your saved resume
                          </p>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4 bg-muted/30 h-[400px] overflow-auto">
                        <pre className="text-sm whitespace-pre-wrap">{resumeText}</pre>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" asChild>
                          <Link href={`/resume-builder/${resume.id}`}>
                            Edit Resume
                          </Link>
                        </Button>
                        <Button variant="outline">
                          <FileUp className="h-4 w-4 mr-2" />
                          Upload Different Resume
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed rounded-md p-6 text-center">
                        <FileUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <h3 className="font-medium mb-1">Upload Your Resume</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Drag and drop your resume file or click to browse
                        </p>
                        <Button>Upload Resume</Button>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or paste resume text</span>
                        </div>
                      </div>
                      
                      <Textarea 
                        placeholder="Paste your resume text here..." 
                        rows={10}
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                      />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="job" className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Paste the job description to check how well your resume matches the requirements
                    </p>
                    <Textarea 
                      placeholder="Paste the job description here..." 
                      rows={10}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end mt-4">
                <Button onClick={checkResumeATS} disabled={isChecking || (!resumeText && !jobDescription)}>
                  {isChecking ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Check ATS Compatibility
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Side - Results */}
        <div className="lg:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle>ATS Check Results</CardTitle>
              <CardDescription>
                See how well your resume performs in Applicant Tracking Systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!atsResults ? (
                <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                  <FileCheck className="h-16 w-16 text-muted-foreground opacity-20" />
                  <div>
                    <h3 className="font-medium mb-1">No Results Yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Paste your resume or job description and click "Check ATS Compatibility"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Score */}
                  <div className="p-4 bg-muted/30 rounded-md border">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">ATS Compatibility Score</h3>
                      <span className="text-2xl font-bold">{atsResults.score}%</span>
                    </div>
                  </div>
                  
                  {/* Keywords */}
                  <div className="space-y-2">
                    <h3 className="font-medium">Keywords Found</h3>
                    <div className="flex flex-wrap gap-2">
                      {atsResults.keywords.map((keyword: any) => (
                        <span key={keyword.keyword} className={`px-2 py-1 rounded-md text-sm ${keyword.found ? 'bg-primary/20 text-primary-foreground' : 'bg-muted/50 text-muted-foreground line-through'}`}>
                          {keyword.keyword} {keyword.found && `(${keyword.count})`}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Issues */}
                  <div className="space-y-2">
                    <h3 className="font-medium">Issues</h3>
                    <div className="space-y-2">
                      {atsResults.issues.map((issue: any, index: number) => (
                        <div key={index} className="p-2 rounded-md bg-muted/30 border">
                          <div className="flex gap-2">
                            <span className={`w-2 h-2 mt-1.5 rounded-full ${issue.severity === 'high' ? 'bg-destructive' : issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>
                            <div>
                              <p className="font-medium">{issue.type.charAt(0).toUpperCase() + issue.type.slice(1)}</p>
                              <p className="text-sm text-muted-foreground">{issue.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Suggestions */}
                  <div className="space-y-2">
                    <h3 className="font-medium">Suggestions</h3>
                    <ul className="space-y-1 list-disc list-inside">
                      {atsResults.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="text-sm">{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
