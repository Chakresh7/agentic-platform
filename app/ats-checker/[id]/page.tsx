import { notFound, redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase-client"
import ATSChecker from "@/components/resume/ats-checker"

export const metadata = {
  title: "ATS Resume Checker | AgentHub",
  description: "Check your resume for ATS compatibility and get suggestions for improvement",
}

export default async function ATSCheckerPage({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Handle new ATS check
  if (params.id === "new") {
    return <ATSChecker isNew={true} userId={session.user.id} />
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

  return <ATSChecker resume={resume} isNew={false} userId={session.user.id} />
}
