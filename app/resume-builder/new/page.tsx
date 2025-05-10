import { redirect } from "next/navigation"
import { getSupabaseServerClient, getMockSupabaseClient } from "@/lib/supabase-client"
import ResumeBuilder from "@/components/resume/resume-builder"

export const metadata = {
  title: "Create New Resume | AgentHub",
  description: "Create a professional resume with AI assistance",
}

export default async function NewResumePage() {
  // Use the server client in production, mock client during build
  const supabase = process.env.NODE_ENV === 'development' 
    ? getMockSupabaseClient() 
    : getSupabaseServerClient();

  try {
    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If not authenticated and in production, redirect to home
    if (!session && process.env.NODE_ENV === 'production') {
      redirect("/")
    }

    // For build and development, provide a mock user ID if session is null
    const userId = session?.user?.id || 'mock-user-id';
    
    return <ResumeBuilder isNew={true} userId={userId} />
  } catch (error) {
    console.error("Error in resume builder:", error);
    // Return the component with mock data for build process
    return <ResumeBuilder isNew={true} userId="mock-user-id" />
  }
}
