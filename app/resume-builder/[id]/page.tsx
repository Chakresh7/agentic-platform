import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase-client"
import ResumeBuilder from "@/components/resume/resume-builder"

export const metadata: Metadata = {
  title: "Resume Builder | AgentHub",
  description: "Create and edit your professional resume with AI assistance",
}

export default async function ResumeBuilderPage({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Handle new resume creation
  if (params.id === "new") {
    return <ResumeBuilder isNew={true} userId={session.user.id} />
  }

  // Fetch existing resume
  const { data: resume, error } = await supabase.from("resumes").select("*").eq("id", params.id).single()

  if (error || !resume) {
    notFound()
  }

  // Check if the resume belongs to the current user
  if (resume.user_id !== session.user.id) {
    redirect("/resume-dashboard")
  }

  return <ResumeBuilder resume={resume} isNew={false} userId={session.user.id} />
}
