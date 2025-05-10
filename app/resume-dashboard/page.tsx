import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase-client"
import ResumeDashboard from "@/components/resume/resume-dashboard"

export const metadata = {
  title: "Resume Dashboard | AgentHub",
  description: "Manage your resumes and cover letters",
}

export default async function ResumeDashboardPage() {
  const supabase = getSupabaseServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Fetch user's resumes
  const { data: resumes } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", session.user.id)
    .order("updated_at", { ascending: false })

  // Fetch user's cover letters
  const { data: coverLetters } = await supabase
    .from("cover_letters")
    .select("*")
    .eq("user_id", session.user.id)
    .order("updated_at", { ascending: false })

  // Fetch user's job descriptions
  const { data: jobDescriptions } = await supabase
    .from("job_descriptions")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  return (
    <ResumeDashboard
      resumes={resumes || []}
      coverLetters={coverLetters || []}
      jobDescriptions={jobDescriptions || []}
      userId={session.user.id}
    />
  )
}
