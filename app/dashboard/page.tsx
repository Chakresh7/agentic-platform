import { MessageSquare, Plus, FileCheck, BarChart2, FileText, Crown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TopNavigation from "@/components/top-navigation"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <TopNavigation />

      {/* Main Content */}
      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Banner */}
        <div className="relative mb-6 rounded-lg border bg-card p-4 sm:p-5 md:p-6 text-card-foreground shadow w-full">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome back, John!</h1>
              <p className="text-muted-foreground mt-1">Your portfolio has received 12 views this week.</p>
            </div>
            <div className="flex items-center gap-4">
              <Button>Update Portfolio</Button>
              <Button variant="outline">View Analytics</Button>
            </div>
          </div>
          <div className="mt-4 p-3 sm:p-4 bg-primary/10 rounded-md border border-primary/20">
            <div className="flex gap-3">
              <div className="mt-0.5 text-primary">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">AI Tip: Your resume could use more quantifiable achievements.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adding metrics to your project descriptions to make your impact clearer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Build My Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Showcase your best work with a custom portfolio.</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <a href="/portfolio-builder">Get Started</a>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Generate Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Create a professional resume with AI assistance.</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <a href="/resume-builder">Create Now</a>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">ATS Resume Check</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Ensure your resume passes Applicant Tracking Systems.</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <a href="/ats-checker">Check Resume</a>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Cover Letter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Generate customized cover letters for job applications.</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <a href="/cover-letter">Create Letter</a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Additional Tools */}
        <h2 className="text-xl font-semibold mb-4">Additional Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">My Resumes</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">Manage your saved resumes and templates.</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <a href="/my-resumes">View Resumes</a>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Resume Analytics</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">Track performance of your resume submissions.</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <a href="/resume-analytics">View Analytics</a>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Job Matcher</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">Match your resume to job descriptions.</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <a href="/job-matcher">Match Jobs</a>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Premium Features</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">Upgrade to access advanced career tools.</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <a href="/premium-features">Upgrade Now</a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Activity & Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="activity" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <TabsList>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>SD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>
                          <span className="font-medium">Sarah Davis</span> invited you to collaborate on{" "}
                          <span className="font-medium">UI/UX Design Project</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>
                          Your <span className="font-medium">AI Assistant</span> updated your resume with new skills
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">Yesterday</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>TM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>
                          <span className="font-medium">Tech Meetup</span> event was added to your calendar
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">2 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">No new notifications</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Projects</h2>
              <Button variant="outline" size="sm" asChild>
                <a href="/projects">
                  <Plus className="h-4 w-4 mr-1" />
                  New
                </a>
              </Button>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">Mobile App Design</CardTitle>
                    <Badge>In Progress</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">UI/UX design for a fitness tracking application.</p>
                  <div className="flex mt-3 -space-x-2">
                    <Avatar className="h-6 w-6 border-2 border-background">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-6 w-6 border-2 border-background">
                      <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-6 w-6 border-2 border-background">
                      <AvatarFallback>TW</AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">Web Development</CardTitle>
                    <Badge variant="outline">Planning</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">E-commerce website for a local business.</p>
                  <div className="flex mt-3 -space-x-2">
                    <Avatar className="h-6 w-6 border-2 border-background">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-6 w-6 border-2 border-background">
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* AI Assistant Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
