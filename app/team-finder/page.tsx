import { Filter, MessageSquare, Search, Sliders, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import TopNavigation from "@/components/top-navigation"

export default function TeamFinder() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Finder</h1>
            <p className="text-muted-foreground">Find teammates for your next project</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              My Teams
            </Button>
            <Button size="sm">Create Team</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                    Reset
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search-skills">Skills</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="search-skills" type="search" placeholder="Search skills..." className="pl-8" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className="px-2 py-1">
                      UI/UX Design
                      <button className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                    <Badge variant="secondary" className="px-2 py-1">
                      React
                      <button className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                    <Badge variant="secondary" className="px-2 py-1">
                      Node.js
                      <button className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-type">Project Type</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="project-type">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="availability">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Availability</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="weekends">Weekends Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <div className="pt-2">
                    <Slider defaultValue={[3]} max={5} step={1} />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Expert</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Remote Only</span>
                    <Switch id="remote-only" />
                  </div>
                </div>

                <div className="pt-2">
                  <Button className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">AI Matching</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-primary/10 rounded-md border border-primary/20">
                  <p className="text-sm">
                    Our AI can find the perfect teammates based on your profile, skills, and project needs.
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  Find My Match
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Team Members */}
          <div className="lg:col-span-9">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <Tabs defaultValue="all" className="w-full">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="recommended">Recommended</TabsTrigger>
                    <TabsTrigger value="recent">Recently Active</TabsTrigger>
                  </TabsList>

                  <div className="flex items-center gap-2">
                    <div className="relative w-full md:w-auto">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search members..." className="pl-8 w-full md:w-[200px]" />
                    </div>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Sliders className="h-4 w-4" />
                    </Button>
                    <Select defaultValue="match">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="match">Best Match</SelectItem>
                        <SelectItem value="recent">Recently Active</SelectItem>
                        <SelectItem value="experience">Experience</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value="all" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Team Member Card 1 */}
                    <Card className="overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="h-24 bg-gradient-to-r from-primary/20 to-primary/40"></div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex justify-between -mt-10">
                          <Avatar className="h-20 w-20 border-4 border-background">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                            <AvatarFallback>SD</AvatarFallback>
                          </Avatar>
                          <Badge className="mt-2 bg-green-500 hover:bg-green-600">95% Match</Badge>
                        </div>

                        <div className="mt-3">
                          <h3 className="font-semibold text-lg">Sarah Davis</h3>
                          <p className="text-muted-foreground">UX Designer & Researcher</p>

                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <span>New York, NY</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <span>Full-time</span>
                          </div>

                          <div className="mt-3">
                            <h4 className="text-sm font-medium mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                UI/UX Design
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                User Research
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Figma
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Prototyping
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm">Invite to Team</Button>
                      </CardFooter>
                    </Card>

                    {/* Team Member Card 2 */}
                    <Card className="overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="h-24 bg-gradient-to-r from-blue-500/20 to-blue-500/40"></div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex justify-between -mt-10">
                          <Avatar className="h-20 w-20 border-4 border-background">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                            <AvatarFallback>MJ</AvatarFallback>
                          </Avatar>
                          <Badge className="mt-2 bg-green-500 hover:bg-green-600">88% Match</Badge>
                        </div>

                        <div className="mt-3">
                          <h3 className="font-semibold text-lg">Michael Johnson</h3>
                          <p className="text-muted-foreground">Full Stack Developer</p>

                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <span>Remote</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <span>Part-time</span>
                          </div>

                          <div className="mt-3">
                            <h4 className="text-sm font-medium mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                React
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Node.js
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                TypeScript
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                MongoDB
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm">Invite to Team</Button>
                      </CardFooter>
                    </Card>

                    {/* Team Member Card 3 */}
                    <Card className="overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="h-24 bg-gradient-to-r from-purple-500/20 to-purple-500/40"></div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex justify-between -mt-10">
                          <Avatar className="h-20 w-20 border-4 border-background">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                            <AvatarFallback>AL</AvatarFallback>
                          </Avatar>
                          <Badge className="mt-2 bg-blue-500 hover:bg-blue-600">75% Match</Badge>
                        </div>

                        <div className="mt-3">
                          <h3 className="font-semibold text-lg">Alex Lee</h3>
                          <p className="text-muted-foreground">Product Manager</p>

                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <span>San Francisco, CA</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <span>Full-time</span>
                          </div>

                          <div className="mt-3">
                            <h4 className="text-sm font-medium mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Product Strategy
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Agile
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                User Stories
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Roadmapping
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm">Invite to Team</Button>
                      </CardFooter>
                    </Card>

                    {/* Team Member Card 4 */}
                    <Card className="overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="h-24 bg-gradient-to-r from-amber-500/20 to-amber-500/40"></div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex justify-between -mt-10">
                          <Avatar className="h-20 w-20 border-4 border-background">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                            <AvatarFallback>JW</AvatarFallback>
                          </Avatar>
                          <Badge className="mt-2 bg-blue-500 hover:bg-blue-600">72% Match</Badge>
                        </div>

                        <div className="mt-3">
                          <h3 className="font-semibold text-lg">Jamie Wilson</h3>
                          <p className="text-muted-foreground">Mobile Developer</p>

                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <span>Remote</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <span>Weekends</span>
                          </div>

                          <div className="mt-3">
                            <h4 className="text-sm font-medium mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                React Native
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Swift
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Kotlin
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Firebase
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm">Invite to Team</Button>
                      </CardFooter>
                    </Card>

                    {/* Team Member Card 5 */}
                    <Card className="overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="h-24 bg-gradient-to-r from-green-500/20 to-green-500/40"></div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex justify-between -mt-10">
                          <Avatar className="h-20 w-20 border-4 border-background">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                            <AvatarFallback>RP</AvatarFallback>
                          </Avatar>
                          <Badge className="mt-2 bg-blue-500 hover:bg-blue-600">68% Match</Badge>
                        </div>

                        <div className="mt-3">
                          <h3 className="font-semibold text-lg">Rachel Park</h3>
                          <p className="text-muted-foreground">Data Scientist</p>

                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <span>Boston, MA</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <span>Part-time</span>
                          </div>

                          <div className="mt-3">
                            <h4 className="text-sm font-medium mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Python
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Machine Learning
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Data Analysis
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                SQL
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm">Invite to Team</Button>
                      </CardFooter>
                    </Card>

                    {/* Team Member Card 6 */}
                    <Card className="overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="h-24 bg-gradient-to-r from-red-500/20 to-red-500/40"></div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex justify-between -mt-10">
                          <Avatar className="h-20 w-20 border-4 border-background">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                            <AvatarFallback>TN</AvatarFallback>
                          </Avatar>
                          <Badge className="mt-2 bg-blue-500 hover:bg-blue-600">65% Match</Badge>
                        </div>

                        <div className="mt-3">
                          <h3 className="font-semibold text-lg">Tyler Nguyen</h3>
                          <p className="text-muted-foreground">DevOps Engineer</p>

                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <span>Remote</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <span>Full-time</span>
                          </div>

                          <div className="mt-3">
                            <h4 className="text-sm font-medium mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                AWS
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Docker
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                Kubernetes
                              </Badge>
                              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                CI/CD
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm">Invite to Team</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="recommended">
                  <div className="p-4 text-center text-muted-foreground">
                    <p>AI-recommended matches will appear here based on your profile and project needs.</p>
                  </div>
                </TabsContent>

                <TabsContent value="recent">
                  <div className="p-4 text-center text-muted-foreground">
                    <p>Recently active members will appear here.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
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
            <MessageSquare className="h-6 w-6" />
          </div>
        </Button>
      </div>
    </div>
  )
}
