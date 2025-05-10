import { Bookmark, Calendar, Clock, Filter, MessageSquare, Search, Share2, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TopNavigation from "@/components/top-navigation"

export default function News() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">News & Insights</h1>
            <p className="text-muted-foreground">Stay updated with the latest industry news and opportunities</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search news..." className="pl-8 w-full md:w-[200px]" />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <span className="w-full text-left">All News</span>
                  <Badge className="ml-auto">24</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <span className="w-full text-left">Industry Trends</span>
                  <Badge className="ml-auto">8</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <span className="w-full text-left">Internships</span>
                  <Badge className="ml-auto">5</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <span className="w-full text-left">Competitions</span>
                  <Badge className="ml-auto">3</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <span className="w-full text-left">Workshops</span>
                  <Badge className="ml-auto">6</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <span className="w-full text-left">Career Advice</span>
                  <Badge className="ml-auto">7</Badge>
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-3">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-md bg-primary/10 flex flex-col items-center justify-center text-primary">
                      <span className="text-xs font-medium">MAY</span>
                      <span className="text-lg font-bold">15</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Tech Meetup</h3>
                      <p className="text-sm text-muted-foreground">Networking event for students</p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>6:00 PM - 9:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-3">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-md bg-primary/10 flex flex-col items-center justify-center text-primary">
                      <span className="text-xs font-medium">MAY</span>
                      <span className="text-lg font-bold">22</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Design Workshop</h3>
                      <p className="text-sm text-muted-foreground">Learn UI/UX fundamentals</p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>2:00 PM - 5:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  View All Events
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - News Feed */}
          <div className="lg:col-span-6">
            <Tabs defaultValue="for-you" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="for-you">For You</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="latest">Latest</TabsTrigger>
                </TabsList>

                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Content</SelectItem>
                    <SelectItem value="articles">Articles</SelectItem>
                    <SelectItem value="opportunities">Opportunities</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="for-you" className="space-y-4">
                {/* News Article 1 */}
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img
                        src="/placeholder.svg?height=300&width=600"
                        alt="Article cover"
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary">Featured</Badge>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Industry Trends</Badge>
                        <span className="text-xs text-muted-foreground">May 10, 2023</span>
                      </div>
                      <h2 className="text-xl font-bold mb-2">The Future of AI in Design: What Students Need to Know</h2>
                      <p className="text-muted-foreground mb-4">
                        Artificial intelligence is transforming the design industry. Learn how AI tools are changing the
                        landscape and what skills you'll need to stay competitive in this evolving field.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Author" />
                            <AvatarFallback>TC</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">Tech Chronicle</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* News Article 2 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Internships</Badge>
                      <span className="text-xs text-muted-foreground">May 8, 2023</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Summer Internship Opportunities at Top Tech Companies</h2>
                    <p className="text-muted-foreground mb-4">
                      Looking for a summer internship? We've compiled a list of the best opportunities at leading tech
                      companies with application deadlines approaching soon.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Author" />
                          <AvatarFallback>CC</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">Career Connect</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* News Article 3 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Competitions</Badge>
                      <span className="text-xs text-muted-foreground">May 5, 2023</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Annual Student Design Challenge: $10,000 in Prizes</h2>
                    <p className="text-muted-foreground mb-4">
                      The annual Student Design Challenge is now accepting submissions. This year's theme is
                      "Sustainable Design Solutions" with prizes totaling $10,000 for the top entries.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Author" />
                          <AvatarFallback>DC</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">Design Community</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* News Article 4 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Career Advice</Badge>
                      <span className="text-xs text-muted-foreground">May 3, 2023</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Building a Portfolio That Stands Out: Expert Tips</h2>
                    <p className="text-muted-foreground mb-4">
                      Industry experts share their advice on creating a portfolio that catches recruiters' attention.
                      Learn what to include, what to leave out, and how to present your work effectively.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Author" />
                          <AvatarFallback>PC</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">Portfolio Coach</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trending">
                <div className="p-4 text-center text-muted-foreground">
                  <p>Trending articles will appear here.</p>
                </div>
              </TabsContent>

              <TabsContent value="latest">
                <div className="p-4 text-center text-muted-foreground">
                  <p>Latest articles will appear here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Recommended */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended for You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-16 w-16 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                    <img
                      src="/placeholder.svg?height=64&width=64"
                      alt="Article thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium line-clamp-2">Top 5 Programming Languages to Learn in 2023</h3>
                    <p className="text-xs text-muted-foreground mt-1">May 7, 2023</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-16 w-16 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                    <img
                      src="/placeholder.svg?height=64&width=64"
                      alt="Article thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium line-clamp-2">How to Ace Your Technical Interview</h3>
                    <p className="text-xs text-muted-foreground mt-1">May 5, 2023</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-16 w-16 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                    <img
                      src="/placeholder.svg?height=64&width=64"
                      alt="Article thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium line-clamp-2">Remote Internship Opportunities for Students</h3>
                    <p className="text-xs text-muted-foreground mt-1">May 2, 2023</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-16 w-16 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                    <img
                      src="/placeholder.svg?height=64&width=64"
                      alt="Article thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium line-clamp-2">Designing for Accessibility: A Beginner's Guide</h3>
                    <p className="text-xs text-muted-foreground mt-1">April 28, 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Popular Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="px-3 py-1">
                    UI/UX Design
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Web Development
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    AI
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Mobile Apps
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Career Growth
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Internships
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Startups
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Remote Work
                  </Badge>
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
            <MessageSquare className="h-6 w-6" />
          </div>
        </Button>
      </div>
    </div>
  )
}
