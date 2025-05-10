"use client"

import { useState } from "react"
import { Book, FileEdit, Download, Save, Share2, Sparkles, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TopNavigation from "@/components/top-navigation"
import { useToast } from "@/components/ui/use-toast"

export default function CoverLetterGenerator() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [letterContent, setLetterContent] = useState("")
  const [tone, setTone] = useState("professional")

  const handleGenerateLetter = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation with timeout
    setTimeout(() => {
      const templates = {
        professional: `Dear Hiring Manager,

I am writing to express my interest in the [Position] role at [Company]. With my background in [Field] and expertise in [Skill], I am confident in my ability to contribute to your team's success.

Throughout my career, I have consistently demonstrated a strong work ethic and commitment to excellence. In my previous role at [Previous Company], I [Achievement with metrics].

My professional experience has equipped me with [Relevant Skills], making me particularly well-suited for this position. I am especially interested in [Company] because of your [Company Value/Achievement/Product].

I welcome the opportunity to discuss how my qualifications align with your needs. Thank you for considering my application.

Sincerely,
[Your Name]`,

        enthusiastic: `Dear Hiring Team,

I'm thrilled to apply for the [Position] role at [Company]! As soon as I saw this opportunity, I knew it was the perfect match for my skills and passion for [Field].

During my time at [Previous Company], I enthusiastically tackled [Challenge] and achieved [Result with metrics]. This experience has fueled my excitement to bring similar energy and results to your team.

What excites me most about [Company] is your innovative approach to [Industry/Product/Service]. I'm particularly impressed by [Specific Company Achievement or Value], and I'm eager to contribute to your continued success.

I would love the chance to discuss how my enthusiasm and expertise can benefit your team. Thank you for considering my application!

Warmly,
[Your Name]`,

        concise: `Dear Hiring Manager,

I'm applying for the [Position] role at [Company]. With [X] years in [Field] and proven success in [Key Skill], I'm well-positioned to add immediate value to your team.

Key achievements:
• [Achievement with metric]
• [Achievement with metric]
• [Achievement with metric]

I'm drawn to [Company] because [Brief Reason]. I look forward to discussing how my background aligns with your needs.

Regards,
[Your Name]`
      }
      
      setLetterContent(templates[tone])
      setIsGenerating(false)
      
      toast({
        title: "Cover letter generated",
        description: "Your cover letter has been created. You can now edit and download it.",
      })
    }, 2000)
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
            <h1 className="text-2xl font-bold tracking-tight">Cover Letter Generator</h1>
            <p className="text-muted-foreground">Create personalized cover letters tailored to each job</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side - Form */}
          <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Provide details about the job you're applying for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input id="job-title" placeholder="e.g. UX Designer" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="e.g. Acme Corporation" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description (Optional)</Label>
                  <Textarea 
                    id="job-description" 
                    placeholder="Paste the job description here to make your cover letter more targeted" 
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <RadioGroup defaultValue="professional" className="flex gap-4" onValueChange={setTone}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="professional" id="professional" />
                      <Label htmlFor="professional">Professional</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="enthusiastic" id="enthusiastic" />
                      <Label htmlFor="enthusiastic">Enthusiastic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="concise" id="concise" />
                      <Label htmlFor="concise">Concise</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select defaultValue="mid">
                    <SelectTrigger id="experience">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="executive">Executive Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full flex items-center justify-center gap-2" 
                  onClick={handleGenerateLetter}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Cover Letter
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Side - Preview */}
          <div className="lg:col-span-7">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Cover Letter Preview</CardTitle>
                  <CardDescription>Edit and download your cover letter</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={!letterContent}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" disabled={!letterContent}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" disabled={!letterContent}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {letterContent ? (
                  <div className="relative min-h-[500px]">
                    <div className="absolute top-0 right-0">
                      <Button variant="ghost" size="sm">
                        <FileEdit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                    <div className="p-6 border rounded-md bg-white text-black whitespace-pre-line">
                      {letterContent}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[500px] text-center space-y-4">
                    <Book className="h-16 w-16 text-muted-foreground/30" />
                    <div>
                      <h3 className="text-lg font-medium">No Cover Letter Yet</h3>
                      <p className="text-muted-foreground max-w-md mt-2">
                        Fill in the job details and click "Generate Cover Letter" to create a personalized cover letter.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 