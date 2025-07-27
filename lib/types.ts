// Supabase Database Types
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
          area_m2: number | null
          address: string | null
          neighborhood: string | null
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
          area_m2?: number | null
          address?: string | null
          neighborhood?: string | null
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
          area_m2?: number | null
          address?: string | null
          neighborhood?: string | null
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
          notes: string | null
          last_contact: string | null
          next_action: string | null
          next_action_date: string | null
          priority: string
          score: number
          created_at: string
          updated_at: string
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
          notes?: string | null
          last_contact?: string | null
          next_action?: string | null
          next_action_date?: string | null
          priority?: string
          score?: number
          created_at?: string
          updated_at?: string
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
          notes?: string | null
          last_contact?: string | null
          next_action?: string | null
          next_action_date?: string | null
          priority?: string
          score?: number
          created_at?: string
          updated_at?: string
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

// Derived types from Database
export type Property = Database["public"]["Tables"]["properties"]["Row"]
export type PropertyInsert = Database["public"]["Tables"]["properties"]["Insert"]
export type PropertyUpdate = Database["public"]["Tables"]["properties"]["Update"]

export type Lead = Database["public"]["Tables"]["leads"]["Row"]
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"]
export type LeadUpdate = Database["public"]["Tables"]["leads"]["Update"]

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"]
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"]

// Status and type mappings
export const STATUS_MAP = {
  available: "Disponible",
  sold: "Vendido",
  rented: "Alquilado",
  reserved: "Reservado",
} as const

export const STATUS_MAP_REVERSE = {
  Disponible: "available",
  Vendido: "sold",
  Alquilado: "rented",
  Reservado: "reserved",
} as const

export const PROPERTY_TYPE_MAP = {
  casa: "Casa",
  departamento: "Departamento",
  terreno: "Terreno",
  local: "Local",
} as const

export const OPERATION_TYPE_MAP = {
  venta: "Venta",
  alquiler: "Alquiler",
} as const

// Lead status mapping
export const LEAD_STATUS_MAP = {
  new: "Nuevo",
  contacted: "Contactado",
  qualified: "Calificado",
  converted: "Convertido",
} as const

export const LEAD_PRIORITY_MAP = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
} as const

// Frontend interface for backwards compatibility
export interface PropertyLegacy {
  id: string
  title: string
  price: number
  operation_type: "sale" | "rent"
  property_type: "house" | "apartment" | "commercial" | "land"
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  neighborhood: string
  images: string[]
  featured: boolean
}

// API Response types
export interface PropertySearchParams {
  page?: number
  limit?: number
  search?: string
  operation?: string
  type?: string
  minPrice?: string
  maxPrice?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface PropertyFormData {
  title: string
  description: string
  price: number
  currency: "USD" | "ARS"
  property_type: "casa" | "departamento" | "terreno" | "local"
  operation_type: "venta" | "alquiler"
  bedrooms?: number
  bathrooms?: number
  area_m2: number
  address: string
  neighborhood: string
  city: string
  province: string
  images: string[]
  features: string[]
  featured: boolean
  status: "available" | "sold" | "rented" | "reserved"
}

export interface LeadFormData {
  name: string
  email?: string
  phone?: string
  message?: string
  property_id?: number
  lead_source: string
}

// Error types
export interface ApiError {
  message: string
  code?: string
  details?: any
}

// Dashboard Stats
export interface DashboardStats {
  totalProperties: number
  totalLeads: number
  totalViews: number
  recentActivity: Array<{
    id: string
    type: 'property' | 'lead' | 'view'
    message: string
    timestamp: string
  }>
}
