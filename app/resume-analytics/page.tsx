"use client"

import { useState } from "react"
import { ArrowLeft, BarChart2, TrendingUp, Users, Briefcase, Target, Calendar, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TopNavigation from "@/components/top-navigation"

export default function ResumeAnalytics() {
  const [selectedResume, setSelectedResume] = useState("all")
  const [timeRange, setTimeRange] = useState("30days")
  
  // Mock data for analytics
  const viewsData = {
    total: 248,
    change: 23,
    trend: "up",
    chart: [15, 25, 18, 30, 22, 35, 28, 33, 42]
  }
  
  const applicationsData = {
    total: 42,
    change: 8,
    trend: "up",
    chart: [5, 7, 4, 8, 6, 9, 3]
  }
  
  const topCompanies = [
    { name: "Tech Innovations Inc", views: 28 },
    { name: "Global Solutions", views: 21 },
    { name: "NextGen Systems", views: 17 },
    { name: "Apex Software", views: 14 },
    { name: "Digital Dynamics", views: 12 }
  ]
  
  const industryBreakdown = [
    { industry: "Technology", percentage: 42 },
    { industry: "Finance", percentage: 23 },
    { industry: "Healthcare", percentage: 15 },
    { industry: "Education", percentage: 12 },
    { industry: "Other", percentage: 8 }
  ]
  
  const keywordAnalytics = [
    { keyword: "JavaScript", matches: 34 },
    { keyword: "React", matches: 29 },
    { keyword: "Project Management", matches: 23 },
    { keyword: "Data Analysis", matches: 19 },
    { keyword: "Customer Success", matches: 15 }
  ]

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Resume Analytics</h1>
            <p className="text-muted-foreground">Insights and performance metrics for your resumes</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Select value={selectedResume} onValueChange={setSelectedResume}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Resume" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resumes</SelectItem>
                <SelectItem value="software-engineer">Software Engineer</SelectItem>
                <SelectItem value="product-manager">Product Manager</SelectItem>
                <SelectItem value="data-scientist">Data Scientist</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="alltime">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Profile Views</p>
                  <p className="text-3xl font-bold">{viewsData.total}</p>
                  <div className={`flex items-center text-sm ${viewsData.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {viewsData.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1 rotate-180" />}
                    <span>{viewsData.change}% {viewsData.trend === "up" ? "increase" : "decrease"}</span>
                  </div>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Applications</p>
                  <p className="text-3xl font-bold">{applicationsData.total}</p>
                  <div className={`flex items-center text-sm ${applicationsData.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {applicationsData.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1 rotate-180" />}
                    <span>{applicationsData.change}% {applicationsData.trend === "up" ? "increase" : "decrease"}</span>
                  </div>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Match Rate</p>
                  <p className="text-3xl font-bold">78%</p>
                  <div className="flex items-center text-sm text-green-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>12% increase</span>
                  </div>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Target className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Interview Rate</p>
                  <p className="text-3xl font-bold">32%</p>
                  <div className="flex items-center text-sm text-green-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>5% increase</span>
                  </div>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Activity Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 py-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Visibility</CardTitle>
                    <CardDescription>Profile views over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] flex items-end justify-between">
                      {viewsData.chart.map((value, i) => (
                        <div key={i} className="w-8 bg-primary/90 rounded-t-md" style={{ height: `${value * 4}px` }}></div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Apr 1</span>
                      <span>Apr 8</span>
                      <span>Apr 15</span>
                      <span>Apr 22</span>
                      <span>Apr 30</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Application Activity</CardTitle>
                    <CardDescription>Applications submitted</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-end justify-between">
                      {applicationsData.chart.map((value, i) => (
                        <div key={i} className="w-10 bg-primary/90 rounded-t-md" style={{ height: `${value * 15}px` }}></div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Monday</span>
                      <span>Tuesday</span>
                      <span>Wednesday</span>
                      <span>Thursday</span>
                      <span>Friday</span>
                      <span>Saturday</span>
                      <span>Sunday</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-6 py-4">
                <Card>
                  <CardHeader>
                    <CardTitle>ATS Compatibility Score</CardTitle>
                    <CardDescription>How well your resume performs with ATS systems</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Overall Score</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Keyword Optimization</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Formatting</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Content Structure</span>
                        <span className="font-medium">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Skills Relevance</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Application Funnel</CardTitle>
                    <CardDescription>Conversion rates through hiring stages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Applications</span>
                        <span className="font-medium">42</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Resume Screened</span>
                        <span className="font-medium">38 (90%)</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Phone Screening</span>
                        <span className="font-medium">21 (50%)</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Technical Interview</span>
                        <span className="font-medium">14 (33%)</span>
                      </div>
                      <Progress value={33} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Final Interview</span>
                        <span className="font-medium">8 (19%)</span>
                      </div>
                      <Progress value={19} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Offer</span>
                        <span className="font-medium">3 (7%)</span>
                      </div>
                      <Progress value={7} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Viewed By</CardTitle>
                <CardDescription>Companies viewing your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCompanies.map((company, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span>{company.name}</span>
                      <span className="font-medium">{company.views} views</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Industry Breakdown</CardTitle>
                <CardDescription>Resume views by industry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {industryBreakdown.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span>{item.industry}</span>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Keyword Analytics</CardTitle>
                <CardDescription>Most matched keywords</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keywordAnalytics.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span>{item.keyword}</span>
                        <span className="font-medium">{item.matches} matches</span>
                      </div>
                      <Progress value={item.matches / 0.4} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 