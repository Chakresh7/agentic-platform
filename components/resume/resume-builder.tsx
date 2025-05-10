"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Eye, FileCheck, MessageSquare, Save, Sparkles, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { type Resume, getSupabaseBrowserClient } from "@/lib/supabase-client"
import ResumeTemplatePreview from "./resume-template-preview"
import AIAssistantPanel from "./ai-assistant-panel"

// Default resume content structure
const defaultResumeContent = {
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
}

interface ResumeBuilderProps {
  resume?: Resume
  isNew: boolean
  userId: string
}

export default function ResumeBuilder({ resume, isNew, userId }: ResumeBuilderProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("personalInfo")
  const [isSaving, setIsSaving] = useState(false)
  const [resumeTitle, setResumeTitle] = useState(resume?.title || "Untitled Resume")
  const [resumeTemplate, setResumeTemplate] = useState(resume?.template || "modern")
  const [resumeContent, setResumeContent] = useState(resume?.content || defaultResumeContent)

  // Handle save resume
  const handleSaveResume = async () => {
    setIsSaving(true)
    const supabase = getSupabaseBrowserClient()

    try {
      if (isNew) {
        // Create new resume
        const { data, error } = await supabase
          .from("resumes")
          .insert({
            user_id: userId,
            title: resumeTitle,
            content: resumeContent,
            template: resumeTemplate,
          })
          .select()
          .single()

        if (error) throw error

        toast({
          title: "Resume created",
          description: "Your resume has been created successfully.",
        })

        // Redirect to the edit page
        router.push(`/resume-builder/${data.id}`)
      } else if (resume) {
        // Update existing resume
        const { error } = await supabase
          .from("resumes")
          .update({
            title: resumeTitle,
            content: resumeContent,
            template: resumeTemplate,
            updated_at: new Date().toISOString(),
          })
          .eq("id", resume.id)

        if (error) throw error

        toast({
          title: "Resume saved",
          description: "Your changes have been saved successfully.",
        })

        router.refresh()
      }
    } catch (error) {
      console.error("Error saving resume:", error)
      toast({
        title: "Error",
        description: "Failed to save resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle personal info changes
  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeContent((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }))
  }

  // Handle experience changes
  const handleExperienceChange = (index: number, field: string, value: any) => {
    setResumeContent((prev) => {
      const updatedExperience = [...prev.experience]
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value,
      }
      return {
        ...prev,
        experience: updatedExperience,
      }
    })
  }

  // Add new experience
  const handleAddExperience = () => {
    setResumeContent((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: `exp-${Date.now()}`,
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
    }))
  }

  // Remove experience
  const handleRemoveExperience = (index: number) => {
    setResumeContent((prev) => {
      const updatedExperience = [...prev.experience]
      updatedExperience.splice(index, 1)
      return {
        ...prev,
        experience: updatedExperience,
      }
    })
  }

  // Handle education changes
  const handleEducationChange = (index: number, field: string, value: any) => {
    setResumeContent((prev) => {
      const updatedEducation = [...prev.education]
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value,
      }
      return {
        ...prev,
        education: updatedEducation,
      }
    })
  }

  // Add new education
  const handleAddEducation = () => {
    setResumeContent((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: `edu-${Date.now()}`,
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }))
  }

  // Remove education
  const handleRemoveEducation = (index: number) => {
    setResumeContent((prev) => {
      const updatedEducation = [...prev.education]
      updatedEducation.splice(index, 1)
      return {
        ...prev,
        education: updatedEducation,
      }
    })
  }

  // Handle skills changes
  const handleAddSkill = (category: "technical" | "soft", skill: string) => {
    if (!skill.trim()) return

    setResumeContent((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...prev.skills[category], skill],
      },
    }))
  }

  // Remove skill
  const handleRemoveSkill = (category: "technical" | "soft", index: number) => {
    setResumeContent((prev) => {
      const updatedSkills = { ...prev.skills }
      updatedSkills[category] = updatedSkills[category].filter((_, i) => i !== index)
      return {
        ...prev,
        skills: updatedSkills,
      }
    })
  }

  // Handle AI suggestions
  const handleApplyAISuggestion = (section: string, suggestion: any) => {
    if (section === "summary") {
      handlePersonalInfoChange("summary", suggestion)
    } else if (section.startsWith("experience-")) {
      const index = Number.parseInt(section.split("-")[1])
      handleExperienceChange(index, "description", suggestion)
    } else if (section === "skills") {
      // Add suggested skills
      suggestion.technical?.forEach((skill: string) => {
        if (!resumeContent.skills.technical.includes(skill)) {
          handleAddSkill("technical", skill)
        }
      })
      suggestion.soft?.forEach((skill: string) => {
        if (!resumeContent.skills.soft.includes(skill)) {
          handleAddSkill("soft", skill)
        }
      })
    }

    toast({
      title: "AI suggestion applied",
      description: "The suggestion has been applied to your resume.",
    })
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/resume-dashboard")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <Input
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="text-xl font-bold border-none px-0 h-auto focus-visible:ring-0"
              placeholder="Untitled Resume"
            />
            <p className="text-muted-foreground">{isNew ? "Create a new resume" : "Edit your resume"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsAIAssistantOpen(true)}>
            <Sparkles className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={`/ats-checker/${resume?.id || "new"}`} target="_blank" rel="noreferrer">
              <FileCheck className="h-4 w-4 mr-2" />
              ATS Check
            </a>
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button size="sm" onClick={handleSaveResume} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Sections */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium mb-3">Resume Sections</h3>

                <Button
                  variant={activeSection === "personalInfo" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("personalInfo")}
                >
                  Personal Information
                </Button>

                <Button
                  variant={activeSection === "experience" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("experience")}
                >
                  Work Experience
                </Button>

                <Button
                  variant={activeSection === "education" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("education")}
                >
                  Education
                </Button>

                <Button
                  variant={activeSection === "skills" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("skills")}
                >
                  Skills
                </Button>

                <Button
                  variant={activeSection === "projects" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("projects")}
                >
                  Projects
                </Button>

                <Button
                  variant={activeSection === "certifications" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("certifications")}
                >
                  Certifications
                </Button>

                <Button
                  variant={activeSection === "languages" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("languages")}
                >
                  Languages
                </Button>

                <Button
                  variant={activeSection === "references" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("references")}
                >
                  References
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <h3 className="text-sm font-medium mb-2">Template</h3>
                <Select value={resumeTemplate} onValueChange={setResumeTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-3">AI Suggestions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsAIAssistantOpen(true)}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Improve Summary
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsAIAssistantOpen(true)}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Enhance Experience
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsAIAssistantOpen(true)}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Suggest Skills
                </Button>
              </div>

              <div className="mt-4 p-3 bg-primary/10 rounded-md border border-primary/20">
                <div className="flex gap-3">
                  <div className="mt-0.5 text-primary">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">AI Tip</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Quantify your achievements with numbers and metrics to make your resume more impactful.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Form */}
        <div className="lg:col-span-5">
          <Card>
            <CardContent className="p-6">
              {/* Personal Information Section */}
              {activeSection === "personalInfo" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Personal Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={resumeContent.personalInfo.firstName}
                        onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={resumeContent.personalInfo.lastName}
                        onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeContent.personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeContent.personalInfo.phone}
                      onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={resumeContent.personalInfo.location}
                      onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website/LinkedIn</Label>
                    <Input
                      id="website"
                      placeholder="https://"
                      value={resumeContent.personalInfo.website}
                      onChange={(e) => handlePersonalInfoChange("website", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => setIsAIAssistantOpen(true)}
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        Generate with AI
                      </Button>
                    </div>
                    <Textarea
                      id="summary"
                      placeholder="A brief summary of your professional background and goals"
                      rows={4}
                      value={resumeContent.personalInfo.summary}
                      onChange={(e) => handlePersonalInfoChange("summary", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {activeSection === "experience" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Work Experience</h2>
                    <Button size="sm" onClick={handleAddExperience}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>

                  {resumeContent.experience.map((exp, index) => (
                    <div key={exp.id} className="space-y-4 border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Experience {index + 1}</h3>
                        {resumeContent.experience.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleRemoveExperience(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`job-title-${index}`}>Job Title</Label>
                        <Input
                          id={`job-title-${index}`}
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`company-${index}`}>Company</Label>
                        <Input
                          id={`company-${index}`}
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`location-${index}`}>Location</Label>
                        <Input
                          id={`location-${index}`}
                          value={exp.location}
                          onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                          <Input
                            id={`start-date-${index}`}
                            placeholder="MM/YYYY"
                            value={exp.startDate}
                            onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`end-date-${index}`}>End Date</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id={`end-date-${index}`}
                              placeholder="MM/YYYY"
                              value={exp.endDate}
                              onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                              disabled={exp.current}
                            />
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <Switch
                                id={`current-${index}`}
                                checked={exp.current}
                                onCheckedChange={(checked) => handleExperienceChange(index, "current", checked)}
                              />
                              <Label htmlFor={`current-${index}`} className="text-sm">
                                Current
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor={`description-${index}`}>Description</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs"
                            onClick={() => setIsAIAssistantOpen(true)}
                          >
                            <Sparkles className="h-3 w-3 mr-1" />
                            Enhance with AI
                          </Button>
                        </div>
                        <Textarea
                          id={`description-${index}`}
                          placeholder="Describe your responsibilities and achievements"
                          rows={4}
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Key Achievements</Label>
                        <div className="space-y-2">
                          {exp.achievements.map((achievement, achievementIndex) => (
                            <div key={achievementIndex} className="flex items-center gap-2">
                              <Input
                                value={achievement}
                                onChange={(e) => {
                                  const updatedAchievements = [...exp.achievements]
                                  updatedAchievements[achievementIndex] = e.target.value
                                  handleExperienceChange(index, "achievements", updatedAchievements)
                                }}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 shrink-0"
                                onClick={() => {
                                  const updatedAchievements = exp.achievements.filter((_, i) => i !== achievementIndex)
                                  handleExperienceChange(index, "achievements", updatedAchievements)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              const updatedAchievements = [...exp.achievements, ""]
                              handleExperienceChange(index, "achievements", updatedAchievements)
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Achievement
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Education Section */}
              {activeSection === "education" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Education</h2>
                    <Button size="sm" onClick={handleAddEducation}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </div>

                  {resumeContent.education.map((edu, index) => (
                    <div key={edu.id} className="space-y-4 border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Education {index + 1}</h3>
                        {resumeContent.education.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleRemoveEducation(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`degree-${index}`}>Degree</Label>
                        <Input
                          id={`degree-${index}`}
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`institution-${index}`}>Institution</Label>
                        <Input
                          id={`institution-${index}`}
                          value={edu.institution}
                          onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`edu-location-${index}`}>Location</Label>
                        <Input
                          id={`edu-location-${index}`}
                          value={edu.location}
                          onChange={(e) => handleEducationChange(index, "location", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`edu-start-date-${index}`}>Start Date</Label>
                          <Input
                            id={`edu-start-date-${index}`}
                            placeholder="MM/YYYY"
                            value={edu.startDate}
                            onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`edu-end-date-${index}`}>End Date</Label>
                          <Input
                            id={`edu-end-date-${index}`}
                            placeholder="MM/YYYY"
                            value={edu.endDate}
                            onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`edu-description-${index}`}>Description</Label>
                        <Textarea
                          id={`edu-description-${index}`}
                          placeholder="Describe your studies, achievements, etc."
                          rows={3}
                          value={edu.description}
                          onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Section */}
              {activeSection === "skills" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Skills</h2>
                    <Button variant="outline" size="sm" onClick={() => setIsAIAssistantOpen(true)}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Suggest Skills
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Technical Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {resumeContent.skills.technical.map((skill, index) => (
                          <Badge key={index} className="px-3 py-1 flex items-center gap-1">
                            {skill}
                            <button
                              className="ml-1 hover:text-destructive"
                              onClick={() => handleRemoveSkill("technical", index)}
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          id="new-technical-skill"
                          placeholder="Add a technical skill"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddSkill("technical", e.currentTarget.value)
                              e.currentTarget.value = ""
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          onClick={() => {
                            const input = document.getElementById("new-technical-skill") as HTMLInputElement
                            if (input) {
                              handleAddSkill("technical", input.value)
                              input.value = ""
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Soft Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {resumeContent.skills.soft.map((skill, index) => (
                          <Badge key={index} variant="outline" className="px-3 py-1 flex items-center gap-1">
                            {skill}
                            <button
                              className="ml-1 hover:text-destructive"
                              onClick={() => handleRemoveSkill("soft", index)}
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          id="new-soft-skill"
                          placeholder="Add a soft skill"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddSkill("soft", e.currentTarget.value)
                              e.currentTarget.value = ""
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          onClick={() => {
                            const input = document.getElementById("new-soft-skill") as HTMLInputElement
                            if (input) {
                              handleAddSkill("soft", input.value)
                              input.value = ""
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {activeSection === "projects" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Projects</h2>
                    <Button
                      size="sm"
                      onClick={() => {
                        setResumeContent((prev) => ({
                          ...prev,
                          projects: [
                            ...prev.projects,
                            {
                              id: `proj-${Date.now()}`,
                              title: "",
                              description: "",
                              link: "",
                              technologies: [],
                            },
                          ],
                        }))
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </div>

                  {resumeContent.projects.length === 0 ? (
                    <div className="border rounded-md p-6 text-center">
                      <h3 className="font-medium mb-2">No projects added yet</h3>
                      <p className="text-muted-foreground mb-4">Add projects to showcase your skills and experience</p>
                      <Button
                        onClick={() => {
                          setResumeContent((prev) => ({
                            ...prev,
                            projects: [
                              ...prev.projects,
                              {
                                id: `proj-${Date.now()}`,
                                title: "",
                                description: "",
                                link: "",
                                technologies: [],
                              },
                            ],
                          }))
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Project
                      </Button>
                    </div>
                  ) : (
                    resumeContent.projects.map((project, index) => (
                      <div key={project.id} className="space-y-4 border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Project {index + 1}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => {
                              setResumeContent((prev) => ({
                                ...prev,
                                projects: prev.projects.filter((_, i) => i !== index),
                              }))
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`project-title-${index}`}>Project Title</Label>
                          <Input
                            id={`project-title-${index}`}
                            value={project.title}
                            onChange={(e) => {
                              const updatedProjects = [...resumeContent.projects]
                              updatedProjects[index] = {
                                ...updatedProjects[index],
                                title: e.target.value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                projects: updatedProjects,
                              }))
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`project-description-${index}`}>Description</Label>
                          <Textarea
                            id={`project-description-${index}`}
                            placeholder="Describe the project, your role, and the impact"
                            rows={3}
                            value={project.description}
                            onChange={(e) => {
                              const updatedProjects = [...resumeContent.projects]
                              updatedProjects[index] = {
                                ...updatedProjects[index],
                                description: e.target.value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                projects: updatedProjects,
                              }))
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`project-link-${index}`}>Project Link</Label>
                          <Input
                            id={`project-link-${index}`}
                            placeholder="https://"
                            value={project.link}
                            onChange={(e) => {
                              const updatedProjects = [...resumeContent.projects]
                              updatedProjects[index] = {
                                ...updatedProjects[index],
                                link: e.target.value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                projects: updatedProjects,
                              }))
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Technologies Used</Label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} className="px-3 py-1 flex items-center gap-1">
                                {tech}
                                <button
                                  className="ml-1 hover:text-destructive"
                                  onClick={() => {
                                    const updatedProjects = [...resumeContent.projects]
                                    updatedProjects[index] = {
                                      ...updatedProjects[index],
                                      technologies: project.technologies.filter((_, i) => i !== techIndex),
                                    }
                                    setResumeContent((prev) => ({
                                      ...prev,
                                      projects: updatedProjects,
                                    }))
                                  }}
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              id={`new-tech-${index}`}
                              placeholder="Add a technology"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  const updatedProjects = [...resumeContent.projects]
                                  updatedProjects[index] = {
                                    ...updatedProjects[index],
                                    technologies: [...project.technologies, e.currentTarget.value],
                                  }
                                  setResumeContent((prev) => ({
                                    ...prev,
                                    projects: updatedProjects,
                                  }))
                                  e.currentTarget.value = ""
                                }
                              }}
                            />
                            <Button
                              variant="outline"
                              onClick={() => {
                                const input = document.getElementById(`new-tech-${index}`) as HTMLInputElement
                                if (input && input.value) {
                                  const updatedProjects = [...resumeContent.projects]
                                  updatedProjects[index] = {
                                    ...updatedProjects[index],
                                    technologies: [...project.technologies, input.value],
                                  }
                                  setResumeContent((prev) => ({
                                    ...prev,
                                    projects: updatedProjects,
                                  }))
                                  input.value = ""
                                }
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Certifications Section */}
              {activeSection === "certifications" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Certifications</h2>
                    <Button
                      size="sm"
                      onClick={() => {
                        setResumeContent((prev) => ({
                          ...prev,
                          certifications: [
                            ...prev.certifications,
                            {
                              id: `cert-${Date.now()}`,
                              name: "",
                              issuer: "",
                              date: "",
                              url: "",
                            },
                          ],
                        }))
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Certification
                    </Button>
                  </div>

                  {resumeContent.certifications.length === 0 ? (
                    <div className="border rounded-md p-6 text-center">
                      <h3 className="font-medium mb-2">No certifications added yet</h3>
                      <p className="text-muted-foreground mb-4">Add certifications to showcase your qualifications</p>
                      <Button
                        onClick={() => {
                          setResumeContent((prev) => ({
                            ...prev,
                            certifications: [
                              ...prev.certifications,
                              {
                                id: `cert-${Date.now()}`,
                                name: "",
                                issuer: "",
                                date: "",
                                url: "",
                              },
                            ],
                          }))
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Certification
                      </Button>
                    </div>
                  ) : (
                    resumeContent.certifications.map((cert, index) => (
                      <div key={cert.id} className="space-y-4 border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Certification {index + 1}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => {
                              setResumeContent((prev) => ({
                                ...prev,
                                certifications: prev.certifications.filter((_, i) => i !== index),
                              }))
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
                          <Input
                            id={`cert-name-${index}`}
                            value={cert.name}
                            onChange={(e) => {
                              const updatedCerts = [...resumeContent.certifications]
                              updatedCerts[index] = {
                                ...updatedCerts[index],
                                name: e.target.value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                certifications: updatedCerts,
                              }))
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`cert-issuer-${index}`}>Issuing Organization</Label>
                          <Input
                            id={`cert-issuer-${index}`}
                            value={cert.issuer}
                            onChange={(e) => {
                              const updatedCerts = [...resumeContent.certifications]
                              updatedCerts[index] = {
                                ...updatedCerts[index],
                                issuer: e.target.value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                certifications: updatedCerts,
                              }))
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`cert-date-${index}`}>Date</Label>
                          <Input
                            id={`cert-date-${index}`}
                            placeholder="MM/YYYY"
                            value={cert.date}
                            onChange={(e) => {
                              const updatedCerts = [...resumeContent.certifications]
                              updatedCerts[index] = {
                                ...updatedCerts[index],
                                date: e.target.value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                certifications: updatedCerts,
                              }))
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`cert-url-${index}`}>URL (Optional)</Label>
                          <Input
                            id={`cert-url-${index}`}
                            placeholder="https://"
                            value={cert.url}
                            onChange={(e) => {
                              const updatedCerts = [...resumeContent.certifications]
                              updatedCerts[index] = {
                                ...updatedCerts[index],
                                url: e.target.value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                certifications: updatedCerts,
                              }))
                            }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Languages Section */}
              {activeSection === "languages" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Languages</h2>
                    <Button
                      size="sm"
                      onClick={() => {
                        setResumeContent((prev) => ({
                          ...prev,
                          languages: [
                            ...prev.languages,
                            {
                              id: `lang-${Date.now()}`,
                              name: "",
                              proficiency: "Intermediate",
                            },
                          ],
                        }))
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Language
                    </Button>
                  </div>

                  {resumeContent.languages.length === 0 ? (
                    <div className="border rounded-md p-6 text-center">
                      <h3 className="font-medium mb-2">No languages added yet</h3>
                      <p className="text-muted-foreground mb-4">Add languages to showcase your communication skills</p>
                      <Button
                        onClick={() => {
                          setResumeContent((prev) => ({
                            ...prev,
                            languages: [
                              ...prev.languages,
                              {
                                id: `lang-${Date.now()}`,
                                name: "",
                                proficiency: "Intermediate",
                              },
                            ],
                          }))
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Language
                      </Button>
                    </div>
                  ) : (
                    resumeContent.languages.map((lang, index) => (
                      <div key={lang.id} className="space-y-4 border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Language {index + 1}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => {
                              setResumeContent((prev) => ({
                                ...prev,
                                languages: prev.languages.filter((_, i) => i !== index),
                              }))
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`lang-name-${index}`}>Language</Label>
                          <Input
                            id={`lang-name-${index}`}
                            value={lang.name}
                            onChange={(e) => {
                              const updatedLangs = [...resumeContent.languages]
                              updatedLangs[index] = {
                                ...updatedLangs[index],
                                name: e.target.value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                languages: updatedLangs,
                              }))
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`lang-proficiency-${index}`}>Proficiency</Label>
                          <Select
                            value={lang.proficiency}
                            onValueChange={(value) => {
                              const updatedLangs = [...resumeContent.languages]
                              updatedLangs[index] = {
                                ...updatedLangs[index],
                                proficiency: value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                languages: updatedLangs,
                              }))
                            }}
                          >
                            <SelectTrigger id={`lang-proficiency-${index}`}>
                              <SelectValue placeholder="Select proficiency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Native">Native</SelectItem>
                              <SelectItem value="Fluent">Fluent</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Basic">Basic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* References Section */}
              {activeSection === "references" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">References</h2>
                    <Button
                      size="sm"
                      onClick={() => {
                        setResumeContent((prev) => ({
                          ...prev,
                          references: [
                            ...prev.references,
                            {
                              id: `ref-${Date.now()}`,
                              name: "",
                              position: "",
                              company: "",
                              email: "",
                              phone: "",
                            },
                          ],
                        }))
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Reference
                    </Button>
                  </div>

                  {resumeContent.references.length === 0 ? (
                    <div className="border rounded-md p-6 text-center">
                      <h3 className="font-medium mb-2">No references added yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Add professional references to strengthen your resume
                      </p>
                      <Button
                        onClick={() => {
                          setResumeContent((prev) => ({
                            ...prev,
                            references: [
                              ...prev.references,
                              {
                                id: `ref-${Date.now()}`,
                                name: "",
                                position: "",
                                company: "",
                                email: "",
                                phone: "",
                              },
                            ],
                          }))
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Reference
                      </Button>
                    </div>
                  ) : (
                    resumeContent.references.map((ref, index) => (
                      <div key={ref.id} className="space-y-4 border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Reference {index + 1}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => {
                              setResumeContent((prev) => ({
                                ...prev,
                                references: prev.references.filter((_, i) => i !== index),
                              }))
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`ref-name-${index}`}>Name</Label>
                          <Input
                            id={`ref-name-${index}`}
                            value={ref.name}
                            onChange={(e) => {
                              const updatedRefs = [...resumeContent.references]
                              updatedRefs[index] = {
                                ...updatedRefs[index],
                                name: e.target.value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                references: updatedRefs,
                              }))
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`ref-position-${index}`}>Position</Label>
                          <Input
                            id={`ref-position-${index}`}
                            value={ref.position}
                            onChange={(e) => {
                              const updatedRefs = [...resumeContent.references]
                              updatedRefs[index] = {
                                ...updatedRefs[index],
                                position: e.target.value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                references: updatedRefs,
                              }))
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`ref-company-${index}`}>Company</Label>
                          <Input
                            id={`ref-company-${index}`}
                            value={ref.company}
                            onChange={(e) => {
                              const updatedRefs = [...resumeContent.references]
                              updatedRefs[index] = {
                                ...updatedRefs[index],
                                company: e.target.value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                references: updatedRefs,
                              }))
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`ref-email-${index}`}>Email</Label>
                          <Input
                            id={`ref-email-${index}`}
                            type="email"
                            value={ref.email}
                            onChange={(e) => {
                              const updatedRefs = [...resumeContent.references]
                              updatedRefs[index] = {
                                ...updatedRefs[index],
                                email: e.target.value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                references: updatedRefs,
                              }))
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`ref-phone-${index}`}>Phone</Label>
                          <Input
                            id={`ref-phone-${index}`}
                            value={ref.phone}
                            onChange={(e) => {
                              const updatedRefs = [...resumeContent.references]
                              updatedRefs[index] = {
                                ...updatedRefs[index],
                                phone: e.target.value,
                              }
                              setResumeContent((prev) => ({
                                ...prev,
                                references: updatedRefs,
                              }))
                            }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Preview */}
        <div className="lg:col-span-4">
          <Card className="sticky top-20">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-4">Resume Preview</h3>
              <div className="border rounded-md overflow-hidden">
                <ResumeTemplatePreview template={resumeTemplate} content={resumeContent} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Assistant Panel */}
      {isAIAssistantOpen && (
        <AIAssistantPanel
          resumeContent={resumeContent}
          activeSection={activeSection}
          onClose={() => setIsAIAssistantOpen(false)}
          onApplySuggestion={handleApplyAISuggestion}
        />
      )}
    </div>
  )
}
