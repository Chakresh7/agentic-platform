"use client"

import { useState } from "react"
import { Loader2, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AIAssistantPanelProps {
  resumeContent: any
  activeSection: string
  onClose: () => void
  onApplySuggestion: (section: string, suggestion: any) => void
}

export default function AIAssistantPanel({
  resumeContent,
  activeSection,
  onClose,
  onApplySuggestion,
}: AIAssistantPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [prompt, setPrompt] = useState("")
  const [activeTab, setActiveTab] = useState<string>("generate")

  // Function to generate AI content
  const generateAIContent = async () => {
    setIsGenerating(true)

    try {
      // In a real implementation, this would call an AI service like OpenAI
      // For demo purposes, we'll simulate the AI response
      await new Promise((resolve) => setTimeout(resolve, 1500))

      let generatedResult

      if (activeSection === "personalInfo") {
        generatedResult = {
          summary:
            "Results-driven UX Designer with 3+ years of experience creating user-centered digital experiences for diverse clients. Skilled in user research, wireframing, and prototyping with a proven track record of increasing user engagement by 35% through thoughtful design solutions. Passionate about combining creative design thinking with technical expertise to build products that people love to use.",
        }
      } else if (activeSection === "experience") {
        generatedResult = {
          description:
            "Led cross-functional design teams in creating user-centered digital experiences for enterprise clients. Conducted user research, created wireframes and prototypes, and collaborated with developers to implement designs. Improved user engagement metrics by 35% through redesigned navigation and streamlined user flows.",
          achievements: [
            "Redesigned the main product interface, increasing user engagement by 35%",
            "Led a team of 5 designers across 3 major client projects",
            "Implemented user testing protocols that reduced post-launch issues by 40%",
            "Created a design system that improved development efficiency by 25%",
          ],
        }
      } else if (activeSection === "skills") {
        generatedResult = {
          technical: [
            "UI/UX Design",
            "Figma",
            "Adobe XD",
            "Sketch",
            "Prototyping",
            "Wireframing",
            "User Research",
            "HTML/CSS",
          ],
          soft: [
            "Team Leadership",
            "Communication",
            "Problem Solving",
            "Project Management",
            "Client Relations",
            "Time Management",
          ],
        }
      } else {
        generatedResult = {
          content: "AI-generated content for " + activeSection,
        }
      }

      setGeneratedContent(generatedResult)
    } catch (error) {
      console.error("Error generating AI content:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Function to handle applying the suggestion
  const handleApplySuggestion = () => {
    if (!generatedContent) return

    if (activeSection === "personalInfo") {
      onApplySuggestion("summary", generatedContent.summary)
    } else if (activeSection === "experience") {
      // For experience, we'd need to know which experience entry to update
      // For simplicity, we'll update the first one
      onApplySuggestion("experience-0", generatedContent.description)
    } else if (activeSection === "skills") {
      onApplySuggestion("skills", generatedContent)
    } else {
      onApplySuggestion(activeSection, generatedContent.content)
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              AI Resume Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <Tabs defaultValue="generate" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generate">Generate Content</TabsTrigger>
              <TabsTrigger value="improve">Improve Section</TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="p-6">
            <TabsContent value="generate" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">What would you like to generate?</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      className="cursor-pointer"
                      variant={activeSection === "personalInfo" ? "default" : "outline"}
                    >
                      Professional Summary
                    </Badge>
                    <Badge className="cursor-pointer" variant={activeSection === "experience" ? "default" : "outline"}>
                      Job Description
                    </Badge>
                    <Badge className="cursor-pointer" variant={activeSection === "skills" ? "default" : "outline"}>
                      Skills
                    </Badge>
                    <Badge className="cursor-pointer" variant={activeSection === "projects" ? "default" : "outline"}>
                      Project Description
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Provide details to help the AI (optional)</label>
                  <Textarea
                    placeholder="E.g., 'I'm a UX designer with 3 years of experience in fintech and e-commerce...'"
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                {generatedContent && (
                  <div className="space-y-2 mt-4">
                    <h3 className="text-sm font-medium">Generated Content</h3>
                    <div className="border rounded-md p-4 bg-muted/30">
                      {activeSection === "personalInfo" && generatedContent.summary && (
                        <p>{generatedContent.summary}</p>
                      )}

                      {activeSection === "experience" && (
                        <div className="space-y-3">
                          <p>{generatedContent.description}</p>
                          {generatedContent.achievements && generatedContent.achievements.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mt-2">Key Achievements:</h4>
                              <ul className="list-disc list-inside">
                                {generatedContent.achievements.map((achievement: string, index: number) => (
                                  <li key={index} className="text-sm">
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {activeSection === "skills" && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium">Technical Skills:</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {generatedContent.technical.map((skill: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Soft Skills:</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {generatedContent.soft.map((skill: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeSection !== "personalInfo" &&
                        activeSection !== "experience" &&
                        activeSection !== "skills" &&
                        generatedContent.content && <p>{generatedContent.content}</p>}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="improve" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">What would you like to improve?</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="cursor-pointer" variant="outline">
                      Make More Concise
                    </Badge>
                    <Badge className="cursor-pointer" variant="outline">
                      Add Metrics
                    </Badge>
                    <Badge className="cursor-pointer" variant="outline">
                      Fix Grammar
                    </Badge>
                    <Badge className="cursor-pointer" variant="outline">
                      Make More Professional
                    </Badge>
                    <Badge className="cursor-pointer" variant="outline">
                      Highlight Achievements
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Content</label>
                  <div className="border rounded-md p-4 bg-muted/30">
                    {activeSection === "personalInfo" && (
                      <p>{resumeContent.personalInfo.summary || "No summary provided yet."}</p>
                    )}

                    {activeSection === "experience" && resumeContent.experience.length > 0 && (
                      <p>{resumeContent.experience[0].description || "No job description provided yet."}</p>
                    )}

                    {activeSection === "skills" && (
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {resumeContent.skills.technical.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {resumeContent.skills.soft.map((skill: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">How would you like to improve it?</label>
                  <Textarea
                    placeholder="E.g., 'Make it more concise and add metrics to showcase my impact...'"
                    rows={3}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>

        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {generatedContent ? (
              <Button onClick={handleApplySuggestion}>Apply to Resume</Button>
            ) : (
              <Button onClick={generateAIContent} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    {activeTab === "generate" ? "Generate" : "Improve"}
                  </>
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
