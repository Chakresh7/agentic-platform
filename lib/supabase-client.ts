import { createClient } from "@supabase/supabase-js"

// Define types for our database tables
export type Resume = {
  id: string
  user_id: string
  title: string
  content: any
  template: string
  ats_score?: number
  created_at: string
  updated_at: string
  is_public: boolean
  shared_url?: string
}

export type CoverLetter = {
  id: string
  user_id: string
  resume_id?: string
  title: string
  content: string
  tone: string
  created_at: string
  updated_at: string
}

export type JobDescription = {
  id: string
  user_id: string
  title: string
  company?: string
  description: string
  keywords?: any
  created_at: string
}

// Provide default mock values for environment variables during build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-supabase-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

// Create a single supabase client for the browser
let browserClient: ReturnType<typeof createClient> | null = null

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient

  browserClient = createClient(supabaseUrl, supabaseAnonKey)

  return browserClient
}

// Create a supabase client for server components
export function getSupabaseServerClient() {
  return createClient(
    process.env.SUPABASE_URL || supabaseUrl, 
    process.env.SUPABASE_ANON_KEY || supabaseAnonKey, 
    {
      auth: {
        persistSession: false,
      },
    }
  )
}

// Create a mock client for development and testing
export function getMockSupabaseClient() {
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      signOut: () => Promise.resolve({ error: null }),
      signInWithPassword: () => Promise.resolve({ 
        data: { session: { user: { id: 'mock-user-id' } } }, 
        error: null 
      }),
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => Promise.resolve({ data: [], error: null }),
        order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }),
      }),
      insert: () => Promise.resolve({ data: { id: 'mock-id' }, error: null }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
      delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
    }),
  };
}
