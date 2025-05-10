import { X } from "lucide-react"

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Testimonials</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Testimonial 1 - John Doe */}
          <div className="bg-background border rounded-lg shadow-sm p-6 relative">
            <div className="absolute top-4 right-4">
              <X className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-semibold">
                J
              </div>
              <div>
                <h4 className="font-bold">John Doe</h4>
                <p className="text-sm text-muted-foreground">Software Engineer</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              The portfolio builder helped me showcase my projects in a professional way. I received multiple internship offers after sharing my portfolio. The AI suggestions were incredibly helpful!
            </p>
          </div>

          {/* Testimonial 2 - Michael Johnson */}
          <div className="bg-background border rounded-lg shadow-sm p-6 relative">
            <div className="absolute top-4 right-4">
              <X className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-semibold">
                M
              </div>
              <div>
                <h4 className="font-bold">Michael Johnson</h4>
                <p className="text-sm text-muted-foreground">UX Designer</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              The AI-powered design tools helped me create a stunning portfolio that stands out. The templates are modern and the customization options let me showcase my unique style. Highly recommended for designers!
            </p>
          </div>

          {/* Testimonial 3 - Daniel Martinez */}
          <div className="bg-background border rounded-lg shadow-sm p-6 relative">
            <div className="absolute top-4 right-4">
              <X className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-semibold">
                D
              </div>
              <div>
                <h4 className="font-bold">Daniel Martinez</h4>
                <p className="text-sm text-muted-foreground">Full-Stack Developer</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              I found an amazing team through the Team Finder feature. We've been working together on a startup idea for the past 6 months and recently secured funding! The platform made collaboration easy.
            </p>
          </div>

          {/* Testimonial 4 - Sophia Lee */}
          <div className="bg-background border rounded-lg shadow-sm p-6 relative">
            <div className="absolute top-4 right-4">
              <X className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-semibold">
                S
              </div>
              <div>
                <h4 className="font-bold">Sophia Lee</h4>
                <p className="text-sm text-muted-foreground">Data Analyst</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              The resume analytics feature gave me incredible insights into how to improve my applications. My interview callback rate increased by 40% after implementing the AI suggestions!
            </p>
          </div>

          {/* Testimonial 5 - Emily Davis */}
          <div className="bg-background border rounded-lg shadow-sm p-6 relative">
            <div className="absolute top-4 right-4">
              <X className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-semibold">
                E
              </div>
              <div>
                <h4 className="font-bold">Emily Davis</h4>
                <p className="text-sm text-muted-foreground">Marketing Specialist</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              The ATS checker feature was a game-changer for my job search. I finally understood why my applications weren't getting through, and the platform helped me optimize my resume for each position.
            </p>
          </div>

          {/* Testimonial 6 - Jane Smith */}
          <div className="bg-background border rounded-lg shadow-sm p-6 relative">
            <div className="absolute top-4 right-4">
              <X className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-semibold">
                J
              </div>
              <div>
                <h4 className="font-bold">Jane Smith</h4>
                <p className="text-sm text-muted-foreground">Product Manager</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              The cover letter generator saved me so much time during my job search. The AI creates personalized letters that match job descriptions perfectly, and I've received compliments from recruiters on how well-tailored they are.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
