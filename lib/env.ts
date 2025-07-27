/**
 * Environment Variables Validation
 * This module validates required environment variables and provides type-safe access
 */

// Required environment variables
const requiredEnvVars = {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  
  // Cloudinary
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
} as const

// Optional environment variables
const optionalEnvVars = {
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  DATABASE_URL: process.env.DATABASE_URL,
  VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID,
  SENTRY_DSN: process.env.SENTRY_DSN,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
} as const

// Validation function
export const validateEnvironment = () => {
  const missingVars: string[] = []
  const warnings: string[] = []

  // Check required variables
  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value) {
      missingVars.push(key)
    }
  })

  // Check optional but recommended variables
  if (!optionalEnvVars.SUPABASE_SERVICE_ROLE_KEY) {
    warnings.push('SUPABASE_SERVICE_ROLE_KEY - Some admin features may not work')
  }

  if (!optionalEnvVars.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
    warnings.push('NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET - Client-side uploads will not work')
  }

  // Report results
  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables:\n${missingVars.map(v => `- ${v}`).join('\n')}\n\nPlease check your .env.local file and ensure all required variables are set.`
    console.error(errorMessage)
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`)
  }

  if (warnings.length > 0) {
    console.warn('Environment warnings:')
    warnings.forEach(warning => console.warn(`- ${warning}`))
  }

  console.log('✅ Environment validation passed')
  return true
}

// Type-safe environment access
export const env = {
  // Supabase
  SUPABASE_URL: requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_ANON_KEY: requiredEnvVars.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  SUPABASE_SERVICE_ROLE_KEY: optionalEnvVars.SUPABASE_SERVICE_ROLE_KEY,
  
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: requiredEnvVars.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: requiredEnvVars.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: requiredEnvVars.CLOUDINARY_API_SECRET!,
  CLOUDINARY_UPLOAD_PRESET: optionalEnvVars.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  
  // Optional
  DATABASE_URL: optionalEnvVars.DATABASE_URL,
  VERCEL_ANALYTICS_ID: optionalEnvVars.VERCEL_ANALYTICS_ID,
  SENTRY_DSN: optionalEnvVars.SENTRY_DSN,
  
  // SMTP
  SMTP_HOST: optionalEnvVars.SMTP_HOST,
  SMTP_PORT: optionalEnvVars.SMTP_PORT ? parseInt(optionalEnvVars.SMTP_PORT) : undefined,
  SMTP_USER: optionalEnvVars.SMTP_USER,
  SMTP_PASS: optionalEnvVars.SMTP_PASS,
  
  // Runtime environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
} as const

// Export individual validation functions for specific services
export const validateSupabaseConfig = () => {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error('Supabase configuration is incomplete')
  }
  return true
}

export const validateCloudinaryConfig = () => {
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary configuration is incomplete')
  }
  return true
}

// Initialize validation on import (only in development)
if (typeof window === 'undefined' && env.IS_DEVELOPMENT) {
  try {
    validateEnvironment()
  } catch (error) {
    // Don't throw during build time, just log
    console.error('Environment validation failed:', error)
  }
}