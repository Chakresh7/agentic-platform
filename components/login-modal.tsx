"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { UserService } from "@/services/user-service"

type LoginModalProps = {
  mode?: "login" | "signup"
  children?: React.ReactNode
}

export default function LoginModal({
  mode = "login",
  children,
}: LoginModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">(mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent, type: "login" | "signup") => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (type === "login") {
        const response = await UserService.signIn(email, password);
        if (response.success) {
          toast({
            title: "Success",
            description: "Logged in successfully",
          });
          setOpen(false);
          // Reset form
          setEmail("");
          setPassword("");
          
          // Store user data in localStorage
          if (typeof window !== "undefined" && response.user) {
            localStorage.setItem("currentUser", JSON.stringify({
              id: response.user.id,
              name: response.user.name || email.split("@")[0],
              email: response.user.email
            }));
          }
          
          console.log("Login successful", response.user);
          
          // Redirect to dashboard
          router.push("/dashboard");
        } else {
          setError(response.message);
          toast({
            title: "Error",
            description: response.message,
            variant: "destructive",
          });
        }
      } else {
        const response = await UserService.signUp(name, email, password);
        if (response.success) {
          toast({
            title: "Success",
            description: "Account created successfully",
          });
          setOpen(false);
          // Reset form
          setEmail("");
          setPassword("");
          setName("");
          
          // Store user data in localStorage
          if (typeof window !== "undefined" && response.user) {
            localStorage.setItem("currentUser", JSON.stringify({
              id: response.user.id,
              name: response.user.name || name,
              email: response.user.email
            }));
          }
          
          console.log("Signup successful", response.user);
          
          // Redirect to dashboard
          router.push("/dashboard");
        } else {
          setError(response.message);
          toast({
            title: "Error",
            description: response.message,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError("An unexpected error occurred");
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await UserService.signInWithSocial(provider);
      if (response.success) {
        toast({
          title: "Social Login",
          description: `${provider} login initiated`,
        });
        // In a real app, this would redirect to the provider's auth page
        console.log(`Login with ${provider} initiated`);
      } else {
        setError(response.message);
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setError("An unexpected error occurred");
      toast({
        title: "Error",
        description: "An unexpected error occurred with social login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant={mode === "login" ? "outline" : "default"}>{mode === "login" ? "Log In" : "Sign Up"}</Button>
        )}
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[900px] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <Tabs defaultValue={mode} value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")} className="w-full">
              <TabsContent value="login">
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">Welcome back</h2>
                    <p className="text-muted-foreground">Login to your AgentHub account</p>
                  </div>
                  
                  <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-login">Email</Label>
                      <Input
                        id="email-login"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-login">Password</Label>
                        <Button 
                          variant="link" 
                          className="px-0 h-auto font-normal text-xs" 
                          onClick={() => alert("Password reset functionality")}
                        >
                          Forgot your password?
                        </Button>
                      </div>
                      <div className="relative">
                        <Input
                          id="password-login"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </div>
                    
                    {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Login
                    </Button>
                  </form>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" onClick={() => handleSocialLogin("Apple")} className="w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M9 7c-3 0-4 3-4 5.5 0 3 2 7.5 5 7.5 1.088 0 1.711-.744 3-1.5 1.289.744 1.912 1.5 3 1.5 3 0 5-4.5 5-7.5C21 10 20 7 17 7c-1.088 0-1.711.744-3 1.5C12.711 7.744 12.088 7 11 7c-.474 0-.93.064-1.366.178"></path>
                        <path d="M9 1v8"></path>
                      </svg>
                      Apple
                    </Button>
                    <Button variant="outline" onClick={() => handleSocialLogin("Google")} className="w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 12 h8"></path>
                        <path d="M12 8 v8"></path>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" onClick={() => handleSocialLogin("Meta")} className="w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      Meta
                    </Button>
                  </div>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Button variant="link" className="p-0 h-auto font-normal" onClick={() => setActiveTab("signup")}>
                      Sign up
                    </Button>
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="signup">
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">Create an account</h2>
                    <p className="text-muted-foreground">Sign up for your AgentHub account</p>
                  </div>
                  
                  <form onSubmit={(e) => handleSubmit(e, "signup")} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email-signup">Email</Label>
                      <Input
                        id="email-signup"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password-signup">Password</Label>
                      <div className="relative">
                        <Input
                          id="password-signup"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </div>
                    
                    {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Account
                    </Button>
                  </form>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" onClick={() => handleSocialLogin("Apple")} className="w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M9 7c-3 0-4 3-4 5.5 0 3 2 7.5 5 7.5 1.088 0 1.711-.744 3-1.5 1.289.744 1.912 1.5 3 1.5 3 0 5-4.5 5-7.5C21 10 20 7 17 7c-1.088 0-1.711.744-3 1.5C12.711 7.744 12.088 7 11 7c-.474 0-.93.064-1.366.178"></path>
                        <path d="M9 1v8"></path>
                      </svg>
                      Apple
                    </Button>
                    <Button variant="outline" onClick={() => handleSocialLogin("Google")} className="w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 12 h8"></path>
                        <path d="M12 8 v8"></path>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" onClick={() => handleSocialLogin("Meta")} className="w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      Meta
                    </Button>
                  </div>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Button variant="link" className="p-0 h-auto font-normal" onClick={() => setActiveTab("login")}>
                      Log in
                    </Button>
                  </p>
                  
                  <p className="text-center text-xs text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <a href="#" className="underline underline-offset-4 hover:text-primary">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline underline-offset-4 hover:text-primary">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="hidden md:block bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 0 10 L 40 10 M 10 0 L 10 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Main image - changes based on active tab */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              {activeTab === "login" ? (
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary/20 rounded-full filter blur-xl opacity-70"></div>
                  <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary/20 rounded-full filter blur-xl opacity-70"></div>
                  
                  <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">Welcome Back!</h3>
                    <p className="text-muted-foreground mb-6">Log in to access your AI-powered portfolio tools and career resources.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-2">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                          <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                          <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                          <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                        <span className="text-sm font-medium">Portfolio Builder</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-2">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                          <path d="M3 9h18"></path>
                          <path d="M9 21V9"></path>
                        </svg>
                        <span className="text-sm font-medium">Resume Tools</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <hr className="flex-grow border-t border-border/50" />
                      <span className="text-xs text-muted-foreground">Powered by AI</span>
                      <hr className="flex-grow border-t border-border/50" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/20 rounded-full filter blur-xl opacity-70"></div>
                  <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-primary/20 rounded-full filter blur-xl opacity-70"></div>
                  
                  <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">Join AgentHub</h3>
                    <p className="text-muted-foreground mb-6">Create your account to build professional portfolios and advance your career with AI.</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">AI-Powered Resume Builder</h4>
                          <p className="text-xs text-muted-foreground">Create professional resumes tailored to your industry</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Portfolio Showcase</h4>
                          <p className="text-xs text-muted-foreground">Display your work with beautiful templates</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Team Collaboration</h4>
                          <p className="text-xs text-muted-foreground">Find teammates and manage projects together</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <hr className="flex-grow border-t border-border/50" />
                      <span className="text-xs text-muted-foreground">Join Today</span>
                      <hr className="flex-grow border-t border-border/50" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
