import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Para operaciones del servidor (con service role)
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Tipos TypeScript para la base de datos
export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: number
          title: string
          description: string | null
          price: number
          currency: string
          property_type: string
          operation_type: string
          bedrooms: number | null
          bathrooms: number | null
          area_m2: number
          address: string
          neighborhood: string
          city: string
          province: string
          images: string[]
          features: string[]
          featured: boolean
          status: string
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description?: string | null
          price: number
          currency?: string
          property_type: string
          operation_type: string
          bedrooms?: number | null
          bathrooms?: number | null
          area_m2: number
          address: string
          neighborhood: string
          city?: string
          province?: string
          images?: string[]
          features?: string[]
          featured?: boolean
          status?: string
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string | null
          price?: number
          currency?: string
          property_type?: string
          operation_type?: string
          bedrooms?: number | null
          bathrooms?: number | null
          area_m2?: number
          address?: string
          neighborhood?: string
          city?: string
          province?: string
          images?: string[]
          features?: string[]
          featured?: boolean
          status?: string
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: number
          name: string
          email: string | null
          phone: string | null
          message: string | null
          property_id: number | null
          lead_source: string
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          email?: string | null
          phone?: string | null
          message?: string | null
          property_id?: number | null
          lead_source?: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string | null
          phone?: string | null
          message?: string | null
          property_id?: number | null
          lead_source?: string
          status?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: string
          phone: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: string
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: string
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Property = Database['public']['Tables']['properties']['Row']
export type PropertyInsert = Database['public']['Tables']['properties']['Insert']
export type PropertyUpdate = Database['public']['Tables']['properties']['Update']

export type Lead = Database['public']['Tables']['leads']['Row']
export type LeadInsert = Database['public']['Tables']['leads']['Insert']
export type LeadUpdate = Database['public']['Tables']['leads']['Update']

export type Profile = Database['public']['Tables']['profiles']['Row']
