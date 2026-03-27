import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users_profile: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          created_at?: string
        }
      }
      integration_requests: {
        Row: {
          id: string
          user_id: string
          company_name: string
          website_url: string | null
          use_case: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          website_url?: string | null
          use_case?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          website_url?: string | null
          use_case?: string | null
          created_at?: string
        }
      }
    }
  }
}
