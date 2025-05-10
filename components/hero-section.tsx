"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoginModal from "@/components/login-modal"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
        {/* Black and white mesh grid background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.3'%3E%3Cpath d='M0 0h1v20H0V0zm10 0h1v20h-1V0zM5 0h1v20H5V0zm15 0h-1v20h1V0zM0 5v1h20V5H0zm0 10v1h20v-1H0z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px',
          opacity: 0.3,
          mixBlendMode: 'normal'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          <div className="flex flex-col justify-center space-y-4 text-left">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit mb-2">
              <span className="text-xs">Powered by AI</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Build Your Professional Portfolio with AI
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Create stunning portfolios, craft professional resumes, and showcase your work with our AI-powered
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <LoginModal mode="signup">
                <Button 
                  size="lg" 
                  className="gap-1.5 group"
                >
                  Get Started 
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2" />
                </Button>
              </LoginModal>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Explore Features
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/50 to-purple-500/50 opacity-30 blur-xl"></div>
              <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                  alt="Portfolio builder interface"
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                  loading="eager"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-lg border bg-background p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">AI-Powered</p>
                  <p className="text-xs text-muted-foreground">Smart suggestions</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 rounded-lg border bg-background p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Templates</p>
                  <p className="text-xs text-muted-foreground">Professional designs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
