"use client"

import { useState } from "react"
import { ArrowLeft, MessageSquare, Play, Mic, RotateCcw, Clock, Sparkles, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import TopNavigation from "@/components/top-navigation"
import { useToast } from "@/components/ui/use-toast"

const mockQuestions = [
  {
    id: "q1",
    question: "Tell me about your experience with React and how you've used it in previous projects.",
    category: "Technical",
    difficulty: "Medium",
    answer: "I've been working with React for over 3 years in various projects. In my most recent role, I built a component library that reduced development time by 40%. I'm experienced with hooks, context API, and Redux for state management. I've also integrated React with various APIs and third-party services.",
    tips: "Be specific about the React features you've used. Quantify your achievements when possible. Mention any complex problems you solved with React."
  },
  {
    id: "q2",
    question: "Describe a challenging problem you faced in a recent project and how you solved it.",
    category: "Behavioral",
    difficulty: "Hard",
    answer: "In a recent e-commerce project, we faced performance issues as the product catalog grew to over 10,000 items. I implemented virtual scrolling and optimized rendering with React.memo and useMemo. This reduced page load time by 70% and improved the user experience significantly.",
    tips: "Use the STAR method (Situation, Task, Action, Result). Focus on your specific contributions and quantify the impact of your solution."
  },
  {
    id: "q3",
    question: "How do you stay updated with the latest frontend technologies and best practices?",
    category: "General",
    difficulty: "Easy",
    answer: "I regularly follow industry blogs like CSS-Tricks and Smashing Magazine. I participate in the React and JavaScript communities on Twitter and GitHub. I also dedicate time each week to explore new libraries and techniques through online courses and side projects.",
    tips: "Show your passion for continuous learning. Mention specific resources you use and how you apply what you learn."
  },
  {
    id: "q4",
    question: "Explain the concept of closures in JavaScript and provide a practical example.",
    category: "Technical",
    difficulty: "Hard",
    answer: "Closures in JavaScript occur when a function has access to variables from its outer scope, even after the outer function has finished execution. This is possible because functions in JavaScript form closures around the data they need. For example, when creating a counter function that returns an increment function, the returned function 'remembers' the count variable from its parent scope.",
    tips: "Start with a clear definition, then provide a simple but practical example. Consider mentioning common use cases like data privacy or function factories."
  },
  {
    id: "q5",
    question: "What approaches do you take to ensure your code is maintainable and scalable?",
    category: "Technical",
    difficulty: "Medium",
    answer: "I follow several practices: First, I write clean, self-documenting code with meaningful variable and function names. I use design patterns appropriate for the problem at hand. I implement comprehensive unit and integration tests. I also focus on component reusability and keep components small and focused on a single responsibility.",
    tips: "Emphasize your understanding of both technical practices (testing, code organization) and collaborative practices (code reviews, documentation)."
  },
  {
    id: "q6",
    question: "Describe your experience working with cross-functional teams.",
    category: "Behavioral",
    difficulty: "Medium",
    answer: "I've collaborated closely with designers, product managers, and backend developers throughout my career. In my last role, I established a weekly sync between frontend and design teams that improved implementation accuracy by 30%. I believe in clear communication and understanding each team member's perspective to deliver the best product.",
    tips: "Highlight your communication skills and ability to understand different perspectives. Give specific examples of successful collaboration."
  }
];

export default function InterviewPrep() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("questions")
  const [isPracticing, setIsPracticing] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [timer, setTimer] = useState(null)
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  
  const handleStartPractice = () => {
    setIsPracticing(true)
    setUserAnswer("")
    setFeedback(null)
    setElapsedTime(0)
    
    // Start timer
    const newTimer = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)
    
    setTimer(newTimer)
  }
  
  const handleEndPractice = () => {
    // Clear timer
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }
    
    // Generate mock feedback
    setTimeout(() => {
      const mockFeedback = {
        score: Math.floor(Math.random() * 31) + 60, // Score between 60-90
        strengths: [
          "Good structure and clarity in your response",
          "Effective use of specific examples",
          "Clear communication style"
        ],
        improvements: [
          "Could provide more quantifiable metrics",
          "Consider addressing potential follow-up questions",
          "Add more technical details specific to the question"
        ],
        keyPoints: [
          "Your experience with React was well articulated",
          "Good mention of specific technologies",
          "The problem-solving approach was logical"
        ]
      }
      
      setFeedback(mockFeedback)
      
      toast({
        title: "Analysis complete",
        description: "Your answer has been analyzed. Review the feedback below.",
      })
    }, 2000)
  }
  
  const handleGenerateQuestions = () => {
    setIsGenerating(true)
    
    // Simulate generating questions
    setTimeout(() => {
      setIsGenerating(false)
      
      toast({
        title: "Questions generated",
        description: "Custom interview questions based on your resume and job description have been created.",
      })
    }, 3000)
  }
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
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
            <h1 className="text-2xl font-bold tracking-tight">Interview Preparation</h1>
            <p className="text-muted-foreground">Practice with AI-generated interview questions</p>
          </div>
        </div>

        <Tabs defaultValue="questions" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="questions">Interview Questions</TabsTrigger>
            <TabsTrigger value="practice">Practice Interview</TabsTrigger>
            <TabsTrigger value="custom">Generate Custom Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="questions" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Common Interview Questions</h2>
                <p className="text-muted-foreground">Review and prepare for frequently asked questions</p>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={() => {
                  setActiveTab("practice")
                  setTimeout(() => handleStartPractice(), 100)
                }}>
                  <Play className="h-4 w-4 mr-2" />
                  Start Practice
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <Accordion type="single" collapsible className="w-full">
                {mockQuestions.map((q, index) => (
                  <AccordionItem key={q.id} value={q.id}>
                    <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-md">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span className="text-left">{q.question}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {q.category}
                          </Badge>
                          <Badge variant="outline" className={
                            q.difficulty === "Easy" 
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : q.difficulty === "Medium"
                                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                          }>
                            {q.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <h4 className="font-medium">Sample Answer:</h4>
                          <p className="text-muted-foreground">{q.answer}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">Tips:</h4>
                          <p className="text-muted-foreground">{q.tips}</p>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" onClick={() => {
                            setCurrentQuestionIndex(index)
                            setActiveTab("practice")
                            setTimeout(() => handleStartPractice(), 100)
                          }}>
                            Practice This Question
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent value="practice">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>
                      {isPracticing ? (
                        <div className="flex justify-between items-center">
                          <span>Answer the Question</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-muted/50">
                              <Clock className="h-4 w-4 mr-1" />
                              {formatTime(elapsedTime)}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        "Interview Practice"
                      )}
                    </CardTitle>
                    <CardDescription>
                      {isPracticing 
                        ? "Speak clearly and provide a structured response" 
                        : "Practice answering interview questions with AI feedback"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isPracticing ? (
                      <div className="space-y-4">
                        <div className="border rounded-md p-4 bg-primary/5">
                          <h3 className="font-medium mb-2">Question:</h3>
                          <p>{mockQuestions[currentQuestionIndex].question}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Your Answer:</h3>
                            <Button variant="ghost" size="sm">
                              <Mic className="h-4 w-4 mr-2" />
                              Voice Input
                            </Button>
                          </div>
                          <Textarea 
                            placeholder="Type your answer here..." 
                            className="min-h-[200px]"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : feedback ? (
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">Overall Performance</h3>
                            <span className="font-bold text-xl">{feedback.score}%</span>
                          </div>
                          <Progress value={feedback.score} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium">Question</h3>
                          <p className="text-muted-foreground">{mockQuestions[currentQuestionIndex].question}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium">Your Answer</h3>
                          <p className="text-muted-foreground">{userAnswer}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h3 className="font-medium">Strengths</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {feedback.strengths.map((strength, i) => (
                                <li key={i}>{strength}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="font-medium">Areas for Improvement</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {feedback.improvements.map((improvement, i) => (
                                <li key={i}>{improvement}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium">Key Points Covered</h3>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {feedback.keyPoints.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                        <MessageSquare className="h-16 w-16 text-muted-foreground/30" />
                        <div>
                          <h3 className="text-lg font-medium">Ready to Practice?</h3>
                          <p className="text-muted-foreground max-w-md mt-2">
                            Start practicing with real interview questions. You'll get AI feedback on your responses.
                          </p>
                          <Button className="mt-4" onClick={handleStartPractice}>
                            <Play className="h-4 w-4 mr-2" />
                            Start Practice
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {isPracticing ? (
                      <>
                        <Button variant="outline" onClick={() => {
                          if (timer) {
                            clearInterval(timer)
                            setTimer(null)
                          }
                          setIsPracticing(false)
                          setUserAnswer("")
                          setFeedback(null)
                        }}>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                        <Button onClick={handleEndPractice} disabled={!userAnswer.trim()}>
                          Submit Answer
                        </Button>
                      </>
                    ) : feedback ? (
                      <>
                        <Button variant="outline" onClick={() => {
                          setFeedback(null)
                          setUserAnswer("")
                        }}>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Practice Again
                        </Button>
                        <Button onClick={() => {
                          setCurrentQuestionIndex((currentQuestionIndex + 1) % mockQuestions.length)
                          setFeedback(null)
                          setUserAnswer("")
                          handleStartPractice()
                        }}>
                          Next Question
                        </Button>
                      </>
                    ) : null}
                  </CardFooter>
                </Card>
              </div>
              
              <div className="lg:col-span-5">
                <Card>
                  <CardHeader>
                    <CardTitle>Interview Tips</CardTitle>
                    <CardDescription>Advice to help you succeed in your interview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Prepare the STAR Method</h3>
                      <p className="text-sm text-muted-foreground">
                        For behavioral questions, structure your answers with the STAR method:
                      </p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li><span className="font-medium">Situation:</span> Set the context</li>
                        <li><span className="font-medium">Task:</span> Describe your responsibility</li>
                        <li><span className="font-medium">Action:</span> Explain what you did</li>
                        <li><span className="font-medium">Result:</span> Share the outcome</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Technical Interview Strategies</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Think out loud to show your problem-solving process</li>
                        <li>Ask clarifying questions before diving into solutions</li>
                        <li>Discuss tradeoffs in your approach</li>
                        <li>Mention time and space complexity for coding questions</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Common Pitfalls to Avoid</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Speaking too fast or too slowly</li>
                        <li>Using filler words (um, like, you know)</li>
                        <li>Being too vague or general in your answers</li>
                        <li>Forgetting to highlight your specific contributions</li>
                      </ul>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">More Practice Resources</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="justify-start">
                          <span>Technical Questions</span>
                        </Button>
                        <Button variant="outline" size="sm" className="justify-start">
                          <span>Behavioral Questions</span>
                        </Button>
                        <Button variant="outline" size="sm" className="justify-start">
                          <span>Mock Interviews</span>
                        </Button>
                        <Button variant="outline" size="sm" className="justify-start">
                          <span>Video Tutorials</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Generate Custom Questions</CardTitle>
                    <CardDescription>
                      Get personalized interview questions based on your resume and target job
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Job Description</h3>
                      <p className="text-sm text-muted-foreground">
                        Paste the job description to generate relevant questions
                      </p>
                      <Textarea 
                        placeholder="Paste the job description here..." 
                        className="min-h-[150px]"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Your Resume (Optional)</h3>
                      <p className="text-sm text-muted-foreground">
                        Provide your resume to tailor questions to your experience
                      </p>
                      <Textarea 
                        placeholder="Paste your resume text here..." 
                        className="min-h-[150px]"
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={handleGenerateQuestions}
                      disabled={isGenerating || !jobDescription}
                    >
                      {isGenerating ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2"></div>
                          Generating Questions...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Custom Questions
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-5">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Files</CardTitle>
                    <CardDescription>
                      Upload your resume or job description as a file
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <h3 className="font-medium mb-1">Upload Resume</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop your resume file or click to browse
                      </p>
                      <Button>Browse Files</Button>
                    </div>
                    
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <h3 className="font-medium mb-1">Upload Job Description</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop the job description file or click to browse
                      </p>
                      <Button>Browse Files</Button>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Supported File Types</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Badge variant="outline">PDF (.pdf)</Badge>
                        <Badge variant="outline">Word (.docx)</Badge>
                        <Badge variant="outline">Text (.txt)</Badge>
                        <Badge variant="outline">LinkedIn Export</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
} 