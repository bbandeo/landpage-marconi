import { v2 as cloudinary } from "cloudinary"

// Validate environment variables
const validateCloudinaryConfig = () => {
  const requiredVars = {
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  }

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missingVars.length > 0) {
    throw new Error(`Missing Cloudinary environment variables: ${missingVars.join(', ')}`)
  }

  return requiredVars
}

// Server-side configuration with validation
const config = validateCloudinaryConfig()
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
})

export { cloudinary }

// Type definitions for better type safety
export interface CloudinaryUploadResult {
  url: string
  public_id: string
  width: number
  height: number
  format: string
  bytes: number
}

export interface CloudinaryUploadOptions {
  folder?: string
  transformation?: any[]
  public_id?: string
  tags?: string[]
}

// Server-side upload function with improved error handling
export const uploadToCloudinary = async (
  file: string | Buffer,
  options: CloudinaryUploadOptions = {},
): Promise<CloudinaryUploadResult> => {
  try {
    // Validate input
    if (!file) {
      throw new Error("No file provided for upload")
    }

    const uploadOptions = {
      folder: options.folder || "marconi/properties",
      transformation: options.transformation || [
        { width: 1200, height: 800, crop: "fill", quality: "auto" },
        { format: "auto" },
      ],
      public_id: options.public_id,
      overwrite: true,
      resource_type: "auto" as const,
      tags: options.tags || ["marconi", "property"],
    }

    const result = await cloudinary.uploader.upload(file as any, uploadOptions)

    if (!result.secure_url) {
      throw new Error("Invalid response from Cloudinary - no secure URL")
    }

    return {
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error)
    
    if (error instanceof Error) {
      throw new Error(`Cloudinary upload failed: ${error.message}`)
    }
    
    throw new Error("Cloudinary upload failed: Unknown error")
  }
}

// Server-side delete function with improved error handling
export const deleteFromCloudinary = async (publicId: string): Promise<{ result: string }> => {
  try {
    if (!publicId) {
      throw new Error("No public ID provided for deletion")
    }

    const result = await cloudinary.uploader.destroy(publicId)
    
    if (result.result !== 'ok' && result.result !== 'not found') {
      throw new Error(`Deletion failed with result: ${result.result}`)
    }

    return result
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error)
    
    if (error instanceof Error) {
      throw new Error(`Cloudinary deletion failed: ${error.message}`)
    }
    
    throw new Error("Cloudinary deletion failed: Unknown error")
  }
}

// Bulk delete function
export const deleteManyFromCloudinary = async (publicIds: string[]): Promise<{ deleted: string[], errors: string[] }> => {
  const deleted: string[] = []
  const errors: string[] = []

  await Promise.allSettled(
    publicIds.map(async (publicId) => {
      try {
        await deleteFromCloudinary(publicId)
        deleted.push(publicId)
      } catch (error) {
        errors.push(publicId)
        console.error(`Failed to delete ${publicId}:`, error)
      }
    })
  )

  return { deleted, errors }
}

// Utility function to extract public ID from Cloudinary URL
export const extractPublicIdFromUrl = (url: string): string | null => {
  try {
    const matches = url.match(/\/(?:v\d+\/)?([^\.]+)/)
    return matches ? matches[1] : null
  } catch (error) {
    console.error("Error extracting public ID from URL:", error)
    return null
  }
}
