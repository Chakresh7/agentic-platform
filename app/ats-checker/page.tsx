"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, FileCheck, Upload, AlertCircle, CheckCircle2, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TopNavigation from "@/components/top-navigation"
import { useToast } from "@/components/ui/use-toast"

export default function ATSCheckerPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)

  const handleAnalyzeResume = () => {
    if (!resumeText) {
      toast({
        title: "Missing resume",
        description: "Please upload or paste your resume content",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Simulate analysis with timeout
    setTimeout(() => {
      const mockResults = {
        score: 78,
        parseSuccess: true,
        findings: {
          critical: [
            "Missing contact information - no phone number detected",
            "Education section is difficult to parse by ATS systems"
          ],
          warnings: [
            "Job titles not clearly formatted",
            "Skills section could be better organized for ATS scanning",
            "Dates format is inconsistent"
          ],
          positive: [
            "Good use of standard headings",
            "No complex tables or layouts detected",
            "Appropriate file format"
          ]
        },
        keywords: {
          missing: ["project management", "agile", "scrum"],
          found: ["javascript", "react", "frontend", "css", "html", "typescript"]
        },
        formatting: {
          readability: 92,
          structure: 85,
          compatibility: 76
        }
      }
      
      setResults(mockResults)
      setIsAnalyzing(false)
      
      toast({
        title: "Analysis complete",
        description: `Your resume scored ${mockResults.score}% for ATS compatibility`,
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center mb-6 max-w-6xl mx-auto">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">ATS Resume Checker</h1>
            <p className="text-muted-foreground">Ensure your resume can be parsed by Applicant Tracking Systems</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
          {/* Left Side - Input */}
          <div className="lg:col-span-5">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Resume Content</CardTitle>
                <CardDescription>Upload or paste your resume text</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Upload Resume</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your resume file or click to browse
                  </p>
                  <Button>Browse Files</Button>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  - OR -
                </div>
                
                <Textarea 
                  placeholder="Paste your resume text here..." 
                  className="min-h-[200px]"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Description (Optional)</CardTitle>
                <CardDescription>For keyword matching analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Paste the job description to check for keyword matches..." 
                  className="min-h-[150px]"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                
                <Button 
                  className="w-full" 
                  onClick={handleAnalyzeResume}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2"></div>
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <FileCheck className="h-4 w-4 mr-2" />
                      Check ATS Compatibility
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
                <CardTitle>ATS Analysis Results</CardTitle>
                <CardDescription>
                  See how your resume performs with ATS systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!results ? (
                  <div className="flex flex-col items-center justify-center h-[500px] text-center space-y-4">
                    <FileCheck className="h-16 w-16 text-muted-foreground/30" />
                    <div>
                      <h3 className="text-lg font-medium">No Analysis Yet</h3>
                      <p className="text-muted-foreground max-w-md mt-2">
                        Upload or paste your resume text, then click "Check ATS Compatibility" to see how well your resume performs with ATS systems.
                      </p>
                    </div>
                  </div>
                ) : (
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="issues">Issues</TabsTrigger>
                      <TabsTrigger value="keywords">Keywords</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-6 py-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-lg">ATS Compatibility Score</h3>
                          <span className="font-bold text-xl">{results.score}%</span>
                        </div>
                        <Progress value={results.score} className="h-3" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Readability</h4>
                              <span className="font-bold">{results.formatting.readability}%</span>
                            </div>
                            <Progress value={results.formatting.readability} className="h-2 mt-2" />
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Structure</h4>
                              <span className="font-bold">{results.formatting.structure}%</span>
                            </div>
                            <Progress value={results.formatting.structure} className="h-2 mt-2" />
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Compatibility</h4>
                              <span className="font-bold">{results.formatting.compatibility}%</span>
                            </div>
                            <Progress value={results.formatting.compatibility} className="h-2 mt-2" />
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">Summary</h3>
                        <p className="text-muted-foreground">
                          Your resume has been successfully parsed by our ATS simulator. 
                          The overall compatibility score is {results.score}%, which is 
                          {results.score >= 80 ? " excellent" : results.score >= 70 ? " good" : " needs improvement"}.
                          We've identified {results.findings.critical.length} critical issues and 
                          {results.findings.warnings.length} warnings that could impact your resume's performance.
                        </p>
                      </div>
                      
                      <div className="border rounded-md p-4 bg-primary/5 border-primary/20">
                        <h3 className="font-medium mb-2">Quick Action Plan</h3>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          {results.findings.critical.map((issue, i) => (
                            <li key={i} className="text-destructive">{issue}</li>
                          ))}
                          {results.findings.warnings.slice(0, 2).map((warning, i) => (
                            <li key={i}>{warning}</li>
                          ))}
                        </ol>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="issues" className="space-y-6 py-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-lg flex items-center text-destructive mb-2">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            Critical Issues
                          </h3>
                          {results.findings.critical.length > 0 ? (
                            <ul className="space-y-2">
                              {results.findings.critical.map((issue, i) => (
                                <li key={i} className="border rounded-md p-3 bg-destructive/10 border-destructive/20">
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">No critical issues found. Great job!</p>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-lg flex items-center text-yellow-600 mb-2">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            Warnings
                          </h3>
                          {results.findings.warnings.length > 0 ? (
                            <ul className="space-y-2">
                              {results.findings.warnings.map((warning, i) => (
                                <li key={i} className="border rounded-md p-3 bg-yellow-500/10 border-yellow-500/20">
                                  {warning}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">No warnings found. Great job!</p>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-lg flex items-center text-green-600 mb-2">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            Positive Aspects
                          </h3>
                          <ul className="space-y-2">
                            {results.findings.positive.map((positive, i) => (
                              <li key={i} className="border rounded-md p-3 bg-green-500/10 border-green-500/20">
                                {positive}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="keywords" className="space-y-6 py-4">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">Keyword Analysis</h3>
                        <p className="text-muted-foreground">
                          Keywords found in your resume compared to the job description.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium flex items-center text-green-600 mb-2">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            Found Keywords
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {results.keywords.found.map((keyword, i) => (
                              <Badge key={i} variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium flex items-center text-destructive mb-2">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            Missing Keywords
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {results.keywords.missing.map((keyword, i) => (
                              <Badge key={i} variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4 bg-primary/5 border-primary/20">
                        <h3 className="font-medium mb-2">Recommendations</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Add missing keywords where relevant to your experience</li>
                          <li>Use variations of keywords (e.g., "managed" and "management")</li>
                          <li>Include keywords in context, not just in a skills section</li>
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {results && (
                  <>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Save Report
                    </Button>
                    <Button>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Detailed Analysis
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 