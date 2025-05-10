"use client"

import { useState } from "react"
import { FileText, Clipboard, ArrowLeft, ArrowRight, BarChart3, CheckCircle2, AlertCircle, Percent } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TopNavigation from "@/components/top-navigation"
import { useToast } from "@/components/ui/use-toast"

export default function JobDescriptionMatcher() {
  const { toast } = useToast()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [resumeText, setResumeText] = useState("")
  const [matchResults, setMatchResults] = useState(null)

  const handleAnalyzeMatch = () => {
    if (!jobDescription || !resumeText) {
      toast({
        title: "Missing information",
        description: "Please provide both your resume and the job description.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Simulate analysis with timeout
    setTimeout(() => {
      // Generate mock match results
      const mockScore = Math.floor(Math.random() * 31) + 60 // Score between 60-90
      
      const mockKeywords = [
        { keyword: "JavaScript", found: true, count: 4, importance: "high" },
        { keyword: "React", found: true, count: 3, importance: "high" },
        { keyword: "TypeScript", found: true, count: 2, importance: "high" },
        { keyword: "Next.js", found: false, count: 0, importance: "medium" },
        { keyword: "Node.js", found: true, count: 1, importance: "medium" },
        { keyword: "CSS", found: true, count: 2, importance: "medium" },
        { keyword: "API integration", found: true, count: 1, importance: "medium" },
        { keyword: "Redux", found: false, count: 0, importance: "medium" },
        { keyword: "CI/CD", found: false, count: 0, importance: "low" },
        { keyword: "Jest", found: false, count: 0, importance: "low" },
      ]
      
      const mockSkillGaps = [
        { skill: "Next.js", description: "Mentioned 3 times in the job description but not found in your resume." },
        { skill: "Redux", description: "Required for state management in their applications." },
        { skill: "Jest", description: "Testing is emphasized in the role." },
      ]
      
      const mockSuggestions = [
        "Add 'Next.js' to your skills section and mention any relevant experience.",
        "Include experience with state management tools, specifically Redux.",
        "Highlight any testing experience, particularly with Jest.",
        "Quantify your achievements with metrics for more impact.",
        "Emphasize your experience with API integrations more prominently.",
      ]
      
      const results = {
        score: mockScore,
        keywords: mockKeywords,
        skillGaps: mockSkillGaps,
        suggestions: mockSuggestions,
        sections: {
          skills: 85,
          experience: 70,
          education: 90,
          overall: mockScore
        }
      }
      
      setMatchResults(results)
      setIsAnalyzing(false)
      
      toast({
        title: "Analysis complete",
        description: `Your resume matches ${mockScore}% of the job requirements.`,
      })
    }, 3000)
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
            <h1 className="text-2xl font-bold tracking-tight">Job Description Matcher</h1>
            <p className="text-muted-foreground">Tailor your resume to match job descriptions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side - Input */}
          <div className="lg:col-span-5">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>Paste the job description you want to match</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Paste the job description here..." 
                  className="min-h-[200px]"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Resume</CardTitle>
                <CardDescription>Paste your current resume text</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Paste your resume text here..." 
                  className="min-h-[200px]"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
                
                <Button 
                  className="w-full" 
                  onClick={handleAnalyzeMatch}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2"></div>
                      Analyzing Match...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analyze Match
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Side - Results */}
          <div className="lg:col-span-7">
            <Card>
              <CardHeader>
                <CardTitle>Match Analysis</CardTitle>
                <CardDescription>
                  See how well your resume matches the job requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!matchResults ? (
                  <div className="flex flex-col items-center justify-center h-[500px] text-center space-y-4">
                    <FileText className="h-16 w-16 text-muted-foreground/30" />
                    <div>
                      <h3 className="text-lg font-medium">No Analysis Yet</h3>
                      <p className="text-muted-foreground max-w-md mt-2">
                        Paste your resume and a job description, then click "Analyze Match" to see how well you match the requirements.
                      </p>
                    </div>
                  </div>
                ) : (
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="keywords">Keywords</TabsTrigger>
                      <TabsTrigger value="gaps">Skill Gaps</TabsTrigger>
                      <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-6 py-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-lg">Overall Match</h3>
                          <div className="flex items-center">
                            <Percent className="h-4 w-4 mr-1" />
                            <span className="font-bold text-xl">{matchResults.score}%</span>
                          </div>
                        </div>
                        <Progress value={matchResults.score} className="h-3" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Skills</h4>
                              <span className="font-bold">{matchResults.sections.skills}%</span>
                            </div>
                            <Progress value={matchResults.sections.skills} className="h-2 mt-2" />
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Experience</h4>
                              <span className="font-bold">{matchResults.sections.experience}%</span>
                            </div>
                            <Progress value={matchResults.sections.experience} className="h-2 mt-2" />
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Education</h4>
                              <span className="font-bold">{matchResults.sections.education}%</span>
                            </div>
                            <Progress value={matchResults.sections.education} className="h-2 mt-2" />
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">Summary</h3>
                        <p className="text-muted-foreground">
                          Your resume matches {matchResults.score}% of the job requirements. 
                          You have {matchResults.keywords.filter(k => k.found).length} of {matchResults.keywords.length} key skills 
                          mentioned in the job description. Consider adding the missing skills to improve your match rate.
                        </p>
                      </div>
                      
                      <div className="border rounded-md p-4 bg-primary/5 border-primary/20">
                        <h3 className="font-medium mb-2">Quick Action Plan</h3>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          {matchResults.suggestions.slice(0, 3).map((suggestion, i) => (
                            <li key={i}>{suggestion}</li>
                          ))}
                        </ol>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="keywords" className="space-y-6 py-4">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">Keyword Analysis</h3>
                        <p className="text-muted-foreground">
                          Keywords found in your resume compared to what's mentioned in the job description.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">High importance</Badge>
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Medium importance</Badge>
                          <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-muted">Low importance</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {matchResults.keywords.map((keyword, i) => (
                            <div 
                              key={i} 
                              className={`flex items-center justify-between rounded-md border p-3 ${
                                keyword.found 
                                  ? "bg-green-500/10 border-green-500/20" 
                                  : "bg-destructive/10 border-destructive/20"
                              }`}
                            >
                              <div className="flex items-center">
                                {keyword.found ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                                ) : (
                                  <AlertCircle className="h-5 w-5 text-destructive mr-2" />
                                )}
                                <div>
                                  <span className={`font-medium ${keyword.found ? "" : "text-muted-foreground"}`}>
                                    {keyword.keyword}
                                  </span>
                                  <Badge 
                                    variant="outline" 
                                    className={`ml-2 ${
                                      keyword.importance === "high" 
                                        ? "bg-primary/10 text-primary border-primary/20" 
                                        : keyword.importance === "medium"
                                          ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                          : "bg-muted/50 text-muted-foreground border-muted"
                                    }`}
                                  >
                                    {keyword.importance}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-sm">
                                {keyword.found ? `Found ${keyword.count}x` : "Not found"}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="gaps" className="space-y-6 py-4">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">Skill Gaps</h3>
                        <p className="text-muted-foreground">
                          Required or desired skills mentioned in the job description but missing in your resume.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        {matchResults.skillGaps.length === 0 ? (
                          <div className="border rounded-md p-4 bg-green-500/10 border-green-500/20 text-center">
                            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                            <p className="font-medium">Excellent! No significant skill gaps detected.</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {matchResults.skillGaps.map((gap, i) => (
                              <div key={i} className="border rounded-md p-4 bg-destructive/5 border-destructive/20">
                                <h4 className="font-medium flex items-center">
                                  <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                                  {gap.skill}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1 pl-6">
                                  {gap.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <Button>
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Generate Enhanced Resume
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="suggestions" className="space-y-6 py-4">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">Improvement Suggestions</h3>
                        <p className="text-muted-foreground">
                          Actionable recommendations to tailor your resume for this job.
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        {matchResults.suggestions.map((suggestion, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 border rounded-md">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">{i + 1}</span>
                            </div>
                            <div>
                              <p>{suggestion}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-4">
                        <Button variant="outline" className="flex-1">
                          <Clipboard className="h-4 w-4 mr-2" />
                          Copy Suggestions
                        </Button>
                        <Button className="flex-1">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Apply to Resume
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 