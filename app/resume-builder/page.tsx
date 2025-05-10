import { ArrowDown, ArrowUp, Download, FileText, MessageSquare, Plus, Save, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TopNavigation from "@/components/top-navigation"

export default function ResumeBuilder() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Resume Builder</h1>
            <p className="text-muted-foreground">Create a professional resume with AI assistance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side - Form */}
          <div className="lg:col-span-6">
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job-title">Job Title</Label>
                      <Input id="job-title" placeholder="UX Designer" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="(123) 456-7890" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="New York, NY" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website/Portfolio</Label>
                      <Input id="website" placeholder="https://johndoe.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        placeholder="Experienced UX Designer with a passion for creating user-centered digital experiences..."
                        rows={4}
                      />
                      <div className="p-3 bg-primary/10 rounded-md border border-primary/20 flex gap-3">
                        <div className="mt-0.5 text-primary">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">AI Suggestion</p>
                          <p className="text-sm text-muted-foreground">
                            Try quantifying your impact with metrics. For example: "Improved user engagement by 40%
                            through redesigned navigation."
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Apply Suggestion
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Work Experience</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4 border-b pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="job-title-1">Job Title</Label>
                          <Input id="job-title-1" defaultValue="Senior UX Designer" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-1">Company</Label>
                          <Input id="company-1" defaultValue="Design Studio Inc." />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-date-1">Start Date</Label>
                          <Input id="start-date-1" defaultValue="Jan 2020" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date-1">End Date</Label>
                          <Input id="end-date-1" defaultValue="Present" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="job-description-1">Description</Label>
                        <Textarea
                          id="job-description-1"
                          defaultValue="Led the UX design team for multiple client projects, focusing on user research, wireframing, and prototyping."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Key Achievements</Label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Input defaultValue="Redesigned the main product interface, increasing user engagement by 35%" />
                            <Button variant="ghost" size="icon" className="shrink-0">
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="shrink-0">
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input defaultValue="Led a team of 5 designers across 3 major client projects" />
                            <Button variant="ghost" size="icon" className="shrink-0">
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="shrink-0">
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button variant="outline" size="sm" className="mt-1">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Achievement
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="job-title-2">Job Title</Label>
                          <Input id="job-title-2" defaultValue="UX Designer" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-2">Company</Label>
                          <Input id="company-2" defaultValue="Tech Innovations LLC" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-date-2">Start Date</Label>
                          <Input id="start-date-2" defaultValue="Mar 2018" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date-2">End Date</Label>
                          <Input id="end-date-2" defaultValue="Dec 2019" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="job-description-2">Description</Label>
                        <Textarea
                          id="job-description-2"
                          defaultValue="Designed user interfaces for web and mobile applications, conducted user research, and created wireframes and prototypes."
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Education</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="degree">Degree</Label>
                          <Input id="degree" defaultValue="Bachelor of Design" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="institution">Institution</Label>
                          <Input id="institution" defaultValue="Design University" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edu-start-date">Start Date</Label>
                          <Input id="edu-start-date" defaultValue="Sep 2014" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edu-end-date">End Date</Label>
                          <Input id="edu-end-date" defaultValue="Jun 2018" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edu-description">Description</Label>
                        <Textarea
                          id="edu-description"
                          defaultValue="Specialized in User Experience Design and Interactive Media. Graduated with honors."
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Skills</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Technical Skills</Label>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="px-3 py-1">UI/UX Design</Badge>
                          <Badge className="px-3 py-1">Figma</Badge>
                          <Badge className="px-3 py-1">Adobe XD</Badge>
                          <Badge className="px-3 py-1">Sketch</Badge>
                          <Badge className="px-3 py-1">Prototyping</Badge>
                          <Badge className="px-3 py-1">Wireframing</Badge>
                          <Badge className="px-3 py-1">User Research</Badge>
                          <Badge className="px-3 py-1">HTML/CSS</Badge>
                          <Badge className="px-3 py-1 flex items-center gap-1">
                            <Plus className="h-3 w-3" />
                            Add Skill
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Soft Skills</Label>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="px-3 py-1">
                            Team Leadership
                          </Badge>
                          <Badge variant="outline" className="px-3 py-1">
                            Communication
                          </Badge>
                          <Badge variant="outline" className="px-3 py-1">
                            Problem Solving
                          </Badge>
                          <Badge variant="outline" className="px-3 py-1">
                            Project Management
                          </Badge>
                          <Badge variant="outline" className="px-3 py-1">
                            Client Relations
                          </Badge>
                          <Badge variant="outline" className="px-3 py-1 flex items-center gap-1">
                            <Plus className="h-3 w-3" />
                            Add Skill
                          </Badge>
                        </div>
                      </div>

                      <div className="p-3 bg-primary/10 rounded-md border border-primary/20 flex gap-3">
                        <div className="mt-0.5 text-primary">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">AI Skill Suggestions</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Based on your experience, consider adding these skills:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="px-3 py-1 cursor-pointer">
                              Usability Testing
                            </Badge>
                            <Badge variant="secondary" className="px-3 py-1 cursor-pointer">
                              Information Architecture
                            </Badge>
                            <Badge variant="secondary" className="px-3 py-1 cursor-pointer">
                              Design Systems
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Side - Preview */}
          <div className="lg:col-span-6">
            <Card className="sticky top-20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Resume Preview</CardTitle>
                <Select defaultValue="modern">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern Template</SelectItem>
                    <SelectItem value="classic">Classic Template</SelectItem>
                    <SelectItem value="minimal">Minimal Template</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-6 bg-white shadow-sm">
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold">John Doe</h1>
                    <p className="text-muted-foreground">UX Designer</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
                      <span>john@example.com</span>
                      <span>(123) 456-7890</span>
                      <span>New York, NY</span>
                      <span>johndoe.com</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h2 className="text-lg font-semibold border-b pb-1 mb-2">Summary</h2>
                    <p className="text-sm">
                      Experienced UX Designer with a passion for creating user-centered digital experiences. Skilled in
                      user research, wireframing, and prototyping with a proven track record of increasing user
                      engagement through thoughtful design solutions.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h2 className="text-lg font-semibold border-b pb-1 mb-2">Experience</h2>

                    <div className="mb-3">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Senior UX Designer</h3>
                        <span className="text-sm">Jan 2020 - Present</span>
                      </div>
                      <p className="text-sm font-medium">Design Studio Inc.</p>
                      <p className="text-sm mt-1">
                        Led the UX design team for multiple client projects, focusing on user research, wireframing, and
                        prototyping.
                      </p>
                      <ul className="list-disc list-inside text-sm mt-1">
                        <li>Redesigned the main product interface, increasing user engagement by 35%</li>
                        <li>Led a team of 5 designers across 3 major client projects</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-medium">UX Designer</h3>
                        <span className="text-sm">Mar 2018 - Dec 2019</span>
                      </div>
                      <p className="text-sm font-medium">Tech Innovations LLC</p>
                      <p className="text-sm mt-1">
                        Designed user interfaces for web and mobile applications, conducted user research, and created
                        wireframes and prototypes.
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h2 className="text-lg font-semibold border-b pb-1 mb-2">Education</h2>
                    <div className="flex justify-between">
                      <h3 className="font-medium">Bachelor of Design</h3>
                      <span className="text-sm">Sep 2014 - Jun 2018</span>
                    </div>
                    <p className="text-sm font-medium">Design University</p>
                    <p className="text-sm mt-1">
                      Specialized in User Experience Design and Interactive Media. Graduated with honors.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-sm bg-muted px-2 py-1 rounded">UI/UX Design</span>
                      <span className="text-sm bg-muted px-2 py-1 rounded">Figma</span>
                      <span className="text-sm bg-muted px-2 py-1 rounded">Adobe XD</span>
                      <span className="text-sm bg-muted px-2 py-1 rounded">Sketch</span>
                      <span className="text-sm bg-muted px-2 py-1 rounded">Prototyping</span>
                      <span className="text-sm bg-muted px-2 py-1 rounded">Wireframing</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm border px-2 py-1 rounded">Team Leadership</span>
                      <span className="text-sm border px-2 py-1 rounded">Communication</span>
                      <span className="text-sm border px-2 py-1 rounded">Problem Solving</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* AI Assistant Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
          <div className="relative">
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <FileText className="h-6 w-6" />
          </div>
        </Button>
      </div>
    </div>
  )
}
