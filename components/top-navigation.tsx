"use client"

import { useState } from "react"
import { 
  Bell, 
  ChevronDown, 
  Search, 
  FileText, 
  FileCheck, 
  FilePlus, 
  Mail, 
  Briefcase, 
  MessagesSquare, 
  BarChart,
  Star
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"

export default function TopNavigation() {
  const [isResumeMenuOpen, setIsResumeMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl w-full flex h-16 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
              A
            </div>
            <span>AgentHub</span>
          </a>
          <nav className="hidden md:flex items-center gap-4 ml-2">
            <a href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Home
            </a>
            <a href="/portfolio-builder" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Portfolio
            </a>
            
            {/* Resume Dropdown Menu */}
            <div className="relative">
              <DropdownMenu open={isResumeMenuOpen} onOpenChange={setIsResumeMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setIsResumeMenuOpen(!isResumeMenuOpen)}
                    suppressHydrationWarning
                  >
                    Resume <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-72 p-2">
                  <DropdownMenuLabel>Resume Tools</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="py-2 hover:bg-accent/50 transition-colors">
                      <a href="/resume-builder" className="flex items-start gap-2 cursor-pointer">
                        <FilePlus className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <span className="font-medium">AI Resume Builder</span>
                          <p className="text-xs text-muted-foreground mt-0.5">Create professional resumes with AI assistance</p>
                        </div>
                      </a>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild className="py-2 hover:bg-accent/50 transition-colors">
                      <a href="/ats-checker" className="flex items-start gap-2 cursor-pointer">
                        <FileCheck className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <span className="font-medium">ATS Resume Checker</span>
                          <p className="text-xs text-muted-foreground mt-0.5">Scan for ATS compatibility and get improvement tips</p>
                        </div>
                      </a>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild className="py-2 hover:bg-accent/50 transition-colors">
                      <a href="/cover-letter" className="flex items-start gap-2 cursor-pointer">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <span className="font-medium">Cover Letter Generator</span>
                          <p className="text-xs text-muted-foreground mt-0.5">Create personalized cover letters for each job</p>
                        </div>
                      </a>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild className="py-2 hover:bg-accent/50 transition-colors">
                      <a href="/job-matcher" className="flex items-start gap-2 cursor-pointer">
                        <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <span className="font-medium">Job Description Matcher</span>
                          <p className="text-xs text-muted-foreground mt-0.5">Tailor your resume to match job descriptions</p>
                        </div>
                      </a>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild className="py-2 hover:bg-accent/50 transition-colors">
                      <a href="/interview-prep" className="flex items-start gap-2 cursor-pointer">
                        <MessagesSquare className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <span className="font-medium">Interview Prep</span>
                          <p className="text-xs text-muted-foreground mt-0.5">Practice with AI-generated interview questions</p>
                        </div>
                      </a>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild className="py-2 hover:bg-accent/50 transition-colors">
                      <a href="/resume-analytics" className="flex items-start gap-2 cursor-pointer">
                        <BarChart className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <span className="font-medium">Resume Analytics</span>
                          <p className="text-xs text-muted-foreground mt-0.5">Track performance and get improvement suggestions</p>
                        </div>
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem asChild className="py-2 hover:bg-accent/50 transition-colors">
                    <a href="/my-resumes" className="flex items-start gap-2 cursor-pointer">
                      <FileText className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <span className="font-medium">My Resumes</span>
                        <p className="text-xs text-muted-foreground mt-0.5">Manage all your saved resumes</p>
                      </div>
                    </a>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild className="py-2 hover:bg-accent/50 transition-colors">
                    <a href="/premium-features" className="flex items-start gap-2 cursor-pointer">
                      <Star className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Premium Features</span>
                        <p className="text-xs text-muted-foreground mt-0.5">Unlock all advanced resume tools</p>
                      </div>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <a href="/team-finder" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Team Finder
            </a>
            <a href="/projects" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Projects
            </a>
            <a href="/news" className="text-sm font-medium text-muted-foreground hover:text-primary">
              News
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Search input removed */}
          <Button variant="ghost" size="icon" className="relative" suppressHydrationWarning>
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
          
          {/* User Profile Dropdown */}
          <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2" suppressHydrationWarning>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-flex text-sm font-medium">John Doe</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
              <DropdownMenuItem asChild>
                <a href="/profile" className="cursor-pointer">
                  Profile
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/dashboard" className="cursor-pointer">
                  Dashboard
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/settings" className="cursor-pointer">
                  Settings
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-destructive">
                <a href="/logout" className="cursor-pointer">
                  Logout
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="hidden md:flex" suppressHydrationWarning>Create Project</Button>
        </div>
      </div>
    </header>
  )
}
