import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "./types"

// Validate environment variables
const validateSupabaseConfig = () => {
  const requiredVars = {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missingVars.length > 0) {
    throw new Error(`Missing Supabase environment variables: ${missingVars.join(', ')}`)
  }

  return requiredVars
}

// Get validated configuration
const config = validateSupabaseConfig()

// Client for browser/client-side operations
export const supabase: SupabaseClient<Database> = createClient(
  config.url!,
  config.anonKey!,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
)

// Admin client for server-side operations with elevated privileges
const createAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!serviceRoleKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not found. Admin operations will be limited.')
    return null
  }

  return createClient<Database>(config.url!, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export const supabaseAdmin = createAdminClient()

// Utility function to handle Supabase errors
export const handleSupabaseError = (error: any, context?: string): never => {
  const message = error?.message || 'Unknown Supabase error'
  const code = error?.code || 'UNKNOWN'
  
  console.error(`Supabase error${context ? ` in ${context}` : ''}:`, {
    message,
    code,
    details: error?.details,
    hint: error?.hint,
  })

  throw new Error(`${context ? `${context}: ` : ''}${message}`)
}

// Database health check
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('properties')
      .select('id')
      .limit(1)
    
    return !error
  } catch (error) {
    console.error('Database connection check failed:', error)
    return false
  }
}

// Re-export types from centralized types file
export type {
  Database,
  Property,
  PropertyInsert,
  PropertyUpdate,
  Lead,
  LeadInsert,
  LeadUpdate,
  Profile,
  ProfileInsert,
  ProfileUpdate,
} from "./types"

export {
  STATUS_MAP,
  STATUS_MAP_REVERSE,
  PROPERTY_TYPE_MAP,
  OPERATION_TYPE_MAP,
  LEAD_STATUS_MAP,
  LEAD_PRIORITY_MAP,
} from "./types"
