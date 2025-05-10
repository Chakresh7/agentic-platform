"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserMenu } from "@/components/user-menu"
import LoginModal from "@/components/login-modal"
import { UserService } from "@/services/user-service"

export function SiteHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null)

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // In a real app, this would check with a backend API
        // For now, we'll just check localStorage
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("currentUser")
          if (storedUser) {
            const user = JSON.parse(storedUser)
            setIsLoggedIn(true)
            setUserData(user)
          }
        }
      } catch (error) {
        console.error("Error checking login status:", error)
      }
    }

    checkLoginStatus()
  }, [])

  // Mock login function for demo purposes
  const handleDemoLogin = () => {
    const demoUser = {
      id: "user_demo",
      name: "John Doe",
      email: "john@example.com",
    }
    
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(demoUser))
    }
    
    setIsLoggedIn(true)
    setUserData(demoUser)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">A</span>
            <span className="font-bold">AgentHub</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className={`transition-colors hover:text-foreground/80 ${pathname === "/" ? "text-foreground" : "text-foreground/60"}`}>
              Home
            </Link>
            <Link href="/portfolio" className={`transition-colors hover:text-foreground/80 ${pathname === "/portfolio" ? "text-foreground" : "text-foreground/60"}`}>
              Portfolio
            </Link>
            <Link href="/resume" className={`transition-colors hover:text-foreground/80 ${pathname?.startsWith("/resume") ? "text-foreground" : "text-foreground/60"}`}>
              Resume
            </Link>
            <Link href="/team-finder" className={`transition-colors hover:text-foreground/80 ${pathname === "/team-finder" ? "text-foreground" : "text-foreground/60"}`}>
              Team Finder
            </Link>
            <Link href="/projects" className={`transition-colors hover:text-foreground/80 ${pathname === "/projects" ? "text-foreground" : "text-foreground/60"}`}>
              Projects
            </Link>
            <Link href="/news" className={`transition-colors hover:text-foreground/80 ${pathname === "/news" ? "text-foreground" : "text-foreground/60"}`}>
              News
            </Link>
          </nav>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex">
            <div className="flex items-center space-x-1">
              {isLoggedIn ? (
                <UserMenu 
                  userName={userData?.name || "User"} 
                  userEmail={userData?.email || "user@example.com"} 
                />
              ) : (
                <>
                  <LoginModal mode="login">
                    <Button variant="ghost" className="text-sm">
                      Log In
                    </Button>
                  </LoginModal>
                  <LoginModal mode="signup">
                    <Button className="text-sm">
                      Sign Up
                    </Button>
                  </LoginModal>
                  {/* Demo login button - for development only */}
                  <Button variant="outline" className="text-sm" onClick={handleDemoLogin}>
                    Demo Login
                  </Button>
                </>
              )}
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground">
                  Home
                </Link>
                <Link href="/portfolio" className="text-foreground/60 transition-colors hover:text-foreground">
                  Portfolio
                </Link>
                <Link href="/resume" className="text-foreground/60 transition-colors hover:text-foreground">
                  Resume
                </Link>
                <Link href="/team-finder" className="text-foreground/60 transition-colors hover:text-foreground">
                  Team Finder
                </Link>
                <Link href="/projects" className="text-foreground/60 transition-colors hover:text-foreground">
                  Projects
                </Link>
                <Link href="/news" className="text-foreground/60 transition-colors hover:text-foreground">
                  News
                </Link>
                <div className="pt-4 border-t">
                  {isLoggedIn ? (
                    <Button variant="outline" className="w-full justify-start" onClick={() => {
                      // Navigate to the dedicated logout page
                      window.location.href = "/logout"
                    }}>
                      Log Out
                    </Button>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <LoginModal mode="login">
                        <Button variant="outline" className="w-full">
                          Log In
                        </Button>
                      </LoginModal>
                      <LoginModal mode="signup">
                        <Button className="w-full">
                          Sign Up
                        </Button>
                      </LoginModal>
                      {/* Demo login button - for development only */}
                      <Button variant="secondary" className="w-full" onClick={handleDemoLogin}>
                        Demo Login
                      </Button>
                    </div>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
