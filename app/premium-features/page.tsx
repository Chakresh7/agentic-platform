"use client"

import { useState } from "react"
import { ArrowLeft, Check, CreditCard, Zap, CheckCircle, ChevronRight, Crown, Shield, UserPlus, Clock, BarChart2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import TopNavigation from "@/components/top-navigation"
import { useToast } from "@/components/ui/use-toast"

export default function PremiumFeatures() {
  const { toast } = useToast()
  const [billingCycle, setBillingCycle] = useState("monthly")
  
  const handleSubscribe = (plan) => {
    toast({
      title: "Subscription initiated",
      description: `You're being redirected to complete your ${plan} subscription.`,
    })
    // In a real app, this would redirect to a payment processor
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Premium Features</h1>
            <p className="text-muted-foreground">Upgrade your career toolkit with premium features</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20 py-1.5 px-3">
              <Crown className="h-4 w-4 mr-1.5" />
              Unlock Premium Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">Supercharge Your Job Search</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Get exclusive access to advanced tools that will give you an edge in the competitive job market and help you land your dream job faster.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <Tabs 
              defaultValue="monthly" 
              value={billingCycle} 
              onValueChange={setBillingCycle}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">
                  Yearly
                  <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-600 border-green-500/20">
                    Save 20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Basic features to get started</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-muted-foreground">/forever</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Standard resume builder</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Basic ATS compatibility check</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Simple cover letter templates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Limited job matching analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Store up to 2 resumes</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Current Plan
                </Button>
              </CardFooter>
            </Card>
            
            {/* Pro Plan */}
            <Card className="border-primary/50 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground py-1 px-3 text-xs font-medium">
                POPULAR
              </div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>Advanced features for serious job seekers</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">
                    ${billingCycle === "monthly" ? "19.99" : "15.99"}
                  </span>
                  <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "month, billed annually"}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Everything in Free, plus:</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Advanced AI resume optimization</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Detailed ATS compatibility report</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Custom cover letter generation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Job description keyword analyzer</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Store unlimited resumes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Resume analytics & tracking</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleSubscribe("Pro")}>
                  <Zap className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </CardFooter>
            </Card>
            
            {/* Premium Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>Maximum advantage for your career</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">
                    ${billingCycle === "monthly" ? "39.99" : "31.99"}
                  </span>
                  <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "month, billed annually"}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Everything in Pro, plus:</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>AI interview coach & practice</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Company-specific resume tailoring</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Executive portfolio builder</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Career coaching session (1/month)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Industry insights & salary data</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Priority customer support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleSubscribe("Premium")}>
                  <Crown className="h-4 w-4 mr-2" />
                  Get Premium
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-16 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium">AI-Powered Tools</h3>
                <p className="text-muted-foreground">
                  Our advanced AI analyzes job descriptions and optimizes your resume to increase your chances of getting noticed by recruiters.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium">ATS Optimization</h3>
                <p className="text-muted-foreground">
                  Ensure your resume passes through Applicant Tracking Systems with our detailed compatibility analysis and suggestions.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium">Interview Preparation</h3>
                <p className="text-muted-foreground">
                  Practice with our AI interview coach that provides real-time feedback on your answers to common and technical questions.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium">Resume Analytics</h3>
                <p className="text-muted-foreground">
                  Track how your resume performs with detailed analytics on views, downloads, and engagement from potential employers.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium">Time-Saving Templates</h3>
                <p className="text-muted-foreground">
                  Access industry-specific templates designed by professional resume writers to save time and showcase your skills effectively.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Crown className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium">Career Coaching</h3>
                <p className="text-muted-foreground">
                  Get personalized advice from industry experts to navigate your career path and achieve your professional goals.
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg p-6 bg-primary/5">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-xl font-medium">Not sure which plan is right for you?</h3>
                  <p className="text-muted-foreground mt-1">
                    Try Premium free for 7 days. No credit card required.
                  </p>
                </div>
                <Button size="lg">
                  Start Free Trial
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <h3 className="text-xl font-medium">Frequently Asked Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Can I cancel my subscription anytime?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access to premium features until the end of your billing period.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">What payment methods do you accept?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      We accept all major credit cards, PayPal, and Apple Pay for subscription payments.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">How do the AI features work?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Our AI analyzes your resume against job descriptions, identifying optimization opportunities and suggesting improvements to increase your match rate.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Is there a discount for students?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Yes, we offer a 50% discount for students with a valid .edu email address. Contact our support team to apply.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 