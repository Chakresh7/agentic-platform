import { CheckSquare, Clock, MessageSquare, Plus, Search, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import TopNavigation from "@/components/top-navigation"

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">Manage your projects and collaborate with teammates</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search projects..." className="pl-8 w-full md:w-[200px]" />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Project Card 1 */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-green-500 hover:bg-green-600">In Progress</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl mt-2">Mobile App Design</CardTitle>
                  <p className="text-sm text-muted-foreground">UI/UX design for a fitness tracking application</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarFallback>SD</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarFallback>TW</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground text-xs border-2 border-background">
                          +2
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Due in 5 days</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>12/20 tasks</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>8 comments</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Open Project
                  </Button>
                </CardFooter>
              </Card>

              {/* Project Card 2 */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-amber-500 hover:bg-amber-600">Planning</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl mt-2">E-commerce Website</CardTitle>
                  <p className="text-sm text-muted-foreground">Web development for a local business</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarFallback>MJ</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Due in 2 weeks</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>5/18 tasks</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>12 comments</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Open Project
                  </Button>
                </CardFooter>
              </Card>

              {/* Project Card 3 */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-blue-500 hover:bg-blue-600">Research</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl mt-2">Market Analysis</CardTitle>
                  <p className="text-sm text-muted-foreground">Research project for a new product launch</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarFallback>RP</AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Due in 10 days</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>8/15 tasks</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>5 comments</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Open Project
                  </Button>
                </CardFooter>
              </Card>

              {/* Project Card 4 */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-purple-500 hover:bg-purple-600">Design</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl mt-2">Brand Identity</CardTitle>
                  <p className="text-sm text-muted-foreground">Logo and brand guidelines for a startup</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">80%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarFallback>SD</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Due tomorrow</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>10/12 tasks</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>15 comments</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Open Project
                  </Button>
                </CardFooter>
              </Card>

              {/* Project Card 5 */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-green-500 hover:bg-green-600">In Progress</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl mt-2">Mobile Game</CardTitle>
                  <p className="text-sm text-muted-foreground">Casual mobile game development</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">55%</span>
                      </div>
                      <Progress value={55} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarFallback>MJ</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <AvatarFallback>JW</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground text-xs border-2 border-background">
                          +3
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Due in 3 weeks</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>15/30 tasks</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>24 comments</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Open Project
                  </Button>
                </CardFooter>
              </Card>

              {/* Add New Project Card */}
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full py-10">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg mb-1">Create New Project</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Start a new project and invite teammates
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="p-4 text-center text-muted-foreground">
              <p>Your completed projects will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="archived">
            <div className="p-4 text-center text-muted-foreground">
              <p>Your archived projects will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
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
