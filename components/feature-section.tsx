import { CheckCircle2, Code2, Compass, Layers, Lightbulb, Users } from "lucide-react"

export default function FeatureSection() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Everything You Need to Succeed</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-[800px] mx-auto">
            Our platform combines powerful tools with AI assistance to help you build your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 h-24 w-24 -translate-y-1/3 translate-x-1/3 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:translate-x-1/4"></div>
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Portfolio Builder</h3>
              <p className="mb-4 text-muted-foreground">
                Create stunning portfolios with our drag-and-drop builder. Showcase your work with customizable
                templates.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Drag-and-drop interface</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Professional templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">AI-powered suggestions</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 h-24 w-24 -translate-y-1/3 translate-x-1/3 rounded-full bg-blue-500/10 blur-2xl transition-all duration-500 group-hover:translate-x-1/4"></div>
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Resume Builder</h3>
              <p className="mb-4 text-muted-foreground">
                Craft professional resumes with AI assistance. Our templates are designed to pass ATS systems.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">ATS-friendly templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Content suggestions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">One-click formatting</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 h-24 w-24 -translate-y-1/3 translate-x-1/3 rounded-full bg-purple-500/10 blur-2xl transition-all duration-500 group-hover:translate-x-1/4"></div>
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Team Finder</h3>
              <p className="mb-4 text-muted-foreground">
                Connect with the perfect teammates for your projects. Find collaborators based on skills and
                availability.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Skill-based matching</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Project collaboration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Team management tools</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 h-24 w-24 -translate-y-1/3 translate-x-1/3 rounded-full bg-green-500/10 blur-2xl transition-all duration-500 group-hover:translate-x-1/4"></div>
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Project Management</h3>
              <p className="mb-4 text-muted-foreground">
                Track progress, assign tasks, and collaborate with your team. Our AI helps you stay on schedule.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Task tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Progress visualization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Deadline management</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 h-24 w-24 -translate-y-1/3 translate-x-1/3 rounded-full bg-amber-500/10 blur-2xl transition-all duration-500 group-hover:translate-x-1/4"></div>
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">AI Assistant</h3>
              <p className="mb-4 text-muted-foreground">
                Get personalized guidance and suggestions. Our AI assistant provides real-time feedback and helps you
                make better decisions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Content generation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Design suggestions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Personalized advice</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 h-24 w-24 -translate-y-1/3 translate-x-1/3 rounded-full bg-red-500/10 blur-2xl transition-all duration-500 group-hover:translate-x-1/4"></div>
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">News & Insights</h3>
              <p className="mb-4 text-muted-foreground">
                Stay updated with the latest industry trends. Get personalized news, job opportunities, and industry
                insights.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Curated content</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Job recommendations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-sm">Industry updates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
